import type {Manifest} from '../../comun/tipos';
import type {VideoF} from '../motor-tipos';
import m07 from '../../../public/fundales/07-promo-fechas-2027/manifest.json';
import m08 from '../../../public/fundales/08-promo-plan-gratis/manifest.json';
import m09 from '../../../public/fundales/09-promo-planes-precios/manifest.json';
import m10 from '../../../public/fundales/10-promo-por-cargo/manifest.json';
import m11 from '../../../public/fundales/11-promo-matematicas/manifest.json';
import m12 from '../../../public/fundales/12-promo-quiz-situacional/manifest.json';
import {cierre, NOTA_EJEMPLO, NOTA_PREGUNTA} from './comun';

export const v07: VideoF = {
  id: 'Fundales-07-Fechas2027',
  slug: '07-promo-fechas-2027',
  tipo: 'promo',
  titulo: 'Nuevas fechas del concurso docente',
  manifest: m07 as Manifest,
  miniatura: {lineas: ['Concurso', 'docente:', 'nuevas fechas'], resalta: 'nuevas fechas', insignia: 'Pruebas en 2027'},
  escenas: {
    '01': {
      bloques: [
        {en: 0, tipo: 'grafico', g: 'Calendario', props: {selloEn: 'fechas'}},
        {en: 0, capa: true, tipo: 'titular', texto: '¿Cambiaron las fechas?'},
      ],
    },
    '02': {
      bloques: [
        {
          en: 0,
          tipo: 'grafico',
          g: 'Cronologia',
          props: {
            items: [
              {fecha: 'Comienzos de 2027', texto: 'Inscripciones', icono: 'how_to_reg', desde: 'inscripciones'},
              {fecha: '2.º semestre de 2027', texto: 'Pruebas escritas', icono: 'edit_note', desde: 'pruebas'},
            ],
            nota: 'Según el cronograma ajustado por la CNSC y la prensa (nov. 2026). Fechas sujetas a cambios: consulta cnsc.gov.co.',
          },
        },
      ],
    },
    '03': {
      nota: NOTA_PREGUNTA,
      bloques: [
        {en: 0, tipo: 'pantalla', p: 'Simulador', props: {n: 3, total: 30, tiempo: 3300, relojDesde: 0}},
        {en: 0, capa: true, hasta: 'dos', tipo: 'titular', texto: 'Tiempo para entrenar', icono: 'fitness_center'},
        {en: 'dos', tipo: 'grafico', g: 'Cifras', props: {items: [{n: 2300, texto: 'aspirantes registrados', desde: 'dos'}, {n: 1500, texto: 'simulacros realizados', desde: 'practican'}]}},
      ],
    },
    '04': cierre('Empieza gratis hoy en'),
  },
};

export const v08: VideoF = {
  id: 'Fundales-08-PlanGratis',
  slug: '08-promo-plan-gratis',
  tipo: 'promo',
  titulo: 'Gratis por un año',
  manifest: m08 as Manifest,
  miniatura: {lineas: ['Simulador', 'docente', 'GRATIS', 'por 1 año'], resalta: 'GRATIS', pantalla: 'Planes', props: {soloFree: true}, insignia: 'Sin tarjeta'},
  escenas: {
    '01': {bloques: [{en: 0, tipo: 'grafico', g: 'PrecioCero'}]},
    '02': {
      nota: NOTA_EJEMPLO,
      bloques: [
        {en: 0, tipo: 'pantalla', p: 'Planes', props: {soloFree: true, resaltar: 'Free', resaltarEn: 'free'}, camara: [{en: 'dos', k: 1.6, x: 0.5, y: 0.62}], camaraV: [{en: 'dos', k: 1.3, x: 0.5, y: 0.6}]},
        {en: 'preguntas', tipo: 'pantalla', p: 'Simulador', props: {n: 1, total: 5, relojDesde: 'preguntas'}, camara: [{en: 'preguntas', k: 1.3, x: 0.3, y: 0.45}], camaraV: []},
        {en: 'resultados', tipo: 'pantalla', p: 'Resultados', props: {puntaje: 80, desde: 'resultados'}, camara: [{en: 'resultados', k: 1.2, x: 0.55, y: 0.42}], camaraV: []},
        {en: 'tarjeta', tipo: 'pantalla', p: 'Planes', props: {soloFree: true}, camara: [{en: 'tarjeta', k: 1.8, x: 0.5, y: 0.35}], camaraV: [{en: 'tarjeta', k: 1.5, x: 0.5, y: 0.35}]},
        {en: 'mes', capa: true, hasta: 'preguntas', tipo: 'titular', texto: '2 simulacros al mes', icono: 'calendar_month'},
      ],
    },
    '03': cierre('Pruébalo antes de decidir en'),
  },
};

