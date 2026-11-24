import type {EspecEpisodio} from '../../comun/motor-tipos';
import type {Manifest} from '../../comun/tipos';
import manifest from '../../../public/edwin-o/python-automatizar-excel/manifest.json';

/* Código y salidas reales: canales/edwin-o/episodios/python-automatizar-excel/codigo (ejecutado el 24 nov 2026) */
const P3 = `import pandas as pd
from pathlib import Path

ventas = pd.read_excel("ventas.xlsx")
`;
const P4 = `carpeta = Path("reportes")
carpeta.mkdir(exist_ok=True)
`;
const P5 = `
for sucursal, datos in ventas.groupby("Sucursal"):
`;
const P6 = `    archivo = carpeta / f"Reporte {sucursal}.xlsx"
    resumen = datos.groupby("Vendedor")["Monto"].sum()
`;
const P7 = `    with pd.ExcelWriter(archivo) as excel:
        datos.to_excel(excel, sheet_name="Ventas", index=False)
        resumen.to_excel(excel, sheet_name="Resumen")
`;
const P8 = `    print(f"Listo: {archivo.name} ({len(datos)} ventas)")`;
const COMPLETO = P3 + P4 + P5 + P6 + P7 + P8;
const POR_VENDEDOR = COMPLETO.replace('ventas.groupby("Sucursal")', 'ventas.groupby("Vendedor")').replace('for sucursal, datos', 'for vendedor, datos').replace('{sucursal}', '{vendedor}');

const SALIDA: [string, number][] = [
  ['Arequipa', 173], ['Barranquilla', 226], ['Bogotá', 193], ['CDMX', 220], ['Cali', 192], ['Guadalajara', 200],
  ['Lima', 183], ['Medellín', 226], ['Monterrey', 197], ['Puebla', 199], ['Quito', 197], ['Santiago', 194],
];
const lineasSalida = (inicio: string, paso = 0.28) => [
  ...SALIDA.map(([s, n], i) => ({texto: `Listo: Reporte ${s}.xlsx (${n} ventas)`, desde: `${inicio}+${(i * paso).toFixed(2)}`, color: '#9BE7A8'})),
];
const ENC = {negrita: true, fondo: '#E9F3EC'};
const der = 'right' as const;
const PRIMERAS = [
  ['2026-11-01', 'Puebla', 'Vendedor PUE-4', 'Monitor', '2', '620'],
  ['2026-11-01', 'CDMX', 'Vendedor CDM-3', 'Audífonos', '3', '255'],
  ['2026-11-01', 'CDMX', 'Vendedor CDM-2', 'Audífonos', '3', '255'],
  ['2026-11-01', 'Medellín', 'Vendedor MED-2', 'Laptop', '2', '2400'],
  ['2026-11-01', 'Bogotá', 'Vendedor BOG-3', 'Monitor', '1', '310'],
  ['2026-11-01', 'Guadalajara', 'Vendedor GUA-3', 'Laptop', '3', '3600'],
  ['2026-11-01', 'Quito', 'Vendedor QUI-1', 'Laptop', '4', '4800'],
  ['2026-11-01', 'Lima', 'Vendedor LIM-2', 'Monitor', '5', '1550'],
];
const BOGOTA = [
  ['2026-11-01', 'Bogotá', 'Vendedor BOG-3', 'Monitor', '1', '310'],
  ['2026-11-01', 'Bogotá', 'Vendedor BOG-2', 'Monitor', '2', '620'],
  ['2026-11-01', 'Bogotá', 'Vendedor BOG-2', 'Audífonos', '3', '255'],
  ['2026-11-01', 'Bogotá', 'Vendedor BOG-1', 'Teclado', '2', '120'],
  ['2026-11-01', 'Bogotá', 'Vendedor BOG-1', 'Laptop', '3', '3600'],
  ['2026-11-01', 'Bogotá', 'Vendedor BOG-4', 'Monitor', '2', '620'],
  ['2026-11-01', 'Bogotá', 'Vendedor BOG-4', 'Laptop', '1', '1200'],
  ['2026-11-01', 'Bogotá', 'Vendedor BOG-3', 'Mouse', '2', '70'],
];
const COLS = ['Fecha', 'Sucursal', 'Vendedor', 'Producto', 'Cantidad', 'Monto'];
const tablaVentas = (filas: string[][], d: string | number = 0, hasta?: string) => [
  ...COLS.map((v, i) => ({ref: `${'ABCDEF'[i]}1`, valor: v, desde: d, ...ENC, ...(hasta ? {hasta} : {})})),
  ...filas.flatMap((f, i) => f.map((v, j) => ({ref: `${'ABCDEF'[j]}${i + 2}`, valor: v, desde: d, ...(j >= 4 ? {alinear: der} : {}), ...(hasta ? {hasta} : {})}))),
];
const ANCHOS = {A: 200, B: 190, C: 240, D: 190, E: 150, F: 140};
const RESUMEN = [['Vendedor BOG-1', '52100'], ['Vendedor BOG-2', '46960'], ['Vendedor BOG-3', '26370'], ['Vendedor BOG-4', '43610']];
const tablaResumen = (d: string | number, total?: string) => [
  {ref: 'A1', valor: 'Vendedor', desde: d, ...ENC},
  {ref: 'B1', valor: 'Monto', desde: d, ...ENC},
  ...RESUMEN.flatMap((f, i) => [{ref: `A${i + 2}`, valor: f[0], desde: d}, {ref: `B${i + 2}`, valor: f[1], desde: d, alinear: der}]),
  ...(total ? [{ref: 'A6', valor: 'TOTAL', desde: total, negrita: true, fondo: '#FFE500'}, {ref: 'B6', valor: '169040', desde: total, negrita: true, fondo: '#FFE500', alinear: der}] : []),
];
const CIUDADES = SALIDA.map(([s]) => s);

