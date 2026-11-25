# Ficha · Etiquetas de inventario con QR y código de barras en Excel

- **Canal:** edwin-o · **Tipo:** tutorial · **Temporada:** Excel para la oficina · **Publicación:** jueves 31 dic 2026, 7:00 a. m.
- **Palabra clave:** código qr en excel / código de barras en excel / etiquetas de inventario excel / función imagen excel
- **Programa:** Excel para Microsoft 365 en español (también Excel 2024). Separador `;`.
- Rehace el éxito del canal "Etiquetas para inventario de activos fijos" (28:31, 374 h de visualización en 365 días).

## Fuentes
- Función IMAGEN (es-es): `=IMAGEN(origen; [texto_alternativo]; [dimensiones]; [alto]; [ancho])`. Origen https; formatos BMP, JPG,
  GIF, TIFF, PNG, ICO, WEBP; **las URL que redirigen se bloquean**; dimensiones 0 ajustar · 1 rellenar · 2 original · 3 personalizado.
  Disponible en Microsoft 365 (Windows y Mac), Excel 2024, iPhone y Android; **no** en 2021/2019/2016.
  https://support.microsoft.com/es-es/office/funci%C3%B3n-imagen-7e112975-5e52-4f2a-b9da-1d913d51f5d5
- Excel no tiene una función nativa de QR ni de código de barras: se usa IMAGEN con un servicio que devuelve la imagen.
  QR: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=` (goQR.me, gratis, sin clave).
  Código de barras Code 128: `https://bwipjs-api.metafloor.com/?bcid=code128&text=` (bwip-js).
  Ambos devuelven PNG con HTTP 200 sin redirección (probado el 25 nov 2026).
- Privacidad: el texto codificado viaja al servicio externo → no codificar datos confidenciales (usar fuente o complemento offline).
- Alternativa sin internet: fuente gratuita **Libre Barcode 39** (Google Fonts) + `="*"&A2&"*"` (Code 39 usa * de inicio y fin).
- **Caso actual:** GS1 "Sunrise 2027": el comercio minorista se prepara para leer códigos 2D (QR con GS1 Digital Link y DataMatrix)
  en las cajas para finales de 2027; durante la transición se imprimen ambos (1D y 2D). Declaración de la industria (GS1, jun 2024):
  https://gs1.org/sites/gs1/files/2024-06/global-industry-endorsement-statement-qr-codes-with-gs1-standards.pdf
  y documento GS1 "Retailers migrating to single 2D…" https://ref.gs1.org/docs/2025/Retailers-migrating-to-single-2D-for-private-label-and-in-store-labelled-goods_FINAL_v0.3

## Datos y fórmulas (verificados en Excel 365 real por COM, 25 nov 2026)
Hoja Inventario A1:D7: Código | Producto | Ubicación | Cantidad
INV-001 Laptop Dell · Bodega A · 12 / INV-002 Monitor 24" · Bodega A · 30 / INV-003 Teclado · Bodega B · 45 /
INV-004 Mouse · Bodega B · 60 / INV-005 Silla ergonómica · Oficina 2 · 8 / INV-006 Impresora · Oficina 1 · 3

| Fórmula | Resultado |
|---|---|
| `=URLCODIF(A2&" | "&B2)` | `INV-001%20%7C%20Laptop%20Dell` |
| `=IMAGEN("https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="&URLCODIF(A2&" | "&B2&" | "&C2))` | imagen (TIPO = 128, sin error) |
| `=IMAGEN("https://bwipjs-api.metafloor.com/?bcid=code128&text="&URLCODIF(A2)&"&includetext")` | imagen (sin error) |
| `=IMAGEN("https://example.com/no-existe.png")` | error (ESERROR = VERDADERO) |
| `=AJUSTARFILAS(IMAGEN("…&data="&URLCODIF(A2:A7));3)` | cuadrícula 2×3 de QR (M1:O2) |
| `=BUSCARX(B1;Inventario!A2:A7;Inventario!B2:D7;"No existe")` con B1 = INV-005 | Silla ergonómica · Oficina 2 · 8 |
| ídem con INV-009 | No existe |
Imágenes reales del video: `video/public/edwin-o/etiquetas-qr-excel/` (descargadas de los mismos servicios).

## Aporte de Edwin (confirmar)
- Ha desarrollado software de inventario para empresas y colegios (CV): la etiqueta legible es lo que hace que el inventario funcione.

## SEO
Título: **Cómo crear etiquetas de inventario con código QR y código de barras en Excel (fácil)**
