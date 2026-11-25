import {crearT, normalizar} from './tiempo';
import type {EscenaProps} from './tipos';
import type {Bloque, Cue, EspecEpisodio, EspecEscena} from './motor-tipos';

/* ───────── Resolución de "cues" (palabra → segundo) ───────── */

const TIEMPOS = new Set(['en', 'hasta', 'desde', 'fondoDesde', 'enter', 'aparece', 'elegidoDesde', 'suscribir', 'web']);
const CUE_RE = /^(.+?)(?:#(\d+))?([+-]\d+(?:\.\d+)?)?$/;

/** Convierte 'palabra', 'palabra#2', 'palabra+0.5', 'palabra#2-0.3' o un número en segundos de la escena. */
export const resolverCue = (t: EscenaProps['t'], cue: Cue, faltantes?: string[]): number => {
  if (typeof cue === 'number') return cue;
  const m = CUE_RE.exec(cue.trim());
  if (!m) return 0;
  const base = t(m[1], m[2] ? parseInt(m[2], 10) : 1);
  if (base === undefined || Number.isNaN(base)) {
    faltantes?.push(cue);
    return 0;
  }
  return base + (m[3] ? parseFloat(m[3]) : 0);
};

/** Recorre el objeto y convierte a segundos todas las claves de tiempo. */
export const resolverProfundo = <T,>(obj: T, r: (c: Cue) => number): T => {
  if (Array.isArray(obj)) return obj.map((x) => resolverProfundo(x, r)) as unknown as T;
  if (obj && typeof obj === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      out[k] = TIEMPOS.has(k) && (typeof v === 'string' || typeof v === 'number') ? r(v as Cue) : resolverProfundo(v, r);
    }
    return out as T;
  }
  return obj;
};

/** Versión estricta de t(): devuelve undefined si la palabra no está (para validar). */
const crearTEstricto = (palabras: EscenaProps['palabras']) => {
  const t = crearT(palabras);
  return (p: string, n = 1) => {
    const o = normalizar(p);
    const coinciden = palabras.filter((w) => normalizar(w.texto).startsWith(o)).length;
    return coinciden >= n ? t(p, n) : (undefined as unknown as number);
  };
};

/** Anticipación: los bloques aparecen un poco antes de que se diga la palabra. */
const ANTICIPO = 0.25;

export type BloqueResuelto = Bloque & {de: number; a: number};

export const planificar = (esp: EspecEscena, palabras: EscenaProps['palabras'], duracion: number, faltantes?: string[]): BloqueResuelto[] => {
  const t = crearTEstricto(palabras);
  const r = (c: Cue) => resolverCue(t, c, faltantes);
  const resueltos = esp.bloques.map((b) => {
    const de = typeof b.en === 'number' ? b.en : Math.max(0, r(b.en) - ANTICIPO);
    const res = resolverProfundo({...b, en: 0}, r) as unknown as Bloque;
    return {...res, en: de, de, a: Infinity} as BloqueResuelto;
  });
  // Un bloque normal termina cuando empieza el siguiente bloque normal; las capas duran hasta `hasta` o el final.
  const normales = resueltos.filter((b) => !b.capa);
  normales.forEach((b, i) => {
    b.a = normales[i + 1]?.de ?? duracion + 5;
  });
  resueltos.forEach((b) => {
    if (b.hasta !== undefined) b.a = b.hasta as unknown as number;
    if (b.capa && b.hasta === undefined) b.a = duracion + 5;
  });
  return resueltos;
};

/** Lista las palabras clave (cues) que no existen en el audio de cada escena. */
export const validarEpisodio = (esp: EspecEpisodio): string[] => {
  const errores: string[] = [];
  for (const e of esp.manifest.escenas) {
    const def = esp.escenas[e.num];
    if (!def) {
      errores.push(`${e.num}: sin escena visual`);
      continue;
    }
    const faltan: string[] = [];
    const plan = planificar(def, e.palabras, e.duracion, faltan);
    faltan.forEach((f) => errores.push(`${e.num}: no se dice "${f}"`));
    const normales = plan.filter((b) => !b.capa);
    normales.forEach((b, i) => {
      if (i > 0 && b.de < normales[i - 1].de) errores.push(`${e.num}: bloque ${i + 1} (${b.tipo}) empieza antes que el anterior`);
    });
  }
  Object.keys(esp.escenas).forEach((n) => {
    if (!esp.manifest.escenas.some((e) => e.num === n)) errores.push(`${n}: escena visual sin audio`);
  });
  return errores;
};

