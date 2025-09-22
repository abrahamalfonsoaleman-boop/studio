
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
