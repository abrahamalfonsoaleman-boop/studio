
'use server';
/**
 * @fileOverview Un chatbot asistente para el Club Del Lago llamado "Laguito".
 * Este flujo utiliza un enfoque de clasificación de intenciones y llenado de "slots" 
 * para proporcionar respuestas contextuales, haciendo preguntas de seguimiento cuando sea necesario.
 *
 * - laguitoChat - La función principal que maneja la conversación del chat.
 * - LaguitoChatInput - El tipo de entrada para la función laguitoChat.
 * - ChatMessage - El tipo para un único mensaje en el historial del chat.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { AyB, Deportes, MisionVisionValores, Renta } from '@/lib/club-data';
import { LaguitoAnswer, LaguitoAnswerSchema, LaguitoCard, LaguitoIntent, LaguitoIntentSchema } from './types';
import { extractEntities, extractDisciplina, parseDeportesQuery, DeportesQuery } from './nlu';

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


const systemPrompt = `Eres **Laguito**, el asistente virtual del Club Del Lago.

========================
OBJETIVO
========================
- Responde SIEMPRE con un **único objeto JSON** conforme al CONTRATO DE SALIDA (abajo).
- Usa **exclusivamente** los datos provistos por el caller como \`ClubData\` (o extractos). **No inventes** horarios, precios, áreas o contactos.
- Si falta contexto, pide **exactamente un dato** y ofrece **hasta 4 quickReplies** pertinentes.
- Si algo no existe (p. ej., tenis), devuelve el **contacto correcto** (Atención a Asociados) y explica brevemente.

========================
DATOS (fuente)
========================
- Te pasarán \`ClubData\` (o un fragmento) en el prompt del caller. Trátalo como **fuente única de verdad**.
- Estructura típica:
  - \`areas\` (asociados, sistemas, deportes, eventos, alimentos, administración, operaciones, comunicación …) con \`contacto\`, \`palabrasClave\`.
  - \`deportes\` (spinning, futbol, zumba, frontenis) con \`lugar\` y \`grupos\` o \`categorias\`.
  - \`eventos\` (palapa4, laguito1, restaurante, bar, asadores …) con precio, capacidad, duración, días.
  - \`ayb\` (Las Palmas, Terraza Bar, Snack Brasas) con listas de platillos y precios.
- **Prohibido** suponer datos que no están en \`ClubData\`.

========================
RUTEO (intents) — determinístico + semántico
========================
Determina **un** intent según el mensaje del usuario:

1) **"deportes.resumen"** → si el usuario dice *“deportes”*, *“clases deportivas”* o equivalente general.
   - Acción: lista disciplinas disponibles (p. ej., Fútbol, Spinning, Frontenis, Zumba).
   - Pide refinamiento: “¿Cuál te interesa?” (quickReplies con las disciplinas).

2) **"deportes.horarios"** → si menciona **una disciplina** o sinónimos:
   - fútbol|futbol|fútbol|soccer → "futbol"
   - spinning|spin
   - zumba|zomba (tolerar 1–2 typos)
   - frontenis|frontón|fronton
   - Acción: tabular horarios filtrando por entidades (año/categoría, instructor, cancha, día, hora).
   - Si no hay match **exacto**, muestra la **disciplina completa** y anota: “No encontré coincidencias exactas…”.

3) **"eventos.renta"** → si hay términos de renta/espacios: rentar, evento, laguito, palapa, restaurante, bar, asadores, salón.
   - Si NO especifica área: pide **qué área** y ofrece quickReplies (Palapa 4, Laguito 1, Restaurante, Bar, Asadores).
   - Si especifica el área existente: devuelve precio, capacidad, duración, días + contacto de eventos.

4) **"ayb.menu"** → si menciona menú/comida/restaurante/bar/snack.
   - Si NO indica restaurante: pregunta “¿En cuál?” (Las Palmas, Terraza Bar, Snack Brasas) con quickReplies.
   - Si lo indica: devuelve platillos y precios de ese restaurante.

5) **"directorio.contacto"** → si la entrada es **un concepto de área** (“sistemas”, “operaciones”, “administración”, “comunicación”, “asociados”, “membresía”, etc.)
   - Acción: **solo** el contacto del área (nombre, puesto, correo, extensión). **No** añadas chips de otras áreas.

6) **"institucional.mvv"** → si mencionan explícitamente misión/visión/valores.
   - Acción: devuelve esos textos si vienen en \`ClubData\`; si no están, redirige a asociados.

7) **"fallback"** → todo lo ambiguo/no mapeable o que carece de datos en \`ClubData\`.
   - Acción: pide **1 aclaración** y ofrece quickReplies pertinentes; o devuelve **Atención a Asociados**.

Notas de ruteo:
- Preferir "directorio.contacto" cuando el usuario escribe **solo** un área.
- Si un área **no tiene datos operativos** (p. ej., Sistemas sin catálogos), devuelve **solo** su contacto.
- Para deportes, soporta **typos leves** y sinónimos (e.g., “tubol”→ fútbol, “fronton”→ frontenis, “spining”→ spinning).

========================
ENTIDADES para deportes (extrae si aparecen)
========================
- disciplina: futbol|spinning|zumba|frontenis (con tolerancia a tildes/typos).
- categoria: “2014”, “2010–2011”, “femenil”, “adultos”, etc.
- instructor: nombres presentes en ClubData (p. ej., Paty Fernández, Oscar Sandoval, Diego Manzanares, Daniel de León, Nelia Guerra, Martha Vázquez, Antonio Domínguez).
- cancha: “Fútbol 5” o “Fútbol 7” (si aplica).
- dia: lunes|martes|miércoles|jueves|viernes|sábado|domingo (tolerar sin tildes).
- hora: patrones HH:MM con o sin am/pm (normaliza para comparar).

Reglas de filtrado:
- Filtra filas donde **todas** las entidades presentes coincidan (case-insensitive, ignora tildes).
- Si el filtro deja 0 filas → muestra **toda la disciplina** y añade \`note\`: “No encontré coincidencias exactas con tu filtro, te muestro todas las opciones disponibles.”

========================
CONTACTOS Y ESCALAMIENTO
========================
- Cada intent que entregue información operativa debe **incluir** el contacto del área correspondiente como **primer card**.
- Si el tema no existe o faltan datos críticos → \`directorio.contacto\` con **Atención a Asociados** (Sandra Arévalo).
- Nunca dupliques mensajes de error. Usa \`summary\` + opcional \`note\` concisa.

========================
CONTRATO DE SALIDA (OBLIGATORIO)
========================
Responde SIEMPRE un único objeto JSON (sin texto extra, sin “\`\`\`”, sin prefijos) con:

{
  "intent": "deportes.horarios" | "deportes.resumen" | "eventos.renta" | "ayb.menu" | "directorio.contacto" | "institucional.mvv" | "fallback",
  "summary": "string (1 línea, breve, clara)",
  "cards": [
    {
      "title": "string (obligatorio)",
      "subtitle": "string (opcional)",
      "bullets": ["string", "... (opcional)"],
      "note": "string corta (opcional, 1 por card)",
      "table": {
        "columns": ["string", "..."],
        "rows": [["string","..."], ["string","..."]]
      },
      "quickReplies": ["string", "string", "string", "string"]  // máx 4
    }
  ],
  "meta": {
    "source": "laguito-v3",
    "confidence": 0.0
  }
}

REGLAS DE FORMATO:
- **No** incluyas markdown, firmas ni texto fuera del JSON.
- Si no tienes algo (p. ej., \`table\`), **omítelo** (no pongas null/undefined).
- \`cards\` **no vacío**. \`title\` siempre presente.
- Evita saltos de línea dentro de \`summary\` y \`title\`.
- Si necesitas aclarar algo, usa \`note\` (máx 120 caracteres).

========================
PLANTILLAS DE RESPUESTA (por intent)
========================
A) deportes.resumen
- summary: “Estas son nuestras disciplinas deportivas.”
- cards[0]: contacto de Deportes (de ClubData.areas.deportes.contacto)
- cards[1]: lista con bullets de disciplinas disponibles
- quickReplies: hasta 4 disciplinas

B) deportes.horarios
- cards[0]: contacto de Deportes
- cards[1]: tabla con columnas: ["Instructor","Categoría","Días","Horario","Sede"]
- Si se especificó instructor/categoría/cancha/día/hora, inclúyelos en \`subtitle\` (formato chips: “Instructor: X • Categoría: Y • Cancha: Z …”)
- Si no hay match exacto, añade \`note\` y muestra la disciplina completa.

C) eventos.renta
- cards[0]: contacto de Eventos
- Si área especificada: cards[1] con bullets: [“Área: …”, “Precio: …”, “Capacidad: …”, “Duración: …”, “Días: …”]
- Si no especificada: intent=“fallback” y pedir “¿Qué área deseas rentar?” con quickReplies (hasta 4 áreas de ClubData.eventos)

D) ayb.menu
- Si no hay restaurante: intent=“fallback” y pregunta: “¿En qué restaurante?” con quickReplies (Las Palmas, Terraza Bar, Snack Brasas).
- Si hay restaurante: cards[0] contacto de Alimentos (si existe), cards[1] tabla/lista de platillos y precios.

E) directorio.contacto
- Una única tarjeta con el contacto del área pedida (nombre, puesto, correo y extensión si existe). **No** agregues chips irrelevantes.

F) institucional.mvv
- Una tarjeta con Misión, otra con Visión, otra con Valores (si están en ClubData). Si faltan, manda a asociados.

G) fallback
- Una tarjeta pidiendo **un** dato faltante + quickReplies pertinentes.
- Usa \`summary\` para explicar qué falta (“Necesito saber la disciplina…”).

========================
CONSISTENCIA Y VALIDACIÓN (Checklist interno ANTES de responder)
========================
1) He elegido el intent correcto según reglas de ruteo.
2) \`cards\` no está vacío y cada card tiene \`title\`.
3) Si el intent es de datos (deportes/eventos/ayb), **incluí el contacto** del área como **primer card**.
4) Si pedí contexto, **incluí quickReplies** (máx 4).
5) Si el filtro dejó 0 filas, devolví la disciplina completa con \`note\`.
6) La salida es **JSON puro** y parseable (sin texto extra).
7) \`meta.confidence\` ∈ [0,1]. Si dudoso, ≤ 0.6 y preferir \`fallback\`.`;


/**
 * Construye una respuesta de fallback segura.
 * @param summary Mensaje principal a mostrar al usuario.
 * @returns Un objeto LaguitoAnswer.
 */
