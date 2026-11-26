import type {Manifest} from '../comun/tipos';

/** Momento: 'palabra' · 'palabra#2' · 'palabra+0.5' · número de segundos (igual que el motor del canal). */
export type Cue = string | number;

export type Camara = {en: Cue; k: number; x?: number; y?: number};

type Comun = {en: Cue; hasta?: Cue; capa?: boolean};

export type BloqueF =
  /** Pantalla de la app (p = nombre en PANTALLAS). `pasos` cambian props en el tiempo; `camara` hace zoom. */
  | (Comun & {
      tipo: 'pantalla';
      p: string;
      props?: Record<string, unknown>;
      pasos?: Array<{en: Cue} & Record<string, unknown>>;
      /** Pasos solo para el vertical (p. ej. `scroll`, porque en móvil todo va en una columna). */
      pasosV?: Array<{en: Cue} & Record<string, unknown>>;
      camara?: Camara[];
      /** Cámara del vertical (si no, usa `camara`; [] = sin zoom). */
      camaraV?: Camara[];
      ruta?: string;
    })
  /** Titular grande (vertical: arriba; horizontal: tarjeta sobre la ventana). */
  | (Comun & {tipo: 'titular'; texto: string; sub?: string; icono?: string})
  /** Gráfico de pantalla completa (g = nombre en GRAFICOS). */
  | (Comun & {tipo: 'grafico'; g: string; props?: Record<string, unknown>})
  /** Tarjeta final: logo + fundales.com + aviso. */
  | (Comun & {tipo: 'cierre'; extra?: string; premium?: boolean});

export type EscenaF = {bloques: BloqueF[]; /** Nota pequeña sobre la interfaz, p. ej. "Datos de ejemplo". */ nota?: string};

export type VideoF = {
  id: string;
  slug: string;
  tipo: 'explicativo' | 'promo';
  titulo: string;
  manifest: Manifest;
  escenas: Record<string, EscenaF>;
  miniatura: {lineas: string[]; resalta?: string; pantalla?: string; props?: Record<string, unknown>; insignia?: string};
};
