---
name: conectar-youtube
description: Conecta uno o varios canales de YouTube al proyecto con OAuth de Google para publicar automáticamente. Usar cuando el usuario diga "conecta YouTube", "da acceso a YouTube", "reconecta el canal" o "/conectar-youtube".
---

# Conectar YouTube

Guía completa para el usuario: `docs/youtube-conexion.md`.

1. Dependencias: `pip install -r requirements.txt`.
2. Si no existe `secretos/client_secret.json`, guía al usuario por la sección 1 de `docs/youtube-conexion.md`
   paso a paso (uno a la vez, esperando confirmación). Insiste en dejar la pantalla de consentimiento
   **En producción** para que el permiso no venza cada 7 días.
3. Por cada canal: `python scripts/youtube_publicar.py conectar <canal>`. Recuérdale elegir el canal correcto en el navegador.
   Si el nombre impreso no corresponde, borra `secretos/youtube-<canal>.json` y repite.
4. `python scripts/youtube_publicar.py estado <canal>` para confirmar el acceso.
5. Explica el modo de publicación: el usuario sube el .mp4 en Studio; Claude aplica todo lo demás
   (la API bloquea en privado los videos subidos desde proyectos sin auditoría).

Nunca pidas contraseñas ni códigos 2FA. Nunca muestres el contenido de `secretos/`.
