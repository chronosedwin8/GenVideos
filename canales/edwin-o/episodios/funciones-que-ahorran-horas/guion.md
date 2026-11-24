---
canal: edwin-o
tipo: lista
tema: 7 funciones de Excel que te ahorran horas
slug: funciones-que-ahorran-horas
programa: Excel para Microsoft 365 en español
duracion_objetivo: 9 min
estado: aprobado   # lote de 4 semanas pedido por Edwin el 24 nov 2026; se revisa completo antes de publicar
siguiente_video: Automatiza Excel con Python (python-automatizar-excel)
---

<!-- Datos verificados en ficha.md. Hoja Ventas A2:D9: Vendedor | Región | Producto | Monto. -->

## ESCENA 01 · Gancho
[VISUAL] Hoja de ventas. Se escribe =FILTRAR(...) y aparecen solas las ventas de la región Norte, con destello.
[VOZ]
[curious] ¿Cada lunes filtras, copias y pegas el mismo reporte? [excited] Mira esto: una sola fórmula, y Excel te trae solo las ventas de la región Norte. Y si mañana cambian los datos, el reporte se actualiza solo.

## ESCENA 02 · Presentación
[VISUAL] Cortinilla + título "7 funciones que te ahorran horas".
[VOZ]
[excited] ¡Bienvenidos, amigos del canal! Vamos en busca del poder tecnológico. Hoy te traigo siete funciones de Excel que te van a ahorrar horas de trabajo cada semana. La mayoría de la gente no las usa, porque aprendió Excel hace años y nadie le contó que existen. Quédate hasta el final, porque la número siete hace que tus fórmulas largas por fin se entiendan.

## ESCENA 03 · El caso: Excel cumplió 40 años
[VISUAL] Cifra "40 años" · Línea de tiempo: 1985 Excel 1.0 para Mac → 2022 llegan 14 funciones de texto y matrices → 30 sep 2025 Excel cumple 40.
[VOZ]
Un dato curioso: Excel cumplió cuarenta años el treinta de septiembre de dos mil veinticinco. Y aunque es un programa viejo, en los últimos años cambió más que nunca. Microsoft le agregó funciones que hacen en un segundo lo que antes te tomaba media hora. El problema es que casi todos seguimos trabajando como en dos mil diez. Seguimos usando BUSCARV, filtros manuales y fórmulas de tres renglones que nadie entiende. Hoy eso cambia.

## ESCENA 04 · Lo que tienen en común: el desbordamiento
[VISUAL] Una fórmula en F2 y el resultado "se derrama" a varias celdas, con borde azul. Tarjeta: "#¡DESBORDAMIENTO! = hay algo estorbando". Píldora: "Excel 2021, 2024 o Microsoft 365".
[VOZ]
Antes de empezar, una idea clave. Estas funciones escriben la fórmula en una sola celda, y el resultado se desborda hacia abajo o hacia los lados, ocupando las celdas que necesite. Si ves el error desbordamiento, es porque hay algo estorbando en esas celdas: bórralo y listo. Eso sí, necesitas Excel dos mil veintiuno, dos mil veinticuatro, o Microsoft trescientos sesenta y cinco.

## ESCENA 05 · El aporte de Edwin
<!-- APORTE: confirmar con Edwin -->
[VISUAL] Tarjeta 🏫: "La que más sorprende en mis talleres: FILTRAR".
[VOZ]
En mis talleres con docentes y personal administrativo, siempre pasa lo mismo: cuando muestro estas funciones, alguien dice "¿y por qué nadie me enseñó esto antes?". La que más los sorprende es FILTRAR. Ya vas a ver por qué.

## ESCENA 06 · 1. BUSCARX
[VISUAL] Número 1/7. HojaExcel "Precios": A Código · B Producto · C Precio. En G2 se escribe =BUSCARX(F2;A2:A6;C2:C6;"No existe") → 310. F3 = P-999 → "No existe".
[FORMULA] =BUSCARX(F2;A2:A6;C2:C6;"No existe")
[VOZ]
Número uno: BUSCARX, la heredera de BUSCARV. Le dices qué buscar, dónde buscarlo y qué columna devolver. Igual, BUSCARX, F dos, la columna de códigos, la columna de precios, y entre comillas: no existe. El código P ciento tres devuelve trescientos diez. Y si el código no existe, en vez del feo error, te dice "no existe". Además, puede buscar hacia la izquierda, algo que BUSCARV nunca pudo hacer.

