---
canal: edwin-o
tipo: tutorial
tema: Qué es Power Query y para qué sirve
slug: que-es-power-query
programa: Excel para Microsoft 365 en español
duracion_objetivo: 9 min
estado: aprobado   # lote de enero 2027 pedido por Edwin el 25 nov 2026; se revisa completo antes de publicar
siguiente_video: La varita mágica de Excel, IA para combinar datos (combinar-datos-ia)
---

<!-- Datos verificados con pandas y etiquetas de la interfaz tomadas del Power Query instalado: ver ficha.md. -->

## ESCENA 01 · Gancho
[VISUAL] Hoja desordenada (espacios, MAYÚSCULAS, "Laptop - Norte", fila en blanco, duplicado). Clic en "Actualizar todo" → tabla limpia y ordenada.
[VOZ]
[curious] Cada lunes te llega el mismo archivo desordenado: nombres con espacios, mayúsculas por todos lados, filas repetidas… y pierdes una hora limpiándolo a mano. [excited] ¿Y si lo limpias una sola vez, y desde ese día, con un solo clic, se limpia solo?

## ESCENA 02 · Presentación
[VISUAL] Cortinilla + título "POWER QUERY". Lista: Qué es · Dónde está · Limpieza paso a paso · Actualizar con 1 clic.
[VOZ]
[excited] ¡Bienvenidos, amigos del canal! Vamos en busca del poder tecnológico. Hoy te explico qué es Power Query, la herramienta de Excel que limpia tus datos sola. Vas a ver dónde está, cómo funciona por dentro, una limpieza completa paso a paso, y el momento mágico: actualizar todo con un clic.

## ESCENA 03 · El caso
[VISUAL] Cuadrícula: "Excel para Windows" · "Excel para Mac" · "Excel para la Web" · "Power BI". Píldora: "El mismo motor en todos".
[VOZ]
Power Query no es nuevo, pero hoy está en todas partes. Según Microsoft, está en Excel para Windows, para Mac y para la Web, y desde dos mil veinticinco la versión web ya puede actualizar consultas de orígenes con contraseña. Y algo que pocos saben: es el mismo motor que usa Power BI. Si lo aprendes en Excel, ya diste el primer paso como analista de datos.

## ESCENA 04 · El aporte de Edwin
<!-- APORTE: confirmar -->
[VISUAL] Tarjeta 🏫: "En mis capacitaciones: secretarias que cada lunes limpian a mano el mismo reporte".
[VOZ]
En mis capacitaciones veo esto todo el tiempo: secretarias y auxiliares que cada lunes reciben el mismo reporte del sistema, y lo limpian a mano, celda por celda. Una hora, cada semana, haciendo exactamente lo mismo. Cuando les muestro Power Query, la reacción siempre es la misma: ¿y por qué nadie me había enseñado esto antes?

## ESCENA 05 · ¿Qué es Power Query?
[VISUAL] Tres tarjetas en flecha: "1. OBTENER (de un archivo, carpeta, web…)" → "2. TRANSFORMAR (limpiar, dividir, unir)" → "3. CARGAR (a una hoja)". Píldora: "Una grabadora de pasos".
[VOZ]
Entonces, ¿qué es? Piensa en Power Query como una grabadora de pasos. Primero obtiene los datos, de un archivo, una carpeta o una página web. Después los transforma: limpia, divide y une. Y al final los carga en una hoja. Lo mejor es que recuerda cada paso que hiciste, para repetirlo cuantas veces quieras.

## ESCENA 06 · ¿Dónde está?
[VISUAL] HojaExcel con la cinta: pestaña Datos → grupo "Obtener y transformar datos": botones "Obtener datos", "Desde tabla o rango", "Desde la web". Cursor.
[VOZ]
¿Dónde está? En la pestaña Datos, a la izquierda. Ahí ves Obtener datos, con todas las fuentes posibles, y Desde tabla o rango, que es el que más vas a usar, para trabajar con datos que ya están en tu hoja. No necesitas instalar nada: en Excel moderno ya viene incluido.

## ESCENA 07 · Los datos
[VISUAL] HojaExcel "Exportación": A Fecha · B Vendedor · C Producto - Región · D Monto, 8 filas con los problemas resaltados en rojo: espacios, mayúsculas, columna combinada, fila en blanco, duplicado.
[VOZ]
Este es el archivo que exporta el sistema de ventas. Mira los problemas: nombres con espacios al principio o al final, unos en mayúsculas y otros en minúsculas. El producto y la región vienen juntos en una sola columna. Hay una fila en blanco, y esta venta de Ana Torres está repetida.

