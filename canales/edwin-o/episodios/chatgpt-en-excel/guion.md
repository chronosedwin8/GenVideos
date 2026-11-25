---
canal: edwin-o
tipo: tutorial
tema: ChatGPT dentro de Excel para automatizar hojas de cálculo
slug: chatgpt-en-excel
programa: Excel para Microsoft 365 + complemento ChatGPT
duracion_objetivo: 9 min
estado: aprobado   # lote de enero 2027 pedido por Edwin el 25 nov 2026; se revisa completo antes de publicar
siguiente_video: ChatGPT vs Claude, el duelo (duelo-chatgpt-claude)
---

<!-- Datos oficiales de OpenAI y cálculos verificados: ver ficha.md. El panel del complemento es una recreación animada. -->

## ESCENA 01 · Gancho
[VISUAL] Hoja de gastos desordenada. Panel lateral "ChatGPT": "Quita los duplicados, ponle formato de moneda y hazme un resumen por categoría" → la hoja se limpia y aparece el resumen.
[VOZ]
[excited] Le escribes a Excel, como si le escribieras a un compañero: "quita los duplicados, ponle formato de moneda y hazme un resumen por categoría". Y en segundos, tu hoja está limpia y con su resumen. No es el futuro: ChatGPT ya vive dentro de Excel, y está disponible incluso en el plan gratuito.

## ESCENA 02 · Presentación
[VISUAL] Cortinilla + título "CHATGPT EN EXCEL". Lista: Instalarlo · 5 tareas reales · Permisos y privacidad · ChatGPT vs Copilot vs Claude.
[VOZ]
[excited] ¡Bienvenidos, amigos del canal! Vamos en busca del poder tecnológico. Hoy te enseño a instalar ChatGPT dentro de Excel, y a usarlo en cinco tareas reales de oficina. Además, lo que nadie te dice: cómo funcionan los permisos, qué pasa con tus datos, y cuándo te conviene más Copilot o Claude.

## ESCENA 03 · El caso
[VISUAL] Cronología: "5 mar 2026 · beta de ChatGPT para Excel" · "22 abr 2026 · llega a Google Sheets" · "5 may 2026 · disponible en todos los planes, incluso el gratuito". Fuente: OpenAI.
[VOZ]
Repasemos la historia. El cinco de marzo de dos mil veintiséis, OpenAI lanzó en versión beta ChatGPT para Excel. En abril llegó a Google Sheets. Y el cinco de mayo quedó disponible para todos los planes, incluido el gratuito, aunque en el plan gratuito el uso es limitado. Hoy cualquiera puede tenerlo.

## ESCENA 04 · El aporte de Edwin
<!-- APORTE: confirmar -->
[VISUAL] Tarjeta 🏅: "Como Microsoft Innovative Educator Expert, la pregunta que más me hacen: ¿es seguro con mis datos?".
[VOZ]
Como Microsoft Innovative Educator Expert, trabajo con muchos docentes y oficinistas, y la pregunta que más me hacen sobre la inteligencia artificial dentro de Excel no es cómo usarla. Es: ¿es seguro con mis datos? Así que en este video vamos a responder las dos cosas: cómo se usa, y qué pasa con tu información.

## ESCENA 05 · Paso 1: instálalo
[VISUAL] Excel: Inicio → Complementos → buscar "ChatGPT" → Agregar → aparece el botón "ChatGPT" en la cinta → Iniciar sesión.
[VOZ]
Paso uno: instálalo. Funciona en Excel de escritorio y en Excel para la web. Ve a la pestaña Inicio, busca el botón Complementos, y escribe ChatGPT en el buscador. Lo agregas, y aparece un botón de ChatGPT en la cinta. Lo abres, inicias sesión con tu cuenta de ChatGPT, y se abre un panel a la derecha de tu hoja.

## ESCENA 06 · Los datos
[VISUAL] HojaExcel "Gastos": Fecha · Concepto · Categoría · Monto, 8 filas; la fila del taxi repetida resaltada; montos sin formato.
[VOZ]
Vamos a trabajar con esta hoja de gastos de enero: ocho gastos, con la fecha, el concepto, la categoría y el monto. Tiene los problemas de siempre: un taxi registrado dos veces, montos sin formato, y nadie ha hecho el resumen. Total, con el duplicado: setecientos setenta mil.

