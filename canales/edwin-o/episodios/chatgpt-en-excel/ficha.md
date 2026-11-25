# Ficha · ChatGPT en Excel: automatiza tus hojas de cálculo

- **Canal:** edwin-o · **Tipo:** tutorial · **Temporada:** Excel con IA · **Publicación:** jueves 21 ene 2027, 7:00 a. m.
- **Palabra clave:** chatgpt en excel / chatgpt para excel complemento / automatizar excel con chatgpt / chatgpt excel gratis
- **Programa:** Excel para Microsoft 365 (escritorio o web) + complemento "ChatGPT". La interfaz del complemento es una **recreación**
  animada (no se ejecutó el complemento); los resultados mostrados son los cálculos correctos, verificados con pandas.

## Fuentes oficiales (OpenAI)
- Anuncio, 5 mar 2026: "Introducing ChatGPT for Excel…" https://openai.com/index/chatgpt-for-excel/ — beta el 5 mar 2026 (GPT-5.4);
  22 abr 2026 beta en Google Sheets; **5 may 2026 disponible para todos los planes** (GPT-5.5). "Before making changes to a workbook,
  ChatGPT asks for permission, so users can review each step and undo edits if needed." "Complex formulas or edge cases may still require
  manual refinement."
- Centro de ayuda: https://help.openai.com/en/articles/20001063-chatgpt-for-excel-and-google-sheets
  - Planes: Free, Go, Plus, Pro, Business, Enterprise, Edu y K-12. "Free and Go include limited usage access."
  - Instalar: Excel (escritorio o web) → Inicio → Complementos → buscar "ChatGPT" → agregar → abrirlo desde la cinta → iniciar sesión.
  - Puede crear, actualizar y explicar hojas; limpiar hojas desordenadas (formato, etiquetas, duplicados, fórmulas rotas); escenarios y
    tablas de sensibilidad; mencionar hojas con @; buscar en la web.
  - "Review formulas, citations, and changed cells before relying on the output." Para trabajo importante, duplicar el archivo antes.
  - Límites: los chats del complemento no se sincronizan con el historial ni usan la memoria; VBA y macros "may not be fully supported".
  - Privacidad: ChatGPT procesa el prompt y el contexto de la hoja; según los términos del Marketplace, Microsoft puede leer el contenido.

## Demo (verificada con pandas)
Hoja Gastos (A1:D9): 05/01 Papelería Oficina 120.000 · 07/01 Taxi a cliente Transporte 45.000 · 07/01 Taxi a cliente Transporte 45.000 (duplicado) ·
10/01 Almuerzo de equipo Alimentación 180.000 · 12/01 Tóner impresora Oficina 210.000 · 15/01 Bus intermunicipal Transporte 60.000 ·
18/01 Café reunión Alimentación 35.000 · 20/01 Mouse inalámbrico Tecnología 75.000. Total con duplicado 770.000.
- Sin duplicado: 7 filas, total 725.000.
- Por categoría: Oficina 330.000 (45,5 %) · Alimentación 215.000 (29,7 %) · Transporte 105.000 (14,5 %) · Tecnología 75.000 (10,3 %).
- `=SI(D2>100000;"Revisar";"OK")` → Revisar: Papelería, Almuerzo de equipo, Tóner impresora.
- Escenario transporte +10 %: 115.500 → total 735.500.

## Aporte de Edwin (confirmar)
- Como Microsoft Innovative Educator Expert, lo que más le preguntan los docentes es si la IA dentro de Excel es segura con sus datos.

## SEO
Título: **ChatGPT en Excel: cómo instalarlo y automatizar tus hojas de cálculo (gratis)**
