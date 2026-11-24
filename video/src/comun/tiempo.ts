import {Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import type {Palabra} from './tipos';

/** Segundos transcurridos dentro de la secuencia actual. */
export const useSegundos = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return frame / fps;
};

/** Resorte 0→1 que empieza en `desde` (segundos). Función pura: se puede usar dentro de map(). */
export const entrada = (s: number, fps: number, desde = 0, rigidez = 170) =>
  spring({
    frame: Math.round((s - desde) * fps),
    fps,
    config: {damping: 14, stiffness: rigidez, mass: 0.6},
  });

/** Progreso lineal suavizado 0→1 entre desde y desde+dur. */
export const progreso = (s: number, desde: number, dur: number) =>
  interpolate(s, [desde, desde + Math.max(dur, 0.001)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

/** Visible entre desde y hasta, con fundido. */
export const visible = (s: number, desde: number, hasta = Infinity, fundido = 0.25) =>
  Math.min(progreso(s, desde, fundido), hasta === Infinity ? 1 : 1 - progreso(s, hasta - fundido, fundido));

export const normalizar = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]/g, '');

/** Crea la función t(palabra, n) para una escena: segundo en que empieza la n-ésima ocurrencia de esa palabra.
 *  Busca primero coincidencia exacta (sin tildes ni signos); si no hay, por prefijo. */
export const crearT = (palabras: Palabra[]) => (p: string, n = 1) => {
  const objetivo = normalizar(p);
  const buscar = (igual: (w: string) => boolean) => {
    let k = 0;
    for (const w of palabras) {
      if (igual(normalizar(w.texto))) {
        k++;
        if (k === n) return w.inicio;
      }
    }
    return undefined;
  };
  return buscar((w) => w === objetivo) ?? buscar((w) => w.startsWith(objetivo)) ?? 0;
};

/** Sombra que dibuja un contorno grueso alrededor del texto (estilo miniaturas del canal). */
export const contorno = (ancho: number, color = '#000', sombra = true) => {
  const capas: string[] = [];
  for (let a = 0; a < 16; a++) {
    const r = (a / 16) * Math.PI * 2;
    capas.push(`${(Math.cos(r) * ancho).toFixed(1)}px ${(Math.sin(r) * ancho).toFixed(1)}px 0 ${color}`);
  }
  if (sombra) capas.push(`${ancho * 0.9}px ${ancho * 1.6}px 0 ${color}`);
  return capas.join(', ');
};

/** Palabras falsas espaciadas de manera uniforme (para demos sin audio). */
export const palabrasFalsas = (texto: string, desde: number, ppm = 140): Palabra[] => {
  const dur = 60 / ppm;
  return texto.split(/\s+/).map((w, i) => ({texto: w, inicio: desde + i * dur, fin: desde + (i + 0.85) * dur}));
};
