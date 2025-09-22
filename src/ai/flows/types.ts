
/**
 * @fileoverview Defines the structured data types for Laguito chatbot responses.
 * Using Zod schemas ensures that the data returned by the AI model is always
 * consistent and type-safe.
 */
import { z } from "genkit";

// Defines the possible intents the user might have. This is used for routing.
export const LaguitoIntentSchema = z.enum([
  "deportes.horarios",
  "ayb.menu",
  "eventos.renta",
  "directorio.contacto",
  "general.info",
  "desconocido"
]);
export type LaguitoIntent = z.infer<typeof LaguitoIntentSchema>;

// Defines the structure for a single "card" in the response.
// A response can have multiple cards to display information cleanly.
export const LaguitoCardSchema = z.object({
  title: z.string().describe("The main title of the card."),
  subtitle: z.string().optional().describe("An optional subtitle for more context."),
  bullets: z.array(z.string()).default([]).describe("A list of bullet points for concise information."),
  table: z
    .object({
      columns: z.array(z.string()).describe("The header columns for the table."),
      rows: z.array(z.array(z.string())).describe("The data rows, where each inner array is a row."),
    })
    .optional(),
  cta: z
    .object({ 
        label: z.string().describe("The text for the call-to-action button."), 
        href: z.string().describe("The URL or link for the action (e.g., 'tel:+123' or 'mailto:a@b.com').")
    })
    .optional(),
  quickReplies: z.array(z.string()).optional().describe("A list of suggested replies for the user to click on."),
});
export type LaguitoCard = z.infer<typeof LaguitoCardSchema>;

// Defines the structure for a "handoff", used when the bot cannot answer
// and needs to refer the user to a specific person.
export const LaguitoHandoffSchema = z.object({
    name: z.string().describe("The name of the person to contact."),
    email: z.string().optional().describe("The contact's email address."),
    phone: z.string().optional().describe("The contact's phone number, including extension."),
    note: z.string().optional().describe("A brief note explaining why the user is being referred to this person."),
});
export type LaguitoHandoff = z.infer<typeof LaguitoHandoffSchema>;


// Defines the main structure for the entire chatbot response.
export const LaguitoAnswerSchema = z.object({
  intent: LaguitoIntentSchema.describe("The classified intent of the user's query."),
  summary: z.string().describe("A short, friendly, conversational summary of the answer provided."),
  cards: z.array(LaguitoCardSchema).default([]).describe("A list of cards to display to the user."),
  handoff: LaguitoHandoffSchema.optional().describe("Contact information if the query requires human assistance."),
  meta: z
    .object({ 
        source: z.string().describe("The data source used to generate the answer (e.g., 'club-data.ts')."), 
        matched: z.array(z.string()).describe("The keywords or entities matched in the data source.")
    })
    .optional(),
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
