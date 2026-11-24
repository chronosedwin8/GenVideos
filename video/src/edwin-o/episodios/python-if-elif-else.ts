import type {EspecEpisodio} from '../../comun/motor-tipos';
import type {Manifest} from '../../comun/tipos';
import manifest from '../../../public/edwin-o/python-if-elif-else/manifest.json';

/* Código y salidas reales (Python 3.14.0): canales/edwin-o/episodios/python-if-elif-else/codigo */
const C_IF = `ventas = 7200

if ventas >= 5000:
    print("Comisión del 5 %")
`;
const C_ELSE = `else:
    print("Sin comisión del 5 %")
`;
const COMISIONES = `ventas = float(input("Ventas del mes: "))

if ventas >= 5000:
    comision = ventas * 0.05
elif ventas >= 1000:
    comision = ventas * 0.03
else:
    comision = 0

print(f"Comisión: {comision:.2f}")`;
const ORDEN_MAL = `ventas = float(input("Ventas del mes: "))

if ventas >= 1000:
    comision = ventas * 0.03
elif ventas >= 5000:
    comision = ventas * 0.05
else:
    comision = 0

print(f"Comisión: {comision:.2f}")`;
const SIN_FLOAT = `ventas = input("Ventas del mes: ")

if ventas >= 5000:
    print("Comisión del 5 %")`;
const NOTAS = `nota = 82
asistencia = 90

if nota >= 60 and asistencia >= 80:
    print("Aprobado")
else:
    print("Reprobado")`;
const ROJO = '#FF8A8A';
const VERDE = '#9BE7A8';
const AZUL = '#3DD6C8';

