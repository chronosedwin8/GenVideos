---
name: crear-short
description: Crea Shorts verticales 9:16 (20–60 s) recortando un video del canal o desde un tema suelto. Usar cuando el usuario pida "saca shorts", "haz un short de…" o "/crear-short".
---

# Crear Shorts

Los Shorts suelen atraer más público nuevo que los videos largos. Cada video largo sale con 1–3 Shorts.

## Desde un video
1. Lee el `manifest.json` y elige 1–3 momentos autocontenidos (definición simple, paso clave, error común, dato sorprendente).
   Cada uno de 20–60 s.
2. Reutiliza el audio de esas escenas (no gastar créditos). Si hace falta un gancho o cierre nuevo, escribe 1–2 frases
   en `shorts/short-N.md` y genera solo eso.
3. Composición 1080×1920 en `video/src/<canal>/shorts/`: gancho en pantalla en el primer segundo, texto grande en el tercio
   central, subtítulos palabra por palabra, cierre "Video completo en el canal". Tutoriales: recorta a la zona del clic.
4. Render en `episodios/<slug>/render/short-N.mp4`.

## Desde un tema suelto
Guion corto con `tipo: short` (60–140 palabras de [VOZ]) y el mismo pipeline en vertical.

## Publicación
Título ≤ 60 caracteres con la búsqueda real + #shorts. Agrégalo a `shorts` en `publicacion.json`.
