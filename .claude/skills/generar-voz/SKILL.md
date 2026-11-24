---
name: generar-voz
description: Genera la voz en off del video con ElevenLabs (por escenas, con tiempos por palabra) y deja manifest.json y subtitulos.srt listos para Remotion. Usar cuando el usuario diga "genera la voz", "pásalo a audio" o "/generar-voz".
---

# Generar la voz con ElevenLabs

Requisitos: `.env` con `ELEVENLABS_API_KEY` y `ELEVENLABS_VOICE_ID_<CANAL>` (si faltan, usa `/configurar-elevenlabs`);
`pip install -r requirements.txt`.

1. Verifica que el guion tenga `estado: aprobado`. Si no, pregunta antes (gasta créditos).
2. `python scripts/tts_elevenlabs.py <canal> <slug> --simular` → informa caracteres y duración estimada.
3. Primera vez con una voz: genera solo `--escena 01` y pide al usuario que la escuche.
4. `python scripts/tts_elevenlabs.py <canal> <slug>` genera las escenas que falten.
5. Correcciones: edita el guion y regenera solo esa escena con `--escena NN`.
6. Marca `voz` en el backlog.

Los audios quedan guardados en `episodios/<slug>/audio/`; no dependen de la cuenta de ElevenLabs. Nunca mostrar la API key.
