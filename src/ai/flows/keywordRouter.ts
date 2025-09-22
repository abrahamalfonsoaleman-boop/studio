
'use server';
/**
 * @fileOverview Un router determinista basado en palabras clave para manejar
 * consultas críticas antes de que lleguen al clasificador de IA.
 */

type QuickRoute =
  | { type: "contact"; payload: { name: string; title: string; email?: string; ext?: string } }
  | { type: "none" };

const N = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/\s+/g, " ").trim();

const KW = {
  // hacerse socio / membresías
  membership: [
    "socio","asociarme","asociacion","asociación","membresia","membresía","afiliar",
    "inscripcion","inscripción","costos de membresia","darme de alta","alta socio"
  ],
  // soporte sistemas (para que no vuelva a mandar a Sandra por error)
  sistemas: ["sistemas","it","ti","tecnologia","tecnología","wifi","internet","correo","impresora","red"],
};

const MATCH = (q: string, list: string[]) => {
  const nq = N(q);
  return list.some(k => nq.includes(N(k)));
};

// Contactos fijos
const SANDRA = { name: "Sandra Arévalo", title: "Atención a Asociados", email: "atencionaasociados@clubdelago.com.mx", ext: "116" };
const JUAN   = { name: "Juan Andrade",   title: "Jefe de Sistemas y Comunicación", email: "sistemas@clubdelago.com.mx", ext: "109" };

export async function keywordRouter(question: string): Promise<QuickRoute> {
  if (MATCH(question, KW.membership)) {
    // REGLA 1: membresías → Sandra
    return { type: "contact", payload: SANDRA };
  }
  if (MATCH(question, KW.sistemas)) {
    // Evita que 'sistemas' caiga en atención a socios
    return { type: "contact", payload: JUAN };
  }
  return { type: "none" };
}

    