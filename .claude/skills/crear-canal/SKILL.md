---
name: crear-canal
description: Crea un canal nuevo en el estudio a partir del formulario MI-CANAL.md (o de una entrevista) — perfil, tono, marca, estructuras de video y lista de temas investigada. Usar cuando el usuario diga "crea mi canal", "configura mi canal", "agrega un canal", "usa MI-CANAL.md" o "/crear-canal".
---

# Crear un canal

## 1. Leer el formulario
- Lee `MI-CANAL.md` (o el archivo que indique el usuario, p. ej. `MI-CANAL-2.md`).
- Haz una lista de lo que falta o es ambiguo. Pregunta **todo junto, en un solo mensaje**, máximo 6 preguntas,
  con opciones sugeridas para que responda rápido. Lo que no responda, decídelo con criterio y dilo.
- Si dio un enlace de canal existente o canales de referencia, investígalos en la web (títulos, formato, estilo).
  Si el canal ya tiene videos, pide capturas de YouTube Studio (Analytics → Contenido y Público) para la sección de datos.

## 2. Crear la carpeta
- Slug: nombre del canal en minúsculas, sin tildes, con guiones (p. ej. `finanzas-claras`).
- Crea `canales/<slug>/` con `episodios/` y `assets/`.
- Copia y completa desde `plantillas/canal/`:
  - `canal.md` — todas las secciones; `ritmo_ppm` 145 (130 si el público es infantil o principiante); tabla de formatos
    solo con los tipos elegidos y su extensión en palabras (≈ duración en min × ritmo_ppm).
  - `marca.md` — colores (si solo hay logo, extrae los colores de la imagen y marca "confirmar"), tipografías
    (propón Google Fonts si no tiene), estilo de subtítulos y miniaturas.
  - `estructura-<tipo>.md` — una por cada tipo elegido, adaptada al tema y la duración. Para tipos nuevos
    (lista, caso, comparación…) crea su estructura siguiendo el mismo formato de tabla.
  - `backlog.csv` — ver paso 3.
- Pide al usuario que ponga su logo en `canales/<slug>/assets/`.

## 3. Lista de temas (40–60)
- Investiga en la web qué busca la gente sobre el tema del canal en el idioma y países elegidos
  (preguntas frecuentes, "qué es…", "cómo…", tendencias recientes) y cruza con los temas que el usuario quiere y los que no.
- Organiza en 4–8 temporadas lógicas (de lo básico a lo avanzado). Columnas: id, temporada, tipo, tema, slug,
  titulo_youtube (siguiendo el patrón SEO de `canal.md`), prioridad (alta/media/baja), estado (`pendiente`), notas.
- Prioridad alta: temas con mucha búsqueda, los que pidió el usuario y los que remasterizan videos suyos que ya funcionan.

## 4. Configuración técnica
- En `.env` (créalo desde `.env.example` si no existe) agrega `ELEVENLABS_VOICE_ID_<SLUG>=` (vacío) y `ZONA_HORARIA_UTC`.
- No pidas ni escribas claves: eso lo hace `/configurar-elevenlabs`.

## 5. Cerrar
Resume en pocas líneas: nombre y slug, formatos y duraciones, colores, número de temas por temporada y los 3 primeros temas
sugeridos. Siguiente paso: "Conecta ElevenLabs" y luego "Haz el siguiente video".
Si el usuario pide cambios, edita los archivos del canal; nunca toques otros canales.
