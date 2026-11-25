# Ficha · ¿Qué es Power Query y para qué sirve?

- **Canal:** edwin-o · **Tipo:** tutorial (concepto + demo) · **Temporada:** Power Query y datos · **Publicación:** martes 5 ene 2027, 7:00 a. m.
- **Palabra clave:** qué es power query / power query excel / para qué sirve power query / limpiar datos en excel
- **Programa:** Excel para Microsoft 365 en español (Windows). El editor se recrea en Remotion.

## Fuentes
- Acerca de Power Query en Excel (es-es): disponible en Excel para Windows, Excel para Mac y Excel para la Web; Microsoft 365, 2024, 2021,
  2019 y 2016 (en Excel 2010/2013 era un complemento, ya obsoleto). En Mac: Microsoft 365 (no Excel 2016/2019 para Mac). En 2025 Excel para la
  Web ganó la actualización de consultas con orígenes autenticados.
  https://support.microsoft.com/es-es/office/acerca-de-power-query-en-excel-7104fbee-9e62-4cb9-a02e-5bfb1a6c536a
- Qué es Power Query (Learn): el mismo motor está en Excel, Power BI, Fabric y otros productos de Microsoft.
  https://learn.microsoft.com/es-es/power-query/power-query-what-is-power-query
- **Etiquetas de la interfaz en español:** extraídas de los recursos de idioma del Power Query instalado (Excel 365 es-es, versión
  16.0.20625) en el equipo de Edwin el 25 nov 2026: "Desde tabla o rango", "Editor de Power Query", "Quitar filas", "Quitar filas en blanco",
  "Quitar duplicados", "Recortar", "Poner En Mayúsculas Cada Palabra", "Dividir columna", "Por delimitador", "Tipo de datos",
  "Pasos aplicados", "Cerrar y cargar", "Actualizar todo", "Desde una carpeta", "Combinar consultas", "Anexar consultas".
- **Caso actual:** Excel para la Web ya actualiza consultas de Power Query con orígenes autenticados (2025, página de Microsoft de arriba);
  el mismo Power Query de Excel es el de Power BI → saberlo es una habilidad de analista de datos.

## Datos (verificados con pandas)
Exportación del sistema (A1:D9): Fecha | Vendedor | Producto - Región | Monto
02/02/2026 "  ana torres" Laptop - Norte 1.200 · 02/02/2026 "LUIS GÓMEZ " Mouse - Sur 70 · 03/02/2026 sara ruiz Monitor - Centro 620 ·
02/02/2026 "  ana torres" Laptop - Norte 1.200 (duplicado) · (fila en blanco) · 04/02/2026 juan pérez Laptop - Sur 1.200 ·
05/02/2026 "Marta Díaz  " Teclado - Norte 85 · 05/02/2026 luis gómez Monitor - Norte 310
Resultado (6 filas, total 3.485): Ana Torres Laptop Norte 1.200 · Luis Gómez Mouse Sur 70 · Sara Ruiz Monitor Centro 620 ·
Juan Pérez Laptop Sur 1.200 · Marta Díaz Teclado Norte 85 · Luis Gómez Monitor Norte 310.
Por región: Centro 620 · Norte 1.595 · Sur 1.270.
Al agregar 2 filas nuevas ("  sara ruiz" Mouse - Centro 35 y "ANA TORRES" Monitor - Norte 930) y pulsar Actualizar todo: 8 filas, total 4.450.

## Aporte de Edwin (confirmar)
- En sus capacitaciones a secretarias y auxiliares: cada lunes limpian a mano el mismo reporte que exporta el sistema.

## SEO
Título: **¿Qué es Power Query y para qué sirve? Limpia tus datos de Excel en 1 clic**
