import type {Manifest} from '../../comun/tipos';
import type {VideoF} from '../motor-tipos';
import manifest from '../../../public/fundales/06-entrevista-ia/manifest.json';
import {cierre} from './comun';

export const video: VideoF = {
  id: 'Fundales-06-EntrevistaIA',
  slug: '06-entrevista-ia',
  tipo: 'explicativo',
  titulo: 'Simulacro de entrevista con IA',
  manifest: manifest as Manifest,
  miniatura: {lineas: ['Practica tu', 'entrevista', 'hablando', 'con IA'], resalta: 'entrevista', pantalla: 'Entrevista', insignia: 'PREMIUM'},
  escenas: {
    '01': {
      bloques: [
        {en: 0, tipo: 'grafico', g: 'Micro'},
        {en: 'hablando', capa: true, tipo: 'titular', texto: 'Practica tu entrevista… hablando'},
      ],
    },
    '02': {bloques: [{en: 0, tipo: 'pantalla', p: 'Entrevista', camara: [{en: 'agente', k: 1.3, x: 0.5, y: 0.3}], camaraV: [{en: 'agente', k: 1.2, x: 0.5, y: 0.3}]}]},
    '03': {
      bloques: [
        {
          en: 0,
          tipo: 'pantalla',
          p: 'Entrevista',
          camara: [{en: 'ocho', k: 1.7, x: 0.27, y: 0.62}, {en: 'mes', k: 1.7, x: 0.42, y: 0.62}, {en: 'audifonos', k: 1.7, x: 0.73, y: 0.62}],
          camaraV: [{en: 'ocho', k: 1.5, x: 0.28, y: 0.62}, {en: 'mes', k: 1.5, x: 0.72, y: 0.62}, {en: 'audifonos', k: 1.5, x: 0.72, y: 0.8}],
        },
      ],
    },
    '04': {bloques: [{en: 0, tipo: 'pantalla', p: 'Entrevista', props: {modalEn: 'comienzas', toques: [{id: 'iniciar', en: 'iniciar'}]}, camara: [{en: 0, k: 1.3, x: 0.5, y: 0.8}, {en: 'comienzas', k: 1, x: 0.5, y: 0.5}], camaraV: []}]},
    '05': {
      bloques: [
        {en: 0, tipo: 'pantalla', p: 'Planes', props: {entrevistaEn: 'activas', toques: [{id: 'entrevista', en: 'activas'}]}, camara: [{en: 'activas', k: 1.6, x: 0.5, y: 0.22}, {en: 'doce', k: 1, x: 0.5, y: 0.5}], camaraV: [{en: 'activas', k: 1.4, x: 0.5, y: 0.25}]},
        {en: 'doce', capa: true, tipo: 'titular', texto: '12 sesiones al año', icono: 'mic'},
      ],
    },
    '06': cierre('Conócelo en', true),
  },
};
