---
canal: edwin-o
tipo: tutorial
tema: Automatiza Excel con Python — 12 reportes en segundos
slug: python-automatizar-excel
programa: Python 3 + pandas + openpyxl (Windows)
duracion_objetivo: 9 min
estado: aprobado   # lote de 4 semanas pedido por Edwin el 24 nov 2026; se revisa completo antes de publicar
siguiente_video: ¿Excel está muerto con la IA? (excel-esta-muerto)
---

<!-- Código real en codigo/reportes.py y codigo/reportes_pro.py (ejecutado; salida en ficha.md). -->

## ESCENA 01 · Gancho
[VISUAL] Terminal: `python reportes.py` y aparecen 12 líneas "Listo: Reporte Bogotá.xlsx (193 ventas)…". Carpeta que se llena con 12 archivos de Excel.
[VOZ]
[excited] Doce reportes de Excel, uno por cada sucursal, con sus ventas y su resumen por vendedor… en unos ocho segundos. [curious] ¿Cuánto te tomaría hacerlo a mano? Hoy lo vas a hacer con un programa de doce líneas en Python.

## ESCENA 02 · Presentación
[VISUAL] Cortinilla + título "Automatiza Excel con Python".
[VOZ]
[excited] ¡Bienvenidos, amigos del canal! Vamos en busca del poder tecnológico. Hoy vamos a automatizar Excel con Python, paso a paso, aunque nunca hayas programado. Te explico cada línea, te doy el código completo, y al final te enseño los errores que casi todo el mundo comete la primera vez.

## ESCENA 03 · El caso
[VISUAL] Cifra "+7 puntos" · "Uso de Python en un año (Stack Overflow 2025)". Luego: 57,9 % de los desarrolladores lo usan.
[VOZ]
¿Por qué Python, y por qué ahora? En la encuesta de Stack Overflow de dos mil veinticinco, el uso de Python subió siete puntos en un solo año, el mayor salto de todos los lenguajes. Ya lo usa más de la mitad de los desarrolladores. Y no es solo para programadores: cada vez más gente de oficina lo usa para no repetir el mismo trabajo cada semana.

## ESCENA 04 · El aporte de Edwin
<!-- APORTE: confirmar con Edwin -->
[VISUAL] Tarjeta 🏢: "La petición número uno: un reporte por sede, cada semana".
[VOZ]
En el software que he desarrollado para empresas, la petición número uno siempre es la misma: "Edwin, necesito un reporte por sede, cada semana". Y casi siempre hay alguien que pierde una mañana entera haciéndolo a mano. Eso es justo lo que vamos a eliminar hoy.

## ESCENA 05 · El problema
[VISUAL] HojaExcel "ventas.xlsx": Fecha · Sucursal · Vendedor · Producto · Cantidad · Monto, con 2.400 filas. Lista del proceso manual: filtrar → copiar → libro nuevo → pegar → guardar → ×12.
[VOZ]
Este es el archivo: dos mil cuatrocientas ventas de noviembre, de doce sucursales. A mano, tendrías que filtrar una sucursal, copiar, crear un libro nuevo, pegar, hacer el resumen, guardar… y repetirlo doce veces. Fácilmente una hora. Y la semana siguiente, otra vez. Y entre tanto copiar y pegar, tarde o temprano se te escapa una fila, o pegas los datos en el archivo equivocado.

## ESCENA 06 · Paso 1: instala Python
[VISUAL] Ventana de instalación: casilla "Add python.exe to PATH" marcada con un círculo. Luego Terminal: `pip install pandas openpyxl`.
[VOZ]
Paso uno: instala Python desde python punto org. Y aquí va el detalle más importante de todo el video: en la primera pantalla, marca la casilla que dice "Add python punto exe to PATH". Después abre la terminal y escribe: pip install pandas openpyxl. Pandas lee y organiza los datos, y openpyxl escribe los archivos de Excel.

## ESCENA 07 · Paso 2: la carpeta
[VISUAL] Carpeta "Reportes" con dos archivos: ventas.xlsx y reportes.py. Editor de código abierto con reportes.py vacío.
[VOZ]
Paso dos: crea una carpeta y pon ahí tu archivo de ventas. Al lado, crea un archivo de texto llamado reportes punto py. Puedes escribirlo en Visual Studio Code, o incluso en el bloc de notas. Lo importante es que los dos archivos estén en la misma carpeta.

