import type {Cue, EspecEpisodio} from '../../comun/motor-tipos';
import type {Manifest} from '../../comun/tipos';
import manifest from '../../../public/edwin-o/errores-comunes-excel/manifest.json';

/* Ejemplos verificados en canales/edwin-o/episodios/errores-comunes-excel/ficha.md */
const ENC = {negrita: true, fondo: '#E9F3EC'};
const ROJO = {fondo: '#FFC7CE', color: '#9C0006', negrita: true};
const VERDE = {fondo: '#DFF7E7', color: '#0F5A32', negrita: true};
const AMARILLO = {fondo: '#FFF3B0', negrita: true};
const der = 'right' as const;
const izq = 'left' as const;

const VENTAS: [string, string][] = [['Ana', '1.200'], ['Luis', '35'], ['Marta', '310'], ['Pedro', '1150'], ['Sofía', '60']];
const ventas = (d: Cue = 0, pedroTexto = true, hasta?: Cue) => [
  {ref: 'A1', valor: 'Vendedor', desde: d, ...ENC}, {ref: 'B1', valor: 'Ventas', desde: d, ...ENC},
  ...VENTAS.flatMap(([n, v], i) => [
    {ref: `A${i + 2}`, valor: n, desde: d},
    ...(i === 3 && pedroTexto ? [{ref: 'B5', valor: v, desde: d, alinear: izq, color: '#555', ...(hasta ? {hasta} : {})}] : i === 3 ? [] : [{ref: `B${i + 2}`, valor: v, desde: d, alinear: der}]),
  ]),
  {ref: 'A7', valor: 'Total', desde: d, negrita: true},
];
const BASE_V = {archivo: 'Ventas.xlsx', hoja: 'Diciembre', columnas: 4, anchos: {A: 300, B: 220, C: 200, D: 200}};

const IVA_BASE = {archivo: 'Precios.xlsx', hoja: 'Precios', columnas: 5, anchos: {A: 260, B: 170, C: 200, D: 120, E: 140}};
const PRODUCTOS: [string, string][] = [['Mouse', '100'], ['Teclado', '250'], ['Audífonos', '80'], ['Cable', '40']];
const preciosIva = () => [
  {ref: 'A1', valor: 'Producto', desde: 0, ...ENC}, {ref: 'B1', valor: 'Precio', desde: 0, ...ENC}, {ref: 'C1', valor: 'Con IVA', desde: 0, ...ENC},
  {ref: 'D1', valor: 'IVA:', desde: 0, negrita: true}, {ref: 'E1', valor: '19%', desde: 0, ...AMARILLO, alinear: der},
  ...PRODUCTOS.flatMap(([p, v], i) => [{ref: `A${i + 2}`, valor: p, desde: 0}, {ref: `B${i + 2}`, valor: v, desde: 0, alinear: der}]),
];

const CODIGOS: [string, string, string][] = [['P-101', 'Laptop', '1.200'], ['P-102', 'Mouse', '35'], ['P-103', 'Monitor', '310'], ['P-104', 'Teclado', '60'], ['P-105', 'Audífonos', '85']];
const BASE_P = {archivo: 'Precios.xlsx', hoja: 'Precios', columnas: 6, anchos: {A: 160, B: 200, C: 150, D: 60, E: 180, F: 260}};
const tablaCodigos = () => [
  ...['Código', 'Producto', 'Precio'].map((v, i) => ({ref: `${'ABC'[i]}1`, valor: v, desde: 0, ...ENC})),
  ...CODIGOS.flatMap((f, i) => f.map((v, j) => ({ref: `${'ABC'[j]}${i + 2}`, valor: v, desde: 0, ...(j === 2 ? {alinear: der} : {})}))),
  {ref: 'E1', valor: 'Buscar', desde: 0, ...ENC}, {ref: 'F1', valor: 'Precio', desde: 0, ...ENC}, {ref: 'E2', valor: 'P-999', desde: 0},
];