export const v09: VideoF = {
  id: 'Fundales-09-Planes',
  slug: '09-promo-planes-precios',
  tipo: 'promo',
  titulo: 'Planes y precios',
  manifest: m09 as Manifest,
  miniatura: {lineas: ['¿Cuánto', 'cuesta', 'prepararte?'], resalta: 'cuesta', pantalla: 'Planes', insignia: 'Desde $0'},
  escenas: {
    '01': {
      bloques: [
        {en: 0, tipo: 'grafico', g: 'Gancho', props: {texto: '¿Cuánto cuesta prepararte en serio?', icono: 'payments'}},
        {en: 'menos', tipo: 'pantalla', p: 'Planes'},
      ],
    },
    '02': {
      bloques: [
        {
          en: 0,
          tipo: 'pantalla',
          p: 'Planes',
          props: {desde: -5},
          pasos: [
            {en: 'basico', resaltar: 'Básico', resaltarEn: 'basico'},
            {en: 'intermedio', resaltar: 'Intermedio', resaltarEn: 'intermedio'},
            {en: 'avanzado', resaltar: 'Avanzado', resaltarEn: 'avanzado'},
          ],
          camara: [{en: 'basico', k: 1.5, x: 0.4, y: 0.6}, {en: 'intermedio', k: 1.5, x: 0.6, y: 0.6}, {en: 'avanzado', k: 1.5, x: 0.79, y: 0.6}],
          pasosV: [{en: 'basico', scroll: 560}, {en: 'intermedio', scroll: 900}, {en: 'avanzado', scroll: 1240}],
          camaraV: [],
        },
      ],
    },
    '03': {
      bloques: [
        {en: 0, tipo: 'pantalla', p: 'Planes', props: {desde: -5, entrevistaEn: 'agregar', toques: [{id: 'entrevista', en: 'agregar'}]}, camara: [{en: 'agregar', k: 1.15, x: 0.5, y: 0.45}], camaraV: [{en: 'agregar', k: 1.3, x: 0.5, y: 0.25}]},
        {en: 0, capa: true, hasta: 'agregar-0.5', tipo: 'titular', texto: 'Premium: Coach IA + Asistente Legal', icono: 'workspace_premium'},
        {en: 'agregar', capa: true, tipo: 'titular', texto: 'Con entrevista IA: $130k · $240k · $390k', icono: 'mic'},
      ],
    },
    '04': cierre('Pruébalo gratis primero en'),
  },
};

export const v10: VideoF = {
  id: 'Fundales-10-PorCargo',
  slug: '10-promo-por-cargo',
  tipo: 'promo',
  titulo: 'Entrenamiento según tu cargo',
  manifest: m10 as Manifest,
  miniatura: {lineas: ['¿Docente,', 'rector u', 'orientador?'], resalta: 'rector u', pantalla: 'Configuracion', props: {modo: 'foco', rol: 'Rector', listaEn: -5}, insignia: 'Según tu cargo'},
  escenas: {
    '01': {bloques: [{en: 0, tipo: 'grafico', g: 'Cargos'}]},
    '02': {
      bloques: [
        {en: 0, tipo: 'pantalla', p: 'Registro', props: {rol: 'Docente de Aula', rolEn: 'cargo', area: 'Matemáticas', areaEn: 'area', toques: [{id: 'rol', en: 'cargo'}, {id: 'area', en: 'area'}]}, camara: [{en: 'cargo', k: 1.4, x: 0.3, y: 0.45}], camaraV: []},
        {en: 'pedagogia', tipo: 'pantalla', p: 'Configuracion', props: {modo: 'foco', rol: 'Docente de Aula', area: 'Matemáticas', listaEn: 'pedagogia'}, camara: [{en: 'pedagogia', k: 1.45, x: 0.75, y: 0.5}], pasosV: [{en: 'pedagogia', scroll: 480}], camaraV: []},
        {en: 'gestion', tipo: 'pantalla', p: 'Configuracion', props: {modo: 'foco', rol: 'Rector', listaEn: 'gestion'}, camara: [{en: 'gestion', k: 1.45, x: 0.75, y: 0.5}], pasosV: [{en: 'gestion', scroll: 480}], camaraV: []},
        {en: 'convivencia', tipo: 'pantalla', p: 'Configuracion', props: {modo: 'foco', rol: 'Coordinador', listaEn: 'convivencia'}, camara: [{en: 'convivencia', k: 1.45, x: 0.75, y: 0.5}], pasosV: [{en: 'convivencia', scroll: 480}], camaraV: []},
        {en: 'adaptan', capa: true, tipo: 'titular', texto: 'Las preguntas se adaptan a tu cargo', icono: 'tune'},
      ],
    },
    '03': {bloques: [{en: 0, tipo: 'grafico', g: 'BarrasCargos'}]},
    '04': cierre('Elige tu cargo y empieza gratis en'),
  },
};

