import type {EscenaF} from '../motor-tipos';

export const NOTA_PREGUNTA = 'Pregunta real del simulador · cargo Rector';
export const NOTA_EJEMPLO = 'Datos de ejemplo';
export const NOTA_COACH = 'Análisis real del Coach IA · perfil Rector';
export const NOTA_ASISTENTE = 'Respuesta real del Asistente Legal IA';

/** Escena final: logo + fundales.com + aviso (siempre). */
export const cierre = (extra?: string, premium?: boolean): EscenaF => ({bloques: [{en: 0, tipo: 'cierre', extra, premium}]});
