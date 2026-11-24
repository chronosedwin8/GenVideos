---
canal: edwin-o
tipo: tutorial
tema: AGRUPARPOR y PIVOTARPOR — resúmenes sin tablas dinámicas
slug: agruparpor-excel
programa: Excel para Microsoft 365 en español
duracion_objetivo: 9 min
estado: aprobado   # lote de 4 semanas pedido por Edwin el 24 nov 2026; se revisa completo antes de publicar
siguiente_video: Condicionales en Python, IF ELIF ELSE (python-if-elif-else)
---

<!-- Datos verificados en ficha.md. Hoja Ventas A1:D13: Mes | Región | Producto | Monto. -->

## ESCENA 01 · Gancho
[VISUAL] Tabla dinámica con total 10.920. Se cambia un dato y la tabla dinámica NO cambia (sigue 10.920, en rojo). Al lado, AGRUPARPOR cambia sola a 11.320.
[VOZ]
[curious] Cambias un dato… y tu tabla dinámica se queda igual. Tienes que acordarte de darle actualizar, y si se te olvida, el informe sale mal. [excited] Mira este otro resumen: está hecho con una sola fórmula, y se actualiza solo, al instante.

## ESCENA 02 · Presentación
[VISUAL] Cortinilla + título "AGRUPARPOR".
[VOZ]
[excited] ¡Bienvenidos, amigos del canal! Vamos en busca del poder tecnológico. Hoy te enseño AGRUPARPOR y su hermana PIVOTARPOR, dos funciones que hacen resúmenes como una tabla dinámica, pero con una fórmula. Te muestro cómo ordenar, filtrar, poner encabezados, y cuándo te conviene más la tabla dinámica de toda la vida.

## ESCENA 03 · El caso
[VISUAL] Tarjeta: "Journal of Accountancy, junio de 2025: 'Dile adiós a las tablas dinámicas con PIVOTBY'". Píldora: "Disponible en Microsoft 365 desde septiembre de 2024".
[VOZ]
Estas funciones están dando de qué hablar entre contadores y analistas. En junio de dos mil veinticinco, el Journal of Accountancy, la revista de los contadores públicos de Estados Unidos, publicó un artículo con un título muy directo: "Dile adiós a las tablas dinámicas". Exagerado, sí. Pero tiene una parte de razón, y hoy vas a ver cuál.

## ESCENA 04 · El aporte de Edwin
<!-- APORTE: confirmar con Edwin -->
[VISUAL] Tarjeta 🏫: "La queja número uno: 'cambié los datos y la tabla dinámica no cambió'".
[VOZ]
En mis capacitaciones, la queja número uno sobre las tablas dinámicas siempre es la misma: "profe, cambié los datos y la tabla no cambió". Y no es un error: la tabla dinámica es una foto de tus datos. Hay que actualizarla. Con AGRUPARPOR, en cambio, el resumen es una fórmula, y las fórmulas siempre están al día.

## ESCENA 05 · Lo que necesitas
[VISUAL] Tarjeta: "Excel para Microsoft 365 (canal actual)". ListaErrores mini: "#¿NOMBRE? → tu versión aún no la tiene".
[VOZ]
Antes de empezar: AGRUPARPOR está en Excel para Microsoft trescientos sesenta y cinco. Si escribes la fórmula y te sale el error numeral nombre, tu versión todavía no la tiene. En ese caso, revisa que tu Office esté actualizado, o pídele a tu empresa que lo actualice.

## ESCENA 06 · Los datos
[VISUAL] HojaExcel "Ventas": A Mes · B Región · C Producto · D Monto, 12 filas (enero y febrero).
[VOZ]
Estos son nuestros datos: doce ventas de enero y febrero. Columna A el mes, B la región, C el producto, y D el monto. La pregunta del jefe es la de siempre: ¿cuánto vendió cada región?

## ESCENA 07 · Paso 1: la fórmula básica
[VISUAL] En F2 se escribe =AGRUPARPOR(B2:B13;D2:D13;SUMA). Resultado: Centro 2.235 · Norte 6.345 · Sur 2.340 · Total 10.920.
[FORMULA] =AGRUPARPOR(B2:B13;D2:D13;SUMA)
[VOZ]
Paso uno. En una celda vacía escribe: igual, AGRUPARPOR, abre paréntesis. Primero, la columna por la que quieres agrupar: las regiones, de B dos a B trece. Punto y coma. Luego, los valores que quieres sumar: los montos, de D dos a D trece. Punto y coma, y la función: SUMA. Cierra y presiona Enter. [excited] ¡Listo! Centro, Norte y Sur, cada uno con su total, y hasta el total general al final.

