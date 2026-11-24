---
canal: edwin-o
tipo: tutorial
tema: Python en Excel — tu primer análisis con =PY()
slug: python-en-excel
programa: Excel para Microsoft 365 (Python en Excel)
duracion_objetivo: 9 min
estado: aprobado   # lote de 4 semanas pedido por Edwin el 24 nov 2026; se revisa completo antes de publicar
siguiente_video: 5 errores de Excel que cometen hasta los expertos (errores-comunes-excel)
---

<!-- Hechos y resultados en ficha.md. Tabla Ventas: Mes | Región | Producto | Monto (12 filas). -->

## ESCENA 01 · Gancho
[VISUAL] Celda de Excel con badge PY. Se escribe df.groupby("Región")["Monto"].sum().plot(kind="bar") → aparece un gráfico de barras.
[VOZ]
[excited] Esto es una celda de Excel… y adentro estoy escribiendo Python. Una línea, Control más Entrar, y aparece un gráfico de ventas por región. [curious] Sin instalar nada, sin salir de Excel. Hoy te enseño a hacer tu primer análisis con Python dentro de Excel.

## ESCENA 02 · Presentación
[VISUAL] Cortinilla + título "Python en Excel".
[VOZ]
[excited] ¡Bienvenidos, amigos del canal! Vamos en busca del poder tecnológico. Hoy juntamos los dos mundos de este canal: Excel y Python. Te muestro cómo activarlo, cómo traer tus datos, cómo sacar estadísticas y gráficos, y también sus límites, para que no te lleves sorpresas.

## ESCENA 03 · El caso
[VISUAL] Tarjetas: "Empresas: disponible (Windows, web y Mac)" · "Personal y Familia: vista previa" · "No en iPad, iPhone ni Android". Fuente: Microsoft Support.
[VOZ]
Primero, el estado actual. Python en Excel ya no es un experimento: para cuentas de empresa ya está disponible en Windows, en la web, y desde dos mil veinticinco también en Mac. Para los planes Personal y Familia sigue en vista previa. Y por ahora no funciona en iPad, iPhone ni Android.

## ESCENA 04 · El aporte de Edwin
<!-- APORTE: confirmar con Edwin -->
[VISUAL] Tarjeta 💡: "La mejor puerta de entrada a Python para quien ya sabe Excel: no instalas nada".
[VOZ]
Te doy mi opinión: para quien ya sabe Excel, esta es la mejor puerta de entrada a Python. No tienes que instalar nada, ni configurar nada, ni pelear con la terminal. Tus datos ya están ahí, en la hoja. Solo escribes, y ves el resultado. Si alguna vez te dio miedo programar, empieza por aquí.

## ESCENA 05 · ¿Cómo funciona?
[VISUAL] Diagrama: Celda =PY → ☁️ Microsoft Cloud (Anaconda: pandas, NumPy, Matplotlib…) → resultado en la celda. Tarjeta: "Necesita internet".
[VOZ]
¿Cómo funciona? Tu código no se ejecuta en tu computador, sino en la nube de Microsoft, con las bibliotecas de Anaconda, las mismas que usan los científicos de datos. Excel envía el código y los datos, la nube los procesa, y el resultado vuelve a tu celda. Por eso necesitas conexión a internet, y por eso no tienes que instalar nada. Tu hoja sigue siendo un archivo de Excel normal, que puedes compartir como siempre.

## ESCENA 06 · Paso 1: convierte tus datos en Tabla
[VISUAL] HojaExcel con 12 ventas. Teclas Ctrl + T. Nombre de la tabla: "Ventas".
[VOZ]
Paso uno: prepara tus datos. Tengo doce ventas con mes, región, producto y monto. Selecciónalas y presiona Control más T para convertirlas en Tabla. Luego, en la pestaña Diseño de tabla, ponle un nombre fácil, por ejemplo: Ventas. Así Python puede encontrarla por su nombre.

