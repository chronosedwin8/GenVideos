# Ficha · 5 errores de Excel que cometen hasta los expertos

- **Canal:** edwin-o · **Tipo:** lista · **Temporada:** 7 · Listas que enganchan · **Publicación:** jueves 24 dic 2026, 7:00 a. m.
- **Palabra clave:** errores comunes en excel / errores de excel / buscarv falso / numeros como texto excel

## Caso actual
- Encuesta de DOSS (empresa de software de operaciones) a 1.003 profesionales de operaciones en EE. UU.: un error significativo en una hoja de cálculo
  cuesta en promedio **4.315 dólares**; se pierden **3,6 horas a la semana** corrigiendo hojas; el **53 %** enfrenta errores cada semana;
  **2 de cada 5** incidentes se corrigen sin reportarlos. Es una encuesta de un proveedor (se dice así en el video).
  Fuente: https://careers.doss.com/research/spreadsheet-error-costs-operations-thousands

## Los 5 errores (verificados con Python)
1. **Números guardados como texto:** D2:D6 = 1.200 · 35 · 310 · "1150" (texto) · 60 → `=SUMA(D2:D6)` da **1.605** en vez de **2.755**.
   Solución: triángulo verde → Convertir en número (o multiplicar por 1).
2. **Referencia sin $:** IVA en E1 (19 %). `=B2*(1+E1)` arrastrada → B3*(1+E2), E2 vacía → 250, 80, 40 sin IVA (bien: 119 · 297,5 · 95,2 · 47,6).
   Solución: `=B2*(1+$E$1)` (F4).
3. **BUSCARV sin FALSO:** tabla ordenada P-101…P-105 (1.200, 35, 310, 60, 85). `=BUSCARV("P-999";A2:C6;3)` devuelve **85** (coincidencia aproximada:
   el último código menor o igual). Con FALSO → `#N/A`. Mejor: BUSCARX (coincidencia exacta por defecto).
4. **El formato engaña:** tres celdas con 10,4 y formato sin decimales se ven como 10; la suma 31,2 se ve como 31 → "10 + 10 + 10 = 31".
   Solución: mostrar decimales o redondear de verdad con `=REDONDEAR(B2;0)`.
5. **Celdas combinadas:** impiden ordenar y filtrar bien. Solución: Formato de celdas > Alineación > Horizontal: **Centrar en la selección**.
- Bonus: valores fijos dentro de las fórmulas (`=B2*1,19`) → ponerlos en una celda.

## Aporte de Edwin (confirmar)
- Lo que más encuentra al revisar archivos de estudiantes y empresas: números guardados como texto (sobre todo al importar de otros sistemas).

## SEO
Título: **5 errores de Excel que cometen hasta los expertos (y cómo evitarlos)**
