import type {Manifest} from './tipos';

/**
 * Tipos del motor de escenas declarativo (solo datos: sin React, para poder validarlos con Node).
 *
 * Un "cue" marca el momento en que pasa algo:
 *   - 'palabra'        → cuando la voz dice esa palabra (primera vez; coincide por prefijo, sin tildes)
 *   - 'palabra#2'      → la segunda vez que la dice
 *   - 'palabra+0.5'    → medio segundo después (también 'palabra#2-0.3')
 *   - 3.2              → segundo exacto de la escena
 */
export type Cue = string | number;

export type LineaEsp = {texto: string; color?: string; tamano?: number};

type Base = {
  /** Cuándo aparece el bloque (se anticipa 0,25 s a la palabra). */
  en: Cue;
  /** Cuándo desaparece (por defecto, cuando empieza el siguiente bloque normal). */
  hasta?: Cue;
  /** Las capas se superponen a los bloques normales y no los cortan. */
  capa?: boolean;
};

export type Bloque = Base &
  (
    | {tipo: 'titulo'; lineas: LineaEsp[]; tamano?: number; rotacion?: number; sub?: string; texto?: string}
    | {tipo: 'tarjeta'; titulo: string; texto: string; icono?: string; fuente?: string; color?: string; ancho?: number}
    | {tipo: 'tarjetas'; titulo?: string; items: {titulo: string; texto: string; icono?: string; fuente?: string; color?: string; desde?: Cue}[]}
    | {tipo: 'lista'; titulo?: string; items: {texto: string; desde: Cue; icono?: string}[]}
    | {tipo: 'cuadricula'; titulo?: string; items: {icono: string; texto: string; desde: Cue}[]}
    | {tipo: 'numero'; n: number; total?: number; texto: string}
    | {tipo: 'cifra'; valor: string; texto: string; fuente?: string; color?: string}
    | {tipo: 'hoja'; hoja: Record<string, unknown>}
    | {
        tipo: 'codigo';
        codigo: string;
        archivo?: string;
        velocidad?: number;
        tamano?: number;
        ancho?: number;
        resaltar?: {lineas: number[]; desde: Cue; hasta?: Cue}[];
        /** Salida de la terminal a la derecha del código. */
        salida?: {texto: string; desde: Cue; color?: string}[];
        salidaY?: number;
        tituloSalida?: string;
      }
    | {tipo: 'terminal'; lineas: {texto: string; desde: Cue; color?: string}[]; titulo?: string; ancho?: number}
    | {tipo: 'chat'; mensajes: {rol: 'yo' | 'ia'; texto: string; desde: Cue; duracion?: number}[]; titulo?: string; panel?: boolean}
    | {
        tipo: 'comparar';
        titulo?: string;
        izq: {titulo: string; icono?: string; color?: string; desde?: Cue; items: {texto: string; desde: Cue; icono?: string}[]};
        der: {titulo: string; icono?: string; color?: string; desde?: Cue; items: {texto: string; desde: Cue; icono?: string}[]};
      }
    | {tipo: 'formula'; formula: string; titulo?: string; escribir?: boolean; partes?: {texto: string; nota: string; desde: Cue; ocurrencia?: number}[]}
    | {tipo: 'cronologia'; titulo?: string; items: {fecha: string; texto: string; desde: Cue; icono?: string; color?: string}[]}
    | {tipo: 'teclas'; teclas: string[]; texto?: string}
    | {tipo: 'cortinilla'; titulo?: string}
    | {tipo: 'cierre'; siguiente: string; suscribir?: Cue}
    | {tipo: 'resumen'; titulo?: string; ideas: {texto: string; desde: Cue}[]}
    | {tipo: 'errores'; titulo?: string; items: {mal: string; bien: string; desde: Cue}[]}
    | {tipo: 'logo'; texto?: string}
    | {tipo: 'pildora'; texto: string; abajo?: boolean; tamano?: number}
  );

export type EspecEscena = {
  fondo?: 'naranja' | 'azul' | 'claro' | 'oscuro';
  sinSubtitulos?: boolean;
  /** Etiqueta "PASO N" arriba a la izquierda. */
  paso?: {n: number | string; texto?: string; prefijo?: string; en?: Cue};
  bloques: Bloque[];
};

export type EspecShort = {
  id: string;
  /** Escena del video largo que se reutiliza (su audio: no gasta créditos). */
  escena: string;
  /** Palabra donde empieza el Short (recorta lo anterior). */
  desde?: Cue;
  gancho: LineaEsp[];
};

export type EspecMiniatura = {
  lineas: LineaEsp[];
  pildora?: string;
  insignia?: string;
  /** Apoyo visual: mini hoja de Excel o mini código. */
  filas?: (string | number)[][];
  formula?: string;
  resaltarFila?: number;
  codigo?: string;
};

export type EspecEpisodio = {
  canal: string;
  slug: string;
  /** Id de la composición en Remotion (p. ej. 'EdwinO-FormulasConIA'). */
  id: string;
  manifest: Manifest;
  escenas: Record<string, EspecEscena>;
  shorts: EspecShort[];
  miniatura: EspecMiniatura;
};