## ESCENA 07 · Tarea 1: limpia la hoja
[VISUAL] Panel: "Quita los gastos duplicados y pon el Monto con formato de moneda" → ChatGPT muestra el plan: "1. Eliminar la fila 4 (duplicada) 2. Formato de moneda en D" → botón "Permitir".
[VOZ]
Tarea uno: limpiar. Le escribo: quita los gastos duplicados y pon el monto con formato de moneda. Y fíjate en algo muy importante: antes de tocar mi hoja, ChatGPT me muestra lo que va a hacer, y me pide permiso. Según OpenAI, así puedes revisar cada paso y deshacer los cambios si algo no te gusta.

## ESCENA 08 · El resultado
[VISUAL] Hoja: 7 filas, montos "$ 120.000"… Total: $ 725.000. Globo: "Revisa: 770.000 − 45.000 = 725.000 ✓".
[VOZ]
Permito, y listo: siete gastos, con formato de moneda. El total bajó a setecientos veinticinco mil. Y aquí va mi consejo de siempre: compruébalo. Setecientos setenta mil, menos el taxi repetido de cuarenta y cinco mil, da setecientos veinticinco mil. Cuadra.

## ESCENA 09 · Tarea 2: el resumen por categoría
[VISUAL] Panel: "Crea una hoja Resumen con el total por categoría y su porcentaje" → hoja Resumen: Oficina 330.000 (45,5 %) · Alimentación 215.000 (29,7 %) · Transporte 105.000 (14,5 %) · Tecnología 75.000 (10,3 %).
[VOZ]
Tarea dos: el resumen. Le pido: crea una hoja Resumen, con el total por categoría y su porcentaje. Resultado: Oficina, trescientos treinta mil, casi la mitad del gasto. Alimentación, doscientos quince mil. Transporte, ciento cinco mil. Y Tecnología, setenta y cinco mil. Y un detalle: pídele que lo haga con fórmulas, no con números pegados, así el resumen se actualiza si cambian los datos.

## ESCENA 10 · Tarea 3: explícame esta fórmula
[VISUAL] Celda E2 con =SI(D2>100000;"Revisar";"OK") heredada. Panel: "¿Qué hace la fórmula de la columna E?" → "Marca como 'Revisar' los gastos mayores de 100.000". Filas marcadas: Papelería, Almuerzo de equipo, Tóner impresora.
[VOZ]
Tarea tres: entender una hoja ajena. Esta columna tiene una fórmula que dejó alguien más. Le pregunto: ¿qué hace la fórmula de la columna E? Y me explica, en español sencillo: marca como "Revisar" los gastos mayores de cien mil. En este caso, la papelería, el almuerzo de equipo y el tóner. Perfecto para cuando heredas un archivo y nadie te explicó nada.

## ESCENA 11 · Tarea 4: ¿y si…?
[VISUAL] Panel: "¿Qué pasa con el total si el transporte sube un 10 %?" → "Transporte: 105.000 → 115.500 · Total: 725.000 → 735.500".
[VOZ]
Tarea cuatro: escenarios. ¿Qué pasa con el total si el transporte sube un diez por ciento? ChatGPT calcula: el transporte pasa de ciento cinco mil a ciento quince mil quinientos, y el total sube a setecientos treinta y cinco mil quinientos. Este tipo de preguntas, "¿y si…?", son las que te piden los jefes en las reuniones.

## ESCENA 12 · Tarea 5: menciona hojas con @
[VISUAL] Panel: "Compara @Gastos con @Presupuesto y dime qué categoría se pasó" → ChatGPT resalta las celdas.
[VOZ]
Tarea cinco, un truco poco conocido: puedes mencionar hojas con la arroba, como en un chat. Por ejemplo: compara arroba Gastos con arroba Presupuesto, y dime qué categoría se pasó. Así le dices exactamente dónde mirar, y la respuesta es mucho más precisa. Recuerda la regla de los prompts: entre más contexto, mejor.

## ESCENA 13 · Revisa siempre
[VISUAL] Lista: "✅ Revisa las celdas que cambió" · "✅ Revisa las fórmulas" · "✅ Duplica el archivo antes de un cambio grande" · "⚠️ OpenAI: 'puede ser incompleto o incorrecto'".
[VOZ]
Ahora, las reglas de seguridad, que vienen de la propia ayuda de OpenAI. Revisa las fórmulas y las celdas que cambió antes de confiar en el resultado. Si el trabajo es importante, duplica el archivo antes. Y no lo olvides: la misma OpenAI advierte que las respuestas pueden ser incompletas o incorrectas.

