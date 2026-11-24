import type {Cue, EspecEpisodio} from '../../comun/motor-tipos';
import type {Manifest} from '../../comun/tipos';
import manifest from '../../../public/edwin-o/formulas-con-ia/manifest.json';

/* Datos verificados en canales/edwin-o/episodios/formulas-con-ia/ficha.md */
const FILAS = [
  ['Ana', 'Nov', '999', '0', '0'],
  ['Luis', 'Nov', '1.000', '0', '30'],
  ['Marta', 'Nov', '4.999', '149,97', '149,97'],
  ['Pedro', 'Nov', '5.000', '150', '250'],
  ['Sofía', 'Nov', '7.200', '360', '360'],
  ['Juan', 'Nov', '3.250', '97,50', '97,50'],
];
const MALA = '=SI(C2>5000;C2*0,05;SI(C2>1000;C2*0,03;0))';
const BUENA = '=SI.CONJUNTO(C2>=5000;C2*5%;C2>=1000;C2*3%;VERDADERO;0)';
const PRO = '=C2*BUSCARX(C2;$F$2:$F$4;$G$2:$G$4;0;-1)';
const ROJO = {fondo: '#FFC7CE', color: '#9C0006', negrita: true};
const VERDE = {fondo: '#DFF7E7', color: '#0F5A32', negrita: true};
const ENC = {negrita: true, fondo: '#E9F3EC'};

const BASE = {archivo: 'Comisiones.xlsx', hoja: 'Noviembre', columnas: 7, anchos: {A: 220, B: 130, C: 180, D: 220, E: 60, F: 170, G: 150}};

const encabezados = (d: Cue = 0) => ['Vendedor', 'Mes', 'Ventas', 'Comisión'].map((v, i) => ({ref: `${'ABCD'[i]}1`, valor: v, desde: d, ...ENC}));
const datos = (d: Cue = 0) => FILAS.flatMap((f, i) => ['A', 'B', 'C'].map((c, j) => ({ref: `${c}${i + 2}`, valor: f[j], desde: d, alinear: j === 2 ? ('right' as const) : undefined})));
/** Columna D: 'mala' (prompt vago) o 'buena'. `d` puede ser un cue por fila. */
const comision = (tipo: 'mala' | 'buena', d: (i: number) => Cue, estilo?: (i: number) => object) =>
  FILAS.map((f, i) => ({ref: `D${i + 2}`, valor: tipo === 'mala' ? f[3] : f[4], desde: d(i), alinear: 'right' as const, ...(estilo ? estilo(i) : {})}));

const tramos = (d: Cue = 0) => [
  {ref: 'F1', valor: 'Desde', desde: d, ...ENC},
  {ref: 'G1', valor: 'Tasa', desde: d, ...ENC},
  {ref: 'F2', valor: '0', desde: d, alinear: 'right' as const},
  {ref: 'G2', valor: '0%', desde: d, alinear: 'right' as const},
  {ref: 'F3', valor: '1.000', desde: d, alinear: 'right' as const},
  {ref: 'G3', valor: '3%', desde: d, alinear: 'right' as const},
  {ref: 'F4', valor: '5.000', desde: d, alinear: 'right' as const},
];

