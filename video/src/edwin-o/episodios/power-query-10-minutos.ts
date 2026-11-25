import type {Cue, EspecEpisodio} from '../../comun/motor-tipos';
import type {Manifest} from '../../comun/tipos';
import manifest from '../../../public/edwin-o/power-query-10-minutos/manifest.json';

/* Resultados verificados con pandas y etiquetas tomadas del Power Query instalado
   (canales/edwin-o/episodios/power-query-10-minutos/ficha.md). El editor es una recreación. */
type Fila = (string | number | null)[];
const ANCHO: Fila[] = [
  ['Norte', 'Ana Torres', 1200, 1350, 1500],
  [null, 'Luis Gómez', 980, 1100, 900],
  ['Sur', 'Sara Ruiz', 450, 700, 820],
  [null, 'Juan Pérez', 1500, 1250, 1600],
  ['Centro', 'Marta Díaz', 300, 2100, 1900],
];
const MESES = ['Ene', 'Feb', 'Mar'];
const RELLENO: Fila[] = ANCHO.map((f, i) => [f[0] ?? ANCHO[i - 1][0], ...f.slice(1)]);
const LARGO: Fila[] = RELLENO.flatMap((f) => MESES.map((m, k) => [f[0], f[1], m, f[2 + k]]));
const DIVIDIDO: Fila[] = LARGO.map(([r, v, m, x]) => [r, ...String(v).split(' '), m, x]);
const COMISION: Fila[] = DIVIDIDO.map((f) => [...f, Number(f[4]) * 0.05]);
const AGRUP: Fila[] = [['Norte', 7030], ['Sur', 6320], ['Centro', 4300]];
const META: Fila[] = [['Norte', 7030, 7000], ['Sur', 6320, 6500], ['Centro', 4300, 4000]];
const CUMPLE: Fila[] = [['Norte', 7030, 7000, '100,4 %'], ['Sur', 6320, 6500, '97,2 %'], ['Centro', 4300, 4000, '107,5 %']];
const CUMPLE2: Fila[] = [['Norte', 7030, 7000, '100,4 %'], ['Sur', 6320, 6500, '97,2 %'], ['Centro', 4800, 4000, '120,0 %']];
const EJEMPLOS: Fila[] = DIVIDIDO.slice(0, 9).map((f) => [f[1], f[2], String(f[2]).toUpperCase()]);
const C_ANCHO = ['Región', 'Vendedor', 'Ene', 'Feb', 'Mar'];

const ENC = {negrita: true, fondo: '#E9F3EC'};
type Celda = {ref: string; valor: string; desde: Cue; [k: string]: unknown};
const fmt = (v: string | number | null) => (v === null ? '' : typeof v === 'number' ? v.toLocaleString('es-CO') : v);
const hojaDe = (cols: string[], filas: Fila[], d: Cue = 0, col0 = 0, extra: (r: number, c: number) => object = () => ({})): Celda[] => [
  ...cols.map((v, i) => ({ref: `${'ABCDEFGH'[col0 + i]}1`, valor: v, desde: d, ...ENC})),
  ...filas.flatMap((f, r) => f.map((v, c) => ({ref: `${'ABCDEFGH'[col0 + c]}${r + 2}`, valor: fmt(v), desde: d, ...(typeof v === 'number' ? {alinear: 'right'} : {}), ...extra(r, c)}))),
];
const BASE = {archivo: 'Ventas trimestre.xlsx', hoja: 'Ventas', columnas: 8, filas: 10, anchos: {A: 140, B: 200, C: 110, D: 110, E: 110, F: 40, G: 140, H: 120},
  pestanas: ['Archivo', 'Inicio', 'Insertar', 'Datos', 'Revisar', 'Vista'], botones: ['Obtener datos', 'Desde tabla o rango', 'Desde la web', 'Actualizar todo']};
