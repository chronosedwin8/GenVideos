import type {EspecEpisodio} from '../../comun/motor-tipos';
import type {Manifest} from '../../comun/tipos';
import manifest from '../../../public/edwin-o/combinar-datos-ia/manifest.json';
import {BASE, CLI, ENE, F_IA_LINEAS, F_RESUMEN, FEB, RES, RESUMEN, resultado, tabla} from './datos-combinar';

/* Fórmulas probadas en Excel 365 real y código ejecutado: canales/edwin-o/episodios/combinar-datos-ia/ficha.md. */
const ENC_P = ['Pedido', 'Cliente', 'Monto'];
const PROMPT =
  'Tengo un libro de Excel 365 en español (separador ;).\nHoja "Ene" A1:C7: Pedido;Cliente;Monto…\nHoja "Feb" A1:C7: misma estructura…\nHoja "Clientes" A1:C6: ID;Nombre;Ciudad…\n1) UNA fórmula para A2 que junte Ene y Feb y agregue Nombre y Ciudad.\n2) Dime si ves problemas en los datos.';
const PY = `import pandas as pd

hojas = pd.read_excel("ventas.xlsx", sheet_name=None)
pedidos = pd.concat([hojas["Ene"], hojas["Feb"]])
pedidos["Cliente"] = pedidos["Cliente"].str.strip()
tabla = pedidos.merge(hojas["Clientes"], left_on="Cliente",
                      right_on="ID", how="left")
print(tabla.groupby("Ciudad", dropna=False)["Monto"].sum())`;
const VERDE = '#7CFC9A';
const RES_PQ = RES.map(([p, c, m, n, ci]) => [p, c, Number(m.replace('.', '')), n === 'No encontrado' ? null : n, ci === 'No encontrado' ? null : ci]);
const APILADO = [...ENE, ...FEB].map(([p, c, m]) => [p, c, Number(m.replace('.', ''))]);

