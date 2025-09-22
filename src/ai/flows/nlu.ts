
'use server';
/**
 * @fileOverview Utilidades de Extracción de Entidades (NLU simple).
 * Este archivo contiene funciones para identificar piezas clave de información
 * (entidades) de una pregunta de texto plano.
 */

const N = (s:string)=>s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"").trim();

const ALIASES_DISC: Record<string, "spinning"|"zumba"|"frontenis"|"futbol"> = {
  spinning:"spinning", spin:"spinning",
  zumba:"zumba",
  frontenis:"frontenis", fronton:"frontenis", "frontón":"frontenis",
  futbol:"futbol", "fútbol":"futbol", soccer:"futbol", fut:"futbol",
};

const typosToDisc = (t: string) => {
  // corrige “tubol”, “fubtol”, etc. (<=2 errores)
  const cand = ["futbol","spinning","zumba","frontenis"];
  const d = (a:string,b:string)=>{ // levenshtein mini
    const m=a.length,n=b.length; const dp=Array.from({length:m+1},()=>Array(n+1).fill(0));
    for(let i=0;i<=m;i++)dp[i][0]=i; for(let j=0;j<=n;j++)dp[0][j]=j;
    for(let i=1;i<=m;i++)for(let j=1;j<=n;j++){
      const c=a[i-1]===b[j-1]?0:1;
      dp[i][j]=Math.min(dp[i-1][j]+1,dp[i][j-1]+1,dp[i-1][j-1]+c);
    }
    return dp[m][n];
  };
  let best: string|undefined, score=99;
  for(const c of cand){ const dist=d(t,c); if(dist<score){score=dist; best=c;} }
  return score<=2 ? (best as any) : undefined;
};

export async function extractDisciplina(q: string): Promise<"spinning"|"zumba"|"frontenis"|"futbol"|undefined> {
  const tokens = N(q).split(/\s+/).filter(Boolean);
  for (const t of tokens) {
    if (ALIASES_DISC[t]) return ALIASES_DISC[t];
    const typo = typosToDisc(t);
    if (typo) return typo as any;
  }
  return undefined;
}


function _extractEntities(q: string){
  const nq = N(q);

  const disciplina = extractDisciplina(q);

  const categoria =
    /\b201[0-9]-?20[0-9]\b|\b201[0-9]\b|\b202[0-9]\b/.exec(nq)?.[0] ||
    (/\bfemenil|adult/.test(nq) ? (/\bfemenil/.test(nq) ? "femenil" : "adultos") : undefined);

  const cancha = /\bfutbol 5|futbol 7/.exec(nq)?.[0]?.replace("futbol ","Fútbol ");

  const restaurante =
    /las palmas|terraza bar|snack brasas/.exec(nq)?.[0]?.replace(/\b\w/g,c=>c.toUpperCase());

  const platillo =
    /enchiladas|hamburguesa|tacos|chilaquiles|molletes|salm[oó]n|pirata|percher[oó]n|quesabirrias/.exec(nq)?.[0];

  const area =
    /sistemas|eventos|deportes|alimentos|administraci[oó]n|operaciones|comunicaci[oó]n|asociados|membres[ií]a/.exec(nq)?.[0];

  return { disciplina, categoria, cancha, restaurante, platillo, area };
}

export async function extractEntities(q: string) {
    return _extractEntities(q);
}

export type DeportesQuery = {
  disciplina?: "futbol"|"spinning"|"zumba"|"frontenis";
  categoria?: string;     // ej. "2014", "2010-2011", "femenil", "adultos"
  instructor?: string;    // ej. "paty", "emilio", "oscar", "diego", "daniel", "nelia"
  cancha?: "Fútbol 5"|"Fútbol 7";
  dia?: string;           // "lunes" | "martes" | ...
  hora?: string;          // ej. "17:00", "6:15 pm"
};

const DISC = { spinning:"spinning", spin:"spinning", zumba:"zumba",
  frontenis:"frontenis", fronton:"frontenis", "frontón":"frontenis",
  futbol:"futbol", "fútbol":"futbol", soccer:"futbol"
};

const INSTRUCTORES = ["paty","emilio","nelia","oscar","diego","daniel","martha","antonio"];
const DIAS = ["lunes","martes","miercoles","miércoles","jueves","viernes","sabado","sábado","domingo"];

export async function parseDeportesQuery(q: string): Promise<DeportesQuery> {
  const t = N(q);

  // disciplina
  let disciplina: DeportesQuery["disciplina"];
  for (const [k,v] of Object.entries(DISC)) if (t.includes(k)) disciplina = v as any;

  // categoría/año
  let categoria: string | undefined;
  const mRango = t.match(/\b(201[0-9])\s*[-–]\s*(201[0-9])\b/);
  if (mRango) categoria = `${mRango[1]}-${mRango[2]}`;
  const mAno = t.match(/\b(201[0-9]|202[0-9]|2014)\b/);
  if (!categoria && mAno) categoria = mAno[1];
  if (/femenil/.test(t)) categoria = "femenil";
  if (/adult/.test(t)) categoria = "adultos";

  // instructor
  const instructor = INSTRUCTORES.find(n => t.includes(n));

  // cancha
  const cancha: DeportesQuery["cancha"] =
    /\bfutbol 5|fútbol 5\b/.test(t) ? "Fútbol 5" :
    (/\bfutbol 7|fútbol 7\b/.test(t) ? "Fútbol 7" : undefined);

  // día
  let dia = DIAS.find(d => t.includes(N(d)));
  if (dia === "miercoles") dia = "miércoles";
  if (dia === "sabado") dia = "sábado";

  // hora (captura 6:15, 17:00, 6:15 pm)
  const h = t.match(/\b(\d{1,2}:\d{2}\s*(am|pm)?)\b/);
  const hora = h?.[1];

  return { disciplina, categoria, instructor, cancha, dia, hora };
}
