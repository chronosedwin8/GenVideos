---
canal: edwin-o
tipo: lista
tema: 5 errores de Excel que cometen hasta los expertos
slug: errores-comunes-excel
programa: Excel para Microsoft 365 en español
duracion_objetivo: 9 min
estado: aprobado   # lote de 4 semanas pedido por Edwin el 24 nov 2026; se revisa completo antes de publicar
siguiente_video: Fórmulas de Excel con IA que sí funcionan (formulas-con-ia) — último del año: recomendar un video anterior
---

<!-- Ejemplos verificados en ficha.md. -->

## ESCENA 01 · Gancho
[VISUAL] Hoja: B2 10 · B3 10 · B4 10 · B5 (suma) 31. Signo de interrogación gigante.
[VOZ]
[curious] Diez, más diez, más diez… ¿treinta y uno? No, no es un error de Excel. Es uno de los cinco errores que cometen hasta los expertos, y que pueden hacer que tu informe muestre números que no cuadran. [excited] Hoy te enseño a detectarlos y a corregirlos.

## ESCENA 02 · Presentación
[VISUAL] Cortinilla + título "5 errores de Excel".
[VOZ]
[excited] ¡Bienvenidos, amigos del canal! Vamos en busca del poder tecnológico. Este es el último video del año, y quise cerrarlo con algo que te va a ahorrar dolores de cabeza en dos mil veintisiete. Cinco errores silenciosos: no muestran ningún mensaje, pero dan resultados equivocados. Y al final te dejo una lista de revisión para antes de enviar cualquier archivo.

## ESCENA 03 · El caso
[VISUAL] Cifra "4.315 dólares" · "costo promedio de un error significativo en una hoja de cálculo". Luego: "3,6 horas a la semana corrigiendo" · "53 %: errores cada semana" · "2 de cada 5 no se reportan". Fuente: encuesta de DOSS.
[VOZ]
¿Cuánto cuesta un error en Excel? Una encuesta de la empresa de software DOSS, con más de mil profesionales de operaciones en Estados Unidos, calculó que un error significativo en una hoja de cálculo cuesta en promedio cuatro mil trescientos quince dólares. Además, esas personas pierden casi cuatro horas a la semana corrigiendo hojas. Y lo más preocupante: dos de cada cinco errores se corrigen sin que nadie se entere.

## ESCENA 04 · El aporte de Edwin
<!-- APORTE: confirmar con Edwin -->
[VISUAL] Tarjeta 🔍: "Lo que más encuentro al revisar archivos: números guardados como texto".
[VOZ]
Cuando reviso archivos de mis estudiantes, y también de empresas, hay un error que aparece más que todos los demás. Sobre todo en datos que vienen de otro sistema. Es el error número uno de hoy, y casi nadie lo nota hasta que el total no cuadra.

## ESCENA 05 · Error 1: números guardados como texto
[VISUAL] Número 1/5. HojaExcel: D2:D6 = 1.200 · 35 · 310 · 1150 (alineado a la izquierda, triángulo verde) · 60. =SUMA(D2:D6) → 1.605. Globo: "¡Debería ser 2.755!".
[VOZ]
Error número uno: números guardados como texto. Mira esta columna de ventas. ¿Ves que uno de los números está pegado a la izquierda, y tiene un triangulito verde en la esquina? Excel lo está tratando como texto. Y la función SUMA ignora los textos. Resultado: el total da mil seiscientos cinco, cuando en realidad es dos mil setecientos cincuenta y cinco. Le faltan mil ciento cincuenta pesos, y nadie lo nota.

## ESCENA 06 · Cómo corregirlo
[VISUAL] Clic en el triángulo → menú "Convertir en número". El total cambia a 2.755. Tarjeta: "Pista: los números se alinean a la derecha; el texto, a la izquierda".
[VOZ]
¿Cómo se corrige? Selecciona la celda, haz clic en el aviso del triángulo, y elige convertir en número. Si son muchas celdas, selecciónalas todas y hazlo de una vez. Y una pista para detectarlo rápido: por defecto, Excel alinea los números a la derecha y el texto a la izquierda. Si ves un número pegado a la izquierda, sospecha. Y si te pasa con frecuencia al importar datos, revisa la columna completa antes de hacer cualquier cálculo.

