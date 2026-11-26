import type {Manifest} from '../../comun/tipos';
import type {VideoF} from '../motor-tipos';
import manifest from '../../../public/fundales/04-coach-ia/manifest.json';
import {cierre, NOTA_COACH} from './comun';

export const video: VideoF = {
  id: 'Fundales-04-CoachIA',
  slug: '04-coach-ia',
  tipo: 'explicativo',
  titulo: 'Coach IA: tu plan de mejora',
  manifest: manifest as Manifest,
  miniatura: {lineas: ['Tu coach', 'con IA', 'te dice qué', 'estudiar'], resalta: 'con IA', pantalla: 'Coach', props: {fase: 'analisis', desde: -5}, insignia: 'PREMIUM'},
  escenas: {
    '01': {
      bloques: [
        {en: 0, tipo: 'grafico', g: 'ListaSims'},
        {en: 'estudiar', capa: true, hasta: 'coach', tipo: 'titular', texto: '¿Qué estudio primero?'},
        {en: 'coach', tipo: 'pantalla', p: 'Coach', props: {fase: 'intro'}},
      ],
    },
    '02': {
      bloques: [
        {
          en: 0,
          tipo: 'pantalla',
          p: 'Coach',
          props: {fase: 'intro', toques: [{id: 'analizar', en: 'analizar'}]},
          pasos: [{en: 'revisa', fase: 'cargando'}],
          camara: [{en: 'analizar', k: 1.4, x: 0.5, y: 0.5}, {en: 'revisa', k: 1, x: 0.5, y: 0.5}],
          camaraV: [{en: 'analizar', k: 1.3, x: 0.5, y: 0.45}, {en: 'revisa', k: 1, x: 0.5, y: 0.5}],
        },
        {en: 'patrones', capa: true, hasta: 'puedes', tipo: 'titular', texto: 'Detecta patrones en tus errores', icono: 'query_stats'},
        {en: 'puedes', capa: true, tipo: 'titular', texto: '1 análisis cada 24 horas', icono: 'schedule'},
      ],
    },
    '03': {
      nota: NOTA_COACH,
      bloques: [{en: 0, tipo: 'pantalla', p: 'Coach', props: {fase: 'analisis', desde: 'fortalezas'}, camara: [{en: 0, k: 1.3, x: 0.5, y: 0.35}], camaraV: []}],
    },
    '04': {
      nota: NOTA_COACH,
      bloques: [
        {
          en: 0,
          tipo: 'pantalla',
          p: 'Coach',
          props: {fase: 'analisis', desde: -9, scroll: 330},
          pasos: [{en: 'normativa', scroll: 760}],
          camara: [{en: 'recomendaciones', k: 1.2, x: 0.5, y: 0.4}, {en: 'resumen', k: 1.2, x: 0.5, y: 0.8}, {en: 'normativa', k: 1.25, x: 0.5, y: 0.6}],
          pasosV: [{en: 0, scroll: 620}, {en: 'resumen', scroll: 1150}, {en: 'normativa', scroll: 1500}],
          camaraV: [],
        },
      ],
    },
    '05': {
      nota: NOTA_COACH,
      bloques: [
        {en: 0, tipo: 'pantalla', p: 'Coach', props: {fase: 'analisis', desde: -9, toques: [{id: 'pdf', en: 'descargas'}]}, camara: [{en: 0, k: 1.6, x: 0.8, y: 0.12}], camaraV: [{en: 0, k: 1.5, x: 0.75, y: 0.12}]},
        {en: 'plan', tipo: 'pantalla', p: 'DocumentoPdf', props: {tipo: 'plan', desde: 'plan'}},
      ],
    },
    '06': cierre('Conócelo en', true),
  },
};