## ESCENA 08 · Paso 1: lleva los datos a Power Query
[VISUAL] Clic en una celda → Datos → "Desde tabla o rango" → cuadro "Crear tabla" → Aceptar → se abre el Editor de Power Query.
[VOZ]
Paso uno. Haz clic en cualquier celda de los datos, ve a la pestaña Datos, y pulsa Desde tabla o rango. Excel te pide confirmar el rango y que tiene encabezados: aceptas. Y se abre una ventana nueva: el editor de Power Query. Tus datos originales no se tocan.

## ESCENA 09 · Conoce el editor
[VISUAL] Editor PQ con los 8 registros. Señalados: cinta (Inicio, Transformar, Agregar columna), vista previa, panel "Pasos aplicados".
[VOZ]
Conoce el editor. Arriba, la cinta, con las pestañas Inicio, Transformar y Agregar columna. En el centro, la vista previa de tus datos. Y a la derecha, el panel más importante: Pasos aplicados. Ahí se va a grabar cada cosa que hagas, en orden, como una receta.

## ESCENA 10 · Paso 2: quita las filas en blanco
[VISUAL] Inicio → Quitar filas → "Quitar filas en blanco" → desaparece la fila vacía; nuevo paso "Filas en blanco quitadas".
[VOZ]
Paso dos: fuera las filas vacías. En la pestaña Inicio, abre Quitar filas, y elige Quitar filas en blanco. Listo, la fila vacía desapareció. Y mira el panel de la derecha: apareció un paso nuevo. Esa es la grabadora trabajando.

## ESCENA 11 · Paso 3: limpia los nombres
[VISUAL] Columna Vendedor seleccionada → Transformar → Formato → "Recortar" (desaparecen los espacios) → "Poner En Mayúsculas Cada Palabra" → Ana Torres, Luis Gómez…
[VOZ]
Paso tres: limpia los nombres. Selecciona la columna Vendedor, ve a Transformar, abre Formato, y elige Recortar: se van los espacios del principio y del final. Y otra vez en Formato, elige Poner en mayúsculas cada palabra. Ahora todos se ven iguales: Ana Torres, Luis Gómez, Sara Ruiz.

## ESCENA 12 · Paso 4: separa producto y región
[VISUAL] Columna "Producto - Región" → Inicio → Dividir columna → "Por delimitador" → personalizado " - " → dos columnas → se renombran Producto y Región.
[VOZ]
Paso cuatro: separa lo que viene junto. Selecciona la columna Producto guion Región, y en Dividir columna elige Por delimitador. Escribe el separador: espacio, guion, espacio. Aceptar, y ahora tienes dos columnas. Haz doble clic en cada encabezado para cambiarle el nombre: Producto y Región.

## ESCENA 13 · Paso 5: quita los duplicados
[VISUAL] Se seleccionan todas las columnas → Inicio → Quitar filas → "Quitar duplicados" → de 7 a 6 filas.
[VOZ]
Paso cinco: los duplicados. Selecciona todas las columnas con Control más A, y en Quitar filas elige Quitar duplicados. La venta repetida de Ana Torres desaparece. ¿Ves por qué limpiamos los nombres primero? Si no, con los espacios, Power Query no habría visto que eran iguales.

## ESCENA 14 · Paso 6: los tipos de datos
[VISUAL] Íconos de tipo en los encabezados: Fecha 📅, Monto 1.2 → "Número entero". Paso "Tipo cambiado".
[VOZ]
Paso seis: los tipos de datos. Fíjate en el ícono a la izquierda de cada encabezado. La fecha debe ser fecha, y el monto, un número. Si no lo son, haz clic en el ícono y elige el tipo correcto. Esto es clave: si el monto queda como texto, después no lo vas a poder sumar.

## ESCENA 15 · La grabadora de pasos
[VISUAL] Panel Pasos aplicados con 7 pasos. Se hace clic en un paso anterior (la vista vuelve atrás) y se señala la ✗ para borrar un paso.
[VOZ]
Mira el panel de pasos aplicados: ahí está toda tu limpieza, en orden. Si haces clic en un paso anterior, ves cómo estaban los datos en ese momento. Y si te equivocaste, borras el paso con la equis. Nada se pierde: tus datos originales siguen intactos en la hoja.

