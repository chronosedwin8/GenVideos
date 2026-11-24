---
canal: edwin-o
tipo: tutorial
tema: Cómo pedirle a la IA fórmulas de Excel que sí funcionan
slug: formulas-con-ia
programa: Excel para Microsoft 365 en español · cualquier asistente de IA
duracion_objetivo: 9 min
estado: aprobado   # lote de 4 semanas pedido por Edwin el 24 nov 2026; se revisa completo antes de publicar
siguiente_video: 7 funciones de Excel que te ahorran horas (funciones-que-ahorran-horas)
---

<!--
Hoja de ejemplo (verificada en ficha.md): A Vendedor | B Mes | C Ventas | D Comisión · tabla de tramos F2:G4.
Regla: menos de 1.000 → 0 %; desde 1.000 → 3 %; desde 5.000 → 5 %.
-->

## ESCENA 01 · Gancho
[VISUAL] Chat: "dame una fórmula de comisiones" → la IA responde con una fórmula. Se pega en Excel: la columna se llena… y dos celdas se ponen en rojo.
[VOZ]
[curious] Le pediste a la inteligencia artificial una fórmula de Excel, la pegaste, y parecía perfecta. [serious] Pero mira estas dos celdas: el vendedor que vendió exactamente cinco mil cobró cien pesos menos. Y nadie se dio cuenta.

## ESCENA 02 · Presentación
[VISUAL] Cortinilla + título "Fórmulas con IA que SÍ funcionan".
[VOZ]
[excited] ¡Bienvenidos, amigos del canal! Vamos en busca del poder tecnológico. Hoy te enseño a pedirle a la IA fórmulas de Excel que funcionan a la primera, con un método de cinco partes que sirve con ChatGPT, con Claude, con Gemini o con Copilot. Y al final te dejo la plantilla del prompt para que la copies y la uses hoy mismo en tu trabajo.

## ESCENA 03 · El caso: Microsoft retiró =COPILOT()
[VISUAL] Línea de tiempo: agosto 2025 "llega =COPILOT() en vista previa" → 13 ago 2026 "Microsoft anuncia su retiro" → 14 sep 2026 "deja de funcionar". Celda que muestra #¿NOMBRE?.
[VOZ]
Primero, una noticia que casi nadie te contó. En agosto de dos mil veinticinco, Microsoft lanzó en vista previa una función para poner la IA dentro de una celda: igual, COPILOT. Y el catorce de septiembre de este año la retiró. Las hojas que la usaban, al recalcular, muestran el error numeral nombre.

## ESCENA 04 · La lección
[VISUAL] Comparación: "La IA dentro de la celda" (✗ depende de internet, ✗ puede cambiar, ✗ puede desaparecer) vs "La IA te escribe la fórmula" (✓ fórmula nativa, ✓ funciona siempre, ✓ tú la controlas).
[VOZ]
¿La lección? No dejes que tu hoja dependa de la IA. Usa la IA para que te escriba fórmulas normales de Excel, de esas que funcionan siempre, sin internet y sin sorpresas. [confident] La IA es tu asistente, no tu calculadora. Y como siempre digo: [serious] si no lo aprendes ahora, te extingues.

## ESCENA 05 · El aporte de Edwin
<!-- APORTE: confirmar con Edwin -->
[VISUAL] Tarjeta con 🏫: "Lo que más veo en mis clases: pedir 'hazme una fórmula' sin decir dónde están los datos".
[VOZ]
En mis clases con docentes y con personal administrativo, el error que más veo es este: escriben "hazme una fórmula de comisiones", y ya. Sin decir dónde están los datos, ni qué versión de Excel usan. Y claro, la IA adivina. A veces acierta… y a veces no.

## ESCENA 06 · El ejemplo
[VISUAL] HojaExcel "Comisiones": vendedores, mes y ventas (999, 1.000, 4.999, 5.000, 7.200…). Columna D vacía. Tarjeta con la regla: menos de 1.000 → 0 % · desde 1.000 → 3 % · desde 5.000 → 5 %.
[VOZ]
Vamos con un ejemplo real. Tengo esta hoja de comisiones: vendedor, mes y ventas. La regla de la empresa es sencilla: si vende menos de mil, no hay comisión. Desde mil, gana el tres por ciento. Y desde cinco mil, el cinco por ciento.

## ESCENA 07 · El prompt vago
[VISUAL] Chat: "dame una fórmula para calcular comisiones en excel" → respuesta de la IA en inglés con comas: `=IF(C2>5000,C2*0.05,IF(C2>1000,C2*0.03,0))`.
[VOZ]
Primero hagamos lo que hace casi todo el mundo. Le escribo a la IA: dame una fórmula para calcular comisiones en Excel. Y me responde esto. Se ve muy profesional, ¿verdad? [curious] Pero tiene dos problemas escondidos.

