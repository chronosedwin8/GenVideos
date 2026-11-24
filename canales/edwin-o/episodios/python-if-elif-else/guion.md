---
canal: edwin-o
tipo: tutorial
tema: Condicionales en Python — IF, ELIF y ELSE
slug: python-if-elif-else
programa: Python 3.14
duracion_objetivo: 9 min
estado: aprobado   # lote de 4 semanas pedido por Edwin el 24 nov 2026; se revisa completo antes de publicar
siguiente_video: Python en Excel con =PY() (python-en-excel)
---

<!-- Código y salidas reales en codigo/ (Python 3.14.0). -->

## ESCENA 01 · Gancho
[VISUAL] Terminal: "Ventas del mes: 5000" → "Comisión: 250.00"; "Ventas del mes: 999" → "Comisión: 0.00". Destello: "Tu programa decide".
[VOZ]
[excited] Escribes cinco mil, y el programa te dice: comisión de doscientos cincuenta. Escribes novecientos noventa y nueve, y te dice: cero. [curious] ¿Cómo sabe qué hacer? Porque tomó una decisión. Y hoy vas a aprender a programar decisiones en Python.

## ESCENA 02 · Presentación
[VISUAL] Cortinilla + título "IF · ELIF · ELSE".
[VOZ]
[excited] ¡Bienvenidos, amigos del canal! Vamos en busca del poder tecnológico. Hoy te explico las condicionales de Python: if, elif y else, desde cero y con un ejemplo real de trabajo. Y al final te enseño los cinco errores que todo principiante comete, con los mensajes exactos que te muestra Python.

## ESCENA 03 · El caso
[VISUAL] Tarjeta: "Python 3.14 (octubre de 2025): mensajes de error más claros". Terminal: "SyntaxError: 'elif' block follows an 'else' block".
[VOZ]
Un dato antes de empezar. En octubre de dos mil veinticinco salió Python tres punto catorce, y una de sus novedades son mensajes de error mucho más claros. Uno de ellos es justo sobre el tema de hoy: si pones las partes de una condicional en el orden equivocado, ahora Python te lo dice con todas las letras. Lo vas a ver al final.

## ESCENA 04 · El aporte de Edwin
<!-- APORTE: confirmar con Edwin (la cifra del Short es real: YouTube Studio) -->
[VISUAL] Cifra "22.756 vistas" · "El Short de IF: el video más visto del canal". Tarjeta 🏫: "En clase, el IF es cuando el programa empieza a 'pensar'".
[VOZ]
Y te cuento algo: el Short de if es el video más visto de este canal, con más de veintidós mil vistas. En un minuto no cabe todo, así que hoy va la versión completa. Además, en mis clases de tecnología siempre lo noto: el if es el momento en que los estudiantes sienten que su programa empieza a pensar.

## ESCENA 05 · ¿Qué es una condicional?
[VISUAL] Comparar: Excel "=SI(condición; si es verdad; si es falso)" vs Python "if condición: … else: …". Icono de semáforo.
[VOZ]
¿Qué es una condicional? Es una pregunta que tu programa se hace: ¿esto es verdad? Si es verdad, hace una cosa, y si no, hace otra. Si usas Excel, ya la conoces: es la función SI. La diferencia es que en Python no la escribes en una celda, sino en líneas de código, y puede hacer mucho más que devolver un valor.

## ESCENA 06 · Paso 1: el if
[VISUAL] Código: `if ventas >= 5000:` / `    print("Comisión del 5 %")`. Resaltes: "if" · "condición" · ":" · "4 espacios".
[VOZ]
Paso uno: el if. Escribes la palabra if, luego la condición, por ejemplo ventas mayor o igual que cinco mil, y terminas con dos puntos. Y aquí está lo más importante de Python: la línea de abajo va con sangría, cuatro espacios hacia adentro. Esa sangría le dice a Python: esto solo se ejecuta si la condición es verdadera.