export const episodio: EspecEpisodio = {
  canal: 'edwin-o',
  slug: 'python-automatizar-excel',
  id: 'EdwinO-PythonAutomatizaExcel',
  manifest: manifest as Manifest,
  escenas: {
    '01': {
      fondo: 'oscuro',
      bloques: [
        {en: 0, tipo: 'terminal', titulo: 'Terminal · C:\\Reportes', ancho: 1300, lineas: [
          {texto: '> python reportes.py', desde: 0.1, color: '#3DD6C8'},
          ...SALIDA.map(([s, n], i) => ({texto: `Listo: Reporte ${s}.xlsx (${n} ventas)`, desde: 0.7 + i * 0.4, color: '#9BE7A8'})),
        ]},
        {en: 'cuanto', tipo: 'titulo', lineas: [{texto: '¿Cuánto te tomaría', color: 'blanco', tamano: 120}, {texto: 'A MANO?', color: 'amarillo', tamano: 240}]},
        {en: 'lineas', tipo: 'titulo', lineas: [{texto: '12 LÍNEAS', color: 'amarillo', tamano: 240}, {texto: 'de Python', color: 'turquesa', tamano: 150}]},
      ],
    },
    '02': {
      bloques: [
        {en: 0, tipo: 'cortinilla', titulo: 'Automatiza Excel con Python'},
        {en: 'hoy', tipo: 'titulo', lineas: [{texto: 'AUTOMATIZA EXCEL', color: 'amarillo', tamano: 180}, {texto: 'con Python 🐍', color: 'blanco', tamano: 140}], sub: 'Aunque nunca hayas programado'},
        {en: 'final', tipo: 'tarjeta', icono: '⚠️', titulo: 'Los errores de la primera vez', texto: 'Te los enseño al final, para que no te pasen.', color: 'rojo'},
      ],
    },
    '03': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'titulo', lineas: [{texto: '¿Por qué Python?', color: 'blanco', tamano: 130}, {texto: '¿Y POR QUÉ AHORA?', color: 'amarillo', tamano: 180}]},
        {en: 'encuesta', tipo: 'cifra', valor: '+7 puntos', texto: 'Creció el uso de Python en un solo año', fuente: 'Stack Overflow Developer Survey 2025'},
        {en: 'mitad', tipo: 'cifra', valor: '57,9 %', texto: 'de los desarrolladores ya usa Python', fuente: 'Stack Overflow Developer Survey 2025', color: 'turquesa'},
        {en: 'oficina', tipo: 'titulo', lineas: [{texto: 'No es solo', color: 'blanco', tamano: 130}, {texto: 'PARA PROGRAMADORES', color: 'amarillo', tamano: 170}], texto: 'Es para dejar de repetir el mismo trabajo cada semana.'},
      ],
    },
    '04': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '🏢', titulo: 'La petición número uno', texto: '“Edwin, necesito un reporte por sede, cada semana.”', color: 'magenta'},
        {en: 'eliminar', tipo: 'titulo', lineas: [{texto: 'Hoy lo', color: 'blanco', tamano: 140}, {texto: 'ELIMINAMOS', color: 'amarillo', tamano: 240}]},
      ],
    },
    '05': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {archivo: 'ventas.xlsx', hoja: 'Sheet1', columnas: 6, anchos: ANCHOS, celdas: tablaVentas(PRIMERAS),
          globos: [{a: 'F9', texto: '… 2.400 filas', desde: 'cuatrocientas', lado: 'abajo'}, {a: 'B5', texto: '12 sucursales', desde: 'sucursales'}]}},
        {en: 'mano', tipo: 'lista', titulo: 'A mano, cada semana', items: [
          {texto: 'Filtrar una sucursal', desde: 'filtrar', icono: '1️⃣'},
          {texto: 'Copiar y pegar en un libro nuevo', desde: 'copiar', icono: '2️⃣'},
          {texto: 'Hacer el resumen y guardar', desde: 'resumen', icono: '3️⃣'},
          {texto: 'Repetirlo… 12 veces', desde: 'repetirlo', icono: '🔁'},
        ]},
        {en: 'facilmente', tipo: 'cifra', valor: '1 hora', texto: 'cada semana… y con errores al copiar', color: 'rojo'},
      ],
    },
    '06': {
      paso: {n: 1, texto: 'Instala Python'},
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '🐍', titulo: 'python.org', texto: 'Descarga e instala Python 3 para Windows.', color: 'azul'},
        {en: 'detalle', tipo: 'tarjeta', icono: '☑️', titulo: 'Add python.exe to PATH', texto: 'Márcala en la PRIMERA pantalla del instalador. Es el detalle más importante.', color: 'rojo'},
        {en: 'terminal', tipo: 'terminal', titulo: 'Terminal', lineas: [
          {texto: '> pip install pandas openpyxl', desde: 'pip', color: '#3DD6C8'},
          {texto: 'Successfully installed openpyxl pandas', desde: 'pandas#2-0.6', color: '#9BE7A8'},
        ]},
        {en: 'pandas#2', tipo: 'cuadricula', items: [
          {icono: '🐼', texto: 'pandas: lee y organiza los datos', desde: 'pandas#2'},
          {icono: '📗', texto: 'openpyxl: escribe archivos de Excel', desde: 'openpyxl#2'},
        ]},
      ],
    },
    '07': {
      paso: {n: 2, texto: 'La carpeta'},
      bloques: [
        {en: 0, tipo: 'cuadricula', titulo: '📁 Carpeta "Reportes"', items: [
          {icono: '📗', texto: 'ventas.xlsx', desde: 'ventas'},
          {icono: '🐍', texto: 'reportes.py', desde: 'reportes'},
        ]},
        {en: 'importante', capa: true, tipo: 'pildora', texto: '📌 Los dos archivos en la misma carpeta', abajo: true, tamano: 52},
      ],
    },
    '08': {
      paso: {n: 3, texto: 'Lee el Excel'},
      bloques: [
        {en: 0, tipo: 'codigo', codigo: P3, archivo: 'reportes.py', velocidad: 12, tamano: 36,
          resaltar: [{lineas: [1], desde: 'primera', hasta: 'segunda'}, {lineas: [2], desde: 'segunda', hasta: 'tercera'}, {lineas: [4], desde: 'tercera'}],
          salida: [
            {texto: '>>> ventas.shape', desde: 'memoria', color: '#3DD6C8'},
            {texto: '(2400, 6)', desde: 'memoria+0.6'},
            {texto: '2.400 filas · 6 columnas', desde: 'memoria+1.1', color: '#FFE500'},
          ]},
      ],
    },
    '09': {
      paso: {n: 4, texto: 'La carpeta de reportes'},
      bloques: [
        {en: 0, tipo: 'codigo', previo: P3, codigo: P4, archivo: 'reportes.py', velocidad: 9, tamano: 38,
          resaltar: [{lineas: [5], desde: 'carpeta', hasta: 'mkdir'}, {lineas: [6], desde: 'mkdir'}]},
        {en: 'exist', capa: true, tipo: 'pildora', texto: '📁 Si ya existe, no pasa nada', tamano: 46},
      ],
    },
    '10': {
      paso: {n: 5, texto: 'El ciclo mágico'},
      bloques: [
        {en: 0, tipo: 'codigo', previo: P3 + P4, codigo: P5, archivo: 'reportes.py', velocidad: 9, tamano: 38,
          resaltar: [{lineas: [8], desde: 'groupby'}]},
        {en: 'vuelta', tipo: 'cuadricula', titulo: '12 sucursales = 12 vueltas', items: CIUDADES.map((c, i) => ({icono: '📍', texto: c, desde: `vuelta+${(i * 0.3).toFixed(1)}`}))},
      ],
    },
    '11': {
      paso: {n: 6, texto: 'El nombre y el resumen'},
      bloques: [
        {en: 0, tipo: 'codigo', previo: P3 + P4 + P5, codigo: P6, archivo: 'reportes.py', velocidad: 11, tamano: 34,
          resaltar: [{lineas: [9], desde: 'nombre', hasta: 'resumen'}, {lineas: [10], desde: 'resumen'}]},
        {en: 'tabla', capa: true, tipo: 'pildora', texto: '= una tabla dinámica, en una línea', tamano: 46},
      ],
    },
    '12': {
      paso: {n: 7, texto: 'Escribe el libro'},
      bloques: [
        {en: 0, tipo: 'codigo', previo: P3 + P4 + P5 + P6, codigo: P7, archivo: 'reportes.py', velocidad: 12, tamano: 32,
          resaltar: [{lineas: [11], desde: 'with', hasta: 'dentro'}, {lineas: [12], desde: 'datos', hasta: 'resumen'}, {lineas: [13], desde: 'resumen', hasta: 'index'}, {lineas: [12], desde: 'index'}]},
      ],
    },
    '13': {
      paso: {n: 8, texto: 'Ejecuta'},
      bloques: [
        {en: 0, tipo: 'codigo', previo: P3 + P4 + P5 + P6 + P7, codigo: P8, archivo: 'reportes.py', velocidad: 14, tamano: 32,
          resaltar: [{lineas: [14], desde: 0.3}]},
        {en: 'guarda', tipo: 'terminal', titulo: 'Terminal · C:\\Reportes', ancho: 1300, lineas: [
          {texto: '> python reportes.py', desde: 'python', color: '#3DD6C8'},
          ...lineasSalida('mira', 0.3),
        ]},
        {en: 'carpeta#2', tipo: 'cuadricula', titulo: '12 archivos nuevos', items: CIUDADES.map((c, i) => ({icono: '📗', texto: c, desde: `carpeta#2+${(i * 0.12).toFixed(2)}`}))},
      ],
    },
    '14': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {archivo: 'Reporte Bogotá.xlsx', hoja: 'Ventas', columnas: 6, anchos: ANCHOS, hojas: ['Ventas', 'Resumen'],
          hojaActiva: [{nombre: 'Ventas', desde: 0}, {nombre: 'Resumen', desde: 'resumen'}],
          celdas: [...tablaVentas(BOGOTA, 0, 'resumen'), ...tablaResumen('resumen')],
          globos: [{a: 'F9', texto: '193 ventas de Bogotá', desde: 'noventa', hasta: 'resumen', lado: 'abajo'}, {a: 'B5', texto: 'Total por vendedor', desde: 'total'}]}},
        {en: 'nadie', tipo: 'titulo', lineas: [{texto: 'Nadie filtró, nadie copió,', color: 'blanco', tamano: 110}, {texto: 'NADIE PEGÓ', color: 'amarillo', tamano: 220}]},
        {en: 'lunes', tipo: 'tarjeta', icono: '🔁', titulo: 'El próximo lunes', texto: 'Cambias ventas.xlsx, ejecutas el programa… y listo.', color: 'verde'},
      ],
    },
    '15': {
      paso: {n: '💡', prefijo: 'TRUCO', texto: 'Adáptalo a tus datos'},
      bloques: [
        {en: 0, tipo: 'codigo', previo: COMPLETO, codigo: '', archivo: 'reportes.py', tamano: 32, resaltar: [{lineas: [8], desde: 'linea'}]},
        {en: 'cambia+0.6', tipo: 'codigo', previo: POR_VENDEDOR, codigo: '', archivo: 'reportes.py', tamano: 32, resaltar: [{lineas: [8, 9], desde: 0}]},
        {en: 'ahora', tipo: 'terminal', titulo: 'Terminal · C:\\Reportes', ancho: 1300, lineas: [
          {texto: '> python reportes.py', desde: 'ahora', color: '#3DD6C8'},
          {texto: 'Listo: Reporte Vendedor ARE-1.xlsx (48 ventas)', desde: 'ahora+0.5', color: '#9BE7A8'},
          {texto: 'Listo: Reporte Vendedor ARE-2.xlsx (47 ventas)', desde: 'ahora+0.8', color: '#9BE7A8'},
          {texto: 'Listo: Reporte Vendedor ARE-3.xlsx (37 ventas)', desde: 'ahora+1.1', color: '#9BE7A8'},
          {texto: '…', desde: 'ahora+1.4'},
          {texto: 'Listo: Reporte Vendedor SAN-4.xlsx (55 ventas)', desde: 'ocho', color: '#9BE7A8'},
          {texto: '48 reportes', desde: 'ocho+0.4', color: '#FFE500'},
        ]},
        {en: 'producto', tipo: 'lista', titulo: 'Cambia una palabra', items: [
          {texto: '¿Por producto?', desde: 'producto', icono: '📦'},
          {texto: '¿Por cliente?', desde: 'cliente', icono: '🧑‍💼'},
          {texto: '¿Por mes?', desde: 'mes', icono: '📅'},
          {texto: 'Escribe la columna igual que en tu Excel', desde: 'asegurate', icono: '⚠️'},
        ]},
      ],
    },
    '16': {
      paso: {n: 'PRO', prefijo: 'NIVEL', texto: 'Total y ancho con openpyxl'},
      bloques: [
        {en: 0, tipo: 'codigo', archivo: 'reportes_pro.py (dentro del for)', velocidad: 14, tamano: 36,
          codigo: `libro = load_workbook(archivo)
hoja = libro["Resumen"]
hoja.column_dimensions["A"].width = 22
hoja.append(["TOTAL", resumen.sum()])
libro.save(archivo)`,
          resaltar: [{lineas: [1, 2], desde: 'abres', hasta: 'ensanchas'}, {lineas: [3], desde: 'ensanchas', hasta: 'append'}, {lineas: [4], desde: 'append'}]},
        {en: 'bogota', tipo: 'hoja', hoja: {archivo: 'Reporte Bogotá.xlsx', hoja: 'Resumen', columnas: 4, anchos: {A: 330, B: 200, C: 150, D: 150}, hojas: ['Ventas', 'Resumen'],
          hojaActiva: [{nombre: 'Resumen', desde: 0}], celdas: tablaResumen(0, 'bogota+0.3'), zoom: [{a: 'B6', desde: 'ciento', escala: 1.6}]}},
        {en: 'descripcion', capa: true, tipo: 'pildora', texto: '📌 Código completo en la descripción', tamano: 46},
      ],
    },
    '17': {
      bloques: [
        {en: 0, tipo: 'errores', titulo: 'Errores de la primera vez', items: [
          {mal: '“pip” no se reconoce', bien: 'Marca “Add to PATH” o usa py -m pip', desde: 'pip'},
          {mal: 'PermissionError', bien: 'Cierra el reporte en Excel', desde: 'permission'},
          {mal: 'UnicodeEncodeError', bien: 'Quita símbolos como ✓ del print', desde: 'simbolo'},
        ]},
      ],
    },
    '18': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '⏰', titulo: 'Programador de tareas', texto: 'Cada lunes, 7:00 a. m. → python reportes.py'},
        {en: 'llegues', tipo: 'titulo', lineas: [{texto: 'Llegas a la oficina y', color: 'blanco', tamano: 110}, {texto: 'YA ESTÁN LISTOS', color: 'amarillo', tamano: 200}]},
        {en: 'primero', tipo: 'tarjeta', icono: '🧪', titulo: 'Primero, pruébalo a mano', texto: 'Varias veces. Después lo programas.', color: 'verde'},
      ],
    },
    '19': {
      bloques: [
        {en: 0, tipo: 'cifra', valor: '52 horas', texto: 'al año copiando y pegando', color: 'rojo'},
        {en: 'python', tipo: 'comparar', izq: {titulo: 'A mano', icono: '🐢', items: [{texto: '1 hora cada semana', desde: 'python'}, {texto: 'Errores al copiar', desde: 'errores'}]},
          der: {titulo: 'Con Python', icono: '🐍', items: [{texto: 'Segundos', desde: 'segundos'}, {texto: 'Siempre igual', desde: 'siempre'}, {texto: 'Tu tiempo, para analizar', desde: 'analizar'}]}},
        {en: 'digo', tipo: 'titulo', lineas: [{texto: 'Si no lo aprendes ahora,', color: 'blanco', tamano: 110}, {texto: 'TE EXTINGUES', color: 'rojo', tamano: 210}]},
      ],
    },
    '20': {
      bloques: [
        {en: 0, tipo: 'resumen', ideas: [
          {texto: 'pandas lee el Excel', desde: 'pandas'},
          {texto: 'groupby lo separa por sucursal', desde: 'groupby'},
          {texto: 'to_excel escribe cada reporte', desde: 'escribe'},
        ]},
        {en: 'proximo', tipo: 'cierre', siguiente: '¿Excel está muerto con la IA?', suscribir: 'suscribete'},
      ],
    },
  },
  shorts: [
    {id: 'short-1', escena: '13', desde: 'guarda', gancho: [{texto: '12 reportes', color: 'blanco', tamano: 110}, {texto: 'EN 8 SEGUNDOS', color: 'amarillo', tamano: 130}]},
    {id: 'short-2', escena: '15', gancho: [{texto: 'Cambia UNA palabra:', color: 'blanco', tamano: 90}, {texto: '48 REPORTES', color: 'amarillo', tamano: 150}]},
  ],
  miniatura: {
    lineas: [{texto: '12 REPORTES', color: 'amarillo'}, {texto: 'en 8 segundos', color: 'blanco', tamano: 96}, {texto: 'con PYTHON', color: 'turquesa'}],
    pildora: 'Excel + Python',
    insignia: 'SIN SABER PROGRAMAR',
    codigo: 'for sucursal, datos in\n  ventas.groupby("Sucursal"):\n    datos.to_excel(...)',
  },
};
