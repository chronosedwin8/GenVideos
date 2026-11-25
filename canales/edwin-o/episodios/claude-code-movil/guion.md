---
canal: edwin-o
tipo: tutorial
tema: Claude Code desde el móvil con Remote Control
slug: claude-code-movil
programa: Claude Code + app de Claude (iOS/Android)
duracion_objetivo: 9 min
estado: aprobado   # lote de enero 2027 pedido por Edwin el 25 nov 2026; se revisa completo antes de publicar
siguiente_video: Etiquetas de inventario con QR y códigos de barras en Excel (etiquetas-qr-excel)
---

<!-- Datos verificados en ficha.md. La interfaz es una recreación animada. -->

## ESCENA 01 · Gancho
[VISUAL] Celular con la app de Claude: "Genera los reportes de febrero". Al lado, el PC de la oficina ejecutando reportes.py y creando 12 archivos.
[VOZ]
[excited] Estás en la calle, lejos de tu computador, y te piden doce reportes de Excel para ya. Sacas el celular, escribes una frase… y tu computador de la oficina hace todo el trabajo. Sin escritorio remoto, sin abrir puertos, sin magia negra.

## ESCENA 02 · Presentación
[VISUAL] Cortinilla + título "CLAUDE CODE desde tu móvil". Lista: Instalar · Conectar · Mandar tareas · Seguridad.
[VOZ]
[excited] ¡Bienvenidos, amigos del canal! Vamos en busca del poder tecnológico. Hoy te enseño a controlar Claude Code desde tu celular con una función que se llama Remote Control. Vas a ver cómo instalarlo, cómo conectar el teléfono, cómo mandarle tareas reales y qué cuidar en seguridad.

## ESCENA 03 · El caso
[VISUAL] Cronología: "24 feb 2026 · Anthropic anuncia Remote Control" · "Primero para Max, luego Pro" · "Hoy: Pro, Max, Ultra, Team y Enterprise".
[VOZ]
Esto es nuevo. El veinticuatro de febrero de dos mil veintiséis, Anthropic anunció Remote Control como vista previa, primero para los planes Max y después para Pro. Hoy, según la documentación oficial, funciona en los planes Pro, Max, Ultra, Team y Enterprise. Y cambia la forma de trabajar: tu asistente de programación ya no depende de que estés sentado frente a la pantalla.

## ESCENA 04 · El aporte de Edwin
<!-- APORTE: confirmar -->
[VISUAL] Tarjeta 🎬: "Este canal se produce con Claude Code: guion, voz y animación".
[VOZ]
Te cuento algo: este mismo canal lo produzco con Claude Code. Los guiones, la voz y la animación salen de un proyecto en mi computador. Y muchas veces reviso cómo va un video desde el celular, mientras hago otra cosa. Por eso te lo quiero enseñar: es de esas herramientas que te devuelven horas.

## ESCENA 05 · Qué es y qué no es
[VISUAL] Comparar: "Remote Control" (✓ corre en TU PC · ✓ tus archivos no salen · ✓ el celular es el control) vs "Claude Code en la nube" (✓ corre en servidores · ✓ no necesita tu PC encendido).
[VOZ]
Primero, entiende la idea. Con Remote Control, Claude Code sigue corriendo en tu computador, con tus archivos, tus programas y tus herramientas. El celular solo es el control remoto: ves la conversación y le das órdenes. Es distinto de Claude Code en la nube, que trabaja en servidores de Anthropic y no necesita que tu computador esté encendido.

## ESCENA 06 · Lo que necesitas
[VISUAL] Lista: "Plan Pro, Max, Ultra, Team o Enterprise" · "Claude Code instalado en tu PC" · "App de Claude (iOS o Android)" · "La MISMA cuenta en los dos". Píldora: "✗ El plan gratuito no incluye Claude Code".
[VOZ]
Necesitas tres cosas. Un plan de pago de Claude: Pro, Max, Ultra, Team o Enterprise; el plan gratuito no incluye Claude Code. Claude Code instalado en tu computador. Y la aplicación de Claude en tu celular, Android o iPhone, con la misma cuenta. Ojo: no funciona si inicias sesión con una clave de API.

