---
name: configurar-elevenlabs
description: Conecta y configura ElevenLabs — guarda la API key de forma segura, verifica plan, créditos y licencia comercial, propone y asigna una voz por canal y hace una prueba de audio. Usar cuando el usuario diga "conecta ElevenLabs", "configura la voz", "cambia la voz", "cambia de cuenta" o "/configurar-elevenlabs".
---

# Configurar ElevenLabs

## 1. La API key (nunca en el chat)
- El usuario la crea en ElevenLabs → Developers → API Keys (permiso Text to Speech y lectura de voces).
- Pídele que la ingrese en la terminal de VS Code: `python scripts/configurar_elevenlabs.py --pedir-clave`
  (se escribe oculta), o pegándola en `.env` en `ELEVENLABS_API_KEY=`.
- Si la pega en el chat: guárdala en `.env` con el script, no la repitas nunca y recomiéndale crear una nueva y borrar esa.

## 2. Verificar cuenta y licencia
`python scripts/configurar_elevenlabs.py` → plan, créditos, renovación y voces.
Resume: plan, créditos disponibles y cuántos videos alcanzan. Si el plan es gratuito, avisa que no sirve para monetizar.
Si la cuenta es de una empresa o institución, recomienda leer `docs/monetizacion.md`.

## 3. Elegir voces
Propón 2–3 voces por canal que hablen bien la variante de español de `canal.md` y encajen con su tono.
Si el usuario tiene una voz clonada propia, ofrécela. Asigna:
`python scripts/configurar_elevenlabs.py --asignar <canal>=<VOICE_ID>`

## 4. Probar
`python scripts/configurar_elevenlabs.py --probar --sin-voces` → `pruebas/prueba-<canal>.mp3`. Pide que la escuche;
ajusta voz o `ELEVENLABS_STYLE_<CANAL>` en `.env` y repite si hace falta.

## 5. Cerrar
Confirma que `.env` está en `.gitignore` y resume la configuración final.
