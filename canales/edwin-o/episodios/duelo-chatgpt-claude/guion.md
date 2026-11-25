---
canal: edwin-o
tipo: comparativa
tema: ChatGPT vs. Claude combinando datos en Excel (prueba real)
slug: duelo-chatgpt-claude
programa: Excel para Microsoft 365 en español · ChatGPT (gratis) · Claude (Pro)
duracion_objetivo: 9 min
estado: aprobado   # lote de enero 2027 pedido por Edwin el 25 nov 2026; se revisa completo antes de publicar
siguiente_video: Calcular probabilidad binomial al instante (probabilidad-binomial)
---

<!-- Prueba real del 25 nov 2026; respuestas y pruebas guardadas en codigo/. Resultados en ficha.md. -->

## ESCENA 01 · Gancho
[VISUAL] Pantalla dividida: logo ChatGPT vs logo Claude, "VS" gigante. Abajo: "Misma pregunta · mismos datos · todo probado en Excel".
[VOZ]
[excited] ChatGPT contra Claude. La misma pregunta, los mismos datos, y yo probé cada respuesta en Excel y en Python, de verdad. Las dos encontraron al cliente fantasma… pero una de ellas me entregó un código que no funcionaba. ¿Cuál? Quédate, porque el resultado no es el que todo el mundo espera.

## ESCENA 02 · Presentación
[VISUAL] Cortinilla + título "EL DUELO". Lista: Las reglas · 5 rondas · El marcador · Cuál usar.
[VOZ]
[excited] ¡Bienvenidos, amigos del canal! Vamos en busca del poder tecnológico. Hoy es día de duelo. Te explico las reglas, vemos cinco rondas, una por una, el marcador final, y lo más importante: cuál te conviene usar a ti, según lo que necesites.

## ESCENA 03 · Las reglas del duelo
[VISUAL] Tarjetas: "ChatGPT · plan gratuito · modelo por defecto" vs "Claude · plan Pro · Opus 5.5". Píldora: "Prueba del 25 de noviembre de 2026".
[VOZ]
Las reglas, para que sea justo. El veinticinco de noviembre de dos mil veintiséis abrí un chat nuevo en cada una y les pegué exactamente el mismo mensaje. Y te lo digo con transparencia: ChatGPT estaba en el plan gratuito, con su modelo por defecto, y Claude en el plan Pro, con el modelo Opus cinco punto cinco. No son planes iguales, y lo vamos a tener en cuenta.

## ESCENA 04 · El reto
[VISUAL] HojaExcel con pestañas Ene, Feb, Clientes (los datos del video anterior). Lista del pedido: "1. Una fórmula que junte Ene y Feb con nombre y ciudad" · "2. Problemas en los datos" · "3. Total por ciudad".
[VOZ]
El reto es el del video anterior: dos hojas de pedidos, enero y febrero, y una lista de clientes. Les pedí tres cosas: una sola fórmula que juntara los dos meses con el nombre y la ciudad de cada cliente; que me dijeran si veían problemas en los datos; y el total vendido por ciudad. Y escondí dos trampas: un espacio invisible y un cliente que no existe.

## ESCENA 05 · El mensaje exacto
[VISUAL] Chat con el prompt real (prompt.txt): "Tengo un libro de Excel 365 en español (el separador de argumentos es punto y coma)… Hoja 'Ene', rango A1:C7… Necesito tres cosas…". Píldora: "El mismo texto, copiado y pegado en las dos".
[VOZ]
Así les pregunté, para que puedas repetir la prueba. Primero, mi versión de Excel y el separador punto y coma. Después, los datos de cada hoja, con su rango exacto, copiados tal cual, con el espacio escondido incluido. Y al final, las tres cosas que necesitaba, numeradas. Es la misma estructura del prompt del video anterior: si le das contexto, la inteligencia artificial no tiene que adivinar.

## ESCENA 06 · El aporte de Edwin
<!-- APORTE: confirmar -->
[VISUAL] Tarjeta 🍎: "Mi criterio de profe: no gana la respuesta más bonita, gana la que puedes comprobar".
[VOZ]
Antes de empezar, mi criterio de profe para calificar. No gana la respuesta más bonita ni la más larga. Gana la que funciona cuando la pruebas. Por eso cada fórmula la pegué en Excel, y cada código lo ejecuté en Python. Nada de creerles a ciegas.