## ESCENA 16 · Paso 7: cerrar y cargar
[VISUAL] Inicio → "Cerrar y cargar" → nueva hoja con tabla verde de 6 filas. Panel "Consultas y conexiones": "Ventas · 6 filas cargadas".
[VOZ]
Paso siete: en la pestaña Inicio, pulsa Cerrar y cargar. Power Query crea una hoja nueva con una tabla limpia: seis ventas, con los nombres bien escritos y el producto y la región separados. A la derecha ves la consulta, con el número de filas que cargó.

## ESCENA 17 · La magia: actualizar todo
[VISUAL] Hoja de exportación: se pegan 2 filas nuevas desordenadas → Datos → "Actualizar todo" → la tabla limpia pasa a 8 filas, total 4.450.
[VOZ]
[excited] Y ahora, la magia. Llega la semana siguiente, y el sistema exporta dos ventas nuevas, igual de desordenadas. Las pegas debajo de los datos originales, vas a Datos, y pulsas Actualizar todo. Power Query repite toda la receta en un segundo: ocho ventas limpias, y el total sube a cuatro mil cuatrocientos cincuenta. Ya no limpias nunca más.

## ESCENA 18 · ¿Power Query o fórmulas?
[VISUAL] Comparar: "Fórmulas" (✓ cálculos al instante · ✓ cambian al escribir · ✗ no limpian el archivo de origen) vs "Power Query" (✓ limpia y transforma · ✓ repite la receta con 1 clic · ✓ maneja miles de filas).
[VOZ]
Una pregunta que siempre me hacen: ¿entonces ya no uso fórmulas? Claro que sí. Las fórmulas son para calcular: sumas, búsquedas, porcentajes, y se actualizan apenas escribes. Power Query es para preparar los datos antes: limpiar, separar, unir y repetir esa receta cada semana, aunque sean miles de filas. Lo ideal es usar los dos: Power Query deja los datos limpios, y las fórmulas hacen los cálculos.

## ESCENA 19 · ¿Qué más puede hacer?
[VISUAL] Cuadrícula: "📁 Juntar 50 archivos de una carpeta" · "🔗 Unir dos tablas (Combinar consultas)" · "📚 Apilar meses (Anexar consultas)" · "🔄 Pasar meses a filas" · "🌐 Traer tablas de una web" · "📊 Alimentar Power BI".
[VOZ]
¿Y qué más puede hacer? Muchísimo. Juntar cincuenta archivos de una carpeta en una sola tabla. Unir dos tablas, como ventas y clientes. Apilar los meses uno debajo del otro. Convertir columnas de meses en filas, para analizarlas. Traer tablas de una página web. Y lo que aprendas aquí, te sirve igual en Power BI. Varias de estas cosas las vamos a ver en los próximos videos de esta serie.

## ESCENA 20 · Si no te funcionó
[VISUAL] ListaErrores: "No veo 'Desde tabla o rango'" → "Excel 2010/2013: complemento antiguo; actualiza" · "Error al actualizar: no se encontró la columna" → "Cambiaron un encabezado en el origen" · "El monto no suma" → "Cambia el tipo a número".
[VOZ]
Si no te funcionó: si no ves Desde tabla o rango, puede que tengas Excel dos mil diez o dos mil trece, donde era un complemento aparte; lo ideal es actualizar. Si al actualizar sale un error de columna no encontrada, alguien le cambió el nombre a un encabezado en el archivo original. Y si el monto no suma, revisa el tipo de datos.

## ESCENA 21 · Resumen
[VISUAL] Resumen3: "Obtener → Transformar → Cargar" · "Cada paso queda grabado" · "Actualizar todo = cero trabajo repetido".
[VOZ]
En resumen: Power Query obtiene, transforma y carga tus datos. Cada paso queda grabado en una receta. Y con Actualizar todo, lo que antes te tomaba una hora cada lunes, ahora toma un segundo. [serious] Si no lo aprendes ahora, te extingues.

## ESCENA 22 · Cierre y siguiente video
[VISUAL] Tienda con QR. CierreSiguiente: "La varita mágica: IA para combinar datos".
[VOZ]
Te recuerdo que en mi página, edwinortiz punto net, y en la tienda, tienes plantillas de Excel listas para usar; el enlace está en la descripción. En el próximo video te muestro la varita mágica de Excel: cómo usar la inteligencia artificial para combinar datos como un profesional. Suscríbete para no perdértelo. [excited] El poder de la tecnología te va a cambiar el mundo.
