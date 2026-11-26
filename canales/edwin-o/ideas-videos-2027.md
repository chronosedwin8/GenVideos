# Ideas de videos para Edwin O (análisis del 26 nov 2026)

Fuentes: YouTube Studio (últimos 28 días, 29 oct–25 nov 2026), resumen de YouTube con comentarios,
catálogo completo del canal por la API (418 videos: vistas y comentarios de toda la vida) y novedades de Excel e IA de nov 2026.
**Ninguna de estas ideas está en `backlog.csv`** (que ya tiene 71 temas). Donde una idea se acerca a un tema que ya está, se indica.

## Lo que dicen los datos

| Hallazgo | Dato | Qué hacer |
|---|---|---|
| El canal vive de Google y del buscador | 38,4 % externo + 33 % búsqueda de YouTube; "Gráfico circular" (713 vistas) y "3 gráficos estadísticos" (276 vistas con solo 16 impresiones) llegan desde fuera de YouTube | Títulos que copien la frase exacta que se busca ("Cómo hacer…", "Cómo calcular…") |
| Universitarios y docentes llegan buscando estadística y Word | Tabla de frecuencias, gráficos estadísticos, editor de ecuaciones (CPM $5,98) y papel oficio siguen dando vistas sin promoción | Hacer una serie de **matemáticas y estadística con Excel y Python**: Edwin es licenciado en Matemáticas, y eso lo diferencia de otros canales |
| Los temas de dinero y negocio pagan más | Hosting y dominio gratis: **CPM $50,50**. Correos masivos (34:27): $7,75. Facturas: $6,66 | Más temas de finanzas, inventario, web y automatización |
| Éxitos históricos que no están en el backlog | Seno/coseno 292 K, papel oficio en Word 178 K, hosting gratis 91 K + 35 K (323 comentarios), gráfico que cambia de color 60 K, Excel a PDF 48 K, interés compuesto 32 K, Sarrus 21 K | Hacer versiones nuevas de 8 a 9 min, animadas |
| Lo más comentado: correos masivos | 525 + 161 + 142 comentarios; el resumen de YouTube menciona dudas sobre cómo adaptar macros y descargar archivos | Un video que responda esas dudas y un comentario fijado con el enlace |
| Shorts | IF/ELIF de Python: 969 vistas en 28 días. "Números consecutivos" tiene el mejor CTR (**10 %**) | Cada idea trae su Short |

## Las ideas

### A. Versiones nuevas de éxitos que el backlog no tiene
1. **Cómo imprimir en Excel sin que se corte la hoja (en una página, con títulos que se repiten, en carta u oficio y en PDF)**
   Por qué: "Papel oficio en Word" tiene 178 K vistas y "Convertir Excel a PDF" 48 K. Imprimir es un problema que todos tienen y que nadie enseña.
   Short: "Tu tabla sale en 4 hojas? Arréglalo en 3 clics".
2. **Seno, coseno y tangente en Excel sin equivocarte (el error de los radianes)**
   Por qué: "Seno coseno tangente" tiene 292 K vistas (el 2.º video más visto) y "Graficar varias funciones" 34 K. En Excel, `=SENO(30)` da −0,988 porque trabaja en radianes. Ese error sirve de gancho. Se puede añadir la versión en Python con `math`.
   Short: "Excel dice que SENO(30) = −0,98 😱".
3. **Gráficos que cambian de color solos según el dato (verde si cumple la meta, rojo si no)**
   Por qué: el video de 41 min tiene 60 K vistas. Una versión de 8 min es más fácil de ver hasta el final.
4. **Gráficos de velocímetro, termómetro y anillo de progreso en Excel (KPI para tu dashboard)**
   Por qué: entre el velocímetro (8 K + 5 K), el anillo (6 K) y el termómetro (2,6 K) suman 22 K vistas. Prepara el terreno para el tema 22 del backlog (dashboard).
5. **Resuelve un sistema de ecuaciones 3×3 en Excel y en Python en 1 minuto (MINVERSA, MMULT, NumPy)**
   Por qué: "Método de Sarrus" tiene 21 K vistas y el público son universitarios. Es un tema donde Edwin habla como profesor de matemáticas.
6. **Crea tu página web profesional gratis con IA y publícala sin pagar hosting**
   Por qué: los videos de hosting gratis suman 130 K vistas y 500 comentarios, y tienen el **CPM más alto del canal ($50,50)**. Se puede hacer con Claude Code y un hosting estático gratis, y conecta con el video del 29 dic. Hay que decir la verdad: el dominio propio cuesta unos USD 10 al año.
7. **Interés compuesto y tabla de amortización de un préstamo en Excel (PAGO, PAGOINT, PAGOPRIN)**
   Por qué: "Interés simple y compuesto" tiene 32 K vistas. Los temas de finanzas personales tienen CPM alto.
   Short: "¿Cuánto pagas DE VERDAD por tu tarjeta de crédito?".

### B. Temporada (diciembre a febrero)
8. **Calendario 2027 automático en Excel con una sola fórmula (SECUENCIA + festivos en color)**
   Es lo que más se busca en diciembre. ⚠️ Las fechas de diciembre ya están ocupadas, así que conviene publicarlo como video extra antes del 15 dic.
9. **Presupuesto personal y control de gastos 2027 en Excel (con gráfico y alertas)**
   Es lo que más se busca en enero, tiene CPM de finanzas y puede llevar a una plantilla de la tienda. ⚠️ Enero ya está programado: publicarlo como extra o cambiarlo por otro video.
