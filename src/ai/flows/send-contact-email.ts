
'use server';
/**
 * @fileOverview A contact form email sending flow.
 *
 * - sendContactEmail - A function that handles sending an email from the contact form.
 * - ContactFormInput - The input type for the sendContactEmail function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const ContactFormInputSchema = z.object({
  name: z.string().describe('The name of the person sending the message.'),
  email: z.string().email().describe('The email address of the person.'),
  message: z.string().describe('The content of the message.'),
});
export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;

const EmailSchema = z.object({
  to: z.string().email(),
  subject: z.string(),
  body: z.string(),
});

export async function sendContactEmail(input: ContactFormInput): Promise<void> {
  await sendContactEmailFlow(input);
}

const emailPrompt = ai.definePrompt({
    name: 'sendContactEmailPrompt',
    input: { schema: ContactFormInputSchema },
    output: { schema: EmailSchema },
    prompt: `You are an assistant responsible for creating email drafts.
    
    A user has submitted a contact form on the website. Your task is to generate an email that will be sent to the support team.
    
    The email should be addressed to 'atencionaasociados@clubdelago.com.mx'.
    The subject line should be "Nuevo Mensaje de Contacto de: {{{name}}}".
    The body of the email should be well-formatted and include the user's name, email address, and their message.
    
    User's Name: {{{name}}}
    User's Email: {{{email}}}
    Message:
    {{{message}}}
    
    Generate the email object now.`,
});

const sendContactEmailFlow = ai.defineFlow(
  {
    name: 'sendContactEmailFlow',
    inputSchema: ContactFormInputSchema,
    outputSchema: z.void(),
  },
  async (input) => {
    const { output } = await emailPrompt(input);
    
    if (!output) {
      throw new Error('Failed to generate email content.');
    }
    
    // In a real application, you would use an email service like Resend, SendGrid, or Nodemailer here.
    // For this example, we'll just log the email to the console to simulate sending.
    console.log('--- Sending Email ---');
    console.log(`To: ${output.to}`);
    console.log(`Subject: ${output.subject}`);
    console.log(`Body: \n${output.body}`);
    console.log('---------------------');
    
    // This is a simulation, so we don't return anything.
  }
);