const BASE_D = {archivo: 'Pedido.xlsx', hoja: 'Pedido', columnas: 3, anchos: {A: 320, B: 220, C: 200}};
const decimales = (mostrar: Cue | null) => [
  {ref: 'A1', valor: 'Producto', desde: 0, ...ENC}, {ref: 'B1', valor: 'Kilos', desde: 0, ...ENC},
  ...['Producto A', 'Producto B', 'Producto C'].map((p, i) => ({ref: `A${i + 2}`, valor: p, desde: 0})),
  ...[2, 3, 4].map((r) => ({ref: `B${r}`, valor: '10', desde: 0, alinear: der, ...(mostrar !== null ? {hasta: mostrar} : {})})),
  {ref: 'A5', valor: 'Total', desde: 0, negrita: true},
  {ref: 'B5', valor: '31', desde: 0, alinear: der, negrita: true, ...(mostrar !== null ? {hasta: mostrar} : {})},
  ...(mostrar !== null
    ? [...[2, 3, 4].map((r) => ({ref: `B${r}`, valor: '10,4', desde: mostrar, alinear: der, ...VERDE})), {ref: 'B5', valor: '31,2', desde: mostrar, alinear: der, ...VERDE}]
    : []),
];

export const episodio: EspecEpisodio = {
  canal: 'edwin-o',
  slug: 'errores-comunes-excel',
  id: 'EdwinO-ErroresComunesExcel',
  manifest: manifest as Manifest,
  escenas: {
    '01': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE_D, celdas: decimales(null), zoom: [{a: 'B4', desde: 0.2, escala: 1.9}],
          globos: [{a: 'B5', texto: '¿10 + 10 + 10 = 31? 🤔', desde: 'treinta', color: '#E30613'}]}},
        {en: 'hoy', tipo: 'titulo', lineas: [{texto: '5 ERRORES', color: 'amarillo', tamano: 240}, {texto: 'que cometen hasta los expertos', color: 'blanco', tamano: 100}]},
      ],
    },
    '02': {
      bloques: [
        {en: 0, tipo: 'cortinilla', titulo: 'Errores de Excel'},
        {en: 'cerrarlo', tipo: 'titulo', lineas: [{texto: '5 ERRORES', color: 'amarillo', tamano: 220}, {texto: 'SILENCIOSOS', color: 'blanco', tamano: 180}], sub: 'Sin mensaje… pero con resultados equivocados'},
        {en: 'final', tipo: 'tarjeta', icono: '📋', titulo: 'Lista de revisión', texto: 'Para antes de enviar cualquier archivo.', color: 'verde'},
      ],
    },
    '03': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'titulo', lineas: [{texto: '¿Cuánto cuesta', color: 'blanco', tamano: 140}, {texto: 'UN ERROR EN EXCEL?', color: 'amarillo', tamano: 180}]},
        {en: 'calculo', tipo: 'cifra', valor: '4.315 dólares', texto: 'en promedio, por cada error significativo', fuente: 'Encuesta de DOSS (empresa de software) a 1.003 profesionales en EE. UU.'},
        {en: 'pierden', tipo: 'cifra', valor: '3,6 horas', texto: 'a la semana corrigiendo hojas de cálculo', fuente: 'Encuesta de DOSS', color: 'turquesa'},
        {en: 'preocupante', tipo: 'cifra', valor: '2 de cada 5', texto: 'errores se corrigen sin que nadie se entere', fuente: 'Encuesta de DOSS', color: 'rojo'},
      ],
    },
    '04': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '🔍', titulo: 'Lo que más encuentro', texto: 'Números guardados como texto, sobre todo en datos que vienen de otro sistema.', color: 'magenta'},
      ],
    },
    '05': {
      bloques: [
        {en: 0, tipo: 'numero', n: 1, total: 5, texto: 'Números guardados como texto'},
        {en: 'mira', tipo: 'hoja', hoja: {...BASE_V, celdas: [...ventas(), {ref: 'B7', valor: '1.605', desde: 'resultado', alinear: der, ...ROJO}],
          escritura: [{celda: 'B7', texto: '=SUMA(B2:B6)', desde: 'suma', duracion: 1, enter: 'resultado'}],
          zoom: [{a: 'B5', desde: 'izquierda', escala: 1.7}, {a: 'B6', desde: 'resultado', escala: 1.4}],
          globos: [{a: 'B5', texto: '◤ Texto, no número', desde: 'triangulito', color: '#1E9E4A'}, {a: 'B7', texto: '¡Debería ser 2.755!', desde: 'realidad', color: '#E30613'}]}},
      ],
    },
    '06': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE_V, celdas: [
          ...ventas(0, true, 'elige+0.6'),
          {ref: 'B5', valor: '1.150', desde: 'elige+0.6', alinear: der, ...VERDE},
          {ref: 'B7', valor: '1.605', desde: 0, hasta: 'elige+0.8', alinear: der, ...ROJO},
          {ref: 'B7', valor: '2.755', desde: 'elige+0.8', alinear: der, ...VERDE},
        ], seleccion: [{celda: 'B5', desde: 'selecciona'}],
        menu: [{ancla: 'B5', items: ['Número almacenado como texto', 'Convertir en número', 'Ayuda sobre este error', 'Omitir error'], desde: 'clic', hasta: 'elige+0.6', elegido: 'Convertir en número'}],
        zoom: [{a: 'B6', desde: 'selecciona', escala: 1.5}]}},
        {en: 'pista', tipo: 'tarjeta', icono: '💡', titulo: 'Pista rápida', texto: 'Números → a la derecha · Texto → a la izquierda. Si un número está a la izquierda, sospecha.', color: 'verde'},
      ],
    },
    '07': {
      bloques: [
        {en: 0, tipo: 'numero', n: 2, total: 5, texto: 'La referencia que se mueve'},
        {en: 'tengo', tipo: 'hoja', hoja: {...IVA_BASE, celdas: [
          ...preciosIva(),
          {ref: 'C2', valor: '119', desde: 'ciento', alinear: der, ...VERDE},
          ...['250', '80', '40'].map((v, i) => ({ref: `C${i + 3}`, valor: v, desde: `arrastro+${0.3 + i * 0.15}`, alinear: der, ...ROJO})),
        ], escritura: [{celda: 'C2', texto: '=B2*(1+E1)', desde: 'calculo', duracion: 1.4, enter: 'ciento'}],
        resaltes: [{rango: 'E2', desde: 'vacia', color: '#E30613'}],
        globos: [{a: 'C3', texto: '=B3*(1+E2) 😱', desde: 'movio', color: '#E30613'}]}},
      ],
    },
    '08': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...IVA_BASE, celdas: [
          ...preciosIva(),
          ...['119', '297,5', '95,2', '47,6'].map((v, i) => ({ref: `C${i + 2}`, valor: v, desde: `arrastra+${0.2 + i * 0.15}`, alinear: der, ...VERDE})),
        ], escritura: [{celda: 'C2', texto: '=B2*(1+$E$1)', desde: 'clic', duracion: 1.8, enter: 'arrastra'}],
        zoom: [{a: 'C2', desde: 'cuatro', escala: 1.6}, {a: 'C4', desde: 'arrastra', escala: 1.2}]}},
        {en: 'cuatro', hasta: 'arrastra', capa: true, tipo: 'pildora', texto: '⌨️ F4 → $E$1', abajo: true, tamano: 60},
        {en: 'regla', tipo: 'titulo', lineas: [{texto: 'Dato fijo =', color: 'blanco', tamano: 150}, {texto: 'CON DÓLARES $', color: 'amarillo', tamano: 220}]},
      ],
    },
    '09': {
      bloques: [
        {en: 0, tipo: 'numero', n: 3, total: 5, texto: 'BUSCARV sin FALSO'},
        {en: 'busco', tipo: 'hoja', hoja: {...BASE_P, celdas: [...tablaCodigos(), {ref: 'F2', valor: '85', desde: 'ochenta', alinear: der, ...ROJO}],
          escritura: [{celda: 'F2', texto: '=BUSCARV("P-999";A2:C6;3)', desde: 'busco', duracion: 2, enter: 'ochenta'}],
          resaltes: [{rango: 'A6:C6', desde: 'cercano', color: '#3DD6C8'}],
          zoom: [{a: 'F2', desde: 'ochenta', escala: 1.6}, {a: 'C4', desde: 'cercano', escala: 1}],
          globos: [{a: 'F2', texto: '¡P-999 no existe!', desde: 'salio', color: '#E30613', lado: 'abajo'}]}},
      ],
    },
    '10': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE_P, celdas: [
          ...tablaCodigos(),
          {ref: 'F2', valor: '#N/A', desde: 'existe', ...AMARILLO},
          {ref: 'E3', valor: 'P-999', desde: 'buscarx'},
          {ref: 'F3', valor: 'No existe', desde: 'mensaje', ...VERDE},
        ], escritura: [
          {celda: 'F2', texto: '=BUSCARV("P-999";A2:C6;3;FALSO)', desde: 0.3, duracion: 2, enter: 'existe'},
          {celda: 'F3', texto: '=BUSCARX("P-999";A2:A6;C2:C6;"No existe")', desde: 'buscarx', duracion: 2.5, enter: 'mensaje'},
        ],
        zoom: [{a: 'F2', desde: 'existe', escala: 1.5}, {a: 'F3', desde: 'mensaje', escala: 1.5}],
        globos: [{a: 'F2', texto: 'Mejor un error que un precio inventado', desde: 'mejor', lado: 'abajo'}]}},
      ],
    },
    '11': {
      bloques: [
        {en: 0, tipo: 'numero', n: 4, total: 5, texto: 'El formato que engaña'},
        {en: 'volvamos', tipo: 'hoja', hoja: {...BASE_D, celdas: decimales(null), seleccion: [{celda: 'B2', desde: 'vale'}],
          zoom: [{a: 'B3', desde: 'vale', escala: 1.6}],
          globos: [{a: 'B2', texto: 'Valor real: 10,4', desde: 'realidad'}, {a: 'B5', texto: 'Valor real: 31,2', desde: 'real', lado: 'abajo'}]}},
        {en: 'formato#3', tipo: 'titulo', lineas: [{texto: 'El formato cambia', color: 'blanco', tamano: 130}, {texto: 'LO QUE VES', color: 'amarillo', tamano: 220}], texto: 'No el valor que hay en la celda.'},
      ],
    },
    '12': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE_D, celdas: decimales('decimales+0.4'), zoom: [{a: 'B3', desde: 'decimales', escala: 1.6}],
          globos: [{a: 'B5', texto: 'Aumentar decimales', desde: 'decimales', lado: 'abajo'}]}},
        {en: 'redondear', tipo: 'formula', titulo: 'Redondea de verdad', formula: '=REDONDEAR(B2;0)', partes: [
          {texto: 'REDONDEAR', nota: 'Cambia el valor, no solo el formato', desde: 'redondear+0.5'},
          {texto: '0', nota: 'Cero decimales', desde: 'valor'},
        ]},
      ],
    },
    '13': {
      bloques: [
        {en: 0, tipo: 'numero', n: 5, total: 5, texto: 'Celdas combinadas'},
        {en: 'bonitas', tipo: 'hoja', hoja: {...BASE_V, celdas: [
          {ref: 'A1', valor: '            Ventas del mes', desde: 0, negrita: true, fondo: '#FFE500'}, {ref: 'B1', valor: '', desde: 0, fondo: '#FFE500'},
          ...VENTAS.flatMap(([n, v], i) => [{ref: `A${i + 2}`, valor: n, desde: 0}, {ref: `B${i + 2}`, valor: v.replace('1150', '1.150'), desde: 0, alinear: der}]),
        ], resaltes: [{rango: 'A1:B1', desde: 'bonitas', color: '#E5197F'}],
        globos: [{a: 'B1', texto: 'Celdas combinadas', desde: 'bonitas+0.4'}]}},
        {en: 'aviso', tipo: 'tarjeta', icono: '⛔', titulo: 'Excel no te deja ordenar', texto: 'Avisa que las celdas combinadas deben tener el mismo tamaño.', color: 'rojo'},
      ],
    },
    '14': {
      bloques: [
        {en: 0, tipo: 'lista', titulo: 'La alternativa profesional', items: [
          {texto: 'Selecciona las celdas del título', desde: 'selecciona', icono: '1️⃣'},
          {texto: 'Formato de celdas → Alineación', desde: 'alineacion', icono: '2️⃣'},
          {texto: 'Horizontal: Centrar en la selección', desde: 'centrar', icono: '3️⃣'},
        ]},
        {en: 'visualmente', tipo: 'tarjeta', icono: '✨', titulo: 'Se ve igual', texto: 'Pero las celdas siguen separadas: puedes ordenar, filtrar y copiar.', color: 'verde'},
      ],
    },
    '15': {
      paso: {n: 'BONUS', prefijo: '🎁', texto: 'Números escondidos'},
      bloques: [
        {en: 0, tipo: 'comparar', izq: {titulo: '=B2*1,19', icono: '🙈', items: [
          {texto: 'Funciona… en 100 fórmulas', desde: 'funciona'},
          {texto: 'Cambia el IVA → corriges 100', desde: 'cambia'},
        ]}, der: {titulo: '=B2*(1+$E$1)', icono: '✅', desde: 'pon', items: [
          {texto: 'El IVA en una celda, con su título', desde: 'pon'},
          {texto: 'Cambias 1 dato → todo se actualiza', desde: 'actualiza'},
        ]}},
      ],
    },
    '16': {
      bloques: [
        {en: 0, tipo: 'lista', titulo: 'Antes de enviar, revisa', items: [
          {texto: '¿Números pegados a la izquierda?', desde: 'pegados', icono: '🔤'},
          {texto: '¿Tasas y porcentajes con $?', desde: 'tasas', icono: '💲'},
          {texto: '¿Todos tus BUSCARV terminan en FALSO?', desde: 'buscarv', icono: '🔎'},
          {texto: '¿Los totales cuadran con decimales?', desde: 'totales', icono: '🎭'},
          {texto: '¿Celdas combinadas en tus tablas?', desde: 'combinadas', icono: '🧩'},
        ]},
      ],
    },
    '17': {
      fondo: 'oscuro',
      bloques: [
        {en: 0, tipo: 'cifra', valor: '2 de cada 5', texto: 'errores se corrigen sin que nadie se entere', color: 'rojo'},
        {en: 'inteligencia', tipo: 'titulo', lineas: [{texto: 'Saber revisar', color: 'blanco', tamano: 140}, {texto: 'VALE MÁS QUE NUNCA', color: 'amarillo', tamano: 180}]},
        {en: 'aprendes', tipo: 'titulo', lineas: [{texto: 'Si no lo aprendes ahora,', color: 'blanco', tamano: 110}, {texto: 'TE EXTINGUES', color: 'rojo', tamano: 210}]},
      ],
    },
    '18': {
      bloques: [
        {en: 0, tipo: 'cuadricula', titulo: 'Los 5 errores', items: [
          {icono: '🔤', texto: 'Números como texto', desde: 'numeros'},
          {icono: '💲', texto: 'Referencias sin $', desde: 'referencias'},
          {icono: '🔎', texto: 'BUSCARV sin FALSO', desde: 'buscarv'},
          {icono: '🎭', texto: 'El formato que engaña', desde: 'formato'},
          {icono: '🧩', texto: 'Celdas combinadas', desde: 'celdas'},
        ]},
        {en: 'comentarios', tipo: 'titulo', lineas: [{texto: 'Dime en los comentarios', color: 'blanco', tamano: 110}, {texto: '¿CUÁL TE HA PASADO?', color: 'amarillo', tamano: 170}]},
        {en: 'perdiste', tipo: 'cierre', siguiente: 'Fórmulas con IA que SÍ funcionan'},
        {en: 'felices', tipo: 'titulo', lineas: [{texto: '¡Felices fiestas! 🎄', color: 'amarillo', tamano: 170}, {texto: 'Nos vemos en 2027', color: 'blanco', tamano: 130}]},
      ],
    },
  },
  shorts: [
    {id: 'short-1', escena: '09', gancho: [{texto: 'BUSCARV te está', color: 'blanco', tamano: 100}, {texto: 'MINTIENDO', color: 'rojo', tamano: 170}]},
    {id: 'short-2', escena: '11', gancho: [{texto: '10 + 10 + 10', color: 'blanco', tamano: 130}, {texto: '= 31 ?', color: 'amarillo', tamano: 190}]},
  ],
  miniatura: {
    lineas: [{texto: '5 ERRORES', color: 'amarillo'}, {texto: 'de Excel', color: 'blanco', tamano: 96}, {texto: 'de EXPERTOS', color: 'rojo'}],
    pildora: 'y cómo evitarlos',
    insignia: '10+10+10=31 ?',
    formula: '=BUSCARV("P-999";A2:C6;3)',
    filas: [['Código', 'Precio'], ['P-999', '85 ✗'], ['', '#N/A ✓']],
    resaltarFila: 1,
  },
};
