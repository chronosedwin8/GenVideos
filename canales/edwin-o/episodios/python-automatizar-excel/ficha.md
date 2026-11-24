# Ficha · Automatiza Excel con Python: 12 reportes en segundos

- **Canal:** edwin-o · **Tipo:** tutorial · **Temporada:** 5 · Python práctico · **Publicación:** martes 8 dic 2026, 7:00 a. m.
- **Palabra clave:** automatizar excel con python / pandas excel / crear reportes excel python
- **Programa:** Python 3 + pandas + openpyxl (Windows). Código en `codigo/` (**ejecutado de verdad** el 24 nov 2026).

## Caso actual (verificado)
- Encuesta de desarrolladores de Stack Overflow 2025: el uso de **Python subió 7 puntos porcentuales** en un año (al 57,9 %),
  el mayor salto entre los lenguajes. Fuente: https://stackoverflow.blog/2025/07/29/developers-remain-willing-but-reluctant-to-use-ai-the-2025-developer-survey-results-are-here/
  y https://survey.stackoverflow.co/2025/

## Ejemplo (datos ficticios, generados con `codigo/generar_datos.py`)
- `ventas.xlsx`: 2.400 ventas de noviembre de 2026, 12 sucursales (Bogotá, Medellín, Cali, Barranquilla, CDMX, Monterrey, Guadalajara,
  Puebla, Lima, Arequipa, Santiago, Quito), columnas Fecha · Sucursal · Vendedor · Producto · Cantidad · Monto.
- `codigo/reportes.py` (12 líneas de código) crea un libro por sucursal con hojas **Ventas** y **Resumen** (total por vendedor).
- Salida real (orden alfabético de groupby):
  Arequipa 173 · Barranquilla 226 · Bogotá 193 · CDMX 220 · Cali 192 · Guadalajara 200 · Lima 183 · Medellín 226 · Monterrey 197 · Puebla 199 · Quito 197 · Santiago 194.
  Tiempo medido: ~8 s (incluye el arranque de Python, con el equipo ocupado).
- Resumen de Bogotá: BOG-1 52.100 · BOG-2 46.960 · BOG-3 26.370 · BOG-4 43.610 · **TOTAL 169.040** (con `codigo/reportes_pro.py`).

## Errores comunes (verificados)
- `UnicodeEncodeError` al imprimir símbolos como ✓ en la consola de Windows (cp1252): **pasó al preparar el video** → usar texto normal.
- `PermissionError`: el archivo de destino está abierto en Excel → cerrarlo.
- `'pip' no se reconoce…`: Python no quedó en el PATH → reinstalar marcando "Add python.exe to PATH" o usar `py -m pip install …`.
- `ModuleNotFoundError: No module named 'openpyxl'` → `pip install openpyxl`.

## Aporte de Edwin (confirmar)
- En el software que ha desarrollado para empresas (inventarios), la petición más repetida es "un reporte por sede, cada semana".

## SEO
Título: **Automatiza Excel con Python: 12 reportes en segundos (pandas, paso a paso)**
