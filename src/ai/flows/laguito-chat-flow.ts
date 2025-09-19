
'use server';
/**
 * @fileOverview Un chatbot asistente para el Club Del Lago llamado "Laguito".
 * Este flujo utiliza un enfoque de clasificación de intenciones para proporcionar respuestas estructuradas y precisas.
 *
 * - laguitoChat - La función principal que maneja la conversación del chat.
 * - LaguitoChatInput - El tipo de entrada para la función laguitoChat.
 * - ChatMessage - El tipo para un único mensaje en el historial del chat.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { AyB, Deportes, Directorio, MisionVisionValores, Renta } from '@/lib/club-data';
import { LaguitoAnswer, LaguitoAnswerSchema, LaguitoCard, LaguitoHandoff, LaguitoIntent, LaguitoIntentSchema } from './types';


// Define el esquema para un único mensaje en el historial del chat
const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

// Define el esquema de entrada para el flujo del chatbot
const LaguitoChatInputSchema = z.object({
  history: z.array(ChatMessageSchema).describe('El historial de la conversación actual.'),
  question: z.string().describe('La última pregunta del usuario.'),
});
export type LaguitoChatInput = z.infer<typeof LaguitoChatInputSchema>;


const systemPrompt = `Eres "Laguito", un asistente virtual amigable y servicial para el "Club Del Lago".
Tu objetivo es actuar como un enrutador inteligente y un generador de resúmenes.
1.  **Clasifica la intención**: Primero, determina la intención del usuario a partir de su pregunta. Las intenciones posibles son: ${LaguitoIntentSchema.options.join(", ")}.
2.  **Genera un resumen**: Basado en la respuesta estructurada que se te proporcionará, crea un resumen de texto corto, amigable y conversacional. No inventes información. Si la respuesta contiene una tabla o una lista, simplemente menciona que has encontrado la información.
3.  **Formato**: Responde SIEMPRE con un objeto JSON válido que cumpla con el esquema 'LaguitoAnswer'. No agregues texto antes o después del JSON.`;


/**
 * Clasifica la intención del usuario utilizando el modelo de IA.
 * @param question La pregunta del usuario.
 * @returns La intención clasificada.
 */
async function classifyIntent(question: string): Promise<LaguitoIntent> {
    const { text } = await ai.generate({
        model: "googleai/gemini-2.0-flash",
        system: `Clasifica la pregunta del usuario en una de las siguientes intenciones: ${LaguitoIntentSchema.options.join(", ")}. Devuelve solo la etiqueta de la intención, sin texto adicional.`,
        prompt: question,
    });
    const intent = text.trim();
    // Validar que la intención sea una de las permitidas
    if (LaguitoIntentSchema.options.includes(intent as any)) {
        return intent as LaguitoIntent;
    }
    return "desconocido";
}

// --- HANDLERS DE INTENCIONES ---

function buildFallback(question: string, note?: string): LaguitoAnswer {
    const handoffContact = Directorio["Atención a Asociados"];
    return {
        intent: "desconocido",
        summary: note || "No estoy seguro de cómo responder a eso, pero te puedo comunicar con la persona indicada para ayudarte.",
        cards: [],
        handoff: {
            name: handoffContact.name,
            email: handoffContact.email,
            phone: `Tel. 81 8357 5500 ext. ${handoffContact.ext}`,
            note: "Para preguntas generales, membresías y otros asuntos."
        },
        meta: { source: "directorio", matched: ["Atención a Asociados"] }
    }
}

function buildDeportes(question: string): LaguitoAnswer {
    const keywords = Object.keys(Deportes).filter(key => 
        new RegExp(`\\b${key}\\b`, 'i').test(question)
    );

    if (keywords.length === 0) {
        return buildFallback(question, "No encontré información sobre la disciplina deportiva que mencionaste. Te recomiendo contactar a nuestro equipo de deportes.");
    }
    
    const matchedDeporteKey = keywords[0] as keyof typeof Deportes;
    const deporte = Deportes[matchedDeporteKey];

    const cards: LaguitoCard[] = deporte.grupos.map(grupo => {
        return {
            title: `${matchedDeporteKey.charAt(0).toUpperCase() + matchedDeporteKey.slice(1)} - ${'categoria' in grupo ? grupo.categoria : 'General'}`,
            subtitle: `Instructor: ${grupo.instructor}`,
            table: {
                columns: ["Días", "Horario"],
                rows: grupo.horarios.map(h => [h.dias, h.hora])
            }
        };
    });

    return {
        intent: "deportes.horarios",
        summary: `¡Claro! Aquí tienes la información sobre ${matchedDeporteKey}.`,
        cards,
        handoff: {
            name: deporte.contacto.nombre,
            phone: `Tel. 81 8357 5500 ext. ${deporte.contacto.ext}`,
            note: "Para inscripciones y más detalles."
        },
        meta: { source: "club-data.ts", matched: keywords }
    };
}