## ESCENA 08 · Problema 1: el idioma
[VISUAL] La fórmula en inglés se pega en Excel en español → mensaje de error. Resaltar IF y las comas.
[VOZ]
Problema uno: el idioma. La IA me la dio en inglés, con IF y con comas. Si tu Excel está en español, usa SI y punto y coma. Pegas la fórmula y Excel te dice que hay un problema. Muchos se rinden aquí y piensan que la IA no sirve.

## ESCENA 09 · Problema 2: los límites
[VISUAL] Fórmula traducida `=SI(C2>5000;C2*0,05;SI(C2>1000;C2*0,03;0))`. Se llena la columna D. Zoom en 1.000 → 0 y 5.000 → 150 en rojo. Globos: "debería ser 30" y "debería ser 250".
[VOZ]
Problema dos, y este es el peligroso. La traduzco, la pego, y la columna se llena sin errores. Pero mira: el que vendió exactamente mil, cobró cero. Y el que vendió exactamente cinco mil, cobró ciento cincuenta en lugar de doscientos cincuenta. ¿Por qué? Porque la IA usó "mayor que" en vez de "mayor o igual que".

## ESCENA 10 · Por qué pasa
[VISUAL] Tarjeta: "La IA no ve tu hoja. Si no le das el contexto, lo inventa." Iconos: 🌐 idioma · 📍 datos · 📏 límites.
[VOZ]
Esto pasa porque la IA no ve tu hoja. No sabe tu idioma, ni dónde están tus datos, ni qué significa "desde mil" para tu empresa. Si no le das ese contexto, lo inventa. Así que la solución no es otra IA. Es darle un mejor prompt.

## ESCENA 11 · Parte 1: tu Excel
[VISUAL] Etiqueta PARTE 1. Lista: "Excel 365 en español · separador punto y coma".
[VOZ]
Este es el método de las cinco partes. Parte uno: di qué Excel usas. Escribe algo como: uso Excel para Microsoft trescientos sesenta y cinco en español, con punto y coma como separador. Solo con esto, ya te responde con SI y con punto y coma.

## ESCENA 12 · Parte 2: dónde están los datos
[VISUAL] Etiqueta PARTE 2. HojaExcel con resaltes de colores: A1:D1 encabezados, columna C ventas, D2 donde va la fórmula.
[VOZ]
Parte dos: dile dónde están los datos. Los encabezados están en la fila uno, las ventas en la columna C, desde la fila dos, y la fórmula va en la celda D dos. Ahora la IA sabe exactamente qué celda mirar.

## ESCENA 13 · Parte 3 y 4: la regla y un ejemplo
[VISUAL] Etiqueta PARTES 3 Y 4. Lista: "desde 1.000 INCLUSIVE → 3 %", "desde 5.000 INCLUSIVE → 5 %", "Ejemplo: si C2 = 5.000, la comisión es 250".
[VOZ]
Parte tres: escribe la regla con los límites exactos. Desde mil, inclusive, el tres por ciento. Desde cinco mil, inclusive, el cinco por ciento. Esa palabra, inclusive, evita el error que vimos. Y parte cuatro: dale un ejemplo con el resultado esperado. Si C dos vale cinco mil, la comisión es doscientos cincuenta.

## ESCENA 14 · Parte 5: explicación y pruebas
[VISUAL] Etiqueta PARTE 5. Chat con el prompt completo → la IA responde `=SI.CONJUNTO(C2>=5000;C2*5%;C2>=1000;C2*3%;VERDADERO;0)` + "Pruébala con 999, 1.000, 4.999 y 5.000".
[VOZ]
Parte cinco: pídele que te explique la fórmula y que te dé casos de prueba. Mira la diferencia: ahora me responde con SI punto CONJUNTO, en español, con mayor o igual, y además me dice con qué valores probarla. Eso es otro nivel.

## ESCENA 15 · Prueba los casos frontera
[VISUAL] HojaExcel: se escribe la fórmula en D2 y se arrastra. 999 → 0 · 1.000 → 30 · 4.999 → 149,97 · 5.000 → 250 · 7.200 → 360, en verde.
[FORMULA] =SI.CONJUNTO(C2>=5000;C2*5%;C2>=1000;C2*3%;VERDADERO;0)
[VOZ]
Ahora sí, la pego en D dos y la arrastro. Y lo más importante: pruebo los casos frontera. Novecientos noventa y nueve da cero. Mil da treinta. Cinco mil da doscientos cincuenta. [excited] ¡Perfecto! Nunca pegues una fórmula de la IA sin probar los valores que están justo en el límite.

## ESCENA 16 · Entiende la fórmula
[VISUAL] FormulaGrande con partes coloreadas: `C2>=5000` → "¿vendió 5.000 o más?", `C2*5%` → "entonces 5 %", `C2>=1000` → "¿1.000 o más?", `VERDADERO;0` → "si no, 0".
[VOZ]
Y entiéndela, no la copies a ciegas. SI punto CONJUNTO revisa las condiciones en orden. ¿Vendió cinco mil o más? Entonces, cinco por ciento. Si no, ¿vendió mil o más? Entonces, tres por ciento. Y ese VERDADERO del final significa: en cualquier otro caso, cero.

