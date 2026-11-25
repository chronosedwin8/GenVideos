# Calendario de publicación · Edwin O (UTC-5, Colombia)

Videos a las **7:00 a. m.**, Shorts a las **12:00 m.** (video del martes → miércoles y sábado; video del jueves → viernes y lunes).

## Lote de diciembre 2026 (producido el 24 nov 2026) · programado en YouTube
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

## Lote de enero 2027 (producido el 25 nov 2026, voz con acento latinoamericano)
| Fecha | Video (≥ 8 min) | Slug | Duración | Playlist | Shorts |
|---|---|---|---|---|---|
| mar 29 dic | Claude Code desde tu celular (Remote Control) | claude-code-movil | 8:16 | IA para tu productividad | mié 30 · sáb 2 ene |
| jue 31 dic | Etiquetas de inventario con QR y código de barras | etiquetas-qr-excel | 8:35 | Excel para la oficina | vie 1 ene · lun 4 |
| mar 5 ene | ¿Qué es Power Query y para qué sirve? | que-es-power-query | 8:34 | Power Query y datos | mié 6 · sáb 9 |
| jue 7 ene | La varita mágica: IA para combinar datos | combinar-datos-ia | 8:48 | Excel con IA | vie 8 · lun 11 |
| mar 12 ene | ChatGPT vs Claude: duelo de combinación de datos | duelo-chatgpt-claude | 8:57 | Excel con IA | mié 13 · sáb 16 |
| jue 14 ene | Probabilidad binomial al instante | probabilidad-binomial | 8:42 | Data Analyst | vie 15 · lun 18 |
| mar 19 ene | Domina Power Query en 10 minutos | power-query-10-minutos | 8:51 | Power Query y datos | mié 20 · sáb 23 |
| jue 21 ene | ChatGPT en Excel: automatiza tus hojas | chatgpt-en-excel | 8:32 | Excel con IA | vie 22 · lun 25 |

## Antes de publicar cada video
- [ ] Edwin confirma el aporte personal (escena marcada `<!-- APORTE: confirmar -->` en `guion.md`). Si no lo reconoce, se cambia
      el texto y se regenera solo esa escena: `python scripts/tts_elevenlabs.py edwin-o <slug> --escena NN`.
- [ ] Edwin ve el video (`render/<slug>.mp4`) y la miniatura.
- [ ] Subir los mp4 a YouTube Studio como borradores → Claude aplica metadatos y programa (`scripts/youtube_publicar.py`).
- [ ] Los Shorts llevan al final el texto fijo de Edwin (como en el lote de diciembre).
