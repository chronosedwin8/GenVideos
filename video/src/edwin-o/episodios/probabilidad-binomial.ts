import type {Cue, EspecEpisodio} from '../../comun/motor-tipos';
import type {Manifest} from '../../comun/tipos';
import manifest from '../../../public/edwin-o/probabilidad-binomial/manifest.json';

/* Todos los resultados están verificados en Excel 365 real (COM) y en Python:
   canales/edwin-o/episodios/probabilidad-binomial/ficha.md. */
const ENC = {negrita: true, fondo: '#E9F3EC'};
const VERDE = {fondo: '#DFF7E7', color: '#0F5A32', negrita: true};
const der = 'right' as const;
type Celda = {ref: string; valor: string; desde: Cue; [k: string]: unknown};
const BASE = {archivo: 'Binomial.xlsx', hoja: 'Penales', columnas: 5, filas: 13, anchos: {A: 260, B: 220, C: 60, D: 260, E: 200}};
const DIST = ['0,5 %', '4,9 %', '18,1 %', '33,6 %', '31,2 %', '11,6 %'];
const PY = `from math import comb

def binomial(k, n, p):
    return comb(n, k) * p**k * (1 - p)**(n - k)

print(f"5 de 5 penales: {binomial(5, 5, 0.65):.1%}")
al_menos_5 = sum(binomial(k, 20, 0.05) for k in range(5, 21))
print(f"5 o más defectuosos de 20: {al_menos_5:.2%}")
print(f"10 de 10 fórmulas bien: {binomial(10, 10, 0.9):.1%}")`;
const datosPenal = (d: Cue = 0): Celda[] => [
  {ref: 'A1', valor: 'Penales (intentos)', desde: d, negrita: true}, {ref: 'B1', valor: '5', desde: d, alinear: der},
  {ref: 'A2', valor: 'Acierto por penal', desde: d, negrita: true}, {ref: 'B2', valor: '0,65', desde: d, alinear: der},
];

