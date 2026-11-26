import type {Manifest} from '../../comun/tipos';
import type {VideoF} from '../motor-tipos';
import manifest from '../../../public/fundales/03-resultados-estadisticas/manifest.json';
import {cierre, NOTA_EJEMPLO} from './comun';

export const video: VideoF = {
  id: 'Fundales-03-Resultados',
  slug: '03-resultados-estadisticas',
  tipo: 'explicativo',
  titulo: 'Cómo leer tus resultados',
  manifest: manifest as Manifest,
  miniatura: {lineas: ['¿Estás', 'mejorando', 'de verdad?'], resalta: 'mejorando', pantalla: 'Tablero', props: {desde: -5}, insignia: 'Tu avance real'},
  escenas: {
    '01': {
      bloques: [
        {en: 0, tipo: 'grafico', g: 'Puntaje', props: {valor: 74}},
        {en: 'ojos', capa: true, tipo: 'titular', texto: '¿Y ahora qué hago con este número?'},
      ],
    },
    '02': {
      nota: NOTA_EJEMPLO,
      bloques: [
        {
          en: 0,
          tipo: 'pantalla',
          p: 'Resultados',
          props: {puntaje: 80, desde: 'puntaje'},
          camara: [{en: 'puntaje', k: 1.4, x: 0.28, y: 0.45}, {en: 'lado', k: 1.35, x: 0.65, y: 0.45}],
          pasosV: [{en: 'lado', scroll: 330}],
          camaraV: [],
        },
        {en: 'setenta', capa: true, tipo: 'titular', texto: 'Verde: desde el 70 %', sub: 'Amarillo: a reforzar', icono: 'insights'},
      ],
    },
    '03': {
      nota: NOTA_EJEMPLO,
      bloques: [
        {
          en: 0,
          tipo: 'pantalla',
          p: 'Resultados',
          props: {puntaje: 80, desde: -5, scroll: 380},
          camara: [{en: 'respuesta', k: 1.3, x: 0.5, y: 0.36}, {en: 'norma', k: 1.6, x: 0.42, y: 0.28}, {en: 'retroalimentacion', k: 1.35, x: 0.5, y: 0.55}],
          pasosV: [{en: 0, scroll: 820}],
          camaraV: [],
        },
        {en: 'norma', capa: true, tipo: 'titular', texto: 'Con la norma: ley y artículo', icono: 'gavel'},
      ],
    },
    '04': {
      nota: NOTA_EJEMPLO,
      bloques: [
        {en: 0, tipo: 'pantalla', p: 'Resultados', props: {puntaje: 80, desde: -5, pdfEn: 'guardar', toques: [{id: 'pdf', en: 'guardar'}]}, camara: [{en: 0, k: 1.6, x: 0.84, y: 0.17}], camaraV: [{en: 0, k: 1.5, x: 0.3, y: 0.18}]},
        {en: 'pdf', tipo: 'pantalla', p: 'DocumentoPdf', props: {tipo: 'reporte', desde: 'pdf'}},
      ],
    },
    '05': {
      nota: NOTA_EJEMPLO,
      bloques: [
        {
          en: 0,
          tipo: 'pantalla',
          p: 'Tablero',
          props: {desde: 'tablero'},
          pasos: [{en: 'consolidado', scroll: 560}],
          camara: [{en: 'pruebas', k: 1.5, x: 0.5, y: 0.3}, {en: 'curva', k: 1.15, x: 0.5, y: 0.62}, {en: 'consolidado', k: 1, x: 0.5, y: 0.5}],
          pasosV: [{en: 'curva', scroll: 420}, {en: 'consolidado', scroll: 1150}],
          camaraV: [{en: 'pruebas', k: 1.3, x: 0.5, y: 0.35}, {en: 'curva', k: 1, x: 0.5, y: 0.5}],
        },
        {en: 'asi', capa: true, tipo: 'titular', texto: '¿De verdad estás mejorando?', icono: 'trending_up'},
      ],
    },
    '06': cierre('Mide tu avance real en'),
  },
};
