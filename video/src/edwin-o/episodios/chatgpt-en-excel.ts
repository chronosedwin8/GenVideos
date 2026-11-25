import type {Cue, EspecEpisodio} from '../../comun/motor-tipos';
import type {Manifest} from '../../comun/tipos';
import manifest from '../../../public/edwin-o/chatgpt-en-excel/manifest.json';

/* Datos oficiales de OpenAI y cálculos verificados con pandas: canales/edwin-o/episodios/chatgpt-en-excel/ficha.md.
   El panel del complemento es una RECREACIÓN (se indica en pantalla); los resultados son los cálculos correctos. */
const RAW = [
  ['05/01/2026', 'Papelería', 'Oficina', 120000],
  ['07/01/2026', 'Taxi a cliente', 'Transporte', 45000],
  ['07/01/2026', 'Taxi a cliente', 'Transporte', 45000],
  ['10/01/2026', 'Almuerzo de equipo', 'Alimentación', 180000],
  ['12/01/2026', 'Tóner impresora', 'Oficina', 210000],
  ['15/01/2026', 'Bus intermunicipal', 'Transporte', 60000],
  ['18/01/2026', 'Café reunión', 'Alimentación', 35000],
  ['20/01/2026', 'Mouse inalámbrico', 'Tecnología', 75000],
] as const;
const LIMPIO = RAW.filter((_, i) => i !== 2);
const RESUMEN = [['Oficina', '$ 330.000', '45,5 %'], ['Alimentación', '$ 215.000', '29,7 %'], ['Transporte', '$ 105.000', '14,5 %'], ['Tecnología', '$ 75.000', '10,3 %'], ['Total', '$ 725.000', '100 %']];
const ENC = {negrita: true, fondo: '#E9F3EC'};
const der = 'right' as const;
type Celda = {ref: string; valor: string; desde: Cue; [k: string]: unknown};
const num = (v: number) => v.toLocaleString('es-CO');
const mon = (v: number) => '$ ' + v.toLocaleString('es-CO');
const gastos = (filas: readonly (readonly [string, string, string, number])[], d: Cue = 0, moneda = false, extra: (r: number) => object = () => ({})): Celda[] => [
  ...['Fecha', 'Concepto', 'Categoría', 'Monto'].map((v, i) => ({ref: `${'ABCD'[i]}1`, valor: v, desde: d, ...ENC})),
  ...filas.flatMap((f, r) => [
    {ref: `A${r + 2}`, valor: f[0], desde: d, ...extra(r)},
    {ref: `B${r + 2}`, valor: f[1], desde: d, ...extra(r)},
    {ref: `C${r + 2}`, valor: f[2], desde: d, ...extra(r)},
    {ref: `D${r + 2}`, valor: moneda ? mon(f[3]) : num(f[3]), desde: d, alinear: der, ...extra(r)},
  ]),
];
const BASE = {archivo: 'Gastos enero.xlsx', hoja: 'Gastos', columnas: 5, filas: 12, anchos: {A: 160, B: 270, C: 190, D: 170, E: 130}};
const DUP = {fondo: '#FFC7CE', color: '#9C0006'};
const panel = (mensajes: {rol: 'yo' | 'ia'; texto: string; desde: Cue; duracion?: number}[], en: Cue = 0) =>
  ({en, capa: true, tipo: 'chat' as const, panel: true, titulo: 'ChatGPT (recreación)', mensajes});