function buildMenu(question: string): LaguitoAnswer {
    const keywords = Object.keys(AyB).filter(key => 
        new RegExp(`\\b${key.replace(" ", "\\s")}\\b`, 'i').test(question)
    );

    if (keywords.length === 0) {
        return buildFallback(question, "No pude identificar el restaurante. ¿Te gustaría ver el menú de Las Palmas, Terraza Bar o Snack Brasas?");
    }

    const matchedRestauranteKey = keywords[0] as keyof typeof AyB;
    const restaurante = AyB[matchedRestauranteKey];

    const cards: LaguitoCard[] = Object.entries(restaurante).map(([categoria, platillos]) => ({
        title: `${matchedRestauranteKey} - ${categoria}`,
        table: {
            columns: ["Platillo", "Precio"],
            rows: platillos as string[][]
        }
    }));
    
    return {
        intent: "ayb.menu",
        summary: `Aquí está el menú de ${matchedRestauranteKey}. ¡Buen provecho!`,
        cards,
        meta: { source: "club-data.ts", matched: keywords }
    };
}

function buildRenta(question: string): LaguitoAnswer {
    const { areas, contacto } = Renta;
    
    return {
        intent: "eventos.renta",
        summary: "¡Por supuesto! Aquí tienes la información sobre nuestras áreas disponibles para eventos.",
        cards: [{
            title: "Renta de Áreas para Eventos",
            subtitle: contacto.nota,
            table: {
                columns: ["Área", "Precio", "Capacidad", "Duración", "Días"],
                rows: areas.map(a => [a.nombre, a.precio, `${a.capacidad} pers.`, a.duracion, a.dias])
            }
        }],
        handoff: {
            name: contacto.nombre,
            email: contacto.email,
            phone: `Tel. 81 8357 5500 ext. ${contacto.ext}`,
            note: "Para informes y reservaciones."
        },
        meta: { source: "club-data.ts", matched: ["renta", "eventos"] }
    };
}

function buildContacto(question: string): LaguitoAnswer {
    const keywords = Object.keys(Directorio).filter(key => 
        new RegExp(`\\b${key.replace(" ", "\\s")}\\b`, 'i').test(question)
    );

    if (keywords.length === 0) {
        return buildFallback(question, "No encontré a esa persona en el directorio. ¿Necesitas ayuda para contactar a alguien más?");
    }

    const matchedKey = keywords[0] as keyof typeof Directorio;
    const contacto = Directorio[matchedKey];
    
    const bullets = [
        `**Nombre:** ${contacto.name}`,
        `**Email:** ${contacto.email}`,
    ];
    if ('ext' in contacto && contacto.ext) {
        bullets.push(`**Teléfono:** 81 8357 5500 ext. ${contacto.ext}`);
    }
     if ('whatsapp' in contacto && contacto.whatsapp) {
        bullets.push(`**WhatsApp:** ${contacto.whatsapp}`);
    }

    return {
        intent: "directorio.contacto",
        summary: `¡Claro! Aquí están los datos de contacto para ${matchedKey}.`,
        cards: [{
            title: `Contacto: ${matchedKey}`,
            bullets
        }],
        meta: { source: "club-data.ts", matched: keywords }
    };
}

function buildGeneralInfo(question: string): LaguitoAnswer {
     return {
        intent: "general.info",
        summary: "Te comparto la información esencial sobre nuestro club.",
        cards: [
            {
                title: "Misión",
                bullets: [MisionVisionValores.mision]
            },
            {
                title: "Visión",
                bullets: [MisionVisionValores.vision]
            },
            {
                title: "Valores",
                bullets: [MisionVisionValores.valores]
            }
        ],
        meta: { source: "club-data.ts", matched: ["mision", "vision", "valores"] }
    };
}


const intentHandlers: Record<LaguitoIntent, (q: string) => LaguitoAnswer> = {
  "deportes.horarios": buildDeportes,
  "ayb.menu": buildMenu,
  "eventos.renta": buildRenta,
  "directorio.contacto": buildContacto,
  "general.info": buildGeneralInfo,
  "desconocido": buildFallback,
};

/**
 * Función principal del chatbot.
 * Clasifica la intención y llama al handler correspondiente para construir la respuesta.
 */
export async function laguitoChat(input: LaguitoChatInput): Promise<ChatMessage> {
    const intent = await classifyIntent(input.question);
    const handler = intentHandlers[intent];
    const structuredAnswer = handler(input.question);

    const { output } = await ai.generate({
        model: 'googleai/gemini-2.0-flash',
        system: systemPrompt,
        prompt: `Basado en esta pregunta del usuario "${input.question}" y la siguiente respuesta estructurada, genera el campo 'summary' y devuelve el objeto JSON completo. Respuesta Estructurada: ${JSON.stringify(structuredAnswer)}`,
        output: {
            schema: LaguitoAnswerSchema,
            format: "json"
        }
    });

    if (!output) {
        return { role: 'model', content: JSON.stringify(buildFallback(input.question, "Tuve un problema al procesar tu solicitud. Por favor, intenta de nuevo.")) };
    }
    
    // Asegurarnos de que el output se ajuste al esquema, incluso si el LLM falla.
    const finalAnswer = LaguitoAnswerSchema.parse(output);

    return { role: 'model', content: JSON.stringify(finalAnswer) };
}