## ESCENA 07 · Los comparadores
[VISUAL] Cuadrícula: `>` mayor · `<` menor · `>=` mayor o igual · `<=` menor o igual · `==` igual · `!=` diferente.
[VOZ]
Para escribir condiciones usas comparadores. Mayor que, menor que, mayor o igual, y menor o igual. Para preguntar si dos cosas son iguales, se usan dos signos de igual, no uno. Y para preguntar si son diferentes, signo de admiración e igual. Apréndete esos seis, y puedes escribir casi cualquier condición.

## ESCENA 08 · Paso 2: el else
[VISUAL] Código con else: `else:` / `    print("Sin comisión del 5 %")`. Flechas: verdadero → bloque if; falso → bloque else.
[VOZ]
Paso dos: el else, que significa "si no". Va al mismo nivel que el if, sin sangría, también con dos puntos. Lo que pongas debajo de else se ejecuta cuando la condición es falsa. Así tu programa siempre hace algo: o una cosa, o la otra. Nunca las dos. Y fíjate que el else no lleva condición: atrapa todo lo que no cumplió el if.

## ESCENA 09 · Paso 3: el elif
[VISUAL] Código completo de comisiones con if / elif / else. Resaltes por bloque. Tarjeta: "Misma regla que el video de fórmulas con IA".
[CODIGO] codigo/comisiones.py
[VOZ]
Paso tres: elif, que es la abreviatura de "else if": si no, pregunta esto otro. Sirve cuando tienes más de dos opciones. ¿Recuerdas la regla de comisiones del video de fórmulas con IA? Desde cinco mil, el cinco por ciento. Desde mil, el tres por ciento. Si no, cero. En Python queda así: if ventas mayor o igual que cinco mil, elif ventas mayor o igual que mil, y else. Tres caminos, uno solo se cumple.

## ESCENA 10 · Pruébalo con los límites
[VISUAL] Terminal real: 999 → 0.00 · 1000 → 30.00 · 4999 → 149.97 · 5000 → 250.00 · 7200 → 360.00.
[VOZ]
La primera línea usa input para preguntar las ventas, y float para convertirlas en número. Ejecutamos y probamos los casos del límite, igual que en Excel. Novecientos noventa y nueve: cero. Mil: treinta. Cinco mil: doscientos cincuenta. Y siete mil doscientos: trescientos sesenta. [excited] ¡Todo correcto! Y si alguno no hubiera dado lo esperado, ya sabrías dónde buscar: en la condición, no en el resto del programa.

## ESCENA 11 · El orden importa
[VISUAL] Se invierten if y elif (primero >= 1000). Terminal real: 7200 → 216.00 ✗ (debería ser 360.00). Animación: Python baja por las condiciones y se detiene en la primera verdadera.
[VOZ]
Ahora, un error que cuesta dinero. ¿Qué pasa si pongo primero la condición de mil, y después la de cinco mil? Ejecuto con siete mil doscientos y… doscientos dieciséis. ¡Le pagué el tres por ciento en vez del cinco! Python revisa las condiciones de arriba hacia abajo, y se detiene en la primera que es verdadera. Siete mil doscientos es mayor que mil, así que nunca llega a preguntar por cinco mil. Regla de oro: de la condición más exigente a la menos exigente.

## ESCENA 12 · input devuelve texto
[VISUAL] Código sin float. Terminal real: "TypeError: '>=' not supported between instances of 'str' and 'int'". Luego se agrega float() y funciona.
[VOZ]
Otro detalle. Input siempre devuelve texto, aunque escribas un número. Si comparas ese texto con cinco mil, Python se queja: type error, no se puede comparar un texto con un número. La solución es la que ya viste: envolver el input en float, para convertirlo en número con decimales. O en int, si solo necesitas enteros.