export const episodio: EspecEpisodio = {
  canal: 'edwin-o',
  slug: 'python-if-elif-else',
  id: 'EdwinO-PythonIfElifElse',
  manifest: manifest as Manifest,
  escenas: {
    '01': {
      fondo: 'oscuro',
      bloques: [
        {en: 0, tipo: 'terminal', titulo: 'Terminal', ancho: 1100, lineas: [
          {texto: '> python comisiones.py', desde: 0.1, color: AZUL},
          {texto: 'Ventas del mes: 5000', desde: 'escribes'},
          {texto: 'Comisión: 250.00', desde: 'comision', color: VERDE},
          {texto: '> python comisiones.py', desde: 'escribes#2', color: AZUL},
          {texto: 'Ventas del mes: 999', desde: 'escribes#2+0.3'},
          {texto: 'Comisión: 0.00', desde: 'cero', color: VERDE},
        ]},
        {en: 'decision', tipo: 'titulo', lineas: [{texto: 'Tu programa', color: 'blanco', tamano: 140}, {texto: 'TOMA DECISIONES', color: 'amarillo', tamano: 200}]},
      ],
    },
    '02': {
      bloques: [
        {en: 0, tipo: 'cortinilla', titulo: 'IF · ELIF · ELSE'},
        {en: 'hoy', tipo: 'titulo', lineas: [{texto: 'IF · ELIF · ELSE', color: 'amarillo', tamano: 200}, {texto: 'en Python', color: 'blanco', tamano: 130}], sub: 'Desde cero, con un ejemplo real'},
        {en: 'final', tipo: 'tarjeta', icono: '🐞', titulo: 'Los 5 errores de principiante', texto: 'Con los mensajes exactos que te muestra Python.', color: 'rojo'},
      ],
    },
    '03': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '🐍', titulo: 'Python 3.14 · octubre de 2025', texto: 'Mensajes de error mucho más claros.', fuente: 'docs.python.org · What’s new in Python 3.14'},
        {en: 'orden', tipo: 'terminal', titulo: 'Python 3.14', ancho: 1500, lineas: [
          {texto: '    elif nota >= 60:', desde: 'orden'},
          {texto: "SyntaxError: 'elif' block follows an 'else' block", desde: 'orden+0.5', color: ROJO},
        ]},
      ],
    },
    '04': {
      bloques: [
        {en: 0, tipo: 'cifra', valor: '22.756 vistas', texto: 'El Short de IF: el video más visto del canal', fuente: 'YouTube Studio · últimos 365 días'},
        {en: 'clases', tipo: 'tarjeta', icono: '🏫', titulo: 'En mis clases', texto: 'El IF es el momento en que el programa empieza a “pensar”.', color: 'magenta'},
      ],
    },
    '05': {
      bloques: [
        {en: 0, tipo: 'titulo', lineas: [{texto: '¿Esto es verdad?', color: 'blanco', tamano: 140}, {texto: 'SÍ → una cosa · NO → otra', color: 'amarillo', tamano: 130}]},
        {en: 'excel', tipo: 'comparar', izq: {titulo: 'Excel', icono: '📗', color: 'verde', items: [
          {texto: '`=SI(condición; verdad; falso)`', desde: 'funcion', icono: '•'},
          {texto: 'En una celda', desde: 'celda', icono: '•'},
        ]}, der: {titulo: 'Python', icono: '🐍', color: 'azul', desde: 'diferencia', items: [
          {texto: '`if condición:`  …  `else:`', desde: 'diferencia', icono: '•'},
          {texto: 'En líneas de código', desde: 'lineas', icono: '•'},
          {texto: 'Hace mucho más que devolver un valor', desde: 'mucho', icono: '•'},
        ]}},
      ],
    },
    '06': {
      paso: {n: 1, texto: 'El if'},
      bloques: [
        {en: 0, tipo: 'codigo', codigo: C_IF, archivo: 'comisiones.py', velocidad: 9, tamano: 48,
          resaltar: [{lineas: [3], desde: 'condicion', hasta: 'sangria'}, {lineas: [4], desde: 'sangria'}]},
        {en: 'espacios', capa: true, tipo: 'pildora', texto: '↳ 4 espacios = solo se ejecuta si es verdad', tamano: 46},
      ],
    },
    '07': {
      bloques: [
        {en: 0, tipo: 'cuadricula', titulo: 'Los 6 comparadores', items: [
          {icono: '🔼', texto: '`>` mayor que', desde: 'mayor'},
          {icono: '🔽', texto: '`<` menor que', desde: 'menor'},
          {icono: '⏫', texto: '`>=` mayor o igual', desde: 'mayor#2'},
          {icono: '⏬', texto: '`<=` menor o igual', desde: 'menor#2'},
          {icono: '🟰', texto: '`==` igual', desde: 'iguales'},
          {icono: '🚫', texto: '`!=` diferente', desde: 'diferentes'},
        ]},
      ],
    },
    '08': {
      paso: {n: 2, texto: 'El else'},
      bloques: [
        {en: 0, tipo: 'codigo', previo: C_IF, codigo: C_ELSE, archivo: 'comisiones.py', velocidad: 10, tamano: 40,
          resaltar: [{lineas: [5, 6], desde: 'nivel'}],
          salida: [{texto: '> python comisiones.py', desde: 'siempre', color: AZUL}, {texto: 'Comisión del 5 %', desde: 'siempre+0.5', color: VERDE}]},
        {en: 'atrapa', capa: true, tipo: 'pildora', texto: 'El else no lleva condición: atrapa todo lo demás', tamano: 44},
      ],
    },
    '09': {
      paso: {n: 3, texto: 'El elif'},
      bloques: [
        {en: 0, tipo: 'titulo', lineas: [{texto: 'ELIF =', color: 'amarillo', tamano: 220}, {texto: '“si no, pregunta esto otro”', color: 'blanco', tamano: 110}]},
        {en: 'recuerdas', tipo: 'tarjeta', icono: '🔁', titulo: 'La regla del video de fórmulas con IA', texto: 'Desde 5.000 → 5 % · desde 1.000 → 3 % · si no → 0', color: 'magenta'},
        {en: 'asi', tipo: 'codigo', codigo: COMISIONES, archivo: 'comisiones.py', velocidad: 45, tamano: 38,
          resaltar: [{lineas: [3, 4], desde: 'if#2', hasta: 'elif#2'}, {lineas: [5, 6], desde: 'elif#2', hasta: 'else#2'}, {lineas: [7, 8], desde: 'else#2'}]},
        {en: 'caminos', capa: true, tipo: 'pildora', texto: '3 caminos · solo 1 se cumple', tamano: 50},
      ],
    },
    '10': {
      bloques: [
        {en: 0, tipo: 'codigo', previo: COMISIONES, codigo: '', archivo: 'comisiones.py', tamano: 28, salidaY: 220,
          resaltar: [{lineas: [1], desde: 'input', hasta: 'ejecutamos'}],
          salida: [
            {texto: '> python comisiones.py', desde: 'ejecutamos', color: AZUL},
            {texto: 'Ventas del mes: 999', desde: 'novecientos'},
            {texto: 'Comisión: 0.00', desde: 'cero', color: VERDE},
            {texto: 'Ventas del mes: 1000', desde: 'mil'},
            {texto: 'Comisión: 30.00', desde: 'treinta', color: VERDE},
            {texto: 'Ventas del mes: 5000', desde: 'cinco'},
            {texto: 'Comisión: 250.00', desde: 'doscientos', color: VERDE},
            {texto: 'Ventas del mes: 7200', desde: 'siete'},
            {texto: 'Comisión: 360.00', desde: 'trescientos', color: VERDE},
          ]},
      ],
    },
    '11': {
      fondo: 'oscuro',
      bloques: [
        {en: 0, tipo: 'codigo', previo: ORDEN_MAL, codigo: '', archivo: 'orden_mal.py', tamano: 28, salidaY: 300,
          resaltar: [{lineas: [3, 4], desde: 'pongo'}, {lineas: [5, 6], desde: 'despues'}],
          salida: [
            {texto: '> python orden_mal.py', desde: 'ejecuto', color: AZUL},
            {texto: 'Ventas del mes: 7200', desde: 'siete'},
            {texto: 'Comisión: 216.00', desde: 'doscientos', color: ROJO},
            {texto: '✗ Debía ser 360.00', desde: 'pague', color: '#FFE500'},
          ]},
        {en: 'revisa', tipo: 'lista', titulo: 'Python revisa de arriba hacia abajo', items: [
          {texto: '7.200 >= 1.000 → ✓ ¡se detiene aquí!', desde: 'detiene', icono: '🛑'},
          {texto: '7.200 >= 5.000 → nunca llega a preguntar', desde: 'nunca', icono: '🙈'},
        ]},
        {en: 'regla', tipo: 'titulo', lineas: [{texto: 'Regla de oro:', color: 'blanco', tamano: 130}, {texto: 'DE MÁS EXIGENTE A MENOS', color: 'amarillo', tamano: 150}]},
      ],
    },
    '12': {
      bloques: [
        {en: 0, tipo: 'codigo', previo: SIN_FLOAT, codigo: '', archivo: 'sin_float.py', tamano: 32, salidaY: 330,
          resaltar: [{lineas: [1], desde: 'input', hasta: 'comparas'}, {lineas: [3], desde: 'comparas'}],
          salida: [
            {texto: 'Ventas del mes: 7200', desde: 'comparas'},
            {texto: "TypeError: '>='", desde: 'queja', color: ROJO},
            {texto: 'not supported between', desde: 'queja+0.2', color: ROJO},
            {texto: "'str' and 'int'", desde: 'queja+0.4', color: ROJO},
          ]},
        {en: 'solucion', tipo: 'codigo', previo: 'ventas = float(input("Ventas del mes: "))\n', codigo: '', archivo: 'comisiones.py', tamano: 46, resaltar: [{lineas: [1], desde: 0}]},
        {en: 'int', capa: true, tipo: 'pildora', texto: 'int( ) si solo necesitas enteros', tamano: 50},
      ],
    },
    '13': {
      bloques: [
        {en: 0, tipo: 'codigo', previo: NOTAS, codigo: '', archivo: 'notas.py', tamano: 32, salidaY: 420,
          resaltar: [{lineas: [4], desde: 'ejemplo'}],
          salida: [{texto: '> python notas.py', desde: 'ejemplo+0.5', color: AZUL}, {texto: 'Aprobado', desde: 'ochenta', color: VERDE}]},
        {en: 'or#2', tipo: 'comparar', izq: {titulo: 'and', icono: '🤝', color: 'azul', items: [{texto: 'Las dos tienen que cumplirse', desde: 'or#2', icono: '•'}]},
          der: {titulo: 'or', icono: '☝️', color: 'verde', desde: 'or#2', items: [{texto: 'Basta con que una se cumpla', desde: 'basta', icono: '•'}]}},
        {en: 'envio', tipo: 'tarjeta', icono: '🚚', titulo: 'Envío gratis', texto: '`if compra > 100 or premium:`', color: 'verde'},
        {en: 'poderosas', tipo: 'titulo', lineas: [{texto: 'Condiciones', color: 'blanco', tamano: 140}, {texto: 'MÁS PODEROSAS', color: 'amarillo', tamano: 220}]},
      ],
    },
    '14': {
      paso: {n: 'BONUS', prefijo: '🎁', texto: 'El if de una línea'},
      bloques: [
        {en: 0, tipo: 'codigo', codigo: 'nota = 82\nestado = "Aprobado" if nota >= 60 else "Reprobado"\nprint(estado)', archivo: 'notas.py', velocidad: 14, tamano: 32,
          salida: [{texto: '> python notas.py', desde: 'identico-1', color: AZUL}, {texto: 'Aprobado', desde: 'identico-0.6', color: VERDE}]},
        {en: 'identico', tipo: 'formula', titulo: 'En Excel: la función SI', formula: '=SI(B2>=60;"Aprobado";"Reprobado")', escribir: false, partes: [
          {texto: 'B2>=60', nota: 'La misma condición', desde: 'identico+0.6'},
        ]},
        {en: 'usalo', tipo: 'comparar', izq: {titulo: 'If de una línea', icono: '⚡', color: 'azul', items: [{texto: 'Para elegir entre dos valores', desde: 'cortas', icono: '•'}]},
          der: {titulo: 'If normal', icono: '🧱', color: 'verde', items: [{texto: 'Para todo lo demás', desde: 'demas', icono: '•'}]}},
      ],
    },
    '15': {
      fondo: 'oscuro',
      bloques: [
        {en: 0, tipo: 'terminal', titulo: 'Errores reales · Python 3.14', ancho: 1750, lineas: [
          {texto: "1 · SyntaxError: expected ':'", desde: 'expected', color: ROJO},
          {texto: "2 · IndentationError: expected an indented block after 'if'", desde: 'sangria', color: ROJO},
          {texto: "3 · Maybe you meant '==' or ':=' instead of '='?", desde: 'quisiste', color: ROJO},
          {texto: "4 · SyntaxError: 'elif' block follows an 'else' block", desde: 'cuatro', color: ROJO},
          {texto: "5 · SyntaxError: invalid syntax. Did you mean 'if'?", desde: 'escribir', color: ROJO},
        ]},
        {en: 'lee', tipo: 'titulo', lineas: [{texto: 'Lee el error:', color: 'blanco', tamano: 140}, {texto: 'TE DICE LA SOLUCIÓN', color: 'amarillo', tamano: 170}]},
      ],
    },
    '16': {
      bloques: [
        {en: 0, tipo: 'formula', titulo: 'Excel', formula: '=SI.CONJUNTO(C2>=5000;C2*5%;C2>=1000;C2*3%;VERDADERO;0)', escribir: false, partes: [
          {texto: 'C2>=5000', nota: '1.º lo más exigente', desde: 'primero'},
          {texto: 'C2>=1000', nota: '2.º la siguiente', desde: 'luego'},
          {texto: 'VERDADERO;0', nota: 'Al final, el caso por defecto', desde: 'final'},
        ]},
        {en: 'entiendes', tipo: 'codigo', previo: COMISIONES, codigo: '', archivo: 'Python · comisiones.py', tamano: 34, resaltar: [{lineas: [3, 5, 7], desde: 0}]},
        {en: 'superpoder', tipo: 'titulo', lineas: [{texto: 'Excel + Python =', color: 'blanco', tamano: 130}, {texto: 'SUPERPODER', color: 'amarillo', tamano: 240}]},
        {en: 'aprendes', tipo: 'titulo', lineas: [{texto: 'Si no lo aprendes ahora,', color: 'blanco', tamano: 110}, {texto: 'TE EXTINGUES', color: 'rojo', tamano: 210}]},
      ],
    },
    '17': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '🏆', titulo: 'Tu reto', texto: 'Pide una nota de 0 a 100. 90 o más → Excelente · 60 o más → Aprobado · si no → Reprobado.', color: 'magenta'},
        {en: 'pista', capa: true, tipo: 'pildora', texto: '💡 Pista: el orden importa', abajo: true, tamano: 54},
        {en: 'dejame', tipo: 'titulo', lineas: [{texto: 'Déjame tu código', color: 'blanco', tamano: 140}, {texto: 'EN LOS COMENTARIOS', color: 'amarillo', tamano: 180}]},
      ],
    },
    '18': {
      bloques: [
        {en: 0, tipo: 'resumen', ideas: [
          {texto: 'if: ¿es verdad?', desde: 'if'},
          {texto: 'elif: si no, pregunta otra cosa', desde: 'elif'},
          {texto: 'else: todo lo demás', desde: 'else'},
        ]},
        {en: 'proximo', tipo: 'cierre', siguiente: 'Python en Excel con =PY()', suscribir: 'suscribete'},
      ],
    },
  },
  shorts: [
    {id: 'short-1', escena: '11', gancho: [{texto: 'Este error de Python', color: 'blanco', tamano: 90}, {texto: 'CUESTA DINERO', color: 'amarillo', tamano: 140}]},
    {id: 'short-2', escena: '15', gancho: [{texto: '5 errores', color: 'amarillo', tamano: 150}, {texto: 'de principiante en Python', color: 'blanco', tamano: 80}]},
  ],
  miniatura: {
    lineas: [{texto: 'IF ELIF ELSE', color: 'amarillo'}, {texto: 'en Python', color: 'blanco', tamano: 96}, {texto: 'FÁCIL', color: 'turquesa'}],
    pildora: 'Python',
    insignia: 'EL ERROR QUE CUESTA $',
    codigo: 'if ventas >= 5000:\n    ...\nelif ventas >= 1000:\n    ...\nelse:\n    ...',
  },
};
