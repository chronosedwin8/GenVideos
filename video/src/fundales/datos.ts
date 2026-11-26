// Contenido real de la plataforma (capturas 5, 6, 8, 13, 16, 17 de public/Imagenes y código de entrenador-docente-cnsc).
// Nada de esto se inventa: si un texto no está aquí, no se muestra como si fuera de la app.

export const PREGUNTA_REAL = {
  cargo: 'Rector',
  competencia: 'Razonamiento Cuantitativo',
  contexto:
    'Una institución educativa presenta una tasa de deserción del 10% anual. Los datos muestran que el 40% de los estudiantes desertores citan dificultades económicas, mientras que el 30% menciona problemas de rendimiento académico y el 30% restante, razones personales. El presupuesto actual para becas cubre al 25% del estudiantado.',
  pregunta:
    'Considerando la tendencia actual de deserción y las proyecciones, ¿cuál es la estrategia más efectiva para reducir la deserción en un 15% en el próximo año, manteniendo la inversión en becas al mismo nivel?',
  opciones: [
    {id: 'A', texto: 'Aumentar la inversión en becas en un 20%, priorizando a estudiantes con mejor rendimiento académico, asumiendo que esto impactará positivamente en la deserción por problemas económicos.'},
    {id: 'B', texto: 'Implementar un programa de tutorías personalizadas para el 50% de los estudiantes con bajo rendimiento, financiándolo con recursos ahorrados de actividades extracurriculares, asumiendo que esto reducirá la deserción por problemas académicos.'},
    {id: 'C', texto: 'Combinar un programa de apoyo psicológico para el 30% de los estudiantes con problemas personales y un sistema de alertas tempranas para identificar estudiantes en riesgo de deserción, redistribuyendo fondos de mantenimiento.'},
    {id: 'D', texto: 'Mantener la inversión en becas y enfocarse en mejorar la infraestructura deportiva del colegio, argumentando que un ambiente más atractivo incentivará a los estudiantes a permanecer en la institución.'},
  ],
  correcta: 'B',
  explicacion:
    'La opción B aborda directamente una de las principales causas de deserción (bajo rendimiento) a través de tutorías, una estrategia probada para mejorar el rendimiento académico. El Rector debe priorizar estrategias basadas en datos y que ataquen las causas raíz del problema. Aumentar becas sin atacar el rendimiento, o mejorar la infraestructura sin evidencia de impacto en la deserción, son menos efectivos.',
};

/** Resumen corto de las opciones (para el quiz vertical). */
export const OPCIONES_CORTAS = [
  {id: 'A', texto: 'Más becas para los de mejor rendimiento'},
  {id: 'B', texto: 'Tutorías para estudiantes con bajo rendimiento'},
  {id: 'C', texto: 'Apoyo psicológico + alertas tempranas'},
  {id: 'D', texto: 'Mejorar la infraestructura deportiva'},
];

export const COACH_REAL = {
  fortalezas: [
    'Alta capacidad en Lectura Crítica, evidenciada en múltiples simulacros con puntajes perfectos.',
    'Comprensión sólida de la normatividad general aplicable al rol de Rector, reflejada en el promedio general del 74%.',
  ],
  mejorar: [
    'Debilidad significativa en Razonamiento Cuantitativo, área que requiere atención prioritaria e intensiva.',
    'Variabilidad en el rendimiento de Lectura Crítica, con resultados recientes fluctuantes (desde 60% hasta 100%), indicando inconsistencia.',
  ],
  recomendaciones: [
    'Implementar un plan de estudio intensivo en Razonamiento Cuantitativo, enfocándose en la resolución de problemas y el manejo de datos estadísticos.',
    'Profundizar en estrategias de Lectura Crítica para asegurar un rendimiento consistente y minimizar la variabilidad en los resultados.',
    'Realizar simulacros completos enfocándose en la gestión del tiempo y la identificación de preguntas con mayor ponderación.',
    'Revisar casos prácticos de gestión escolar que involucren la aplicación de la normatividad vigente.',
  ],
  plan: 'Prioridad: Razonamiento Cuantitativo. Dedica 2 horas diarias a ejercicios prácticos. Lectura Crítica: 1 hora diaria, enfocándose en textos complejos y preguntas inferenciales. Normatividad: 30 minutos diarios, revisando artículos clave (Ley 115, Ley 715, Decreto 1075). Simulacro completo el fin de semana. Tip clave: Identifica tus errores comunes y crea tarjetas de repaso.',
  normativa: ['Ley 115/1994 (Artículos 129-132)', 'Ley 715/2001', 'Decreto 1075/2015', 'Guía 34 MEN', 'Decreto 4791/2008 (FSE)'],
};

export const ASISTENTE_REAL = {
  pregunta: '¿Se le puede quitar un celular a un niño en clases?',
  respuesta: [
    'Respuesta directa: Sí, la institución educativa puede regular el uso de celulares, incluyendo su retención temporal, si así lo establece el manual de convivencia y la medida es pedagógica.',
    'Fundamento legal: Ley 1620 de 2013, Art. 17 (Reglamento o Manual de Convivencia); Constitución Política, Art. 67.',
    'Consideración práctica: El manual de convivencia debe especificar las faltas relacionadas con el uso de dispositivos electrónicos y los correctivos pedagógicos aplicables.',
  ],
};

