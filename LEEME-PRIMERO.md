# Estudio de canales con Claude Code · Guía rápida

Este proyecto convierte a Claude Code en tu estudio de producción de YouTube: investiga temas, escribe guiones,
genera la voz con ElevenLabs, anima el video con Remotion, saca Shorts y deja todo listo para publicar
(o lo publica por ti). Tú solo apruebas en los puntos clave.

## Lo que necesitas
- **VS Code** con la extensión **Claude Code** (o Claude Code en la terminal).
- **Python 3.10+** y **Node.js 18+** instalados.
- Una cuenta de **ElevenLabs de pago** (la gratuita no permite uso comercial).
- Opcional: un proyecto en **Google Cloud** para publicar en YouTube desde Claude.

## Paso 1 · Llena tu formulario (10 min)
Abre **`MI-CANAL.md`** y completa los datos de tu canal. No tienes que llenarlo todo: lo que falte, Claude te lo pregunta.

## Paso 2 · Abre el proyecto en Claude Code
1. Descomprime esta carpeta y ábrela en VS Code.
2. En la terminal: `pip install -r requirements.txt`
3. Abre Claude Code y escribe:

> **Crea mi canal con los datos de MI-CANAL.md**

Claude lee tu formulario, te hace las preguntas que falten y crea tu canal: perfil y tono, identidad visual,
estructura de cada tipo de video y una lista de 40–60 temas investigados y ordenados por prioridad.
Revísalo y pídele los cambios que quieras.

## Paso 3 · Conecta tus herramientas (una sola vez)
> **Conecta ElevenLabs**

Escribes tu API key oculta en la terminal (nunca la pegues en el chat). Claude revisa tu plan y tus créditos,
te propone voces para tu canal y genera un audio de prueba.

> **Conecta YouTube** *(opcional)*

Claude te guía para crear una credencial en Google Cloud (~10 min) y autorizas tu canal en el navegador.
Detalles en `docs/youtube-conexion.md`.

## Paso 4 · Haz tu primer video
> **Haz el siguiente video**

o

> **Haz el video de <tema>**

El flujo es siempre el mismo:

| Paso | Quién |
|------|-------|
| Investiga el tema y escribe el guion (te pide una anécdota o aporte tuyo) | Claude |
| **Apruebas el guion** (en tutoriales, además grabas la pantalla por pasos) | Tú |
| Genera la voz, anima el video y saca los Shorts | Claude |
| **Revisas la vista previa** | Tú |
| Prepara título, descripción con capítulos, etiquetas, miniatura y subtítulos | Claude |
| **Subes el .mp4 en YouTube Studio y dices "publícalo"** | Tú |
| Aplica todo y publica o programa | Claude |

## Frases útiles
- "Haz el siguiente video" · "Haz los guiones de los próximos 3 temas"
- "Agrega <tema> a mi lista" · "Propón 10 temas nuevos sobre <subtema>"
- "Regenera la voz de la escena 5" · "Cambia la voz del canal"
- "Prográmalo para el jueves a las 6 pm"
- "Agrega un segundo canal con MI-CANAL-2.md"

## Importante
- Claude no gasta créditos de voz sin un guion aprobado, ni publica sin tu "sí".
- `.env` y `secretos/` guardan tus claves: nunca los compartas ni los subas a internet.
- Antes de monetizar, lee `docs/monetizacion.md`.
- Haz copia de seguridad de la carpeta `canales/` (Drive o disco externo): ahí queda todo tu trabajo.