## ESCENA 17 · Nivel pro: las tasas en celdas
[VISUAL] HojaExcel: tabla de tramos F1:G4 (Desde · Tasa: 0 → 0 %, 1.000 → 3 %, 5.000 → 5 %). Se escribe `=C2*BUSCARX(C2;$F$2:$F$4;$G$2:$G$4;0;-1)`. Luego G4 cambia de 5 % a 6 % y la columna se recalcula.
[FORMULA] =C2*BUSCARX(C2;$F$2:$F$4;$G$2:$G$4;0;-1)
[VOZ]
Nivel pro. Pídele a la IA: "pon las tasas en una tabla aparte". Te va a dar algo así, con BUSCARX. El menos uno del final significa: busca el valor exacto o el siguiente menor. ¿La ventaja? Si mañana la empresa sube la comisión al seis por ciento, cambias una celda, y listo. Nada escondido dentro de la fórmula.

## ESCENA 18 · Bonus: que te explique una fórmula heredada
[VISUAL] HojaExcel con una fórmula larga heredada `=SI(ESERROR(BUSCARV(A2;Precios!A:C;3;FALSO));0;BUSCARV(A2;Precios!A:C;3;FALSO))`. Chat: "Explícame esta fórmula paso a paso y dime si hay una forma más simple" → la IA la explica y propone `=SI.ERROR(BUSCARV(A2;Precios!A:C;3;FALSO);0)`.
[VOZ]
Un bonus que te va a ahorrar mucho tiempo. ¿Te ha pasado que heredas un archivo de otra persona, con fórmulas larguísimas que nadie entiende? Copia la fórmula, pégala en la IA y escribe: explícame esta fórmula paso a paso, y dime si hay una forma más simple. En este caso, la IA me explica que busca un precio en otra hoja, y que si no lo encuentra pone cero. Y me propone una versión más corta con SI punto ERROR. Pero ojo: igual que antes, compruébala con tus datos antes de cambiarla.

## ESCENA 19 · Cuidado: funciones que no existen
[VISUAL] Chat: la IA sugiere una función que tu Excel no tiene → celda con #¿NOMBRE?. Tarjeta: "#¿NOMBRE? = Excel no conoce esa función (o tu versión no la tiene)".
[VOZ]
Y cuidado con esto: a veces la IA te sugiere funciones que tu versión de Excel no tiene. Por ejemplo, funciones nuevas de Microsoft trescientos sesenta y cinco, cuando tú tienes Excel dos mil dieciséis. O peor, funciones que ya no existen, como la de Copilot que te conté al principio. Si ves el error numeral nombre, díselo a la IA: dile tu versión exacta, y pídele una alternativa que sí funcione.

## ESCENA 20 · Tres reglas de seguridad
[VISUAL] Lista: 🔒 "No pegues datos confidenciales: usa datos de ejemplo" · 🧪 "Prueba siempre los límites" · 🧠 "Si no entiendes la fórmula, pide que te la explique".
[VOZ]
Antes de terminar, tres reglas de seguridad. Uno: no pegues nombres, cédulas ni salarios reales en una IA pública. Usa datos de ejemplo. Dos: prueba siempre los límites. Y tres: si no entiendes la fórmula, no la uses todavía. Pídele que te la explique paso a paso.

## ESCENA 21 · La plantilla del prompt
[VISUAL] Tarjeta grande con la plantilla: "Uso Excel 365 en español (separador ;). Mis datos están en ___, con encabezados en la fila 1. Necesito una fórmula en ___ que ___. Regla exacta: ___ (con límites inclusive). Ejemplo: si ___, el resultado es ___. Explícamela y dame casos de prueba."
[VOZ]
Y aquí tienes la plantilla. Copia este texto, llena los espacios y pégalo en tu asistente favorito. Te la dejo también en la descripción. Guárdala en un bloc de notas o en tus favoritos, porque la vas a usar todos los días. Con esto, la IA deja de adivinar y empieza a trabajar para ti.

## ESCENA 22 · Resumen y siguiente video
[VISUAL] Resumen3: "La IA escribe, tú verificas" · "Prompt de 5 partes" · "Prueba los límites". Luego CierreSiguiente: "7 funciones de Excel que te ahorran horas".
[VOZ]
En resumen: la IA escribe, tú verificas. Usa el prompt de cinco partes, y prueba siempre los límites. En el próximo video te muestro siete funciones de Excel que te ahorran horas de trabajo, y que muchas veces son justo lo que la IA te debería sugerir. Suscríbete para no perdértelo. [excited] El poder de la tecnología te va a cambiar el mundo.
