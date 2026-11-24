# Ficha · Fórmulas de Excel con IA que sí funcionan

- **Canal:** edwin-o · **Tipo:** tutorial · **Temporada:** 4 · Excel con IA · **Publicación:** martes 1 dic 2026, 7:00 a. m.
- **Palabra clave:** formulas de excel con chatgpt / ia para excel / prompt para formulas de excel
- **Programa:** Excel para Microsoft 365 en español (separador `;`). Sirve con cualquier asistente: ChatGPT, Claude, Gemini o Copilot.

## Caso actual (verificado)
- Microsoft retiró la función **=COPILOT()** de Excel el **14 de septiembre de 2026**. Estuvo un año en vista previa (desde agosto de 2025)
  y nunca llegó a disponibilidad general. Las celdas que la usaban conservan el último resultado, pero al recalcular muestran **#¿NOMBRE?**.
  Microsoft recomienda usar el panel de Copilot en su lugar.
  Fuentes: Microsoft Support, *COPILOT function* (https://support.microsoft.com/en-us/office/copilot-function-5849821b-755d-4030-a38b-9e20be0cbf62) ·
  Centro de mensajes MC1454373, 13 ago 2026 (https://mc.merill.net/message/MC1454373) ·
  The Register, 17 ago 2026 (https://www.theregister.com/ai-and-ml/2026/08/17/excels-copilot-function-is-headed-for-the-recycle-bin/5288327)
- Lección: usa la IA para **escribir fórmulas nativas** (que funcionan siempre y sin internet), no para que la hoja dependa de ella.

## Ejemplo del video (verificado con Python)
Hoja "Comisiones": A Vendedor · B Mes · C Ventas · D Comisión. Regla: menos de 1.000 → 0 %; desde 1.000 → 3 %; desde 5.000 → 5 %.

| Ventas | Prompt vago `=SI(C2>5000;C2*0,05;SI(C2>1000;C2*0,03;0))` | Correcta | 
|---|---|---|
| 999 | 0 | 0 |
| 1.000 | **0** ✗ | 30 |
| 4.999 | 149,97 | 149,97 |
| 5.000 | **150** ✗ | 250 |
| 7.200 | 360 | 360 |

- Falla 1 (idioma): la IA suele responder en inglés con comas `=IF(C2>5000,C2*0.05,…)` → en Excel en español da error.
- Falla 2 (límites): usa `>` en vez de `>=`, y justo los casos frontera (1.000 y 5.000) salen mal sin que se note.
- Correcta: `=SI.CONJUNTO(C2>=5000;C2*5%;C2>=1000;C2*3%;VERDADERO;0)`
- Nivel pro (tasas en celdas): tabla F2:G4 = 0 → 0 %, 1.000 → 3 %, 5.000 → 5 %;
  `=C2*BUSCARX(C2;$F$2:$F$4;$G$2:$G$4;0;-1)` (modo de coincidencia -1 = exacta o el siguiente elemento menor).
  Fuente BUSCARX: https://support.microsoft.com/es-es/office/funci%C3%B3n-buscarx-b7fd680e-6d10-43e6-84f9-88eae8bf5929

## El prompt de 5 partes (método del video)
1. **Tu Excel:** versión, idioma y separador ("Excel 365 en español, separador punto y coma").
2. **Dónde están los datos:** rango, encabezados, columna de cada dato.
3. **La regla exacta, con los límites:** "desde 5.000 *inclusive*".
4. **Un ejemplo con el resultado esperado:** "si C2 = 5.000, la comisión es 250".
5. **Pide explicación y casos de prueba.**

## Errores comunes
- Pegar la fórmula sin probar los casos frontera.
- No decir el idioma → funciones en inglés (IF, VLOOKUP) y comas.
- Aceptar funciones que tu versión no tiene (p. ej. =COPILOT, que ya no existe).
- Pegar datos confidenciales (nombres, cédulas, salarios) en una IA pública: usa datos de ejemplo.

## Aporte de Edwin (confirmar)
- En sus clases con docentes y personal administrativo, el error que más ve es pedir "hazme una fórmula" sin decir dónde están los datos.

## SEO
Título: **Cómo pedirle a la IA fórmulas de Excel que SÍ funcionan (ChatGPT, Copilot, Claude)**
Blog relacionado: https://www.edwinortiz.net/excel/
