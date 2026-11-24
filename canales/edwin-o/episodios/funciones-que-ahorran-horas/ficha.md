# Ficha · 7 funciones de Excel que te ahorran horas

- **Canal:** edwin-o · **Tipo:** lista · **Temporada:** 7 · Listas que enganchan · **Publicación:** jueves 3 dic 2026, 7:00 a. m.
- **Palabra clave:** funciones de excel / funciones nuevas de excel / buscarx filtrar unicos
- **Programa:** Excel para Microsoft 365 en español (separador `;`).

## Caso actual (verificado)
- Excel cumplió **40 años el 30 de septiembre de 2025** (la versión 1 salió para Mac en 1985).
  Fuente: Microsoft 365 Insider Blog, "Microsoft Excel turns 40!" (https://techcommunity.microsoft.com/blog/microsoft365insiderblog/microsoft-excel-turns-40/4455409)
- En sus últimas versiones llegaron las **matrices dinámicas**: una fórmula devuelve varios resultados que se "desbordan" a las celdas vecinas.
  14 funciones de texto y matrices (DIVIDIRTEXTO, APILARV, TOMAR…) se anunciaron en 2022.
  Fuente: Excel Blog, "Announcing new text and array functions" (https://techcommunity.microsoft.com/blog/excelblog/announcing-new-text-and-array-functions/3186066)

## Versiones
- BUSCARX, FILTRAR, UNICOS, ORDENARPOR y LET: Excel 2021, Excel 2024 y Microsoft 365.
- DIVIDIRTEXTO, APILARV y TOMAR: Excel 2024 y Microsoft 365 (página de DIVIDIRTEXTO: https://support.microsoft.com/en-US/excel/functions/textsplit-function).
- Si el desbordamiento choca con datos: error **#¡DESBORDAMIENTO!**.

## Datos del video (verificados con Python)
Hoja "Ventas" A2:D9 (Vendedor · Región · Producto · Monto):
Ana Norte Laptop 1.200 · Luis Sur Mouse 35 · Marta Norte Monitor 310 · Pedro Centro Laptop 1.150 ·
Ana Sur Teclado 60 · Sofía Centro Monitor 295 · Luis Norte Laptop 1.250 · Marta Sur Mouse 40.

| # | Función | Fórmula | Resultado |
|---|---|---|---|
| 1 | BUSCARX | `=BUSCARX(F2;A2:A6;C2:C6;"No existe")` (tabla Precios P-101…P-105) | P-103 → 310; P-999 → No existe |
| 2 | FILTRAR | `=FILTRAR(A2:D9;B2:B9="Norte";"Sin datos")` | Ana Laptop 1.200 · Marta Monitor 310 · Luis Laptop 1.250 |
| 3 | UNICOS | `=UNICOS(A2:A9)` | Ana, Luis, Marta, Pedro, Sofía |
| 4 | ORDENARPOR + TOMAR | `=TOMAR(ORDENARPOR(A2:D9;D2:D9;-1);3)` | Luis 1.250 · Ana 1.200 · Pedro 1.150 |
| 5 | DIVIDIRTEXTO | `=DIVIDIRTEXTO(A2;"-")` con "2026-COL-0457" | 2026 · COL · 0457 |
| 6 | APILARV | `=APILARV(Enero!A2:D4;Febrero!A2:D4)` | una sola tabla |
| 7 | LET | `=LET(precio;BUSCARX(F2;A2:A6;C2:C6);SI(precio>1000;precio*90%;precio))` | P-101 (1.200) → 1.080 |

Sintaxis (Microsoft Support, es-es): BUSCARX(valor_buscado; matriz_buscada; matriz_devuelta; [si_no_se_encuentra]; …) ·
FILTRAR(matriz; incluir; [si_vacío]) · ORDENARPOR(matriz; por_matriz1; [orden1]; …) con -1 = descendente ·
DIVIDIRTEXTO(texto; delimitador_col; …) · APILARV(matriz1; [matriz2]; …) · TOMAR(matriz; filas; [columnas]) · LET(nombre1; valor1; cálculo).

## Aporte de Edwin (confirmar)
- En sus talleres, la función que más sorprende a docentes y auxiliares administrativos es FILTRAR, porque reemplaza el "filtrar, copiar y pegar" de cada semana.

## SEO
Título: **7 funciones de Excel que te ahorran horas (y casi nadie usa)**
