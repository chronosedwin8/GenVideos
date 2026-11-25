import type {Cue, EspecEpisodio} from '../../comun/motor-tipos';
import type {Manifest} from '../../comun/tipos';
import manifest from '../../../public/edwin-o/etiquetas-qr-excel/manifest.json';

/* Fórmulas probadas en Excel 365 real (canales/edwin-o/episodios/etiquetas-qr-excel/ficha.md).
   Las imágenes son QR y códigos de barras reales, descargados de los mismos servicios que usan las fórmulas. */
const IMG = 'edwin-o/etiquetas-qr-excel';
const INV = [
  ['INV-001', 'Laptop Dell', 'Bodega A', '12'],
  ['INV-002', 'Monitor 24"', 'Bodega A', '30'],
  ['INV-003', 'Teclado', 'Bodega B', '45'],
  ['INV-004', 'Mouse', 'Bodega B', '60'],
  ['INV-005', 'Silla ergonómica', 'Oficina 2', '8'],
  ['INV-006', 'Impresora', 'Oficina 1', '3'],
];
const n = (i: number) => String(i + 1).padStart(3, '0');
const ENC = {negrita: true, fondo: '#E9F3EC'};
const der = 'right' as const;
type Celda = {ref: string; valor: string; desde: Cue; [k: string]: unknown};

const datos = (d: Cue = 0): Celda[] => [
  ...['Código', 'Producto', 'Ubicación', 'Cantidad', '', 'QR', 'Código de barras'].map((v, i) => ({ref: `${'ABCDEFG'[i]}1`, valor: v, desde: d, ...ENC})),
  ...INV.flatMap((f, i) => f.map((v, j) => ({ref: `${'ABCD'[j]}${i + 2}`, valor: v, desde: d, ...(j === 3 ? {alinear: der} : {})}))),
];
const qrs = (desde: (i: number) => Cue, solo = false): Celda[] =>
  INV.map((_, i) => ({ref: `F${i + 2}`, valor: ' ', desde: desde(i), imagen: `${IMG}/${solo ? 'qr-solo' : 'qr'}-${n(i)}.png`}));
const barras = (desde: (i: number) => Cue): Celda[] => INV.map((_, i) => ({ref: `G${i + 2}`, valor: ' ', desde: desde(i), imagen: `${IMG}/barras-${n(i)}.png`}));
const etiquetas = (desde: (i: number) => Cue) =>
  INV.map(([codigo, producto, ubicacion], i) => ({codigo, producto, ubicacion, qr: `${IMG}/qr-${n(i)}.png`, barras: `${IMG}/barras-${n(i)}.png`, desde: desde(i)}));

const BASE = {archivo: 'Inventario.xlsx', hoja: 'Inventario', columnas: 7, filas: 9, anchos: {A: 150, B: 240, C: 170, D: 140, E: 30, F: 200, G: 300}};
const F_QR1 = '=IMAGEN("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="&A2)';
const F_QR2 = '=IMAGEN("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="&URLCODIF(A2&" | "&B2&" | "&C2))';
const F_BAR = '=IMAGEN("https://bwipjs-api.metafloor.com/?bcid=code128&text="&URLCODIF(A2)&"&includetext")';
const F_GRID = '=AJUSTARFILAS(IMAGEN("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="&URLCODIF(Inventario!A2:A7));3)';
const F_BUSCA = '=BUSCARX(B1;Inventario!A2:A7;Inventario!B2:D7;"No existe")';