const P = ['Origen', 'Tipo cambiado', 'Relleno hacia abajo', 'Columna de atributo anulada', 'Columnas con nombre cambiado', 'Tipo cambiado1', 'Dividir columna por delimitador', 'Personalizada agregada'];
const pasos = (desdes: Cue[]) => desdes.map((desde, i) => ({texto: P[i], desde}));
const TODOS = [0, 0, 0, 0, 0, 0, 0, 0];
const CONSULTAS = ['Ventas', 'Metas', 'Ventas por región'];
const M = `let
    Origen = Excel.CurrentWorkbook(){[Name="Ventas"]}[Content],
    #"Relleno hacia abajo" = Table.FillDown(Origen, {"Región"}),
    #"Columna de atributo anulada" =
        Table.UnpivotOtherColumns(#"Relleno hacia abajo",
            {"Región", "Vendedor"}, "Atributo", "Valor"),
    #"Columnas con nombre cambiado" = Table.RenameColumns(
        #"Columna de atributo anulada", {{"Atributo", "Mes"}, {"Valor", "Monto"}})
in
    #"Columnas con nombre cambiado"`;

export const episodio: EspecEpisodio = {
  canal: 'edwin-o',
  slug: 'power-query-10-minutos',
  id: 'EdwinO-PowerQuery10Min',
  manifest: manifest as Manifest,
  escenas: {
    '01': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: hojaDe(C_ANCHO, ANCHO, 0),
          resaltes: [{rango: 'C1:E1', desde: 'columnas', color: '#E30613'}, {rango: 'A3:A3', desde: 'vacias', color: '#FF9500'}, {rango: 'A5:A5', desde: 'vacias', color: '#FF9500'}]}},
        {en: 'conviertes', tipo: 'hoja', hoja: {...BASE, hoja: 'Cumplimiento', anchos: {A: 160, B: 150, C: 150, D: 200, E: 100, F: 40, G: 100, H: 100},
          celdas: hojaDe(['Región', 'Monto', 'Meta', 'Cumplimiento'], CUMPLE, 'conviertes', 0, (r, c) => (c === 3 ? {fondo: r === 1 ? '#FFC7CE' : '#DFF7E7', negrita: true} : {}))}},
        {en: 'diez#2', capa: true, tipo: 'pildora', texto: '🥋 10 movimientos para toda la vida', abajo: true, tamano: 48},
      ],
    },
    '02': {
      bloques: [
        {en: 0, tipo: 'cortinilla', titulo: 'POWER QUERY'},
        {en: 'serio', tipo: 'titulo', lineas: [{texto: 'DOMINA', color: 'blanco', tamano: 150}, {texto: 'POWER QUERY', color: 'amarillo', tamano: 190}], sub: '10 movimientos en 10 minutos'},
        {en: 'nota', capa: true, tipo: 'pildora', texto: '📝 Toma nota', abajo: true, tamano: 48},
      ],
    },
    '03': {
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '🆕', titulo: 'Nuevo cuadro "Obtener datos"', texto: 'En Excel para Windows desde la versión 2510 (fin de 2025), en versión preliminar.', fuente: 'Microsoft Support', ancho: 1500},
        {en: 'invirtiendo', capa: true, tipo: 'pildora', texto: '📈 Microsoft sigue invirtiendo en Power Query', abajo: true, tamano: 46},
      ],
    },
    '04': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '🏢', titulo: 'Lo que más encuentro en las empresas', texto: 'Un vendedor por fila y un mes por columna: bonito para imprimir, el peor para analizar.', ancho: 1500},
        {en: 'filtrar', capa: true, tipo: 'pildora', texto: '✗ No filtras por mes · ✗ tabla dinámica pobre', abajo: true, tamano: 44},
      ],
    },
    '05': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [...hojaDe(C_ANCHO, ANCHO, 0), ...hojaDe(['Región', 'Meta'], [['Norte', 7000], ['Sur', 6500], ['Centro', 4000]], 'otra', 6)],
          resaltes: [{rango: 'A2:A6', desde: 'region', hasta: 'otra', color: '#FF9500'}, {rango: 'G1:H4', desde: 'otra', color: '#1F6FEB'}],
          globos: [{a: 'A3', texto: 'Vacías', desde: 'vacias', color: '#FF9500', lado: 'derecha'}]}},
        {en: 'objetivo', capa: true, tipo: 'pildora', texto: '🎯 ¿Qué % de la meta cumplió cada región?', abajo: true, tamano: 46},
      ],
    },
    '06': {
      bloques: [
        {en: 0, tipo: 'lista', titulo: '3 reglas de oro', items: [
          {texto: 'Convierte tus datos en Tabla (Ctrl + T)', desde: 'convierte', icono: '1️⃣'},
          {texto: 'Nunca edites a mano el resultado', desde: 'nunca', icono: '2️⃣'},
          {texto: 'Ponle un nombre claro a cada consulta', desde: 'ponle', icono: '3️⃣'},
        ]},
      ],
    },
    '07': {
      paso: {n: 1, prefijo: 'MOV', texto: 'Entra a Power Query'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: hojaDe(C_ANCHO, ANCHO, 0), pestanaActiva: [{nombre: 'Datos', desde: 'pestana'}],
          cursor: [{a: 'B3', desde: 'clic', clic: true}, {a: 'tab:Datos', desde: 'pestana', clic: true}, {a: 'btn:Desde tabla o rango', desde: 'desde', clic: true}]}},
        {en: 'editor', tipo: 'editorpq', consultas: ['Ventas', 'Metas'], estados: [{desde: 0, columnas: C_ANCHO, filas: ANCHO}], pasos: pasos([0, 0]),
          botones: [{pestana: 'Inicio', texto: 'Metas: Cerrar y cargar en… → solo conexión', desde: 'metas'}]},
      ],
    },
    '08': {
      paso: {n: 2, prefijo: 'MOV', texto: 'Rellenar hacia abajo'},
      bloques: [
        {en: 0, tipo: 'editorpq', consultas: ['Ventas', 'Metas'],
          estados: [{desde: 0, columnas: C_ANCHO, filas: ANCHO, resaltarCol: [0]}, {desde: 'copia', columnas: C_ANCHO, filas: RELLENO, resaltarCol: [0]}],
          botones: [{pestana: 'Transformar', texto: 'Rellenar ▸ Abajo', desde: 'transformar'}],
          pasos: pasos([0, 0, 'copia'])},
        {en: 'pesadilla', capa: true, tipo: 'pildora', texto: '😱 A mano, en miles de filas: una pesadilla', tamano: 44},
      ],
    },
    '09': {
      paso: {n: 3, prefijo: 'MOV', texto: 'Anular la dinamización'},
      bloques: [
        {en: 0, tipo: 'editorpq', consultas: ['Ventas', 'Metas'], anchos: [180, 240, 200, 200],
          estados: [{desde: 0, columnas: C_ANCHO, filas: RELLENO, resaltarCol: [0, 1]}, {desde: 'pasa', columnas: ['Región', 'Vendedor', 'Atributo', 'Valor'], filas: LARGO, resaltarCol: [2, 3]}],
          botones: [{pestana: 'Transformar', texto: 'Clic derecho ▸ Anular dinamización de otras columnas', desde: 'clic'}],
          pasos: pasos([0, 0, 0, 'pasa'])},
        {en: 'quince', capa: true, tipo: 'pildora', texto: '5 filas → 15 filas', tamano: 52},
      ],
    },
    '10': {
      paso: {n: 4, prefijo: 'MOV', texto: 'Nombres y tipos'},
      bloques: [
        {en: 0, tipo: 'editorpq', consultas: ['Ventas', 'Metas'], anchos: [180, 240, 200, 200],
          estados: [
            {desde: 0, columnas: ['Región', 'Vendedor', 'Atributo', 'Valor'], filas: LARGO},
            {desde: 'mes', columnas: ['Región', 'Vendedor', 'Mes', 'Valor'], filas: LARGO, resaltarCol: [2]},
            {desde: 'monto', columnas: ['Región', 'Vendedor', 'Mes', 'Monto'], filas: LARGO, resaltarCol: [3]},
            {desde: 'entero', columnas: ['Región', 'Vendedor', 'Mes', '123 Monto'], filas: LARGO, resaltarCol: [3]},
          ],
          botones: [{pestana: 'Inicio', texto: 'Tipo de datos: Número entero', desde: 'entero'}],
          pasos: pasos([0, 0, 0, 0, 'monto', 'entero'])},
      ],
    },
    '11': {
      paso: {n: 5, prefijo: 'MOV', texto: 'Dividir columna'},
      bloques: [
        {en: 0, tipo: 'editorpq', consultas: ['Ventas', 'Metas'], anchos: [160, 170, 170, 140, 160],
          estados: [{desde: 0, columnas: ['Región', 'Vendedor', 'Mes', 'Monto'], filas: LARGO, resaltarCol: [1]},
            {desde: 'ahora', columnas: ['Región', 'Nombre', 'Apellido', 'Mes', 'Monto'], filas: DIVIDIDO, resaltarCol: [1, 2]}],
          botones: [{pestana: 'Inicio', texto: 'Dividir columna ▸ Por delimitador: espacio (solo el primero)', desde: 'dividir'}],
          pasos: pasos([...TODOS.slice(0, 6), 'ahora'])},
      ],
    },
    '12': {
      paso: {n: 6, prefijo: 'MOV', texto: 'Columna personalizada'},
      bloques: [
        {en: 0, tipo: 'editorpq', consultas: ['Ventas', 'Metas'], anchos: [150, 150, 150, 110, 140, 150],
          estados: [{desde: 0, columnas: ['Región', 'Nombre', 'Apellido', 'Mes', 'Monto'], filas: DIVIDIDO},
            {desde: 'comision#2', columnas: ['Región', 'Nombre', 'Apellido', 'Mes', 'Monto', 'Comisión'], filas: COMISION, resaltarCol: [5]}],
          botones: [{pestana: 'Agregar columna', texto: 'Columna personalizada: Comisión = [Monto] * 0.05', desde: 'agregar'}],
          pasos: pasos([...TODOS.slice(0, 7), 'comision#2'])},
        {en: 'punto#2', capa: true, tipo: 'pildora', texto: '⚠️ Aquí el decimal va con PUNTO: 0.05', tamano: 46},
      ],
    },
    '13': {
      paso: {n: 7, prefijo: 'MOV', texto: 'Agrupar por'},
      bloques: [
        {en: 0, tipo: 'editorpq', consulta: 'Ventas por región', consultas: CONSULTAS, anchos: [260, 260],
          estados: [{desde: 0, columnas: ['Región', 'Nombre', 'Apellido', 'Mes', 'Monto', 'Comisión'], filas: COMISION},
            {desde: 'norte', columnas: ['Región', 'Monto'], filas: AGRUP, resaltarCol: [1]}],
          botones: [{pestana: 'Inicio', texto: 'Clic derecho ▸ Referencia', desde: 'referencia', hasta: 'agrupar'}, {pestana: 'Inicio', texto: 'Agrupar por: Región · Suma de Monto', desde: 'agrupar'}],
          pasos: [{texto: 'Origen', desde: 0}, {texto: 'Filas agrupadas', desde: 'norte'}]},
      ],
    },
    '14': {
      paso: {n: 8, prefijo: 'MOV', texto: 'Combinar consultas'},
      bloques: [
        {en: 0, tipo: 'editorpq', consulta: 'Ventas por región', consultas: CONSULTAS, anchos: [260, 220, 220],
          estados: [{desde: 0, columnas: ['Región', 'Monto'], filas: AGRUP}, {desde: 'expandes', columnas: ['Región', 'Monto', 'Meta'], filas: META, resaltarCol: [2]}],
          botones: [{pestana: 'Inicio', texto: 'Combinar consultas: Metas · Región = Región · Externa izquierda', desde: 'inicio'}],
          pasos: [{texto: 'Origen', desde: 0}, {texto: 'Filas agrupadas', desde: 0}, {texto: 'Consultas combinadas', desde: 'aceptas'}, {texto: 'Se expandió Metas', desde: 'expandes'}]},
        {en: 'buscarx', capa: true, tipo: 'pildora', texto: '🔗 El BUSCARX de Power Query', tamano: 48, hasta: 'inicio'},
      ],
    },
    '15': {
      paso: {n: 9, prefijo: 'MOV', texto: '% de cumplimiento'},
      bloques: [
        {en: 0, tipo: 'editorpq', consulta: 'Ventas por región', consultas: CONSULTAS, anchos: [240, 200, 200, 240],
          estados: [{desde: 0, columnas: ['Región', 'Monto', 'Meta'], filas: META}, {desde: 'resultado', columnas: ['Región', 'Monto', 'Meta', 'Cumplimiento'], filas: CUMPLE, resaltarCol: [3]}],
          botones: [{pestana: 'Agregar columna', texto: 'Columna personalizada: Cumplimiento = [Monto] / [Meta] · tipo Porcentaje', desde: 'cumplimiento'}],
          pasos: [{texto: 'Origen', desde: 0}, {texto: 'Filas agrupadas', desde: 0}, {texto: 'Consultas combinadas', desde: 0}, {texto: 'Se expandió Metas', desde: 0}, {texto: 'Personalizada agregada', desde: 'resultado'}]},
        {en: 'sorpresa', capa: true, tipo: 'pildora', texto: '🎉 Centro: 107,5 %', tamano: 52},
      ],
    },
    '16': {
      paso: {n: 10, prefijo: 'MOV', texto: 'Cargar y actualizar'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, hoja: 'Ventas', celdas: [...hojaDe(C_ANCHO, ANCHO, 0, 0, (r, c) => (r === 4 && c === 4 ? {hasta: 'cuatrocientos'} : {})), {ref: 'E6', valor: '2.400', desde: 'cuatrocientos', alinear: 'right', fondo: '#FFF3B0', negrita: true}],
          pestanaActiva: [{nombre: 'Datos', desde: 'datos'}], cursor: [{a: 'E6', desde: 'cambio', clic: true}, {a: 'btn:Actualizar todo', desde: 'actualizar', clic: true}], zoom: [{a: 'E6', desde: 'cambio', escala: 1.5}]}},
        {en: 'centro', tipo: 'hoja', hoja: {...BASE, hoja: 'Cumplimiento', anchos: {A: 160, B: 150, C: 150, D: 200, E: 100, F: 40, G: 100, H: 100},
          celdas: hojaDe(['Región', 'Monto', 'Meta', 'Cumplimiento'], CUMPLE2, 0, 0, (r, c) => (r === 2 && c > 0 ? {fondo: '#FFE500', negrita: true} : {})), zoom: [{a: 'D4', desde: 'ciento', escala: 1.6}]}},
        {en: 'pasos', capa: true, tipo: 'pildora', texto: '🔁 Todos los pasos se repitieron solos', abajo: true, tamano: 46},
      ],
    },
    '17': {
      bloques: [
        {en: 0, tipo: 'editorpq', consultas: CONSULTAS, estados: [{desde: 0, columnas: ['Región', 'Nombre', 'Apellido', 'Mes', 'Monto', 'Comisión'], filas: COMISION}], pasos: pasos(TODOS), anchos: [150, 150, 150, 110, 140, 150]},
        {en: 'trimestre', capa: true, tipo: 'pildora', texto: '📅 Abril, mayo y junio → reemplazas → Actualizar todo', abajo: true, tamano: 42},
      ],
    },
    '18': {
      fondo: 'oscuro',
      bloques: [
        {en: 0, tipo: 'codigo', archivo: 'Vista ▸ Editor avanzado · lenguaje M', codigo: M, velocidad: 120, tamano: 28},
        {en: 'aprenderlo', capa: true, tipo: 'pildora', texto: 'No necesitas aprenderlo para usar Power Query', tamano: 42, hasta: 'barra'},
        {en: 'barra', capa: true, tipo: 'pildora', texto: '💡 Vista ▸ Barra de fórmulas', tamano: 44},
      ],
    },
    '19': {
      paso: {n: '🎁', prefijo: 'BONUS', texto: 'Columna a partir de los ejemplos'},
      bloques: [
        {en: 0, tipo: 'editorpq', consultas: ['Ventas', 'Metas'], anchos: [220, 220, 260],
          estados: [
            {desde: 0, columnas: ['Nombre', 'Apellido', 'Columna1'], filas: EJEMPLOS.map((f) => [f[0], f[1], null])},
            {desde: 'escribes', columnas: ['Nombre', 'Apellido', 'Columna1'], filas: EJEMPLOS.map((f, i) => [f[0], f[1], i === 0 ? f[2] : null]), resaltarCol: [2]},
            {desde: 'completa', columnas: ['Nombre', 'Apellido', 'Apellido en mayúsculas'], filas: EJEMPLOS, resaltarCol: [2]},
          ],
          botones: [{pestana: 'Agregar columna', texto: 'Columna a partir de los ejemplos', desde: 0.3}],
          pasos: [{texto: 'Origen', desde: 0}, {texto: '…', desde: 0}, {texto: 'Texto en mayúsculas insertado', desde: 'completa'}]},
        {en: 'revisa', capa: true, tipo: 'pildora', texto: '👀 Revisa que haya adivinado bien', abajo: true, tamano: 46},
      ],
    },
    '20': {
      bloques: [
        {en: 0, tipo: 'errores', titulo: 'Si no te funcionó', items: [
          {mal: 'Rellenar no hace nada', bien: 'Las celdas tienen espacios, no están vacías', desde: 'rellenar'},
          {mal: 'No aparece la meta', bien: 'Las regiones no coinciden: mayúsculas y espacios', desde: 'combinar'},
          {mal: 'La suma sale rara', bien: 'El monto quedó como texto', desde: 'suma'},
        ]},
      ],
    },
    '21': {
      bloques: [
        {en: 0, tipo: 'cuadricula', titulo: 'Los 10 movimientos', items: [
          {icono: '1️⃣', texto: 'Entrar', desde: 'entrar'},
          {icono: '2️⃣', texto: 'Rellenar', desde: 'rellenar'},
          {icono: '3️⃣', texto: 'Anular dinamización', desde: 'anular'},
          {icono: '4️⃣', texto: 'Nombres y tipos', desde: 'nombres'},
          {icono: '5️⃣', texto: 'Dividir', desde: 'dividir'},
          {icono: '6️⃣', texto: 'Columna personalizada', desde: 'personalizada'},
          {icono: '7️⃣', texto: 'Agrupar', desde: 'agrupar'},
          {icono: '8️⃣', texto: 'Combinar', desde: 'combinar'},
          {icono: '9️⃣', texto: 'Porcentaje', desde: 'porcentaje'},
          {icono: '🔟', texto: 'Cargar y actualizar', desde: 'cargar'},
        ]},
        {en: 'aprendes', tipo: 'titulo', lineas: [{texto: 'SI NO LO APRENDES', color: 'blanco', tamano: 130}, {texto: 'AHORA, TE EXTINGUES', color: 'amarillo', tamano: 150}]},
      ],
    },
    '22': {
      bloques: [
        {en: 0, tipo: 'tienda'},
        {en: 'proximo', tipo: 'cierre', siguiente: 'ChatGPT en Excel: automatiza tus hojas', suscribir: 'suscribete', web: 'proximo+0.5'},
      ],
    },
  },
  shorts: [
    {id: 'short-1', escena: '09', gancho: [{texto: 'Meses en columnas?', color: 'blanco', tamano: 96}, {texto: 'ARRÉGLALO EN 1 CLIC', color: 'amarillo', tamano: 110}]},
    {id: 'short-2', escena: '08', gancho: [{texto: 'Rellena celdas vacías', color: 'blanco', tamano: 96}, {texto: 'CON POWER QUERY', color: 'amarillo', tamano: 120}]},
  ],
  miniatura: {
    lineas: [{texto: 'DOMINA', color: 'blanco', tamano: 110}, {texto: 'POWER QUERY', color: 'amarillo'}, {texto: 'en 10 minutos', color: 'turquesa', tamano: 90}],
    pildora: '10 movimientos',
    insignia: 'PASO A PASO',
    filas: [['Región', 'Monto', 'Cumplimiento'], ['Norte', '7.030', '100,4 %'], ['Sur', '6.320', '97,2 %'], ['Centro', '4.300', '107,5 %']],
    resaltarFila: 3,
  },
};