## ESCENA 08 · Paso 2: entiende los tres argumentos
[VISUAL] FormulaGrande con partes: B2:B13 → "¿Por qué agrupo?" · D2:D13 → "¿Qué calculo?" · SUMA → "¿Cómo lo calculo?".
[VOZ]
Fíjate que la fórmula responde tres preguntas. ¿Por qué agrupo? Por región. ¿Qué calculo? Los montos. ¿Y cómo lo calculo? Sumando. Si en vez de SUMA escribes CONTARA, te dice cuántas ventas hubo en cada región. Con esas tres preguntas ya puedes armar casi cualquier resumen.

## ESCENA 09 · Paso 3: ordena de mayor a menor
[VISUAL] Se agrega ;;;-2 y el resultado se reordena: Norte 6.345 · Sur 2.340 · Centro 2.235 · Total 10.920.
[FORMULA] =AGRUPARPOR(B2:B13;D2:D13;SUMA;;;-2)
[VOZ]
Paso tres: ordenar. Por defecto, AGRUPARPOR ordena alfabéticamente. Pero el jefe quiere ver primero la región que más vendió. El sexto argumento es el orden: escribe punto y coma tres veces y luego menos dos. El dos significa "la segunda columna del resultado", la de los montos, y el signo menos significa de mayor a menor. Ahora Norte está arriba.

## ESCENA 10 · Paso 4: pon encabezados
[VISUAL] Fórmula con B1:B13 y D1:D13 y un 3 en el cuarto argumento. Aparecen los encabezados "Región" y "Monto".
[FORMULA] =AGRUPARPOR(B1:B13;D1:D13;SUMA;3)
[VOZ]
Paso cuatro: encabezados. Si quieres que el resumen muestre los títulos de las columnas, incluye la fila uno en los rangos, y en el cuarto argumento escribe un tres, que significa: sí tiene encabezados, y muéstralos. Así tu resumen queda listo para copiar a un informe.

## ESCENA 11 · Paso 5: filtra sin tocar nada
[VISUAL] Fórmula con A2:A13="Feb" en el séptimo argumento. Resultado: Centro 1.510 · Norte 3.635 · Sur 1.070 · Total 6.215.
[FORMULA] =AGRUPARPOR(B2:B13;D2:D13;SUMA;;;;A2:A13="Feb")
[VOZ]
Paso cinco, y este me encanta: filtrar dentro de la fórmula. El séptimo argumento es un filtro. Escribe A dos a A trece igual a Feb, entre comillas. Ahora el resumen solo cuenta las ventas de febrero. No tocaste los datos, no pusiste filtros, y si cambias Feb por Ene en la fórmula, ves enero.

## ESCENA 12 · Paso 6: se actualiza sola
[VISUAL] D8 cambia de 3.600 a 4.000. El resumen cambia: Norte 6.745 · Total 11.320, con destello.
[VOZ]
Paso seis: la prueba de fuego. Cambio una venta de Norte, de tres mil seiscientos a cuatro mil. Y mira el resumen: Norte sube a seis mil setecientos cuarenta y cinco, y el total a once mil trescientos veinte. Sin actualizar, sin clics. Eso es lo que hace que tus informes nunca salgan con datos viejos.

## ESCENA 13 · Paso 7: dos niveles
[VISUAL] Tarjeta: "Agrupa por dos columnas: B2:C13 → Región y Producto". Mini cuadrícula: Norte → Laptop 6.000 · Monitor 310 · Mouse 35.
[VOZ]
Paso siete: dos niveles. Si en el primer argumento seleccionas dos columnas, región y producto, AGRUPARPOR agrupa primero por región, y dentro de cada región, por producto. Por ejemplo, en Norte verías que las laptops suman seis mil, los monitores trescientos diez, y los mouse treinta y cinco. Y con el quinto argumento decides si quieres subtotales.

## ESCENA 14 · PIVOTARPOR: filas y columnas
[VISUAL] =PIVOTARPOR(B2:B13;A2:A13;D2:D13;SUMA) → matriz: filas Centro/Norte/Sur, columnas Ene/Feb/Total.
[FORMULA] =PIVOTARPOR(B2:B13;A2:A13;D2:D13;SUMA)
[VOZ]
Y ahora, su hermana: PIVOTARPOR. Funciona igual, pero además de filas, tiene columnas. Las regiones van en las filas, los meses en las columnas, y los montos en el centro. Igual, PIVOTARPOR, las regiones, los meses, los montos y SUMA. Y tienes una matriz completa: cada región, cada mes, con sus totales. Exactamente lo que harías con una tabla dinámica.

