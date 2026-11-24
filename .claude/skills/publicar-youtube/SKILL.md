---
name: publicar-youtube
description: Prepara y publica en YouTube un video aprobado — título SEO, descripción con capítulos, etiquetas, miniatura, subtítulos, audiencia, playlist, Shorts y publicación inmediata o programada. Usar cuando el usuario diga "prepara la publicación", "publícalo", "prográmalo" o "/publicar-youtube".
---

# Preparar y publicar

Para publicar, el canal debe estar conectado (`/conectar-youtube`). Sin conexión, prepara todo igual para copiar y pegar.

## A. Preparar
Sigue la sección SEO de `canales/<canal>/canal.md`. Escribe en `canales/<canal>/episodios/<slug>/`:
- `publicacion.md` (para que el usuario revise) y `publicacion.json` (formato de `plantillas/publicacion.json`).

1. **Título**: 3 opciones en el .md, la elegida en el .json (≤ 70 caracteres, empieza con lo que la gente busca, patrón del canal).
2. **Descripción**: 2 primeras líneas con la respuesta; **capítulos** desde `audio/manifest.json` (empieza en 0:00, mínimo 3,
   cada uno ≥ 10 s); fuentes; enlaces a videos relacionados del canal (ver `publicado.json` de otros episodios).
3. **Etiquetas**: 10–15 variantes de búsqueda (incluye variantes regionales del idioma si aplica).
4. **Categoría** (27 = Educación, 28 = Ciencia y tecnología, 26 = Consejos y estilo…) e idioma.
5. **Audiencia** (`creado_para_ninos`): según el contenido, no según quién lo busca. Si el video está dirigido a menores de 13
   (tono, personajes, título "para niños"), es `true`. Siempre confírmalo con el usuario.
6. **Contenido sintético** (`contenido_sintetico`): pregunta. `true` si hay contenido realista alterado o sintético que podría
   confundirse con algo real (p. ej. voz clonada de una persona diciendo algo que no grabó, imágenes realistas generadas).
7. **Miniatura** 1280×720 (< 2 MB) con el componente `Miniatura` según `marca.md`:
   `npx remotion still <Id> ../canales/<canal>/episodios/<slug>/miniatura.png`. Muéstrasela al usuario.
8. **Playlist** por temporada del backlog. **Shorts**: un item por short en `shorts`.

## B. Publicar (solo con el "sí" explícito del usuario en esta sesión)
1. Pregunta: ¿publicar ahora o programar? Sugiere día/hora según `canal.md`.
2. `python scripts/youtube_publicar.py publicar <canal> <slug> --simular` → muestra el resumen.
3. Pide al usuario subir `render/<slug>.mp4` en YouTube Studio y cerrar sin publicar (queda privado).
   Si `YOUTUBE_PROYECTO_AUDITADO=true`, usa `subir` y omite este paso.
4. `python scripts/youtube_publicar.py publicar <canal> <slug> --ultimo [--programar "AAAA-MM-DD HH:MM"]`.
   Antes, confirma que el título del último video detectado es el que el usuario acaba de subir.
5. Shorts: igual, uno por uno, con `--item short-N`.
6. Comparte los enlaces y marca `publicado` (o `programado`) en el backlog.
