---
canal: edwin-o
tipo: tutorial
tema: Etiquetas de inventario con código QR y código de barras en Excel
slug: etiquetas-qr-excel
programa: Excel para Microsoft 365 en español
duracion_objetivo: 9 min
estado: aprobado   # lote de enero 2027 pedido por Edwin el 25 nov 2026; se revisa completo antes de publicar
siguiente_video: ¿Qué es Power Query y para qué sirve? (que-es-power-query)
---

<!-- Datos y fórmulas verificados en Excel 365 real: ver ficha.md. Las imágenes del video son QR y códigos reales. -->

## ESCENA 01 · Gancho
[VISUAL] Hoja de etiquetas impresa: 6 etiquetas con QR, código de barras, producto y ubicación. Un celular escanea un QR y aparece "INV-005 | Silla ergonómica | Oficina 2".
[VOZ]
[excited] Seis etiquetas de inventario, cada una con su código QR y su código de barras, hechas en Excel en menos de dos minutos. Las escaneas con el celular y te dicen qué es y dónde está. Sin programas raros, sin pagar licencias.

## ESCENA 02 · Presentación
[VISUAL] Cortinilla + título "QR y CÓDIGO DE BARRAS en Excel". Lista: Código QR · Código de barras · Hoja de etiquetas · Escanear y buscar.
[VOZ]
[excited] ¡Bienvenidos, amigos del canal! Vamos en busca del poder tecnológico. Hoy vas a crear códigos QR y códigos de barras directamente en las celdas de Excel, armar una hoja de etiquetas lista para imprimir, y usar un lector para buscar cualquier producto en un segundo.

## ESCENA 03 · El caso
[VISUAL] Tarjeta: "GS1 · Sunrise 2027: las cajas del comercio se preparan para leer códigos 2D (QR) a finales de 2027". Píldora: "Mientras tanto: QR + código de barras".
[VOZ]
¿Por qué ahora? Porque el mundo del comercio está cambiando de código. GS1, la organización que administra los códigos de barras de los productos, impulsa una iniciativa llamada Sunrise dos mil veintisiete: que las cajas registradoras puedan leer códigos de dos dimensiones, como el QR, para finales de dos mil veintisiete. Y mientras llega ese momento, se imprimen los dos. Justo lo que vamos a hacer hoy.

## ESCENA 04 · El aporte de Edwin
<!-- APORTE: confirmar -->
[VISUAL] Tarjeta 📦: "He hecho software de inventario para empresas y colegios: la etiqueta es lo que hace que el inventario funcione".
[VOZ]
Yo he desarrollado sistemas de inventario para empresas y para colegios, y te digo algo que aprendí: el mejor programa no sirve si las etiquetas están mal. Si la etiqueta se borra o nadie la puede leer, el inventario se cae. Por eso me gusta tanto esta técnica: etiquetas claras, legibles y hechas en minutos.

## ESCENA 05 · Lo que necesitas
[VISUAL] Tarjetas: "Excel para Microsoft 365 o Excel 2024 (función IMAGEN)" · "Conexión a internet". Píldora: "¿Excel 2021 o anterior? Tranquilo: al final te doy otra opción".
[VOZ]
Lo que necesitas: Excel para Microsoft trescientos sesenta y cinco o Excel dos mil veinticuatro, porque vamos a usar la función IMAGEN, y conexión a internet. Excel no tiene una función de QR propia: lo que hacemos es pedirle la imagen a un servicio gratuito. Si tienes Excel dos mil veintiuno o anterior, quédate, porque al final te doy otra forma.

## ESCENA 06 · Los datos
[VISUAL] HojaExcel "Inventario": A Código · B Producto · C Ubicación · D Cantidad, 6 filas (INV-001 Laptop Dell … INV-006 Impresora).
[VOZ]
Estos son los datos: un inventario con seis activos. En la columna A está el código, de INV cero cero uno a INV cero cero seis. En la B el producto, en la C la ubicación y en la D la cantidad. Los códigos QR van a ir en la columna F y los códigos de barras en la G.

## ESCENA 07 · Paso 1: tu primer QR
[VISUAL] En F2 se escribe =IMAGEN("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="&A2) → aparece el QR en la celda. Zoom.
[FORMULA] =IMAGEN("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="&A2)
[VOZ]
Paso uno: tu primer código QR. En la celda F2 escribe igual, IMAGEN, abre paréntesis, y entre comillas la dirección del servicio de códigos QR que te dejo en la descripción. Termina en data igual. Cierra comillas, y con el ampersand le pegas el código de la celda A2. Cierra paréntesis, Enter… [excited] ¡Y ahí está tu QR, dentro de la celda!

