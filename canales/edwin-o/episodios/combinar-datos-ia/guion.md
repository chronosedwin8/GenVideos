---
canal: edwin-o
tipo: tutorial
tema: Usar la IA para combinar datos en Excel como un profesional
slug: combinar-datos-ia
programa: Excel para Microsoft 365 en español
duracion_objetivo: 9 min
estado: aprobado   # lote de enero 2027 pedido por Edwin el 25 nov 2026; se revisa completo antes de publicar
siguiente_video: ChatGPT vs Claude, duelo de combinación de datos en Excel (duelo-chatgpt-claude)
---

<!-- Fórmulas probadas en Excel 365 real y código ejecutado: ver ficha.md. -->

## ESCENA 01 · Gancho
[VISUAL] Tres hojas (Ene, Feb, Clientes) vuelan y se combinan en una sola tabla con una fórmula. Una fila brilla en rojo: "C-06 · No encontrado 👻".
[VOZ]
[curious] Dos meses de ventas en hojas separadas, una lista de clientes aparte… y tu jefe quiere todo en una sola tabla, con el nombre y la ciudad de cada cliente. Con una frase bien escrita, la inteligencia artificial te da una fórmula que lo hace todo. [excited] Y de paso, descubre a un cliente fantasma.

## ESCENA 02 · Presentación
[VISUAL] Cortinilla + título "LA VARITA MÁGICA" / "IA para combinar datos". Lista: El prompt · La fórmula pieza por pieza · El cliente fantasma · Otras 3 varitas.
[VOZ]
[excited] ¡Bienvenidos, amigos del canal! Vamos en busca del poder tecnológico. Hoy te enseño la varita mágica de Excel: cómo pedirle a la inteligencia artificial que combine tus datos como un profesional. Vas a ver el prompt exacto, la fórmula pieza por pieza, el misterio del cliente fantasma, y otras tres varitas que puedes usar.

## ESCENA 03 · El caso
[VISUAL] Cronología: "22 abr 2026 · Copilot en Excel con modo agente, para todos" · "5 may 2026 · ChatGPT para Excel, en todos los planes" · "2026 · Claude para Excel, en planes de pago".
[VOZ]
¿Por qué hablar de esto ahora? Porque en dos mil veintiséis la inteligencia artificial se metió dentro de Excel. En abril, Copilot con modo agente llegó a todos los usuarios de Microsoft trescientos sesenta y cinco. En mayo, ChatGPT para Excel quedó disponible en todos sus planes. Y Claude tiene su propio complemento para Excel. La pregunta ya no es si usar la IA, sino cómo pedirle las cosas.

## ESCENA 04 · El aporte de Edwin
<!-- APORTE: confirmar -->
[VISUAL] Tarjeta 🏫: "El error número uno al cruzar tablas: #N/D por un espacio invisible".
[VOZ]
En mis capacitaciones, el error número uno al cruzar dos tablas siempre es el mismo: numeral N, barra, D. Y casi nunca es culpa de la fórmula. Es un espacio invisible al final de un código, que nadie ve y que hace que Excel no encuentre nada. Hoy vas a ver cómo la IA lo detecta antes que tú.

## ESCENA 05 · Los datos
[VISUAL] HojaExcel con pestañas abajo: "Ene" (6 pedidos), "Feb" (6 pedidos), "Clientes" (5 clientes: ID, Nombre, Ciudad).
[VOZ]
Estos son los datos. En la hoja Ene hay seis pedidos, con el número de pedido, el código del cliente y el monto. En la hoja Feb, otros seis, con la misma estructura. Y en la hoja Clientes, cinco clientes, con su código, su nombre y su ciudad. Queremos juntar todo en una sola tabla.

## ESCENA 06 · La varita: el prompt
[VISUAL] Chat con el prompt: "Tengo Excel 365 en español (separador ;). Hoja Ene A1:C7… Hoja Feb… Hoja Clientes… Necesito UNA fórmula para A2 que junte Ene y Feb y agregue Nombre y Ciudad. Dime si ves problemas en los datos."
[VOZ]
La varita mágica es el prompt. Fíjate en lo que le digo a la IA. Mi versión de Excel y el idioma, con el separador punto y coma. Dónde están los datos: qué hoja, qué rango y qué columnas. Qué quiero exactamente: una sola fórmula para la celda A2. Y la parte que casi nadie pide: que me diga si ve problemas en los datos. Compáralo con lo que escribe la mayoría: "junta mis hojas de Excel". Con eso, la IA tiene que adivinar todo: qué columnas, qué versión, qué separador. Y cuando la IA adivina, se equivoca.

