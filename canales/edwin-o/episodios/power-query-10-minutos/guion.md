---
canal: edwin-o
tipo: tutorial
tema: Domina Power Query en 10 minutos con 10 movimientos
slug: power-query-10-minutos
programa: Excel para Microsoft 365 en español
duracion_objetivo: 9 min
estado: aprobado   # lote de enero 2027 pedido por Edwin el 25 nov 2026; se revisa completo antes de publicar
siguiente_video: ChatGPT en Excel, automatiza tus hojas de cálculo (chatgpt-en-excel)
---

<!-- Resultados verificados con pandas y etiquetas tomadas del Power Query instalado: ver ficha.md. -->

## ESCENA 01 · Gancho
[VISUAL] Tabla con meses en columnas y regiones vacías → 10 movimientos en cámara rápida → reporte de cumplimiento por región: Norte 100,4 % · Sur 97,2 % · Centro 107,5 %.
[VOZ]
[excited] Una tabla con los meses en columnas, regiones vacías y nombres pegados. En diez movimientos de Power Query la conviertes en un reporte de cumplimiento de metas por región, que se actualiza con un clic. Diez movimientos que vas a usar toda tu vida.

## ESCENA 02 · Presentación
[VISUAL] Cortinilla + título "DOMINA POWER QUERY" / "10 movimientos". Contador 1 → 10.
[VOZ]
[excited] ¡Bienvenidos, amigos del canal! Vamos en busca del poder tecnológico. En el video de qué es Power Query vimos lo básico. Hoy vamos en serio: diez movimientos, uno tras otro, para que domines Power Query. Toma nota, porque cada uno resuelve un problema real.

## ESCENA 03 · El caso
[VISUAL] Tarjeta: "Microsoft estrena un nuevo cuadro 'Obtener datos' en Excel para Windows (versión 2510, fin de 2025)". Píldora: "Power Query sigue creciendo".
[VOZ]
Power Query no se queda quieto. Según Microsoft, desde la versión veinticinco diez de Excel para Windows, a finales de dos mil veinticinco, hay un nuevo cuadro de Obtener datos, en versión preliminar, para conectarte más fácil a tus fuentes. Microsoft sigue invirtiendo en esta herramienta, y eso dice mucho.

## ESCENA 04 · El aporte de Edwin
<!-- APORTE: confirmar -->
[VISUAL] Tarjeta 🏢: "El formato que más encuentro en las empresas: meses en columnas. El peor para analizar".
[VOZ]
En las empresas donde doy capacitaciones, el formato que más encuentro es este: un vendedor por fila y un mes por columna. Se ve bonito para imprimir, pero es el peor formato para analizar. No puedes filtrar por mes, ni hacer una tabla dinámica decente. Hoy lo arreglamos.

## ESCENA 05 · Los datos
[VISUAL] HojaExcel "Ventas": Región | Vendedor | Ene | Feb | Mar, 5 vendedores; Región vacía en Luis Gómez y Juan Pérez (resaltado). Al lado, tabla "Metas": Norte 7.000 · Sur 6.500 · Centro 4.000.
[VOZ]
Estos son los datos: cinco vendedores, con sus ventas de enero, febrero y marzo. La región solo está escrita en el primer vendedor de cada grupo; las de abajo están vacías. Y en otra tabla, las metas de cada región. Objetivo: saber qué porcentaje de la meta cumplió cada región.

## ESCENA 06 · Antes de empezar: 3 reglas de oro
[VISUAL] Lista: "1. Convierte tus datos en Tabla (Ctrl + T)" · "2. Nunca edites el resultado a mano" · "3. Ponle nombre a cada consulta".
[VOZ]
Antes de empezar, tres reglas de oro. Uno: convierte tus datos en tabla con Control más T; así, cuando agregues filas, Power Query las ve. Dos: nunca edites a mano el resultado que carga Power Query, porque al actualizar se pierde lo que escribiste; los cambios se hacen en el origen o en los pasos. Y tres: ponle a cada consulta un nombre claro, como Ventas o Metas. Cuando tengas diez consultas, me lo vas a agradecer.

## ESCENA 07 · Movimiento 1: entra a Power Query
[VISUAL] Datos → "Desde tabla o rango" → Editor de Power Query con la tabla Ventas. Contador "1/10".
[VOZ]
Movimiento uno: entra. Clic en los datos, pestaña Datos, Desde tabla o rango. Y ya estás en el editor. Haz lo mismo con la tabla de metas, y al cerrar, usa Cerrar y cargar en, para crear solo la conexión, sin otra hoja, porque la vamos a usar más adelante.