## ESCENA 08 · Entiende la fórmula
[VISUAL] FormulaGrande con partes: "IMAGEN" → "trae una imagen de internet a la celda" · "size=150x150" → "tamaño en píxeles" · "data=" → "lo que guarda el QR" · "&A2" → "el código de esta fila".
[VOZ]
Entiende la fórmula, que es muy sencilla. IMAGEN trae una imagen de internet y la pone dentro de la celda. La dirección es de un generador de QR gratuito: size dice el tamaño en píxeles, y lo que va después de data es lo que va a guardar el código. Y con el ampersand A2, cada fila genera el QR de su propio producto.

## ESCENA 09 · Paso 2: más información en el QR
[VISUAL] La fórmula cambia a ...&data="&URLCODIF(A2&" | "&B2&" | "&C2)). Globo: "URLCODIF convierte los espacios en %20". Al lado, celular que escanea: "INV-001 | Laptop Dell | Bodega A".
[FORMULA] =IMAGEN("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="&URLCODIF(A2&" | "&B2&" | "&C2))
[VOZ]
Paso dos: guarda más información. Quiero que el QR diga el código, el producto y la ubicación. Uno los tres con ampersand y una barra en medio. Pero ojo: las direcciones de internet no aceptan espacios, por eso lo envuelvo en la función URLCODIF, que los convierte a un formato que la web entiende. Ahora, si escaneas el QR con el celular, te muestra los tres datos.

## ESCENA 10 · Paso 3: rellena todas las filas
[VISUAL] Se arrastra el controlador de relleno de F2 a F7 → aparecen 6 QR distintos. Se agranda el alto de fila (Inicio > Formato > Alto de fila: 80).
[VOZ]
Paso tres: arrastra la fórmula hasta la fila siete, y cada producto tendrá su QR. Si se ven pequeños, agranda las filas: en la pestaña Inicio, Formato, Alto de fila, y pon ochenta. La imagen se ajusta sola al tamaño de la celda, sin deformarse.

## ESCENA 11 · Paso 4: el código de barras
[VISUAL] En G2: =IMAGEN("https://bwipjs-api.metafloor.com/?bcid=code128&text="&URLCODIF(A2)&"&includetext") → aparece el código de barras con el texto INV-001.
[FORMULA] =IMAGEN("https://bwipjs-api.metafloor.com/?bcid=code128&text="&URLCODIF(A2)&"&includetext")
[VOZ]
Paso cuatro: el código de barras. Es la misma idea, con otro servicio gratuito. En G2 escribe IMAGEN y la dirección del generador, también en la descripción. bcid igual code ciento veintiocho es el tipo de código, el más usado en inventarios. Text es el código del producto, y include text pone el número debajo de las barras, para que también lo pueda leer una persona.

## ESCENA 12 · Así se ve tu inventario
[VISUAL] HojaExcel completa con QR en F y código de barras en G para las 6 filas. Zoom recorriendo las filas.
[VOZ]
[excited] Y así queda tu inventario: cada activo con su código QR y su código de barras, generados con dos fórmulas. Si mañana agregas un producto nuevo, copias la fórmula en la fila de abajo y listo. Y si cambias el nombre o la ubicación, el QR se actualiza solo.

## ESCENA 13 · Paso 5: la hoja de etiquetas
[VISUAL] Etiquetas: cuadrícula de 6 etiquetas (QR + código + producto + ubicación + código de barras). Píldora: "Diseño de página → Márgenes estrechos → Imprimir".
[VOZ]
Paso cinco: las etiquetas para imprimir. Arma una hoja con una celda por dato: el QR, el código, el producto, la ubicación y el código de barras, con un borde punteado para recortar. En Diseño de página pon márgenes estrechos, y ajusta todo a una página de ancho. Imprime en papel adhesivo, recorta, y a pegar.

