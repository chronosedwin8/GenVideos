# Ficha · La varita mágica de Excel: IA para combinar datos como un profesional

- **Canal:** edwin-o · **Tipo:** tutorial · **Temporada:** Excel con IA · **Publicación:** jueves 7 ene 2027, 7:00 a. m.
- **Palabra clave:** combinar datos excel con ia / unir tablas excel / chatgpt excel combinar hojas / apilarv buscarx
- **Programa:** Excel para Microsoft 365 en español. Separador `;`.
- Historia: "el cliente fantasma" (C-06 aparece en las ventas pero no existe en Clientes) y el espacio escondido en "C-02 ".

## Datos (mismos del duelo, `codigo/ventas.xlsx`)
Ene A1:C7: P-101 C-01 1200 · P-102 C-03 450 · P-103 C-02 980 · P-104 C-05 300 · P-105 C-01 760 · P-106 C-04 1500 (total 5.190)
Feb A1:C7: P-201 "C-02 " 640 · P-202 C-06 820 · P-203 C-03 1100 · P-204 C-01 390 · P-205 C-05 2100 · P-206 C-04 530 (total 5.580)
Clientes A1:C6: C-01 Ana Torres Bogotá · C-02 Luis Gómez Medellín · C-03 Sara Ruiz Cali · C-04 Juan Pérez Bogotá · C-05 Marta Díaz Medellín

## Fórmulas (probadas en Excel 365 real por COM el 25 nov 2026)
- La que dio la IA (ChatGPT, mismo resultado que la de Claude):
  `=LET(datos;APILARV(Ene!A2:C7;Feb!A2:C7);ids;ESPACIOS(ELEGIRCOLS(datos;2));APILARH(ELEGIRCOLS(datos;1);ids;ELEGIRCOLS(datos;3);BUSCARX(ids;Clientes!A2:A6;Clientes!B2:B6;"No encontrado");BUSCARX(ids;Clientes!A2:A6;Clientes!C2:C6;"No encontrado")))`
  → A2:E13, 12 filas; P-202 C-06 → "No encontrado"; P-201 → Luis Gómez Medellín (gracias a ESPACIOS).
- `=AGRUPARPOR(ELEGIRCOLS(A2#;5);ELEGIRCOLS(A2#;3);SUMA)` → Bogotá 4.380 · Cali 1.550 · Medellín 4.020 · No encontrado 820 · Total 10.770.
- Sin ESPACIOS, Medellín daría 3.380 (pierde los 640 de P-201).
- Python (`codigo/varita.py`, ejecutado): Bogotá 4380 · Cali 1550 · Medellín 4020 · NaN 820.

## Caso actual: la IA ya vive dentro de Excel
- Copilot en Excel con modo agente: disponible para todos desde el 22 abr 2026, también en Personal y Familia (verificado en el lote anterior).
- ChatGPT para Excel: beta 5 mar 2026, disponible para todos los planes desde el 5 may 2026; "Before making changes to a workbook,
  ChatGPT asks for permission". https://openai.com/index/chatgpt-for-excel/ · https://help.openai.com/en/articles/20001063-chatgpt-for-excel-and-google-sheets
- Claude para Excel: complemento en Microsoft Marketplace para planes Pro, Max, Team y Enterprise (Pro desde ene 2026).
  https://marketplace.microsoft.com/en-us/product/WA200009404
- Power Query: Combinar consultas y Anexar consultas (etiquetas verificadas en el Power Query instalado).

## Aporte de Edwin (confirmar)
- En sus capacitaciones, el error número uno al cruzar tablas es el #N/D por un espacio invisible en el código.

## SEO
Título: **Combina datos en Excel con IA como un profesional (la varita mágica)**
