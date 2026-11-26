# Proyecto Fundales · Entrenador Docente (videos promocionales y explicativos)

Producto: **Entrenador Docente** (https://fundales.com), simulador con IA para el Concurso Docente de la CNSC (Colombia).
Código de referencia: `C:\Users\eortiz\Desktop\entrenador-docente-cnsc` (React + Supabase + Gemini). Capturas reales: `public/Imagenes/1–18`.
Publicación: **Facebook** (página «Fundales.com», id 61585907685057, por API vía edwinortizNET) y **TikTok** (subida manual).

## Audiencia
Aspirantes al concurso docente en Colombia: docentes de aula (17 áreas), rectores, coordinadores y orientadores.
Muchos estudian desde el celular, de noche, con poco tiempo. Les preocupa el juicio situacional, la normativa y el tiempo.

## Tono y voz
- Español de Colombia, trato de **tú**, cercano y respetuoso («profe»). Frases cortas, nada de promesas exageradas.
- Voz: **Alexander – Colombian Latin** (ElevenLabs `UxEeTOXgTgyv54iyYaa5`, eleven_v3, `language_code: es`; variables `*_FUNDALES` en `.env`).
- ritmo_ppm: 140
- Explicativos 60–90 s (140–210 palabras). Promos 20–30 s (45–70 palabras). Gancho en los 2 primeros segundos.

## Formatos de salida (cada video en los dos)
- **Horizontal 16:9 (1920×1080)**: la plataforma en una ventana de navegador de escritorio (diseño real de la app).
- **Vertical 9:16 (1080×1920)**: la versión móvil de la app dentro de un celular + subtítulos grandes (TikTok / Reels).
- Salida: `proyectos/fundales/salida/horizontal/<slug>.mp4` y `salida/vertical/<slug>.mp4` + `salida/miniaturas/`.

## Reglas de contenido (obligatorias)
1. **Nada de «oficial»**: Entrenador Docente es privado y no tiene relación con la CNSC (lo dice el FAQ de la web).
   Todo video lleva el aviso: «Plataforma privada. Sin relación con la CNSC». El logo se usa sin el anillo «Simulacros oficiales».
2. **Ninguna garantía de aprobar** el concurso (FAQ). Se habla de entrenar, medir y mejorar.
3. Las preguntas son **generadas con IA** al estilo de la prueba; no son preguntas reales ni filtradas. No decir lo contrario.
4. Cifras solo las de `datos.md` (con fecha y fuente). Fechas del concurso: siempre «según la CNSC/prensa, sujeto a cambios».
5. Pantallas: reconstrucción fiel de la app real (mismos textos, colores e íconos). Nombre de usuario ficticio («Profe Laura Gómez»), nunca datos de usuarios reales ni la pestaña Admin.
6. **Siempre promocionar https://fundales.com/** (pedido de Edwin, 26 nov 2026): la voz dice «fundales punto com» en el
   cierre (y en los explicativos también cerca del inicio o al mostrar el registro); en pantalla va una píldora fija
   «fundales.com» durante TODO el video (horizontal y vertical) + tarjeta final «Entra gratis a fundales.com»; el texto de
   cada publicación (Facebook y TikTok) lleva https://fundales.com/ . Botón de WhatsApp de soporte cuando aplique.
7. Funciones Premium se presentan como Premium (Coach IA, Asistente Legal IA, Entrevista, ejercicios de matemáticas con IA, generar preguntas nuevas).

## Cómo producir y publicar (flujo)
1. Guion: `proyectos/fundales/videos/<slug>/guion.md` (formato `## ESCENA NN · Título` + `[VISUAL]` + `[VOZ]`). Edwin aprueba.
2. Voz: `python scripts/tts_elevenlabs.py fundales <slug>` (lee `proyectos/` y usa las variables `*_FUNDALES`).
3. Pantallas: un archivo de datos por video en `video/src/fundales/videos/` (registrado en `index.ts`). Motor en
   `video/src/fundales/` (`pantallas.tsx` = interfaz real de la app en escritorio y móvil, `graficos.tsx` = promos,
   `motor.tsx` = composición 16:9/9:16, píldora fija fundales.com, subtítulos, cierre). Cues = palabras de la voz.
   `pasosV`/`camaraV` ajustan el vertical. `nota` marca "Pregunta real…", "Datos de ejemplo", etc.
4. Revisión: `python scripts/render_fundales.py <slug> --muestras 3 20 40` → PNG en `muestras/<slug>/`.
5. Render: `python scripts/render_fundales.py <slug>|todos` → `salida/horizontal|vertical/<slug>.mp4` + `salida/miniaturas/`.
6. Publicación: textos y fechas en `publicacion/publicaciones.json`. Con el "sí" de Edwin:
   `python scripts/publicar_fundales.py --simular` y luego sin `--simular` → programa los Reels en la página
   «Fundales.com» (Graph API, vía `scripts/fb_reel_fundales.php` con el token cifrado de edwinortizNET; nunca se imprime).
   TikTok: `publicacion/tiktok.md` con los textos; Edwin sube `salida/vertical/<slug>.mp4` a mano.