## ESCENA 14 · Nivel pro: cuadrícula automática
[VISUAL] En otra hoja: =AJUSTARFILAS(IMAGEN("…&data="&URLCODIF(A2:A7));3) → cuadrícula de 2 filas × 3 columnas de QR.
[FORMULA] =AJUSTARFILAS(IMAGEN("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="&URLCODIF(Inventario!A2:A7));3)
[VOZ]
Nivel pro. Si solo necesitas los QR en una cuadrícula, hazlo con una sola fórmula. Le pasas a IMAGEN todo el rango de códigos de una vez, y lo envuelves en AJUSTARFILAS con un tres. Excel acomoda los seis QR en filas de tres. Agregas códigos y la cuadrícula crece sola.

## ESCENA 15 · Nivel pro 2: escanea y busca
[VISUAL] Hoja "Consulta": el lector USB "escribe" INV-005 en B1 → B3: =BUSCARX(B1;Inventario!A2:A7;Inventario!B2:D7;"No existe") → Silla ergonómica · Oficina 2 · 8.
[FORMULA] =BUSCARX(B1;Inventario!A2:A7;Inventario!B2:D7;"No existe")
[VOZ]
Y el truco que más me gusta. Un lector de código de barras USB funciona como un teclado: escribe el código donde esté el cursor. Así que en una hoja de consulta pongo el cursor en B1, escaneo la etiqueta… y BUSCARX me trae el producto, la ubicación y la cantidad. Si el código no existe, me dice "No existe".

## ESCENA 16 · Ojo con la privacidad
[VISUAL] Tarjeta 🔒: "El texto del QR viaja al servicio que crea la imagen". Lista: "✓ Códigos y nombres de productos" · "✗ Datos personales, contraseñas, precios internos".
[VOZ]
Una advertencia importante. Con este método, el texto que pones en el QR viaja a un servicio externo para crear la imagen. Para códigos y nombres de productos no hay problema. Pero no pongas ahí datos personales, contraseñas ni información confidencial de tu empresa. Para eso, usa la opción sin internet que te muestro ahora.

## ESCENA 17 · Sin internet: la fuente de código de barras
[VISUAL] Columna con ="*"&A2&"*" → *INV-001* → al cambiar la fuente a "Libre Barcode 39" se convierte en barras. Píldora: "Fuente gratis de Google Fonts".
[FORMULA] ="*"&A2&"*"
[VOZ]
La opción sin internet: una fuente de código de barras. Descarga gratis la fuente Libre Barcode treinta y nueve de Google Fonts e instálala. En una celda escribe igual, comillas, asterisco, comillas, ampersand A2, ampersand, y otra vez el asterisco. Los asteriscos marcan el inicio y el fin del código. Cambias la fuente de esa celda… y el texto se convierte en barras. Funciona en cualquier Excel.

## ESCENA 18 · Si no te funcionó
[VISUAL] ListaErrores: "#¿NOMBRE?" → "Tu Excel no tiene IMAGEN: usa la fuente" · "#¡CONECTAR!" → "Revisa tu internet" · "#¡BLOQUEADO!" → "Activa las imágenes vinculadas en el Centro de confianza" · "Imagen en blanco" → "La dirección redirige: usa https".
[VOZ]
Si no te funcionó: numeral nombre significa que tu versión no tiene la función IMAGEN; usa la fuente. Numeral conectar es un problema de internet. Numeral bloqueado aparece cuando tu Excel tiene bloqueadas las imágenes vinculadas, y se activa en el Centro de confianza. Y recuerda que la dirección debe empezar con h t t p s, porque Excel bloquea las direcciones que redirigen.

## ESCENA 19 · Resumen
[VISUAL] Resumen3: "IMAGEN + servicio de QR" · "URLCODIF para textos con espacios" · "Lector USB + BUSCARX".
[VOZ]
En resumen: con IMAGEN y un servicio gratuito creas códigos QR y de barras dentro de las celdas. Usa URLCODIF cuando el texto lleve espacios. Y con un lector USB y BUSCARX, consultas cualquier producto en un segundo. [serious] Si no lo aprendes ahora, te extingues.

## ESCENA 20 · Cierre y siguiente video
[VISUAL] Tienda con QR real a edwinortiz.net/tienda. CierreSiguiente: "¿Qué es Power Query?".
[VOZ]
Y mira este QR: te lleva directo a mi tienda, en edwinortiz punto net, donde encuentras plantillas de Excel listas para usar; el enlace también está abajo. En el próximo video te explico qué es Power Query y para qué sirve: la herramienta que limpia tus datos sola. Suscríbete para no perdértelo. [excited] El poder de la tecnología te va a cambiar el mundo.
