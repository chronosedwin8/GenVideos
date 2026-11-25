import type {EspecEpisodio} from '../../comun/motor-tipos';
import type {Manifest} from '../../comun/tipos';
import manifest from '../../../public/edwin-o/duelo-chatgpt-claude/manifest.json';
import {BASE, F_CLAUDE_LINEAS, F_IA_LINEAS, RESUMEN, resultado} from './datos-combinar';

/* Prueba real del 25 nov 2026: respuestas y pruebas en canales/edwin-o/episodios/duelo-chatgpt-claude/codigo/.
   No se usan logotipos: solo los nombres de cada asistente. */
const ROJO_T = '#FF6B6B';
const VERDE = '#7CFC9A';
const PROMPT =
  'Tengo un libro de Excel 365 en español (el separador de argumentos es punto y coma).\nHoja "Ene", rango A1:C7: Pedido;Cliente;Monto · P-101;C-01;1200 …\nHoja "Feb": … P-201;C-02 ;640 · P-202;C-06;820 …\nHoja "Clientes", rango A1:C6: ID;Nombre;Ciudad …\nNecesito tres cosas: 1) Una sola fórmula para A2… 2) ¿Problemas en los datos? 3) ¿Total por ciudad?';

export const episodio: EspecEpisodio = {
  canal: 'edwin-o',
  slug: 'duelo-chatgpt-claude',
  id: 'EdwinO-DueloChatGPTClaude',
  manifest: manifest as Manifest,
  escenas: {
    '01': {
      bloques: [
        {en: 0, tipo: 'titulo', lineas: [{texto: 'CHATGPT', color: 'turquesa', tamano: 180}, {texto: 'VS', color: 'amarillo', tamano: 220}, {texto: 'CLAUDE', color: 'naranja', tamano: 180}]},
        {en: 'pregunta', capa: true, tipo: 'pildora', texto: 'Misma pregunta · mismos datos · todo probado', tamano: 46},
        {en: 'fantasma', capa: true, tipo: 'pildora', texto: '👻 Las dos encontraron al cliente fantasma…', abajo: true, tamano: 44, hasta: 'codigo'},
        {en: 'codigo', capa: true, tipo: 'pildora', texto: '❓ …pero una me dio código que NO funcionaba', abajo: true, tamano: 44},
      ],
    },
    '02': {
      bloques: [
        {en: 0, tipo: 'cortinilla', titulo: 'EL DUELO'},
        {en: 'duelo', tipo: 'titulo', lineas: [{texto: '⚔️ EL DUELO', color: 'amarillo', tamano: 200}], sub: 'ChatGPT vs Claude en Excel'},
        {en: 'reglas', tipo: 'lista', titulo: 'Hoy ves…', items: [
          {texto: 'Las reglas', desde: 'reglas', icono: '📏'},
          {texto: '5 rondas', desde: 'rondas', icono: '🥊'},
          {texto: 'El marcador final', desde: 'marcador', icono: '🏆'},
          {texto: 'Cuál te conviene a ti', desde: 'conviene', icono: '🤔'},
        ]},
      ],
    },
    '03': {
      bloques: [
        {en: 0, tipo: 'tarjetas', titulo: 'Las reglas', items: [
          {icono: '💬', titulo: 'ChatGPT', texto: 'Plan gratuito · modelo por defecto', desde: 'chatgpt', color: 'turquesa'},
          {icono: '✳️', titulo: 'Claude', texto: 'Plan Pro · modelo Opus 5.5', desde: 'claude', color: 'naranja'},
        ]},
        {en: 'veinticinco', capa: true, tipo: 'pildora', texto: '📅 25 nov 2026 · chat nuevo · el MISMO mensaje', tamano: 44},
        {en: 'iguales', capa: true, tipo: 'pildora', texto: '⚖️ No son planes iguales: lo tendremos en cuenta', abajo: true, tamano: 42},
      ],
    },
    '04': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, hoja: 'Resumen', hojaActiva: [{nombre: 'Ene', desde: 0}, {nombre: 'Feb', desde: 'febrero'}, {nombre: 'Clientes', desde: 'clientes'}], celdas: []}},
        {en: 'cosas', tipo: 'lista', titulo: 'El reto', items: [
          {texto: 'UNA fórmula: Ene + Feb con nombre y ciudad', desde: 'formula', icono: '1️⃣'},
          {texto: '¿Problemas en los datos?', desde: 'problemas', icono: '2️⃣'},
          {texto: 'Total vendido por ciudad', desde: 'total', icono: '3️⃣'},
        ]},
        {en: 'trampas', capa: true, tipo: 'pildora', texto: '🪤 2 trampas: un espacio invisible y un cliente que no existe', abajo: true, tamano: 40},
      ],
    },
    '05': {
      bloques: [
        {en: 0, tipo: 'chat', titulo: 'El mensaje exacto (para las dos)', mensajes: [{rol: 'yo', texto: PROMPT, desde: 'pregunte', duracion: 3}]},
        {en: 'version', capa: true, tipo: 'pildora', texto: '1️⃣ Versión y separador', tamano: 44, hasta: 'despues'},
        {en: 'despues', capa: true, tipo: 'pildora', texto: '2️⃣ Los datos tal cual (con el espacio)', tamano: 44, hasta: 'final'},
        {en: 'final', capa: true, tipo: 'pildora', texto: '3️⃣ Tres pedidos numerados', tamano: 44},
        {en: 'contexto', capa: true, tipo: 'pildora', texto: '💡 Con contexto, la IA no adivina', abajo: true, tamano: 46},
      ],
    },
    '06': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '🍎', titulo: 'Mi criterio de profe', texto: 'No gana la respuesta más bonita: gana la que funciona cuando la pruebas.', ancho: 1500},
        {en: 'cada', tipo: 'tarjetas', items: [
          {icono: '🟩', titulo: 'Cada fórmula', texto: 'Pegada en Excel 365 real', desde: 'formula'},
          {icono: '🐍', titulo: 'Cada código', texto: 'Ejecutado en Python', desde: 'codigo'},
        ]},
      ],
    },
    '07': {
      paso: {n: 1, prefijo: 'RONDA', texto: 'La fórmula'},
      bloques: [
        {en: 0, tipo: 'codigo', archivo: 'ChatGPT · respondió en segundos', codigo: F_IA_LINEAS, velocidad: 140, tamano: 34},
        {en: 'claude', tipo: 'codigo', archivo: 'Claude · con nombres para cada paso', codigo: F_CLAUDE_LINEAS, velocidad: 140, tamano: 34},
        {en: 'larga', capa: true, tipo: 'pildora', texto: 'Más larga… pero más fácil de leer', abajo: true, tamano: 44},
      ],
    },
    '08': {
      paso: {n: 1, prefijo: 'RONDA', texto: 'La prueba en Excel'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, hoja: 'Resumen', hojaActiva: [{nombre: 'Resumen', desde: 0}], celdas: resultado(0.3),
          resaltes: [{rango: 'A2:E13', desde: 'funcionan', hasta: 'detalle', color: '#1E9E4A'}, {rango: 'A13:E13', desde: 'trece', color: '#1F6FEB'}],
          zoom: [{a: 'C11', desde: 'detalle', escala: 1.35}],
          globos: [{a: 'E13', texto: 'ChatGPT dijo "hasta E14"… es E13', desde: 'catorce', color: '#1F6FEB', lado: 'derecha'}]}},
        {en: 'empate', capa: true, tipo: 'pildora', texto: '🤝 Ronda 1: EMPATE', tamano: 56},
      ],
    },
    '09': {
      paso: {n: 2, prefijo: 'RONDA', texto: 'Problemas en los datos'},
      bloques: [
        {en: 0, tipo: 'comparar', izq: {titulo: 'ChatGPT', icono: '💬', color: 'turquesa', items: [
          {texto: '"C-02 " con espacio', desde: 'espacio', icono: '✓'},
          {texto: 'C-06 no existe', desde: 'existe', icono: '✓'},
        ]}, der: {titulo: 'Claude', icono: '✳️', color: 'naranja', items: [
          {texto: 'Las dos trampas', desde: 'trampas'},
          {texto: 'Espacios duros (web)', desde: 'duros'},
          {texto: 'Montos como texto', desde: 'texto'},
          {texto: 'Rangos fijos → Ctrl+T', desde: 'fijos'},
        ]}},
        {en: 'claude#2', capa: true, tipo: 'pildora', texto: '🏅 Ronda 2: CLAUDE', abajo: true, tamano: 52},
      ],
    },
    '10': {
      paso: {n: 3, prefijo: 'RONDA', texto: 'Total por ciudad'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, hoja: 'Resumen', hojaActiva: [{nombre: 'Resumen', desde: 0}],
          celdas: [...resultado(0), ...RESUMEN.flatMap(([c, v], i) => [
            {ref: `G${i + 2}`, valor: c, desde: `bogota+${(i * 0.6).toFixed(1)}`, ...(c === 'Total' ? {negrita: true} : {})},
            {ref: `H${i + 2}`, valor: v, desde: `bogota+${(i * 0.6).toFixed(1)}`, alinear: 'right', fondo: '#DFF7E7'},
          ])], zoom: [{a: 'G4', desde: 'bogota', escala: 1.5}]}},
        {en: 'sumar', tipo: 'comparar', izq: {titulo: 'ChatGPT', icono: '💬', color: 'turquesa', items: [{texto: '`SUMAR.SI` + ciudades a mano', desde: 'sumar', icono: '✓'}]},
          der: {titulo: 'Claude', icono: '✳️', color: 'naranja', desde: 'claude', items: [{texto: '`AGRUPARPOR` automático', desde: 'agruparpor'}]}},
        {en: 'empate', capa: true, tipo: 'pildora', texto: '🤝 Ronda 3: EMPATE', abajo: true, tamano: 52},
      ],
    },
    '11': {
      paso: {n: 4, prefijo: 'RONDA', texto: 'El código de Python'},
      fondo: 'oscuro',
      bloques: [
        {en: 0, tipo: 'terminal', titulo: 'Código de ChatGPT', lineas: [
          {texto: '$ python chatgpt_codigo.py', desde: 'ejecute'},
          {texto: 'Traceback (most recent call last):', desde: 'fallo', color: ROJO_T},
          {texto: '    df["Cliente"] = df["Cliente"].astype(str).str.strip()', desde: 'fallo+0.3', color: ROJO_T},
          {texto: "KeyError: 'Cliente'", desde: 'clave', color: ROJO_T},
          {texto: '# en la hoja Clientes la columna se llama ID', desde: 'llama', color: '#999'},
        ]},
        {en: 'claude', tipo: 'terminal', titulo: 'Código de Claude', lineas: [
          {texto: '$ python ventas_por_ciudad.py', desde: 'claude'},
          {texto: "Aviso: clientes sin registro en 'Clientes': C-06", desde: 'claude+0.4', color: '#FFE500'},
          {texto: 'Total por ciudad:', desde: 'claude+0.8'},
          {texto: 'Bogotá 4380 · Medellín 4020 · Cali 1550', desde: 'primera', color: VERDE},
        ]},
      ],
    },
    '12': {
      paso: {n: 4, prefijo: 'RONDA', texto: 'Para ser justos'},
      bloques: [
        {en: 0, tipo: 'tarjetas', items: [
          {icono: '💬', titulo: 'ChatGPT', texto: 'Al final de su respuesta reconoció el error y dio la corrección: con ella, funciona.', desde: 'chatgpt', color: 'turquesa'},
          {icono: '✳️', titulo: 'Claude', texto: 'Creó un archivo de prueba y ejecutó su código ANTES de responder.', desde: 'claude', color: 'naranja'},
        ]},
        {en: 'cuatro', capa: true, tipo: 'pildora', texto: '🏅 Ronda 4: CLAUDE', abajo: true, tamano: 52},
      ],
    },
    '13': {
      paso: {n: 5, prefijo: 'RONDA', texto: 'La pregunta de analista'},
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '❓', titulo: '¿Quién compró más en febrero?', texto: '¿Y cuánto cambió frente a enero?', ancho: 1400},
        {en: 'marta', tipo: 'cifra', valor: '+600 %', texto: 'Marta Díaz: 300 → 2.100 (7 veces más)', color: 'amarillo'},
        {en: 'chatgpt', tipo: 'tarjetas', items: [
          {icono: '💬', titulo: 'ChatGPT', texto: '+ conclusión comercial', desde: 'chatgpt', color: 'turquesa'},
          {icono: '✳️', titulo: 'Claude', texto: '+ "C-06 no entra en la comparación"', desde: 'claude', color: 'naranja'},
        ]},
        {en: 'empate', capa: true, tipo: 'pildora', texto: '🤝 Ronda 5: EMPATE', abajo: true, tamano: 52},
      ],
    },
    '14': {
      paso: {n: '⚡', prefijo: 'EXTRA', texto: 'Rapidez y presentación'},
      bloques: [
        {en: 0, tipo: 'comparar', izq: {titulo: 'ChatGPT', icono: '⚡', color: 'turquesa', items: [
          {texto: 'Casi al instante', desde: 'instante', icono: '✓'},
          {texto: 'Tablas muy visuales', desde: 'visuales', icono: '✓'},
        ]}, der: {titulo: 'Claude', icono: '🧠', color: 'naranja', desde: 'claude', items: [
          {texto: 'Razona y ejecuta el código', desde: 'razonar', icono: '⏳'},
        ]}},
        {en: 'punto', capa: true, tipo: 'pildora', texto: '🏅 Extra: CHATGPT', abajo: true, tamano: 52},
      ],
    },
    '15': {
      bloques: [
        {en: 0, tipo: 'titulo', lineas: [{texto: 'CLAUDE 2', color: 'naranja', tamano: 190}, {texto: 'CHATGPT 1', color: 'turquesa', tamano: 170}, {texto: 'EMPATES 3', color: 'blanco', tamano: 130}]},
        {en: 'precision', tipo: 'tarjetas', items: [
          {icono: '✳️', titulo: 'Claude ganó en…', texto: 'Precisión: revisó más y su código funcionó a la primera', desde: 'precision', color: 'naranja'},
          {icono: '💬', titulo: 'ChatGPT ganó en…', texto: 'Rapidez y presentación', desde: 'rapidez', color: 'turquesa'},
        ]},
        {en: 'importante', capa: true, tipo: 'pildora', texto: '✅ Fórmulas y totales: las dos acertaron', abajo: true, tamano: 46},
      ],
    },
    '16': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '⚖️', titulo: 'Con honestidad', texto: 'Plan gratuito vs plan Pro · una sola prueba · un solo problema. No es un estudio científico.', ancho: 1500},
        {en: 'reales', capa: true, tipo: 'pildora', texto: '📹 Datos reales, mostrados tal cual', abajo: true, tamano: 46},
      ],
    },
    '17': {
      bloques: [
        {en: 0, tipo: 'lista', titulo: 'La gran lección', items: [
          {texto: 'Prueba cada fórmula antes de usarla', desde: 'prueba', icono: '✅'},
          {texto: 'Ejecuta el código con datos de prueba', desde: 'ejecuta', icono: '🐍'},
          {texto: 'Comprueba el total', desde: 'comprueba', icono: '🧮'},
          {texto: 'Pídele: "prueba tu código antes de responder"', desde: 'pidele', icono: '💬'},
        ]},
      ],
    },
    '18': {
      bloques: [
        {en: 0, tipo: 'comparar', titulo: '¿Cuál usar?', izq: {titulo: 'ChatGPT (gratis)', icono: '💬', color: 'turquesa', items: [
          {texto: 'Respuestas rápidas', desde: 'rapida', icono: '✓'},
          {texto: 'Explicaciones e ideas', desde: 'explicacion', icono: '✓'},
        ]}, der: {titulo: 'Claude (Pro)', icono: '✳️', color: 'naranja', desde: 'vas', items: [
          {texto: 'Código que funciona', desde: 'codigo'},
          {texto: 'Datos importantes', desde: 'importantes'},
          {texto: 'Revisión a fondo', desde: 'fondo'},
        ]}},
        {en: 'complemento', capa: true, tipo: 'pildora', texto: '🧩 Las dos tienen complemento para Excel', abajo: true, tamano: 44},
      ],
    },
    '19': {
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '💬', titulo: 'Pon tú el próximo reto', texto: 'Escríbelo en los comentarios: fórmula difícil, tabla dinámica, gráfico, macro…', ancho: 1500},
        {en: 'votados', capa: true, tipo: 'pildora', texto: '🗳️ Los más votados, en un próximo video', abajo: true, tamano: 46},
      ],
    },
    '20': {
      bloques: [
        {en: 0, tipo: 'resumen', ideas: [
          {texto: 'Fórmulas y totales: empate', desde: 'formulas'},
          {texto: 'Código y revisión: Claude', desde: 'codigo'},
          {texto: 'La mejor IA es la que verificas', desde: 'mejor'},
        ]},
        {en: 'aprendes', tipo: 'titulo', lineas: [{texto: 'SI NO LO APRENDES', color: 'blanco', tamano: 130}, {texto: 'AHORA, TE EXTINGUES', color: 'amarillo', tamano: 150}]},
      ],
    },
    '21': {
      bloques: [
        {en: 0, tipo: 'tienda'},
        {en: 'proximo', tipo: 'cierre', siguiente: 'Probabilidad binomial al instante', suscribir: 'suscribete', web: 'proximo+0.5'},
      ],
    },
  },
  shorts: [
    {id: 'short-1', escena: '11', gancho: [{texto: 'El código de', color: 'blanco', tamano: 100}, {texto: 'ChatGPT FALLÓ', color: 'amarillo', tamano: 130}, {texto: '(y el de Claude no)', color: 'blanco', tamano: 80}]},
    {id: 'short-2', escena: '15', gancho: [{texto: 'ChatGPT vs Claude', color: 'blanco', tamano: 100}, {texto: 'EL MARCADOR', color: 'amarillo', tamano: 130}]},
  ],
  miniatura: {
    lineas: [{texto: 'CHATGPT', color: 'turquesa'}, {texto: 'VS', color: 'amarillo', tamano: 120}, {texto: 'CLAUDE', color: 'naranja'}],
    pildora: 'Duelo en Excel',
    insignia: 'PRUEBA REAL',
    codigo: "$ python chatgpt.py\nKeyError: 'Cliente' ✗\n$ python claude.py\nBogotá 4380 ✓",
  },
};