export const LEYES = [
  {titulo: 'Ley 115 de 1994', sub: 'Ley General de Educación', desc: 'Norma rectora del sistema educativo. Define fines de la educación, organización curricular y evaluación.', icono: 'menu_book'},
  {titulo: 'Decreto 1278 de 2002', sub: 'Estatuto de Profesionalización Docente', desc: 'Regula el concurso de méritos, evaluación de desempeño, y escalafón para nuevos docentes.', icono: 'gavel'},
  {titulo: 'Decreto 1075 de 2015', sub: 'Decreto Único Reglamentario', desc: 'Compila toda la normativa del sector educativo. Es la "Biblia" administrativa del sector.', icono: 'folder_managed'},
  {titulo: 'Ley 1620 de 2013', sub: 'Convivencia Escolar', desc: 'Crea el sistema nacional de convivencia escolar y formación para los derechos humanos.', icono: 'diversity_3'},
];

export const RUTA_DOCENTE = [
  {doc: 'Ley 115 de 1994', foco: 'Fines de la educación y organización curricular (Arts 1-25).', prioridad: 'Alta'},
  {doc: 'Decreto 1290 de 2009', foco: 'Sistema Institucional de Evaluación de Estudiantes (SIEE).', prioridad: 'Alta'},
  {doc: 'Estándares Básicos de Competencia', foco: 'Conocimiento específico del área a enseñar.', prioridad: 'Alta'},
  {doc: 'Decreto 1421 de 2017', foco: 'Atención educativa a la población con discapacidad (PIAR).', prioridad: 'Media'},
  {doc: 'Ley 1620 de 2013', foco: 'Ruta de atención integral para la convivencia escolar.', prioridad: 'Media'},
];

export const COMPETENCIAS: Record<string, string[]> = {
  'Docente de Aula': ['Lectura Crítica', 'Razonamiento Cuantitativo', 'Competencias Pedagógicas', 'Conocimientos Específicos', 'Prueba Psicotécnica', 'Competencias Comportamentales'],
  Rector: ['Lectura Crítica', 'Razonamiento Cuantitativo', 'Gestión Directiva', 'Gestión Administrativa', 'Gestión Financiera', 'Gestión Académica', 'Competencias Comportamentales'],
  Coordinador: ['Lectura Crítica', 'Razonamiento Cuantitativo', 'Gestión Académica', 'Convivencia Escolar', 'Educación Inclusiva', 'Competencias Comportamentales'],
  'Docente Orientador': ['Lectura Crítica', 'Orientación Escolar', 'Convivencia Escolar', 'Intervención Psicosocial', 'Educación Inclusiva', 'Competencias Comportamentales'],
};

export const PLANES = [
  {nombre: 'Free', etiqueta: 'Para empezar', precio: 0, conEntrevista: 0, dia: null as number | null, mes: 2, preguntas: 5, color: '#0d7ff2', icono: 'lock_open'},
  {nombre: 'Básico', etiqueta: 'Esencial', precio: 100, conEntrevista: 130, dia: 1, mes: 8, preguntas: 20, color: '#3b82f6', icono: 'school'},
  {nombre: 'Intermedio', etiqueta: 'Recomendado', precio: 180, conEntrevista: 240, dia: 2, mes: 20, preguntas: 30, color: '#1e293b', icono: 'auto_awesome'},
  {nombre: 'Avanzado', etiqueta: 'Profesional', precio: 300, conEntrevista: 390, dia: 3, mes: 40, preguntas: 50, color: '#22c55e', icono: 'verified'},
];

/** Uso real (panel de administración, 26 nov 2026). */
export const USO = {usuarios: 2357, simulacros: 1564, porCargo: [['Docentes de aula', 1992], ['Orientadores', 217], ['Rectores', 79], ['Coordinadores', 69]] as [string, number][]};

export const VIDEOS_MATE = [
  {titulo: 'Introducción a la prueba de Aptitud Matemática o Numérica', tema: 'Importancia de la prueba'},
  {titulo: 'En qué consiste la prueba de Aptitud Matemática o numérica', tema: 'Generalidades de la prueba'},
  {titulo: 'Multiplicación abreviada X 10 - 100 - 1000', tema: 'Multiplicación abreviada'},
  {titulo: 'División abreviada por 10 - 100 - 1000', tema: 'División abreviada'},
  {titulo: 'Cómo calcular porcentajes', tema: 'Calcular porcentajes'},
  {titulo: 'Cómo calcular porcentajes - parte 2', tema: 'Calcular porcentajes'},
];

/** Historial ilustrativo del tablero (captura 9: 28 pruebas, 74 %, mejor 100 %; curvas reales de la captura). */
export const TABLERO = {
  pruebas: 28,
  promedio: 74,
  mejor: 100,
  diagnosticos: [80, 80, 100],
  simulacros: [100, 100, 80, 80, 40],
  consolidado: [
    ['Gestión Financiera', 92],
    ['Conocimientos Específicos', 88],
    ['Gestión Académica', 86],
    ['Gestión Administrativa', 84],
    ['Competencias Pedagógicas', 80],
    ['Lectura Crítica', 76],
    ['Competencias Comportamentales', 68],
    ['Gestión Directiva', 62],
    ['Razonamiento Cuantitativo', 40],
  ] as [string, number][],
};