## ESCENA 08 · Paso 3: lee el Excel
[VISUAL] CodigoAnimado: líneas 1-4 (import pandas, Path, read_excel). Terminal al lado: print(ventas.head()) con las primeras filas.
[CODIGO] import pandas as pd / from pathlib import Path / ventas = pd.read_excel("ventas.xlsx")
[VOZ]
Paso tres: leer el Excel. La primera línea trae pandas, y le pone un apodo corto: p d. La segunda trae Path, que sirve para manejar carpetas. Y la tercera es la magia: ventas igual a p d punto read excel, y el nombre del archivo. Con eso, las dos mil cuatrocientas filas ya están en la memoria de Python, listas para trabajar.

## ESCENA 09 · Paso 4: la carpeta de reportes
[VISUAL] Se agregan las líneas 5-6: carpeta = Path("reportes") y carpeta.mkdir(exist_ok=True). Aparece una carpeta vacía "reportes".
[VOZ]
Paso cuatro: le decimos dónde guardar los resultados. Carpeta igual a Path, reportes. Y en la siguiente línea, carpeta punto mkdir, que significa "crea la carpeta". El exist ok igual a True le dice: si ya existe, no pasa nada, sigue adelante.

## ESCENA 10 · Paso 5: el ciclo mágico
[VISUAL] Línea 8: for sucursal, datos in ventas.groupby("Sucursal"):. Animación: la tabla se parte en 12 bloques de colores, uno por sucursal.
[VOZ]
Paso cinco, el corazón del programa. For sucursal coma datos in ventas punto groupby, sucursal. Groupby agrupa la tabla por sucursal, como una tabla dinámica, y el for recorre cada grupo, uno por uno. En cada vuelta, sucursal tiene el nombre, por ejemplo Bogotá, y datos tiene solo las ventas de Bogotá. Doce sucursales, doce vueltas.

## ESCENA 11 · Paso 6: el nombre y el resumen
[VISUAL] Líneas 9-10: archivo = carpeta / f"Reporte {sucursal}.xlsx" y resumen = datos.groupby("Vendedor")["Monto"].sum(). Ejemplo en vivo: "Reporte Bogotá.xlsx" y el resumen de Bogotá.
[VOZ]
Paso seis. Primero, armamos el nombre del archivo. La f antes de las comillas permite meter variables entre llaves, así que en la vuelta de Bogotá se llama "Reporte Bogotá punto xlsx". Y luego el resumen: agrupamos los datos por vendedor, tomamos la columna monto y la sumamos. Es exactamente lo que harías con una tabla dinámica, pero en una línea.

## ESCENA 12 · Paso 7: escribe el libro
[VISUAL] Líneas 11-13: with pd.ExcelWriter(archivo) as excel: … to_excel(…, sheet_name="Ventas") … to_excel(…, sheet_name="Resumen"). Un libro con dos pestañas se arma solo.
[VOZ]
Paso siete: escribimos el libro de Excel. With p d punto ExcelWriter abre un archivo nuevo. Dentro, datos punto to excel pone las ventas en una hoja llamada Ventas, y resumen punto to excel pone el resumen en otra hoja llamada Resumen. El index igual a False evita una columna de números que no necesitas.

## ESCENA 13 · Paso 8: ejecuta
[VISUAL] Línea 14: print(f"Listo: {archivo.name} ({len(datos)} ventas)"). Terminal: `python reportes.py` y aparecen las 12 líneas reales.
[VOZ]
Y la última línea imprime un mensaje para saber que todo va bien. Guarda el archivo, abre la terminal en esa carpeta y escribe: python reportes punto py. [excited] Mira cómo van saliendo: Arequipa, Barranquilla, Bogotá… doce reportes. Y en la carpeta, doce archivos de Excel nuevos.

## ESCENA 14 · El resultado
[VISUAL] HojaExcel "Reporte Bogotá.xlsx", pestaña Resumen: Vendedor BOG-1 52.100 · BOG-2 46.960 · BOG-3 26.370 · BOG-4 43.610. Pestaña Ventas con 193 filas.
[VOZ]
Abramos el de Bogotá. En la hoja Ventas están sus ciento noventa y tres ventas, y en la hoja Resumen, el total de cada vendedor. Nadie filtró, nadie copió, nadie pegó. Y lo mejor: el próximo lunes cambias el archivo de ventas, ejecutas el programa, y en unos segundos tienes los reportes nuevos.

