import type {Cue, EspecEpisodio} from '../../comun/motor-tipos';
import type {Manifest} from '../../comun/tipos';
import manifest from '../../../public/edwin-o/python-en-excel/manifest.json';

/* Hechos y resultados: canales/edwin-o/episodios/python-en-excel/ficha.md (resultados reproducidos con pandas en codigo/ejemplo.py) */
const DATOS = [
  ['Ene', 'Norte', 'Laptop', '2.400'], ['Ene', 'Sur', 'Mouse', '70'], ['Ene', 'Centro', 'Monitor', '620'],
  ['Ene', 'Norte', 'Monitor', '310'], ['Ene', 'Sur', 'Laptop', '1.200'], ['Ene', 'Centro', 'Mouse', '105'],
  ['Feb', 'Norte', 'Laptop', '3.600'], ['Feb', 'Sur', 'Monitor', '930'], ['Feb', 'Centro', 'Laptop', '1.200'],
  ['Feb', 'Norte', 'Mouse', '35'], ['Feb', 'Sur', 'Mouse', '140'], ['Feb', 'Centro', 'Monitor', '310'],
];
const der = 'right' as const;
const PY = {fondo: '#E6F4EA', color: '#0F5A32', negrita: true};
const VERDE = {fondo: '#DFF7E7', color: '#0F5A32'};

/** Tabla Ventas: estilo simple (`tabla=false`) o con formato de Tabla (bandas azules). */
const tabla = (conFormato = true, d: Cue = 0) => [
  ...['Mes', 'Región', 'Producto', 'Monto'].map((v, i) => ({ref: `${'ABCD'[i]}1`, valor: v, desde: d, negrita: true, ...(conFormato ? {fondo: '#1A3BAF', color: 'white'} : {fondo: '#E9F3EC'})})),
  ...DATOS.flatMap((f, i) => f.map((v, j) => ({ref: `${'ABCD'[j]}${i + 2}`, valor: v, desde: d, ...(j === 3 ? {alinear: der} : {}), ...(conFormato && i % 2 ? {fondo: '#DDE6FF'} : {})}))),
];
const BASE = {archivo: 'Ventas.xlsx', hoja: 'Ventas', columnas: 10, anchos: {A: 90, B: 120, C: 130, D: 110, E: 30, F: 190, G: 160, H: 30, I: 150, J: 120}};
const DF = (d: Cue = 0) => ({ref: 'F1', valor: '[PY] DataFrame', desde: d, ...PY});
const DESCRIBE: [string, string][] = [['count', '12'], ['mean', '910'], ['std', '1092,996299'], ['min', '35'], ['25%', '131,25'], ['50%', '465'], ['75%', '1200'], ['max', '3600']];
const POR_REGION: [string, string][] = [['Centro', '2235'], ['Norte', '6345'], ['Sur', '2340']];
const spill = (filas: [string, string][], col: string, fila0: number, d: Cue, extra: object = {}) =>
  filas.flatMap(([a, b], i) => [
    {ref: `${col}${fila0 + i}`, valor: a, desde: d, alinear: 'left' as const, ...extra},
    {ref: `${String.fromCharCode(col.charCodeAt(0) + 1)}${fila0 + i}`, valor: b, desde: d, alinear: der, ...extra},
  ]);