function buildSafeFallback(summary: string): LaguitoAnswer {
  const handoffContact = { name: "Sandra Arévalo", title: "Atención a Asociados", email: "atencionaasociados@clubdelago.com.mx", ext: "116" };
  return {
    intent: "directorio.contacto",
    summary: summary,
    cards: [{
      title: "Atención a Asociados",
      subtitle: handoffContact.name,
      bullets: [
        `**Correo:** ${handoContact.email}`,
        `**Tel.:** 81 8357 5500 ext. ${handoContact.ext}`
      ],
    }],
    meta: { source: "parser-fallback", confidence: 0 }
  };
}

const resumenDisciplinas = (): LaguitoCard => {
  const keys = Object.keys(Deportes) as (keyof typeof Deportes)[];
  return {
    title: "Clases deportivas disponibles",
    bullets: keys.map(k => k[0].toUpperCase()+k.slice(1)) // Spinning, Frontenis, Futbol, Zumba
  };
}

type ContactRoute = { name: string; title: string; email?: string; ext?: string };
const CONTACTS_ROUTE: Record<string, ContactRoute> = {
  deportes:   { name:"Cristina Manzanares", title:"Asistente de Deportes", email:"cmanzanares@clubdelago.com.mx", ext:"140" },
  sistemas:   { name:"Juan Andrade",        title:"Jefe de Sistemas y Comunicación", email:"sistemas@clubdelago.com.mx", ext:"109" },
  eventos:    { name:"Ana Karen Rincón",    title:"Coordinadora de Eventos", email:"eventos@clubdelago.com.mx", ext:"120" },
  alimentos:  { name:"Julián Obregón",      title:"Gerente de Alimentos y Bebidas", email:"gerenciaayb@clubdelago.com.mx" },
  administracion:{ name:"Mayra Sánchez",    title:"Gerente Administrativo", email:"msanchez@clubdelago.com.mx", ext:"112" },
  operaciones:{ name:"Víctor Zurita",       title:"Gerente de Operaciones", email:"gerenciaoperaciones@clubdelago.com.mx" },
  comunicacion:{ name:"Leidy Rodríguez",    title:"Comunicación", email:"edicion@clubdelago.com.mx", ext:"109" },
  asociados:  { name:"Sandra Arévalo",      title:"Atención a Asociados", email:"atencionaasociados@clubdelago.com.mx", ext:"116" },
};
const DETERMINISTIC_AREAS: Record<string, keyof typeof CONTACTS_ROUTE> = {
    sistemas: "sistemas",
    administracion: "administracion",
    operaciones: "operaciones",
    comunicacion: "comunicacion",
    asociados: "asociados",
    membresia: "asociados"
}


