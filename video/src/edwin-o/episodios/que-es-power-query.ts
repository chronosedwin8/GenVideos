import type {Cue, EspecEpisodio} from '../../comun/motor-tipos';
import type {Manifest} from '../../comun/tipos';
import manifest from '../../../public/edwin-o/que-es-power-query/manifest.json';

/* Datos verificados con pandas y etiquetas tomadas del Power Query instalado
   (canales/edwin-o/episodios/que-es-power-query/ficha.md). El editor es una recreación. */
type Fila = (string | number | null)[];
const RAW: Fila[] = [
  ['02/02/2026', '  ana torres', 'Laptop - Norte', 1200],
  ['02/02/2026', 'LUIS GÓMEZ ', 'Mouse - Sur', 70],
  ['03/02/2026', 'sara ruiz', 'Monitor - Centro', 620],
  ['02/02/2026', '  ana torres', 'Laptop - Norte', 1200],
  [null, null, null, null],
  ['04/02/2026', 'juan pérez', 'Laptop - Sur', 1200],
  ['05/02/2026', 'Marta Díaz  ', 'Teclado - Norte', 85],
  ['05/02/2026', 'luis gómez', 'Monitor - Norte', 310],
];
const NUEVAS: Fila[] = [
  ['06/02/2026', '  sara ruiz', 'Mouse - Centro', 35],
  ['06/02/2026', 'ANA TORRES', 'Monitor - Norte', 930],
];
const SIN_BLANCO = RAW.filter((f) => f[0] !== null);
const RECORTADO = SIN_BLANCO.map((f) => [f[0], String(f[1]).trim(), f[2], f[3]]);
const nombre = (t: string) => t.trim().toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());
const MAYUS = SIN_BLANCO.map((f) => [f[0], nombre(String(f[1])), f[2], f[3]]);
const DIVIDIDO = MAYUS.map((f) => [f[0], f[1], ...String(f[2]).split(' - '), f[3]]);
const LIMPIO = DIVIDIDO.filter((f, i) => DIVIDIDO.findIndex((g) => JSON.stringify(g) === JSON.stringify(f)) === i);
const LIMPIO8 = [...LIMPIO, ...NUEVAS.map((f) => [f[0], nombre(String(f[1])), ...String(f[2]).split(' - '), f[3]])];
const C4 = ['Fecha', 'Vendedor', 'Producto - Región', 'Monto'];
const C5 = ['Fecha', 'Vendedor', 'Producto', 'Región', 'Monto'];
const C5b = ['Fecha', 'Vendedor', 'Producto.1', 'Producto.2', 'Monto'];
const A4 = [190, 300, 380, 170];
const A5 = [190, 270, 210, 190, 170];

const ENC = {negrita: true, fondo: '#E9F3EC'};
const ROJO = {fondo: '#FFC7CE', color: '#9C0006'};
type Celda = {ref: string; valor: string; desde: Cue; [k: string]: unknown};
const fmt = (v: string | number | null) => (v === null ? '' : typeof v === 'number' ? v.toLocaleString('es-CO') : v);
const hojaDe = (cols: string[], filas: Fila[], d: Cue = 0, extra: (r: number, c: number) => object = () => ({})): Celda[] => [
  ...cols.map((v, i) => ({ref: `${'ABCDE'[i]}1`, valor: v, desde: d, ...ENC})),
  ...filas.flatMap((f, r) => f.map((v, c) => ({ref: `${'ABCDE'[c]}${r + 2}`, valor: fmt(v), desde: d, ...(typeof v === 'number' ? {alinear: 'right'} : {}), ...extra(r, c)}))),
];
const PEST = ['Archivo', 'Inicio', 'Insertar', 'Datos', 'Revisar', 'Vista'];
const BOT_DATOS = ['Obtener datos', 'Desde tabla o rango', 'Desde la web', 'Actualizar todo'];
const BASE = {archivo: 'Ventas.xlsx', hoja: 'Exportación', columnas: 5, filas: 11, anchos: {A: 170, B: 260, C: 300, D: 150, E: 100}, pestanas: PEST, botones: BOT_DATOS};
const PASOS = ['Origen', 'Tipo cambiado', 'Filas en blanco quitadas', 'Texto recortado', 'En mayúsculas cada palabra', 'Dividir columna por delimitador', 'Columnas con nombre cambiado', 'Duplicados quitados', 'Tipo cambiado1'];
const pasos = (desdes: Cue[]) => desdes.map((desde, i) => ({texto: PASOS[i], desde}));