export const episodio: EspecEpisodio = {
  canal: 'edwin-o',
  slug: 'etiquetas-qr-excel',
  id: 'EdwinO-EtiquetasQR',
  manifest: manifest as Manifest,
  escenas: {
    '01': {
      bloques: [
        {en: 0, tipo: 'etiquetas', items: etiquetas((i) => 0.2 + i * 0.25)},
        {en: 'escaneas', capa: true, tipo: 'pildora', texto: '📱 INV-005 | Silla ergonómica | Oficina 2', tamano: 48},
        {en: 'programas', capa: true, tipo: 'pildora', texto: '🚫 Sin programas raros · 🚫 sin licencias', abajo: true, tamano: 44},
      ],
    },
    '02': {
      bloques: [
        {en: 0, tipo: 'cortinilla', titulo: 'QR EN EXCEL'},
        {en: 'hoy', tipo: 'titulo', lineas: [{texto: 'QR Y CÓDIGO', color: 'amarillo', tamano: 180}, {texto: 'DE BARRAS', color: 'blanco', tamano: 150}], sub: 'en las celdas de Excel'},
        {en: 'armar', tipo: 'lista', titulo: 'Hoy aprendes a…', items: [
          {texto: 'Crear códigos QR', desde: 'armar', icono: '🔳'},
          {texto: 'Crear códigos de barras', desde: 'armar+0.4', icono: '📊'},
          {texto: 'Imprimir una hoja de etiquetas', desde: 'imprimir', icono: '🖨️'},
          {texto: 'Escanear y buscar un producto', desde: 'lector', icono: '🔎'},
        ]},
      ],
    },
    '03': {
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '🌅', titulo: 'GS1 · Sunrise 2027', texto: 'Las cajas del comercio se preparan para leer códigos 2D (como el QR) a finales de 2027.', fuente: 'GS1', ancho: 1500},
        {en: 'mientras', tipo: 'imagenes', titulo: 'Mientras tanto: ¡los dos!', items: [
          {src: `${IMG}/barras-001.png`, pie: 'Código de barras (1D)', desde: 'mientras', ancho: 520, alto: 260},
          {src: `${IMG}/qr-001.png`, pie: 'Código QR (2D)', desde: 'imprimen', ancho: 300},
        ]},
      ],
    },
    '04': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '📦', titulo: 'Lo que aprendí haciendo software de inventario', texto: 'El mejor programa no sirve si las etiquetas están mal: si nadie las puede leer, el inventario se cae.', ancho: 1500},
        {en: 'claras', capa: true, tipo: 'pildora', texto: '✅ Claras · legibles · hechas en minutos', abajo: true, tamano: 46},
      ],
    },
    '05': {
      bloques: [
        {en: 0, tipo: 'tarjetas', titulo: 'Lo que necesitas', items: [
          {icono: '🟩', titulo: 'Excel 365 o 2024', texto: 'Para la función `IMAGEN`', desde: 'microsoft'},
          {icono: '🌐', titulo: 'Internet', texto: 'El QR lo crea un servicio gratuito', desde: 'conexion'},
        ]},
        {en: 'veintiuno', capa: true, tipo: 'pildora', texto: '¿Excel 2021 o anterior? Al final te doy otra opción 😉', abajo: true, tamano: 44},
      ],
    },
    '06': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: datos(0),
          resaltes: [{rango: 'A2:A7', desde: 'codigo', hasta: 'producto', color: '#1F6FEB'}, {rango: 'F1:F7', desde: 'qr', color: '#E30613'}, {rango: 'G1:G7', desde: 'barras', color: '#1E9E4A'}],
          globos: [{a: 'F1', texto: 'Aquí van los QR', desde: 'qr', color: '#E30613', lado: 'abajo'}]}},
      ],
    },
    '07': {
      paso: {n: 1, texto: 'Tu primer QR'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [...datos(0), {ref: 'F2', valor: ' ', desde: 0, imagen: `${IMG}/qr-solo-001.png`}],
          escritura: [{celda: 'F2', texto: F_QR1, desde: 'escribe', duracion: 8, enter: 'enter'}],
          zoom: [{a: 'F2', desde: 'enter', escala: 1.8}],
          globos: [{a: 'F2', texto: '¡Tu QR dentro de la celda!', desde: 'ahi', color: '#1E9E4A', lado: 'abajo'}]}},
        {en: 'descripcion', capa: true, tipo: 'pildora', texto: '📌 Dirección del servicio en la descripción', abajo: true, tamano: 42},
      ],
    },
    '08': {
      bloques: [
        {en: 0, tipo: 'formula', formula: F_QR1, escribir: false, partes: [
          {texto: 'IMAGEN', nota: 'Trae una imagen de internet a la celda', desde: 'trae'},
          {texto: 'size=150x150', nota: 'Tamaño en píxeles', desde: 'size'},
          {texto: 'data=', nota: 'Lo que guarda el QR', desde: 'despues'},
          {texto: '&A2', nota: 'El código de esta fila', desde: 'ampersand'},
        ]},
      ],
    },
    '09': {
      paso: {n: 2, texto: 'Más información en el QR'},
      bloques: [
        {en: 0, tipo: 'formula', formula: F_QR2, escribir: true, partes: [
          {texto: 'A2&" | "&B2&" | "&C2', nota: 'Código | producto | ubicación', desde: 'uno'},
          {texto: 'URLCODIF', nota: 'Convierte los espacios para la web (%20)', desde: 'urlcodif'},
        ]},
        {en: 'escaneas', tipo: 'imagenes', items: [{src: `${IMG}/qr-001.png`, pie: '📱 INV-001 | Laptop Dell | Bodega A', desde: 'escaneas', ancho: 420}]},
      ],
    },
    '10': {
      paso: {n: 3, texto: 'Rellena todas las filas'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [...datos(0), ...qrs((i) => (i === 0 ? 0 : `arrastra+${(0.4 + i * 0.35).toFixed(2)}`))],
          seleccion: [{celda: 'F2', desde: 0}, {celda: 'F7', desde: 'arrastra'}],
          zoom: [{a: 'F4', desde: 'producto', escala: 1.4}]}},
        {en: 'pequenos', capa: true, tipo: 'pildora', texto: 'Inicio → Formato → Alto de fila: 80', tamano: 50},
        {en: 'ajusta', capa: true, tipo: 'pildora', texto: '✅ La imagen se ajusta sin deformarse', abajo: true, tamano: 44},
      ],
    },
    '11': {
      paso: {n: 4, texto: 'El código de barras'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [...datos(0), ...qrs(() => 0), {ref: 'G2', valor: ' ', desde: 0, imagen: `${IMG}/barras-001.png`}],
          escritura: [{celda: 'G2', texto: F_BAR, desde: 'escribe', duracion: 7, enter: 'bcid'}],
          zoom: [{a: 'G2', desde: 'bcid', escala: 1.7}],
          globos: [
            {a: 'G2', texto: 'code128: el más usado en inventarios', desde: 'ciento', color: '#1F6FEB', lado: 'abajo'},
            {a: 'G2', texto: 'includetext: el número debajo', desde: 'include', color: '#1E9E4A', lado: 'izquierda'},
          ]}},
      ],
    },
    '12': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [...datos(0), ...qrs(() => 0), ...barras((i) => 0.2 + i * 0.25)],
          zoom: [{a: 'F3', desde: 'activo', escala: 1.25}, {a: 'F6', desde: 'manana', escala: 1.25}]}},
        {en: 'actualiza', capa: true, tipo: 'pildora', texto: '🔄 Cambias el dato → el QR se actualiza solo', abajo: true, tamano: 44},
      ],
    },
    '13': {
      paso: {n: 5, texto: 'La hoja de etiquetas'},
      bloques: [
        {en: 0, tipo: 'etiquetas', items: etiquetas((i) => `celda+${(i * 0.3).toFixed(1)}`)},
        {en: 'diseno', capa: true, tipo: 'pildora', texto: 'Diseño de página → Márgenes estrechos → 1 página de ancho', tamano: 44},
        {en: 'adhesivo', capa: true, tipo: 'pildora', texto: '🖨️ Papel adhesivo · ✂️ recorta · pega', abajo: true, tamano: 44},
      ],
    },
    '14': {
      paso: {n: 'PRO', prefijo: 'NIVEL', texto: 'Cuadrícula automática'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {archivo: 'Inventario.xlsx', hoja: 'QR', columnas: 5, filas: 8, anchos: {A: 260, B: 260, C: 260, D: 200, E: 200},
          hojas: ['Inventario', 'QR'], hojaActiva: [{nombre: 'QR', desde: 0}],
          celdas: INV.map((_, i) => ({ref: `${'ABC'[i % 3]}${Math.floor(i / 3) + 1}`, valor: ' ', desde: `acomoda+${(i * 0.2).toFixed(1)}`, imagen: `${IMG}/qr-solo-${n(i)}.png`})),
          escritura: [{celda: 'A1', texto: F_GRID, desde: 'pasas', duracion: 6, enter: 'acomoda'}],
          zoom: [{a: 'B1', desde: 'acomoda', escala: 1.8}]}},
        {en: 'crece', capa: true, tipo: 'pildora', texto: '✨ Agregas códigos → la cuadrícula crece sola', abajo: true, tamano: 44},
      ],
    },
    '15': {
      paso: {n: 'PRO 2', prefijo: 'NIVEL', texto: 'Escanea y busca'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {archivo: 'Inventario.xlsx', hoja: 'Consulta', columnas: 5, filas: 8, anchos: {A: 200, B: 300, C: 220, D: 200, E: 100},
          hojas: ['Inventario', 'Consulta'], hojaActiva: [{nombre: 'Consulta', desde: 0}],
          celdas: [
            {ref: 'A1', valor: 'Código:', desde: 0, negrita: true},
            {ref: 'A3', valor: 'Resultado:', desde: 0, negrita: true},
            {ref: 'B1', valor: 'INV-005', desde: 'escaneo', fondo: '#FFF3B0', negrita: true},
            {ref: 'B3', valor: 'Silla ergonómica', desde: 'trae', fondo: '#DFF7E7'},
            {ref: 'C3', valor: 'Oficina 2', desde: 'trae+0.3', fondo: '#DFF7E7'},
            {ref: 'D3', valor: '8', desde: 'trae+0.6', fondo: '#DFF7E7', alinear: der},
            {ref: 'B5', valor: 'INV-009', desde: 'existe', fondo: '#FFF3B0', negrita: true},
            {ref: 'B6', valor: 'No existe', desde: 'existe#2', fondo: '#FFC7CE', color: '#9C0006'},
          ],
          seleccion: [{celda: 'B1', desde: 'cursor'}],
          zoom: [{a: 'C3', desde: 'trae', escala: 1.4}],
          globos: [{a: 'B1', texto: '🔫 El lector "escribe" el código', desde: 'escaneo', color: '#1F6FEB', lado: 'derecha'}]}},
        {en: 'buscarx', capa: true, tipo: 'pildora', texto: F_BUSCA, abajo: true, tamano: 36},
      ],
    },
    '16': {
      bloques: [
        {en: 0, tipo: 'comparar', titulo: '🔒 Ojo con la privacidad', izq: {titulo: 'Sí', icono: '👍', color: 'verde', items: [
          {texto: 'Códigos de producto', desde: 'codigos', icono: '✓'},
          {texto: 'Nombres de productos', desde: 'nombres', icono: '✓'},
        ]}, der: {titulo: 'No', icono: '🚫', color: 'rojo', desde: 'personales', items: [
          {texto: 'Datos personales', desde: 'personales', icono: '✗'},
          {texto: 'Contraseñas', desde: 'contrasenas', icono: '✗'},
          {texto: 'Información confidencial', desde: 'confidencial', icono: '✗'},
        ]}},
        {en: 'viaja', capa: true, tipo: 'pildora', texto: 'El texto del QR viaja a un servicio externo', tamano: 44},
      ],
    },
    '17': {
      paso: {n: 'B', prefijo: 'PLAN', texto: 'Sin internet: la fuente'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, columnas: 4, anchos: {A: 180, B: 560, C: 300, D: 200}, celdas: [
          {ref: 'A1', valor: 'Código', desde: 0, ...ENC}, {ref: 'B1', valor: 'Código de barras', desde: 0, ...ENC},
          ...INV.slice(0, 4).map(([c], i) => ({ref: `A${i + 2}`, valor: c, desde: 0})),
          ...INV.slice(0, 4).flatMap(([c], i) => [
            {ref: `B${i + 2}`, valor: `*${c}*`, desde: 'asteriscos', hasta: 'cambias'},
            {ref: `B${i + 2}`, valor: `*${c}*`, desde: 'cambias', fuente: 'Libre Barcode 39', tamano: 46, alinear: 'center'},
          ]),
        ], escritura: [{celda: 'B2', texto: '="*"&A2&"*"', desde: 'escribe', duracion: 4, enter: 'asteriscos'}],
          zoom: [{a: 'B3', desde: 'cambias', escala: 1.5}]}},
        {en: 'descarga', capa: true, tipo: 'pildora', texto: '⬇️ Fuente gratis: Libre Barcode 39 (Google Fonts)', tamano: 44},
        {en: 'cualquier', capa: true, tipo: 'pildora', texto: '✅ Funciona en cualquier Excel', abajo: true, tamano: 46},
      ],
    },
    '18': {
      bloques: [
        {en: 0, tipo: 'errores', titulo: 'Si no te funcionó', items: [
          {mal: '#¿NOMBRE?', bien: 'Tu Excel no tiene IMAGEN: usa la fuente', desde: 'nombre'},
          {mal: '#¡CONECTAR!', bien: 'Problema de internet', desde: 'conectar'},
          {mal: '#¡BLOQUEADO!', bien: 'Activa las imágenes vinculadas (Centro de confianza)', desde: 'bloqueado'},
          {mal: 'La imagen no carga', bien: 'Usa https: Excel bloquea las direcciones que redirigen', desde: 'recuerda'},
        ]},
      ],
    },
    '19': {
      bloques: [
        {en: 0, tipo: 'resumen', ideas: [
          {texto: '`IMAGEN` + servicio de QR', desde: 'imagen'},
          {texto: '`URLCODIF` si hay espacios', desde: 'urlcodif'},
          {texto: 'Lector USB + `BUSCARX`', desde: 'lector'},
        ]},
        {en: 'aprendes', tipo: 'titulo', lineas: [{texto: 'SI NO LO APRENDES', color: 'blanco', tamano: 130}, {texto: 'AHORA, TE EXTINGUES', color: 'amarillo', tamano: 150}]},
      ],
    },
    '20': {
      bloques: [
        {en: 0, tipo: 'tienda', texto: 'Escanéame: plantillas de Excel listas'},
        {en: 'proximo', tipo: 'cierre', siguiente: '¿Qué es Power Query y para qué sirve?', suscribir: 'suscribete', web: 'proximo+0.5'},
      ],
    },
  },
  shorts: [
    {id: 'short-1', escena: '07', gancho: [{texto: 'Un código QR', color: 'blanco', tamano: 100}, {texto: 'DENTRO DE EXCEL', color: 'amarillo', tamano: 120}]},
    {id: 'short-2', escena: '15', gancho: [{texto: 'Escanea y Excel', color: 'blanco', tamano: 100}, {texto: 'TE DICE TODO', color: 'amarillo', tamano: 130}]},
  ],
  miniatura: {
    lineas: [{texto: 'QR Y CÓDIGO', color: 'amarillo'}, {texto: 'DE BARRAS', color: 'blanco'}, {texto: 'en Excel', color: 'turquesa', tamano: 90}],
    pildora: 'Etiquetas de inventario',
    insignia: 'GRATIS',
    formula: '=IMAGEN("…qr…"&A2)',
    filas: [['Código', 'Producto', 'QR'], ['INV-001', 'Laptop Dell', '🔳'], ['INV-002', 'Monitor 24"', '🔳'], ['INV-003', 'Teclado', '🔳']],
    resaltarFila: 1,
  },
};
