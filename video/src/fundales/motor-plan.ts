import {crearT, normalizar} from '../comun/tiempo';
import {resolverCue} from '../comun/motor-plan';
import type {Palabra} from '../comun/tipos';
import type {BloqueF, Cue, EscenaF, VideoF} from './motor-tipos';

/** Claves de tiempo: en, desde, hasta y cualquier clave que termine en "En" o "Desde". */
const esTiempo = (k: string) => k === 'en' || k === 'desde' || k === 'hasta' || /En$|Desde$/.test(k);

const resolver = <T,>(obj: T, r: (c: Cue) => number): T => {
  if (Array.isArray(obj)) return obj.map((x) => resolver(x, r)) as unknown as T;
  if (obj && typeof obj === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj as Record<string, unknown>)) {
      out[k] = esTiempo(k) && (typeof v === 'string' || typeof v === 'number') ? r(v as Cue) : resolver(v, r);
    }
    return out as T;
  }
  return obj;
};

const tEstricto = (palabras: Palabra[]) => {
  const t = crearT(palabras);
  return (p: string, n = 1) => {
    const o = normalizar(p);
    return palabras.filter((w) => normalizar(w.texto).startsWith(o)).length >= n ? t(p, n) : (undefined as unknown as number);
  };
};

const ANTICIPO = 0.2;
export type BloqueR = BloqueF & {de: number; a: number};

export const planificarF = (esc: EscenaF, palabras: Palabra[], duracion: number, faltantes?: string[]): BloqueR[] => {
  const t = tEstricto(palabras);
  const r = (c: Cue) => resolverCue(t, c, faltantes);
  const res = esc.bloques.map((b) => {
    const de = typeof b.en === 'number' ? b.en : Math.max(0, r(b.en) - ANTICIPO);
    return {...(resolver({...b, en: 0}, r) as BloqueF), en: de, de, a: Infinity} as BloqueR;
  });
  const normales = res.filter((b) => !b.capa);
  normales.forEach((b, i) => (b.a = normales[i + 1]?.de ?? duracion + 5));
  res.forEach((b) => {
    if (b.hasta !== undefined) b.a = b.hasta as number;
    else if (b.capa) b.a = duracion + 5;
  });
  return res;
};

export const validarVideoF = (v: VideoF): string[] => {
  const errores: string[] = [];
  for (const e of v.manifest.escenas) {
    const def = v.escenas[e.num];
    if (!def) {
      errores.push(`${e.num}: sin escena visual`);
      continue;
    }
    const faltan: string[] = [];
    const plan = planificarF(def, e.palabras, e.duracion, faltan);
    faltan.forEach((f) => errores.push(`${e.num}: no se dice "${f}"`));
    const normales = plan.filter((b) => !b.capa);
    normales.forEach((b, i) => {
      if (i > 0 && b.de < normales[i - 1].de) errores.push(`${e.num}: bloque ${i + 1} (${b.tipo}) empieza antes que el anterior`);
    });
  }
  Object.keys(v.escenas).forEach((n) => {
    if (!v.manifest.escenas.some((e) => e.num === n)) errores.push(`${n}: escena visual sin audio`);
  });
  return errores;
};
