import type {Cue, EspecEpisodio} from '../../comun/motor-tipos';
import type {Manifest} from '../../comun/tipos';
import manifest from '../../../public/edwin-o/funciones-que-ahorran-horas/manifest.json';

/* Datos verificados en canales/edwin-o/episodios/funciones-que-ahorran-horas/ficha.md */
type Fila = [string, string, string, string];
const VENTAS: Fila[] = [
  ['Ana', 'Norte', 'Laptop', '1.200'],
  ['Luis', 'Sur', 'Mouse', '35'],
  ['Marta', 'Norte', 'Monitor', '310'],
  ['Pedro', 'Centro', 'Laptop', '1.150'],
  ['Ana', 'Sur', 'Teclado', '60'],
  ['Sofía', 'Centro', 'Monitor', '295'],
  ['Luis', 'Norte', 'Laptop', '1.250'],
  ['Marta', 'Sur', 'Mouse', '40'],
];
const NORTE: Fila[] = [VENTAS[0], VENTAS[2], VENTAS[6]];
const ORDENADAS: Fila[] = [VENTAS[6], VENTAS[0], VENTAS[3], VENTAS[2], VENTAS[5], VENTAS[4], VENTAS[7], VENTAS[1]];
const ENC = {negrita: true, fondo: '#E9F3EC'};
const VERDE = {fondo: '#DFF7E7', color: '#0F5A32', negrita: true};
const AMARILLO = {fondo: '#FFF3B0', negrita: true};
const der = 'right' as const;

const BASE = {archivo: 'Ventas.xlsx', hoja: 'Ventas', columnas: 9, anchos: {A: 150, B: 130, C: 150, D: 120, E: 40, F: 150, G: 130, H: 150, I: 120}};

const enc = (d: Cue = 0, cols = 'ABCD') => ['Vendedor', 'Región', 'Producto', 'Monto'].map((v, i) => ({ref: `${cols[i]}1`, valor: v, desde: d, ...ENC}));
/** Escribe filas en un bloque de columnas (A-D o F-I) desde la fila `fila0`. */
const filas = (datos: Fila[], cols: string, fila0: number, d: (i: number) => Cue, extra: (i: number) => object = () => ({})) =>
  datos.flatMap((f, i) => f.map((v, j) => ({ref: `${cols[j]}${fila0 + i}`, valor: v, desde: d(i), ...(j === 3 ? {alinear: der} : {}), ...extra(i)})));
const tabla = (d: Cue = 0) => [...enc(d), ...filas(VENTAS, 'ABCD', 2, () => d)];

const PRECIOS: [string, string, string][] = [
  ['P-101', 'Laptop', '1.200'],
  ['P-102', 'Mouse', '35'],
  ['P-103', 'Monitor', '310'],
  ['P-104', 'Teclado', '60'],
  ['P-105', 'Audífonos', '85'],
];
const hojaPrecios = (d: Cue = 0) => [
  ...['Código', 'Producto', 'Precio'].map((v, i) => ({ref: `${'ABC'[i]}1`, valor: v, desde: d, ...ENC})),
  ...PRECIOS.flatMap((f, i) => f.map((v, j) => ({ref: `${'ABC'[j]}${i + 2}`, valor: v, desde: d, ...(j === 2 ? {alinear: der} : {})}))),
  {ref: 'F1', valor: 'Código', desde: d, ...ENC},
  {ref: 'G1', valor: 'Precio', desde: d, ...ENC},
];
const BASE_PRECIOS = {archivo: 'Precios.xlsx', hoja: 'Precios', columnas: 7, anchos: {A: 160, B: 200, C: 150, D: 60, E: 60, F: 170, G: 200}};