## ESCENA 07 · 2. FILTRAR
[VISUAL] Número 2/7. Hoja Ventas. En F2 =FILTRAR(A2:D9;B2:B9="Norte";"Sin datos") → 3 filas del Norte se desbordan. Luego B4 cambia de Norte a Sur y el resultado se actualiza.
[FORMULA] =FILTRAR(A2:D9;B2:B9="Norte";"Sin datos")
[VOZ]
Número dos: FILTRAR, la que viste al principio. Primero le das la tabla, luego la condición, y al final qué mostrar si no hay resultados. FILTRAR, A dos a D nueve, punto y coma, la columna región igual a Norte. Y aparecen las tres ventas del Norte. Lo mejor es que no es una copia: si alguien cambia una región en la tabla original, el reporte se actualiza al instante. Se acabó el filtrar, copiar y pegar.

## ESCENA 08 · 3. UNICOS
[VISUAL] Número 3/7. =UNICOS(A2:A9) → Ana, Luis, Marta, Pedro, Sofía. Junto a ella =CONTAR.SI para contar ventas por vendedor.
[FORMULA] =UNICOS(A2:A9)
[VOZ]
Número tres: UNICOS. ¿Necesitas la lista de vendedores sin repetir? Igual, UNICOS, y la columna de vendedores. Listo: Ana, Luis, Marta, Pedro y Sofía, cada uno una sola vez. Y si mañana llega un vendedor nuevo, aparece solo en la lista. Es perfecta para armar listas desplegables o la base de un resumen.

## ESCENA 09 · 4. ORDENARPOR + TOMAR
[VISUAL] Número 4/7. =ORDENARPOR(A2:D9;D2:D9;-1) ordena por monto de mayor a menor. Luego se envuelve en TOMAR(...;3): quedan los 3 mejores con medallas 🥇🥈🥉.
[FORMULA] =TOMAR(ORDENARPOR(A2:D9;D2:D9;-1);3)
[VOZ]
Número cuatro: ORDENARPOR. Ordena una tabla por la columna que tú quieras, sin tocar los datos originales. ORDENARPOR, la tabla, la columna de montos, y menos uno para que vaya de mayor a menor. Y ahora el truco: envuélvela en TOMAR, con un tres, y obtienes tu top tres de ventas. Luis con mil doscientos cincuenta, Ana con mil doscientos, y Pedro con mil ciento cincuenta. Un ranking automático en una sola línea.

## ESCENA 10 · 5. DIVIDIRTEXTO
[VISUAL] Número 5/7. Columna A con códigos "2026-COL-0457", "2026-MEX-1290". =DIVIDIRTEXTO(A2;"-") → Año · País · Número en tres columnas.
[FORMULA] =DIVIDIRTEXTO(A2;"-")
[VOZ]
Número cinco: DIVIDIRTEXTO. ¿Te llegan códigos o nombres todos pegados en una sola celda? Igual, DIVIDIRTEXTO, la celda, y entre comillas el separador, en este caso un guion. Y el código se reparte en tres columnas: el año, el país y el número. Antes esto se hacía con Texto en columnas, y había que repetirlo cada vez. Ahora es una fórmula que se actualiza sola.

## ESCENA 11 · 6. APILARV
[VISUAL] Número 6/7. Dos tablas (Enero y Febrero) en pestañas distintas. =APILARV(Enero!A2:D4;Febrero!A2:D4) → una sola tabla, Enero arriba y Febrero abajo.
[FORMULA] =APILARV(Enero!A2:D4;Febrero!A2:D4)
[VOZ]
Número seis: APILARV, la V es de vertical. ¿Tienes una hoja por mes y necesitas todo junto? APILARV, la tabla de enero, punto y coma, la tabla de febrero. Y Excel las pone una debajo de la otra, en una sola tabla. Puedes agregar marzo, abril, y todos los meses que quieras. Y combinada con FILTRAR u ORDENARPOR, tienes un reporte anual en minutos.

## ESCENA 12 · 7. LET
[VISUAL] Número 7/7. Fórmula larga que repite BUSCARX dos veces. Se transforma en =LET(precio;BUSCARX(...);SI(precio>1000;precio*90%;precio)) con "precio" resaltado. Resultado: 1.080.
[FORMULA] =LET(precio;BUSCARX(F2;A2:A6;C2:C6);SI(precio>1000;precio*90%;precio))
[VOZ]
Y número siete: LET, la que te prometí. Con LET le pones nombre a una parte de la fórmula. Mira: aquí busco el precio y, si pasa de mil, le aplico un diez por ciento de descuento. Sin LET, tendría que escribir el BUSCARX dos veces. Con LET, lo calculo una vez, lo llamo "precio", y lo uso donde quiera. El resultado: mil ochenta. La fórmula es más corta, más rápida, y cualquiera la entiende. Y si dentro de un mes tienes que cambiar algo, lo cambias en un solo lugar.

