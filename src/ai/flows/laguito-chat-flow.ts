
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
    const nq = question.toLowerCase();

    // overrides deterministas
    if (/\b(deporte|zumba|spinning|frontenis|futbol|fútbol|soccer)\b/.test(nq)) return "deportes.horarios";
    if (/\b(men[uú]|restaurante|bar|alimentos|comida)\b/.test(nq)) return "ayb.menu";
    if (/\b(evento|renta|sal[oó]n|palapa|asador)\b/.test(nq)) return "eventos.renta";
    if (/\b(socios?|membres[ií]a|sistemas|operaciones|administraci[oó]n|comunicaci[oó]n|it|ti|wifi|internet)\b/.test(nq)) return "directorio.contacto";
    if (/\b(mision|misión|vision|visi[oó]n|valores)\b/.test(nq)) return "general.info";

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
    const handoffContact = { name: "Sandra Arévalo", title: "Atención a Asociados", email: "atencionaasociados@clubdelago.com.mx", ext: "116" };
    return {
        intent: "desconocido",
        summary: note || "No estoy seguro de cómo responder a eso, pero te puedo comunicar con la persona indicada para ayudarte.",
        cards: [{
            title: "Atención a Asociados",
            subtitle: handoffContact.name,
            bullets: [
                `Correo: ${handoffContact.email}`,
                `Tel. 81 8357 5500 ext. ${handoffContact.ext}`,
                 note || "Ellos pueden ayudarte a canalizar tu pregunta al área correcta."
            ]
        }],
        meta: { source: "regla_fallback" }
    }
}


// -------------------------------
// buildDeportes (nueva implementación robusta y con filtrado)
// -------------------------------
type Row = [string, string, string, string]; // Instructor, Categoría, Días, Horario

function normalizeStr(s?: string){ return s ? s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"") : ""; }

function matchCategoria(cat: string|undefined, qCat?: string){
  if (!qCat) return true;
  if (!cat) return false;
  const C = normalizeStr(cat);
  const Q = normalizeStr(qCat);
  return C.includes(Q);
}

function matchInstructor(name: string, qInst?: string){
  if (!qInst) return true;
  return normalizeStr(name).includes(normalizeStr(qInst));
}

function matchDia(dias: string, qDia?: string){
  if (!qDia) return true;
  return normalizeStr(dias).includes(normalizeStr(qDia));
}

function matchHora(hora: string, qHora?: string){
  if (!qHora) return true;
  const H = qHora.replace(/\s*(am|pm)/,'').trim();
  return hora.includes(H);
}

function matchCancha(cancha: string|undefined, qCancha?: "Fútbol 5"|"Fútbol 7"){
  if (!qCancha) return true;
  return cancha === qCancha;
}

async function buildDeportesFiltered(question: string): Promise<LaguitoAnswer | null>{
  const q = await parseDeportesQuery(question);

  if (!q.disciplina) return null;

  const key = q.disciplina as keyof typeof Deportes;
  const d = Deportes[key];

  const rows: Row[] = [];
  d.grupos.forEach((g:any)=>{
    if (!matchCancha((g as any).cancha, q.cancha)) return;
    if (!matchInstructor(g.instructor, q.instructor)) return;

    const categoria = g.categoria ?? (d as any).notas ?? "";
    g.horarios.forEach((h:any)=>{
      if (!matchCategoria(categoria, q.categoria)) return;
      if (!matchDia(h.dias, q.dia)) return;
      if (!matchHora(h.hora, q.hora)) return;

      rows.push([g.instructor, categoria, h.dias, h.hora]);
    });
  });

  const relaxed = !rows.length ? `No encontré coincidencias exactas para tu búsqueda. Te muestro todos los horarios para ${q.disciplina}.` : undefined;
  const finalRows = rows.length ? rows : (()=> {
    const all: Row[] = [];
    d.grupos.forEach((g:any)=>g.horarios.forEach((h:any)=>{
      all.push([g.instructor, g.categoria ?? (d as any).notas ?? "", h.dias, h.hora]);
    }));
    return all;
  })();

  const contacto = CONTACTS_ROUTE.deportes;

  const answer: LaguitoAnswer = {
    intent: "deportes.horarios",
    summary: relaxed || `¡Claro! Aquí tienes la información sobre ${q.disciplina}.`,
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
            title: key.charAt(0).toUpperCase() + key.slice(1),
            subtitle: [
                `Sede: ${d.lugar}`,
                q.categoria ? `Categoría: ${q.categoria}` : "",
                q.instructor ? `Instructor: ${q.instructor}` : "",
                q.cancha ? q.cancha : "",
                q.dia ? `Día: ${q.dia}` : "",
                q.hora ? `Hora: ${q.hora}` : "",
            ].filter(Boolean).join(" • "),
            table: {
                columns: ["Instructor","Categoría","Días","Horario"],
                rows: finalRows
            },
        }
    ]
  };
  return answer;
}



