
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
import { AyB, Deportes, MisionVisionValores, Renta } from '@/lib/club-data';
import { LaguitoAnswer, LaguitoAnswerSchema, LaguitoCard, LaguitoIntent, LaguitoIntentSchema } from './types';


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
    const handoffContact = { name: "Sandra Arévalo", email: "atencionaasociados@clubdelago.com.mx", ext: "116" };
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

// -------------------------------
// buildDeportes (nueva implementación robusta)
// -------------------------------
type Row = [string, string, string, string]; // Instructor, Categoría, Días, Horario

const norm = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/\s+/g, " ").trim();

const includesAny = (txt: string, kws: string[]) => kws.some(k => txt.includes(norm(k)));

const DISC_MAP: Record<string, string[]> = {
  spinning: ["spinning", "spin"],
  frontenis: ["frontenis", "fronton", "frontón"],
  futbol: ["futbol", "fútbol", "soccer", "futbol 5", "futbol 7", "fútbol 5", "fútbol 7"],
  zumba: ["zumba"],
};

function detectDisciplina(q: string): keyof typeof Deportes | null {
  const nq = norm(q);
  for (const [key, aliases] of Object.entries(DISC_MAP)) {
    if (includesAny(nq, aliases.map(norm))) return key as keyof typeof Deportes;
  }
  return null;
}

function buildRowsFor(
  key: keyof typeof Deportes,
  q: string
): Row[] {
  const d = Deportes[key];

  // filtros opcionales por categoría/cancha/segmento
  const nq = norm(q);
  const wantAdultos = includesAny(nq, ["adulto", "adultos", "+15"]);
  const wantFemenil = includesAny(nq, ["femenil", "femenino"]);
  const wantInfantil = includesAny(nq, ["infantil", "niñ", "201", "20", "2014", "2019", "2021"]);

  const rows: Row[] = [];

  d.grupos.forEach((g: any) => {
    // Filtros específicos fútbol
    if (key === "futbol") {
      const cat = (g.categoria || "").toLowerCase();
      if (wantAdultos && !/adult/.test(cat)) return;
      if (wantFemenil && !/femenil/.test(cat)) return;
      if (wantInfantil && /adult/.test(cat)) return; // si pidió infantil, evita adultos
    }

    g.horarios.forEach((h: any) => {
      rows.push([
        g.instructor,
        g.categoria ?? (key === "spinning" ? "Mixto Adultos" : (d as any).notas ?? ""),
        h.dias,
        h.hora,
      ]);
    });
  });

  // Si tras filtrar quedó vacío, rellena con todo para esa disciplina
  if (!rows.length) {
    d.grupos.forEach((g: any) => {
      g.horarios.forEach((h: any) => {
        rows.push([
          g.instructor,
          g.categoria ?? (key === "spinning" ? "Mixto Adultos" : (d as any).notas ?? ""),
          h.dias,
          h.hora,
        ]);
      });
    });
  }

  return rows;
}