## ESCENA 07 · Lo que responde la IA
[VISUAL] FormulaGrande escribiéndose: =LET(datos;APILARV(Ene!A2:C7;Feb!A2:C7); ids;ESPACIOS(ELEGIRCOLS(datos;2)); APILARH(…BUSCARX…)).
[FORMULA] =LET(datos;APILARV(Ene!A2:C7;Feb!A2:C7);ids;ESPACIOS(ELEGIRCOLS(datos;2));APILARH(ELEGIRCOLS(datos;1);ids;ELEGIRCOLS(datos;3);BUSCARX(ids;Clientes!A2:A6;Clientes!B2:B6;"No encontrado");BUSCARX(ids;Clientes!A2:A6;Clientes!C2:C6;"No encontrado")))
[VOZ]
Y esta es la fórmula que me entregó. Parece un monstruo, ¿verdad? Tranquilo. Yo la probé en Excel, y funciona. Pero un profesional no pega fórmulas que no entiende, así que vamos a desarmarla pieza por pieza. Son solo cuatro ideas.

## ESCENA 08 · Pieza 1: APILARV junta los meses
[VISUAL] FormulaGrande resalta APILARV(Ene!A2:C7;Feb!A2:C7) → animación: tabla Ene encima de tabla Feb = 12 filas.
[VOZ]
Pieza uno: APILARV. Toma los pedidos de enero y pone debajo los de febrero, como apilar dos cajas. Resultado: una sola tabla de doce filas. LET le pone a esa tabla un nombre, "datos", para no tener que repetir todo eso cada vez.

## ESCENA 09 · Pieza 2: limpia el código del cliente
[VISUAL] Resalta ESPACIOS(ELEGIRCOLS(datos;2)) → columna de códigos; "C-02␣" pierde el espacio.
[VOZ]
Pieza dos: ELEGIRCOLS toma la columna dos, la de los códigos de cliente. Y ESPACIOS les quita los espacios sobrantes. Guarda el resultado con el nombre "ids". Esta pieza parece un detalle, pero ya vas a ver que es la que salva el reporte.

## ESCENA 10 · Pieza 3: BUSCARX trae nombre y ciudad
[VISUAL] Resalta los dos BUSCARX → flechas desde Clientes: C-01 → Ana Torres · Bogotá. Globo en "No encontrado": "en lugar de #N/D".
[VOZ]
Pieza tres: dos BUSCARX. El primero busca cada código en la hoja Clientes y trae el nombre. El segundo trae la ciudad. Y el cuarto argumento, "No encontrado", es lo que se muestra si el cliente no existe, en lugar del feo numeral N, barra, D.

## ESCENA 11 · Pieza 4: APILARH arma la tabla
[VISUAL] Resalta APILARH(...) → cinco columnas se pegan lado a lado: Pedido · Cliente · Monto · Nombre · Ciudad.
[VOZ]
Pieza cuatro: APILARH pega las columnas una al lado de la otra: el pedido, el código limpio, el monto, el nombre y la ciudad. Pones los encabezados en la fila uno, la fórmula en A2, Enter… y la tabla se desborda sola hasta la fila trece.

## ESCENA 12 · El resultado
[VISUAL] HojaExcel "Resumen" A1:E13 con las 12 filas; P-202 · C-06 · 820 · No encontrado · No encontrado (rojo).
[VOZ]
[excited] ¡Y ahí está! Doce pedidos de dos meses, en una sola tabla, con el nombre y la ciudad de cada cliente. Si cambias un monto en enero, la tabla cambia sola. Y si agregas un cliente nuevo a la hoja Clientes, su nombre aparece al instante en todos sus pedidos. Pero mira la fila del pedido P doscientos dos: cliente C cero seis… no encontrado.

## ESCENA 13 · El misterio del cliente fantasma
[VISUAL] Fondo azul. Tarjeta 👻: "C-06 compró 820… pero no existe en Clientes". Tarjeta 🔍: "C-02␣ tenía un espacio invisible: sin ESPACIOS, Medellín perdía 640".
[VOZ]
Aquí está el misterio. El cliente C cero seis compró ochocientos veinte, pero no existe en la lista de clientes: es un cliente fantasma, y alguien tiene que registrarlo. Y la IA encontró algo más: en febrero, el código C cero dos tenía un espacio invisible al final. Sin la función ESPACIOS, ese pedido de seiscientos cuarenta se habría perdido, y Medellín habría salido con tres mil trescientos ochenta en vez de cuatro mil veinte.