## ESCENA 07 · Ronda 1: la fórmula
[VISUAL] Dos columnas: ChatGPT: =LET(datos;APILARV(…);ids;ESPACIOS(…);APILARH(…BUSCARX…)) · Claude: =LET(datos;…;ped;…;cli;…;mon;…;nom;…;ciu;…;APILARH(ped;cli;mon;nom;ciu)).
[VOZ]
Ronda uno: la fórmula. ChatGPT respondió en segundos con una fórmula que usa LET, APILARV, ESPACIOS, BUSCARX y APILARH. Claude tardó un poco más, y me dio prácticamente la misma lógica, con LET, pero ordenada en pasos con nombres: pedido, cliente, monto, nombre y ciudad. Más larga, pero más fácil de leer.

## ESCENA 08 · La prueba en Excel
[VISUAL] HojaExcel: las dos fórmulas pegadas → ambas generan A2:E13 idénticas (12 filas, C-06 "No encontrado"). Globo en ChatGPT: "Dijo 'hasta E14'… es E13".
[VOZ]
Las pegué en Excel… y las dos funcionan. Doce pedidos, con nombre y ciudad, y el cliente fantasma marcado como "No encontrado". Un detalle: ChatGPT dijo que el resultado llegaba hasta la fila catorce, y en realidad llega hasta la trece. Error menor. Ronda uno: empate.

## ESCENA 09 · Ronda 2: los problemas en los datos
[VISUAL] Comparar: ChatGPT (✓ "C-02 " con espacio · ✓ C-06 no existe · ✓ recomienda registrarlo) vs Claude (✓ los dos · ✓ espacio duro CARACTER(160) · ✓ montos como texto · ✓ rangos fijos → Ctrl+T).
[VOZ]
Ronda dos: los problemas en los datos. Las dos encontraron las trampas: el espacio después de C cero dos y el cliente C cero seis que no existe. Pero Claude fue más allá: me advirtió de los espacios duros, que llegan al copiar de una página web, de los montos guardados como texto, y de que los rangos fijos no crecen. Ronda dos para Claude.

## ESCENA 10 · Ronda 3: el total por ciudad
[VISUAL] Dos tablas iguales: Bogotá 4.380 · Medellín 4.020 · Cali 1.550 · Sin ciudad 820 · Total 10.770. Debajo: ChatGPT "SUMAR.SI + ciudades escritas a mano" vs Claude "AGRUPARPOR automático".
[VOZ]
Ronda tres: el total por ciudad. Las dos dieron los números correctos: Bogotá cuatro mil trescientos ochenta, Medellín cuatro mil veinte, Cali mil quinientos cincuenta, y ochocientos veinte sin ciudad. ChatGPT propuso SUMAR.SI escribiendo las ciudades a mano; Claude, un AGRUPARPOR que se actualiza solo. Los dos funcionan. Empate.

## ESCENA 11 · Ronda 4: el código de Python
[VISUAL] Fondo oscuro. Terminal ChatGPT: "KeyError: 'Cliente'" en rojo. Terminal Claude: "Total por ciudad… Bogotá 4380…" en verde.
[VOZ]
Ronda cuatro, la que definió el duelo: les pedí el mismo trabajo en Python, leyendo un archivo de Excel. Ejecuté el código de ChatGPT… y falló: error de clave, porque intentaba limpiar una columna Cliente en la hoja de clientes, donde se llama ID. El código de Claude funcionó a la primera.

## ESCENA 12 · Lo que hizo diferente cada una
[VISUAL] Tarjetas: ChatGPT "Al final de su respuesta avisó del error y dio la corrección (con ella, funciona)" · Claude "Creó un archivo de prueba y ejecutó su código ANTES de responder".
[VOZ]
Ojo, para ser justos: ChatGPT, al final de su misma respuesta, reconoció el error y me dio la corrección. La apliqué, y funcionó. Pero el primer código, el que pegaría cualquier persona apurada, fallaba. Claude, en cambio, creó un archivo de prueba con mis datos y ejecutó su código antes de responderme. Ronda cuatro para Claude.

## ESCENA 13 · Ronda 5: la pregunta de analista
[VISUAL] Pregunta: "¿Qué cliente compró más en febrero y cuánto cambió frente a enero?" → las dos: "Marta Díaz · 2.100 vs 300 · +600 %". Fórmula: (2.100 − 300) / 300 = 6 → 600 %.
[VOZ]
Ronda cinco: una pregunta de analista. ¿Qué cliente compró más en febrero, y cuánto cambió frente a enero? Las dos respondieron bien: Marta Díaz, con dos mil cien, frente a trescientos en enero. Un aumento del seiscientos por ciento: compró siete veces más. ChatGPT agregó una conclusión comercial; Claude aclaró que el cliente fantasma no entraba en la comparación. Empate.

