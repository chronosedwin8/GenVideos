import type {Cue, EspecEpisodio} from '../../comun/motor-tipos';
import type {Manifest} from '../../comun/tipos';
import manifest from '../../../public/edwin-o/agruparpor-excel/manifest.json';

/* Datos y resultados verificados con pandas: canales/edwin-o/episodios/agruparpor-excel/ficha.md */
const DATOS = [
  ['Ene', 'Norte', 'Laptop', '2.400'],
  ['Ene', 'Sur', 'Mouse', '70'],
  ['Ene', 'Centro', 'Monitor', '620'],
  ['Ene', 'Norte', 'Monitor', '310'],
  ['Ene', 'Sur', 'Laptop', '1.200'],
  ['Ene', 'Centro', 'Mouse', '105'],
  ['Feb', 'Norte', 'Laptop', '3.600'],
  ['Feb', 'Sur', 'Monitor', '930'],
  ['Feb', 'Centro', 'Laptop', '1.200'],
  ['Feb', 'Norte', 'Mouse', '35'],
  ['Feb', 'Sur', 'Mouse', '140'],
  ['Feb', 'Centro', 'Monitor', '310'],
];
const ENC = {negrita: true, fondo: '#E9F3EC'};
const VERDE = {fondo: '#DFF7E7', color: '#0F5A32', negrita: true};
const AMARILLO = {fondo: '#FFF3B0', negrita: true};
const ROJO = {fondo: '#FFC7CE', color: '#9C0006', negrita: true};
const der = 'right' as const;
type Celda = {ref: string; valor: string; desde: Cue; hasta?: Cue; [k: string]: unknown};

const datos = (d: Cue = 0, omitir: string[] = [], estilo: (i: number) => object = () => ({})): Celda[] => [
  ...['Mes', 'Región', 'Producto', 'Monto'].map((v, i) => ({ref: `${'ABCD'[i]}1`, valor: v, desde: d, ...ENC})),
  ...DATOS.flatMap((f, i) => f.map((v, j) => ({ref: `${'ABCD'[j]}${i + 2}`, valor: v, desde: d, ...(j === 3 ? {alinear: der} : {}), ...estilo(i)}))),
].filter((c) => !omitir.includes(c.ref));

/** Resultado de AGRUPARPOR en columnas F:G desde la fila `fila0`. */
const resultado = (filas: [string, string][], d: Cue, extra: object = {}, fila0 = 2, cols = 'FG'): Celda[] =>
  filas.flatMap(([r, v], i) => [
    {ref: `${cols[0]}${fila0 + i}`, valor: r, desde: d, ...(r === 'Total' ? {negrita: true} : {}), ...extra},
    {ref: `${cols[1]}${fila0 + i}`, valor: v, desde: d, alinear: der, ...(r === 'Total' ? {negrita: true} : {}), ...extra},
  ]);
const ALFA: [string, string][] = [['Centro', '2.235'], ['Norte', '6.345'], ['Sur', '2.340'], ['Total', '10.920']];
const ORDEN: [string, string][] = [['Norte', '6.345'], ['Sur', '2.340'], ['Centro', '2.235'], ['Total', '10.920']];
const FEB: [string, string][] = [['Centro', '1.510'], ['Norte', '3.635'], ['Sur', '1.070'], ['Total', '6.215']];

const BASE = {archivo: 'Ventas.xlsx', hoja: 'Ventas', columnas: 7, anchos: {A: 110, B: 150, C: 170, D: 140, E: 50, F: 170, G: 160}};
const F_BASICA = '=AGRUPARPOR(B2:B13;D2:D13;SUMA)';