export const episodio: EspecEpisodio = {
  canal: 'edwin-o',
  slug: 'python-en-excel',
  id: 'EdwinO-PythonEnExcel',
  manifest: manifest as Manifest,
  escenas: {
    '01': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [...tabla(), DF(), ...spill(POR_REGION, 'I', 1, 0)],
          escritura: [{celda: 'I1', texto: 'df.groupby("Región")["Monto"].sum().plot(kind="bar")', desde: 'escribiendo', duracion: 2.2, enter: 'aparece'}],
          zoom: [{a: 'I1', desde: 'escribiendo', escala: 1.5}]}},
        {en: 'aparece', tipo: 'barras', titulo: 'Ventas por región', items: POR_REGION.map(([e, v]) => ({etiqueta: e, valor: Number(v)}))},
        {en: 'instalar', tipo: 'titulo', lineas: [{texto: 'Sin instalar nada,', color: 'blanco', tamano: 130}, {texto: 'SIN SALIR DE EXCEL', color: 'amarillo', tamano: 180}]},
      ],
    },
    '02': {
      bloques: [
        {en: 0, tipo: 'cortinilla', titulo: 'Python en Excel'},
        {en: 'juntamos', tipo: 'titulo', lineas: [{texto: 'EXCEL + PYTHON', color: 'amarillo', tamano: 210}, {texto: 'en la misma celda', color: 'blanco', tamano: 120}], sub: '=PY( )'},
        {en: 'muestro', tipo: 'lista', titulo: 'Hoy aprendes…', items: [
          {texto: 'Cómo activarlo', desde: 'activarlo', icono: '⚡'},
          {texto: 'Cómo traer tus datos', desde: 'traer', icono: '📥'},
          {texto: 'Estadísticas y gráficos', desde: 'estadisticas', icono: '📊'},
          {texto: 'Sus límites', desde: 'limites', icono: '🚧'},
        ]},
      ],
    },
    '03': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'titulo', lineas: [{texto: 'Ya no es', color: 'blanco', tamano: 140}, {texto: 'UN EXPERIMENTO', color: 'amarillo', tamano: 210}]},
        {en: 'empresa', tipo: 'tarjetas', items: [
          {icono: '🏢', titulo: 'Empresas', texto: 'Disponible en Windows, web y, desde 2025, Mac.', desde: 'empresa', color: 'verde'},
          {icono: '🏠', titulo: 'Personal y Familia', texto: 'En vista previa.', desde: 'personal', color: 'magenta'},
          {icono: '📵', titulo: 'Celular y iPad', texto: 'Por ahora, no disponible.', desde: 'ipad', color: 'rojo'},
        ]},
      ],
    },
    '04': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '💡', titulo: 'Mi opinión', texto: 'Para quien ya sabe Excel, es la mejor puerta de entrada a Python: no instalas nada.', color: 'magenta'},
        {en: 'miedo', tipo: 'titulo', lineas: [{texto: '¿Te da miedo programar?', color: 'blanco', tamano: 120}, {texto: 'EMPIEZA AQUÍ', color: 'amarillo', tamano: 240}]},
      ],
    },
    '05': {
      bloques: [
        {en: 0, tipo: 'cuadricula', titulo: '¿Cómo funciona?', items: [
          {icono: '🟩', texto: 'Tu celda `=PY`', desde: 'codigo'},
          {icono: '☁️', texto: 'La nube de Microsoft', desde: 'nube'},
          {icono: '🐍', texto: 'Bibliotecas de Anaconda', desde: 'anaconda'},
          {icono: '📥', texto: 'El resultado vuelve a tu celda', desde: 'vuelve'},
        ]},
        {en: 'internet', tipo: 'tarjetas', items: [
          {icono: '🌐', titulo: 'Necesita internet', texto: 'Todo se calcula en la nube.', desde: 'internet', color: 'rojo'},
          {icono: '✅', titulo: 'Nada que instalar', texto: 'Y tu archivo sigue siendo un Excel normal.', desde: 'instalar', color: 'verde'},
        ]},
      ],
    },
    '06': {
      paso: {n: 1, texto: 'Convierte tus datos en Tabla'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: tabla(false, 'tengo')}},
        {en: 'control', tipo: 'teclas', teclas: ['Ctrl', 'T'], texto: 'Convertir en Tabla'},
        {en: 'luego', tipo: 'hoja', hoja: {...BASE, celdas: tabla(true), globos: [{a: 'D1', texto: 'Nombre de la tabla: Ventas', desde: 'ventas#2'}]}},
      ],
    },
    '07': {
      paso: {n: 2, texto: 'Inserta una celda de Python'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [...tabla()],
          botones: ['Insertar función', 'Autosuma', 'Lógicas', 'Texto', 'Insertar Python', 'Administrador de nombres'],
          pestanaActiva: [{nombre: 'Inicio', desde: 0}, {nombre: 'Fórmulas', desde: 'formulas+0.3'}],
          seleccion: [{celda: 'F1', desde: 'selecciona'}],
          cursor: [{a: 'F1', desde: 'selecciona', clic: true}, {a: 'tab:Fórmulas', desde: 'formulas', clic: true}, {a: 'btn:Insertar Python', desde: 'clic', clic: true}],
          escritura: [{celda: 'F1', texto: '=PY(', desde: 'igual', duracion: 1.2, enter: 999}],
          globos: [{a: 'F1', texto: 'PY = esta celda es Python', desde: 'insignia', lado: 'abajo'}]}},
      ],
    },
    '08': {
      paso: {n: 3, texto: 'Trae los datos con xl()'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [...tabla(), DF('confirmar+0.6')],
          escritura: [{celda: 'F1', texto: 'df = xl("Ventas[#All]", headers=True)', desde: 'escribe', duracion: 9, enter: 'confirmar+0.6'}],
          resaltes: [{rango: 'A1:D13', desde: 'ventas', hasta: 'confirmar', color: '#3DD6C8'}],
          zoom: [{a: 'F1', desde: 'tarjeta', escala: 1.8}],
          globos: [{a: 'F1', texto: 'Tu tabla ya vive en Python', desde: 'vive', lado: 'abajo'}]}},
        {en: 'confirmar', hasta: 'tarjeta', capa: true, tipo: 'pildora', texto: '⌨️ Ctrl + Entrar (Enter = línea nueva)', abajo: true, tamano: 50},
      ],
    },
    '09': {
      paso: {n: 4, texto: 'Dos tipos de salida'},
      bloques: [
        {en: 0, tipo: 'comparar', izq: {titulo: 'Objeto de Python', icono: '🃏', color: 'azul', items: [
          {texto: 'Se ve como una tarjeta', desde: 'tarjeta', icono: '•'},
          {texto: 'Para seguir trabajando en Python', desde: 'seguir', icono: '•'},
        ]}, der: {titulo: 'Valores de Excel', icono: '📋', color: 'verde', desde: 'valores', items: [
          {texto: 'Se desbordan en la hoja', desde: 'desbordan', icono: '•'},
          {texto: 'Como cualquier resultado normal', desde: 'normal', icono: '•'},
        ]}},
        {en: 'menu', capa: true, tipo: 'pildora', texto: 'Se cambia en el menú de salida, junto a la barra de fórmulas', abajo: true, tamano: 42},
      ],
    },
    '10': {
      paso: {n: 5, texto: 'Estadísticas en una línea'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [
          ...tabla(), DF(),
          {ref: 'F3', valor: '[PY] DataFrame', desde: 'control+0.5', hasta: 'cambialo+0.6', ...PY},
          ...spill(DESCRIBE, 'F', 3, 'cambialo+0.6', VERDE),
        ], escritura: [{celda: 'F3', texto: 'df.describe()', desde: 'escribe', duracion: 1.8, enter: 'control+0.5'}],
        zoom: [{a: 'G4', desde: 'promedio', escala: 1.6}, {a: 'G6', desde: 'minima', escala: 1.6}, {a: 'G10', desde: 'maxima', escala: 1.6}, {a: 'G7', desde: 'cuartiles', escala: 1.2}],
        globos: [{a: 'G4', texto: 'Promedio', desde: 'promedio', hasta: 'desviacion'}, {a: 'G5', texto: 'Desviación estándar', desde: 'desviacion', hasta: 'minima'}, {a: 'G8', texto: 'Cuartiles', desde: 'cuartiles'}]}},
        {en: 'palabra', tipo: 'titulo', lineas: [{texto: 'Todo eso', color: 'blanco', tamano: 140}, {texto: 'CON UNA PALABRA', color: 'amarillo', tamano: 200}]},
      ],
    },
    '11': {
      paso: {n: 6, texto: 'Agrupa como tabla dinámica'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [...tabla(), DF(), ...spill(POR_REGION, 'I', 1, 'tienes', VERDE)],
          escritura: [{celda: 'I1', texto: 'df.groupby("Región")["Monto"].sum()', desde: 'escribe', duracion: 4, enter: 'tienes'}],
          zoom: [{a: 'J1', desde: 'centro', escala: 1.5}, {a: 'J2', desde: 'norte', escala: 1.5}, {a: 'J3', desde: 'sur', escala: 1.5}, {a: 'G5', desde: 'mismos', escala: 1}],
          globos: [{a: 'J3', texto: '= AGRUPARPOR', desde: 'agruparpor', lado: 'abajo'}]}},
      ],
    },
    '12': {
      paso: {n: 7, texto: 'El gráfico'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [...tabla(), DF(), {ref: 'I1', valor: '[PY] Image', desde: 'imagen', ...PY}],
          escritura: [{celda: 'I1', texto: 'df.groupby("Región")["Monto"].sum().plot(kind="bar")', desde: 'agrega', duracion: 3, enter: 'imagen'}],
          zoom: [{a: 'I1', desde: 'imagen', escala: 1.8}],
          globos: [{a: 'I1', texto: 'Clic derecho → mostrar sobre las celdas', desde: 'derecho', lado: 'abajo'}]}},
        {en: 'control', hasta: 'ahi', capa: true, tipo: 'pildora', texto: '⌨️ Ctrl + Alt + Mayús + C', abajo: true, tamano: 52},
        {en: 'ahi', tipo: 'barras', titulo: 'Ventas por región', items: POR_REGION.map(([e, v]) => ({etiqueta: e, valor: Number(v)}))},
      ],
    },
    '13': {
      paso: {n: 'BONUS', prefijo: '🎁', texto: 'Filtra antes de agrupar'},
      bloques: [
        {en: 0, tipo: 'codigo', codigo: 'df[df["Mes"] == "Feb"].groupby("Región")["Monto"].sum()', archivo: 'Celda =PY( )', velocidad: 9, tamano: 30, tituloSalida: 'Valores de Excel', salidaY: 420,
          resaltar: [{lineas: [1], desde: 'doble'}],
          salida: [
            {texto: 'Centro   1510', desde: 'centro'},
            {texto: 'Norte    3635', desde: 'norte', color: '#9BE7A8'},
            {texto: 'Sur      1070', desde: 'sur'},
          ]},
        {en: 'mismo', tipo: 'titulo', lineas: [{texto: 'El mismo filtro', color: 'blanco', tamano: 140}, {texto: 'ESCRITO EN PYTHON', color: 'amarillo', tamano: 180}]},
      ],
    },
    '14': {
      bloques: [
        {en: 0, tipo: 'cuadricula', titulo: 'Importadas por defecto', items: [
          {icono: '🐼', texto: 'pandas · datos', desde: 'pandas'},
          {icono: '🔢', texto: 'NumPy · cálculos', desde: 'numpy'},
          {icono: '📈', texto: 'Matplotlib · gráficos', desde: 'matplotlib'},
          {icono: '🎨', texto: 'seaborn · gráficos', desde: 'seaborn'},
          {icono: '📐', texto: 'statsmodels · estadística', desde: 'statsmodels'},
          {icono: '➕', texto: 'Y unas 30 más (scikit-learn…)', desde: 'treinta'},
        ]},
        {en: 'laboratorio', tipo: 'titulo', lineas: [{texto: 'Un laboratorio de', color: 'blanco', tamano: 130}, {texto: 'CIENCIA DE DATOS', color: 'amarillo', tamano: 190}], texto: 'Dentro de tu hoja.'},
      ],
    },
    '15': {
      bloques: [
        {en: 0, tipo: 'lista', titulo: 'El orden de cálculo', items: [
          {texto: 'Fila por fila', desde: 'fila', icono: '1️⃣'},
          {texto: 'De izquierda a derecha', desde: 'izquierda', icono: '➡️'},
          {texto: 'De arriba hacia abajo', desde: 'arriba', icono: '⬇️'},
          {texto: 'La celda de `df` va primero: arriba a la izquierda', desde: 'consejo', icono: '📌'},
        ]},
      ],
    },
    '16': {
      fondo: 'oscuro',
      bloques: [
        {en: 0, tipo: 'errores', titulo: 'Sus límites', items: [
          {mal: 'Leer archivos del PC o páginas web', bien: 'Datos de la hoja o de Power Query', desde: 'uno'},
          {mal: 'Sin internet', bien: 'No calcula: todo pasa en la nube', desde: 'dos'},
          {mal: 'Apps del celular', bien: 'No disponible por ahora', desde: 'tres'},
        ]},
      ],
    },
    '17': {
      bloques: [
        {en: 0, tipo: 'cuadricula', titulo: '¿Cuándo usar cada cosa?', items: [
          {icono: '🧮', texto: 'Fórmulas de Excel: el día a día', desde: 'calculos'},
          {icono: '🐍', texto: 'Python en Excel: estadística y gráficos', desde: 'estadistica'},
          {icono: '💻', texto: 'Python en tu PC: archivos y carpetas', desde: 'automatizar'},
        ]},
        {en: 'compiten', tipo: 'titulo', lineas: [{texto: 'No compiten:', color: 'blanco', tamano: 140}, {texto: 'SE COMPLEMENTAN', color: 'amarillo', tamano: 200}]},
      ],
    },
    '18': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'comparar', izq: {titulo: 'Antes', icono: '🐢', items: [
          {texto: 'Instalar programas', desde: 'instalar'},
          {texto: 'Usar la terminal', desde: 'terminal'},
          {texto: 'Saber programar bastante', desde: 'programar'},
        ]}, der: {titulo: 'Hoy', icono: '⚡', desde: 'hoy', items: [{texto: 'Una celda', desde: 'celda'}]}},
        {en: 'diferencia', tipo: 'titulo', lineas: [{texto: 'La diferencia:', color: 'blanco', tamano: 130}, {texto: 'QUIÉN SE ANIMA', color: 'amarillo', tamano: 210}]},
        {en: 'aprendes', tipo: 'titulo', lineas: [{texto: 'Si no lo aprendes ahora,', color: 'blanco', tamano: 110}, {texto: 'TE EXTINGUES', color: 'rojo', tamano: 210}]},
      ],
    },
    '19': {
      bloques: [
        {en: 0, tipo: 'resumen', ideas: [
          {texto: 'Fórmulas > Insertar Python', desde: 'formulas'},
          {texto: 'xl() y Ctrl + Entrar', desde: 'control'},
          {texto: 'describe, groupby y plot', desde: 'describe'},
        ]},
        {en: 'proximo', tipo: 'cierre', siguiente: '5 errores de Excel que cometen hasta los expertos', suscribir: 'suscribete'},
      ],
    },
  },
  shorts: [
    {id: 'short-1', escena: '12', gancho: [{texto: 'Un gráfico con', color: 'blanco', tamano: 100}, {texto: 'PYTHON EN EXCEL', color: 'amarillo', tamano: 120}]},
    {id: 'short-2', escena: '10', gancho: [{texto: 'Estadísticas con', color: 'blanco', tamano: 100}, {texto: 'UNA PALABRA', color: 'amarillo', tamano: 150}]},
  ],
  miniatura: {
    lineas: [{texto: 'PYTHON', color: 'amarillo'}, {texto: 'DENTRO DE', color: 'blanco', tamano: 96}, {texto: 'EXCEL', color: 'verde'}],
    pildora: '=PY( )',
    insignia: 'SIN INSTALAR NADA',
    codigo: 'df = xl("Ventas[#All]",\n        headers=True)\ndf.describe()',
  },
};