## ESCENA 14 · Rapidez y presentación
[VISUAL] Cronómetro: ChatGPT ⚡ "segundos" vs Claude 🧠 "piensa y ejecuta". Tarjeta: "Tablas más visuales: ChatGPT".
[VOZ]
Y una categoría extra: rapidez y presentación. Aquí gana ChatGPT. Respondió casi al instante, con tablas muy visuales y fáciles de leer. Claude se tomó su tiempo para razonar y ejecutar el código. Si necesitas una idea rápida, eso pesa. Y en el día a día, cuando estás en una reunión y necesitas una fórmula ya, esos segundos se notan. Punto para ChatGPT.

## ESCENA 15 · El marcador final
[VISUAL] Marcador gigante: "CLAUDE 2 · CHATGPT 1 · EMPATES 3".
[VOZ]
[excited] El marcador final: Claude, dos puntos. ChatGPT, uno. Y tres empates. Claude ganó por precisión: revisó más problemas y su código funcionó a la primera. ChatGPT ganó en rapidez y presentación. Y en lo más importante, las fórmulas y los totales, las dos acertaron.

## ESCENA 16 · Lo que hay que decir
[VISUAL] Tarjeta ⚖️: "Planes distintos (gratis vs Pro) · una sola prueba · no es un estudio científico".
[VOZ]
Ahora, lo que hay que decir con honestidad. Comparé el plan gratuito de ChatGPT con el plan Pro de Claude. Con un plan de pago, ChatGPT podría responder distinto. Y es una sola prueba, con un solo problema. No es un estudio científico. Es lo que me pasó a mí, con datos reales, y te lo muestro tal cual.

## ESCENA 17 · La gran lección
[VISUAL] Lista: "✅ Prueba la fórmula antes de usarla" · "✅ Ejecuta el código con datos de prueba" · "✅ Pídele: 'prueba tu código antes de responder'" · "✅ Comprueba el total".
[VOZ]
La gran lección del duelo es esta: las dos se pueden equivocar. Así que prueba cada fórmula antes de usarla, ejecuta el código con datos de prueba, y comprueba el total. Y un truco que aprendí aquí: pídele a cualquier IA que pruebe su código antes de responderte. Ese pedido solo, te ahorra muchos dolores de cabeza.

## ESCENA 18 · ¿Cuál usar?
[VISUAL] Comparar: "ChatGPT (gratis)" ✓ ideas rápidas · ✓ explicaciones · ✓ tablas visuales vs "Claude (Pro)" ✓ código que funciona · ✓ revisión a fondo · ✓ tareas largas.
[VOZ]
¿Entonces cuál usar? Si quieres una respuesta rápida, una explicación o una idea, ChatGPT gratis te sirve muy bien. Si vas a trabajar con código, con datos importantes, o necesitas que revise todo a fondo, Claude se ganó mi confianza en esta prueba. Y recuerda que las dos ya tienen su complemento dentro de Excel.

## ESCENA 19 · Pon tú el próximo reto
[VISUAL] Tarjeta 💬: "Escribe en los comentarios: ¿qué reto le pongo a la IA en el próximo duelo?".
[VOZ]
Y ahora te toca a ti. Escríbeme en los comentarios qué reto le pondrías a la inteligencia artificial en el próximo duelo: una fórmula difícil, una tabla dinámica, un gráfico, un macro. Los retos más votados los pruebo en un próximo video, con la misma regla: todo se comprueba.

## ESCENA 20 · Resumen
[VISUAL] Resumen3: "Fórmulas: empate" · "Código: ganó Claude" · "La mejor IA es la que verificas".
[VOZ]
En resumen: en las fórmulas y los totales hubo empate. En el código y la revisión de datos ganó Claude. En rapidez ganó ChatGPT. Pero la mejor inteligencia artificial es la que tú verificas. [serious] Si no lo aprendes ahora, te extingues.

## ESCENA 21 · Cierre y siguiente video
[VISUAL] Tienda con QR. CierreSiguiente: "Probabilidad binomial al instante".
[VOZ]
Si te gustan estos retos, visita mi página, edwinortiz punto net, y la tienda, con plantillas de Excel listas para usar; el enlace está abajo. En el próximo video calculamos la probabilidad binomial al instante, con Excel y con Python, y resolvemos un misterio con números. Suscríbete para no perdértelo. [excited] El poder de la tecnología te va a cambiar el mundo.