export const episodio: EspecEpisodio = {
  canal: 'edwin-o',
  slug: 'probabilidad-binomial',
  id: 'EdwinO-ProbabilidadBinomial',
  manifest: manifest as Manifest,
  escenas: {
    '01': {
      bloques: [
        {en: 0, tipo: 'cifra', valor: '1 de cada 3', texto: 'penales se falló en el Mundial 2026', color: 'blanco'},
        {en: 'probabilidad', tipo: 'titulo', lineas: [{texto: '¿5 DE 5 PENALES?', color: 'amarillo', tamano: 170}], sub: '⚽ ⚽ ⚽ ⚽ ⚽'},
        {en: 'mucha', capa: true, tipo: 'pildora', texto: '❌ "65 %"', tamano: 70, hasta: 'once'},
        {en: 'once', tipo: 'cifra', valor: '11,6 %', texto: 'la probabilidad real', color: 'amarillo'},
      ],
    },
    '02': {
      bloques: [
        {en: 0, tipo: 'cortinilla', titulo: 'BINOMIAL'},
        {en: 'hoy', tipo: 'titulo', lineas: [{texto: 'PROBABILIDAD', color: 'amarillo', tamano: 170}, {texto: 'BINOMIAL', color: 'blanco', tamano: 190}], sub: 'al instante'},
        {en: 'saber', tipo: 'lista', titulo: 'Hoy aprendes…', items: [
          {texto: 'Cuándo se usa', desde: 'saber', icono: '🤔'},
          {texto: 'Calcularla en Excel con UNA función', desde: 'calcularla', icono: '🟩'},
          {texto: 'El misterio del proveedor sospechoso', desde: 'misterio', icono: '🕵️'},
          {texto: 'Hacerlo en Python', desde: 'python', icono: '🐍'},
        ]},
      ],
    },
    '03': {
      bloques: [
        {en: 0, tipo: 'cifra', valor: '35 %', texto: 'de los penales fallados a mitad del Mundial 2026 (21 de 60)', fuente: 'Prensa Latina, 11 jul 2026', color: 'amarillo'},
        {en: 'sea', tipo: 'cifra', valor: '65 %', texto: 'probabilidad de meter UN penal', color: 'verde'},
      ],
    },
    '04': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '📐', titulo: 'Licenciado en Matemáticas y Física', texto: 'La binomial es el tema que más asusta en el aula… y el que más sirve en el trabajo.', ancho: 1500},
        {en: 'excel', capa: true, tipo: 'pildora', texto: '🟩 Con Excel: cero cuentas a mano', abajo: true, tamano: 48},
      ],
    },
    '05': {
      bloques: [
        {en: 0, tipo: 'lista', titulo: '¿Cuándo es binomial?', items: [
          {texto: 'Número fijo de intentos (5 penales)', desde: 'fijo', icono: '1️⃣'},
          {texto: 'Solo dos resultados (gol o no gol)', desde: 'dos', icono: '2️⃣'},
          {texto: 'La misma probabilidad cada vez (65 %)', desde: 'misma', icono: '3️⃣'},
          {texto: 'Un intento no afecta al otro', desde: 'afecte', icono: '4️⃣'},
        ]},
      ],
    },
    '06': {
      bloques: [
        {en: 0, tipo: 'formula', formula: '=DISTR.BINOM.N(núm_éxito;ensayos;prob_éxito;acumulado)', escribir: false, partes: [
          {texto: 'núm_éxito', nota: '¿Cuántos éxitos te interesan?', desde: 'exitos'},
          {texto: 'ensayos', nota: '¿Cuántos intentos?', desde: 'intentos'},
          {texto: 'prob_éxito', nota: 'Probabilidad de cada intento', desde: 'probabilidad'},
          {texto: 'acumulado', nota: 'FALSO = exactamente · VERDADERO = como máximo', desde: 'falso'},
        ]},
      ],
    },
    '07': {
      paso: {n: 1, texto: 'Los cinco penales'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [...datosPenal(0), {ref: 'A4', valor: 'Meter los 5', desde: 0, negrita: true}, {ref: 'B4', valor: '0,116029', desde: 0, hasta: 'porcentaje', alinear: der}, {ref: 'B4', valor: '11,6 %', desde: 'porcentaje', alinear: der, ...VERDE}],
          escritura: [{celda: 'B4', texto: '=DISTR.BINOM.N(5;5;0,65;FALSO)', desde: 'escribe', duracion: 9, enter: 'enter'}],
          zoom: [{a: 'B4', desde: 'enter', escala: 1.8}]}},
        {en: 'dificil', capa: true, tipo: 'pildora', texto: '😮 Mucho más difícil de lo que parece', abajo: true, tamano: 46},
      ],
    },
    '08': {
      bloques: [
        {en: 0, tipo: 'formula', formula: '0,65 × 0,65 × 0,65 × 0,65 × 0,65 = 0,116', escribir: true},
        {en: 'setenta', tipo: 'comparar', titulo: 'Meter los 5 penales', izq: {titulo: '65 % de acierto', icono: '⚽', color: 'rojo', items: [{texto: '11,6 %', desde: 'setenta', icono: '🎯'}]},
          der: {titulo: '75 % de acierto', icono: '⚽', color: 'verde', desde: 'setenta', items: [{texto: '23,7 %', desde: 'veintitres', icono: '🎯'}]}},
        {en: 'dramaticas', capa: true, tipo: 'pildora', texto: '😱 Por eso las tandas son tan dramáticas', abajo: true, tamano: 46},
      ],
    },
    '09': {
      paso: {n: 2, texto: '"Al menos" con SERIE'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [...datosPenal(0), {ref: 'A4', valor: 'Meter los 5', desde: 0, negrita: true}, {ref: 'B4', valor: '11,6 %', desde: 0, alinear: der},
          {ref: 'A5', valor: 'Al menos 4 de 5', desde: 'cuatro', negrita: true}, {ref: 'B5', valor: '42,8 %', desde: 0, alinear: der, ...VERDE}],
          escritura: [{celda: 'B5', texto: '=DISTR.BINOM.SERIE(5;0,65;4;5)', desde: 'serie', duracion: 7, enter: 'resultado'}],
          zoom: [{a: 'B5', desde: 'resultado', escala: 1.8}],
          globos: [{a: 'B5', texto: 'Ojo: primero los intentos', desde: 'orden', color: '#E30613', lado: 'derecha'}]}},
      ],
    },
    '10': {
      paso: {n: 3, texto: 'La tabla completa'},
      bloques: [
        {en: 0, tipo: 'hoja', hoja: {...BASE, celdas: [...datosPenal(0),
          {ref: 'D1', valor: 'Goles', desde: 0, ...ENC}, {ref: 'E1', valor: 'Probabilidad', desde: 0, ...ENC},
          ...DIST.flatMap((p, i) => [
            {ref: `D${i + 2}`, valor: String(i), desde: 'secuencia+0.8', alinear: der},
            {ref: `E${i + 2}`, valor: p, desde: 'golpe', alinear: der, ...(i === 3 ? VERDE : {})},
          ])],
          escritura: [{celda: 'E2', texto: '=DISTR.BINOM.N(SECUENCIA(6;1;0);5;0,65;FALSO)', desde: 'paso', duracion: 6, enter: 'golpe'}]}},
        {en: 'grafico', tipo: 'barras', titulo: 'Goles en una tanda de 5 (acierto 65 %)', items: DIST.map((p, i) => ({etiqueta: String(i), valor: parseFloat(p.replace(',', '.'))}))},
        {en: 'tres', capa: true, tipo: 'pildora', texto: 'Lo más probable: 3 goles (33,6 %)', abajo: true, tamano: 46},
      ],
    },
    '11': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '🕵️', titulo: 'El caso del proveedor sospechoso', texto: 'Jura que solo el 5 % de sus piezas sale defectuoso.', ancho: 1500},
        {en: 'llega', tipo: 'cifra', valor: '5 de 20', texto: 'piezas defectuosas en el lote', color: 'rojo'},
        {en: 'suerte', tipo: 'titulo', lineas: [{texto: '¿MALA SUERTE…', color: 'blanco', tamano: 150}, {texto: '…O MENTIRA?', color: 'amarillo', tamano: 170}]},
      ],
    },
    '12': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'formula', formula: '=1-DISTR.BINOM.N(4;20;0,05;VERDADERO)', escribir: true, partes: [
          {texto: 'DISTR.BINOM.N(4;20;0,05;VERDADERO)', nota: '"Como máximo 4" defectuosas', desde: 'maximo'},
          {texto: '1-', nota: 'Uno menos eso = "5 o más"', desde: 'restamos'},
        ]},
        {en: 'resultado', tipo: 'cifra', valor: '0,26 %', texto: '≈ 1 vez cada 389 lotes', color: 'amarillo'},
        {en: 'imposible', tipo: 'titulo', lineas: [{texto: 'CASI IMPOSIBLE', color: 'amarillo', tamano: 170}, {texto: '→ HAY QUE RECLAMAR', color: 'blanco', tamano: 120}]},
      ],
    },
    '13': {
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '💡', titulo: 'El truco del "al menos"', texto: 'Al menos k  =  1 − `DISTR.BINOM.N(k−1; …; VERDADERO)`', ancho: 1600},
        {en: 'prefieres', tipo: 'formula', formula: '=DISTR.BINOM.SERIE(20;0,05;5;20)', escribir: true, partes: [{texto: '5;20', nota: 'De 5 a 20 defectuosas → 0,26 %', desde: 'veinte'}]},
      ],
    },
    '14': {
      bloques: [
        {en: 0, tipo: 'barras', titulo: '¿Qué es lo normal? (lote de 20, 5 % real)', items: [{etiqueta: '0', valor: 35.8}, {etiqueta: '1', valor: 37.7}, {etiqueta: '2', valor: 18.9}, {etiqueta: '3', valor: 6.0}, {etiqueta: '4', valor: 1.3}, {etiqueta: '5+', valor: 0.26}]},
        {en: 'menos', capa: true, tipo: 'pildora', texto: '2 o menos: 92,5 % de las veces', tamano: 48},
        {en: 'lejos', capa: true, tipo: 'pildora', texto: '5 está MUY lejos de lo normal', abajo: true, tamano: 48},
      ],
    },
    '15': {
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '🤖', titulo: 'Si la IA acierta el 90 % de las fórmulas…', texto: '¿Qué probabilidad hay de 10 fórmulas seguidas todas buenas?', ancho: 1600},
        {en: 'solo', tipo: 'cifra', valor: '34,9 %', texto: '10 de 10 bien · DISTR.BINOM.N(10;10;0,9;FALSO)', color: 'amarillo'},
        {en: 'verificar', capa: true, tipo: 'pildora', texto: '✅ Por eso: siempre verifica', abajo: true, tamano: 50},
      ],
    },
    '16': {
      bloques: [
        {en: 0, tipo: 'cuadricula', titulo: 'Dónde la usa un analista', items: [
          {icono: '🏭', texto: 'Control de calidad', desde: 'calidad'},
          {icono: '📧', texto: 'Respuestas a una campaña', desde: 'campanas'},
          {icono: '📞', texto: 'Ventas por llamadas', desde: 'llamadas'},
          {icono: '🧪', texto: 'Pruebas A/B', desde: 'pruebas'},
          {icono: '🏥', texto: 'Ausentismo', desde: 'ausentismo'},
          {icono: '🤖', texto: 'Respuestas de la IA', desde: 'casos'},
        ]},
        {en: 'normal#2', capa: true, tipo: 'pildora', texto: '❓ ¿Esto es normal… o está pasando algo?', abajo: true, tamano: 46},
      ],
    },
    '17': {
      bloques: [
        {en: 0, tipo: 'codigo', archivo: 'binomial.py', codigo: PY, velocidad: 70, tamano: 24, salida: [
          {texto: '$ python binomial.py', desde: 'ejecuto'},
          {texto: '5 de 5 penales: 11.6%', desde: 'ejecuto+0.5', color: '#7CFC9A'},
          {texto: '5 o más defectuosos de 20: 0.26%', desde: 'ejecuto+0.8', color: '#7CFC9A'},
          {texto: '10 de 10 fórmulas bien: 34.9%', desde: 'ejecuto+1.1', color: '#7CFC9A'},
        ]},
        {en: 'instalar', capa: true, tipo: 'pildora', texto: '📦 Sin instalar nada: math viene con Python', tamano: 40, hasta: 'ejecuto'},
      ],
    },
    '18': {
      bloques: [
        {en: 0, tipo: 'formula', formula: '=COMBINAT(5;3)  →  10', escribir: true},
        {en: 'cada', tipo: 'tarjeta', icono: '🧮', titulo: '10 formas × su probabilidad', texto: '10 × 0,65³ × 0,35² = 33,6 % (meter exactamente 3 de 5)', ancho: 1500},
      ],
    },
    '19': {
      bloques: [
        {en: 0, tipo: 'errores', titulo: 'Si no te funcionó', items: [
          {mal: '#¡NUM!', bien: 'Escribiste 65 en vez de 0,65', desde: 'num'},
          {mal: '#¡VALOR!', bien: 'Hay texto en un argumento', desde: 'valor'},
          {mal: 'Resultado raro', bien: 'FALSO = exactamente · VERDADERO = como máximo', desde: 'raro'},
        ]},
      ],
    },
    '20': {
      bloques: [
        {en: 0, tipo: 'resumen', ideas: [
          {texto: '4 condiciones = binomial', desde: 'intentos'},
          {texto: 'FALSO exactamente · VERDADERO como máximo', desde: 'falso'},
          {texto: 'Al menos = 1 − acumulado', desde: 'menos'},
        ]},
        {en: 'aprendes', tipo: 'titulo', lineas: [{texto: 'SI NO LO APRENDES', color: 'blanco', tamano: 130}, {texto: 'AHORA, TE EXTINGUES', color: 'amarillo', tamano: 150}]},
      ],
    },
    '21': {
      bloques: [
        {en: 0, tipo: 'tienda'},
        {en: 'proximo', tipo: 'cierre', siguiente: 'Domina Power Query en 10 minutos', suscribir: 'suscribete', web: 'proximo+0.5'},
      ],
    },
  },
  shorts: [
    {id: 'short-1', escena: '07', gancho: [{texto: '¿Meter 5 de 5', color: 'blanco', tamano: 100}, {texto: 'PENALES?', color: 'amarillo', tamano: 150}, {texto: 'Excel te lo dice', color: 'blanco', tamano: 80}]},
    {id: 'short-2', escena: '12', gancho: [{texto: '¿Tu proveedor', color: 'blanco', tamano: 100}, {texto: 'TE MIENTE?', color: 'amarillo', tamano: 150}]},
  ],
  miniatura: {
    lineas: [{texto: 'PROBABILIDAD', color: 'amarillo'}, {texto: 'BINOMIAL', color: 'blanco'}, {texto: 'al instante', color: 'turquesa', tamano: 90}],
    pildora: 'Excel + Python',
    insignia: '⚽ 11,6 %',
    formula: '=DISTR.BINOM.N(5;5;0,65;FALSO)',
    filas: [['Goles', 'Probabilidad'], ['3', '33,6 %'], ['4', '31,2 %'], ['5', '11,6 %']],
    resaltarFila: 3,
  },
};