## ESCENA 13 · Bonus: combínalas
[VISUAL] =ORDENARPOR(UNICOS(FILTRAR(A2:A9;B2:B9="Norte"));...) simplificado: =ORDENAR(UNICOS(FILTRAR(A2:A9;B2:B9="Norte"))) → Ana, Luis, Marta.
[FORMULA] =ORDENAR(UNICOS(FILTRAR(A2:A9;B2:B9="Norte")))
[VOZ]
Bonus: el verdadero poder aparece cuando las combinas. Por ejemplo: FILTRAR los vendedores del Norte, quitar los repetidos con UNICOS, y ordenarlos alfabéticamente con ORDENAR. Una sola fórmula, y tienes una lista limpia y ordenada: Ana, Luis y Marta. Es como armar con piezas de lego: cada función hace una cosa, y juntas construyen un reporte completo. Y si cambias Norte por Sur en una celda, la lista se recalcula en el acto.

## ESCENA 14 · Si no te funciona
[VISUAL] ListaErrores: "#¿NOMBRE?" → "Tu versión no tiene la función" · "#¡DESBORDAMIENTO!" → "Libera las celdas de abajo" · "#¡CALC!" → "FILTRAR no encontró nada: usa el tercer argumento".
[VOZ]
Si algo no te funciona, revisa esto. Si ves numeral nombre, tu versión de Excel no tiene esa función. Si ves desbordamiento, libera las celdas donde va el resultado. Y si FILTRAR te da numeral calc, es porque no encontró nada: por eso siempre conviene usar el tercer argumento, el de "sin datos".

## ESCENA 15 · Truco: conviértelo en Tabla
[VISUAL] Teclas Ctrl + T. La hoja de ventas se convierte en Tabla con bandas. La fórmula cambia a =FILTRAR(Ventas;Ventas[Región]="Norte";"Sin datos"). Se agrega una fila nueva (Andrés · Norte · Laptop · 1.300) y aparece sola en el resultado.
[FORMULA] =FILTRAR(Ventas;Ventas[Región]="Norte";"Sin datos")
[VOZ]
Un truco que multiplica todo lo anterior. Selecciona tus datos y presiona Control más T, para convertirlos en una Tabla. Dale un nombre, por ejemplo, Ventas. Ahora tus fórmulas pueden decir FILTRAR Ventas, donde la región sea Norte. ¿Y la ventaja? Cuando agregas una venta nueva al final, la Tabla crece sola, y todas tus fórmulas la incluyen automáticamente. Nunca más vas a tener que cambiar A dos a D nueve por A dos a D diez.

## ESCENA 16 · ¿Y si tengo Excel 2016 o 2019?
[VISUAL] Tarjetas: "Excel para la web: gratis con una cuenta Microsoft" · "Pídele a tu empresa Microsoft 365" · "Mientras tanto: BUSCARV + filtros".
[VOZ]
¿Y si en tu trabajo tienes Excel dos mil dieciséis o dos mil diecinueve? Tienes dos caminos. El primero: Excel para la web, que es gratis con una cuenta de Microsoft, y ya trae estas funciones. Ábrelo desde el navegador y practica ahí. El segundo: muéstrale este video a tu jefe. Cuando vea cuántas horas se ahorra el equipo, la actualización se paga sola.

## ESCENA 17 · Por qué importa
[VISUAL] Comparar: "Antes" (filtrar, copiar, pegar · fórmulas larguísimas · repetirlo cada semana) vs "Ahora" (una fórmula · se actualiza sola · la entiendes).
[VOZ]
¿Por qué importa todo esto? Porque el trabajo que haces cada semana a mano, copiando, pegando y ordenando, se puede hacer con una fórmula que trabaja por ti. Y en un mundo donde la inteligencia artificial ya hace hojas de cálculo, [serious] si no lo aprendes ahora, te extingues.

## ESCENA 18 · Resumen y siguiente video
[VISUAL] Cuadrícula con las 7 funciones. Luego CierreSiguiente: "Automatiza Excel con Python".
[VOZ]
En resumen: BUSCARX, FILTRAR, UNICOS, ORDENARPOR, DIVIDIRTEXTO, APILARV y LET. Siete funciones, horas de trabajo ahorradas. Dime en los comentarios cuál vas a usar primero. Y en el próximo video vamos un paso más allá: vas a ver cómo Python crea decenas de reportes de Excel en segundos. Suscríbete para no perdértelo. [excited] El poder de la tecnología te va a cambiar el mundo.
