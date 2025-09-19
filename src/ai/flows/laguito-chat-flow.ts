
'use server';
/**
 * @fileOverview Un chatbot asistente para el Club Del Lago llamado "Laguito".
 * 
 * - laguitoChat - La función principal que maneja la conversación del chat.
 * - LaguitoChatInput - El tipo de entrada para la función laguitoChat.
 * - ChatMessage - El tipo para un único mensaje en el historial del chat.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

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

// Función exportada que el frontend llamará
export async function laguitoChat(input: LaguitoChatInput): Promise<ChatMessage> {
  const response = await laguitoChatFlow(input);
  return { role: 'model', content: response };
}

const clubInfo = `
Información General del Club Del Lago:
- Misión: Ser el mejor club deportivo social y familiar, fomentando la integración y el desarrollo de nuestros socios.
- Visión: Consolidarnos como un club de excelencia, reconocido por su calidad en servicios e instalaciones.
- Valores: Respeto, honestidad, compromiso, y trabajo en equipo.
- Teléfono General: 81 8357 5500
- Dirección: Priv. del Lago #200, Col, Del Paseo Residencial, 64920, Monterrey, N.L.
- Horarios de oficina: Lunes a Viernes de 9:00 a 18:00.

Directorio Principal:
- Gerente General: Erika de la Fuente (gerenciagral@clubdelago.com.mx, Ext. 111)
- Atención a Asociados: Sandra Arévalo (atencionaasociados@clubdelago.com.mx, Ext. 116)
- Gerente Administrativo: Mayra Sánchez (msanchez@clubdelago.com.mx, Ext. 112)
- Gerente de Operaciones: Víctor Zurita (gerenciaoperaciones@clubdelago.com.mx)
- Gerente de Alimentos y Bebidas: Julián Obregón (gerenciaayb@clubdelago.com.mx)
- Jefe de Sistemas y Comunicación: Juan Andrade (sistemas@clubdelago.com.mx, Ext. 109)
- Recursos Humanos: Carlos Merlín (recursoshumanos@clubdelago.com.mx, Ext. 113)
- Coordinadora de Eventos: Valeria Torres (eventos@clubdelago.com.mx, Ext. 120)
- Nutrióloga: Pamela Reyes (nutricion@clubdelago.com.mx, 81 1779 2275)

Deportes:
- Contacto Deportivo: Cristina Manzanares, Asistente de Deportes (cmanzanares@clubdelago.com.mx, Ext. 140).
- Disciplinas: Tenis, Fútbol, Natación, Gimnasio, Yoga, Boxeo. Para horarios de clases o torneos, deben contactar a Cristina Manzanares.

Alimentos y Bebidas:
- Restaurante Las Palmas
- Restaurante Terraza Bar
- Snack Brasas
- Para ver los menús, los socios pueden visitar la sección "Alimentos y Bebidas" de la página web.

Eventos:
- Para información sobre la renta de áreas para eventos, contactar a la Coordinadora de Eventos, Valeria Torres, al correo eventos@clubdelago.com.mx o a la extensión 120.

DelagoApp:
- La aplicación oficial del club se llama DelagoApp.
- Está disponible en la App Store para iOS y en Google Play para Android.
- Permite conectar, gestionar reservaciones y estar al día con el club.
`;

const systemPrompt = `Eres "Laguito", un asistente virtual amigable y servicial para el "Club Del Lago". Tu objetivo es responder las preguntas de los socios de manera concisa y útil, basándote únicamente en la información proporcionada a continuación.

Información del Club:
${clubInfo}

Reglas de Comportamiento:
1.  Tu nombre es Laguito. Siempre preséntate amigablemente si es el primer mensaje.
2.  Sé siempre cortés y profesional.
3.  Basa tus respuestas ESTRICTAMENTE en la "Información del Club" proporcionada. No inventes información, horarios, precios, o detalles que no estén aquí.
4.  Si no sabes la respuesta a una pregunta o la información no está disponible, dirige amablemente al usuario al contacto más relevante del directorio. Por ejemplo: "Para información sobre precios de membresía, te recomiendo contactar a Atención a Asociados con Sandra Arévalo."
5.  Mantén tus respuestas breves y al grano.
`;

const laguitoChatFlow = ai.defineFlow(
  {
    name: 'laguitoChatFlow',
    inputSchema: LaguitoChatInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    // Combine the current history with the new question to form the chat history for the model
    const history: ChatMessage[] = [
      ...input.history,
      { role: 'user', content: input.question },
    ];

    const { text } = await ai.generate({
      model: 'googleai/gemini-2.0-flash',
      system: systemPrompt,
      history: input.history, // Pass previous messages as context
      prompt: input.question,
    });

    return text;
  }
);