## ESCENA 15 · Adáptalo a tus datos
[VISUAL] En la línea del for, "Sucursal" cambia a "Vendedor" (resaltado). Terminal: 48 líneas "Listo: Reporte Vendedor BOG-1.xlsx…". Lista: "¿Por mes? ¿Por cliente? ¿Por producto? → cambia una palabra".
[VOZ]
¿Y si tus datos son diferentes? Esta es la mejor parte: el programa se adapta cambiando una sola palabra. Si en vez de un reporte por sucursal necesitas uno por vendedor, cambia Sucursal por Vendedor en la línea del for. Y ahora salen cuarenta y ocho reportes, uno por cada vendedor. ¿Por producto? ¿Por cliente? ¿Por mes? Es el mismo programa. Solo asegúrate de escribir el nombre de la columna exactamente como está en tu Excel, con mayúsculas y tildes.

## ESCENA 16 · Nivel pro: el total y el ancho
[VISUAL] Código extra con openpyxl: load_workbook, column_dimensions["A"].width = 22, hoja.append(["TOTAL", resumen.sum()]). La hoja Resumen muestra TOTAL 169.040.
[VOZ]
Nivel pro. Con openpyxl puedes retocar cada libro antes de terminar. Abres el archivo con load workbook, ensanchas la columna A para que se lean los nombres, y con append agregas una fila de total al final. En Bogotá da ciento sesenta y nueve mil cuarenta. El código completo de esta versión te lo dejo en la descripción.

## ESCENA 17 · Errores comunes
[VISUAL] ListaErrores: "'pip' no se reconoce" → "Marca Add to PATH o usa py -m pip" · "PermissionError" → "Cierra el archivo en Excel" · "UnicodeEncodeError" → "Quita símbolos como ✓ del print".
[VOZ]
Ahora, los errores que casi todo el mundo comete. Si la terminal dice que pip no se reconoce, Python no quedó en el PATH: reinstálalo marcando la casilla, o escribe p y guion m pip. Si sale permission error, es porque tienes el reporte abierto en Excel: ciérralo y vuelve a ejecutar. Y un error que nos pasó preparando este video: pusimos un símbolo de check en el mensaje, y la consola de Windows no lo pudo mostrar. Usa texto normal y listo.

## ESCENA 18 · Que trabaje solo
[VISUAL] Programador de tareas de Windows: "Cada lunes, 7:00 a. m. → python reportes.py". Tarjeta: "Prueba primero a mano; luego prográmalo".
[VOZ]
¿Y si quieres que se ejecute solo? Windows tiene el Programador de tareas. Le dices: cada lunes a las siete de la mañana, ejecuta este programa. Y cuando llegues a la oficina, los reportes ya están listos. Eso sí: primero pruébalo varias veces a mano, y después lo programas.

## ESCENA 19 · Por qué importa
[VISUAL] Comparar: "A mano" (1 hora por semana · 52 horas al año · errores al copiar) vs "Con Python" (8 segundos · siempre igual · tú decides qué analizar).
[VOZ]
Haz la cuenta: una hora a la semana son cincuenta y dos horas al año. Más de una semana laboral entera, copiando y pegando. Con Python, son segundos, y siempre sale igual, sin errores al copiar. Ese tiempo lo usas para analizar los números, no para moverlos. [serious] Y como siempre digo: si no lo aprendes ahora, te extingues.

## ESCENA 20 · Resumen y siguiente video
[VISUAL] Resumen3: "pandas lee el Excel" · "groupby separa por sucursal" · "to_excel escribe cada reporte". CierreSiguiente: "¿Excel está muerto con la IA?".
[VOZ]
En resumen: pandas lee el Excel, groupby lo separa por sucursal, y to excel escribe cada reporte. Doce líneas que te devuelven horas. En el próximo video respondemos la pregunta que todos se hacen: con la inteligencia artificial, ¿Excel está muerto? Te va a sorprender la respuesta. Suscríbete para no perdértelo. [excited] El poder de la tecnología te va a cambiar el mundo.