export const episodio: EspecEpisodio = {
  canal: 'edwin-o',
  slug: 'combinar-datos-ia',
  id: 'EdwinO-CombinarDatosIA',
  manifest: manifest as Manifest,
  escenas: {
    '01': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, hoja: 'Ene', hojaActiva: [{nombre: 'Ene', desde: 0}, {nombre: 'Feb', desde: 'separadas+0.4'}, {nombre: 'Clientes', desde: 'lista'}], celdas: tabla(ENC_P, ENE, 0)}},
        {en: 'jefe', tipo: 'hoja', hoja: {...BASE, hoja: 'Resumen', hojaActiva: [{nombre: 'Resumen', desde: 0}], celdas: resultado('frase'),
          escritura: [{celda: 'A2', texto: '=LET(datos;APILARV(…', desde: 'frase', duracion: 1.5}],
          globos: [{a: 'E9', texto: '👻 ¡Un cliente fantasma!', desde: 'fantasma', color: '#E30613', lado: 'derecha'}]}},
      ],
    },
    '02': {
      bloques: [
        {en: 0, tipo: 'cortinilla', titulo: 'LA VARITA MÁGICA'},
        {en: 'hoy', tipo: 'titulo', lineas: [{texto: '🪄 LA VARITA', color: 'amarillo', tamano: 180}, {texto: 'MÁGICA', color: 'blanco', tamano: 180}], sub: 'IA para combinar datos'},
        {en: 'prompt', tipo: 'lista', titulo: 'Hoy ves…', items: [
          {texto: 'El prompt exacto', desde: 'prompt', icono: '💬'},
          {texto: 'La fórmula pieza por pieza', desde: 'pieza', icono: '🧩'},
          {texto: 'El misterio del cliente fantasma', desde: 'misterio', icono: '👻'},
          {texto: 'Otras 3 varitas', desde: 'otras', icono: '🪄'},
        ]},
      ],
    },
    '03': {
      bloques: [
        {en: 0, tipo: 'cronologia', titulo: '2026: la IA entra a Excel', items: [
          {fecha: 'Abril 2026', texto: 'Copilot con modo agente, para todos', desde: 'abril', icono: '🤖', color: 'turquesa'},
          {fecha: 'Mayo 2026', texto: 'ChatGPT para Excel, en todos sus planes', desde: 'mayo', icono: '💬', color: 'verde'},
          {fecha: '2026', texto: 'Claude para Excel (complemento)', desde: 'claude', icono: '✳️', color: 'amarillo'},
        ]},
        {en: 'pregunta', capa: true, tipo: 'pildora', texto: 'La pregunta ya no es SI usarla… sino CÓMO pedirle', abajo: true, tamano: 44},
      ],
    },
    '04': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '🏫', titulo: 'El error número uno al cruzar tablas', texto: '`#N/D`… por un espacio invisible al final de un código.', ancho: 1500},
        {en: 'detecta', capa: true, tipo: 'pildora', texto: '🔍 Hoy la IA lo detecta antes que tú', abajo: true, tamano: 46},
      ],
    },
    '05': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, hoja: 'Ene', hojaActiva: [{nombre: 'Ene', desde: 0}], celdas: tabla(ENC_P, ENE, 0)}},
        {en: 'feb', tipo: 'hoja', hoja: {...BASE, hoja: 'Feb', hojaActiva: [{nombre: 'Feb', desde: 0}], celdas: tabla(ENC_P, FEB, 0)}},
        {en: 'clientes', tipo: 'hoja', hoja: {...BASE, hoja: 'Clientes', hojaActiva: [{nombre: 'Clientes', desde: 0}], celdas: tabla(['ID', 'Nombre', 'Ciudad'], CLI, 0)}},
      ],
    },
    '06': {
      bloques: [
        {en: 0, tipo: 'chat', titulo: 'Tu prompt (la varita)', mensajes: [{rol: 'yo', texto: PROMPT, desde: 'fijate', duracion: 3}]},
        {en: 'version', capa: true, tipo: 'pildora', texto: '1️⃣ Versión, idioma y separador', tamano: 44, hasta: 'donde'},
        {en: 'donde', capa: true, tipo: 'pildora', texto: '2️⃣ Dónde están los datos', tamano: 44, hasta: 'quiero'},
        {en: 'quiero', capa: true, tipo: 'pildora', texto: '3️⃣ Qué quieres exactamente', tamano: 44, hasta: 'parte'},
        {en: 'parte', capa: true, tipo: 'pildora', texto: '4️⃣ "Dime si ves problemas"', tamano: 44, hasta: 'comparalo'},
        {en: 'comparalo', tipo: 'chat', titulo: 'Lo que escribe la mayoría', mensajes: [{rol: 'yo', texto: 'junta mis hojas de excel', desde: 'junta', duracion: 1}]},
        {en: 'adivinar', capa: true, tipo: 'pildora', texto: '🤷 La IA tiene que adivinar… y se equivoca', abajo: true, tamano: 46},
      ],
    },
    '07': {
      bloques: [
        {en: 0, tipo: 'codigo', archivo: 'Respuesta de la IA', codigo: F_IA_LINEAS, velocidad: 120, tamano: 36},
        {en: 'monstruo', capa: true, tipo: 'pildora', texto: '😱 ¿Un monstruo?', tamano: 48, hasta: 'probe'},
        {en: 'probe', capa: true, tipo: 'pildora', texto: '✅ Probada en Excel: funciona', tamano: 48},
        {en: 'cuatro', capa: true, tipo: 'pildora', texto: '🧩 Solo 4 ideas', abajo: true, tamano: 48},
      ],
    },
    '08': {
      paso: {n: 1, prefijo: 'PIEZA', texto: 'APILARV junta los meses'},
      bloques: [
        {en: 0, tipo: 'formula', formula: 'datos;APILARV(Ene!A2:C7;Feb!A2:C7)', escribir: false, partes: [
          {texto: 'APILARV', nota: 'Pone una tabla debajo de la otra', desde: 'toma'},
          {texto: 'Ene!A2:C7', nota: '6 pedidos de enero', desde: 'enero'},
          {texto: 'Feb!A2:C7', nota: '+ 6 de febrero = 12 filas', desde: 'febrero'},
          {texto: 'datos', nota: 'LET le pone un nombre', desde: 'let'},
        ]},
      ],
    },
    '09': {
      paso: {n: 2, prefijo: 'PIEZA', texto: 'Limpia el código del cliente'},
      bloques: [
        {en: 0, tipo: 'formula', formula: 'ids;ESPACIOS(ELEGIRCOLS(datos;2))', escribir: false, partes: [
          {texto: 'ELEGIRCOLS(datos;2)', nota: 'La columna de códigos de cliente', desde: 'elegircols'},
          {texto: 'ESPACIOS', nota: 'Quita los espacios sobrantes: "C-02 " → "C-02"', desde: 'espacios'},
          {texto: 'ids', nota: 'Nombre del resultado', desde: 'guarda'},
        ]},
        {en: 'salva', capa: true, tipo: 'pildora', texto: '🦸 La pieza que salva el reporte', abajo: true, tamano: 46},
      ],
    },
    '10': {
      paso: {n: 3, prefijo: 'PIEZA', texto: 'BUSCARX trae nombre y ciudad'},
      bloques: [
        {en: 0, tipo: 'formula', formula: 'BUSCARX(ids;Clientes!A2:A6;Clientes!B2:B6;"No encontrado")', escribir: false, partes: [
          {texto: 'Clientes!A2:A6', nota: 'Busca cada código en Clientes', desde: 'busca'},
          {texto: 'Clientes!B2:B6', nota: 'Trae el nombre (el 2.º BUSCARX trae la ciudad: C2:C6)', desde: 'trae'},
          {texto: '"No encontrado"', nota: 'Si no existe, en vez de #N/D', desde: 'cuarto'},
        ]},
      ],
    },
    '11': {
      paso: {n: 4, prefijo: 'PIEZA', texto: 'APILARH arma la tabla'},
      bloques: [
        {en: 0, tipo: 'formula', formula: 'APILARH(ELEGIRCOLS(datos;1);ids;ELEGIRCOLS(datos;3);…)', escribir: false, partes: [
          {texto: 'APILARH', nota: 'Pega las columnas lado a lado', desde: 'pega'},
          {texto: 'ELEGIRCOLS(datos;1)', nota: 'Pedido', desde: 'pedido'},
          {texto: 'ids', nota: 'Código limpio', desde: 'codigo'},
          {texto: 'ELEGIRCOLS(datos;3)', nota: 'Monto', desde: 'monto'},
        ]},
        {en: 'enter', tipo: 'hoja', hoja: {...BASE, hoja: 'Resumen', hojaActiva: [{nombre: 'Resumen', desde: 0}], celdas: resultado('enter+0.3'),
          zoom: [{a: 'C10', desde: 'desborda', escala: 1.15}]}},
      ],
    },
    '12': {
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, hoja: 'Resumen', hojaActiva: [{nombre: 'Resumen', desde: 0}], celdas: resultado(0),
          resaltes: [{rango: 'D2:E13', desde: 'nombre', hasta: 'fila', color: '#1E9E4A'}, {rango: 'A9:E9', desde: 'fila', color: '#E30613'}],
          zoom: [{a: 'C9', desde: 'fila', escala: 1.5}],
          globos: [{a: 'E9', texto: '¿Quién es C-06? 👻', desde: 'encontrado', color: '#E30613', lado: 'abajo'}]}},
        {en: 'cambias', capa: true, tipo: 'pildora', texto: '🔄 Cambias un dato → la tabla cambia sola', abajo: true, tamano: 44, hasta: 'fila'},
      ],
    },
    '13': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'tarjetas', titulo: '🕵️ El misterio', items: [
          {icono: '👻', titulo: 'El cliente fantasma', texto: 'C-06 compró 820… pero no existe en Clientes', desde: 'cliente'},
          {icono: '🔍', titulo: 'El espacio invisible', texto: '"C-02 " tenía un espacio al final', desde: 'febrero'},
        ]},
        {en: 'medellin', tipo: 'comparar', titulo: 'Medellín', izq: {titulo: 'Sin ESPACIOS', icono: '✗', color: 'rojo', items: [{texto: '3.380 (pierde 640)', desde: 'trescientos'}]},
          der: {titulo: 'Con ESPACIOS', icono: '✓', color: 'verde', desde: 'vez', items: [{texto: '4.020 ✔', desde: 'veinte#2'}]}},
      ],
    },
    '14': {
      paso: {n: '🎁', prefijo: 'BONUS', texto: 'Resumen por ciudad'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, hoja: 'Resumen', hojaActiva: [{nombre: 'Resumen', desde: 0}],
          celdas: [...resultado(0), ...RESUMEN.flatMap(([c, v], i) => [
            {ref: `G${i + 2}`, valor: c, desde: `agruparpor+${(1 + i * 0.2).toFixed(1)}`, ...(c === 'Total' ? {negrita: true} : {})},
            {ref: `H${i + 2}`, valor: v, desde: `agruparpor+${(1 + i * 0.2).toFixed(1)}`, alinear: 'right', ...(c === 'Total' ? {negrita: true} : {})},
          ])],
          escritura: [{celda: 'G2', texto: F_RESUMEN, desde: 'numeral', duracion: 4, enter: 'agruparpor+0.8'}],
          resaltes: [{rango: 'A2:E13', desde: 'numeral', hasta: 'agruparpor', color: '#1F6FEB'}],
          zoom: [{a: 'G4', desde: 'bogota', escala: 1.6}]}},
      ],
    },
    '15': {
      paso: {n: 2, prefijo: 'VARITA', texto: 'La IA dentro de Excel'},
      bloques: [
        {en: 0, tipo: 'chat', panel: true, titulo: 'Complemento de IA', mensajes: [
          {rol: 'yo', texto: 'Junta Ene y Feb en la hoja Resumen con el nombre y la ciudad de cada cliente', desde: 'escribes', duracion: 2},
          {rol: 'ia', texto: 'Voy a crear la tabla en Resumen!A1:E13. ¿Me das permiso para modificar el libro?', desde: 'permiso'},
        ]},
        {en: 0.3, capa: true, tipo: 'pildora', texto: 'Copilot · ChatGPT para Excel · Claude para Excel', tamano: 40, hasta: 'permiso'},
        {en: 'revisa', capa: true, tipo: 'pildora', texto: '👀 Revisa siempre lo que cambió', abajo: true, tamano: 46},
      ],
    },
    '16': {
      paso: {n: 3, prefijo: 'VARITA', texto: 'Power Query'},
      bloques: [
        {en: 0, tipo: 'editorpq', consulta: 'Pedidos', consultas: ['Ene', 'Feb', 'Clientes', 'Pedidos'], anchos: [180, 180, 160, 260, 260],
          estados: [
            {desde: 0, columnas: ['Pedido', 'Cliente', 'Monto'], filas: APILADO},
            {desde: 'combinar', columnas: ['Pedido', 'Cliente', 'Monto', 'Nombre', 'Ciudad'], filas: RES_PQ, resaltarCol: [3, 4]},
          ],
          botones: [{pestana: 'Inicio', texto: 'Anexar consultas: Ene + Feb', desde: 'anexar'}, {pestana: 'Inicio', texto: 'Combinar consultas: Clientes · Externa izquierda', desde: 'combinar'}],
          pasos: [{texto: 'Origen', desde: 0}, {texto: 'Consulta anexada', desde: 'anexar'}, {texto: 'Texto recortado', desde: 'anexar+0.8'}, {texto: 'Consultas combinadas', desde: 'combinar'}, {texto: 'Se expandió Clientes', desde: 'combinar+0.8'}]},
        {en: 'clic', capa: true, tipo: 'pildora', texto: '🔄 Llegan 12 archivos → Actualizar todo', abajo: true, tamano: 44},
      ],
    },
    '17': {
      paso: {n: 4, prefijo: 'VARITA', texto: 'Python'},
      bloques: [
        {en: 0, tipo: 'codigo', archivo: 'varita.py', codigo: PY, velocidad: 70, tamano: 24, salida: [
          {texto: '$ python varita.py', desde: 'resultado'},
          {texto: 'Ciudad', desde: 'resultado+0.3'},
          {texto: 'Bogotá      4380', desde: 'resultado+0.5', color: VERDE},
          {texto: 'Cali        1550', desde: 'resultado+0.7', color: VERDE},
          {texto: 'Medellín    4020', desde: 'resultado+0.9', color: VERDE},
          {texto: 'NaN          820  👻', desde: 'nan', color: '#FFE500'},
        ]},
      ],
    },
    '18': {
      bloques: [
        {en: 0, tipo: 'lista', titulo: 'Reglas del profesional', items: [
          {texto: 'Comprueba el total: 5.190 + 5.580 = 10.770', desde: 'comprueba', icono: '🧮'},
          {texto: 'Revisa cada "No encontrado"', desde: 'revisa', icono: '🔍'},
          {texto: 'Pide que te explique la fórmula', desde: 'explique', icono: '💬'},
          {texto: 'No pegues datos confidenciales en un chat', desde: 'confidenciales', icono: '🔒'},
        ]},
      ],
    },
    '19': {
      bloques: [
        {en: 0, tipo: 'errores', titulo: 'Si no te funcionó', items: [
          {mal: '#¿NOMBRE?', bien: 'Necesitas Excel 365 (APILARV, BUSCARX)', desde: 'nombre'},
          {mal: '#¡DESBORDAMIENTO!', bien: 'Libera el espacio debajo de A2', desde: 'desbordamiento'},
          {mal: 'Todo sale "No encontrado"', bien: 'Espacios, o números guardados como texto', desde: 'todo'},
        ]},
      ],
    },
    '20': {
      bloques: [
        {en: 0, tipo: 'resumen', ideas: [
          {texto: 'Un buen prompt = la varita', desde: 'varita'},
          {texto: 'Entiende la fórmula pieza por pieza', desde: 'entiende'},
          {texto: 'Verifica el total y los "No encontrado"', desde: 'verifica'},
        ]},
        {en: 'aprendes', tipo: 'titulo', lineas: [{texto: 'SI NO LO APRENDES', color: 'blanco', tamano: 130}, {texto: 'AHORA, TE EXTINGUES', color: 'amarillo', tamano: 150}]},
      ],
    },
    '21': {
      bloques: [
        {en: 0, tipo: 'tienda'},
        {en: 'proximo', tipo: 'cierre', siguiente: 'ChatGPT vs Claude: el duelo', suscribir: 'suscribete', web: 'proximo+0.5'},
      ],
    },
  },
  shorts: [
    {id: 'short-1', escena: '13', gancho: [{texto: 'El misterio del', color: 'blanco', tamano: 100}, {texto: 'CLIENTE FANTASMA', color: 'amarillo', tamano: 120}, {texto: 'en Excel 👻', color: 'blanco', tamano: 90}]},
    {id: 'short-2', escena: '06', gancho: [{texto: 'El prompt que', color: 'blanco', tamano: 100}, {texto: 'COMBINA TUS DATOS', color: 'amarillo', tamano: 110}]},
  ],
  miniatura: {
    lineas: [{texto: '🪄 LA VARITA', color: 'amarillo'}, {texto: 'MÁGICA', color: 'blanco'}, {texto: 'de Excel', color: 'turquesa', tamano: 90}],
    pildora: 'IA para combinar datos',
    insignia: 'PROMPT GRATIS',
    formula: '=LET(datos;APILARV(…);…)',
    filas: [['Pedido', 'Cliente', 'Ciudad'], ['P-101', 'Ana Torres', 'Bogotá'], ['P-202', 'C-06 👻', 'No encontrado']],
    resaltarFila: 2,
  },
};
