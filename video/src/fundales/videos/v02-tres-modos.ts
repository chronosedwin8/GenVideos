import type {Manifest} from '../../comun/tipos';
import type {VideoF} from '../motor-tipos';
import manifest from '../../../public/fundales/02-tres-modos/manifest.json';
import {cierre, NOTA_PREGUNTA} from './comun';

export const video: VideoF = {
  id: 'Fundales-02-TresModos',
  slug: '02-tres-modos',
  tipo: 'explicativo',
  titulo: 'Los 3 modos de entrenamiento',
  manifest: manifest as Manifest,
  miniatura: {lineas: ['3 modos', 'de entrenar', 'el concurso'], resalta: '3 modos', pantalla: 'Configuracion', props: {modo: 'cnsc', cantidad: 30}, insignia: '¿Cuál usas?'},
  escenas: {
    '01': {
      bloques: [
        {en: 0, tipo: 'grafico', g: 'Gancho', props: {texto: '¿Estudias siempre igual?', icono: 'repeat'}},
        {en: 'tres', tipo: 'pantalla', p: 'Configuracion', props: {modo: 'diag'}},
        {en: 'tres', capa: true, tipo: 'titular', texto: '3 modos de entrenamiento', icono: 'tune'},
      ],
    },
    '02': {
      bloques: [
        {
          en: 0,
          tipo: 'pantalla',
          p: 'Configuracion',
          props: {modo: 'diag', cantidad: 10, toques: [{id: 'diag', en: 'diagnostico'}]},
          pasos: [{en: 'cinco', cantidad: 5}, {en: 'quince', cantidad: 15}, {en: 'comenzar', cantidad: 10}],
          camara: [{en: 'diagnostico', k: 1.4, x: 0.38, y: 0.4}, {en: 'cinco', k: 1.6, x: 0.74, y: 0.45}, {en: 'comenzar', k: 1, x: 0.5, y: 0.5}],
          pasosV: [{en: 'cinco', scroll: 480}, {en: 'comenzar', scroll: 0}],
          camaraV: [],
        },
        {en: 'diez', capa: true, tipo: 'titular', texto: 'Diagnóstico: 10 preguntas', sub: 'Para medir dónde estás', icono: 'health_and_safety'},
      ],
    },
    '03': {
      nota: NOTA_PREGUNTA,
      bloques: [
        {en: 0, tipo: 'pantalla', p: 'Configuracion', props: {modo: 'cnsc', cantidad: 30, toques: [{id: 'cnsc', en: 'simulacro'}]}, camara: [{en: 'simulacro', k: 1.35, x: 0.38, y: 0.5}], camaraV: [{en: 'simulacro', k: 1.25, x: 0.5, y: 0.5}]},
        {
          en: 'cronometro',
          tipo: 'pantalla',
          p: 'Simulador',
          props: {n: 4, total: 30, tiempo: 3240, relojDesde: 'cronometro'},
          camara: [{en: 'cronometro', k: 2, x: 0.86, y: 0.17}, {en: 'mezclan', k: 1.3, x: 0.3, y: 0.3}, {en: 'aqui', k: 1, x: 0.5, y: 0.5}],
          camaraV: [{en: 'cronometro', k: 1.6, x: 0.8, y: 0.1}, {en: 'mezclan', k: 1, x: 0.5, y: 0.5}],
        },
        {en: 'tiempo', capa: true, tipo: 'titular', texto: 'Entrena el tiempo y los nervios', icono: 'timer'},
      ],
    },
    '04': {
      nota: NOTA_PREGUNTA,
      bloques: [
        {
          en: 0,
          tipo: 'pantalla',
          p: 'Configuracion',
          props: {modo: 'foco', cantidad: 15, rol: 'Rector', listaEn: 'competencia', competencia: 'Razonamiento Cuantitativo', competenciaEn: 'razonamiento', toques: [{id: 'foco', en: 'focalizado'}, {id: 'lista', en: 'competencia'}]},
          camara: [{en: 'focalizado', k: 1.3, x: 0.38, y: 0.6}, {en: 'competencia', k: 1.5, x: 0.75, y: 0.45}],
          pasosV: [{en: 'competencia', scroll: 480}],
          camaraV: [],
        },
        {
          en: 'practicas',
          tipo: 'pantalla',
          p: 'Simulador',
          props: {practica: true, n: 1, total: 15, elegida: 'B', elegidaEn: 'respondes', verificadaEn: 'acertaste', toques: [{id: 'B', en: 'respondes'}, {id: 'confirmar', en: 'dice'}]},
          pasos: [{en: 'acertaste', scroll: 330}],
          camara: [{en: 'respondes', k: 1.25, x: 0.7, y: 0.45}, {en: 'acertaste', k: 1.2, x: 0.7, y: 0.62}],
          pasosV: [{en: 'respondes', scroll: 600}, {en: 'acertaste', scroll: 1150}],
          camaraV: [],
        },
        {en: 'debil', capa: true, tipo: 'titular', texto: 'Refuerza tu punto débil', icono: 'category'},
      ],
    },
    '05': {bloques: [{en: 0, tipo: 'grafico', g: 'Ciclo', props: {pasos: [{desde: 'diagnostico'}, {desde: 'focalizado'}, {desde: 'simulacro'}]}}]},
    '06': cierre('Prueba los 3 modos gratis en'),
  },
};