## ESCENA 07 · Paso 1: instala Claude Code
[VISUAL] Terminal PowerShell: `irm https://claude.ai/install.ps1 | iex`. Debajo, macOS/Linux: `curl -fsSL https://claude.ai/install.sh | bash`. Luego `claude --version` → `2.1.x (Claude Code)`.
[VOZ]
Paso uno: instala Claude Code. En Windows abre PowerShell y pega el comando de instalación oficial que te dejo en la descripción; en Mac o Linux es otro comando, también abajo. No necesitas ser administrador. Cuando termine, escribe claude, guion guion version, y si te responde con un número de versión, quedó listo.

## ESCENA 08 · Paso 2: abre tu carpeta de trabajo
[VISUAL] Terminal: `cd Documentos\Reportes` → `claude` → "Inicia sesión" → `/login`. Globo: "Claude solo ve esta carpeta".
[VOZ]
Paso dos: entra a la carpeta donde están tus archivos, por ejemplo, la carpeta de reportes, y escribe claude. La primera vez te pide iniciar sesión con tu cuenta de Claude. Fíjate en este detalle: Claude Code trabaja en la carpeta donde lo abres. Así que ábrelo justo donde está tu trabajo.

## ESCENA 09 · Paso 3: activa el control remoto
[VISUAL] Terminal: `/remote-control` → "Enable Remote Control? (y/n)" → y → panel con URL y código QR. Indicador "/rc active".
[VOZ]
Paso tres, el importante. Dentro de Claude Code escribe barra remote control, o la versión corta, barra r c. La primera vez te pregunta si quieres activarlo: dile que sí. Te aparece un enlace y un código QR. Y abajo verás el indicador de que el control remoto está activo. Tu sesión ya se puede manejar desde otro dispositivo.

## ESCENA 10 · Paso 4: conéctate desde el celular
[VISUAL] Celular: app Claude → pestaña Code → lista con "Reportes ventas · 🟢 en línea". A la izquierda, el QR. Notas: "Escanea el QR" · "o entra a Code y elige la sesión".
[VOZ]
Paso cuatro: toma tu celular. Tienes dos caminos. Escanea el código QR con la cámara, o abre la app de Claude, toca Code, y busca tu sesión: tiene un ícono de computador con un punto verde, que significa que está en línea. Tócala, y verás la misma conversación que tienes en la pantalla del computador.

## ESCENA 11 · Paso 5: mándale una tarea
[VISUAL] Celular, chat: "Ejecuta reportes.py y dime cuántos reportes salieron" → Claude: "Voy a ejecutar `python reportes.py`…".
[VOZ]
Paso cinco: mándale una tarea de verdad. Yo le escribo: ejecuta reportes punto p y, y dime cuántos reportes salieron. Es el programa de Python del video donde automatizamos Excel. Claude lee la carpeta, entiende qué hace el script, y lo ejecuta en mi computador, no en el celular.

## ESCENA 12 · El resultado
[VISUAL] Terminal del PC con la salida real: "Listo: Reporte Arequipa.xlsx (173 ventas)" … "Listo: Reporte Santiago.xlsx (194 ventas)". Celular: "Listo: 12 reportes en la carpeta reportes".
[VOZ]
[excited] ¡Y mira! En el computador se ejecuta el programa: Arequipa, Barranquilla, Bogotá… hasta Santiago. Doce reportes de Excel, uno por ciudad. Y en el celular me llega el resumen. Los archivos quedan en mi computador, listos para cuando llegue a la oficina, o para que se los envíe a mi jefe.

## ESCENA 13 · Tú decides qué puede hacer
[VISUAL] Cuadrícula: "Manual · te pregunta todo" · "Aceptar ediciones" · "Plan · primero propone" · "Auto". Píldora: "Desde la app NO se puede saltar los permisos".
[VOZ]
Ahora, la parte de control. Desde la app eliges el modo de permisos: manual, donde te pregunta antes de cada acción; aceptar ediciones; modo plan, donde primero te propone qué va a hacer; o automático. Y algo que me gusta: desde el celular no se puede activar el modo que se salta todos los permisos. Bien pensado.

## ESCENA 14 · Notificaciones
[VISUAL] Celular con notificación "Claude necesita tu aprobación". Terminal: `/config` → "Push when actions required".
[VOZ]
Un truco: en el computador escribe barra config y activa las notificaciones. Así, cuando Claude necesite tu aprobación o termine una tarea larga, te llega un aviso al celular. Le dejas un trabajo pesado, sigues con tu día, y cuando suena el teléfono, revisas y apruebas.