## ESCENA 14 · Bonus: el resumen por ciudad
[VISUAL] En G2: =AGRUPARPOR(ELEGIRCOLS(A2#;5);ELEGIRCOLS(A2#;3);SUMA) → Bogotá 4.380 · Cali 1.550 · Medellín 4.020 · No encontrado 820 · Total 10.770.
[FORMULA] =AGRUPARPOR(ELEGIRCOLS(A2#;5);ELEGIRCOLS(A2#;3);SUMA)
[VOZ]
Bonus: el resumen por ciudad. El numeral después de A2 significa "toda la tabla que se desborda desde A2". Con AGRUPARPOR agrupo por la columna cinco, la ciudad, y sumo la columna tres, el monto. Bogotá, cuatro mil trescientos ochenta; Cali, mil quinientos cincuenta; Medellín, cuatro mil veinte; y ochocientos veinte del cliente fantasma.

## ESCENA 15 · Varita 2: la IA dentro de Excel
[VISUAL] Panel lateral tipo complemento (recreación) con el mismo pedido → "Voy a crear la hoja Resumen. ¿Me das permiso?" → Aceptar.
[VOZ]
Segunda varita: la IA dentro de Excel. Con Copilot, con ChatGPT para Excel o con Claude para Excel, escribes el mismo pedido en un panel al lado de tu hoja, y la IA hace los cambios directamente. ChatGPT, por ejemplo, te pide permiso antes de modificar tu libro. Aun así, revisa siempre lo que cambió.

## ESCENA 16 · Varita 3: Power Query
[VISUAL] Editor PQ: "Anexar consultas" (Ene + Feb) → "Combinar consultas" con Clientes (Externa izquierda) → tabla de 12 filas. Píldora: "Ideal si llegan archivos cada mes".
[VOZ]
Tercera varita, para cuando esto se repite cada mes: Power Query. Con Anexar consultas apilas los meses, y con Combinar consultas traes el nombre y la ciudad desde Clientes. Es lo mismo que hizo la fórmula, pero con una receta que actualizas con un clic, aunque lleguen doce archivos.

## ESCENA 17 · Varita 4: Python
[VISUAL] Código: pd.read_excel(sheet_name=None) → concat → str.strip() → merge(how="left") → groupby. Terminal: Bogotá 4380 · Cali 1550 · Medellín 4020 · NaN 820.
[VOZ]
Y la cuarta varita: Python. Con pandas son seis líneas: lees todas las hojas, concatenas los meses, limpias los códigos, unes con los clientes, y agrupas por ciudad. Mismo resultado, y el NaN es nuestro cliente fantasma. Ideal cuando son miles de filas.

## ESCENA 18 · Las reglas del profesional
[VISUAL] Lista: "✅ Comprueba el total: 5.190 + 5.580 = 10.770" · "✅ Revisa cada 'No encontrado'" · "✅ Pide que te explique la fórmula" · "🔒 No pegues datos confidenciales en un chat".
[VOZ]
Ahora, las reglas del profesional. Uno: comprueba el total. Enero sumaba cinco mil ciento noventa, febrero cinco mil quinientos ochenta: diez mil setecientos setenta, igual que el resumen. Dos: revisa cada "No encontrado". Tres: pide que te explique la fórmula. Y cuatro: no pegues datos confidenciales en un chat público.

## ESCENA 19 · Si no te funcionó
[VISUAL] ListaErrores: "#¿NOMBRE?" → "Necesitas Excel 365 (APILARV, BUSCARX)" · "#¡DESBORDAMIENTO!" → "Libera el espacio de abajo" · "Todo sale No encontrado" → "Revisa espacios o números guardados como texto".
[VOZ]
Si no te funcionó: numeral nombre significa que tu Excel no tiene APILARV o BUSCARX; necesitas Microsoft trescientos sesenta y cinco. Desbordamiento: hay algo estorbando debajo de A2. Y si todo te sale "No encontrado", revisa espacios, o códigos guardados como número en una hoja y como texto en la otra.

## ESCENA 20 · Resumen
[VISUAL] Resumen3: "Un buen prompt = la varita" · "Entiende la fórmula pieza por pieza" · "Verifica: total y No encontrado".
[VOZ]
En resumen: la varita mágica es un buen prompt, con tu versión, tus datos y lo que necesitas. Entiende la fórmula pieza por pieza antes de usarla. Y verifica siempre el total y los "No encontrado". [serious] Si no lo aprendes ahora, te extingues.

## ESCENA 21 · Cierre y siguiente video
[VISUAL] Tienda con QR. CierreSiguiente: "ChatGPT vs Claude: el duelo".
[VOZ]
Visita mi página, edwinortiz punto net, y la tienda, donde tienes plantillas de Excel listas para usar; te dejo el enlace abajo. Y en el próximo video, pongo a pelear a ChatGPT contra Claude con este mismo problema: misma pregunta, mismos datos, y probamos todo en Excel. ¿Cuál será más inteligente? Suscríbete para no perdértelo. [excited] El poder de la tecnología te va a cambiar el mundo.