## ESCENA 08 · Movimiento 2: rellenar hacia abajo
[VISUAL] Columna Región con null en filas 2 y 4 → Transformar → Rellenar → Abajo → Norte, Norte, Sur, Sur, Centro. Paso "Relleno hacia abajo". "2/10".
[VOZ]
Movimiento dos: rellenar hacia abajo. Las celdas vacías de la región aparecen como null. Selecciona la columna Región, ve a Transformar, Rellenar, Abajo. Power Query copia el valor de arriba en cada vacío: Luis Gómez queda en el Norte y Juan Pérez en el Sur. Esto, a mano, en miles de filas, es una pesadilla.

## ESCENA 09 · Movimiento 3: anular la dinamización
[VISUAL] Se seleccionan Región y Vendedor → clic derecho → "Anular dinamización de otras columnas" → 15 filas: Región · Vendedor · Atributo · Valor. "3/10".
[VOZ]
Movimiento tres, el más poderoso. Selecciona Región y Vendedor, clic derecho, y elige Anular dinamización de otras columnas. Mira lo que pasa: los meses dejan de ser columnas y bajan a filas. De cinco filas pasamos a quince: cada vendedor con su mes y su monto. Ahora sí, datos listos para analizar.

## ESCENA 10 · Movimiento 4: nombres y tipos
[VISUAL] Doble clic en "Atributo" → "Mes"; "Valor" → "Monto". Ícono de tipo → "Número entero". "4/10".
[VOZ]
Movimiento cuatro: ponles nombre y tipo. Haz doble clic en Atributo y llámala Mes. Valor se llama Monto. Y en el ícono del encabezado, elige Número entero. Un consejo de profesional: haz esto siempre, porque si el monto queda como texto, más adelante no vas a poder sumar.

## ESCENA 11 · Movimiento 5: dividir columna
[VISUAL] Vendedor → Dividir columna → Por delimitador → Espacio → solo en el primer espacio → Nombre · Apellido. "5/10".
[VOZ]
Movimiento cinco: dividir columna. Selecciona Vendedor, Dividir columna, Por delimitador, elige espacio, y en las opciones indica que divida solo en el primer espacio, para que un apellido compuesto no se parta en tres. Ahora tienes Nombre y Apellido por separado, perfecto para un saludo en un correo.

## ESCENA 12 · Movimiento 6: columna personalizada
[VISUAL] Agregar columna → "Columna personalizada" → nombre "Comisión", fórmula = [Monto] * 0.05 → 60 · 67,5 · 75… "6/10".
[VOZ]
Movimiento seis: tus propias columnas. En Agregar columna, elige Columna personalizada. Nómbrala Comisión, y escribe la fórmula: corchete Monto, por cero punto cero cinco. Ojo: aquí el decimal va con punto. Y ya tienes la comisión del cinco por ciento: sesenta, sesenta y siete con cincuenta, setenta y cinco…

## ESCENA 13 · Movimiento 7: agrupar por
[VISUAL] Clic derecho en la consulta → Referencia → nueva consulta → Inicio → "Agrupar por" Región, Suma de Monto → Norte 7.030 · Sur 6.320 · Centro 4.300. "7/10".
[VOZ]
Movimiento siete: agrupar. Para no perder el detalle, clic derecho en la consulta, y elige Referencia: es una copia que depende de la original. En la copia, ve a Agrupar por, elige Región, y la operación Suma del Monto. Norte, siete mil treinta. Sur, seis mil trescientos veinte. Centro, cuatro mil trescientos.

## ESCENA 14 · Movimiento 8: combinar consultas
[VISUAL] Inicio → "Combinar consultas" → Ventas por región + Metas, columna Región en ambas → "Externa izquierda" → expandir → Meta: 7.000 · 6.500 · 4.000. "8/10".
[VOZ]
Movimiento ocho: combinar consultas, el BUSCARX de Power Query. En Inicio, Combinar consultas. Arriba, tu tabla agrupada; abajo, Metas. Haz clic en la columna Región en las dos, y en el tipo de combinación deja Externa izquierda. Aceptas, expandes la columna nueva, y cada región tiene su meta al lado.

## ESCENA 15 · Movimiento 9: el porcentaje de cumplimiento
[VISUAL] Columna personalizada "Cumplimiento" = [Monto] / [Meta] → tipo Porcentaje → Norte 100,4 % · Sur 97,2 % · Centro 107,5 %. "9/10".
[VOZ]
Movimiento nueve: otra columna personalizada. Cumplimiento: corchete Monto, dividido entre corchete Meta, y le das tipo porcentaje. Resultado: el Norte cumplió el cien coma cuatro por ciento, el Sur se quedó en noventa y siete coma dos, y el Centro, la sorpresa, ciento siete coma cinco por ciento.

