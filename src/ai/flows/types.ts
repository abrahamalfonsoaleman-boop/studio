
/**
 * @fileoverview Defines the structured data types for Laguito chatbot responses.
 * Using Zod schemas ensures that the data returned by the AI model is always
 * consistent and type-safe.
 */
import { z } from "genkit";

// Defines the possible intents the user might have. This is used for routing.
export const LaguitoIntentSchema = z.enum([
  "deportes.horarios",
  "deportes.resumen",
  "ayb.menu",
  "eventos.renta",
  "directorio.contacto",
  "institucional.mvv",
  "fallback"
]);
export type LaguitoIntent = z.infer<typeof LaguitoIntentSchema>;

// Defines the structure for a single "card" in the response.
// A response can have multiple cards to display information cleanly.
export const LaguitoCardSchema = z.object({
  title: z.string().describe("The main title of the card."),
  subtitle: z.string().optional().describe("An optional subtitle for more context."),
  bullets: z.array(z.string()).optional().describe("A list of bullet points for concise information."),
  table: z
    .object({
      columns: z.array(z.string()).describe("The header columns for the table."),
      rows: z.array(z.array(z.string())).describe("The data rows, where each inner array is a row."),
    })
    .optional(),
  note: z.string().optional().describe("A brief note for additional context."),
  quickReplies: z.array(z.string()).optional().describe("A list of suggested replies for the user to click on."),
});
export type LaguitoCard = z.infer<typeof LaguitoCardSchema>;


// Defines the main structure for the entire chatbot response.
export const LaguitoAnswerSchema = z.object({
  intent: LaguitoIntentSchema.describe("The classified intent of the user's query."),
  summary: z.string().describe("A short, friendly, conversational summary of the answer provided."),
  cards: z.array(LaguitoCardSchema).describe("A list of cards to display to the user."),
  meta: z
    .object({ 
        source: z.string().describe("The data source used to generate the answer (e.g., 'laguito-v3')."), 
        confidence: z.number().describe("The confidence score of the intent classification (0.0 to 1.0).")
    })
});
export type LaguitoAnswer = z.infer<typeof LaguitoAnswerSchema>;

export const DeportesQuerySchema = z.object({
  disciplina: z.enum(["futbol","spinning","zumba","frontenis"]).optional(),
  categoria: z.string().optional(),
  instructor: z.string().optional(),
  cancha: z.enum(["Fútbol 5", "Fútbol 7"]).optional(),
  dia: z.string().optional(),
  hora: z.string().optional(),
});
export type DeportesQuery = z.infer<typeof DeportesQuerySchema>;

    