## ESCENA 07 · Error 2: la referencia que se mueve
[VISUAL] Número 2/5. Precio en B, IVA 19 % en E1. =B2*(1+E1) en C2 = 119. Se arrastra: C3 250, C4 80, C5 40 (sin IVA). Fórmula de C3 resaltada: =B3*(1+E2), con E2 vacía.
[VOZ]
Error número dos: la referencia que se mueve. Tengo los precios en la columna B y el IVA en la celda E uno. En C dos calculo el precio con IVA: B dos por uno más E uno. Da ciento diecinueve, perfecto. Pero cuando arrastro la fórmula hacia abajo… los demás precios quedan igual, sin IVA. ¿Por qué? Porque Excel movió también la referencia del IVA: ahora apunta a E dos, que está vacía.

## ESCENA 08 · Cómo corregirlo
[VISUAL] Se edita C2: E1 → $E$1 al presionar F4. Se arrastra: 119 · 297,5 · 95,2 · 47,6 en verde. Teclas F4.
[VOZ]
La solución es fijar la celda del IVA con signos de dólar. Haz clic sobre E uno dentro de la fórmula y presiona F cuatro: se convierte en dólar E dólar uno. Ahora sí, arrastra, y todos los precios tienen su IVA. Regla fácil: si una celda es un dato fijo, como una tasa o un porcentaje, casi siempre va con dólares.

## ESCENA 09 · Error 3: BUSCARV sin FALSO
[VISUAL] Número 3/5. Tabla de precios P-101…P-105 ordenada. =BUSCARV("P-999";A2:C6;3) → 85. Globo: "¡P-999 no existe!".
[VOZ]
Error número tres, y este es peligroso: BUSCARV sin el cuarto argumento. Busco el código P novecientos noventa y nueve, que no existe en mi lista, y BUSCARV me devuelve un precio: ochenta y cinco. ¿De dónde salió? Si no escribes FALSO al final, BUSCARV hace una coincidencia aproximada, y te trae el valor más cercano por debajo. Te da un precio equivocado, sin avisarte de nada.

## ESCENA 10 · Cómo corregirlo
[VISUAL] =BUSCARV("P-999";A2:C6;3;FALSO) → #N/A. Luego =BUSCARX("P-999";A2:A6;C2:C6;"No existe") → No existe.
[VOZ]
La solución: escribe siempre FALSO como cuarto argumento. Ahora, si el código no existe, Excel te muestra el error numeral N barra A, que es mucho mejor que un precio inventado. Y si tienes Microsoft trescientos sesenta y cinco, usa BUSCARX, que busca la coincidencia exacta por defecto, y además te deja escribir un mensaje como "no existe".

## ESCENA 11 · Error 4: el formato que engaña
[VISUAL] Número 4/5. B2:B4 = 10,4 con formato sin decimales → se ven como 10. B5 =SUMA → 31,2 se ve como 31. Se muestran los decimales y todo cuadra.
[VOZ]
Error número cuatro: el formato que engaña. Volvamos al ejemplo del principio. Cada celda vale en realidad diez coma cuatro, pero el formato está configurado para no mostrar decimales, así que vemos diez. La suma real es treinta y uno coma dos, que se muestra como treinta y uno. Excel calculó bien. El problema es que el formato solo cambia lo que ves, no el valor que hay en la celda.

## ESCENA 12 · Cómo corregirlo
[VISUAL] Botón "Aumentar decimales" → 10,4 · 10,4 · 10,4 · 31,2. Alternativa: =REDONDEAR(B2;0) si de verdad quieres números redondos.
[VOZ]
La solución depende de lo que necesites. Si quieres ver la verdad, muestra los decimales con el botón aumentar decimales. Y si de verdad necesitas trabajar con números redondos, por ejemplo para una factura, no te quedes con el formato: usa la función REDONDEAR, para que el valor real también quede redondeado.

