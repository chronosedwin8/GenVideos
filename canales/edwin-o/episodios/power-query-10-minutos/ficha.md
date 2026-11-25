# Ficha · Domina Power Query en 10 minutos (10 movimientos)

- **Canal:** edwin-o · **Tipo:** tutorial · **Temporada:** Power Query y datos · **Publicación:** martes 19 ene 2027, 7:00 a. m.
- **Palabra clave:** power query tutorial / power query desde cero / anular dinamización de columnas / combinar consultas excel
- **Programa:** Excel para Microsoft 365 en español (Windows). Editor recreado en Remotion.

## Fuentes
- Etiquetas en español tomadas de los recursos del Power Query instalado en el equipo de Edwin (Excel 365 es-es 16.0.20625, 25 nov 2026):
  "Desde tabla o rango", "Rellenar" → "Abajo" ("Rellenar hacia abajo"), "Anular dinamización de otras columnas", "Atributo", "Tipo de datos",
  "Dividir columna" → "Por delimitador", "Columna personalizada", "Agregar columna", "Agrupar por", "Suma", "Combinar consultas",
  "Externa izquierda", "Cerrar y cargar", "Cerrar y cargar en...", "Actualizar todo", "Columna a partir de los ejemplos", "Pasos aplicados".
- Combinar consultas (es-es), tipos de combinación: https://support.microsoft.com/es-es/office/combinar-consultas-power-query-fd157620-5470-4c0f-b132-7ca2616d17f9
- Anular dinamización: https://support.microsoft.com/es-es/office/0f7bad4b-9ea1-49c1-9d95-f588221c7098
- **Caso actual:** Microsoft estrena un nuevo cuadro "Obtener datos" (versión preliminar) en Excel para Windows desde la versión 2510
  (fin de 2025), según "Acerca de Power Query en Excel": https://support.microsoft.com/es-es/office/acerca-de-power-query-en-excel-7104fbee-9e62-4cb9-a02e-5bfb1a6c536a

## Datos (verificados con pandas)
Tabla Ventas (meses en columnas): Región | Vendedor | Ene | Feb | Mar
Norte Ana Torres 1200 1350 1500 · (vacío) Luis Gómez 980 1100 900 · Sur Sara Ruiz 450 700 820 · (vacío) Juan Pérez 1500 1250 1600 ·
Centro Marta Díaz 300 2100 1900. Tabla Metas: Norte 7000 · Sur 6500 · Centro 4000.

| Movimiento | Resultado |
|---|---|
| 2. Rellenar → Abajo (Región) | Luis Gómez → Norte · Juan Pérez → Sur |
| 3. Anular dinamización de otras columnas (Región, Vendedor) | 15 filas: Atributo → Mes, Valor → Monto |
| 5. Dividir Vendedor por espacio (más a la izquierda) | Nombre · Apellido |
| 6. Columna personalizada `[Monto] * 0.05` | Comisión: Ana Ene 60 · Feb 67,5 · Mar 75 … total 882,5 |
| 7. Agrupar por Región (Suma de Monto), en una consulta Referencia | Norte 7.030 · Sur 6.320 · Centro 4.300 (total 17.650) |
| 8. Combinar consultas con Metas (Externa izquierda) | Meta: 7.000 · 6.500 · 4.000 |
| 9. Columna personalizada `[Monto] / [Meta]` | Cumplimiento 100,4 % · 97,2 % · 107,5 % |
| 10. Marta Mar 1900 → 2400 + Actualizar todo | Centro 4.800 → 120 % |
Por mes: Ene 4.430 · Feb 6.500 · Mar 6.720.

## Aporte de Edwin (confirmar)
- En las empresas donde capacita, el formato que más encuentra es "meses en columnas", el peor para analizar.

## SEO
Título: **Domina Power Query en 10 minutos: 10 movimientos que usarás toda la vida**
