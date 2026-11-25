---
canal: edwin-o
tipo: tutorial
tema: Calcular probabilidad binomial al instante con Excel y Python
slug: probabilidad-binomial
programa: Excel para Microsoft 365 en español + Python
duracion_objetivo: 9 min
estado: aprobado   # lote de enero 2027 pedido por Edwin el 25 nov 2026; se revisa completo antes de publicar
siguiente_video: Domina Power Query en 10 minutos (power-query-10-minutos)
---

<!-- Todos los resultados están verificados en Excel 365 real y en Python: ver ficha.md. -->

## ESCENA 01 · Gancho
[VISUAL] Balón frente al arco: "Mundial 2026: se falló 1 de cada 3 penales". Pregunta: "¿Probabilidad de meter los 5 de una tanda?" → "11,6 %".
[VOZ]
[curious] En el Mundial dos mil veintiséis se falló uno de cada tres penales. Entonces, ¿qué probabilidad tiene un equipo de meter los cinco penales de una tanda? Mucha gente dice "sesenta y cinco por ciento". [excited] Error. Es once coma seis por ciento. Y te voy a mostrar cómo calcularlo en un segundo.

## ESCENA 02 · Presentación
[VISUAL] Cortinilla + título "PROBABILIDAD BINOMIAL al instante". Lista: Cuándo se usa · DISTR.BINOM.N · El misterio del proveedor · Python.
[VOZ]
[excited] ¡Bienvenidos, amigos del canal! Vamos en busca del poder tecnológico. Hoy aprendes a calcular la probabilidad binomial al instante. Vas a saber cuándo se usa, cómo calcularla en Excel con una sola función, cómo resolver el misterio de un proveedor sospechoso, y cómo hacerlo en Python.

## ESCENA 03 · El caso
[VISUAL] Cifra "35 %" · "de los penales fallados a mitad del Mundial 2026 (21 de 60)" · Fuente: Prensa Latina, 11 jul 2026.
[VOZ]
El dato es real. Según Prensa Latina, a mitad del Mundial dos mil veintiséis, se habían cobrado sesenta penales, entre los del partido y los de las tandas, y se habían fallado veintiuno. Un treinta y cinco por ciento. O sea, en ese momento, la probabilidad de meter un penal era del sesenta y cinco por ciento.

## ESCENA 04 · El aporte de Edwin
<!-- APORTE: confirmar -->
[VISUAL] Tarjeta 📐: "Licenciado en Matemáticas y Física: la binomial es el tema que más asusta… y el que más sirve".
[VOZ]
Yo soy licenciado en Matemáticas y Física, y te confieso algo: en el aula, la distribución binomial es el tema que más asusta. Muchas fórmulas, factoriales, combinaciones. Pero es de lo que más sirve en el trabajo. Y la buena noticia es que con Excel no tienes que hacer ni una cuenta a mano.

## ESCENA 05 · ¿Cuándo es binomial?
[VISUAL] Lista: "1. Número fijo de intentos (5 penales)" · "2. Solo dos resultados (gol o no gol)" · "3. Misma probabilidad cada vez (65 %)" · "4. Un intento no afecta al otro".
[VOZ]
Primero, ¿cuándo se usa? Cuando se cumplen cuatro condiciones. Un número fijo de intentos: cinco penales. Solo dos resultados posibles: gol o no gol. La misma probabilidad en cada intento: sesenta y cinco por ciento. Y que un intento no afecte al otro. Si se cumplen las cuatro, es binomial.

## ESCENA 06 · La función mágica
[VISUAL] FormulaGrande: =DISTR.BINOM.N(núm_éxito;ensayos;prob_éxito;acumulado) con partes: "¿cuántos éxitos?" · "¿cuántos intentos?" · "probabilidad de cada uno" · "FALSO = exactamente · VERDADERO = como máximo".
[VOZ]
La función es DISTR punto BINOM punto N, y tiene cuatro argumentos. El número de éxitos que te interesa. El número de intentos. La probabilidad de éxito de cada intento. Y el último, el más importante: FALSO, si quieres la probabilidad de exactamente ese número, y VERDADERO, si quieres "como máximo" ese número.

## ESCENA 07 · Paso 1: los cinco penales
[VISUAL] HojaExcel: B1 Penales 5 · B2 Acierto 0,65 · B4: =DISTR.BINOM.N(5;B1;B2;FALSO) → 11,6 %.
[FORMULA] =DISTR.BINOM.N(5;5;0,65;FALSO)
[VOZ]
Paso uno: los cinco penales. En una celda escribe igual, DISTR punto BINOM punto N. Cinco éxitos, punto y coma, cinco intentos, punto y coma, cero coma sesenta y cinco, punto y coma, FALSO. Enter, y dale formato de porcentaje: once coma seis por ciento. Meter los cinco es mucho más difícil de lo que parece.

