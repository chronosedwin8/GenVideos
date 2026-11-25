/* Datos compartidos por combinar-datos-ia y duelo-chatgpt-claude (mismo problema).
   Resultados probados en Excel 365 real y en pandas: ver las fichas de esos episodios. */
import type {Cue} from '../../comun/motor-tipos';

export const ENE = [['P-101', 'C-01', '1.200'], ['P-102', 'C-03', '450'], ['P-103', 'C-02', '980'], ['P-104', 'C-05', '300'], ['P-105', 'C-01', '760'], ['P-106', 'C-04', '1.500']];
export const FEB = [['P-201', 'C-02 ', '640'], ['P-202', 'C-06', '820'], ['P-203', 'C-03', '1.100'], ['P-204', 'C-01', '390'], ['P-205', 'C-05', '2.100'], ['P-206', 'C-04', '530']];
export const CLI = [['C-01', 'Ana Torres', 'Bogotá'], ['C-02', 'Luis Gómez', 'Medellín'], ['C-03', 'Sara Ruiz', 'Cali'], ['C-04', 'Juan Pérez', 'Bogotá'], ['C-05', 'Marta Díaz', 'Medellín']];
const NOMBRE: Record<string, [string, string]> = Object.fromEntries(CLI.map(([id, n, c]) => [id, [n, c]]));
/** Resultado de la fórmula en A2:E13 (12 filas). */
export const RES = [...ENE, ...FEB].map(([p, c, m]) => {
  const id = c.trim();
  const [n, ci] = NOMBRE[id] ?? ['No encontrado', 'No encontrado'];
  return [p, id, m, n, ci];
});
export const RESUMEN = [['Bogotá', '4.380'], ['Cali', '1.550'], ['Medellín', '4.020'], ['No encontrado', '820'], ['Total', '10.770']];

export const F_IA =
  '=LET(datos;APILARV(Ene!A2:C7;Feb!A2:C7);ids;ESPACIOS(ELEGIRCOLS(datos;2));APILARH(ELEGIRCOLS(datos;1);ids;ELEGIRCOLS(datos;3);BUSCARX(ids;Clientes!A2:A6;Clientes!B2:B6;"No encontrado");BUSCARX(ids;Clientes!A2:A6;Clientes!C2:C6;"No encontrado")))';
export const F_IA_LINEAS = `=LET(
  datos; APILARV(Ene!A2:C7; Feb!A2:C7);
  ids; ESPACIOS(ELEGIRCOLS(datos; 2));
  APILARH(
    ELEGIRCOLS(datos; 1);
    ids;
    ELEGIRCOLS(datos; 3);
    BUSCARX(ids; Clientes!A2:A6; Clientes!B2:B6; "No encontrado");
    BUSCARX(ids; Clientes!A2:A6; Clientes!C2:C6; "No encontrado")
  )
)`;
export const F_CLAUDE_LINEAS = `=LET(
  datos; APILARV(Ene!A2:C7; Feb!A2:C7);
  ped; ELEGIRCOLS(datos; 1);
  cli; ESPACIOS(ELEGIRCOLS(datos; 2));
  mon; ELEGIRCOLS(datos; 3);
  nom; BUSCARX(cli; Clientes!A2:A6; Clientes!B2:B6; "No encontrado");
  ciu; BUSCARX(cli; Clientes!A2:A6; Clientes!C2:C6; "No encontrado");
  APILARH(ped; cli; mon; nom; ciu)
)`;
export const F_RESUMEN = '=AGRUPARPOR(ELEGIRCOLS(A2#;5);ELEGIRCOLS(A2#;3);SUMA)';

const ENC = {negrita: true, fondo: '#E9F3EC'};
const ROJO = {fondo: '#FFC7CE', color: '#9C0006'};
type Celda = {ref: string; valor: string; desde: Cue; [k: string]: unknown};
const der = (v: string) => (/^[\d.]+$/.test(v) ? {alinear: 'right'} : {});

export const tabla = (enc: string[], filas: string[][], d: Cue = 0, estilo: (r: number) => object = () => ({}), col0 = 0): Celda[] => [
  ...enc.map((v, i) => ({ref: `${'ABCDEFGH'[col0 + i]}1`, valor: v, desde: d, ...ENC})),
  ...filas.flatMap((f, r) => f.map((v, c) => ({ref: `${'ABCDEFGH'[col0 + c]}${r + 2}`, valor: v, desde: d, ...der(v), ...estilo(r)}))),
];
export const ENC_RES = ['Pedido', 'Cliente', 'Monto', 'Nombre', 'Ciudad'];
/** Tabla resultado; la fila de C-06 (índice 7) en rojo. */
export const resultado = (d: Cue = 0) => tabla(ENC_RES, RES, d, (r) => (r === 7 ? ROJO : {}));
export const HOJAS = ['Ene', 'Feb', 'Clientes', 'Resumen'];
export const BASE = {archivo: 'Ventas.xlsx', columnas: 8, filas: 14, anchos: {A: 130, B: 130, C: 120, D: 200, E: 200, F: 40, G: 200, H: 140}, hojas: HOJAS};
