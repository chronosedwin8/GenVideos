# Ficha · ChatGPT vs. Claude: duelo de combinación de datos en Excel

- **Canal:** edwin-o · **Tipo:** comparativa · **Temporada:** Excel con IA · **Publicación:** martes 12 ene 2027, 7:00 a. m.
- **Palabra clave:** chatgpt vs claude excel / cuál ia es mejor para excel / chatgpt o claude para fórmulas
- **Prueba real hecha el 25 nov 2026** en el Chrome de Edwin, con sus cuentas: chatgpt.com (plan **gratuito**, modelo por defecto) y
  claude.ai (plan **Pro**, **Opus 5.5**, esfuerzo alto). Chats nuevos, el mismo mensaje exacto (`codigo/prompt.txt` y `codigo/prompt2.txt`).
- Todo lo que respondieron se probó: fórmulas en **Excel 365 real** (COM, `codigo/probar_excel.py`) y código en **Python 3.14 + pandas 2.3.3**.

## Resultados (verificados)
| Ronda | ChatGPT (gratis) | Claude (Pro, Opus 5.5) | Punto |
|---|---|---|---|
| 1. Fórmula en A2 | `LET+APILARV+ESPACIOS+BUSCARX+APILARH` → **funciona** (A2:E13). Dijo que llegaba "hasta E14" (error menor: es E13) | Misma lógica con LET más legible → **funciona** (A2:E13) | Empate |
| 2. Problemas en los datos | Detectó "C-02 " con espacio y C-06 inexistente; recomienda registrar C-06 | Detectó los dos + avisó de espacios duros (CARACTER(160)), montos guardados como texto y rangos fijos (Ctrl+T) | Claude |
| 3. Total por ciudad | Bogotá 4.380 · Medellín 4.020 · Cali 1.550 · 820 sin ciudad · total 10.770 (correcto). Resumen con SUMAR.SI y ciudades escritas a mano | Mismos números (correcto) + "sin limpiar el espacio, Medellín daría 3.380". Resumen con AGRUPARPOR dinámico (probado: correcto) | Empate |
| 4. Código Python | **Falló** al ejecutarlo: `KeyError: 'Cliente'`. Al final de su respuesta avisó del error y dio la corrección; con ella funciona | Lo probó antes de responder (creó un ventas.xlsx); **funcionó a la primera**; limpia espacios duros y convierte montos a número | Claude |
| 5. ¿Quién compró más en febrero? | Marta Díaz, 2.100 vs 300 → +600 % (correcto), con fórmula y conclusión comercial | Marta Díaz, +600 % (correcto), con la aclaración de que C-06 no entra | Empate |
| Rapidez y presentación | Respondió en segundos, con tablas muy visuales | Tardó más (razona y ejecuta el código) | ChatGPT |
Marcador: **Claude 2 · ChatGPT 1 · 3 empates**. Una sola prueba con planes distintos: no es un estudio científico.

## Para el guion
- Ambas encontraron al "cliente fantasma" C-06 y el espacio de "C-02 ".
- ChatGPT tuvo un error de código, pero lo reconoció en la misma respuesta. Claude evitó el error ejecutando su código antes.
- Conclusión: la mejor IA es la que verificas; pídele que pruebe su código y comprueba los totales.

## Aporte de Edwin (confirmar)
- Su criterio de profe: no gana la respuesta más bonita, gana la que puedes comprobar.

## SEO
Título: **ChatGPT vs Claude en Excel: los puse a combinar datos (y probé todo)**