## ESCENA 14 · ¿Y mis datos?
[VISUAL] Tarjetas 🔒: "ChatGPT procesa tu mensaje y el contenido relevante de la hoja" · "Los chats del complemento no usan tu memoria de ChatGPT" · "No subas datos confidenciales sin permiso de tu empresa".
[VOZ]
¿Y tus datos? Para responder, ChatGPT procesa tu mensaje y la parte relevante de tu hoja. Los chats del complemento van separados de tu historial normal y no usan tu memoria. Mi recomendación: si es información confidencial de tu empresa, pregunta primero si está permitido. Muchas empresas usan planes empresariales justamente por esto.

## ESCENA 15 · Lo que todavía no hace bien
[VISUAL] Tarjeta: "Macros y VBA: pueden no estar del todo soportados" · "Fórmulas complejas: pueden necesitar ajustes".
[VOZ]
Lo que todavía no hace bien. Según OpenAI, las macros y el VBA pueden no estar del todo soportados. Y las fórmulas muy complejas, o los casos especiales, pueden necesitar que tú las ajustes. Es un asistente buenísimo, pero el responsable de la hoja sigues siendo tú.

## ESCENA 16 · ChatGPT, Copilot o Claude
[VISUAL] Cuadrícula de 3: "ChatGPT · todos los planes (gratis limitado)" · "Copilot · integrado en Microsoft 365" · "Claude · complemento para planes de pago".
[VOZ]
¿Y cuál elegir? ChatGPT para Excel está en todos sus planes, incluso el gratuito, con límites. Copilot viene integrado en Microsoft trescientos sesenta y cinco. Y Claude tiene su complemento para los planes de pago. En el duelo que hice entre ChatGPT y Claude viste que los dos aciertan en fórmulas, y que hay que verificar siempre.

## ESCENA 17 · Mi forma de usarlo
[VISUAL] Lista: "1. Pido un plan antes de cambios" · "2. Una tarea por mensaje" · "3. Le pido las fórmulas, no solo los números" · "4. Compruebo un total".
[VOZ]
Mi forma de usarlo, en cuatro hábitos. Uno: le pido que primero me diga su plan. Dos: una tarea por mensaje, no diez juntas. Tres: le pido fórmulas, no números pegados, para que la hoja siga viva. Y cuatro: compruebo al menos un total a mano. Con eso, el riesgo de error baja muchísimo.

## ESCENA 18 · Prompts para copiar
[VISUAL] Lista de prompts: "Limpia esta hoja: espacios, mayúsculas y duplicados" · "Crea una tabla de amortización para un préstamo de… a… meses" · "Explícame esta hoja como si yo fuera nuevo" · "¿Qué fórmulas de esta hoja dan error y por qué?" · "Hazme un presupuesto mensual con categorías".
[VOZ]
Te dejo cinco prompts para copiar y probar hoy mismo. Limpia esta hoja: espacios, mayúsculas y duplicados. Crea una tabla de amortización para un préstamo, diciéndole el monto, la tasa y los meses. Explícame esta hoja como si yo fuera nuevo en la empresa. ¿Qué fórmulas de esta hoja dan error, y por qué? Y hazme un presupuesto mensual con categorías. Los tienes también en la descripción.

## ESCENA 19 · Si no te funcionó
[VISUAL] ListaErrores: "No aparece en Complementos" → "Tu empresa bloquea la tienda: pídele al administrador" · "Se acabó el uso" → "Plan gratuito con límite" · "No hace lo que pedí" → "Sé más específico y usa @hojas".
[VOZ]
Si no te funcionó: si no aparece en Complementos, puede que tu empresa tenga bloqueada la tienda; el administrador lo puede instalar por ti. Si te dice que se acabó el uso, es el límite del plan gratuito. Y si no hace lo que pediste, sé más específico, y menciona las hojas con arroba.

## ESCENA 20 · Resumen
[VISUAL] Resumen3: "Inicio → Complementos → ChatGPT" · "Te pide permiso antes de cambiar" · "Tú verificas: fórmulas y totales".
[VOZ]
En resumen: instálalo desde Inicio, Complementos. Te pide permiso antes de cambiar tu hoja, y te explica lo que hace. Pero tú verificas las fórmulas y los totales. Es el compañero de trabajo más rápido que vas a tener. [serious] Si no lo aprendes ahora, te extingues.

## ESCENA 21 · Cierre
[VISUAL] Tienda con QR. CierreSiguiente: "ChatGPT vs Claude: el duelo".
[VOZ]
Si quieres plantillas de Excel para practicar con ChatGPT, visita mi página, edwinortiz punto net, y entra a la tienda; el enlace está abajo. Y si todavía no viste el duelo entre ChatGPT y Claude, te lo dejo aquí: misma pregunta, mismos datos, y todo probado en Excel. Suscríbete para más videos como este. [excited] El poder de la tecnología te va a cambiar el mundo.
