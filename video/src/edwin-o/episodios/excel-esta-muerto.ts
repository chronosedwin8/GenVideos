import type {EspecEpisodio} from '../../comun/motor-tipos';
import type {Manifest} from '../../comun/tipos';
import manifest from '../../../public/edwin-o/excel-esta-muerto/manifest.json';

/* Hechos con fuente en canales/edwin-o/episodios/excel-esta-muerto/ficha.md */
const ENC = {negrita: true, fondo: '#E9F3EC'};
const der = 'right' as const;
const VENTAS = [
  ['Ana', 'Norte', 'Laptop', '1.200'],
  ['Luis', 'Sur', 'Mouse', '35'],
  ['Marta', 'Norte', 'Monitor', '310'],
  ['Pedro', 'Centro', 'Laptop', '1.150'],
  ['Ana', 'Sur', 'Teclado', '60'],
  ['Sofía', 'Centro', 'Monitor', '295'],
  ['Luis', 'Norte', 'Laptop', '1.250'],
  ['Marta', 'Sur', 'Mouse', '40'],
];
const tablaVentas = [
  ...['Vendedor', 'Región', 'Producto', 'Monto'].map((v, i) => ({ref: `${'ABCD'[i]}1`, valor: v, desde: 0, ...ENC})),
  ...VENTAS.flatMap((f, i) => f.map((v, j) => ({ref: `${'ABCD'[j]}${i + 2}`, valor: v, desde: 0, ...(j === 3 ? {alinear: der} : {})}))),
];
const COMENTARIOS = ['Llegó rápido y bien empacado', 'Excelente atención', 'El producto superó lo esperado', 'Entrega a tiempo', 'Muy buen servicio'];

