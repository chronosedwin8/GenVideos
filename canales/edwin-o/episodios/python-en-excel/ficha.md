# Ficha · Python en Excel: tu primer análisis con =PY()

- **Canal:** edwin-o · **Tipo:** tutorial · **Temporada:** 4 · Excel con IA · **Publicación:** martes 22 dic 2026, 7:00 a. m.
- **Palabra clave:** python en excel / =PY excel / python in excel tutorial español

## Hechos verificados (Microsoft Support)
- Insertar: pestaña **Fórmulas > Insertar Python** (es-es), o escribir `=PY(`. https://support.microsoft.com/es-es/office/introducci%C3%B3n-a-python-en-excel-a33fbcbe-065b-41d3-82cf-23d05397f53d
- Confirmar: **Ctrl+Entrar** ("Confirma las fórmulas de Python en una celda de Python"); Enter crea líneas nuevas.
  https://support.microsoft.com/es-es/office/python-in-excel-keyboard-shortcuts-62e3e455-c233-443d-87bb-d7456988c904
- `xl("Tabla[#All]", headers=True)` trae rangos, tablas, consultas y nombres. https://support.microsoft.com/office/get-started-with-python-in-excel-a33fbcbe-065b-41d3-82cf-23d05397f53d
- Salida: **objeto de Python** (tarjeta) o **valores de Excel** (se desborda). El índice se incluye si no es numérico (p. ej. `describe()` o `groupby`).
  https://support.microsoft.com/en-us/topic/a10495b2-8372-4f0f-9179-32771fe0dc04
- Gráficos: devuelven un **objeto de imagen**; "Display Plot over Cells" (Ctrl+Alt+Shift+C) crea una copia flotante redimensionable.
  https://support.microsoft.com/en-us/office/create-python-in-excel-plots-and-charts-798b5e8d-ce45-4451-8da3-f269cdad5cff
- Se ejecuta en **Microsoft Cloud** con bibliotecas de **Anaconda**; importadas por defecto: pandas, NumPy, Matplotlib, seaborn, statsmodels.
  Los datos deben venir de la hoja o de Power Query; `pandas.read_csv`/`read_excel` no son compatibles; sin acceso a archivos locales ni a la red.
  https://support.microsoft.com/en-us/office/python-in-excel-open-source-libraries-c817c897-41db-40a1-b9f3-d5ffe6d1bf3e
- Orden de cálculo: **por filas** (de la columna A a la XFD y luego la fila siguiente).
- Disponibilidad: Empresa (Windows 2408+, web, Mac 16.96+); **Personal y Familia: vista previa** (web y Windows Canal actual 2405+);
  no en iPad/iPhone/Android. https://support.microsoft.com/en-us/office/python-in-excel-availability-781383e6-86b9-4156-84fb-93e786f7cab0

## Ejemplo (mismos datos de AGRUPARPOR; `codigo/ejemplo.py` reproduce los resultados con pandas)
- Tabla **Ventas**: Mes · Región · Producto · Monto (12 filas).
- `df.describe()` → count 12 · mean 910 · std 1092,996299 · min 35 · 25 % 131,25 · 50 % 465 · 75 % 1200 · max 3600.
- `df.groupby("Región")["Monto"].sum()` → Centro 2235 · Norte 6345 · Sur 2340.
- `….plot(kind="bar", title="Ventas por región")` → gráfico de barras (dibujado en el video con el estilo por defecto de matplotlib y los mismos valores).

## Aporte de Edwin (confirmar)
- Opinión: es la mejor puerta de entrada a Python para quien ya sabe Excel, porque no hay que instalar nada.

## SEO
Título: **Python en Excel: tu primer análisis con =PY() (sin instalar nada)**