/**
 * Función principal del chatbot.
 * Clasifica la intención y llama al handler correspondiente para construir la respuesta.
 */
export async function laguitoChat(input: ChatMessage): Promise<ChatMessage> {
    const { content: question } = input;
    const normalizedQuestion = question.toLowerCase().trim();

    // 1. Pre-ruteo determinista
    if (/^\s*deportes\s*$/i.test(normalizedQuestion) || /\b(clases?|deportiv)/i.test(normalizedQuestion) && /deport/.test(normalizedQuestion)) {
      const cardResumen = resumenDisciplinas();
      const contacto = CONTACTS_ROUTE.deportes;

      const payload: LaguitoAnswer = {
        intent: "deportes.resumen",
        summary: "Estas son nuestras disciplinas deportivas. ¿Sobre cuál te gustaría saber más?",
        cards: [
          {
            title: contacto.name,
            subtitle: contacto.title,
            bullets: [
              `**Email:** ${contacto.email}`,
              `**Teléfono:** 81 8357 5500 ext. ${contacto.ext}`
            ]
          },
          {
              ...cardResumen,
              quickReplies: Object.keys(Deportes)
          }
        ],
        meta: { source: "laguito-v3-deterministic", confidence: 1.0 }
      };
      return { role: "model", content: JSON.stringify(payload) };
    }

    if (DETERMINISTIC_AREAS[normalizedQuestion]) {
        const areaKey = DETERMINISTIC_AREAS[normalizedQuestion];
        const contact = CONTACTS_ROUTE[areaKey];
        const payload: LaguitoAnswer = {
            intent: "directorio.contacto",
            summary: `Aquí tienes el contacto para ${contact.title}.`,
            cards: [{
                title: contact.name,
                subtitle: contact.title,
                bullets: [
                    contact.email ? `**Email:** ${contact.email}` : '',
                    `**Teléfono:** 81 8357 5500${contact.ext ? ` ext. ${contact.ext}` : ''}`
                ].filter(Boolean)
            }],
            meta: { source: "laguito-v3-deterministic", confidence: 1.0 }
        };
        return { role: "model", content: JSON.stringify(payload) };
    }


    // 2. Llamada al modelo Gemini con el prompt de sistema
    try {
        const { output } = await ai.generate({
            model: 'googleai/gemini-2.0-flash',
            system: systemPrompt,
            prompt: `ClubData: ${JSON.stringify({Deportes, Renta, AyB, MisionVisionValores})} \n\n User Question: "${question}"`,
            output: {
                schema: LaguitoAnswerSchema,
                format: "json"
            }
        });
        
        if (!output) {
            return { role: 'model', content: JSON.stringify(buildSafeFallback("No pude procesar tu solicitud en este momento.")) };
        }
        
        // 3. Validación de salida
        const finalAnswer = LaguitoAnswerSchema.parse(output);
        return { role: 'model', content: JSON.stringify(finalAnswer) };

    } catch(e) {
        console.error("Error en laguitoChat (LLM Call o Parsing):", e);
        return { role: 'model', content: JSON.stringify(buildSafeFallback("Tuve un problema al procesar tu solicitud. Por favor, intenta de nuevo.")) };
    }
}

    