## ESCENA 13 · and y or
[VISUAL] Código notas.py: `if nota >= 60 and asistencia >= 80:`. Tabla: and = las dos verdaderas · or = basta una. Terminal: Aprobado.
[VOZ]
¿Y si necesitas dos condiciones a la vez? Para eso están and y or. And significa "y": las dos tienen que cumplirse. Por ejemplo, el estudiante aprueba si su nota es de sesenta o más, y su asistencia es de ochenta o más. Or significa "o": basta con que una se cumpla. Por ejemplo, el envío es gratis si la compra pasa de cien dólares, o si el cliente es premium. Con una sola que se cumpla, no paga envío. Con estas dos palabras, tus condiciones se vuelven mucho más poderosas.

## ESCENA 14 · Bonus: el if de una línea
[VISUAL] Código: `estado = "Aprobado" if nota >= 60 else "Reprobado"`. Terminal: Aprobado. Comparar con =SI(B2>=60;"Aprobado";"Reprobado").
[VOZ]
Un bonus que te va a gustar si vienes de Excel. Cuando solo necesitas elegir entre dos valores, Python tiene un if de una línea: estado igual a "Aprobado" if nota mayor o igual que sesenta, else "Reprobado". Es casi idéntico a la función SI de Excel. Úsalo para cosas cortas, y el if normal para todo lo demás.

## ESCENA 15 · Los 5 errores de principiante
[VISUAL] Terminal con los mensajes reales, uno por uno: "SyntaxError: expected ':'" · "IndentationError: expected an indented block after 'if' statement" · "Maybe you meant '==' or ':=' instead of '='?" · "'elif' block follows an 'else' block" · "Did you mean 'if'?".
[VOZ]
Y los cinco errores de principiante, con lo que te dice Python. Uno: olvidar los dos puntos, y Python te dice "expected dos puntos". Dos: olvidar la sangría, y te dice que esperaba un bloque con sangría después del if. Tres: usar un solo igual para comparar, y te pregunta si quisiste decir doble igual. Cuatro: poner un elif después del else, y te dice exactamente eso, que el elif va después de un else. Y cinco: escribir mal la palabra if, y te pregunta: ¿quisiste decir if? Lee siempre el mensaje de error: casi siempre te dice la solución.

## ESCENA 16 · Excel y Python, la misma lógica
[VISUAL] Comparar lado a lado: =SI.CONJUNTO(C2>=5000;C2*5%;C2>=1000;C2*3%;VERDADERO;0) vs if/elif/else.
[VOZ]
Fíjate en algo bonito. La fórmula de comisiones que hicimos en Excel con SI punto CONJUNTO, y este programa en Python, tienen exactamente la misma lógica: primero la condición más exigente, luego la siguiente, y al final el caso por defecto. Si entiendes una, entiendes la otra. Por eso digo que aprender Excel y Python juntos es un superpoder. [serious] Si no lo aprendes ahora, te extingues.

## ESCENA 17 · Tu reto
[VISUAL] Tarjeta reto: "Pide una nota de 0 a 100: 90 o más → Excelente · 60 o más → Aprobado · si no → Reprobado". "Déjalo en los comentarios".
[VOZ]
Ahora te toca a ti. El reto: escribe un programa que pida una nota de cero a cien. Si es noventa o más, que diga "Excelente". Si es sesenta o más, "Aprobado". Y si no, "Reprobado". Pista: el orden importa. Déjame tu código en los comentarios, y reviso los primeros.

## ESCENA 18 · Resumen y siguiente video
[VISUAL] Resumen3: "if: si es verdad" · "elif: si no, pregunta otra cosa" · "else: en cualquier otro caso". CierreSiguiente: "Python en Excel con =PY()".
[VOZ]
En resumen: if pregunta, elif pregunta otra cosa si la primera fue falsa, y else atrapa todo lo demás. Dos puntos, sangría, y de la condición más exigente a la menos exigente. En el próximo video juntamos los dos mundos: vas a usar Python dentro de Excel, con la función P Y. Suscríbete para no perdértelo. [excited] El poder de la tecnología te va a cambiar el mundo.