10. **Planilla de calificaciones automática para docentes (notas ponderadas, recuperaciones y colores)**
    Es el inicio del año escolar. Los videos para docentes funcionan: examen en Moodle 66 K y exámenes con Forms 27 K. También puede llevar a una plantilla de la tienda.

### C. Empresa y automatización (CPM alto)
11. **Control de inventario en Excel: entradas, salidas y alerta de stock mínimo**
    Completa los videos de código de barras (296 K, el más visto) y etiquetas de inventario (374 h). Inventario es un tema que se busca mucho y hay productos en la tienda.
12. **Control de asistencia con código QR y Excel (para empleados o estudiantes)**
    Usa lo que ya funciona (QR: 98 K) para resolver un problema real de oficinas y colegios.
13. **Mensajes de WhatsApp personalizados desde Excel (con enlaces wa.me, sin bots ni spam)**
    Correos masivos es lo más comentado del canal, y en Latinoamérica WhatsApp se usa más que el correo. Se hace con `HIPERVINCULO` + wa.me (un clic por contacto), sin automatizaciones que violen las reglas de WhatsApp.
14. **Correos masivos: respondo las 7 dudas más comunes (CC, firma, varias hojas, adjuntos que no aparecen)**
    Responde directamente lo que pide el resumen de YouTube y crea comunidad. Se complementa con el tema 11 del backlog.

### D. IA (novedades verificadas)
15. **Agent Mode en Excel: le pedí a Copilot que armara un modelo completo (y lo revisé)**
    Desde nov 2026 está disponible para todos en Excel para Windows ([Microsoft, release notes](https://learn.microsoft.com/en-us/microsoft-365/copilot/release-notes)). Se puede unir con el tema 27 del backlog o hacerlo como continuación.
16. **Claude en Excel: el complemento oficial, qué hace y qué NO hace**
    Disponible para todos desde mayo de 2026 con Claude Pro o un plan superior. No hace macros/VBA ni tablas de datos, y la recomendación oficial es usarlo solo con archivos confiables ([guía](https://www.eesel.ai/blog/claude-for-excel), [Anthropic](https://claude.com/blog/claude-excel-powerpoint-updates)). Continúa el duelo ChatGPT vs Claude del 12 ene.
17. **Ley de Benford: cómo detectar números falsos en facturas con Excel y Python**
    Junta historias con datos, matemáticas y Data Analyst. Es un tema llamativo y se puede verificar con datos reales.
18. **Funciones REGEX en Excel: saca correos, teléfonos y cédulas de cualquier texto**
    Limpieza de datos con funciones nuevas ([Microsoft Support](https://support.microsoft.com/en-us/Excel/functions/regexextract-function)). Antes del guion, revisar en el Excel de Edwin el nombre que tiene en español.
19. **Casillas de verificación en Excel: lista de tareas con barra de progreso**
    Se ve muy bien en animación y es ideal para Shorts.

### E. Python (la puerta de entrada de los Shorts)
20. **Proyecto Python: calculadora de notas con `input()` y condicionales anidados**
    Responde una pregunta que se repite en los comentarios del Short #1 (IF/ELIF). Es la continuación natural del video del 17 dic.
21. **Python desde cero en 2027: instala Python y VS Code y escribe tu primer programa en 10 minutos**
    El backlog no tiene un video de inicio para quien llega por los Shorts y no sabe instalar nada.
22. **Funciones en Python (`def`) con un ejemplo real de facturación**
    Sigue la serie IF → bucles → funciones y prepara a los espectadores para pandas.

### F. Universitarios y Data Analyst
23. **Calcula el tamaño de muestra de tu encuesta en Excel (calculadora lista para usar)**
    El Short sobre muestras tiene 2,6 K vistas. Los universitarios llegan desde Google y en los comentarios agradecen la ayuda con trabajos de la universidad.
24. **Estadística descriptiva en 1 clic: media, mediana, desviación, histograma y diagrama de caja en Excel**
    Sigue la tabla de frecuencias y los gráficos estadísticos, que ganan tráfico externo.
25. **SQL para quienes ya saben Excel (en 10 minutos)**
    Es el siguiente paso en la ruta Data Analyst, que Edwin conoce por su certificado de Google.
26. **De Excel a Power BI: tu primer reporte interactivo**
    Completa la playlist "Data Analyst".

## Propuesta para el lote de febrero 2027 (8 videos)
Para alternar alcance (Google y Shorts) con ingresos (CPM):
1. Imprimir en Excel sin que se corte (1)
2. Planilla de calificaciones para docentes (10)
3. Seno, coseno y tangente en Excel (2)
4. Control de inventario con stock mínimo (11)
5. Página web gratis con IA (6)
6. Agent Mode en Excel (15)
7. Calculadora de notas en Python (20)
8. Ley de Benford (17)

Extras de temporada, si Edwin acepta publicar fuera del calendario: calendario 2027 (8) en diciembre y presupuesto 2027 (9) en enero.

## Recordatorios para cada video (vienen del informe)
- Poner en la descripción y en un comentario fijado el enlace directo a la plantilla o al código.
- Subir siempre los subtítulos .srt (el 31 % ve con subtítulos).
- Al final de cada video, recomendar el siguiente de la serie (casi no hay público que vuelva: 95,7 % son espectadores nuevos).