## ESCENA 07 · Paso 2: inserta una celda de Python
[VISUAL] Cinta: pestaña Fórmulas → botón "Insertar Python" con clic. La celda F2 muestra la insignia PY. Alternativa: escribir =PY(.
[VOZ]
Paso dos: selecciona una celda vacía, ve a la pestaña Fórmulas, y haz clic en Insertar Python. O más rápido: escribe igual, P Y, y abre paréntesis. La celda se marca con una insignia que dice P Y. Eso significa que todo lo que escribas ahí es Python, no una fórmula normal.

## ESCENA 08 · Paso 3: trae los datos con xl
[VISUAL] Barra de fórmulas: df = xl("Ventas[#All]", headers=True). Teclas Ctrl + Entrar. La celda muestra una tarjeta "DataFrame".
[CODIGO] df = xl("Ventas[#All]", headers=True)
[VOZ]
Paso tres: trae los datos. Escribe: d f, igual, x l, y entre paréntesis y comillas, Ventas, corchete, numeral, all. Coma, headers igual a True, para decir que la primera fila son encabezados. Y ojo: aquí Enter no confirma, solo crea una línea nueva. Para confirmar, presiona Control más Entrar. La celda muestra una tarjeta que dice DataFrame: tu tabla ya vive en Python.

## ESCENA 09 · Paso 4: objeto de Python o valores de Excel
[VISUAL] Comparar: "Objeto de Python" (🃏 una tarjeta en la celda · para seguir usándolo en Python) vs "Valores de Excel" (📋 se desborda en la hoja · para ver o graficar en Excel).
[VOZ]
Paso cuatro, un concepto clave: cada celda de Python puede devolver dos cosas. Un objeto de Python, que se ve como una tarjeta y sirve para seguir trabajando en Python. O valores de Excel, que se desbordan en la hoja, como cualquier resultado normal. Lo cambias en el menú de salida, junto a la barra de fórmulas.

## ESCENA 10 · Paso 5: estadísticas en una línea
[VISUAL] Nueva celda: df.describe() → salida valores de Excel: count 12 · mean 910 · std 1092,996299 · min 35 · 25% 131,25 · 50% 465 · 75% 1200 · max 3600.
[CODIGO] df.describe()
[VOZ]
Paso cinco: estadísticas. En otra celda escribe: d f punto describe, abre y cierra paréntesis. Control más Entrar, y cámbialo a valores de Excel. Mira todo lo que te da: doce ventas, un promedio de novecientos diez, la desviación estándar, la venta mínima de treinta y cinco, la máxima de tres mil seiscientos, y los cuartiles. Todo eso, con una palabra.

## ESCENA 11 · Paso 6: agrupa como tabla dinámica
[VISUAL] df.groupby("Región")["Monto"].sum() → Centro 2235 · Norte 6345 · Sur 2340.
[CODIGO] df.groupby("Región")["Monto"].sum()
[VOZ]
Paso seis: agrupar. ¿Te suena groupby? Es lo mismo que usamos en el video de los doce reportes. Escribe: d f punto groupby región, corchetes monto, punto sum. Y tienes el total por región: Centro, dos mil doscientos treinta y cinco. Norte, seis mil trescientos cuarenta y cinco. Y Sur, dos mil trescientos cuarenta. Los mismos resultados que con AGRUPARPOR, pero ahora en Python.

## ESCENA 12 · Paso 7: el gráfico
[VISUAL] Se agrega .plot(kind="bar", title="Ventas por región") → tarjeta de imagen en la celda → clic derecho "mostrar sobre las celdas" (Ctrl+Alt+Shift+C) → gráfico de barras grande.
[CODIGO] df.groupby("Región")["Monto"].sum().plot(kind="bar", title="Ventas por región")
[VOZ]
Paso siete, el que viste al principio. Al final de esa misma línea agrega: punto plot, kind igual a bar. La celda muestra una imagen pequeña. Para verla en grande, haz clic derecho sobre la celda y elige mostrar el gráfico sobre las celdas, o usa Control, Alt, Mayúscula y C. Y ahí está tu gráfico de barras, que puedes mover y agrandar.

## ESCENA 13 · Bonus: filtra antes de agrupar
[VISUAL] Celda nueva: df[df["Mes"] == "Feb"].groupby("Región")["Monto"].sum() → Centro 1510 · Norte 3635 · Sur 1070.
[CODIGO] df[df["Mes"] == "Feb"].groupby("Región")["Monto"].sum()
[VOZ]
Un bonus. ¿Y si solo quieres febrero? En pandas, filtras poniendo la condición entre corchetes: d f, y entre corchetes, la columna mes igual a Feb. Con doble signo igual, como vimos en el video de condicionales. Después agrupas igual que antes. Resultado: en febrero, Norte vendió tres mil seiscientos treinta y cinco, Centro mil quinientos diez, y Sur mil setenta. Es el mismo filtro que hicimos con AGRUPARPOR, escrito en Python.

## ESCENA 14 · Las bibliotecas incluidas
[VISUAL] Cuadrícula: pandas · NumPy · Matplotlib · seaborn · statsmodels ("importadas por defecto") + "y unas 30 más: scikit-learn, SciPy…".
[VOZ]
¿Y qué más puedes hacer? Python en Excel trae ya importadas cinco bibliotecas: pandas para los datos, NumPy para los cálculos, Matplotlib y seaborn para los gráficos, y statsmodels para estadística avanzada. Y hay unas treinta más que puedes importar, como scikit-learn, para aprendizaje automático. Es un laboratorio de ciencia de datos completo, dentro de tu hoja.

## ESCENA 15 · El orden de cálculo
[VISUAL] Hoja con flechas: Python calcula fila por fila, de izquierda a derecha y de arriba abajo. La celda de df va arriba a la izquierda; las que la usan, después.
[VOZ]
Un detalle que confunde a muchos: las celdas de Python se calculan en orden, fila por fila, de izquierda a derecha y de arriba hacia abajo. Por eso, la celda donde creas d f tiene que estar antes que las celdas que la usan. Mi consejo: pon la celda de los datos arriba a la izquierda, y tus análisis debajo o a la derecha.

## ESCENA 16 · Los límites
[VISUAL] ListaErrores: "pd.read_csv('C:\\…')" → "No: los datos vienen de la hoja o de Power Query" · "Sin internet" → "No calcula" · "Excel en el celular" → "No disponible".
[VOZ]
Y ahora, los límites, para que no te lleves sorpresas. Uno: Python en Excel no puede leer archivos de tu computador ni conectarse a páginas web. Los datos tienen que estar en la hoja o venir de Power Query. Dos: sin internet no calcula, porque todo pasa en la nube. Y tres: no funciona en las aplicaciones del celular. Si conoces estos límites, no vas a perder tiempo.

## ESCENA 17 · ¿Cuándo usar cada cosa?
[VISUAL] Cuadrícula: "Fórmulas de Excel → cálculos del día a día" · "Python en Excel → estadística y gráficos avanzados en la hoja" · "Python en tu PC → automatizar archivos y carpetas (video de 12 reportes)".
[VOZ]
Entonces, ¿cuándo usar cada cosa? Para los cálculos del día a día, las fórmulas de Excel siguen siendo lo más rápido. Para estadística y gráficos avanzados sin salir de tu hoja, Python en Excel. Y para automatizar archivos y carpetas, como los doce reportes del otro video, Python en tu computador. No compiten: se complementan. Y lo mejor es que todo lo que aprendes en uno, te sirve en los otros: la lógica es la misma.

## ESCENA 18 · Por qué aprenderlo ya
[VISUAL] Titular: "Excel + Python: la combinación que piden las empresas". Frase de urgencia.
[VOZ]
Y piensa en esto: hace unos años, para hacer este análisis necesitabas instalar programas, aprender a usar la terminal, y saber programar bastante. Hoy lo haces en una celda. Las herramientas se volvieron fáciles. Lo que marca la diferencia ahora es quién se anima a usarlas. Y quien domine Excel y Python juntos va a resolver en minutos lo que a otros les toma días. Esa persona puedes ser tú. [serious] Si no lo aprendes ahora, te extingues.

## ESCENA 19 · Resumen y siguiente video
[VISUAL] Resumen3: "Fórmulas > Insertar Python" · "xl() + Ctrl+Entrar" · "describe, groupby y plot". CierreSiguiente: "5 errores de Excel que cometen hasta los expertos".
[VOZ]
En resumen: inserta una celda de Python desde la pestaña Fórmulas, trae tus datos con x l y confirma con Control más Entrar. Y con describe, groupby y plot tienes estadísticas, resúmenes y gráficos en minutos. En el próximo video, el último del año, te muestro cinco errores de Excel que cometen hasta los expertos. Suscríbete para no perdértelo. [excited] El poder de la tecnología te va a cambiar el mundo.