const resumenDisciplinas = (): LaguitoCard => {
  const keys = Object.keys(Deportes) as (keyof typeof Deportes)[];
  return {
    title: "Clases deportivas disponibles",
    bullets: keys.map(k => k[0].toUpperCase()+k.slice(1)) // Spinning, Frontenis, Futbol, Zumba
  };
}


function buildMenu(question: string, entities: Awaited<ReturnType<typeof extractEntities>>): LaguitoAnswer {
    const restauranteKey = entities.restaurante as keyof typeof AyB | undefined;

    if (!restauranteKey || !AyB[restauranteKey]) {
         return buildFallback(question, "No pude identificar el restaurante. ¿Te gustaría ver el menú de Las Palmas, Terraza Bar o Snack Brasas?");
    }

    const restaurante = AyB[restauranteKey];

    const cards: LaguitoCard[] = Object.entries(restaurante).map(([categoria, platillos]) => ({
        title: `${restauranteKey} - ${categoria}`,
        table: {
            columns: ["Platillo", "Precio"],
            rows: platillos as string[][]
        }
    }));
    
    return {
        intent: "ayb.menu",
        summary: `Aquí está el menú de ${restauranteKey}. ¡Buen provecho!`,
        cards,
        meta: { source: "club-data.ts", matched: [restauranteKey] }
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
            phone: `Tel. 81 8357 5500 ext. ${String(contacto.ext)}`,
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

const normalize = (s?: string) => {
  if (!s) return "";
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

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
    for (let j=1;i<=n;j++){
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
        bullets: top.map(c => `${c.name} - ${c.title}${c.ext ? ` (Ext. ${c.ext})` : ""}`),
        quickReplies: ["Deportes", "Eventos", "Sistemas", "Membresías"]
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


const intentHandlers: Record<LaguitoIntent, (q: string, e: Awaited<ReturnType<typeof extractEntities>>) => LaguitoAnswer> = {
  "deportes.horarios": (q) => buildFallback(q, "buildDeportes no debería ser llamado directamente"),
  "ayb.menu": buildMenu,
  "eventos.renta": buildRenta,
  "directorio.contacto": buildContacto,
  "general.info": buildGeneralInfo,
  "desconocido": buildFallback,
};

const slotPlans: Record<LaguitoIntent, { required: string[] }> = {
    "deportes.horarios": { required: ["disciplina"] },
    "ayb.menu": { required: ["restaurante"] },
    "eventos.renta": { required: [] }, // No hay slot requerido, siempre muestra todas las áreas.
    "directorio.contacto": { required: [] }, // El scoring interno maneja la falta de info.
    "general.info": { required: [] },
    "desconocido": { required: [] },
};


// Lógica de enrutamiento por área para consultas de bajo contexto
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

const ALIASES: Record<string, keyof typeof CONTACTS_ROUTE> = {
  // áreas
  deportes:"deportes", eventos:"eventos", sistemas:"sistemas", alimentos:"alimentos",
  administracion:"administracion", operaciones:"operaciones", comunicacion:"comunicacion",
  asociados:"asociados", socio:"asociados", membresia:"asociados", membresía:"asociados",
  // términos afines
  futbol:"deportes", fútbol:"deportes", spinning:"deportes", zumba:"deportes", frontenis:"deportes",
  menu:"alimentos", menú:"alimentos", bar:"alimentos", restaurante:"alimentos",
  salon:"eventos", palapa:"eventos", renta:"eventos",
  it:"sistemas", ti:"sistemas", wifi:"sistemas", internet:"sistemas", correo:"sistemas",
};

const AREA_CAPS: Record<string, {hasContent: boolean}> = {
  deportes:   { hasContent: true }, 
  eventos:    { hasContent: true }, 
  alimentos:  { hasContent: true }, 
  sistemas:   { hasContent: false },
  operaciones:{ hasContent: false },
  administracion:{ hasContent: false },
  comunicacion:{ hasContent: false },
  asociados:  { hasContent: false },
};

const SUGERENCIAS: Record<string, string[]> = {
  deportes: [
    "Ver horarios de Zumba",
    "Horarios Spinning",
    "Fútbol 7 (2010–2011)",
    "Frontenis Infantil"
  ],
  eventos: [
    "Rentar Palapa 4",
    "Rentar Laguito 1",
    "Renta Restaurante",
    "Costos de montaje"
  ],
  alimentos: [
      "Menú Las Palmas",
      "Menú Terraza Bar",
      "Menú Snack Brasas"
  ]
};

function routeArea(question: string): ContactRoute | null {
  const nq = normalize(question);
  const tokens = nq.split(/\s+/).filter(Boolean);

  // 1) una sola palabra → alias directo
  if (tokens.length <= 2 && ALIASES[nq]) return CONTACTS_ROUTE[ALIASES[nq]];

  // 2) frase corta / sin contexto → primer alias que aparezca
  for (const t of tokens) {
    if (ALIASES[t]) return CONTACTS_ROUTE[ALIASES[t]];
  }
  return null;
}

/**
 * Función principal del chatbot.
 * Clasifica la intención y llama al handler correspondiente para construir la respuesta.
 */
export async function laguitoChat(input: ChatMessage): Promise<ChatMessage> {
    const { content: question } = input;
    
    // Prioridad 1: Filtrado de deportes si se menciona una disciplina
    if (/\b(spinning|zumba|frontenis|futbol|fútbol|soccer)\b/i.test(question)) {
        const ans = await buildDeportesFiltered(question);
        if (ans) {
            return { role: "model", content: JSON.stringify(ans) };
        }
    }
    
     // A) Si pregunta global “clases deportivas…”
    if (/\b(clases?|deportiv)/i.test(question) && /deport/.test(question.toLowerCase())) {
        const cardResumen = resumenDisciplinas();
        const contacto = CONTACTS_ROUTE.deportes;
        const payload: LaguitoAnswer = {
            intent: "deportes.horarios",
            summary: "Aquí tienes un resumen de nuestras clases deportivas y el contacto para inscripciones.",
            cards: [
            {
                title: contacto.name,
                subtitle: contacto.title,
                bullets: [
                `**Email:** ${contacto.email}`,
                `**Teléfono:** 81 8357 5500 ext. ${contacto.ext}`
                ]
            },
            cardResumen
            ],
            meta: { source: "resumen_deportes" }
        }
        return { role: "model", content: JSON.stringify(payload) };
    }


    // C) Router directo por área (una palabra o frase corta)
    const directContact = routeArea(question);
    if (directContact) {
      const areaKey = Object.entries(CONTACTS_ROUTE).find(([,v]) => v.email === directContact.email)?.[0] ?? "asociados";
      const hasContent = AREA_CAPS[areaKey]?.hasContent === true;
      const quickReplies = hasContent ? (SUGERENCIAS[areaKey] ?? []) : [];

      const payload: LaguitoAnswer = {
        intent: "directorio.contacto",
        summary: `Claro, aquí tienes la información de ${directContact.title}.`,
        cards: [{
          title: directContact.name,
          subtitle: directContact.title,
          bullets: [
            directContact.email ? `**Email:** ${directContact.email}` : undefined,
            `**Teléfono:** 81 8357 5500${directContact.ext ? ` ext. ${String(directContact.ext)}` : ""}`
          ].filter(Boolean) as string[],
          ...(quickReplies.length > 0 && { quickReplies })
        }],
        meta: { source: "router_directo" }
      };
      return { role: 'model', content: JSON.stringify(payload) };
    }

    try {
        // 2. Clasificar intención y extraer entidades
        const intent = await classifyIntent(question);
        const entities = await extractEntities(question);

        // 3. Lógica de "Slot Filling": preguntar si falta contexto
        const requiredSlots = slotPlans[intent]?.required ?? [];
        const missingSlots = requiredSlots.filter(slot => !(entities as any)[slot]);

        if (missingSlots.length > 0) {
            const slotToAsk = missingSlots[0];
            const followUps: Record<string, { title: string; subtitle: string; quickReplies: string[] }> = {
                disciplina: {
                    title: "Para ayudarte mejor…",
                    subtitle: "¿Qué disciplina te interesa?",
                    quickReplies: ["Spinning", "Zumba", "Frontenis", "Fútbol"]
                },
                restaurante: {
                    title: "Para ayudarte mejor…",
                    subtitle: "¿De qué restaurante te gustaría ver el menú?",
                    quickReplies: ["Las Palmas", "Terraza Bar", "Snack Brasas"]
                },
            };
            
            const askCard = followUps[slotToAsk];
            if (askCard) {
                const askAnswer: LaguitoAnswer = {
                    intent: intent,
                    summary: "Necesito un poco más de información para darte la respuesta correcta.",
                    cards: [askCard],
                    meta: { source: "slot_filler", matched: [] }
                };
                return { role: 'model', content: JSON.stringify(askAnswer) };
            }
        }


        // 4. Si hay contexto, llamar al handler correspondiente
        const handler = intentHandlers[intent] || intentHandlers["desconocido"];
        const structuredAnswer = handler(question, entities);

        // 5. Usar LLM para generar el resumen final
        const { output } = await ai.generate({
            model: 'googleai/gemini-2.0-flash',
            system: systemPrompt,
            prompt: `Basado en esta pregunta del usuario "${question}" y la siguiente respuesta estructurada, genera el campo 'summary' y devuelve el objeto JSON completo. Respuesta Estructurada: ${JSON.stringify(structuredAnswer)}`,
            output: {
                schema: LaguitoAnswerSchema,
                format: "json"
            }
        });
        
        if (!output) {
            return { role: 'model', content: JSON.stringify(buildFallback(question, "Tuve un problema al procesar tu solicitud. Por favor, intenta de nuevo.")) };
        }
        
        const finalAnswer = LaguitoAnswerSchema.parse(output);
        return { role: 'model', content: JSON.stringify(finalAnswer) };

    } catch(e) {
        console.error("Error en laguitoChat:", e);
        return { role: 'model', content: JSON.stringify(buildFallback(question, "Ocurrió un error al procesar tu solicitud.")) };
    }
}

    

    