## ESCENA 15 · Actívalo para siempre
[VISUAL] Terminal: `/config` → "Enable Remote Control for all sessions: on". Alternativa: `claude remote-control` (modo servidor, barra espaciadora = QR).
[VOZ]
Si no quieres escribir barra r c cada vez, en barra config busca la opción para activar Remote Control en todas las sesiones. Y si quieres dejar tu computador como un servidor esperando tareas, abre la terminal y escribe claude remote control, así, separado. Con la barra espaciadora muestras el QR.

## ESCENA 16 · También desde el navegador
[VISUAL] Navegador en una tablet o en otro PC: "claude.ai/code" → lista de sesiones → "Reportes ventas 🟢". Píldora: "Una sesión, varios dispositivos".
[VOZ]
Y no solo es el celular. Si estás en otro computador, en la casa o en una tablet, abre el navegador, entra a claude punto ai barra code, y busca tu sesión por el nombre. Es la misma conversación, con el mismo historial. Por eso te recomiendo ponerle un nombre claro a cada sesión, como "reportes de ventas", para encontrarla rápido entre todas.

## ESCENA 17 · ¿Es seguro?
[VISUAL] Tarjetas: "🔒 Solo conexiones de salida (HTTPS), no abre puertos" · "📄 La conversación se guarda en Anthropic mientras está conectada" · "📱 Opción: solo dispositivos de confianza".
[VOZ]
¿Y la seguridad? Según la documentación, tu computador solo hace conexiones de salida por HTTPS y nunca abre puertos de entrada. Tus archivos y la ejecución se quedan en tu máquina, aunque la conversación sí se guarda en los servidores de Anthropic mientras está conectada. Y si quieres más protección, puedes exigir que solo se conecten dispositivos de confianza.

## ESCENA 18 · Si no te funcionó
[VISUAL] ListaErrores: "Cerraste la terminal" → "Déjala abierta: la sesión vive ahí" · "Entraste con clave de API" → "Inicia sesión con tu cuenta (/login)" · "Plan gratuito" → "Necesitas Pro o superior".
[VOZ]
Si no te funcionó, revisa esto. Si cierras la terminal, la sesión se acaba: déjala abierta. Si el portátil se suspende o se cae el internet, tranquilo, se reconecta solo cuando vuelve. Si iniciaste sesión con una clave de API, cámbiala por tu cuenta con barra login. Y recuerda: con el plan gratuito no hay Claude Code.

## ESCENA 19 · Ideas para tu trabajo
[VISUAL] Cuadrícula: "📊 Generar reportes de Excel" · "🐍 Correr tus scripts de Python" · "🧹 Limpiar un CSV" · "📝 Resumir un documento largo" · "🔎 Revisar errores en tus fórmulas" · "📦 Preparar archivos para enviar".
[VOZ]
¿Para qué te sirve en la oficina? Para generar reportes, correr tus programas de Python, limpiar un archivo que te llegó desordenado, resumir un documento largo, o revisar por qué una hoja de Excel da resultados raros. Imagina que estás en una reunión y te piden un dato: le pides a Claude que lo calcule con tus archivos, y en un minuto lo tienes en el celular. [serious] Si no lo aprendes ahora, te extingues: los que trabajan con agentes van a rendir el doble.

## ESCENA 20 · Resumen
[VISUAL] Resumen3: "Corre en TU computador" · "/rc y escaneas el QR" · "Tú decides los permisos".
[VOZ]
En resumen: Claude Code sigue corriendo en tu computador, con tus archivos. Escribes barra r c, escaneas el QR o entras a Code en la app, y listo. Y tú decides qué puede hacer, con los modos de permisos y las notificaciones.

## ESCENA 21 · Cierre y siguiente video
[VISUAL] Tienda: "edwinortiz.net/tienda" con QR. CierreSiguiente: "Etiquetas con QR y código de barras en Excel".
[VOZ]
Si quieres plantillas de Excel listas para usar, visita mi página edwinortiz punto net y entra a la tienda; te dejo el enlace abajo. En el próximo video volvemos a Excel: vas a crear etiquetas de inventario con código QR y código de barras, en segundos. Suscríbete para no perdértelo. [excited] El poder de la tecnología te va a cambiar el mundo.