## ESCENA 08 · ¿Por qué tan bajo?
[VISUAL] Cadena: 0,65 × 0,65 × 0,65 × 0,65 × 0,65 = 0,116. Comparación: "Con 75 % de acierto: 23,7 %".
[VOZ]
¿Por qué tan bajo? Porque cada penal tiene que entrar, uno tras otro: cero coma sesenta y cinco, por cero coma sesenta y cinco, cinco veces. Y aunque el acierto fuera del setenta y cinco por ciento, la probabilidad de meter los cinco apenas llegaría al veintitrés coma siete por ciento. Por eso las tandas son tan dramáticas.

## ESCENA 09 · Paso 2: "al menos"
[VISUAL] =DISTR.BINOM.SERIE(5;0,65;4;5) → 42,8 %. Globo: "de 4 a 5 goles".
[FORMULA] =DISTR.BINOM.SERIE(5;0,65;4;5)
[VOZ]
Paso dos: ¿y si me basta con meter al menos cuatro? Para un rango de éxitos usa DISTR punto BINOM punto SERIE. Ojo, que el orden cambia: primero los intentos, cinco; luego la probabilidad; y al final el rango, de cuatro a cinco. Resultado: cuarenta y dos coma ocho por ciento.

## ESCENA 10 · Paso 3: la tabla completa
[VISUAL] A7:A12 =SECUENCIA(6;1;0) → 0..5 · B7 =DISTR.BINOM.N(A7#;5;0,65;FALSO) → 0,5 % · 4,9 % · 18,1 % · 33,6 % · 31,2 % · 11,6 %. Gráfico de barras.
[FORMULA] =DISTR.BINOM.N(SECUENCIA(6;1;0);5;0,65;FALSO)
[VOZ]
Paso tres: la tabla completa, con una sola fórmula. Con SECUENCIA genero los números de cero a cinco, y se los paso a DISTR punto BINOM punto N. Excel calcula todas las probabilidades de golpe. Haz un gráfico de columnas, y verás que lo más probable es meter tres goles: treinta y tres coma seis por ciento.

## ESCENA 11 · El misterio del proveedor
[VISUAL] Fondo azul. Tarjeta 🕵️: "El proveedor jura: solo el 5 % sale defectuoso". Caja abierta: "Lote de 20 piezas → 5 defectuosas". Pregunta: "¿Mala suerte… o mentira?".
[VOZ]
Ahora, un misterio. Tu proveedor jura que solo el cinco por ciento de sus piezas sale defectuoso. Llega un lote de veinte piezas… y cinco están dañadas. El proveedor dice: "fue mala suerte". ¿Le crees? Como buen analista de datos, no opinas: calculas.

## ESCENA 12 · Resolviendo el misterio
[VISUAL] =1-DISTR.BINOM.N(4;20;0,05;VERDADERO) → 0,26 %. Cifra: "1 en 389".
[FORMULA] =1-DISTR.BINOM.N(4;20;0,05;VERDADERO)
[VOZ]
La pregunta es: si fuera cierto el cinco por ciento, ¿qué probabilidad hay de encontrar cinco o más defectuosas? Calculamos "como máximo cuatro" con VERDADERO, y se lo restamos a uno. Resultado: cero coma veintiséis por ciento. Más o menos una vez cada trescientos ochenta y nueve lotes. O sea, tendrías que recibir cientos de lotes para que te pasara una sola vez. [serious] No es mala suerte: es casi imposible. Hay que reclamar.

## ESCENA 13 · El truco del "al menos"
[VISUAL] Tarjeta: "Al menos k = 1 − DISTR.BINOM.N(k−1; …; VERDADERO)". Igual a DISTR.BINOM.SERIE(20;0,05;5;20) = 0,26 %.
[VOZ]
Apréndete este truco, que es el que más se usa: "al menos cinco" es igual a uno, menos "como máximo cuatro". Por eso pusimos cuatro y no cinco. Y si prefieres no restar, DISTR punto BINOM punto SERIE de cinco a veinte da exactamente lo mismo: cero coma veintiséis por ciento.

## ESCENA 14 · ¿Y lo normal?
[VISUAL] Barras: 0 defectuosas 35,8 % · 1 → 37,7 % · hasta 2 → 92,5 %. Píldora: "Lo normal: 0, 1 o 2".
[VOZ]
Para comparar, ¿qué sería lo normal? Con un cinco por ciento real, lo más probable es encontrar cero defectuosas, treinta y cinco coma ocho por ciento, o una, treinta y siete coma siete. Y dos o menos pasa el noventa y dos coma cinco por ciento de las veces. Cinco está muy, muy lejos de lo normal.

## ESCENA 15 · La binomial y la IA
[VISUAL] "Si la IA acierta el 90 % de las fórmulas…" → "10 de 10 bien: 34,9 %" · "Al menos 8 de 10: 93 %". Píldora: "Por eso: verifica".
[VOZ]
Y esto conecta con el video del duelo entre ChatGPT y Claude. Supón que una inteligencia artificial acierta el noventa por ciento de las fórmulas que le pides. ¿Qué probabilidad hay de que te dé diez fórmulas seguidas todas buenas? Solo treinta y cuatro coma nueve por ciento. Por eso siempre hay que verificar.

## ESCENA 16 · Dónde la usa un analista de datos
[VISUAL] Cuadrícula: "🏭 Control de calidad" · "📧 Respuestas a una campaña de correos" · "📞 Ventas por llamadas" · "🧪 Pruebas A/B" · "🏥 Ausentismo" · "🤖 Revisar respuestas de la IA".
[VOZ]
¿Dónde la usa un analista de datos en la vida real? En control de calidad, como el caso del proveedor. En campañas: si mandas doscientos correos y cada uno tiene cierta probabilidad de respuesta, la binomial te dice qué resultado es normal y cuál es una señal de alarma. En ventas por llamadas, en pruebas A B, en ausentismo… En todos los casos, la pregunta es la misma: ¿esto es normal, o está pasando algo?

## ESCENA 17 · En Python
[VISUAL] Código: from math import comb · def binomial(k, n, p): return comb(n, k) * p**k * (1 - p)**(n - k) · 3 prints. Terminal: "5 de 5 penales: 11.6%" · "5 o más defectuosos de 20: 0.26%" · "10 de 10 fórmulas bien: 34.9%".
[VOZ]
¿Y en Python? Ni siquiera necesitas instalar nada. Con comb, de la biblioteca math, escribes la fórmula de la binomial en una línea: las combinaciones, por la probabilidad elevada a los éxitos, por la probabilidad contraria elevada a los fracasos. Lo ejecuto… y salen los mismos tres resultados que en Excel.

## ESCENA 18 · Detrás de la fórmula
[VISUAL] =COMBINAT(5;3) → 10. Tarjeta: "10 formas de meter 3 de 5 × 0,65³ × 0,35² = 33,6 %".
[VOZ]
Si te da curiosidad qué hay detrás: COMBINAT de cinco en tres da diez. Son las diez formas distintas de meter tres penales de cinco. Cada forma tiene su probabilidad, y la binomial las suma todas. Eso es lo que hace la función por ti, en un instante.

## ESCENA 19 · Si no te funcionó
[VISUAL] ListaErrores: "#¡NUM!" → "Escribiste 65 en vez de 0,65" · "#¡VALOR!" → "Hay texto en un argumento" · "Resultado raro" → "Revisa FALSO (exactamente) o VERDADERO (como máximo)".
[VOZ]
Si no te funcionó: numeral NUM casi siempre es porque escribiste sesenta y cinco en lugar de cero coma sesenta y cinco; la probabilidad va entre cero y uno. Numeral valor, hay un texto donde debería ir un número. Y si el resultado te parece raro, revisa si pusiste FALSO o VERDADERO.

## ESCENA 20 · Resumen
[VISUAL] Resumen3: "4 condiciones = binomial" · "FALSO exactamente · VERDADERO como máximo" · "Al menos = 1 − acumulado".
[VOZ]
En resumen: si hay intentos fijos, dos resultados, la misma probabilidad y no se afectan entre sí, es binomial. FALSO es "exactamente", VERDADERO es "como máximo". Y "al menos" es uno menos el acumulado. [serious] Si no lo aprendes ahora, te extingues.

## ESCENA 21 · Cierre y siguiente video
[VISUAL] Tienda con QR. CierreSiguiente: "Domina Power Query en 10 minutos".
[VOZ]
Si quieres plantillas de Excel y más recursos, visita mi página, edwinortiz punto net, y entra a la tienda; el enlace está abajo. En el próximo video volvemos a Power Query, pero en serio: lo dominas en diez minutos, con diez movimientos que vas a usar toda la vida. Suscríbete para no perdértelo. [excited] El poder de la tecnología te va a cambiar el mundo.