## ESCENA 16 · Movimiento 10: cargar y actualizar
[VISUAL] "Cerrar y cargar" → hoja con la tabla. En la hoja original Marta Díaz Mar 1.900 → 2.400 → Datos → "Actualizar todo" → Centro 4.800 → 120 %. "10/10".
[VOZ]
[excited] Movimiento diez: Cerrar y cargar. Y ahora la prueba de fuego. Vuelvo a la tabla original y cambio la venta de Marta Díaz en marzo: de mil novecientos a dos mil cuatrocientos. Datos, Actualizar todo… y el Centro sube a cuatro mil ochocientos, con un ciento veinte por ciento de cumplimiento. Todos los pasos se repitieron solos.

## ESCENA 17 · Tu receta completa
[VISUAL] Panel Pasos aplicados con todos los pasos: Origen · Tipo cambiado · Relleno hacia abajo · Columna de atributo anulada · Columnas con nombre cambiado · Dividir columna · Personalizada agregada.
[VOZ]
Mira tu receta completa en Pasos aplicados. Cada movimiento quedó grabado, en orden. El próximo trimestre, cuando llegue el archivo con abril, mayo y junio, solo reemplazas los datos y le das Actualizar todo. Lo que antes era una mañana de trabajo, ahora es un clic.

## ESCENA 18 · Detrás de escena: el lenguaje M
[VISUAL] Vista → "Editor avanzado" → código M: let Origen = Excel.CurrentWorkbook(){[Name="Ventas"]}[Content], #"Relleno hacia abajo" = Table.FillDown(...), … in … Píldora: "Cada paso = una línea".
[VOZ]
¿Y qué hay detrás? Si vas a la pestaña Vista y abres el Editor avanzado, verás que cada clic que diste se convirtió en una línea de código, en un lenguaje que se llama M. No necesitas aprenderlo para usar Power Query. Pero si algún día quieres ir más lejos, ya sabes dónde mirar. Y también puedes activar la barra de fórmulas, para ver la línea de cada paso.

## ESCENA 19 · Bonus: columna a partir de ejemplos
[VISUAL] Agregar columna → "Columna a partir de los ejemplos" → se escribe "TORRES" en la primera fila → Power Query completa GÓMEZ, RUIZ, PÉREZ, DÍAZ.
[VOZ]
Un bonus que parece magia: Columna a partir de los ejemplos. En vez de buscar qué transformación necesitas, escribes el resultado que quieres en la primera fila, por ejemplo, el apellido en mayúsculas, y Power Query adivina la regla y completa el resto. Siempre revisa que haya adivinado bien.

## ESCENA 20 · Si no te funcionó
[VISUAL] ListaErrores: "Rellenar no hace nada" → "Las celdas tienen espacios, no están vacías" · "Error en Combinar" → "Las regiones no coinciden: revisa mayúsculas y espacios" · "La suma sale rara" → "El Monto quedó como texto".
[VOZ]
Si no te funcionó: si Rellenar hacia abajo no hace nada, esas celdas no están vacías, tienen espacios. Si al combinar consultas no aparece la meta, las regiones no coinciden exactamente: revisa mayúsculas y espacios. Y si la suma sale rara, el monto quedó como texto.

## ESCENA 21 · Resumen
[VISUAL] Cuadrícula con los 10 movimientos: Entrar · Rellenar · Anular dinamización · Nombres y tipos · Dividir · Columna personalizada · Agrupar · Combinar · Porcentaje · Cargar y actualizar.
[VOZ]
En resumen, los diez movimientos: entrar, rellenar, anular la dinamización, nombres y tipos, dividir, columna personalizada, agrupar, combinar, calcular el porcentaje, y cargar y actualizar. Practícalos con tus propios datos esta semana. [serious] Si no lo aprendes ahora, te extingues.

## ESCENA 22 · Cierre y siguiente video
[VISUAL] Tienda con QR. CierreSiguiente: "ChatGPT en Excel: automatiza tus hojas".
[VOZ]
En mi página, edwinortiz punto net, y en la tienda, encuentras plantillas de Excel listas para usar; el enlace está en la descripción. En el próximo video metemos a ChatGPT dentro de Excel: te enseño a instalarlo y a automatizar tus hojas de cálculo con él. Suscríbete para no perdértelo. [excited] El poder de la tecnología te va a cambiar el mundo.