export const episodio: EspecEpisodio = {
  canal: 'edwin-o',
  slug: 'chatgpt-en-excel',
  id: 'EdwinO-ChatGPTEnExcel',
  manifest: manifest as Manifest,
  escenas: {
    '01': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: gastos(RAW, 0, false, (r) => (r === 2 ? DUP : {}))}},
        panel([{rol: 'yo', texto: 'Quita los duplicados, ponle formato de moneda y hazme un resumen por categoría', desde: 'quita', duracion: 2}], 'escribes'),
        {en: 'segundos', tipo: 'hoja', hoja: {...BASE, hoja: 'Resumen', columnas: 4, anchos: {A: 240, B: 220, C: 160, D: 100}, hojas: ['Gastos', 'Resumen'], hojaActiva: [{nombre: 'Resumen', desde: 0}],
          celdas: [...['Categoría', 'Total', '%'].map((v, i) => ({ref: `${'ABC'[i]}1`, valor: v, desde: 'segundos', ...ENC})),
            ...RESUMEN.flatMap((f, r) => f.map((v, c) => ({ref: `${'ABC'[c]}${r + 2}`, valor: v, desde: `segundos+${(r * 0.2).toFixed(1)}`, ...(c > 0 ? {alinear: der} : {}), ...(r === 4 ? {negrita: true} : {})})))]}},
        {en: 'gratuito', capa: true, tipo: 'pildora', texto: '🆓 Incluso en el plan gratuito', tamano: 48},
      ],
    },
    '02': {
      bloques: [
        {en: 0, tipo: 'cortinilla', titulo: 'CHATGPT EN EXCEL'},
        {en: 'hoy', tipo: 'titulo', lineas: [{texto: 'CHATGPT', color: 'turquesa', tamano: 190}, {texto: 'EN EXCEL', color: 'amarillo', tamano: 170}], sub: 'Automatiza tus hojas'},
        {en: 'instalar', tipo: 'lista', titulo: 'Hoy aprendes…', items: [
          {texto: 'Instalarlo', desde: 'instalar', icono: '⬇️'},
          {texto: '5 tareas reales de oficina', desde: 'cinco', icono: '✅'},
          {texto: 'Permisos y privacidad', desde: 'permisos', icono: '🔒'},
          {texto: '¿ChatGPT, Copilot o Claude?', desde: 'copilot', icono: '🤔'},
        ]},
      ],
    },
    '03': {
      bloques: [
        {en: 0, tipo: 'cronologia', titulo: 'ChatGPT para Excel', items: [
          {fecha: '5 mar 2026', texto: 'Beta de ChatGPT para Excel', desde: 'marzo', icono: '🧪', color: 'turquesa'},
          {fecha: 'Abril 2026', texto: 'Llega a Google Sheets', desde: 'abril', icono: '📗', color: 'amarillo'},
          {fecha: '5 may 2026', texto: 'Todos los planes (gratis con límite)', desde: 'mayo', icono: '🌍', color: 'verde'},
        ]},
        {en: 'limitado', capa: true, tipo: 'pildora', texto: 'Fuente: OpenAI', abajo: true, tamano: 36},
      ],
    },
    '04': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '🏅', titulo: 'Microsoft Innovative Educator Expert', texto: 'La pregunta que más me hacen: "¿la IA dentro de Excel es segura con mis datos?"', ancho: 1500},
        {en: 'dos', capa: true, tipo: 'pildora', texto: 'Hoy: cómo se usa + qué pasa con tu información', abajo: true, tamano: 44},
      ],
    },
    '05': {
      paso: {n: 1, texto: 'Instálalo'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: gastos(RAW, 0), botones: ['Pegar', 'Negrita', 'Formato condicional', 'Complementos', 'ChatGPT'],
          cursor: [{a: 'tab:Inicio', desde: 'inicio', clic: true}, {a: 'btn:Complementos', desde: 'complementos', clic: true}, {a: 'btn:ChatGPT', desde: 'aparece', clic: true}],
          zoom: [{a: 'btn:Complementos', desde: 'complementos', escala: 1.5, dur: 3}]}},
        {en: 'escribe', capa: true, tipo: 'pildora', texto: '🔍 Buscar: ChatGPT → Agregar', tamano: 46, hasta: 'abres'},
        panel([{rol: 'ia', texto: 'Hola 👋 Inicia sesión con tu cuenta de ChatGPT para empezar.', desde: 'sesion'}], 'abres'),
        {en: 'web', capa: true, tipo: 'pildora', texto: '💻 Excel de escritorio y Excel para la web', abajo: true, tamano: 42, hasta: 'abres'},
      ],
    },
    '06': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [...gastos(RAW, 0, false, (r) => (r === 2 ? DUP : {})), {ref: 'C10', valor: 'Total', desde: 'total', negrita: true}, {ref: 'D10', valor: '770.000', desde: 'total', negrita: true, alinear: der}],
          resaltes: [{rango: 'A3:D4', desde: 'taxi', color: '#E30613'}, {rango: 'D2:D9', desde: 'montos', hasta: 'resumen', color: '#FF9500'}],
          globos: [{a: 'D4', texto: 'Registrado dos veces', desde: 'taxi', color: '#E30613', lado: 'derecha'}]}},
      ],
    },
    '07': {
      paso: {n: 1, prefijo: 'TAREA', texto: 'Limpia la hoja'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: gastos(RAW, 0, false, (r) => (r === 2 ? DUP : {}))}},
        panel([
          {rol: 'yo', texto: 'Quita los gastos duplicados y pon el Monto con formato de moneda', desde: 'escribo', duracion: 2},
          {rol: 'ia', texto: 'Este es mi plan:\n1. Eliminar la fila 4 (duplicada)\n2. Formato de moneda en la columna D\n¿Me das permiso para hacer estos cambios? [Permitir]', desde: 'muestra'},
        ]),
        {en: 'segun', capa: true, tipo: 'pildora', texto: '✋ Te pide permiso antes de cambiar tu hoja', tamano: 42},
      ],
    },
    '08': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [...gastos(LIMPIO, 0.3, true), {ref: 'C9', valor: 'Total', desde: 'total', negrita: true}, {ref: 'D9', valor: '$ 725.000', desde: 'total', negrita: true, alinear: der, fondo: '#FFE500'}],
          zoom: [{a: 'D9', desde: 'compruebalo', escala: 1.5}],
          globos: [{a: 'D9', texto: '770.000 − 45.000 = 725.000 ✓', desde: 'setecientos#2', color: '#1E9E4A', lado: 'abajo'}]}},
        {en: 'cuadra', capa: true, tipo: 'pildora', texto: '✅ Cuadra', tamano: 60},
      ],
    },
    '09': {
      paso: {n: 2, prefijo: 'TAREA', texto: 'Resumen por categoría'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, hoja: 'Resumen', columnas: 4, anchos: {A: 240, B: 220, C: 160, D: 100}, hojas: ['Gastos', 'Resumen'], hojaActiva: [{nombre: 'Resumen', desde: 0}],
          celdas: [...['Categoría', 'Total', '%'].map((v, i) => ({ref: `${'ABC'[i]}1`, valor: v, desde: 'resultado', ...ENC})),
            ...RESUMEN.flatMap((f, r) => f.map((v, c) => ({ref: `${'ABC'[c]}${r + 2}`, valor: v, desde: ['oficina', 'alimentacion', 'transporte', 'tecnologia', 'tecnologia+1'][r], ...(c > 0 ? {alinear: der} : {}), ...(r === 4 ? {negrita: true} : {})})))]}},
        panel([{rol: 'yo', texto: 'Crea una hoja Resumen con el total por categoría y su porcentaje. Usa fórmulas.', desde: 'pido', duracion: 2}]),
        {en: 'formulas', capa: true, tipo: 'pildora', texto: '💡 Pídele fórmulas, no números pegados', tamano: 44},
      ],
    },
    '10': {
      paso: {n: 3, prefijo: 'TAREA', texto: 'Entender una hoja ajena'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [...gastos(LIMPIO, 0, true), {ref: 'E1', valor: 'Revisión', desde: 0, ...ENC},
          ...LIMPIO.map((f, r) => ({ref: `E${r + 2}`, valor: f[3] > 100000 ? 'Revisar' : 'OK', desde: 0, ...(f[3] > 100000 ? {fondo: '#FFF3B0', negrita: true} : {})}))],
          seleccion: [{celda: 'E2', desde: 0.3}], resaltes: [{rango: 'A2:E2', desde: 'papeleria', color: '#E30613'}, {rango: 'A4:E5', desde: 'almuerzo', color: '#E30613'}]}},
        panel([
          {rol: 'yo', texto: '¿Qué hace la fórmula de la columna E?\n`=SI(D2>100000;"Revisar";"OK")`', desde: 'pregunto', duracion: 2},
          {rol: 'ia', texto: 'Marca como "Revisar" los gastos mayores de 100.000; los demás quedan "OK".', desde: 'explica'},
        ]),
      ],
    },
    '11': {
      paso: {n: 4, prefijo: 'TAREA', texto: '¿Y si…?'},
      bloques: [
        {en: 0, tipo: 'chat', titulo: 'ChatGPT (recreación)', mensajes: [{rol: 'yo', texto: '¿Qué pasa con el total si el transporte sube un 10 %?', desde: 'pasa', duracion: 1.5}]},
        {en: 'calcula', tipo: 'comparar', izq: {titulo: 'Hoy', icono: '📊', color: 'turquesa', items: [
          {texto: 'Transporte: $ 105.000', desde: 'calcula', icono: '🚕'},
          {texto: 'Total: $ 725.000', desde: 'total', icono: '🧾'},
        ]}, der: {titulo: 'Transporte +10 %', icono: '📈', color: 'amarillo', desde: 'quince', items: [
          {texto: 'Transporte: $ 115.500', desde: 'quince', icono: '🚕'},
          {texto: 'Total: $ 735.500', desde: 'treinta', icono: '🧾'},
        ]}},
        {en: 'jefes', capa: true, tipo: 'pildora', texto: '💼 Las preguntas que hacen los jefes', abajo: true, tamano: 44},
      ],
    },
    '12': {
      paso: {n: 5, prefijo: 'TAREA', texto: 'Menciona hojas con @'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: gastos(LIMPIO, 0, true), hojas: ['Gastos', 'Presupuesto', 'Resumen'], hojaActiva: [{nombre: 'Gastos', desde: 0}]}},
        panel([{rol: 'yo', texto: 'Compara @Gastos con @Presupuesto y dime qué categoría se pasó', desde: 'ejemplo', duracion: 2}]),
        {en: 'contexto', capa: true, tipo: 'pildora', texto: '🎯 Entre más contexto, mejor', tamano: 46},
      ],
    },
    '13': {
      bloques: [
        {en: 0, tipo: 'lista', titulo: 'Reglas de seguridad (ayuda de OpenAI)', items: [
          {texto: 'Revisa las fórmulas y las celdas que cambió', desde: 'revisa', icono: '👀'},
          {texto: 'Duplica el archivo antes de un cambio grande', desde: 'duplica', icono: '📄'},
          {texto: '"Pueden ser incompletas o incorrectas"', desde: 'advierte', icono: '⚠️'},
        ]},
      ],
    },
    '14': {
      bloques: [
        {en: 0, tipo: 'tarjetas', titulo: '¿Y mis datos?', items: [
          {icono: '📨', titulo: 'Qué procesa', texto: 'Tu mensaje y la parte relevante de la hoja', desde: 'procesa'},
          {icono: '🗂️', titulo: 'Chats aparte', texto: 'Separados de tu historial y sin tu memoria', desde: 'separados'},
          {icono: '🏢', titulo: 'Datos de tu empresa', texto: 'Pregunta primero si está permitido', desde: 'confidencial'},
        ]},
      ],
    },
    '15': {
      bloques: [
        {en: 0, tipo: 'tarjetas', titulo: 'Lo que todavía no hace bien', items: [
          {icono: '⚙️', titulo: 'Macros y VBA', texto: 'Pueden no estar del todo soportados', desde: 'macros'},
          {icono: '🧩', titulo: 'Fórmulas muy complejas', texto: 'Pueden necesitar tus ajustes', desde: 'complejas'},
        ]},
        {en: 'responsable', capa: true, tipo: 'pildora', texto: '👤 El responsable de la hoja sigues siendo tú', abajo: true, tamano: 44},
      ],
    },
    '16': {
      bloques: [
        {en: 0, tipo: 'tarjetas', titulo: '¿Cuál elegir?', items: [
          {icono: '💬', titulo: 'ChatGPT', texto: 'Todos sus planes (gratis con límites)', desde: 'chatgpt', color: 'turquesa'},
          {icono: '🟦', titulo: 'Copilot', texto: 'Integrado en Microsoft 365', desde: 'copilot', color: 'azul'},
          {icono: '✳️', titulo: 'Claude', texto: 'Complemento para planes de pago', desde: 'claude', color: 'naranja'},
        ]},
        {en: 'duelo', capa: true, tipo: 'pildora', texto: '⚔️ En el duelo: las dos aciertan en fórmulas', abajo: true, tamano: 44},
      ],
    },
    '17': {
      bloques: [
        {en: 0, tipo: 'lista', titulo: 'Mis 4 hábitos', items: [
          {texto: 'Primero, que me diga su plan', desde: 'uno', icono: '🗺️'},
          {texto: 'Una tarea por mensaje', desde: 'dos', icono: '1️⃣'},
          {texto: 'Fórmulas, no números pegados', desde: 'tres', icono: '🧮'},
          {texto: 'Compruebo un total a mano', desde: 'cuatro#2', icono: '✅'},
        ]},
      ],
    },
    '18': {
      bloques: [
        {en: 0, tipo: 'lista', titulo: '5 prompts para copiar', items: [
          {texto: 'Limpia esta hoja: espacios, mayúsculas y duplicados', desde: 'limpia', icono: '🧹'},
          {texto: 'Crea una tabla de amortización (monto, tasa, meses)', desde: 'amortizacion', icono: '🏦'},
          {texto: 'Explícame esta hoja como si yo fuera nuevo', desde: 'explicame', icono: '🧑‍🏫'},
          {texto: '¿Qué fórmulas dan error y por qué?', desde: 'error', icono: '🐞'},
          {texto: 'Hazme un presupuesto mensual con categorías', desde: 'presupuesto', icono: '📅'},
        ]},
        {en: 'descripcion', capa: true, tipo: 'pildora', texto: '📌 También en la descripción', tamano: 42},
      ],
    },
    '19': {
      bloques: [
        {en: 0, tipo: 'errores', titulo: 'Si no te funcionó', items: [
          {mal: 'No aparece en Complementos', bien: 'Tu empresa bloquea la tienda: pídeselo al administrador', desde: 'aparece'},
          {mal: '"Se acabó el uso"', bien: 'Es el límite del plan gratuito', desde: 'acabo'},
          {mal: 'No hace lo que pedí', bien: 'Sé más específico y menciona hojas con @', desde: 'especifico'},
        ]},
      ],
    },
    '20': {
      bloques: [
        {en: 0, tipo: 'resumen', ideas: [
          {texto: 'Inicio → Complementos → ChatGPT', desde: 'instalalo'},
          {texto: 'Te pide permiso antes de cambiar', desde: 'permiso'},
          {texto: 'Tú verificas fórmulas y totales', desde: 'verificas'},
        ]},
        {en: 'aprendes', tipo: 'titulo', lineas: [{texto: 'SI NO LO APRENDES', color: 'blanco', tamano: 130}, {texto: 'AHORA, TE EXTINGUES', color: 'amarillo', tamano: 150}]},
      ],
    },
    '21': {
      bloques: [
        {en: 0, tipo: 'tienda'},
        {en: 'todavia', tipo: 'cierre', siguiente: 'ChatGPT vs Claude: el duelo', suscribir: 'suscribete', web: 'todavia+0.5'},
      ],
    },
  },
  shorts: [
    {id: 'short-1', escena: '07', gancho: [{texto: 'ChatGPT limpia', color: 'blanco', tamano: 100}, {texto: 'TU EXCEL', color: 'amarillo', tamano: 150}, {texto: '(y te pide permiso)', color: 'blanco', tamano: 80}]},
    {id: 'short-2', escena: '10', gancho: [{texto: '¿Heredaste un Excel', color: 'blanco', tamano: 96}, {texto: 'QUE NO ENTIENDES?', color: 'amarillo', tamano: 120}]},
  ],
  miniatura: {
    lineas: [{texto: 'CHATGPT', color: 'turquesa'}, {texto: 'DENTRO DE', color: 'blanco', tamano: 100}, {texto: 'EXCEL', color: 'amarillo'}],
    pildora: 'Automatiza tus hojas',
    insignia: 'GRATIS',
    filas: [['Categoría', 'Total', '%'], ['Oficina', '$ 330.000', '45,5 %'], ['Alimentación', '$ 215.000', '29,7 %'], ['Transporte', '$ 105.000', '14,5 %']],
    resaltarFila: 1,
  },
};
