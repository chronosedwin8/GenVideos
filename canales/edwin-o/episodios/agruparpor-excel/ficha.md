# Ficha · AGRUPARPOR y PIVOTARPOR: resúmenes sin tablas dinámicas

- **Canal:** edwin-o · **Tipo:** tutorial · **Temporada:** 3 · Gráficos y análisis · **Publicación:** martes 15 dic 2026, 7:00 a. m.
- **Palabra clave:** agruparpor excel / groupby excel / pivotarpor / resumen sin tabla dinámica
- **Programa:** Excel para Microsoft 365 en español (canal actual). Separador `;`.

## Fuentes
- Sintaxis oficial (es-es): `AGRUPARPOR(campos_fila;valores;función;[encabezados_campo];[profundidad_total];[criterio_ordenación];[matriz_filtro];[relación_campo])`
  encabezados: 0 No · 1 Sí y no mostrar · 2 No pero generar · **3 Sí y mostrar**. profundidad_total: 0 sin totales · 1 totales generales · 2 generales y subtotales
  · -1/-2 arriba. criterio_ordenación: número de columna; **negativo = descendente**. matriz_filtro: columna de VERDADERO/FALSO.
  https://support.microsoft.com/es-es/office/funci%C3%B3n-agruparpor-5e08ae8c-6800-4b72-b623-c41773611505
- PIVOTARPOR: `PIVOTARPOR(campos_fila;campos_col;valores;función;…)`. https://support.microsoft.com/es-ES/Excel/functions/pivotby-function
- Disponibles para todos en el Canal actual de Microsoft 365 desde el 25 sep 2024 (Excel Blog):
  https://techcommunity.microsoft.com/blog/excelblog/new-aggregation-functions-groupby-and-pivotby/3965765
- **Caso actual:** Journal of Accountancy (AICPA), junio 2025: "Say bye to PivotTables with Excel's new PIVOTBY function".
  https://www.journalofaccountancy.com/issues/2025/jun/say-bye-to-pivottables-with-excels-new-pivotby-function/

## Datos del video (verificados con pandas)
A Mes · B Región · C Producto · D Monto (filas 2-13):
Ene Norte Laptop 2.400 · Ene Sur Mouse 70 · Ene Centro Monitor 620 · Ene Norte Monitor 310 · Ene Sur Laptop 1.200 · Ene Centro Mouse 105 ·
Feb Norte Laptop 3.600 · Feb Sur Monitor 930 · Feb Centro Laptop 1.200 · Feb Norte Mouse 35 · Feb Sur Mouse 140 · Feb Centro Monitor 310.

| Fórmula | Resultado |
|---|---|
| `=AGRUPARPOR(B2:B13;D2:D13;SUMA)` | Centro 2.235 · Norte 6.345 · Sur 2.340 · Total 10.920 |
| `=AGRUPARPOR(B2:B13;D2:D13;SUMA;;;-2)` | Norte 6.345 · Sur 2.340 · Centro 2.235 · Total 10.920 |
| `=AGRUPARPOR(B1:B13;D1:D13;SUMA;3)` | encabezados Región · Monto |
| `=AGRUPARPOR(B2:B13;D2:D13;SUMA;;;;A2:A13="Feb")` | Centro 1.510 · Norte 3.635 · Sur 1.070 · Total 6.215 |
| D8 3.600 → 4.000 | Norte 6.745 · Total 11.320 |
| `=PIVOTARPOR(B2:B13;A2:A13;D2:D13;SUMA)` | Centro 725/1.510/2.235 · Norte 2.710/3.635/6.345 · Sur 1.270/1.070/2.340 · Total 4.705/6.215/10.920 |

## Aporte de Edwin (confirmar)
- La queja número uno en sus capacitaciones: "cambié los datos y la tabla dinámica no cambió" (hay que darle Actualizar).

## SEO
Título: **AGRUPARPOR en Excel: resúmenes como tabla dinámica… con UNA fórmula**
