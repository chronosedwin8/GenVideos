# Estudio de canales educativos de YouTube

Proyecto para producir videos de uno o varios canales de YouTube con un mismo pipeline:
investigación → guion → voz (ElevenLabs) → video (Remotion) → Shorts → publicación.

## Primera vez: ¿hay canales creados?
Si `canales/` no tiene ninguna carpeta de canal (solo `.gitkeep`), el creador aún no ha configurado su canal:
ofrece ejecutar **`/crear-canal`**, que lee `MI-CANAL.md`. No produzcas videos hasta que exista al menos un canal.
Guía para el usuario: `LEEME-PRIMERO.md`.

## Regla número uno: identifica el canal
Antes de cualquier paso, define el canal. Si hay más de uno y no es obvio, pregunta.
Toda la información específica vive en `canales/<canal>/`:
- `canal.md` → audiencia, tono, formatos, extensión, voz, reglas de contenido y SEO. **Léelo siempre al empezar.**
- `marca.md` → colores, tipografía, elementos gráficos, miniaturas.
- `estructura-<tipo>.md` → estructura de cada tipo de video (concepto, tutorial, lista…).
- `backlog.csv` → lista de temas con estado.
- `episodios/<slug>/` → un folder por video.
- `assets/` → logo, fuentes, música, cortinillas.

Nunca mezcles tono, marca ni voz entre canales.

## Pipeline (skills en `.claude/skills/`)
Configuración (una vez): `/crear-canal`, `/configurar-elevenlabs`, `/conectar-youtube` (opcional).

```
canales/<canal>/backlog.csv
  1. /investigar-termino  → episodios/<slug>/ficha.md
  2. /escribir-guion      → episodios/<slug>/guion.md          ← el creador aprueba
     (tutoriales: el creador graba un clip por paso → grabaciones/paso-NN.mp4)
  3. /generar-voz         → audio/ (mp3 por escena + manifest.json + subtitulos.srt)
  4. /construir-escenas   → composición Remotion 16:9            ← el creador revisa la vista previa
  5. /crear-short         → Shorts 9:16
  6. /publicar-youtube    → publicacion.md/.json + miniatura → (el creador aprueba) → publica o programa
```

## Reglas
- **No generar voz sin guion aprobado** (gasta créditos). **No publicar sin un "sí" explícito** en la sesión.
- Para corregir una frase, regenera solo esa escena (`--escena NN`).
- Actualiza `estado` en el backlog: `pendiente → investigado → guion → voz → video → publicado`.
- Cada video lleva un **ejemplo o caso actual** investigado en la web y al menos **un aporte propio del creador**
  (anécdota, opinión, ejemplo suyo). YouTube no monetiza contenido genérico o hecho en masa (ver `docs/monetizacion.md`).
- Datos con fuente; nada de citas inventadas.
- Escribir la voz como se habla, en la variante de español y el trato (tú/usted) definidos en `canal.md`.

## Herramientas
- `scripts/tts_elevenlabs.py <canal> <slug>`: voz por escenas con tiempos por palabra (endpoint *with-timestamps*).
  Voz por canal en `.env`: `ELEVENLABS_VOICE_ID_<CANAL>` (mayúsculas, guiones → guiones bajos).
  El ritmo (palabras por minuto) se lee de `ritmo_ppm` en `canal.md`.
- `scripts/configurar_elevenlabs.py`: verifica cuenta, plan, créditos, voces y prueba.
- `scripts/youtube_publicar.py`: YouTube Data API v3 (conectar, estado, publicar, subir). Tokens en `secretos/`.
- **Remotion** en `video/` (componentes comunes en `video/src/comun/`, tema por canal en `video/src/<canal>/`).
  Si no existe: `npx create-video@latest video` (blank, TypeScript).
- Nunca imprimir, mostrar ni commitear claves (`.env`, `secretos/`).