export const episodio: EspecEpisodio = {
  canal: 'edwin-o',
  slug: 'agruparpor-excel',
  id: 'EdwinO-AgruparPor',
  manifest: manifest as Manifest,
  escenas: {
    '01': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {archivo: 'Ventas.xlsx', hoja: 'Ventas', columnas: 10, anchos: {A: 90, B: 120, C: 130, D: 110, E: 30, F: 200, G: 180, H: 30, I: 140, J: 130},
          celdas: [
            ...datos(0, ['D8']),
            {ref: 'D8', valor: '3.600', desde: 0, hasta: 'cambias+0.5', alinear: der},
            {ref: 'D8', valor: '4.000', desde: 'cambias+0.5', alinear: der, ...AMARILLO},
            {ref: 'F1', valor: 'Etiquetas de fila', desde: 0, negrita: true, fondo: '#DDE6FF'},
            {ref: 'G1', valor: 'Suma de Monto', desde: 0, negrita: true, fondo: '#DDE6FF'},
            ...resultado([['Centro', '2.235'], ['Norte', '6.345'], ['Sur', '2.340'], ['Total general', '10.920']], 0),
            {ref: 'G5', valor: '10.920', desde: 'igual', alinear: der, ...ROJO},
            {ref: 'I1', valor: 'AGRUPARPOR', desde: 'mira', negrita: true, fondo: '#FFE500'},
            ...resultado([['Centro', '2.235'], ['Norte', '6.745'], ['Sur', '2.340'], ['Total', '11.320']], 'formula', VERDE, 2, 'IJ'),
          ],
          zoom: [{a: 'D8', desde: 'cambias', escala: 1.4}, {a: 'G4', desde: 'igual', escala: 1.4}, {a: 'I4', desde: 'mira', escala: 1.2}],
          globos: [{a: 'G5', texto: '¡No cambió!', desde: 'igual', color: '#E30613', lado: 'abajo'}, {a: 'J5', texto: '¡Se actualizó sola!', desde: 'instante', color: '#1E9E4A', lado: 'abajo'}]}},
      ],
    },
    '02': {
      bloques: [
        {en: 0, tipo: 'cortinilla', titulo: 'AGRUPARPOR'},
        {en: 'hoy', tipo: 'titulo', lineas: [{texto: 'AGRUPARPOR', color: 'amarillo', tamano: 220}, {texto: 'y PIVOTARPOR', color: 'turquesa', tamano: 130}], sub: 'Resúmenes con UNA fórmula'},
        {en: 'muestro', tipo: 'lista', titulo: 'Hoy aprendes a…', items: [
          {texto: 'Ordenar', desde: 'ordenar', icono: '🔃'},
          {texto: 'Filtrar', desde: 'filtrar', icono: '🧹'},
          {texto: 'Poner encabezados', desde: 'encabezados', icono: '🏷️'},
          {texto: '¿Cuándo usar la tabla dinámica?', desde: 'conviene', icono: '🤔'},
        ]},
      ],
    },
    '03': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'titulo', lineas: [{texto: 'Están dando', color: 'blanco', tamano: 140}, {texto: 'DE QUÉ HABLAR', color: 'amarillo', tamano: 210}]},
        {en: 'junio', tipo: 'tarjeta', icono: '📰', titulo: 'Journal of Accountancy · junio 2025', texto: '“Dile adiós a las tablas dinámicas”', fuente: 'journalofaccountancy.com (AICPA)'},
        {en: 'exagerado', tipo: 'titulo', lineas: [{texto: '¿Exagerado?', color: 'blanco', tamano: 150}, {texto: 'SÍ… PERO', color: 'amarillo', tamano: 240}]},
      ],
    },
    '04': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '🏫', titulo: 'La queja número uno', texto: '“Profe, cambié los datos y la tabla no cambió.”', color: 'magenta'},
        {en: 'foto', tipo: 'tarjetas', items: [
          {icono: '📸', titulo: 'Tabla dinámica', texto: 'Es una foto de tus datos: hay que actualizarla.', desde: 'foto'},
          {icono: '⚡', titulo: 'AGRUPARPOR', texto: 'Es una fórmula: siempre al día.', desde: 'agruparpor', color: 'verde'},
        ]},
      ],
    },
    '05': {
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '🧩', titulo: 'Excel para Microsoft 365', texto: 'AGRUPARPOR y PIVOTARPOR vienen en el canal actual de Microsoft 365.'},
        {en: 'error', tipo: 'tarjeta', icono: '⚠️', titulo: '#¿NOMBRE?', texto: 'Tu versión todavía no la tiene: actualiza tu Office.', color: 'rojo'},
      ],
    },
    '06': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: datos('nuestros'),
          resaltes: [
            {rango: 'A2:A13', desde: 'mes', hasta: 'region', color: '#FFE500'},
            {rango: 'B2:B13', desde: 'region', hasta: 'producto', color: '#3DD6C8'},
            {rango: 'C2:C13', desde: 'producto', hasta: 'monto', color: '#E5197F'},
            {rango: 'D2:D13', desde: 'monto', hasta: 'pregunta', color: '#1E9E4A'},
          ]}},
        {en: 'pregunta', capa: true, tipo: 'pildora', texto: '❓ ¿Cuánto vendió cada región?', tamano: 54},
      ],
    },
    '07': {
      paso: {n: 1, texto: 'La fórmula básica'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [...datos(), ...resultado(ALFA, 'listo', VERDE)],
          escritura: [{celda: 'F2', texto: F_BASICA, desde: 'agruparpor', duracion: 9, enter: 'enter'}],
          resaltes: [{rango: 'B2:B13', desde: 'regiones', hasta: 'montos', color: '#3DD6C8'}, {rango: 'D2:D13', desde: 'montos', hasta: 'enter', color: '#E5197F'}],
          globos: [{a: 'G5', texto: 'Total general', desde: 'general', lado: 'abajo'}]}},
      ],
    },
    '08': {
      paso: {n: 2, texto: 'Tres preguntas'},
      bloques: [
        {en: 0, tipo: 'formula', formula: F_BASICA, titulo: 'La fórmula responde 3 preguntas', escribir: false, partes: [
          {texto: 'B2:B13', nota: '¿Por qué agrupo? Por región', desde: 'agrupo'},
          {texto: 'D2:D13', nota: '¿Qué calculo? Los montos', desde: 'calculo'},
          {texto: 'SUMA', nota: '¿Cómo? Sumando', desde: 'como'},
        ]},
        {en: 'contara', tipo: 'tarjeta', icono: '🔢', titulo: 'CONTARA en vez de SUMA', texto: 'Te dice cuántas ventas hubo en cada región.', color: 'verde'},
      ],
    },
    '09': {
      paso: {n: 3, texto: 'De mayor a menor'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [...datos(), ...resultado(ALFA, 0, {hasta: 'ahora'}), ...resultado(ORDEN, 'ahora', VERDE)],
          escritura: [{celda: 'F2', texto: '=AGRUPARPOR(B2:B13;D2:D13;SUMA;;;-2)', desde: 'sexto', duracion: 2.5, enter: 'ahora'}],
          zoom: [{a: 'G3', desde: 'ahora', escala: 1.5}],
          globos: [{a: 'G2', texto: '-2 = columna 2, de mayor a menor', desde: 'significa'}]}},
      ],
    },
    '10': {
      paso: {n: 4, texto: 'Encabezados'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [
          ...datos(), ...resultado(ALFA, 0, {hasta: 'muestralos'}),
          {ref: 'F1', valor: 'Región', desde: 'muestralos', ...ENC}, {ref: 'G1', valor: 'Monto', desde: 'muestralos', ...ENC},
          ...resultado(ALFA, 'muestralos', VERDE),
        ], escritura: [{celda: 'F1', texto: '=AGRUPARPOR(B1:B13;D1:D13;SUMA;3)', desde: 'incluye', duracion: 2.5, enter: 'muestralos'}],
        resaltes: [{rango: 'A1:D1', desde: 'fila', hasta: 'muestralos', color: '#FFE500'}],
        zoom: [{a: 'G2', desde: 'muestralos', escala: 1.5}]}},
      ],
    },
    '11': {
      paso: {n: 5, texto: 'Filtra en la fórmula'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [...datos(), ...resultado(ALFA, 0, {hasta: 'ahora'}), ...resultado(FEB, 'ahora', VERDE)],
          escritura: [{celda: 'F2', texto: '=AGRUPARPOR(B2:B13;D2:D13;SUMA;;;;A2:A13="Feb")', desde: 'septimo', duracion: 3, enter: 'ahora'}],
          resaltes: [{rango: 'A8:A13', desde: 'feb', color: '#1E9E4A'}],
          globos: [{a: 'G5', texto: 'Solo febrero', desde: 'cuenta', lado: 'abajo'}]}},
        {en: 'tocaste', tipo: 'lista', titulo: 'Sin tocar nada', items: [
          {texto: 'No tocaste los datos', desde: 'tocaste'},
          {texto: 'No pusiste filtros', desde: 'pusiste'},
          {texto: 'Cambia "Feb" por "Ene" y ves enero', desde: 'cambias'},
        ]},
      ],
    },
    '12': {
      paso: {n: 6, texto: 'Se actualiza sola'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [
          ...datos(0, ['D8']),
          {ref: 'D8', valor: '3.600', desde: 0, hasta: 'cuatro', alinear: der},
          {ref: 'D8', valor: '4.000', desde: 'cuatro', alinear: der, ...AMARILLO},
          ...resultado([['Centro', '2.235'], ['Sur', '2.340']].map((x) => x as [string, string]), 0).map((c) => ({...c, ref: c.ref.replace('3', '4').replace(/^([FG])2$/, '$12')})),
          {ref: 'F3', valor: 'Norte', desde: 0}, {ref: 'G3', valor: '6.345', desde: 0, hasta: 'sube', alinear: der}, {ref: 'G3', valor: '6.745', desde: 'sube', alinear: der, ...VERDE},
          {ref: 'F5', valor: 'Total', desde: 0, negrita: true}, {ref: 'G5', valor: '10.920', desde: 0, hasta: 'total', alinear: der, negrita: true}, {ref: 'G5', valor: '11.320', desde: 'total', alinear: der, ...VERDE},
        ], zoom: [{a: 'D8', desde: 'cambio', escala: 1.5}, {a: 'G3', desde: 'sube', escala: 1.5}, {a: 'G5', desde: 'total', escala: 1.5}]}},
        {en: 'actualizar', tipo: 'titulo', lineas: [{texto: 'Sin actualizar,', color: 'blanco', tamano: 140}, {texto: 'SIN CLICS', color: 'amarillo', tamano: 240}]},
      ],
    },
    '13': {
      paso: {n: 7, texto: 'Dos niveles'},
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '🪜', titulo: 'Dos columnas en el 1.er argumento', texto: '`B2:C13` → primero por región, luego por producto.'},
        {en: 'norte', tipo: 'cuadricula', titulo: 'Norte', items: [
          {icono: '💻', texto: 'Laptop: 6.000', desde: 'laptops'},
          {icono: '🖥️', texto: 'Monitor: 310', desde: 'monitores'},
          {icono: '🖱️', texto: 'Mouse: 35', desde: 'mouse'},
        ]},
        {en: 'quinto', capa: true, tipo: 'pildora', texto: '5.º argumento: ¿quieres subtotales?', tamano: 50},
      ],
    },
    '14': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {archivo: 'Ventas.xlsx', hoja: 'Ventas', columnas: 9, anchos: {A: 90, B: 120, C: 130, D: 110, E: 30, F: 150, G: 120, H: 120, I: 140},
          celdas: [
            ...datos(),
            ...['Ene', 'Feb', 'Total'].map((v, i) => ({ref: `${'GHI'[i]}1`, valor: v, desde: 'matriz', ...ENC, alinear: der})),
            ...[['Centro', '725', '1.510', '2.235'], ['Norte', '2.710', '3.635', '6.345'], ['Sur', '1.270', '1.070', '2.340'], ['Total', '4.705', '6.215', '10.920']].flatMap((f, i) =>
              f.map((v, j) => ({ref: `${'FGHI'[j]}${i + 2}`, valor: v, desde: `matriz+${0.15 * i}`, ...(j ? {alinear: der} : {}), ...(i === 3 || j === 3 ? {negrita: true} : {}), ...VERDE})),
            ),
          ],
          escritura: [{celda: 'F1', texto: '=PIVOTARPOR(B2:B13;A2:A13;D2:D13;SUMA)', desde: 'igual', duracion: 3.5, enter: 'matriz'}],
          resaltes: [{rango: 'B2:B13', desde: 'filas', hasta: 'meses', color: '#3DD6C8'}, {rango: 'A2:A13', desde: 'meses', hasta: 'centro', color: '#FFE500'}, {rango: 'D2:D13', desde: 'centro', hasta: 'igual', color: '#E5197F'}],
          zoom: [{a: 'H3', desde: 'matriz+0.6', escala: 1.4}]}},
      ],
    },
    '15': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {archivo: 'Ventas.xlsx', hoja: 'Tablero', columnas: 7, anchos: {A: 180, B: 150, C: 60, D: 150, E: 130, F: 130, G: 140}, hojas: ['Ventas', 'Tablero'], hojaActiva: [{nombre: 'Tablero', desde: 0}],
          celdas: [
            {ref: 'A1', valor: 'Por región', desde: 'resumen', negrita: true, fondo: '#FFE500'},
            ...resultado([['Centro', '2.235'], ['Norte', '6.345'], ['Sur', '2.340'], ['Total', '10.920']], 'resumen+0.3', {hasta: 'cambia+0.5'}, 2, 'AB'),
            ...resultado([['Centro', '2.235'], ['Norte', '6.745'], ['Sur', '2.340'], ['Total', '11.320']], 'cambia+0.5', VERDE, 2, 'AB'),
            {ref: 'D1', valor: 'Por mes', desde: 'matriz', negrita: true, fondo: '#FFE500'},
            ...['Ene', 'Feb', 'Total'].map((v, i) => ({ref: `${'EFG'[i]}2`, valor: v, desde: 'matriz+0.3', ...ENC, alinear: der})),
            ...[['Centro', '725', '1.510', '2.235'], ['Norte', '2.710', '3.635', '6.345'], ['Sur', '1.270', '1.070', '2.340'], ['Total', '4.705', '6.215', '10.920']].flatMap((f, i) =>
              f.map((v, j) => ({ref: `${'DEFG'[j]}${i + 3}`, valor: v, desde: 'matriz+0.3', ...(j ? {alinear: der} : {}), ...(j === 2 || j === 3 ? {hasta: 'cambia+0.5'} : {})})),
            ),
            ...[['Norte', '4.035', '6.745'], ['Total', '6.615', '11.320'], ['Centro', '1.510', '2.235'], ['Sur', '1.070', '2.340']].flatMap(([r, feb, tot]) => {
              const fila = {Centro: 3, Norte: 4, Sur: 5, Total: 6}[r]!;
              return [{ref: `F${fila}`, valor: feb, desde: 'cambia+0.5', alinear: der, ...(r === 'Norte' || r === 'Total' ? VERDE : {})}, {ref: `G${fila}`, valor: tot, desde: 'cambia+0.5', alinear: der, ...(r === 'Norte' || r === 'Total' ? VERDE : {})}];
            }),
            {ref: 'A8', valor: 'Solo febrero', desde: 'filtrado', negrita: true, fondo: '#FFE500'},
            ...resultado([['Centro', '1.510'], ['Norte', '3.635'], ['Sur', '1.070'], ['Total', '6.215']], 'filtrado+0.3', {hasta: 'cambia+0.5'}, 9, 'AB'),
            ...resultado([['Centro', '1.510'], ['Norte', '4.035'], ['Sur', '1.070'], ['Total', '6.615']], 'cambia+0.5', VERDE, 9, 'AB'),
          ],
          globos: [{a: 'G6', texto: '3 bloques, 1 cambio', desde: 'cambia+0.6', lado: 'abajo'}]}},
        {en: 'construir', tipo: 'titulo', lineas: [{texto: 'Un mini tablero', color: 'blanco', tamano: 140}, {texto: 'SIN TABLAS DINÁMICAS', color: 'amarillo', tamano: 160}], texto: 'Y sin macros.'},
      ],
    },
    '16': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [
          ...datos(),
          ...resultado([['Centro', '2235'], ['Norte', '6345'], ['Sur', '2340'], ['Total', '10920']], 0, {hasta: 'inicio'}),
          ...resultado([['Centro', '2.235'], ['Sur', '2.340'], ['Total', '10.920']].map((x) => x as [string, string]), 'inicio').map((c) => ({...c, ref: c.ref.replace(/(\d+)$/, (n) => String(Number(n) === 2 ? 2 : Number(n) + 1))})),
          {ref: 'F3', valor: 'Norte', desde: 'inicio'},
          {ref: 'G3', valor: '6.345', desde: 'inicio', alinear: der, fondo: '#DFF7E7', fondoDesde: 'condicional', negrita: true},
        ], seleccion: [{celda: 'G2', desde: 'seleccionalo'}],
        resaltes: [{rango: 'F2:G9', desde: 'filas', color: '#E5197F'}],
        globos: [{a: 'G2', texto: 'Formato de miles', desde: 'inicio'}, {a: 'G3', texto: 'La ganadora', desde: 'condicional+0.5'}]}},
      ],
    },
    '17': {
      bloques: [
        {en: 0, tipo: 'comparar', titulo: '¿Fórmula o tabla dinámica?', izq: {titulo: 'Tabla dinámica', icono: '📊', color: 'azul', items: [
          {texto: 'Explorar arrastrando campos', desde: 'explorar', icono: '✓'},
          {texto: 'Formato en segundos', desde: 'formato', icono: '✓'},
          {texto: 'Hay que actualizarla', desde: 'actualice', icono: '✗'},
        ]}, der: {titulo: 'AGRUPARPOR', icono: '⚡', desde: 'cuando', items: [
          {texto: 'Se actualiza sola', desde: 'actualice'},
          {texto: 'Filtra dentro de la fórmula', desde: 'filtrar'},
          {texto: 'Se combina con otras fórmulas', desde: 'combinar'},
        ]}},
        {en: 'usa', tipo: 'titulo', lineas: [{texto: 'Usa', color: 'blanco', tamano: 150}, {texto: 'LAS DOS', color: 'amarillo', tamano: 280}]},
      ],
    },
    '18': {
      bloques: [
        {en: 0, tipo: 'errores', titulo: 'Errores comunes', items: [
          {mal: '#¿NOMBRE?', bien: 'Tu Excel aún no tiene la función', desde: 'nombre'},
          {mal: '#¡DESBORDAMIENTO!', bien: 'Libera las celdas del resultado', desde: 'desbordamiento'},
          {mal: '#¡VALOR!', bien: 'Los rangos deben tener el mismo tamaño', desde: 'valor'},
        ]},
      ],
    },
    '19': {
      paso: {n: '💡', prefijo: 'TRUCO', texto: 'Combínala con una Tabla'},
      bloques: [
        {en: 0, tipo: 'teclas', teclas: ['Ctrl', 'T'], texto: 'Convierte tus datos en Tabla'},
        {en: 'escribe', tipo: 'hoja', hoja: {...BASE, filas: 15, celdas: [
          ...['Mes', 'Región', 'Producto', 'Monto'].map((v, i) => ({ref: `${'ABCD'[i]}1`, valor: v, desde: 0, negrita: true, fondo: '#1A3BAF', color: 'white'})),
          ...DATOS.flatMap((f, i) => f.map((v, j) => ({ref: `${'ABCD'[j]}${i + 2}`, valor: v, desde: 0, ...(j === 3 ? {alinear: der} : {}), ...(i % 2 ? {fondo: '#DDE6FF'} : {})}))),
          ...['Feb', 'Sur', 'Laptop', '1.200'].map((v, j) => ({ref: `${'ABCD'[j]}14`, valor: v, desde: 'agregues', ...(j === 3 ? {alinear: der} : {}), ...AMARILLO})),
          ...resultado([['Centro', '2.235'], ['Norte', '6.345'], ['Sur', '2.340'], ['Total', '10.920']], 'ahora', {hasta: 'entra'}),
          ...resultado([['Centro', '2.235'], ['Norte', '6.345'], ['Sur', '3.540'], ['Total', '12.120']], 'entra', VERDE),
        ], escritura: [{celda: 'F2', texto: '=AGRUPARPOR(Ventas[Región];Ventas[Monto];SUMA)', desde: 'escribe', duracion: 3, enter: 'ahora'}],
        zoom: [{a: 'D12', desde: 'agregues', escala: 1.2}],
        globos: [{a: 'G4', texto: '¡Entró sola!', desde: 'entra'}]}},
        {en: 'dedo+0.6', tipo: 'titulo', lineas: [{texto: 'Si no lo aprendes ahora,', color: 'blanco', tamano: 110}, {texto: 'TE EXTINGUES', color: 'rojo', tamano: 210}]},
      ],
    },
    '20': {
      bloques: [
        {en: 0, tipo: 'resumen', ideas: [
          {texto: 'Por qué agrupo, qué calculo y cómo', desde: 'preguntas'},
          {texto: 'Ordena y filtra en la fórmula', desde: 'ordenar'},
          {texto: 'Se actualiza sola', desde: 'actualiza'},
        ]},
        {en: 'proximo', tipo: 'cierre', siguiente: 'Condicionales en Python: IF, ELIF y ELSE', suscribir: 'suscribete'},
      ],
    },
  },
  shorts: [
    {id: 'short-1', escena: '12', gancho: [{texto: 'Un resumen que', color: 'blanco', tamano: 100}, {texto: 'SE ACTUALIZA SOLO', color: 'amarillo', tamano: 120}]},
    {id: 'short-2', escena: '11', gancho: [{texto: 'Filtra DENTRO', color: 'amarillo', tamano: 130}, {texto: 'de la fórmula', color: 'blanco', tamano: 100}]},
  ],
  miniatura: {
    lineas: [{texto: 'ADIÓS', color: 'amarillo'}, {texto: 'TABLAS DINÁMICAS', color: 'blanco', tamano: 92}, {texto: '¿en serio?', color: 'magenta', tamano: 84}],
    pildora: 'AGRUPARPOR',
    insignia: '1 FÓRMULA',
    formula: '=AGRUPARPOR(B2:B13;D2:D13;SUMA)',
    filas: [['Región', 'Total'], ['Norte', '6.345'], ['Sur', '2.340'], ['Centro', '2.235']],
    resaltarFila: 1,
  },
};