export const v11: VideoF = {
  id: 'Fundales-11-Matematicas',
  slug: '11-promo-matematicas',
  tipo: 'promo',
  titulo: 'Razonamiento cuantitativo',
  manifest: m11 as Manifest,
  miniatura: {lineas: ['¿Miedo a las', 'matemáticas', 'del concurso?'], resalta: 'matemáticas', pantalla: 'Matematicas', insignia: 'Videos gratis'},
  escenas: {
    '01': {bloques: [{en: 0, tipo: 'grafico', g: 'Mate'}]},
    '02': {
      bloques: [
        {en: 0, tipo: 'pantalla', p: 'Matematicas', props: {sub: 'videos', desde: 'videos'}, camara: [{en: 'paso', k: 1.25, x: 0.5, y: 0.55}], camaraV: []},
        {en: 'gratis', capa: true, tipo: 'titular', texto: 'Videos GRATIS para todos', icono: 'smart_display'},
      ],
    },
    '03': {
      bloques: [
        {en: 0, tipo: 'pantalla', p: 'Matematicas', props: {sub: 'videos', desde: -5, toques: [{id: 'ejercicios', en: 'premium'}]}, camara: [{en: 0, k: 1.5, x: 0.35, y: 0.1}], camaraV: [{en: 0, k: 1.4, x: 0.6, y: 0.08}]},
        {en: 'genera', tipo: 'pantalla', p: 'Matematicas', props: {sub: 'ejercicios', desde: 'genera'}},
        {en: 'premium', capa: true, tipo: 'titular', texto: 'Ejercicios con IA', sub: 'Premium', icono: 'auto_awesome'},
      ],
    },
    '04': cierre('Empieza por los videos gratis en'),
  },
};

export const v12: VideoF = {
  id: 'Fundales-12-Quiz',
  slug: '12-promo-quiz-situacional',
  tipo: 'promo',
  titulo: 'Quiz de juicio situacional',
  manifest: m12 as Manifest,
  miniatura: {lineas: ['¿La', 'responderías', 'bien?'], resalta: 'responderías', pantalla: 'Simulador', props: {practica: true}, insignia: 'Caso real · Rector'},
  escenas: {
    '01': {bloques: [{en: 0, tipo: 'grafico', g: 'Gancho', props: {texto: '¿La responderías bien?', sub: 'Pregunta real del simulador', icono: 'quiz'}}]},
    '02': {
      bloques: [
        {
          en: 0,
          tipo: 'grafico',
          g: 'Caso',
          props: {pasos: [{desde: 'desercion'}, {desde: 'cuarenta'}, {desde: 'treinta'}, {desde: 'treinta#2'}, {desde: 'becas'}, {desde: 'quince'}]},
        },
      ],
    },
    '03': {bloques: [{en: 0, tipo: 'grafico', g: 'Quiz', props: {cuentaDesde: 'tres'}}]},
    '04': {
      nota: NOTA_PREGUNTA,
      bloques: [
        {en: 0, tipo: 'grafico', g: 'Quiz', props: {revelarEn: 'b', inmediato: true}},
        {
          en: 'ataca',
          tipo: 'pantalla',
          p: 'Simulador',
          props: {practica: true, n: 1, total: 5, elegida: 'B', elegidaEn: 0, verificadaEn: 0, scroll: 330},
          camara: [{en: 'ataca', k: 1.25, x: 0.7, y: 0.62}],
          pasosV: [{en: 0, scroll: 1150}],
          camaraV: [],
        },
      ],
    },
    '05': cierre('Practica casos como este gratis en'),
  },
};