function buildDeportes(question: string): LaguitoAnswer {
  const disc = detectDisciplina(question);

  const makeCard = (title: string, sede: string, rows: Row[]): LaguitoCard => ({
    title,
    subtitle: `Sede: ${sede}`,
    table: {
      columns: ["Instructor", "Categoría", "Días", "Horario"],
      rows,
    },
  });

  // 1) Si pidió una disciplina concreta
  if (disc) {
    const rows = buildRowsFor(disc, question);
    const title = disc.charAt(0).toUpperCase() + disc.slice(1);
    const sede = Deportes[disc].lugar;
    return {
      intent: "deportes.horarios",
      summary: `¡Claro! Aquí tienes la información sobre ${title}.`,
      cards: [makeCard(title, sede, rows)],
      handoff: {
        name: Deportes[disc].contacto.nombre,
        phone: `Tel. 81 8357 5500 ext. ${Deportes[disc].contacto.ext}`,
        note: "Para inscripciones y más detalles."
      },
      meta: { source: "club-data.ts", matched: [disc] },
    };
  }

  // 2) Si NO especificó → devolver TODO Deportes en varias tarjetas
  const allCards = (Object.keys(Deportes) as (keyof typeof Deportes)[])
    .map(k => {
        const rows = buildRowsFor(k, ""); // Sin filtro de pregunta para obtener todos
        const title = k.charAt(0).toUpperCase() + k.slice(1);
        const sede = Deportes[k].lugar;
        return makeCard(title, sede, rows);
    });

  return {
    intent: "deportes.horarios",
    summary: "¡Por supuesto! Aquí tienes un resumen de todas nuestras actividades deportivas.",
    cards: allCards,
    handoff: {
        name: "Cristina Manzanares",
        phone: `Tel. 81 8357 5500 ext. 140`,
        note: "Para inscripciones y más detalles."
    },
    meta: { source: "club-data.ts", matched: ["all"] },
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

// -------------------------------
// buildContacto (nueva implementación robusta)
// -------------------------------
type Contact = {
  key: string;
  name: string;
  title: string;
  email?: string;
  ext?: string;
  whatsapp?: string;
  tags: string[];     // palabras/frases que describen el área
  weight?: number;    // por si quieres priorizar manualmente
};

const CONTACTOS: Contact[] = [
  {
    key: "gerencia_general",
    name: "Erika de la Fuente",
    title: "Gerente General",
    email: "gerenciagral@clubdelago.com.mx",
    ext: "111",
    tags: ["gerente general","direccion","directora","quejas","direccion general"]
  },
  {
    key: "atencion_asociados",
    name: "Sandra Arévalo",
    title: "Atención a Asociados",
    email: "atencionaasociados@clubdelago.com.mx",
    ext: "116",
    tags: ["atencion a socios","membresia","membresías","socios","credencial"]
  },
  {
    key: "administracion",
    name: "Mayra Sánchez",
    title: "Gerente Administrativo",
    email: "msanchez@clubdelago.com.mx",
    ext: "112",
    tags: ["administracion","administración","factura","facturacion","pagos","contabilidad","caja"]
  },
  {
    key: "operaciones",
    name: "Víctor Zurita",
    title: "Gerente de Operaciones",
    email: "gerenciaoperaciones@clubdelago.com.mx",
    tags: ["operaciones","mantenimiento","servicios generales","limpieza","jardineria","seguridad"]
  },
  {
    key: "ayb",
    name: "Julián Obregón",
    title: "Gerente de Alimentos y Bebidas",
    email: "gerenciaayb@clubdelago.com.mx",
    tags: ["alimentos","bebidas","restaurante","terraza bar","banquete","cocina","menus","menú","ayb"]
  },
  {
    key: "sistemas",
    name: "Juan Andrade",
    title: "Jefe de Sistemas y Comunicación",
    email: "sistemas@clubdelago.com.mx",
    ext: "109",
    tags: ["sistemas","it","ti","tecnologia","tecnología","internet","wifi","correo","comunicacion","impresoras","red"]
  },
  {
    key: "capital_humano",
    name: "Carlos Merlín",
    title: "Gerente de Capital Humano",
    email: "recursoshumanos@clubdelago.com.mx",
    ext: "113",
    tags: ["recursos humanos","capital humano","vacante","empleo","nomina","reclutamiento","contratacion"]
  },
  {
    key: "eventos",
    name: "Ana Karen Rincón",
    title: "Coordinadora de Eventos",
    email: "eventos@clubdelago.com.mx",
    ext: "120",
    whatsapp: "+528123870840",
    tags: ["eventos","renta","salon","salón","palapa","asadores","reservacion","reservación","cotizacion","cotización"]
  },
  {
    key: "comunicacion_staff", // Renombrado para evitar conflicto con la tag
    name: "Leidy Rodríguez",
    title: "Comunicación",
    email: "edicion@clubdelago.com.mx",
    ext: "109",
    tags: ["comunicacion","prensa","redes","diseño","edición","marketing"]
  },
  {
    key: "deportes_staff", // Renombrado para evitar conflicto con la tag
    name: "Cristina Manzanares",
    title: "Asistente de Deportes",
    email: "cmanzanares@clubdelago.com.mx",
    ext: "140",
    tags: ["deportes","clases","escuelas","torneo","spinning","futbol","frontenis","zumba","promocion deportiva"]
  }
];

// ---------- utilidades ----------
const STOP = new Set(["el","la","los","las","de","del","y","a","en","para","con","un","una","al", "quien", "es", "la", "persona", "contacto", "con"]);

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (s: string) =>
  normalize(s)
    .split(" ")
    .filter(w => w && !STOP.has(w));

const levenshtein = (a: string, b: string) => {
  const s = a, t = b;
  const m = s.length, n = t.length;
  const dp = Array.from({length: m+1}, (_,i)=>Array(n+1).fill(0));
  for (let i=0;i<=m;i++) dp[i][0]=i;
  for (let j=0;j<=n;j++) dp[0][j]=j;
  for (let i=1;i<=m;i++){
    for (let j=1;j<=n;j++){
      const cost = s[i-1]===t[j-1]?0:1;
      dp[i][j]=Math.min(
        dp[i-1][j]+1,
        dp[i][j-1]+1,
        dp[i-1][j-1]+cost
      );
    }
  }
  return dp[m][n];
};

const SYN: Record<string,string[]> = {
  operaciones: ["operacion","mantenimiento","servicios","servicio","generales"],
  sistemas: ["it","ti","tecnologia","tecnología","informatico","informática","red","wifi","correo"],
  alimentos: ["ayb","restaurante","cocina","terraza","bar","bebidas","menu","menú"],
  eventos: ["renta","salon","salón","palapa","asador","reservacion","cotizacion","fiesta"],
  asociados: ["socios","membresia","membresias"],
  comunicacion: ["prensa","redes","edicion","diseño","marketing"],
  "capital humano": ["recursos humanos","rh","reclutamiento","vacante","empleo","nomina"],
};

const expandTokens = (tokens: string[]) => {
  const extra: string[] = [];
  for (const t of tokens) {
    for (const [k, arr] of Object.entries(SYN)) {
      if (t === normalize(k) || arr.map(normalize).includes(t)) {
        extra.push(normalize(k), ...arr.map(normalize));
      }
    }
  }
  return Array.from(new Set(tokens.concat(extra)));
};

// ---------- scoring ----------
function scoreContact(q: string, c: Contact): number {
  const qNorm = normalize(q);
  const qTokens = expandTokens(tokenize(qNorm));
  const title = normalize(c.title);
  const name = normalize(c.name);
  const tags = c.tags.map(normalize);

  let score = 0;

  const extMatch = qNorm.match(/\bext\.?\s*(\d+)|\bextension\s*(\d+)|\bext\s*(\d+)/i);
  const extAsked = extMatch?.[1] || extMatch?.[2] || extMatch?.[3];
  if (extAsked && c.ext && extAsked === c.ext) score += 100;

  for (const phrase of [title, ...tags]) {
    if (qNorm.includes(phrase) && phrase.split(" ").length >= 2) score += 30;
  }

  for (const t of qTokens) {
    if (!t) continue;
    if (title.split(" ").includes(t)) score += 7;
    if (tags.includes(t)) score += 9;
    if (name.split(" ").includes(t)) score += 5;
  }

  for (const t of qTokens) {
    if (t.length < 3) continue;
    for (const cand of [title, name, ...tags]) {
      const dist = levenshtein(t, cand);
      const ratio = dist / Math.max(t.length, cand.length);
      if (ratio <= 0.34) score += 3;
    }
  }

  if (/operaciones/.test(qNorm) && /operaciones/.test(title)) score += 12;
  if (/sistemas|ti|it|tecnolog/.test(qNorm) && /sistemas|comunicacion/.test(title)) score += 14;
  if (/alimentos|bebidas|ayb|restaurante|bar/.test(qNorm) && /alimentos|bebidas/.test(title)) score += 12;
  if (/asociad/.test(qNorm) && /asociados/.test(title)) score += 10;
  if (/capital humano|recursos humanos|rh/.test(qNorm) && /capital humano/.test(title)) score += 12;
  if (/evento|renta|salon|salón|palapa|asador/.test(qNorm) && /eventos/.test(title)) score += 14;

  if (c.weight) score += c.weight;

  return score;
}

function buildContacto(question: string): LaguitoAnswer {
  const scored = CONTACTOS
    .map(c => ({ c, score: scoreContact(question, c) }))
    .sort((a,b) => b.score - a.score);

  const best = scored[0];
  const second = scored[1];

  const LOW_THRESHOLD = 10;
  const CLOSE_THRESHOLD = 8;
  const isLow = best.score < LOW_THRESHOLD;
  const isClose = second && (best.score - second.score) <= CLOSE_THRESHOLD;

  if (!best || isLow || isClose) {
    const top = scored.slice(0, 3).map(({c}) => c);
    const handoffContact = CONTACTOS.find(c => c.key === 'atencion_asociados')!;
    
    return {
      intent: "directorio.contacto",
      summary: "No estoy completamente seguro de a quién buscas. ¿Te refieres a alguna de estas personas?",
      cards: [{
        title: "¿A quién necesitas contactar?",
        bullets: top.map(c => `${c.name} - ${c.title}${c.ext ? ` (Ext. ${c.ext})` : ""}`)
      }],
      handoff: { 
        name: handoffContact.name, 
        email: handoffContact.email, 
        phone: `Tel. 81 8357 5500 ext. ${handoffContact.ext}`, 
        note: "Si ninguna de estas opciones es la correcta, el equipo de Atención a Asociados podrá ayudarte." 
      },
      meta: { source: "directorio local", matched: tokenize(question) }
    };
  }

  const c = best.c;
  const bullets = [];
  if (c.email) bullets.push(`**Email:** ${c.email}`);
  if (c.ext) bullets.push(`**Teléfono:** 81 8357 5500 ext. ${c.ext}`);
  if (c.whatsapp) bullets.push(`**WhatsApp:** ${c.whatsapp}`);

  return {
    intent: "directorio.contacto",
    summary: `¡Claro! Aquí están los datos de contacto para ${c.title}.`,
    cards: [{
      title: `${c.name}`,
      subtitle: c.title,
      bullets: bullets,
    }],
    meta: { source: "directorio local", matched: tokenize(question) }
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
    const handler = intentHandlers[intent] || intentHandlers["desconocido"];
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