export const episodio: EspecEpisodio = {
  canal: 'edwin-o',
  slug: 'funciones-que-ahorran-horas',
  id: 'EdwinO-FuncionesAhorranHoras',
  manifest: manifest as Manifest,
  escenas: {
    '01': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [...tabla(), ...enc('trae', 'FGHI'), ...filas(NORTE, 'FGHI', 2, (i) => `trae+${0.15 + i * 0.15}`, () => VERDE)],
          escritura: [{celda: 'F2', texto: '=FILTRAR(A2:D9;B2:B9="Norte";"Sin datos")', desde: 'mira', duracion: 1.6, enter: 'trae'}],
          resaltes: [{rango: 'B2:B9', desde: 'norte', color: '#3DD6C8'}],
          zoom: [{a: 'G3', desde: 'trae', escala: 1.3}],
          globos: [{a: 'I4', texto: 'Se actualiza solo ✨', desde: 'actualiza', lado: 'abajo'}]}},
      ],
    },
    '02': {
      bloques: [
        {en: 0, tipo: 'cortinilla', titulo: 'Funciones de Excel'},
        {en: 'hoy', tipo: 'titulo', lineas: [{texto: '7 FUNCIONES', color: 'amarillo', tamano: 220}, {texto: 'que te ahorran horas', color: 'blanco', tamano: 120}], sub: 'Cada semana'},
        {en: 'quedate', tipo: 'tarjeta', icono: '⭐', titulo: 'No te pierdas la número 7', texto: 'Hace que tus fórmulas largas por fin se entiendan.', color: 'magenta'},
      ],
    },
    '03': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'cifra', valor: '40 años', texto: 'Excel los cumplió el 30 de septiembre de 2025', fuente: 'Microsoft 365 Insider Blog'},
        {en: 'ultimos', tipo: 'cronologia', items: [
          {fecha: '1985', texto: 'Excel 1.0, para Mac', desde: 'ultimos', icono: '🍎'},
          {fecha: '2022', texto: 'Llegan 14 funciones de texto y matrices', desde: 'agrego', icono: '⚡', color: 'turquesa'},
          {fecha: '2025', texto: 'Excel cumple 40 años', desde: 'agrego+1.5', icono: '🎂', color: 'magenta'},
        ]},
        {en: 'problema', tipo: 'lista', titulo: 'Pero seguimos como en 2010', items: [
          {texto: 'BUSCARV para todo', desde: 'buscarv', icono: '❌'},
          {texto: 'Filtros a mano cada semana', desde: 'filtros', icono: '❌'},
          {texto: 'Fórmulas de tres renglones', desde: 'formulas', icono: '❌'},
        ]},
        {en: 'cambia', tipo: 'titulo', lineas: [{texto: 'HOY', color: 'blanco', tamano: 160}, {texto: 'ESO CAMBIA', color: 'amarillo', tamano: 220}]},
      ],
    },
    '04': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [...tabla(), {ref: 'F1', valor: 'Vendedores', desde: 0, ...ENC}, ...['Ana', 'Luis', 'Marta', 'Pedro', 'Sofía'].map((v, i) => ({ref: `F${i + 2}`, valor: v, desde: `desborda+${i * 0.18}`, ...VERDE}))],
          escritura: [{celda: 'F2', texto: '=UNICOS(A2:A9)', desde: 0.3, duracion: 1, enter: 'desborda'}],
          resaltes: [{rango: 'F2:F6', desde: 'desborda+1', color: '#1A3BAF'}],
          globos: [{a: 'F2', texto: 'Una fórmula…', desde: 'sola'}, {a: 'F6', texto: '…varios resultados', desde: 'ocupando', lado: 'abajo'}]}},
        {en: 'error', tipo: 'tarjeta', icono: '🚧', titulo: '#¡DESBORDAMIENTO!', texto: 'Hay algo estorbando en las celdas del resultado: bórralo y listo.', color: 'rojo'},
        {en: 'necesitas', tipo: 'titulo', lineas: [{texto: 'Necesitas', color: 'blanco', tamano: 110}, {texto: 'EXCEL 2021 O 2024', color: 'amarillo', tamano: 170}, {texto: 'o Microsoft 365', color: 'turquesa', tamano: 120}]},
      ],
    },
    '05': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '🏫', titulo: 'En mis talleres', texto: '“¿Y por qué nadie me enseñó esto antes?”', color: 'magenta'},
        {en: 'sorprende', tipo: 'titulo', lineas: [{texto: 'La que más sorprende:', color: 'blanco', tamano: 110}, {texto: 'FILTRAR', color: 'amarillo', tamano: 260}]},
      ],
    },
    '06': {
      bloques: [
        {en: 0, tipo: 'numero', n: 1, total: 7, texto: 'BUSCARX'},
        {en: 'dices', tipo: 'hoja', hoja: {...BASE_PRECIOS, celdas: [
          ...hojaPrecios(), {ref: 'F2', valor: 'P-103', desde: 0}, {ref: 'G2', valor: '310', desde: 'devuelve', alinear: der, ...VERDE},
          {ref: 'F3', valor: 'P-999', desde: 'feo-0.5'}, {ref: 'G3', valor: 'No existe', desde: 'feo+0.6', ...AMARILLO},
        ], escritura: [{celda: 'G2', texto: '=BUSCARX(F2;A2:A6;C2:C6;"No existe")', desde: 'igual', duracion: 2.2, enter: 'devuelve'}],
        resaltes: [{rango: 'A2:A6', desde: 'codigos', hasta: 'devuelve', color: '#3DD6C8'}, {rango: 'C2:C6', desde: 'precios', hasta: 'devuelve', color: '#E5197F'}],
        zoom: [{a: 'G2', desde: 'devuelve', escala: 1.5}, {a: 'G3', desde: 'feo', escala: 1.5}, {a: 'D3', desde: 'izquierda', escala: 1}],
        globos: [{a: 'G3', texto: 'Sin errores feos 😎', desde: 'feo+0.8'}]}},
        {en: 'izquierda', capa: true, tipo: 'pildora', texto: '⬅️ ¡También busca a la izquierda!', abajo: true, tamano: 54},
      ],
    },
    '07': {
      bloques: [
        {en: 0, tipo: 'numero', n: 2, total: 7, texto: 'FILTRAR'},
        {en: 'primero', tipo: 'hoja', hoja: {...BASE, celdas: [
          ...enc(), ...filas(VENTAS, 'ABCD', 2, () => 0).filter((c) => c.ref !== 'B4'),
          {ref: 'B4', valor: 'Norte', desde: 0, hasta: 'cambia+0.3'},
          {ref: 'B4', valor: 'Sur', desde: 'cambia+0.3', ...AMARILLO},
          ...enc('aparecen', 'FGHI'),
          ...filas([NORTE[0]], 'FGHI', 2, () => 'aparecen', () => VERDE),
          ...filas(NORTE.slice(1), 'FGHI', 3, (i) => `aparecen+${0.15 + i * 0.15}`, () => ({...VERDE, hasta: 'instante'})),
          ...filas([NORTE[2]], 'FGHI', 3, () => 'instante', () => VERDE),
        ], escritura: [{celda: 'F2', texto: '=FILTRAR(A2:D9;B2:B9="Norte";"Sin datos")', desde: 'filtrar#2', duracion: 2.4, enter: 'aparecen'}],
        resaltes: [{rango: 'B2:B9', desde: 'region', hasta: 'aparecen', color: '#3DD6C8'}, {rango: 'B4', desde: 'cambia', color: '#E5197F'}],
        globos: [{a: 'I3', texto: '¡Se actualizó solo!', desde: 'instante', lado: 'abajo'}]}},
        {en: 'acabo', tipo: 'titulo', lineas: [{texto: 'Se acabó el', color: 'blanco', tamano: 120}, {texto: 'COPIAR Y PEGAR', color: 'amarillo', tamano: 200}]},
      ],
    },
    '08': {
      bloques: [
        {en: 0, tipo: 'numero', n: 3, total: 7, texto: 'UNICOS'},
        {en: 'necesitas', tipo: 'hoja', hoja: {...BASE, celdas: [
          ...enc(), ...filas(VENTAS, 'ABCD', 2, () => 0).filter((c) => c.ref !== 'A9'),
          {ref: 'A9', valor: 'Marta', desde: 0, hasta: 'nuevo+0.3'},
          {ref: 'A9', valor: 'Andrés', desde: 'nuevo+0.3', ...AMARILLO},
          {ref: 'F1', valor: 'Vendedores', desde: 0, ...ENC},
          ...['Ana', 'Luis', 'Marta', 'Pedro', 'Sofía'].map((v, i) => ({ref: `F${i + 2}`, valor: v, desde: `listo+${i * 0.15}`, ...VERDE})),
          {ref: 'F7', valor: 'Andrés', desde: 'aparece', ...AMARILLO},
        ], escritura: [{celda: 'F2', texto: '=UNICOS(A2:A9)', desde: 'igual', duracion: 1.2, enter: 'listo'}],
        globos: [{a: 'F7', texto: '¡Apareció solo!', desde: 'aparece'}, {a: 'F2', texto: 'Ideal para listas desplegables', desde: 'perfecta'}]}},
      ],
    },
    '09': {
      bloques: [
        {en: 0, tipo: 'numero', n: 4, total: 7, texto: 'ORDENARPOR'},
        {en: 'ordena', tipo: 'hoja', hoja: {...BASE, celdas: [
          ...tabla(), ...enc('mayor+0.5', 'FGHI'),
          ...filas(ORDENADAS.slice(0, 3), 'FGHI', 2, (i) => `mayor+${0.6 + i * 0.1}`, () => VERDE),
          ...filas(ORDENADAS.slice(3), 'FGHI', 5, (i) => `mayor+${0.9 + i * 0.1}`, () => ({hasta: 'obtienes'})),
        ], escritura: [
          {celda: 'F2', texto: '=ORDENARPOR(A2:D9;D2:D9;-1)', desde: 'ordenarpor#2', duracion: 1.8, enter: 'mayor+0.5'},
          {celda: 'F2', texto: '=TOMAR(ORDENARPOR(A2:D9;D2:D9;-1);3)', desde: 'envuelvela', duracion: 1.4, enter: 'obtienes'},
        ],
        resaltes: [{rango: 'D2:D9', desde: 'montos', hasta: 'mayor', color: '#E5197F'}],
        globos: [{a: 'I2', texto: '🥇', desde: 'luis'}, {a: 'I3', texto: '🥈', desde: 'ana'}, {a: 'I4', texto: '🥉', desde: 'pedro'}]}},
        {en: 'ranking', tipo: 'titulo', lineas: [{texto: 'Ranking automático', color: 'blanco', tamano: 120}, {texto: 'EN UNA LÍNEA', color: 'amarillo', tamano: 210}]},
      ],
    },
    '10': {
      bloques: [
        {en: 0, tipo: 'numero', n: 5, total: 7, texto: 'DIVIDIRTEXTO'},
        {en: 'llegan', tipo: 'hoja', hoja: {archivo: 'Pedidos.xlsx', hoja: 'Códigos', columnas: 5, anchos: {A: 300, B: 150, C: 150, D: 170, E: 100},
          celdas: [
            ...['Código', 'Año', 'País', 'Número'].map((v, i) => ({ref: `${'ABCD'[i]}1`, valor: v, desde: 0, ...ENC})),
            ...['2026-COL-0457', '2026-MEX-1290', '2025-PER-0033'].map((v, i) => ({ref: `A${i + 2}`, valor: v, desde: 0})),
            ...[['2026', 'COL', '0457'], ['2026', 'MEX', '1290'], ['2025', 'PER', '0033']].flatMap((f, i) => f.map((v, j) => ({ref: `${'BCD'[j]}${i + 2}`, valor: v, desde: i === 0 ? `reparte+${j * 0.2}` : `reparte+${0.8 + i * 0.2}`, ...VERDE}))),
          ],
          escritura: [{celda: 'B2', texto: '=DIVIDIRTEXTO(A2;"-")', desde: 'igual', duracion: 1.6, enter: 'reparte'}],
          resaltes: [{rango: 'A2', desde: 'guion', hasta: 'reparte', color: '#E5197F'}],
          globos: [{a: 'D2', texto: 'Año · País · Número', desde: 'ano'}]}},
        {en: 'antes', tipo: 'comparar', izq: {titulo: 'Texto en columnas', icono: '🐢', items: [{texto: 'Hay que repetirlo cada vez', desde: 'repetirlo'}]}, der: {titulo: 'DIVIDIRTEXTO', icono: '⚡', desde: 'ahora', items: [{texto: 'Una fórmula que se actualiza sola', desde: 'actualiza'}]}},
      ],
    },
    '11': {
      bloques: [
        {en: 0, tipo: 'numero', n: 6, total: 7, texto: 'APILARV'},
        {en: 'tienes', tipo: 'hoja', hoja: {...BASE, archivo: 'Ventas 2026.xlsx', columnas: 5, anchos: {A: 220, B: 180, C: 200, D: 160, E: 100},
          hojas: ['Enero', 'Febrero', 'Resumen'],
          hojaActiva: [{nombre: 'Enero', desde: 0}, {nombre: 'Febrero', desde: 'junto'}, {nombre: 'Resumen', desde: 'apilarv#2'}],
          celdas: [
            ...enc(0),
            ...filas(VENTAS.slice(0, 3), 'ABCD', 2, () => 0, () => ({hasta: 'junto'})),
            ...filas(VENTAS.slice(3, 6), 'ABCD', 2, () => 'junto', () => ({hasta: 'apilarv#2'})),
            ...filas(VENTAS.slice(0, 3), 'ABCD', 2, (i) => `pone+${i * 0.12}`, () => AMARILLO),
            ...filas(VENTAS.slice(3, 6), 'ABCD', 5, (i) => `pone+${0.5 + i * 0.12}`, () => VERDE),
          ],
          escritura: [{celda: 'A2', texto: '=APILARV(Enero!A2:D4;Febrero!A2:D4)', desde: 'apilarv#2+0.3', duracion: 2.6, enter: 'pone'}],
          globos: [{a: 'D3', texto: 'Enero', desde: 'debajo', color: '#B38F00'}, {a: 'D6', texto: 'Febrero', desde: 'debajo+0.4', color: '#1E9E4A'}]}},
        {en: 'combinada', tipo: 'titulo', lineas: [{texto: 'Reporte anual', color: 'blanco', tamano: 130}, {texto: 'EN MINUTOS', color: 'amarillo', tamano: 220}]},
      ],
    },
    '12': {
      bloques: [
        {en: 0, tipo: 'numero', n: 7, total: 7, texto: 'LET'},
        {en: 'mira', tipo: 'formula', titulo: 'Sin LET: BUSCARX dos veces', formula: '=BUSCARX(F2;A2:A6;C2:C6)*SI(BUSCARX(F2;A2:A6;C2:C6)>1000;90%;1)', escribir: true, partes: [
          {texto: 'BUSCARX(F2;A2:A6;C2:C6)', nota: 'Busca el precio…', desde: 'busco'},
          {texto: 'BUSCARX(F2;A2:A6;C2:C6)', nota: '…y lo vuelve a buscar', desde: 'dos', ocurrencia: 2},
        ]},
        {en: 'calculo', tipo: 'formula', titulo: 'Con LET: una sola vez', formula: '=LET(precio;BUSCARX(F2;A2:A6;C2:C6);SI(precio>1000;precio*90%;precio))', partes: [
          {texto: 'BUSCARX(F2;A2:A6;C2:C6)', nota: 'Se calcula una vez', desde: 'calculo+0.4'},
          {texto: 'precio', nota: 'Su nombre', desde: 'llamo'},
          {texto: 'SI(precio>1000;precio*90%;precio)', nota: 'Y lo usas donde quieras', desde: 'uso'},
        ]},
        {en: 'resultado', tipo: 'cifra', valor: '1.080', texto: 'Laptop de 1.200 con 10 % de descuento'},
        {en: 'dentro', tipo: 'titulo', lineas: [{texto: 'Lo cambias', color: 'blanco', tamano: 130}, {texto: 'EN UN SOLO LUGAR', color: 'amarillo', tamano: 180}]},
      ],
    },
    '13': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'formula', titulo: 'Bonus: combínalas', formula: '=ORDENAR(UNICOS(FILTRAR(A2:A9;B2:B9="Norte")))', partes: [
          {texto: 'FILTRAR(A2:A9;B2:B9="Norte")', nota: '1. Vendedores del Norte', desde: 'filtrar'},
          {texto: 'UNICOS(', nota: '2. Sin repetidos', desde: 'unicos'},
          {texto: 'ORDENAR(', nota: '3. En orden alfabético', desde: 'ordenar'},
        ]},
        {en: 'limpia', tipo: 'lista', titulo: 'Resultado', items: [
          {texto: 'Ana', desde: 'ana', icono: '👤'},
          {texto: 'Luis', desde: 'luis', icono: '👤'},
          {texto: 'Marta', desde: 'marta', icono: '👤'},
        ]},
        {en: 'lego', tipo: 'titulo', lineas: [{texto: 'Como piezas', color: 'blanco', tamano: 130}, {texto: 'DE LEGO 🧱', color: 'amarillo', tamano: 220}], texto: 'Cada función hace una cosa. Juntas, un reporte completo.'},
      ],
    },
    '14': {
      bloques: [
        {en: 0, tipo: 'errores', titulo: 'Si no te funciona…', items: [
          {mal: '#¿NOMBRE?', bien: 'Tu versión no tiene esa función', desde: 'nombre'},
          {mal: '#¡DESBORDAMIENTO!', bien: 'Libera las celdas del resultado', desde: 'desbordamiento'},
          {mal: '#¡CALC!', bien: 'FILTRAR no encontró nada: usa “sin datos”', desde: 'calc'},
        ]},
      ],
    },
    '15': {
      paso: {n: 'TRUCO', prefijo: '💡', texto: 'Conviértelo en Tabla'},
      bloques: [
        {en: 0, tipo: 'titulo', lineas: [{texto: 'Un truco que', color: 'blanco', tamano: 120}, {texto: 'LO MULTIPLICA TODO', color: 'amarillo', tamano: 170}]},
        {en: 'control', tipo: 'teclas', teclas: ['Ctrl', 'T'], texto: 'Convierte tus datos en Tabla'},
        {en: 'nombre', tipo: 'hoja', hoja: {...BASE, celdas: [
          ...['Vendedor', 'Región', 'Producto', 'Monto'].map((v, i) => ({ref: `${'ABCD'[i]}1`, valor: v, desde: 0, negrita: true, fondo: '#1A3BAF', color: 'white'})),
          ...filas(VENTAS, 'ABCD', 2, () => 0, (i) => (i % 2 ? {fondo: '#DDE6FF'} : {})),
          ...filas([['Andrés', 'Norte', 'Laptop', '1.300']], 'ABCD', 10, () => 'agregas', () => AMARILLO),
          ...enc('ventaja', 'FGHI'),
          ...filas(NORTE, 'FGHI', 2, (i) => `ventaja+${i * 0.12}`, () => VERDE),
          ...filas([['Andrés', 'Norte', 'Laptop', '1.300']], 'FGHI', 5, () => 'crece', () => AMARILLO),
        ], escritura: [{celda: 'F2', texto: '=FILTRAR(Ventas;Ventas[Región]="Norte";"Sin datos")', desde: 'filtrar', duracion: 2, enter: 'ventaja'}],
        globos: [{a: 'D10', texto: 'Fila nueva', desde: 'agregas'}, {a: 'I5', texto: '¡Incluida sola!', desde: 'automaticamente', lado: 'abajo'}]}},
        {en: 'nunca', tipo: 'titulo', lineas: [{texto: 'Nunca más cambies', color: 'blanco', tamano: 110}, {texto: 'A2:D9 → A2:D10', color: 'amarillo', tamano: 170}]},
      ],
    },
    '16': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'titulo', lineas: [{texto: '¿Tienes Excel', color: 'blanco', tamano: 130}, {texto: '2016 O 2019?', color: 'amarillo', tamano: 220}]},
        {en: 'caminos', tipo: 'tarjetas', items: [
          {icono: '🌐', titulo: 'Excel para la web', texto: 'Gratis con una cuenta Microsoft. Ya trae estas funciones.', desde: 'web'},
          {icono: '💼', titulo: 'Muéstraselo a tu jefe', texto: 'Las horas que ahorra el equipo pagan la actualización.', desde: 'segundo', color: 'verde'},
        ]},
      ],
    },
    '17': {
      bloques: [
        {en: 0, tipo: 'comparar', izq: {titulo: 'Antes', icono: '🐢', items: [
          {texto: 'Lo haces a mano cada semana', desde: 'semana'},
          {texto: 'Copiar, pegar y ordenar', desde: 'copiando'},
        ]}, der: {titulo: 'Ahora', icono: '🚀', desde: 'formula', items: [
          {texto: 'Una fórmula que trabaja por ti', desde: 'formula'},
          {texto: 'Se actualiza sola', desde: 'formula+1.2'},
        ]}},
        {en: 'mundo', tipo: 'titulo', lineas: [{texto: 'Si no lo aprendes ahora,', color: 'blanco', tamano: 110}, {texto: 'TE EXTINGUES', color: 'rojo', tamano: 210}]},
      ],
    },
    '18': {
      bloques: [
        {en: 0, tipo: 'cuadricula', titulo: 'Las 7 funciones', items: [
          {icono: '🔎', texto: 'BUSCARX', desde: 'buscarx'},
          {icono: '🧹', texto: 'FILTRAR', desde: 'filtrar'},
          {icono: '✨', texto: 'UNICOS', desde: 'unicos'},
          {icono: '🏆', texto: 'ORDENARPOR', desde: 'ordenarpor'},
          {icono: '✂️', texto: 'DIVIDIRTEXTO', desde: 'dividirtexto'},
          {icono: '📚', texto: 'APILARV', desde: 'apilarv'},
          {icono: '🏷️', texto: 'LET', desde: 'let'},
        ]},
        {en: 'comentarios', tipo: 'titulo', lineas: [{texto: 'Dime en los comentarios', color: 'blanco', tamano: 110}, {texto: '¿CUÁL USARÁS PRIMERO?', color: 'amarillo', tamano: 160}]},
        {en: 'proximo', tipo: 'cierre', siguiente: 'Automatiza Excel con Python', suscribir: 'suscribete'},
      ],
    },
  },
  shorts: [
    {id: 'short-1', escena: '07', desde: 'primero', gancho: [{texto: 'Deja de', color: 'blanco', tamano: 100}, {texto: 'COPIAR Y PEGAR', color: 'amarillo', tamano: 130}, {texto: 'en Excel', color: 'blanco', tamano: 100}]},
    {id: 'short-2', escena: '09', desde: 'ordena', gancho: [{texto: 'Tu TOP 3', color: 'amarillo', tamano: 150}, {texto: 'automático en Excel', color: 'blanco', tamano: 90}]},
  ],
  miniatura: {
    lineas: [{texto: '7 FUNCIONES', color: 'amarillo'}, {texto: 'que te ahorran', color: 'blanco', tamano: 84}, {texto: 'HORAS', color: 'turquesa'}],
    pildora: 'en Excel',
    insignia: 'Nº 7 🤯',
    formula: '=FILTRAR(A2:D9;B2:B9="Norte")',
    filas: [['Vendedor', 'Región', 'Monto'], ['Ana', 'Norte', '1.200'], ['Luis', 'Norte', '1.250']],
    resaltarFila: 1,
  },
};
