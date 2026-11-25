# Ficha · Cómo usar Claude Code desde tu móvil (Remote Control)

- **Canal:** edwin-o · **Tipo:** tutorial · **Temporada:** IA para tu productividad · **Publicación:** martes 29 dic 2026, 7:00 a. m.
- **Palabra clave:** claude code móvil / claude code desde el celular / remote control claude code / claude code android iphone
- **Programa:** Claude Code (CLI) + app de Claude (iOS/Android). Recreación animada: la interfaz se dibuja en Remotion.

## Fuentes (leídas el 25 nov 2026)
- Docs oficiales Remote Control: https://code.claude.com/docs/en/remote-control
  - Conecta claude.ai/code o la app de Claude (iOS/Android) a una sesión de Claude Code **que corre en tu máquina**:
    "Claude keeps running locally the entire time, so your code execution and filesystem access stay on your machine."
  - Planes: Pro, Max, Ultra, Team y Enterprise (en Team/Enterprise un Owner activa el interruptor). **No funciona con API keys.**
  - Iniciar: `claude remote-control` (modo servidor; barra espaciadora muestra el QR) · `claude --remote-control` · dentro de una
    sesión: `/remote-control` o `/rc` (conserva el historial). El panel muestra la URL y el código QR.
  - Desde el móvil: app de Claude con la misma cuenta → **Code** → elegir la sesión (ícono de computador con punto verde) o escanear el QR.
    `/mobile` muestra un QR para descargar la app.
  - Seguridad: "makes outbound HTTPS requests only and never opens inbound ports". La transcripción se guarda en los servidores de
    Anthropic mientras está conectada; la ejecución y los archivos quedan locales. Opción "Require trusted devices" (Pro/Max/Ultra).
  - Límites: si cierras la terminal o detienes `claude`, la sesión termina; si el portátil se suspende o se cae la red, se reconecta solo.
  - `/config` → "Enable Remote Control for all sessions"; notificaciones "Push when actions required".
- Docs móvil: https://code.claude.com/docs/en/mobile — en la app los modos de permiso son Manual, Accept edits, Plan y Auto;
  **Bypass permissions no se puede elegir desde la app**. `/plugin` y `/resume` no funcionan desde la app.
- Instalación: https://code.claude.com/docs/en/setup — Windows PowerShell `irm https://claude.ai/install.ps1 | iex`;
  macOS/Linux `curl -fsSL https://claude.ai/install.sh | bash`. "The free claude.ai plan does not include Claude Code access."
- **Caso actual:** Anthropic anunció Remote Control el 24 feb 2026 (vista previa; primero Max y luego Pro).
  Help Net Security, 25 feb 2026: https://www.helpnetsecurity.com/2026/02/25/anthropic-remote-control-claude-code-feature/

## Demo (verificada)
- Tarea desde el móvil: ejecutar `reportes.py` (el script del video del 8 dic, `python-automatizar-excel/codigo/`).
- Salida real (ejecutada el 25 nov 2026): 12 líneas "Listo: Reporte <ciudad>.xlsx (N ventas)", de Arequipa (173) a Santiago (194).

## Aporte de Edwin (confirmar)
- Este canal se produce con Claude Code: guiones, voz y animación salen de un proyecto en su computador (hecho real del proyecto GenVideos).

## SEO
Título: **Cómo usar Claude Code desde tu celular (Remote Control paso a paso)**
