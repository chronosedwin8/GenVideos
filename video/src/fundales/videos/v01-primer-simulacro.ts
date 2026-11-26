import type {Manifest} from '../../comun/tipos';
import type {VideoF} from '../motor-tipos';
import manifest from '../../../public/fundales/01-primer-simulacro/manifest.json';
import {cierre, NOTA_EJEMPLO, NOTA_PREGUNTA} from './comun';

export const video: VideoF = {
  id: 'Fundales-01-PrimerSimulacro',
  slug: '01-primer-simulacro',
  tipo: 'explicativo',
  titulo: 'Tu primer simulacro en 1 minuto',
  manifest: manifest as Manifest,
  miniatura: {lineas: ['Tu primer', 'simulacro', 'en 1 minuto'], resalta: 'en 1 minuto', pantalla: 'Configuracion', props: {modo: 'diag'}, insignia: 'GRATIS'},
  escenas: {
    '01': {
      bloques: [
        {en: 0, tipo: 'pantalla', p: 'Inicio'},
        {en: 'minuto', capa: true, tipo: 'titular', texto: 'Tu primer simulacro en 1 minuto', icono: 'timer'},
      ],
    },
    '02': {
      bloques: [
        {en: 0, tipo: 'pantalla', p: 'Inicio', props: {toques: [{id: 'empezar', en: 'empezar'}]}, camaraV: [{en: 'entras', k: 1.15, x: 0.5, y: 0.55}]},
        {
          en: 'escribes',
          tipo: 'pantalla',
          p: 'Registro',
          props: {nombreDesde: 'nombre', rol: 'Docente de Aula', rolEn: 'cargo+0.5', area: 'Primaria', areaEn: 'primaria', correoDesde: 'correo', claveDesde: 'contrasena', toques: [{id: 'rol', en: 'cargo'}, {id: 'area', en: 'area'}, {id: 'crear', en: 'cuenta'}]},
          camara: [{en: 'escribes', k: 1.3, x: 0.33, y: 0.5}],
          camaraV: [],
        },
        {en: 'diecisiete', capa: true, hasta: 'correo', tipo: 'titular', texto: '17 áreas de conocimiento', icono: 'category'},
        {en: 'tarjeta', capa: true, tipo: 'titular', texto: 'Gratis y sin tarjeta', icono: 'credit_card_off'},
      ],
    },
    '03': {
      bloques: [
        {
          en: 0,
          tipo: 'pantalla',
          p: 'Configuracion',
          props: {modo: 'diag', cantidad: 5, cantidadDesde: 'cantidad', cantidadA: 10, toques: [{id: 'diag', en: 'diagnostico'}, {id: 'generar', en: 'generar'}]},
          camara: [
            {en: 'estrategia', k: 1.2, x: 0.35, y: 0.25},
            {en: 'diagnostico', k: 1.35, x: 0.38, y: 0.4},
            {en: 'ajustas', k: 1.6, x: 0.74, y: 0.48},
            {en: 'generar', k: 1.5, x: 0.74, y: 0.75},
          ],
          pasosV: [{en: 'ajustas', scroll: 480}],
          camaraV: [{en: 'diagnostico', k: 1.25, x: 0.5, y: 0.4}, {en: 'ajustas', k: 1, x: 0.5, y: 0.5}],
        },
      ],
    },
    '04': {
      nota: NOTA_PREGUNTA,
      bloques: [
        {en: 0, tipo: 'pantalla', p: 'Cargando', props: {desde: 0, hasta: 'cargo'}},
        {
          en: 'cada',
          tipo: 'pantalla',
          p: 'Simulador',
          props: {n: 1, total: 10, relojDesde: 'cada', elegida: 'B', elegidaEn: 'eliges', toques: [{id: 'B', en: 'eliges'}, {id: 'confirmar', en: 'confirmas'}]},
          camara: [
            {en: 'situacional', k: 1.35, x: 0.3, y: 0.45},
            {en: 'opciones', k: 1.25, x: 0.7, y: 0.5},
            {en: 'cronometro', k: 2, x: 0.86, y: 0.17},
            {en: 'eliges', k: 1.2, x: 0.68, y: 0.55},
          ],
          pasosV: [{en: 'opciones', scroll: 560}, {en: 'cronometro', scroll: 0}, {en: 'eliges', scroll: 600}],
          camaraV: [{en: 'cronometro', k: 1.6, x: 0.8, y: 0.1}, {en: 'eliges', k: 1, x: 0.5, y: 0.5}],
        },
      ],
    },
    '05': {
      nota: NOTA_EJEMPLO,
      bloques: [
        {
          en: 0,
          tipo: 'pantalla',
          p: 'Resultados',
          props: {puntaje: 80, desde: 'puntaje'},
          pasos: [{en: 'respuesta', scroll: 380}],
          camara: [{en: 'desempeno', k: 1.3, x: 0.62, y: 0.42}, {en: 'respuesta', k: 1.15, x: 0.5, y: 0.6}],
          pasosV: [{en: 'desempeno', scroll: 330}, {en: 'respuesta', scroll: 820}],
          camaraV: [],
        },
      ],
    },
    '06': cierre(),
  },
};