## ESCENA 13 · Error 5: las celdas combinadas
[VISUAL] Número 5/5. Título "Ventas del mes" en celdas combinadas A1:D1. Al intentar ordenar: aviso de Excel sobre las celdas combinadas (tachado en rojo).
[VOZ]
Error número cinco: las celdas combinadas. Se ven muy bonitas para los títulos, pero son un dolor de cabeza. Cuando intentas ordenar o filtrar una tabla que tiene celdas combinadas, Excel te muestra un aviso y no te deja hacerlo. Y al copiar y pegar, los datos terminan donde no deberían. Además, cuando seleccionas una columna, Excel selecciona también las columnas vecinas que están combinadas, y eso confunde a cualquiera.

## ESCENA 14 · Cómo corregirlo
[VISUAL] Formato de celdas → Alineación → Horizontal: "Centrar en la selección". El título se ve igual, pero las celdas no están combinadas.
[VOZ]
La alternativa profesional: selecciona las celdas del título, abre formato de celdas, ve a alineación, y en horizontal elige centrar en la selección. Visualmente queda exactamente igual, centrado sobre varias columnas, pero las celdas siguen separadas. Puedes ordenar, filtrar y copiar sin problemas.

## ESCENA 15 · Bonus: los números escondidos en las fórmulas
[VISUAL] =B2*1,19 en cien celdas vs =B2*(1+$E$1). Cuando el IVA cambia, solo se edita E1.
[VOZ]
Y un bonus, porque este error lo cometen hasta los que se creen expertos: escribir números fijos dentro de las fórmulas. Por ejemplo, B dos por uno coma diecinueve. Funciona… hasta que cambia el IVA, y tienes que buscar y corregir cien fórmulas. Pon siempre esos valores en una celda aparte, con su título, y haz referencia a ella. Así cambias un dato, y todo se actualiza.

## ESCENA 16 · Lista de revisión antes de enviar
[VISUAL] ListaCheck: ✅ "¿Hay números alineados a la izquierda?" · ✅ "¿Las tasas fijas tienen $?" · ✅ "¿Tus BUSCARV tienen FALSO?" · ✅ "¿Los totales cuadran con decimales visibles?" · ✅ "¿Hay celdas combinadas en tus tablas?".
[VOZ]
Y aquí está la lista de revisión que te prometí. Antes de enviar un archivo, revisa cinco cosas. ¿Hay números pegados a la izquierda? ¿Las celdas de tasas y porcentajes tienen dólares? ¿Todos tus BUSCARV terminan en FALSO? ¿Los totales cuadran cuando muestras los decimales? ¿Y hay celdas combinadas dentro de tus tablas? Dos minutos de revisión te pueden ahorrar mucha vergüenza.

## ESCENA 17 · Por qué importa
[VISUAL] Cifra "2 de cada 5" · "errores que se corrigen sin que nadie se entere". Frase de urgencia.
[VOZ]
Recuerda el dato del principio: dos de cada cinco errores se corrigen sin que nadie se entere. Eso significa que muchos otros nunca se descubren, y terminan en una decisión equivocada, un pago mal hecho o un informe que no cuadra. Y en un mundo donde la inteligencia artificial también genera hojas de cálculo, saber revisarlas vale más que nunca. [serious] Si no lo aprendes ahora, te extingues.

## ESCENA 18 · Resumen y cierre del año
[VISUAL] Cuadrícula con los 5 errores. CierreSiguiente: "Fórmulas con IA que SÍ funcionan". Mensaje: "¡Felices fiestas! Nos vemos en 2027".
[VOZ]
En resumen: números como texto, referencias sin dólar, BUSCARV sin FALSO, el formato que engaña y las celdas combinadas. Dime en los comentarios cuál de los cinco te ha pasado a ti. Y si te perdiste el video de cómo pedirle a la IA fórmulas que sí funcionan, te lo dejo aquí. Gracias por acompañarme este año. ¡Felices fiestas, y nos vemos en dos mil veintisiete! [excited] El poder de la tecnología te va a cambiar el mundo.
