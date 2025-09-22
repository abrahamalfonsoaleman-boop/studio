
'use server';
/**
 * @fileOverview Utilidades de Extracción de Entidades (NLU simple).
 * Este archivo contiene funciones para identificar piezas clave de información
 * (entidades) de una pregunta de texto plano.
 */

const N = (s:string)=>s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"").trim();

export async function extractEntities(q: string){
  const nq = N(q);

  const disciplina =
    /spinning|zumba|frontenis|futbol|fútbol|soccer/.exec(nq)?.[0]?.replace("fútbol","futbol");

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
