# Calendario de publicación · Edwin O (UTC-5, Colombia)

Lote producido el 24 nov 2026 con la voz clonada de Edwin. Videos a las **7:00 a. m.**, Shorts a las **12:00 m.**

| Fecha | Video (≥ 8 min) | Slug | Duración | Playlist | Shorts |
|---|---|---|---|---|---|
| jue 26 nov | Horas trabajadas y horas extra en Excel (piloto) | horas-extra-excel | 6:05 | Excel para la oficina | vie 27 · sáb 28 · lun 30 |
| mar 1 dic | Fórmulas de Excel con IA que SÍ funcionan | formulas-con-ia | 8:25 | Excel con IA | mié 2 · sáb 5 |
| jue 3 dic | 7 funciones de Excel que te ahorran horas | funciones-que-ahorran-horas | 8:37 | Listas que enganchan | vie 4 · lun 7 |
| mar 8 dic | Automatiza Excel con Python: 12 reportes en segundos | python-automatizar-excel | 8:34 | Python práctico | mié 9 · sáb 12 |
| jue 10 dic | ¿Excel está muerto con la IA? | excel-esta-muerto | 8:13 | Excel con IA | vie 11 · lun 14 |
| mar 15 dic | AGRUPARPOR: resúmenes con una fórmula | agruparpor-excel | 8:40 | Gráficos y análisis | mié 16 · sáb 19 |
| jue 17 dic | Condicionales en Python: IF, ELIF y ELSE | python-if-elif-else | 8:42 | Python práctico | vie 18 · lun 21 |
| mar 22 dic | Python en Excel con =PY() | python-en-excel | 8:49 | Excel con IA | mié 23 · sáb 26 |
| jue 24 dic | 5 errores de Excel que cometen hasta los expertos | errores-comunes-excel | 8:22 | Listas que enganchan | dom 27 · lun 28 |

## Antes de publicar cada video
- [ ] Edwin confirma el aporte personal (escena marcada `<!-- APORTE: confirmar -->` en `guion.md`). Si no lo reconoce, se cambia
      el texto y se regenera solo esa escena: `python scripts/tts_elevenlabs.py edwin-o <slug> --escena NN`.
- [ ] Edwin ve el video (`render/<slug>.mp4`) y la miniatura.
- [ ] En las descripciones de excel-esta-muerto y errores-comunes-excel, reemplazar "(enlace al video del …)" por el enlace real.
- [ ] Subir los mp4 a YouTube Studio como borradores → Claude aplica metadatos y programa (`scripts/youtube_publicar.py`).
