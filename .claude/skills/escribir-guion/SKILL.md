---
name: escribir-guion
description: Escribe el guion de un video del canal a partir de su ficha, en el formato de escenas que lee el script de ElevenLabs. Usar cuando el usuario pida un guion o "/escribir-guion".
---

# Escribir el guion

Entrada: `canales/<canal>/episodios/<slug>/ficha.md` (si no existe, usa primero investigar-termino).
Lee `canales/<canal>/canal.md` (tono, trato, variante, extensión por tipo) y `estructura-<tipo>.md`.
Plantilla: `plantillas/guion.md` (concepto y similares) o `plantillas/guion-tutorial.md` (tutorial).

## Aporte del creador (obligatorio)
Antes de escribir, pide al usuario un aporte propio: anécdota, error que ve a menudo, su opinión o un ejemplo suyo
(una frase basta). Intégralo con su voz. Si no responde, deja `[APORTE DEL CREADOR: …]` marcado y avísale:
el guion no se aprueba sin él. Varía ganchos y visuales entre episodios (ver `docs/monetizacion.md`).

## Reglas de voz (ElevenLabs)
- Extensión de [VOZ] según la tabla de formatos de `canal.md`. Reporta el conteo de palabras al final.
- Frases cortas (máx. ~20 palabras; ~12 si el público es infantil). Una idea por frase.
- Escribe como se pronuncia: números en letras cuando suenen raros, siglas como se leen. Prueba con `--simular`.
- Puntuación = respiración. Sin paréntesis ni guiones largos en [VOZ].
- Trato y variante de español definidos en `canal.md`. La escena 01 nunca empieza con "hola a todos".
- Si el canal usa `eleven_v3`, se pueden poner etiquetas de emoción en minúscula dentro de [VOZ]: `[excited]`, `[curious]`,
  `[surprised]`, `[laughs]`, `[cheerfully]`, `[whispers]`. Máximo 1–2 por escena; el script las quita de subtítulos y tiempos.
- Etiquetas no narradas extra: `[HOJA]` (datos de la hoja), `[FORMULA]` (fórmula exacta), `[CODIGO]` (código exacto).
  Todo cálculo que aparezca en pantalla se verifica (Python o documentación oficial) y se anota en `ficha.md`.

## Visual
- Cada escena con al menos un [VISUAL]: diagramas, comparaciones, líneas de tiempo, íconos. [PANTALLA] máx. 12 palabras.
- Tutoriales: una escena por paso con `[GRABACION]` exacto y `[ZOOM]`, y una **lista de grabación** al final.

## Al terminar
`python scripts/tts_elevenlabs.py <canal> <slug> --simular` para validar formato y duración.
Marca `guion` en el backlog. Queda `estado: borrador` hasta que el usuario lo apruebe (entonces `aprobado`).