export const episodio: EspecEpisodio = {
  canal: 'edwin-o',
  slug: 'excel-esta-muerto',
  id: 'EdwinO-ExcelEstaMuerto',
  manifest: manifest as Manifest,
  escenas: {
    '01': {
      fondo: 'oscuro',
      bloques: [
        {en: 0, tipo: 'titulo', lineas: [{texto: '“EXCEL', color: 'amarillo', tamano: 200}, {texto: 'VA A MORIR”', color: 'rojo', tamano: 200}], sub: 'Lo escuché mil veces este año'},
        {en: 'inteligencia', tipo: 'cuadricula', titulo: 'La IA ya…', items: [
          {icono: '📄', texto: 'Hace hojas de cálculo', desde: 'hojas'},
          {icono: '✍️', texto: 'Escribe fórmulas', desde: 'formulas'},
          {icono: '📊', texto: 'Arma gráficos', desde: 'graficos'},
        ]},
        {en: 'entonces', tipo: 'titulo', lineas: [{texto: '¿Vale la pena seguir', color: 'blanco', tamano: 110}, {texto: 'APRENDIENDO EXCEL?', color: 'amarillo', tamano: 170}]},
        {en: 'hoy', tipo: 'titulo', lineas: [{texto: 'Mi respuesta,', color: 'blanco', tamano: 130}, {texto: 'CON DATOS', color: 'turquesa', tamano: 230}]},
      ],
    },
    '02': {
      bloques: [
        {en: 0, tipo: 'cortinilla', titulo: '¿Excel está muerto?'},
        {en: 'hoy', tipo: 'lista', titulo: 'Hoy, sin humo:', items: [
          {texto: '5 cosas que SÍ cambiaron', desde: 'cinco', icono: '🔥'},
          {texto: '1 que NO cambió para nada', desde: 'una', icono: '🧱'},
          {texto: 'Lo que yo haría desde cero', desde: 'cero', icono: '🧭'},
        ]},
      ],
    },
    '03': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'cifra', valor: '40 años', texto: 'Excel los cumplió en septiembre de 2025', fuente: 'Microsoft 365 Insider Blog'},
        {en: 'sobrevivio', tipo: 'cronologia', items: [
          {fecha: 'Internet', texto: 'Sobrevivió', desde: 'internet', icono: '🌐'},
          {fecha: 'Celulares', texto: 'Sobrevivió', desde: 'celulares', icono: '📱', color: 'turquesa'},
          {fecha: 'La nube', texto: 'Sobrevivió', desde: 'nube', icono: '☁️', color: 'verde'},
          {fecha: '¿La IA?', texto: 'Ahora le toca', desde: 'inteligencia', icono: '🤖', color: 'rojo'},
        ]},
        {en: 'ultimos', tipo: 'titulo', lineas: [{texto: 'Cambió más en 2 años', color: 'blanco', tamano: 130}, {texto: 'QUE EN LOS 20 ANTERIORES', color: 'amarillo', tamano: 140}]},
      ],
    },
    '04': {
      bloques: [
        {en: 0, tipo: 'numero', n: 1, total: 5, texto: 'La IA trabaja dentro de Excel'},
        {en: 'abril', tipo: 'hoja', hoja: {archivo: 'Ventas.xlsx', hoja: 'Ventas', columnas: 7, anchos: {A: 160, B: 140, C: 160, D: 130, E: 40, F: 150, G: 140}, celdas: [
          ...tablaVentas,
          {ref: 'F1', valor: 'Región', desde: 'panel+1', ...ENC}, {ref: 'G1', valor: 'Total', desde: 'panel+1', ...ENC},
          {ref: 'F2', valor: 'Norte', desde: 'panel+1.2'}, {ref: 'G2', valor: '2.760', desde: 'panel+1.2', alinear: der, fondo: '#DFF7E7'},
          {ref: 'F3', valor: 'Sur', desde: 'panel+1.4'}, {ref: 'G3', valor: '135', desde: 'panel+1.4', alinear: der, fondo: '#DFF7E7'},
          {ref: 'F4', valor: 'Centro', desde: 'panel+1.6'}, {ref: 'G4', valor: '1.445', desde: 'panel+1.6', alinear: der, fondo: '#DFF7E7'},
        ]}},
        {en: 'abril', hasta: 'empresas', capa: true, tipo: 'chat', panel: true, titulo: 'Copilot', mensajes: [
          {rol: 'yo', texto: 'Resume las ventas por región', desde: 'responden', duracion: 1.5},
          {rol: 'ia', texto: 'Listo: agregué un resumen por región en F1:G4.', desde: 'panel'},
        ]},
        {en: 'empresas', tipo: 'tarjeta', icono: '📅', titulo: '22 de abril de 2026', texto: 'Disponibilidad general. También en Microsoft 365 Personal y Familia.', fuente: 'Blog de Microsoft Copilot'},
        {en: 'tarde', tipo: 'titulo', lineas: [{texto: 'Una tarde de trabajo', color: 'blanco', tamano: 120}, {texto: 'EN UNA FRASE', color: 'amarillo', tamano: 210}]},
      ],
    },
    '05': {
      bloques: [
        {en: 0, tipo: 'numero', n: 2, total: 5, texto: 'La IA salió de las celdas'},
        {en: 'microsoft', tipo: 'hoja', hoja: {archivo: 'Encuesta.xlsx', hoja: 'Comentarios', columnas: 3, anchos: {A: 520, B: 620, C: 100}, celdas: [
          {ref: 'A1', valor: 'Comentario', desde: 0, ...ENC}, {ref: 'B1', valor: 'Resumen', desde: 0, ...ENC},
          ...COMENTARIOS.map((c, i) => ({ref: `A${i + 2}`, valor: c, desde: 0})),
          {ref: 'B2', valor: 'Clientes satisfechos con la entrega', desde: 'funcion', hasta: 'retiro'},
          {ref: 'B2', valor: '#¿NOMBRE?', desde: 'retiro', fondo: '#FFC7CE', color: '#9C0006', negrita: true},
        ], escritura: [{celda: 'B2', texto: '=COPILOT("Resume los comentarios";A2:A6)', desde: 'microsoft+0.6', duracion: 1.4, enter: 'funcion'}],
        zoom: [{a: 'B2', desde: 'retiro', escala: 1.5}],
        globos: [{a: 'B2', texto: '14 sep 2026: retirada', desde: 'septiembre', color: '#E30613', lado: 'abajo'}]}},
        {en: 'dice', tipo: 'lista', titulo: 'Lo que nos dice', items: [
          {texto: 'La IA te ayuda desde un panel', desde: 'panel', icono: '🤖'},
          {texto: 'En la celda: fórmulas normales', desde: 'celda', icono: '🧮'},
          {texto: 'Siempre el mismo resultado', desde: 'resultado', icono: '🔁'},
        ]},
      ],
    },
    '06': {
      bloques: [
        {en: 0, tipo: 'numero', n: 3, total: 5, texto: 'Python dentro de Excel'},
        {en: 'escribes', tipo: 'codigo', archivo: 'Celda =PY( ) en Excel', velocidad: 22, tamano: 40, codigo: 'df = xl("Ventas[#All]", headers=True)\ndf.groupby("Región")["Monto"].sum()'},
        {en: 'nube', tipo: 'tarjetas', items: [
          {icono: '☁️', titulo: 'En la nube', texto: 'Se ejecuta en Microsoft Cloud, con bibliotecas de Anaconda.', desde: 'nube'},
          {icono: '🏢', titulo: 'Empresas', texto: 'Ya disponible.', desde: 'empresas', color: 'verde'},
          {icono: '🏠', titulo: 'Personal y Familia', texto: 'En vista previa.', desde: 'personales', color: 'magenta'},
        ]},
        {en: 'tutorial', capa: true, tipo: 'pildora', texto: '📅 Tutorial completo: martes 22 de diciembre', tamano: 46},
      ],
    },
    '07': {
      bloques: [
        {en: 0, tipo: 'numero', n: 4, total: 5, texto: 'Las fórmulas son un lenguaje'},
        {en: 'filtrar', tipo: 'cuadricula', items: [
          {icono: '🧹', texto: 'FILTRAR', desde: 'filtrar'},
          {icono: '✨', texto: 'UNICOS', desde: 'unicos'},
          {icono: '🏷️', texto: 'LET', desde: 'let'},
          {icono: 'λ', texto: 'LAMBDA', desde: 'lambda'},
        ]},
        {en: 'propias', tipo: 'formula', titulo: 'Tu propia función', formula: '=LAMBDA(precio;precio*1,19)', partes: [
          {texto: 'precio', nota: 'Lo que recibe', desde: 'propias+0.6'},
          {texto: 'precio*1,19', nota: 'Lo que calcula (IVA 19 %)', desde: 'nombre'},
        ]},
        {en: 'dejo', tipo: 'titulo', lineas: [{texto: 'Ya no es una calculadora:', color: 'blanco', tamano: 110}, {texto: 'ES UNA HERRAMIENTA', color: 'amarillo', tamano: 180}]},
      ],
    },
    '08': {
      bloques: [
        {en: 0, tipo: 'numero', n: 5, total: 5, texto: 'Cambió lo que debes saber'},
        {en: 'antes', tipo: 'comparar', izq: {titulo: 'Antes ganaba…', icono: '📚', items: [
          {texto: 'Quien memorizaba fórmulas', desde: 'memorizaba'},
          {texto: 'Quien sabía dónde estaba cada botón', desde: 'boton'},
        ]}, der: {titulo: 'Hoy gana…', icono: '🧠', desde: 'hoy', items: [
          {texto: 'Quien entiende sus datos', desde: 'entiende'},
          {texto: 'Quien sabe qué pedirle a la IA', desde: 'pedirle'},
          {texto: 'Quien verifica el resultado', desde: 'verificar'},
        ]}},
      ],
    },
    '09': {
      bloques: [
        {en: 0, tipo: 'comparar', titulo: 'El análisis del mes', izq: {titulo: 'Antes', icono: '🐢', items: [
          {texto: 'Filtrar', desde: 'filtrabas'},
          {texto: 'Tabla dinámica', desde: 'armabas'},
          {texto: 'Gráfico', desde: 'grafico'},
          {texto: 'Copiar al correo', desde: 'copiabas'},
        ]}, der: {titulo: 'Ahora', icono: '🚀', desde: 'ahora', items: [
          {texto: 'Pides el análisis a la IA', desde: 'pides'},
          {texto: 'Revisas con una tabla de control', desde: 'revisas'},
          {texto: 'Decides y recomiendas', desde: 'decides'},
        ]}},
        {en: 'valor', tipo: 'titulo', lineas: [{texto: 'De HACER…', color: 'blanco', tamano: 150}, {texto: 'a REVISAR Y DECIDIR', color: 'amarillo', tamano: 170}]},
      ],
    },
    '10': {
      fondo: 'oscuro',
      bloques: [
        {en: 0, tipo: 'titulo', lineas: [{texto: 'Lo que NO cambió:', color: 'blanco', tamano: 120}, {texto: 'LA IA SE EQUIVOCA', color: 'rojo', tamano: 190}]},
        {en: 'encuesta', tipo: 'cifra', valor: '46 %', texto: 'desconfía de la precisión de la IA', fuente: 'Stack Overflow Developer Survey 2025', color: 'rojo'},
        {en: 'queja', tipo: 'cifra', valor: '66 %', texto: 'Lo que más molesta: respuestas “casi correctas”', fuente: 'Stack Overflow Developer Survey 2025'},
        {en: 'nomina', tipo: 'titulo', lineas: [{texto: 'Casi correcto =', color: 'blanco', tamano: 130}, {texto: 'ALGUIEN COBRA MAL', color: 'amarillo', tamano: 180}]},
      ],
    },
    '11': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '🏫', titulo: 'Lo que veo en clase', texto: '“Quien no entiende un rango o el signo $, le cree todo a la IA.”', color: 'magenta'},
        {en: 'cambio', tipo: 'titulo', lineas: [{texto: 'Con lo básico, la IA es', color: 'blanco', tamano: 110}, {texto: 'UN TURBO 🚀', color: 'amarillo', tamano: 230}]},
      ],
    },
    '12': {
      bloques: [
        {en: 0, tipo: 'titulo', lineas: [{texto: 'Las empresas', color: 'blanco', tamano: 130}, {texto: 'PIENSAN IGUAL', color: 'amarillo', tamano: 220}]},
        {en: 'siete', tipo: 'cifra', valor: '7 de cada 10', texto: 'empresas: el pensamiento analítico es la habilidad central', fuente: 'Foro Económico Mundial, Future of Jobs Report 2025'},
        {en: 'crecen', tipo: 'cuadricula', titulo: 'Lo que más crece', items: [
          {icono: '🤖', texto: 'Inteligencia artificial', desde: 'inteligencia'},
          {icono: '📊', texto: 'Manejo de datos', desde: 'datos'},
        ]},
        {en: 'fijate', tipo: 'titulo', lineas: [{texto: 'No es IA o Excel:', color: 'blanco', tamano: 120}, {texto: 'ES IA Y DATOS', color: 'turquesa', tamano: 220}]},
      ],
    },
    '13': {
      bloques: [
        {en: 0, tipo: 'titulo', lineas: [{texto: 'Mi veredicto', color: 'blanco', tamano: 150}]},
        {en: 'muerto', tipo: 'titulo', lineas: [{texto: 'EXCEL NO ESTÁ', color: 'blanco', tamano: 150}, {texto: 'MUERTO', color: 'verde', tamano: 300}]},
        {en: 'murio', tipo: 'lista', titulo: 'Lo que sí murió', items: [
          {texto: 'Memorizar', desde: 'memorizar', icono: '❌'},
          {texto: 'Copiar y pegar', desde: 'copiar', icono: '❌'},
          {texto: 'Hacerlo todo a mano', desde: 'mano', icono: '❌'},
        ]},
        {en: 'gana', tipo: 'titulo', lineas: [{texto: 'Cambió', color: 'blanco', tamano: 130}, {texto: 'QUIÉN GANA CON ÉL', color: 'amarillo', tamano: 180}]},
        {en: 'digo', tipo: 'titulo', lineas: [{texto: 'Si no lo aprendes ahora,', color: 'blanco', tamano: 110}, {texto: 'TE EXTINGUES', color: 'rojo', tamano: 210}]},
      ],
    },
    '14': {
      paso: {n: 1, texto: 'Domina lo esencial', en: 'uno'},
      bloques: [
        {en: 0, tipo: 'titulo', lineas: [{texto: '¿Qué haría yo', color: 'blanco', tamano: 130}, {texto: 'DESDE CERO?', color: 'amarillo', tamano: 230}]},
        {en: 'esencial', tipo: 'cuadricula', items: [
          {icono: '💲', texto: 'Referencias relativas y absolutas', desde: 'referencias'},
          {icono: '📋', texto: 'Tablas', desde: 'tablas'},
          {icono: '🔎', texto: 'BUSCARX', desde: 'buscarx'},
          {icono: '🧹', texto: 'FILTRAR', desde: 'filtrar'},
          {icono: '📊', texto: 'Tablas dinámicas', desde: 'dinamicas'},
        ]},
        {en: 'detectar', tipo: 'titulo', lineas: [{texto: 'Y detectas cuándo', color: 'blanco', tamano: 130}, {texto: 'SE EQUIVOCA', color: 'amarillo', tamano: 230}]},
      ],
    },
    '15': {
      paso: {n: 2, texto: 'Pide y verifica'},
      bloques: [
        {en: 0, tipo: 'tarjetas', items: [
          {icono: '✍️', titulo: 'El prompt de 5 partes', texto: 'Para pedir fórmulas que sí funcionan.', desde: 'metodo'},
          {icono: '🧪', titulo: 'Los casos del límite', texto: 'Prueba siempre los valores frontera.', desde: 'limite', color: 'verde'},
        ]},
        {en: 'descripcion', capa: true, tipo: 'pildora', texto: '📌 El video está en la descripción', abajo: true, tamano: 50},
        {en: 'oro', tipo: 'titulo', lineas: [{texto: 'Saber pedir y verificar', color: 'blanco', tamano: 120}, {texto: 'VALE ORO', color: 'dorado', tamano: 260}]},
      ],
    },
    '16': {
      paso: {n: 3, texto: 'Automatiza'},
      bloques: [
        {en: 0, tipo: 'cuadricula', titulo: 'Lo que repites cada semana', items: [
          {icono: '🐍', texto: 'Python', desde: 'python'},
          {icono: '🔄', texto: 'Power Query', desde: 'power'},
          {icono: '⚙️', texto: 'Macros', desde: 'macros'},
        ]},
        {en: 'doce', tipo: 'cifra', valor: '12 reportes', texto: 'en segundos, con 12 líneas de Python', color: 'turquesa'},
        {en: 'imprescindible', tipo: 'titulo', lineas: [{texto: 'Eso te hace', color: 'blanco', tamano: 130}, {texto: 'IMPRESCINDIBLE', color: 'amarillo', tamano: 210}]},
      ],
    },
    '17': {
      bloques: [
        {en: 0, tipo: 'lista', titulo: '3 señales de que vas bien', items: [
          {texto: 'Explicas cada fórmula de tu hoja', desde: 'explicar'},
          {texto: 'Revisas los totales con un segundo método', desde: 'revisas'},
          {texto: 'Automatizaste una tarea este mes', desde: 'automatizaste'},
        ]},
        {en: 'reemplazar', tipo: 'titulo', lineas: [{texto: 'La IA no te reemplaza:', color: 'blanco', tamano: 120}, {texto: 'TE POTENCIA', color: 'amarillo', tamano: 240}]},
      ],
    },
    '18': {
      fondo: 'oscuro',
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '🔒', titulo: 'Cuidado con tus datos', texto: '¿La IA es pública o la aprobó tu empresa? Nada de cédulas, salarios ni datos de clientes en herramientas públicas.', color: 'rojo'},
        {en: 'productividad', tipo: 'titulo', lineas: [{texto: 'La productividad no vale', color: 'blanco', tamano: 110}, {texto: 'UN PROBLEMA DE SEGURIDAD', color: 'amarillo', tamano: 130}]},
      ],
    },
    '19': {
      bloques: [
        {en: 0, tipo: 'titulo', lineas: [{texto: '¿Excel está muerto?', color: 'blanco', tamano: 130}, {texto: '💬 ¿TÚ QUÉ OPINAS?', color: 'amarillo', tamano: 170}]},
        {en: 'compartelo', tipo: 'tarjeta', icono: '📤', titulo: 'Compártelo', texto: 'Con ese compañero que todavía dice que Excel ya no sirve.', color: 'verde'},
        {en: 'proximo', tipo: 'cierre', siguiente: 'AGRUPARPOR: resúmenes con una fórmula', suscribir: 'suscribete'},
      ],
    },
  },
  shorts: [
    {id: 'short-1', escena: '10', gancho: [{texto: 'La IA se equivoca', color: 'blanco', tamano: 100}, {texto: 'Y HAY DATOS', color: 'amarillo', tamano: 150}]},
    {id: 'short-2', escena: '13', gancho: [{texto: '¿Excel está', color: 'blanco', tamano: 110}, {texto: 'MUERTO?', color: 'rojo', tamano: 190}]},
  ],
  miniatura: {
    lineas: [{texto: '¿EXCEL ESTÁ', color: 'amarillo'}, {texto: 'MUERTO?', color: 'rojo'}, {texto: 'con la IA', color: 'turquesa', tamano: 96}],
    pildora: '2026',
    insignia: 'MI VEREDICTO',
    formula: '=COPILOT(…) → #¿NOMBRE?',
    filas: [['Antes', 'Ahora'], ['Memorizar', 'Verificar'], ['Copiar', 'Automatizar']],
    resaltarFila: 2,
  },
};
