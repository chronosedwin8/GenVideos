import type {Manifest} from '../../comun/tipos';
import type {VideoF} from '../motor-tipos';
import manifest from '../../../public/fundales/05-normativa-asistente-legal/manifest.json';
import {cierre, NOTA_ASISTENTE} from './comun';

export const video: VideoF = {
  id: 'Fundales-05-Normativa',
  slug: '05-normativa-asistente-legal',
  tipo: 'explicativo',
  titulo: 'Normativa y Asistente Legal IA',
  manifest: manifest as Manifest,
  miniatura: {lineas: ['¿Por cuál', 'norma', 'empiezo?'], resalta: 'norma', pantalla: 'Normativa', props: {rutaEn: -5}, insignia: 'Ruta por cargo'},
  escenas: {
    '01': {
      bloques: [
        {en: 0, tipo: 'grafico', g: 'Normas'},
        {en: 'empiezas', capa: true, tipo: 'titular', texto: '¿Por cuál empiezo?'},
      ],
    },
    '02': {
      bloques: [
        {
          en: 0,
          tipo: 'pantalla',
          p: 'Normativa',
          props: {rutaEn: 'docente', toques: [{id: 'cargo', en: 'cargo'}]},
          pasos: [{en: 'estandares', scroll: 250}],
          camara: [{en: 'generador', k: 1.3, x: 0.5, y: 0.35}, {en: 'docente', k: 1.2, x: 0.5, y: 0.62}, {en: 'estandares', k: 1.15, x: 0.5, y: 0.5}],
          pasosV: [{en: 'docente', scroll: 250}, {en: 'estandares', scroll: 520}],
          camaraV: [],
        },
        {en: 'prioridad', capa: true, hasta: 'docente', tipo: 'titular', texto: 'Ruta de estudio por prioridad', icono: 'alt_route'},
      ],
    },
    '03': {
      bloques: [{en: 0, tipo: 'pantalla', p: 'Normativa', props: {rutaEn: -30, scroll: 760}, camara: [{en: 0, k: 1.15, x: 0.5, y: 0.3}], pasosV: [{en: 0, scroll: 1060}], camaraV: []}],
    },
    '04': {
      nota: NOTA_ASISTENTE,
      bloques: [
        {
          en: 0,
          tipo: 'pantalla',
          p: 'Normativa',
          props: {rutaEn: -30, scroll: 820, leyEn: 'norma', preguntaDesde: 'escribes', respuestaEn: 'responde', toques: [{id: 'Ley 1620 de 2013', en: 'norma'}, {id: 'enviar', en: 'responde'}]},
          camara: [{en: 'norma', k: 1.3, x: 0.75, y: 0.2}, {en: 'escribes', k: 1.25, x: 0.6, y: 0.65}],
          pasosV: [{en: 0, scroll: 1100}, {en: 'escribes', scroll: 1420}],
          camaraV: [],
        },
        {en: 'asistente', capa: true, hasta: 'norma', tipo: 'titular', texto: 'Asistente Legal IA', sub: 'Premium', icono: 'psychology'},
      ],
    },
    '05': {bloques: [{en: 0, tipo: 'grafico', g: 'Gancho', props: {texto: 'No memorices la ley: aplícala a un caso', icono: 'gavel'}}]},
    '06': cierre('Ruta y biblioteca gratis en'),
  },
};