export const episodio: EspecEpisodio = {
  canal: 'edwin-o',
  slug: 'que-es-power-query',
  id: 'EdwinO-QueEsPowerQuery',
  manifest: manifest as Manifest,
  escenas: {
    '01': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: hojaDe(C4, RAW, 0),
          resaltes: [{rango: 'B2:B9', desde: 'espacios', color: '#E30613'}, {rango: 'A5:D5', desde: 'repetidas', color: '#E30613'}],
          globos: [{a: 'B3', texto: '😩 1 hora cada lunes', desde: 'hora', color: '#E30613', lado: 'derecha'}]}},
        {en: 'clic', tipo: 'hoja', hoja: {...BASE, hoja: 'Ventas limpias', celdas: hojaDe(C5, LIMPIO, 'clic', () => ({fondo: '#DFF7E7'})),
          anchos: {A: 170, B: 220, C: 180, D: 150, E: 140}, cursor: [{a: 'btn:Actualizar todo', desde: 'clic', clic: true}], pestanaActiva: [{nombre: 'Datos', desde: 0}]}},
      ],
    },
    '02': {
      bloques: [
        {en: 0, tipo: 'cortinilla', titulo: 'POWER QUERY'},
        {en: 'explico', tipo: 'titulo', lineas: [{texto: 'POWER QUERY', color: 'amarillo', tamano: 200}], sub: 'Limpia tus datos sola'},
        {en: 'donde', tipo: 'lista', titulo: 'Hoy aprendes…', items: [
          {texto: 'Dónde está', desde: 'donde', icono: '📍'},
          {texto: 'Cómo funciona por dentro', desde: 'funciona', icono: '⚙️'},
          {texto: 'Una limpieza paso a paso', desde: 'limpieza', icono: '🧹'},
          {texto: 'Actualizar todo con un clic', desde: 'actualizar', icono: '🔄'},
        ]},
      ],
    },
    '03': {
      bloques: [
        {en: 0, tipo: 'cuadricula', titulo: 'Power Query está en…', items: [
          {icono: '🪟', texto: 'Excel para Windows', desde: 'windows'},
          {icono: '🍎', texto: 'Excel para Mac', desde: 'mac'},
          {icono: '🌐', texto: 'Excel para la Web', desde: 'web'},
          {icono: '📊', texto: 'Power BI (el mismo motor)', desde: 'motor'},
        ]},
        {en: 'veinticinco', capa: true, tipo: 'pildora', texto: '2025: la web ya actualiza orígenes con contraseña', abajo: true, tamano: 42, hasta: 'motor'},
        {en: 'analista', capa: true, tipo: 'pildora', texto: '📈 Primer paso como analista de datos', abajo: true, tamano: 46},
      ],
    },
    '04': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '🏫', titulo: 'En mis capacitaciones', texto: 'Cada lunes, el mismo reporte del sistema… limpiado a mano, celda por celda.', ancho: 1500},
        {en: 'hora', tipo: 'cifra', valor: '1 hora', texto: 'cada semana, haciendo lo mismo', color: 'amarillo'},
        {en: 'reaccion', tipo: 'titulo', lineas: [{texto: '¿Y POR QUÉ NADIE', color: 'blanco', tamano: 120}, {texto: 'ME LO HABÍA', color: 'amarillo', tamano: 120}, {texto: 'ENSEÑADO?', color: 'amarillo', tamano: 140}]},
      ],
    },
    '05': {
      bloques: [
        {en: 0, tipo: 'tarjetas', titulo: '¿Qué es Power Query?', items: [
          {icono: '📥', titulo: '1. Obtener', texto: 'De un archivo, una carpeta o la web', desde: 'obtiene'},
          {icono: '🧹', titulo: '2. Transformar', texto: 'Limpia, divide y une', desde: 'transforma'},
          {icono: '📤', titulo: '3. Cargar', texto: 'En una hoja de Excel', desde: 'carga'},
        ]},
        {en: 'grabadora', capa: true, tipo: 'pildora', texto: '⏺️ Una grabadora de pasos', tamano: 54},
        {en: 'recuerda', capa: true, tipo: 'pildora', texto: '🔁 Recuerda cada paso para repetirlo', abajo: true, tamano: 46},
      ],
    },
    '06': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: hojaDe(C4, RAW.slice(0, 3), 0),
          pestanaActiva: [{nombre: 'Datos', desde: 'datos'}],
          cursor: [{a: 'tab:Datos', desde: 'datos', clic: true}, {a: 'btn:Obtener datos', desde: 'obtener'}, {a: 'btn:Desde tabla o rango', desde: 'desde', clic: true}],
          zoom: [{a: 'btn:Desde tabla o rango', desde: 'desde', escala: 1.5}]}},
        {en: 'instalar', capa: true, tipo: 'pildora', texto: '✅ Ya viene incluido en Excel', abajo: true, tamano: 46},
      ],
    },
    '07': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: hojaDe(C4, RAW, 0),
          resaltes: [
            {rango: 'B2:B9', desde: 'espacios', hasta: 'producto', color: '#E30613'},
            {rango: 'C2:C9', desde: 'producto', hasta: 'blanco', color: '#1F6FEB'},
            {rango: 'A6:D6', desde: 'blanco', color: '#FF9500'},
            {rango: 'A5:D5', desde: 'repetida', color: '#E30613'},
          ],
          globos: [
            {a: 'B2', texto: 'Espacios', desde: 'espacios', hasta: 'mayusculas', color: '#E30613', lado: 'derecha'},
            {a: 'B3', texto: 'MAYÚSCULAS / minúsculas', desde: 'mayusculas', hasta: 'producto', color: '#E30613', lado: 'derecha'},
            {a: 'C4', texto: 'Dos datos en una columna', desde: 'producto', hasta: 'blanco', color: '#1F6FEB', lado: 'derecha'},
            {a: 'D6', texto: 'Fila en blanco', desde: 'blanco', hasta: 'repetida', color: '#FF9500', lado: 'derecha'},
            {a: 'D5', texto: 'Repetida', desde: 'repetida', color: '#E30613', lado: 'derecha'},
          ]}},
      ],
    },
    '08': {
      paso: {n: 1, texto: 'Lleva los datos a Power Query'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: hojaDe(C4, RAW, 0),
          seleccion: [{celda: 'B3', desde: 'clic'}],
          pestanaActiva: [{nombre: 'Datos', desde: 'datos'}],
          cursor: [{a: 'B3', desde: 'clic', clic: true}, {a: 'tab:Datos', desde: 'datos', clic: true}, {a: 'btn:Desde tabla o rango', desde: 'pulsa', clic: true}]}},
        {en: 'abre', tipo: 'editorpq', estados: [{desde: 'abre', columnas: C4, filas: RAW}], pasos: pasos(['abre', 'abre+0.4']), anchos: A4},
        {en: 'tocan', capa: true, tipo: 'pildora', texto: '🛡️ Tus datos originales no se tocan', abajo: true, tamano: 46},
      ],
    },
    '09': {
      bloques: [
        {en: 0, tipo: 'editorpq', estados: [{desde: 0, columnas: C4, filas: RAW}], pasos: pasos([0, 0]), anchos: A4,
          botones: [{pestana: 'Inicio', texto: 'Cinta: Inicio · Transformar · Agregar columna', desde: 'cinta', hasta: 'centro'}]},
        {en: 'centro', capa: true, tipo: 'pildora', texto: '👀 Centro: la vista previa', tamano: 48, hasta: 'derecha'},
        {en: 'derecha', capa: true, tipo: 'pildora', texto: '➡️ Pasos aplicados: tu receta', tamano: 52},
      ],
    },
    '10': {
      paso: {n: 2, texto: 'Quita las filas en blanco'},
      bloques: [
        {en: 0, tipo: 'editorpq', anchos: A4,
          estados: [{desde: 0, columnas: C4, filas: RAW, resaltarFila: [4]}, {desde: 'listo', columnas: C4, filas: SIN_BLANCO}],
          botones: [{pestana: 'Inicio', texto: 'Quitar filas ▸ Quitar filas en blanco', desde: 'abre'}],
          pasos: pasos([0, 0, 'listo'])},
      ],
    },
    '11': {
      paso: {n: 3, texto: 'Limpia los nombres'},
      bloques: [
        {en: 0, tipo: 'editorpq', anchos: A4,
          estados: [
            {desde: 0, columnas: C4, filas: SIN_BLANCO, resaltarCol: [1]},
            {desde: 'recortar+0.6', columnas: C4, filas: RECORTADO, resaltarCol: [1]},
            {desde: 'palabra', columnas: C4, filas: MAYUS, resaltarCol: [1]},
          ],
          botones: [
            {pestana: 'Transformar', texto: 'Formato ▸ Recortar', desde: 'transformar'},
            {pestana: 'Transformar', texto: 'Formato ▸ Poner En Mayúsculas Cada Palabra', desde: 'otra'},
          ],
          pasos: pasos([0, 0, 0, 'recortar+0.6', 'palabra'])},
      ],
    },
    '12': {
      paso: {n: 4, texto: 'Separa producto y región'},
      bloques: [
        {en: 0, tipo: 'editorpq', anchos: A5,
          estados: [
            {desde: 0, columnas: C4, filas: MAYUS, resaltarCol: [2]},
            {desde: 'aceptar', columnas: C5b, filas: DIVIDIDO, resaltarCol: [2, 3]},
            {desde: 'producto#2', columnas: C5, filas: DIVIDIDO, resaltarCol: [2, 3]},
          ],
          botones: [{pestana: 'Inicio', texto: 'Dividir columna ▸ Por delimitador:  " - "', desde: 'dividir'}],
          pasos: pasos([0, 0, 0, 0, 0, 'aceptar', 'producto#2'])},
      ],
    },
    '13': {
      paso: {n: 5, texto: 'Quita los duplicados'},
      bloques: [
        {en: 0, tipo: 'editorpq', anchos: A5,
          estados: [{desde: 0, columnas: C5, filas: DIVIDIDO, resaltarFila: [0, 3]}, {desde: 'desaparece', columnas: C5, filas: LIMPIO}],
          botones: [{pestana: 'Inicio', texto: 'Ctrl + A ▸ Quitar filas ▸ Quitar duplicados', desde: 'selecciona'}],
          pasos: pasos([0, 0, 0, 0, 0, 0, 0, 'desaparece'])},
        {en: 'primero', capa: true, tipo: 'pildora', texto: '💡 Por eso limpiamos los nombres primero', abajo: true, tamano: 44},
      ],
    },
    '14': {
      paso: {n: 6, texto: 'Los tipos de datos'},
      bloques: [
        {en: 0, tipo: 'editorpq', anchos: A5,
          estados: [{desde: 0, columnas: ['📅 Fecha', 'ABC Vendedor', 'ABC Producto', 'ABC Región', '1.2 Monto'], filas: LIMPIO, resaltarCol: [0, 4]},
            {desde: 'elige', columnas: ['📅 Fecha', 'ABC Vendedor', 'ABC Producto', 'ABC Región', '123 Monto'], filas: LIMPIO, resaltarCol: [4]}],
          botones: [{pestana: 'Inicio', texto: 'Tipo de datos: Número entero', desde: 'elige'}],
          pasos: pasos([0, 0, 0, 0, 0, 0, 0, 0, 'elige'])},
        {en: 'clave', capa: true, tipo: 'pildora', texto: '⚠️ Monto como texto = no se puede sumar', abajo: true, tamano: 44},
      ],
    },
    '15': {
      bloques: [
        {en: 0, tipo: 'editorpq', anchos: A5,
          estados: [{desde: 0, columnas: C5, filas: LIMPIO}, {desde: 'anterior', columnas: C4, filas: RAW}, {desde: 'equis', columnas: C5, filas: LIMPIO}],
          pasos: pasos([0, 0, 0, 0, 0, 0, 0, 0, 0])},
        {en: 'equis', capa: true, tipo: 'pildora', texto: '✗ Borra un paso con la equis', tamano: 48, hasta: 'pierde'},
        {en: 'pierde', capa: true, tipo: 'pildora', texto: '🛡️ Tus datos originales siguen intactos', abajo: true, tamano: 46},
      ],
    },
    '16': {
      paso: {n: 7, texto: 'Cerrar y cargar'},
      bloques: [
        {en: 0, tipo: 'editorpq', anchos: A5, estados: [{desde: 0, columnas: C5, filas: LIMPIO}], pasos: pasos([0, 0, 0, 0, 0, 0, 0, 0, 0]),
          botones: [{pestana: 'Inicio', texto: 'Cerrar y cargar', desde: 'pulsa'}]},
        {en: 'crea', tipo: 'hoja', hoja: {...BASE, hoja: 'Ventas limpias', anchos: {A: 170, B: 220, C: 180, D: 150, E: 140}, hojas: ['Exportación', 'Ventas limpias'], hojaActiva: [{nombre: 'Ventas limpias', desde: 0}],
          celdas: hojaDe(C5, LIMPIO, 'crea', (r) => ({fondo: r % 2 ? '#EEF7F0' : '#DFF7E7'}))}},
        {en: 'consulta', capa: true, tipo: 'pildora', texto: 'Consultas y conexiones · Ventas: 6 filas cargadas', abajo: true, tamano: 42},
      ],
    },
    '17': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [...hojaDe(C4, RAW, 0), ...NUEVAS.flatMap((f, r) => f.map((v, c) => ({ref: `${'ABCD'[c]}${r + 10}`, valor: fmt(v), desde: 'pegas', fondo: '#FFF3B0', ...(typeof v === 'number' ? {alinear: 'right'} : {})})))],
          pestanaActiva: [{nombre: 'Datos', desde: 'datos'}],
          cursor: [{a: 'tab:Datos', desde: 'datos', clic: true}, {a: 'btn:Actualizar todo', desde: 'pulsas', clic: true}]}},
        {en: 'repite', tipo: 'hoja', hoja: {...BASE, hoja: 'Ventas limpias', anchos: {A: 170, B: 220, C: 180, D: 150, E: 140}, hojas: ['Exportación', 'Ventas limpias'], hojaActiva: [{nombre: 'Ventas limpias', desde: 0}],
          celdas: [...hojaDe(C5, LIMPIO8, 'repite', (r) => (r >= 6 ? {fondo: '#FFF3B0'} : {fondo: '#DFF7E7'})), {ref: 'D11', valor: 'Total', desde: 'total', negrita: true}, {ref: 'E11', valor: '4.450', desde: 'total', negrita: true, alinear: 'right', fondo: '#FFE500'}],
          zoom: [{a: 'E9', desde: 'total', escala: 1.4}]}},
        {en: 'nunca', capa: true, tipo: 'pildora', texto: '🎉 Ya no limpias nunca más', abajo: true, tamano: 50},
      ],
    },
    '18': {
      bloques: [
        {en: 0, tipo: 'comparar', titulo: '¿Power Query o fórmulas?', izq: {titulo: 'Fórmulas', icono: '🧮', color: 'turquesa', items: [
          {texto: 'Calculan: sumas, búsquedas, %', desde: 'calcular', icono: '✓'},
          {texto: 'Se actualizan al escribir', desde: 'apenas', icono: '✓'},
        ]}, der: {titulo: 'Power Query', icono: '🧹', color: 'verde', desde: 'preparar', items: [
          {texto: 'Prepara: limpia, separa, une', desde: 'preparar'},
          {texto: 'Repite la receta cada semana', desde: 'repetir'},
          {texto: 'Miles de filas sin problema', desde: 'miles'},
        ]}},
        {en: 'ideal', capa: true, tipo: 'pildora', texto: '🤝 Lo ideal: usar los dos', abajo: true, tamano: 48},
      ],
    },
    '19': {
      bloques: [
        {en: 0, tipo: 'cuadricula', titulo: '¿Qué más puede hacer?', items: [
          {icono: '📁', texto: 'Juntar 50 archivos de una carpeta', desde: 'juntar'},
          {icono: '🔗', texto: 'Unir dos tablas (Combinar consultas)', desde: 'unir'},
          {icono: '📚', texto: 'Apilar meses (Anexar consultas)', desde: 'apilar'},
          {icono: '🔄', texto: 'Pasar meses de columnas a filas', desde: 'convertir'},
          {icono: '🌐', texto: 'Traer tablas de una web', desde: 'traer'},
          {icono: '📊', texto: 'Lo mismo en Power BI', desde: 'bi'},
        ]},
        {en: 'proximos', capa: true, tipo: 'pildora', texto: '🎬 Muy pronto en esta serie', abajo: true, tamano: 44},
      ],
    },
    '20': {
      bloques: [
        {en: 0, tipo: 'errores', titulo: 'Si no te funcionó', items: [
          {mal: 'No veo "Desde tabla o rango"', bien: 'Excel 2010/2013: era un complemento; actualiza', desde: 'ves'},
          {mal: 'Error: no se encontró la columna', bien: 'Cambiaron un encabezado en el origen', desde: 'error'},
          {mal: 'El monto no suma', bien: 'Cambia el tipo de datos a número', desde: 'suma'},
        ]},
      ],
    },
    '21': {
      bloques: [
        {en: 0, tipo: 'resumen', ideas: [
          {texto: 'Obtener → Transformar → Cargar', desde: 'obtiene'},
          {texto: 'Cada paso queda grabado', desde: 'grabado'},
          {texto: 'Actualizar todo = 1 clic', desde: 'actualizar'},
        ]},
        {en: 'aprendes', tipo: 'titulo', lineas: [{texto: 'SI NO LO APRENDES', color: 'blanco', tamano: 130}, {texto: 'AHORA, TE EXTINGUES', color: 'amarillo', tamano: 150}]},
      ],
    },
    '22': {
      bloques: [
        {en: 0, tipo: 'tienda'},
        {en: 'proximo', tipo: 'cierre', siguiente: 'La varita mágica: IA para combinar datos', suscribir: 'suscribete', web: 'proximo+0.5'},
      ],
    },
  },
  shorts: [
    {id: 'short-1', escena: '17', gancho: [{texto: 'Limpia tu Excel', color: 'blanco', tamano: 100}, {texto: 'CON 1 CLIC', color: 'amarillo', tamano: 150}]},
    {id: 'short-2', escena: '13', gancho: [{texto: 'Quita duplicados', color: 'blanco', tamano: 96}, {texto: 'COMO PRO', color: 'amarillo', tamano: 150}, {texto: '(Power Query)', color: 'blanco', tamano: 80}]},
  ],
  miniatura: {
    lineas: [{texto: '¿QUÉ ES', color: 'blanco', tamano: 110}, {texto: 'POWER QUERY?', color: 'amarillo'}, {texto: 'Limpia en 1 clic', color: 'turquesa', tamano: 84}],
    pildora: 'Excel',
    insignia: 'DESDE CERO',
    filas: [['Vendedor', 'Antes', 'Después'], ['  ana torres', '✗', 'Ana Torres'], ['LUIS GÓMEZ ', '✗', 'Luis Gómez'], ['sara ruiz', '✗', 'Sara Ruiz']],
    resaltarFila: 1,
  },
};