export const episodio: EspecEpisodio = {
  canal: 'edwin-o',
  slug: 'formulas-con-ia',
  id: 'EdwinO-FormulasConIA',
  manifest: manifest as Manifest,
  escenas: {
    '01': {
      bloques: [
        {en: 0, tipo: 'chat', mensajes: [
          {rol: 'yo', texto: 'Dame una fórmula de comisiones', desde: 0.2, duracion: 1},
          {rol: 'ia', texto: `Claro, usa esta:\n\`${MALA}\``, desde: 1.2, duracion: 1.5},
        ]},
        {en: 'pegaste', tipo: 'hoja', hoja: {...BASE, celdas: [
          ...encabezados(), ...datos(),
          ...comision('mala', (i) => `pegaste+${0.3 + i * 0.12}`, (i) => (i === 1 || i === 3 ? {...ROJO, fondoDesde: 'mira'} : {})),
        ], zoom: [{a: 'D5', desde: 'vendedor', escala: 1.7}], globos: [{a: 'D5', texto: '¡Debía ser 250!', desde: 'cien', color: '#E30613'}]}},
      ],
    },
    '02': {
      bloques: [
        {en: 0, tipo: 'cortinilla', titulo: 'Fórmulas con IA'},
        {en: 'hoy', tipo: 'titulo', lineas: [{texto: 'Fórmulas con IA', color: 'blanco', tamano: 120}, {texto: 'QUE SÍ FUNCIONAN', color: 'amarillo', tamano: 190}], sub: 'ChatGPT · Claude · Gemini · Copilot'},
        {en: 'final', tipo: 'tarjeta', icono: '🎁', titulo: 'Plantilla del prompt', texto: 'Al final del video, lista para copiar y usar hoy mismo.', color: 'magenta'},
      ],
    },
    '03': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'titulo', lineas: [{texto: 'Una noticia', color: 'blanco', tamano: 130}, {texto: 'QUE CASI NADIE', color: 'amarillo', tamano: 180}, {texto: 'te contó', color: 'turquesa', tamano: 130}]},
        {en: 'agosto', tipo: 'cronologia', items: [
          {fecha: 'Ago 2025', texto: 'Llega `=COPILOT()` en vista previa', desde: 'agosto', icono: '🤖', color: 'turquesa'},
          {fecha: '14 sep 2026', texto: 'Microsoft la retira de Excel', desde: 'catorce', icono: '🗑️', color: 'amarillo'},
          {fecha: 'Hoy', texto: 'Al recalcular muestra `#¿NOMBRE?`', desde: 'recalcular', icono: '⚠️', color: 'rojo'},
        ]},
        {en: 'retiro', capa: true, tipo: 'pildora', texto: 'Fuente: Microsoft Support · Centro de mensajes MC1454373', tamano: 36},
      ],
    },
    '04': {
      bloques: [
        {en: 0, tipo: 'comparar', titulo: 'La lección', izq: {titulo: 'IA dentro de la celda', icono: '🤖', items: [
          {texto: 'Tu hoja depende de la IA', desde: 'dependa'},
          {texto: 'Puede cambiar o desaparecer', desde: 'dependa+1'},
        ]}, der: {titulo: 'La IA te escribe la fórmula', icono: '✍️', desde: 'usa', items: [
          {texto: 'Fórmula normal de Excel', desde: 'normales'},
          {texto: 'Funciona siempre', desde: 'siempre'},
          {texto: 'Sin internet y sin sorpresas', desde: 'internet'},
        ]}},
        {en: 'asistente', tipo: 'titulo', lineas: [{texto: 'Tu ASISTENTE,', color: 'amarillo', tamano: 170}, {texto: 'no tu calculadora', color: 'blanco', tamano: 120}]},
        {en: 'como', tipo: 'titulo', lineas: [{texto: 'Si no lo aprendes ahora,', color: 'blanco', tamano: 110}, {texto: 'TE EXTINGUES', color: 'rojo', tamano: 210}]},
      ],
    },
    '05': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '🏫', titulo: 'Lo que más veo en clase', texto: '“Hazme una fórmula de comisiones”… y ya. Sin decir dónde están los datos ni qué Excel usan.', color: 'magenta'},
        {en: 'claro', tipo: 'titulo', lineas: [{texto: 'La IA', color: 'blanco', tamano: 130}, {texto: 'ADIVINA', color: 'amarillo', tamano: 240}], texto: 'A veces acierta… y a veces no.'},
      ],
    },
    '06': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [...encabezados('vendedor'), ...FILAS.flatMap((f, i) => ['A', 'B', 'C'].map((c, j) => ({ref: `${c}${i + 2}`, valor: f[j], desde: `ventas+${i * 0.12}`, alinear: j === 2 ? ('right' as const) : undefined})))]}},
        {en: 'regla', tipo: 'lista', titulo: 'La regla de la empresa', items: [
          {texto: 'Menos de 1.000 → sin comisión', desde: 'menos', icono: '⚪'},
          {texto: 'Desde 1.000 → 3 %', desde: 'desde', icono: '🟡'},
          {texto: 'Desde 5.000 → 5 %', desde: 'desde#2', icono: '🟢'},
        ]},
      ],
    },
    '07': {
      bloques: [
        {en: 0, tipo: 'chat', mensajes: [
          {rol: 'yo', texto: 'dame una fórmula para calcular comisiones en excel', desde: 'escribo+0.3', duracion: 2},
          {rol: 'ia', texto: '¡Claro! Puedes usar esta fórmula:\n`=IF(C2>5000,C2*0.05,IF(C2>1000,C2*0.03,0))`', desde: 'responde'},
        ]},
        {en: 'problemas', capa: true, tipo: 'pildora', texto: '⚠️ Tiene 2 problemas escondidos', tamano: 54},
      ],
    },
    '08': {
      paso: {n: 1, prefijo: 'PROBLEMA', texto: 'El idioma'},
      bloques: [
        {en: 0, tipo: 'formula', formula: '=IF(C2>5000,C2*0.05,IF(C2>1000,C2*0.03,0))', titulo: 'Te la dio en inglés', partes: [
          {texto: 'IF', nota: 'En español es SI', desde: 'if'},
          {texto: ',', nota: 'En español va punto y coma ( ; )', desde: 'comas'},
        ]},
        {en: 'pegas', tipo: 'tarjeta', icono: '⛔', titulo: 'Hay un problema con esta fórmula', texto: 'Y aquí muchos se rinden y piensan que la IA no sirve.', color: 'rojo'},
      ],
    },
    '09': {
      paso: {n: 2, prefijo: 'PROBLEMA', texto: 'Los límites'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [
          ...encabezados(), ...datos(),
          ...comision('mala', (i) => (i === 0 ? 'pego+0.5' : `columna+${i * 0.12}`), (i) => (i === 1 ? {...ROJO, fondoDesde: 'cero'} : i === 3 ? {...ROJO, fondoDesde: 'ciento'} : {})),
        ], escritura: [{celda: 'D2', texto: MALA, desde: 'traduzco', duracion: 1.4, enter: 'pego+0.5'}],
        zoom: [{a: 'D3', desde: 'exactamente', escala: 1.6}, {a: 'D5', desde: 'exactamente#2', escala: 1.6}, {a: 'D4', desde: 'porque', escala: 1}],
        globos: [{a: 'D3', texto: 'Debía ser 30', desde: 'cero', color: '#E30613'}, {a: 'D5', texto: 'Debía ser 250', desde: 'ciento', color: '#E30613'}]}},
        {en: 'mayor', tipo: 'formula', formula: MALA, escribir: false, partes: [
          {texto: 'C2>5000', nota: '“mayor que”: el 5.000 queda fuera', desde: 'mayor'},
          {texto: 'C2>1000', nota: 'y el 1.000 también', desde: 'mayor+1'},
        ]},
      ],
    },
    '10': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '🙈', titulo: 'La IA no ve tu hoja', texto: 'Si no le das el contexto, lo inventa.'},
        {en: 'idioma', tipo: 'cuadricula', items: [
          {icono: '🌐', texto: 'Tu idioma', desde: 'idioma'},
          {icono: '📍', texto: 'Dónde están tus datos', desde: 'datos'},
          {icono: '📏', texto: 'Qué significa “desde mil”', desde: 'significa'},
        ]},
        {en: 'solucion', tipo: 'titulo', lineas: [{texto: 'No necesitas otra IA:', color: 'blanco', tamano: 110}, {texto: 'UN MEJOR PROMPT', color: 'amarillo', tamano: 190}]},
      ],
    },
    '11': {
      paso: {n: 1, prefijo: 'PARTE', texto: 'Tu Excel', en: 'uno'},
      bloques: [
        {en: 0, tipo: 'titulo', lineas: [{texto: 'El método de las', color: 'blanco', tamano: 120}, {texto: '5 PARTES', color: 'amarillo', tamano: 260}]},
        {en: 'escribe', tipo: 'chat', mensajes: [
          {rol: 'yo', texto: 'Uso Excel para Microsoft 365 en español, con punto y coma ( ; ) como separador.', desde: 'escribe+0.3', duracion: 2.5},
          {rol: 'ia', texto: 'Perfecto: usaré `SI`, `BUSCARX`… y `;` en todas las fórmulas.', desde: 'solo'},
        ]},
      ],
    },
    '12': {
      paso: {n: 2, prefijo: 'PARTE', texto: 'Dónde están los datos'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [...encabezados(), ...datos()],
          resaltes: [{rango: 'A1:D1', desde: 'encabezados', color: '#FFE500'}, {rango: 'C2:C7', desde: 'ventas', color: '#3DD6C8'}],
          seleccion: [{celda: 'D2', desde: 'celda'}],
          globos: [
            {a: 'D1', texto: 'Encabezados: fila 1', desde: 'encabezados'},
            {a: 'C7', texto: 'Ventas: columna C', desde: 'ventas', lado: 'abajo'},
            {a: 'D2', texto: 'La fórmula va aquí', desde: 'celda'},
          ]}},
      ],
    },
    '13': {
      paso: {n: '3 y 4', prefijo: 'PARTES', texto: 'La regla y un ejemplo'},
      bloques: [
        {en: 0, tipo: 'lista', titulo: 'La regla, con los límites', items: [
          {texto: 'Desde 1.000, INCLUSIVE → 3 %', desde: 'mil', icono: '🟡'},
          {texto: 'Desde 5.000, INCLUSIVE → 5 %', desde: 'cinco', icono: '🟢'},
          {texto: '“Inclusive” evita el error de los límites', desde: 'palabra', icono: '💡'},
        ]},
        {en: 'ejemplo', tipo: 'tarjeta', icono: '🎯', titulo: 'Un ejemplo con el resultado', texto: 'Si `C2` vale 5.000, la comisión es 250.', color: 'verde'},
      ],
    },
    '14': {
      paso: {n: 5, prefijo: 'PARTE', texto: 'Explicación y pruebas'},
      bloques: [
        {en: 0, tipo: 'chat', mensajes: [
          {rol: 'yo', texto: 'Uso Excel 365 en español ( ; ). Encabezados en la fila 1; ventas en C desde la fila 2. En D2 necesito la comisión: desde 1.000 inclusive 3 %, desde 5.000 inclusive 5 %, si no 0. Ejemplo: si C2 = 5.000, la comisión es 250. Explícamela y dame casos de prueba.', desde: 0.3, duracion: 3.5},
          {rol: 'ia', texto: `\`${BUENA}\`\nRevisa las condiciones en orden, de la mayor a la menor. Pruébala con 999, 1.000, 4.999 y 5.000.`, desde: 'diferencia'},
        ]},
      ],
    },
    '15': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [
          ...encabezados(), ...datos(),
          ...comision('buena', (i) => (i === 0 ? 'pego+0.6' : `arrastro+${0.2 + i * 0.12}`), () => ({...VERDE})),
        ], escritura: [{celda: 'D2', texto: BUENA, desde: 0.3, duracion: 1.6, enter: 'pego+0.6'}],
        zoom: [{a: 'D2', desde: 'novecientos', escala: 1.5}, {a: 'D3', desde: 'mil', escala: 1.5}, {a: 'D5', desde: 'cinco', escala: 1.5}, {a: 'D4', desde: 'perfecto', escala: 1}],
        globos: [{a: 'D5', texto: '✓ 250', desde: 'doscientos', color: '#1E9E4A'}]}},
        {en: 'nunca', tipo: 'titulo', lineas: [{texto: 'Prueba SIEMPRE', color: 'amarillo', tamano: 190}, {texto: 'los valores del límite', color: 'blanco', tamano: 110}]},
      ],
    },
    '16': {
      bloques: [
        {en: 0, tipo: 'formula', formula: BUENA, titulo: 'Entiéndela, no la copies a ciegas', escribir: false, partes: [
          {texto: 'C2>=5000', nota: '¿Vendió 5.000 o más?', desde: 'vendio'},
          {texto: 'C2*5%', nota: 'Entonces, 5 %', desde: 'entonces'},
          {texto: 'C2>=1000', nota: '¿1.000 o más?', desde: 'vendio#2'},
          {texto: 'C2*3%', nota: 'Entonces, 3 %', desde: 'entonces#2'},
          {texto: 'VERDADERO;0', nota: 'Cualquier otro caso: 0', desde: 'verdadero'},
        ]},
      ],
    },
    '17': {
      paso: {n: 'PRO', prefijo: 'NIVEL', texto: 'Las tasas en celdas'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [
          ...encabezados(), ...datos(), ...tramos(),
          {ref: 'G4', valor: '5%', desde: 0, hasta: 'seis', alinear: 'right'},
          {ref: 'G4', valor: '6%', desde: 'seis', alinear: 'right', fondo: '#FFE500', negrita: true},
          ...FILAS.map((f, i) => ({ref: `D${i + 2}`, valor: f[4], desde: `ventaja+${i * 0.1}`, alinear: 'right' as const, ...(i === 3 || i === 4 ? {hasta: 'cambias+0.4'} : {})})),
          {ref: 'D5', valor: '300', desde: 'cambias+0.4', alinear: 'right', ...VERDE},
          {ref: 'D6', valor: '432', desde: 'cambias+0.5', alinear: 'right', ...VERDE},
        ], escritura: [{celda: 'D2', texto: PRO, desde: 'algo', duracion: 1.8, enter: 'ventaja'}],
        resaltes: [{rango: 'F2:G4', desde: 'tabla', hasta: 'menos', color: '#3DD6C8'}, {rango: 'G4', desde: 'seis', color: '#E5197F'}],
        zoom: [{a: 'G4', desde: 'seis', escala: 1.4}, {a: 'D5', desde: 'listo', escala: 1}],
        globos: [{a: 'D2', texto: '-1 = exacto o el siguiente menor', desde: 'menos', hasta: 'ventaja+1.5'}]}},
      ],
    },
    '18': {
      paso: {n: 'BONUS', prefijo: '🎁', texto: 'Fórmulas heredadas'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {archivo: 'Pedidos (heredado).xlsx', hoja: 'Pedidos', columnas: 4, anchos: {A: 200, B: 300, C: 200, D: 200},
          celdas: [
            {ref: 'A1', valor: 'Código', desde: 0, ...ENC}, {ref: 'B1', valor: 'Producto', desde: 0, ...ENC}, {ref: 'C1', valor: 'Precio', desde: 0, ...ENC},
            {ref: 'A2', valor: 'P-104', desde: 0}, {ref: 'B2', valor: 'Teclado', desde: 0}, {ref: 'C2', valor: '85.000', desde: 0.8, alinear: 'right'},
            {ref: 'A3', valor: 'P-221', desde: 0}, {ref: 'B3', valor: 'Mouse', desde: 0}, {ref: 'C3', valor: '0', desde: 0.8, alinear: 'right'},
          ],
          escritura: [{celda: 'C2', texto: '=SI(ESERROR(BUSCARV(A2;Precios!A:C;3;FALSO));0;BUSCARV(A2;Precios!A:C;3;FALSO))', desde: 0.1, duracion: 0.6, enter: 0.8}],
          globos: [{a: 'C2', texto: '¿Qué hace esto? 🤯', desde: 'larguisimas'}]}},
        {en: 'copia', tipo: 'chat', mensajes: [
          {rol: 'yo', texto: 'Explícame esta fórmula paso a paso y dime si hay una forma más simple:\n`=SI(ESERROR(BUSCARV(A2;Precios!A:C;3;FALSO));0;BUSCARV(A2;Precios!A:C;3;FALSO))`', desde: 'escribe', duracion: 2.5},
          {rol: 'ia', texto: 'Busca el código de A2 en la hoja Precios y trae la columna 3. Si no lo encuentra, pone 0.\nVersión más simple:\n`=SI.ERROR(BUSCARV(A2;Precios!A:C;3;FALSO);0)`', desde: 'caso'},
        ]},
        {en: 'ojo', capa: true, tipo: 'pildora', texto: '⚠️ Compruébala con tus datos antes de cambiarla', tamano: 44},
      ],
    },
    '19': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'chat', mensajes: [
          {rol: 'yo', texto: '¿Cómo resumo los comentarios de mis clientes?', desde: 0.2, duracion: 1.5},
          {rol: 'ia', texto: 'Usa `=COPILOT("Resume";A2:A20)`', desde: 'sugiere'},
        ]},
        {en: 'ejemplo', tipo: 'tarjetas', items: [
          {icono: '🆕', titulo: 'Funciones nuevas', texto: 'de Microsoft 365… cuando tú tienes Excel 2016', desde: 'ejemplo'},
          {icono: '🪦', titulo: 'Funciones retiradas', texto: 'como `=COPILOT()`, que ya no existe', desde: 'peor', color: 'rojo'},
        ]},
        {en: 'error', tipo: 'tarjeta', icono: '⚠️', titulo: '#¿NOMBRE?', texto: 'Excel no conoce esa función (o tu versión no la tiene).', color: 'rojo'},
        {en: 'diselo', tipo: 'chat', mensajes: [
          {rol: 'yo', texto: 'Tengo Excel 2016 y me sale #¿NOMBRE?. Dame una alternativa que sí funcione en mi versión.', desde: 'diselo+0.3', duracion: 2.5},
        ]},
      ],
    },
    '20': {
      bloques: [
        {en: 0, tipo: 'lista', titulo: '3 reglas de seguridad', items: [
          {texto: 'No pegues datos reales: usa datos de ejemplo', desde: 'pegues', icono: '🔒'},
          {texto: 'Prueba siempre los límites', desde: 'prueba', icono: '🧪'},
          {texto: 'Si no la entiendes, pide que te la explique', desde: 'entiendes', icono: '🧠'},
        ]},
      ],
    },
    '21': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '📋', titulo: 'Plantilla del prompt', ancho: 1650, color: 'magenta',
          texto: 'Uso Excel 365 en español (separador ;). Mis datos están en ___, con encabezados en la fila 1. Necesito en ___ una fórmula que ___. Regla exacta: ___ (límites inclusive). Ejemplo: si ___, el resultado es ___. Explícamela y dame casos de prueba.'},
        {en: 'descripcion', capa: true, tipo: 'pildora', texto: '📌 También en la descripción', tamano: 48},
      ],
    },
    '22': {
      bloques: [
        {en: 0, tipo: 'resumen', ideas: [
          {texto: 'La IA escribe, tú verificas', desde: 'escribe'},
          {texto: 'Prompt de 5 partes', desde: 'prompt'},
          {texto: 'Prueba siempre los límites', desde: 'limites'},
        ]},
        {en: 'proximo', tipo: 'cierre', siguiente: '7 funciones de Excel que te ahorran horas', suscribir: 'suscribete'},
      ],
    },
  },
  shorts: [
    {id: 'short-1', escena: '03', gancho: [{texto: 'Microsoft', color: 'blanco', tamano: 100}, {texto: 'BORRÓ ESTO', color: 'amarillo', tamano: 150}, {texto: 'de Excel', color: 'blanco', tamano: 100}]},
    {id: 'short-2', escena: '09', desde: 'pego', gancho: [{texto: 'La IA te dio', color: 'blanco', tamano: 100}, {texto: 'UNA FÓRMULA MAL', color: 'amarillo', tamano: 130}]},
  ],
  miniatura: {
    lineas: [{texto: 'FÓRMULAS', color: 'amarillo'}, {texto: 'CON IA', color: 'turquesa'}, {texto: 'que SÍ funcionan', color: 'magenta', tamano: 84}],
    pildora: 'en Excel',
    insignia: 'PROMPT GRATIS',
    formula: '=SI.CONJUNTO(C2>=5000;…)',
    filas: [['Ventas', 'IA vaga', 'Bien'], ['1.000', '0 ✗', '30'], ['5.000', '150 ✗', '250']],
    resaltarFila: 2,
  },
};
