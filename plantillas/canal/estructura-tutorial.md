# {{Nombre del canal}} · Estructura de un video `tutorial`

| # | Bloque | Duración | Qué pasa | Visual |
|---|--------|----------|----------|--------|
| 01 | Resultado | 0:00–0:10 | Mostrar el resultado final: "Así va a quedar…" | Antes/después |
| 02 | Pasos | resto | Un paso por escena: qué hacer y dónde hacer clic | Grabación `paso-NN.mp4` con zoom y resaltado |
| 03 | Si no te funcionó | ~30 s | 2–3 errores típicos y su solución | Lista ✗/✓ |
| 04 | Cierre | ~10 s | Video relacionado + suscripción | Miniatura del siguiente |

## Producción
1. `/escribir-guion` crea una escena por paso con `[GRABACION]` (qué grabar exactamente) y `[ZOOM]`,
   más una lista de grabación al final.
2. El creador graba un clip por paso, sin hablar: `episodios/<slug>/grabaciones/paso-NN.mp4`.
3. `/generar-voz` y `/construir-escenas` montan cada clip bajo su audio (acelera hasta 2× o congela el último fotograma),
   con zoom, círculo de clic, etiqueta "Paso N" y subtítulos.
