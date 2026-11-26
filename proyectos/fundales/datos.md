# Datos verificados para los videos

## Plataforma (código del 8 ago 2026 + web en vivo revisada el 26 nov 2026)
| Dato | Valor | Fuente |
|---|---|---|
| Plan Free | $0, gratis por 1 año, sin tarjeta; 2 simulacros/mes (1/día), 5 preguntas por simulacro; «20+ simulacros al año» | fundales.com (en vivo) · App.tsx |
| Plan Básico | $100.000 COP/año · 1 simulacro/día · 8/mes · 20 preguntas | fundales.com (en vivo) |
| Plan Intermedio (más popular) | $180.000 COP/año · 2/día · 20/mes · 30 preguntas | fundales.com (en vivo) |
| Plan Avanzado | $300.000 COP/año · 3/día · 40/mes · 50 preguntas | fundales.com (en vivo) |
| Con Entrevista IA | $130k / $240k / $390k al año; incluye 12 sesiones (1 por mes, máx. 8 min) | fundales.com (interruptor) · InterviewView.tsx |
| Pago | Wompi (tarjeta, PSE…); sin devoluciones una vez activado, salvo error de cobro o falla técnica | PlansView.tsx · FAQ |
| Modos | Diagnóstico Inicial (10 preg., 5–15) · Simulacro Tipo CNSC (cronómetro, mezcla de competencias) · Entrenamiento Focalizado (una competencia, sin tiempo, retroalimentación inmediata) | ConfigPanel.tsx |
| Tiempo | Cronómetro de 2 minutos por pregunta en Diagnóstico y Simulacro | App.tsx (`questionCount * 120`) |
| Cargos | Docente de Aula (17 áreas), Rector, Coordinador, Docente Orientador | types.ts |
| Competencias docente de aula | Lectura Crítica, Razonamiento Cuantitativo, Competencias Pedagógicas, Conocimientos Específicos, Prueba Psicotécnica, Competencias Comportamentales | ConfigPanel.tsx |
| Competencias rector | Lectura Crítica, Razonamiento Cuantitativo, Gestión Directiva, Administrativa, Financiera, Académica, Comportamentales | ConfigPanel.tsx |
| Resultados | Puntaje global, desempeño por competencia, cada respuesta con la norma (ley + artículo) y retroalimentación pedagógica y legal; PDF «Guardar Reporte» | ResultsDashboard.tsx |
| Tablero de Control | Pruebas totales, promedio global, mejor resultado, progreso en diagnósticos y simulacros, consolidado por competencias, historial | GlobalStatsView.tsx |
| Coach IA (Premium) | Fortalezas, a mejorar, estrategia, plan de estudio, normativa sugerida; PDF «Plan de Mejora»; 1 análisis cada 24 h | AIAnalysisView.tsx |
| Normativa | Ruta de aprendizaje por cargo; biblioteca: Ley 115/1994, Decreto 1278/2002, Decreto 1075/2015, Ley 1620/2013; Asistente Legal IA (Premium) | NormativaView.tsx |
| Matemáticas | Videos tutoriales de razonamiento cuantitativo **gratis para todos los usuarios** (confirmado por Edwin, 26 nov 2026); ejercicios con IA: 13 temas, 10 ejercicios de opción múltiple por tanda, solución paso a paso y PDF (Premium según el código) | MathLearningView/MathPracticeView |
| Premium extra | «Generar preguntas nuevas» con IA en tiempo real | ConfigPanel.tsx |

## Uso real (panel de administración, captura de Edwin del 26 nov 2026)
- **2.357** usuarios registrados · **1.564** simulacros realizados.
- Por cargo: docentes de aula 1.992 · orientadores 217 · rectores 79 · coordinadores 69.
- Áreas con más aspirantes: Primaria 592 · Preescolar 253 · Matemáticas 205 · Ciencias Sociales 167 · Ciencias Naturales 134.
- En los videos: «más de 2.300 aspirantes registrados» y «más de 1.500 simulacros» (redondeo hacia abajo).

## Concurso docente (prensa, nov 2026 · sujeto a cambios, verificar en cnsc.gov.co / SIMO)
- La CNSC ajustó el cronograma (sep 2026, Decreto Legislativo 1384 de 2026): **inscripciones a comienzos de 2027**
  (enero–febrero) y **pruebas escritas en el segundo semestre de 2027**; fechas exactas sin definir.
  Fuentes: El Espectador, RCN Radio, Valora Analitik (nov 2026).
- Inscripciones para personas con discapacidad: una guía independiente las ubica del 23 nov 2026 al 15 ene 2027 (no verificado
  en la CNSC → no usar en videos).

## Ejemplo real de pregunta (captura 5–6, cargo Rector, Entrenamiento Focalizado)
Caso: deserción del 10 % anual; el 40 % de desertores cita dificultades económicas, el 30 % bajo rendimiento y el 30 % razones
personales; el presupuesto de becas cubre al 25 %. Pregunta: estrategia más efectiva para reducir la deserción en un 15 % sin
aumentar becas. Correcta: **B** (tutorías personalizadas para el 50 % con bajo rendimiento, financiadas con ahorro de
extracurriculares). Retroalimentación: «El Rector debe priorizar estrategias basadas en datos y que ataquen las causas raíz».