## ESCENA 15 · Un mini tablero en tres fórmulas
[VISUAL] Hoja "Tablero" con tres bloques: por región (AGRUPARPOR), por mes (PIVOTARPOR) y solo febrero (AGRUPARPOR con filtro). Se cambia un dato y los tres bloques cambian a la vez.
[VOZ]
Ahora junta todo. En una hoja nueva llamada Tablero, pon tres fórmulas: el resumen por región, la matriz por mes con PIVOTARPOR, y el resumen filtrado de febrero. Tres fórmulas, tres bloques de información. Y cuando alguien cambia un dato en la hoja de ventas, los tres bloques se actualizan al mismo tiempo. Acabas de construir un mini tablero de control, sin una sola tabla dinámica y sin macros.

## ESCENA 16 · Dale formato
[VISUAL] Se selecciona el resultado y se aplica formato de miles: 6345 → 6.345. Formato condicional resalta en verde la región con más ventas.
[VOZ]
Un detalle de presentación. Si el resumen te sale sin separador de miles, selecciónalo y dale formato de número desde la pestaña Inicio, como a cualquier celda. Y si quieres que salte a la vista la región ganadora, ponle formato condicional para resaltar el valor más alto. Como el resultado se mueve cuando cambian los datos, aplica el formato a unas filas de más, para que siempre quede cubierto.

## ESCENA 17 · ¿Fórmula o tabla dinámica?
[VISUAL] Comparar: "Tabla dinámica" (✓ explorar arrastrando · ✓ formato fácil · ✗ hay que actualizar) vs "AGRUPARPOR" (✓ se actualiza sola · ✓ filtra en la fórmula · ✓ se combina con otras fórmulas).
[VOZ]
Entonces, ¿se acabaron las tablas dinámicas? No. La tabla dinámica sigue siendo mejor para explorar: arrastras campos, pruebas, y le das formato en segundos. Pero cuando ya sabes qué resumen necesitas, y quieres que se actualice solo, que se pueda filtrar y combinar con otras fórmulas, AGRUPARPOR gana. Usa las dos. Esa es la parte de razón que tenía el artículo.

## ESCENA 18 · Errores comunes
[VISUAL] ListaErrores: "#¿NOMBRE?" → "Tu Excel aún no la tiene" · "#¡DESBORDAMIENTO!" → "Libera las celdas de abajo" · "#¡VALOR!" → "Los rangos deben tener el mismo tamaño".
[VOZ]
Los errores más comunes. Numeral nombre: tu versión de Excel todavía no tiene la función. Desbordamiento: hay algo estorbando donde va el resultado, bórralo. Y numeral valor: casi siempre es porque los rangos no tienen el mismo tamaño. Si agrupas de B dos a B trece, los valores también tienen que ir de la fila dos a la trece.

## ESCENA 19 · Truco: combínala con una Tabla
[VISUAL] Teclas Ctrl + T → la hoja se convierte en Tabla "Ventas". Fórmula =AGRUPARPOR(Ventas[Región];Ventas[Monto];SUMA). Se agrega una fila y el resumen la incluye.
[FORMULA] =AGRUPARPOR(Ventas[Región];Ventas[Monto];SUMA)
[VOZ]
Un truco para terminar. Convierte tus datos en Tabla con Control más T, y escribe la fórmula con los nombres de las columnas: Ventas, región, y Ventas, monto. Ahora, cada venta nueva que agregues al final entra sola en el resumen. Datos que crecen, resumen que se actualiza, y tú sin mover un dedo. [serious] Si no lo aprendes ahora, te extingues.

## ESCENA 20 · Resumen y siguiente video
[VISUAL] Resumen3: "Agrupa · calcula · ¿cómo?" · "Ordena y filtra en la fórmula" · "Se actualiza sola". CierreSiguiente: "Condicionales en Python: IF, ELIF y ELSE".
[VOZ]
En resumen: AGRUPARPOR responde tres preguntas, por qué agrupo, qué calculo y cómo. Puedes ordenar y filtrar dentro de la fórmula, y se actualiza sola. En el próximo video cambiamos de herramienta: te enseño las condicionales de Python, IF, ELIF y ELSE, para que tus programas tomen decisiones. Suscríbete para no perdértelo. [excited] El poder de la tecnología te va a cambiar el mundo.
