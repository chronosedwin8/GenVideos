import type {EspecEpisodio} from '../../comun/motor-tipos';
import type {Manifest} from '../../comun/tipos';
import manifest from '../../../public/edwin-o/claude-code-movil/manifest.json';

/* Datos verificados en canales/edwin-o/episodios/claude-code-movil/ficha.md (docs oficiales de Remote Control).
   La interfaz es una recreación; la salida de reportes.py es real (ejecutada el 25 nov 2026). */
const QR = 'edwin-o/claude-code-movil/qr-claude-code.png';
const VERDE = '#7CFC9A';
const SALIDA = [
  'Listo: Reporte Arequipa.xlsx (173 ventas)',
  'Listo: Reporte Barranquilla.xlsx (226 ventas)',
  'Listo: Reporte Bogotá.xlsx (193 ventas)',
  'Listo: Reporte CDMX.xlsx (220 ventas)',
  'Listo: Reporte Cali.xlsx (192 ventas)',
  'Listo: Reporte Guadalajara.xlsx (200 ventas)',
  'Listo: Reporte Lima.xlsx (183 ventas)',
  'Listo: Reporte Medellín.xlsx (226 ventas)',
  'Listo: Reporte Monterrey.xlsx (197 ventas)',
  'Listo: Reporte Puebla.xlsx (199 ventas)',
  'Listo: Reporte Quito.xlsx (197 ventas)',
  'Listo: Reporte Santiago.xlsx (194 ventas)',
];

export const episodio: EspecEpisodio = {
  canal: 'edwin-o',
  slug: 'claude-code-movil',
  id: 'EdwinO-ClaudeCodeMovil',
  manifest: manifest as Manifest,
  escenas: {
    '01': {
      bloques: [
        {en: 0, tipo: 'titulo', lineas: [{texto: '12 REPORTES', color: 'amarillo', tamano: 190}, {texto: '¡PARA YA!', color: 'blanco', tamano: 130}]},
        {en: 'sacas', tipo: 'movil', pestana: 'Code', mensajes: [
          {rol: 'yo', texto: 'Genera los reportes de febrero 📊', desde: 'escribes'},
          {rol: 'ia', texto: 'Ejecutando `python reportes.py` en tu PC…', desde: 'computador#2'},
        ], notas: [{texto: 'Tu PC de la oficina hace el trabajo', icono: '💻', desde: 'computador#2'}]},
        {en: 'escritorio', capa: true, tipo: 'pildora', texto: '🚫 Sin escritorio remoto · 🚫 sin abrir puertos', abajo: true, tamano: 46},
      ],
    },
    '02': {
      bloques: [
        {en: 0, tipo: 'cortinilla', titulo: 'CLAUDE CODE'},
        {en: 'hoy', tipo: 'titulo', lineas: [{texto: 'CLAUDE CODE', color: 'amarillo', tamano: 190}, {texto: 'desde tu móvil', color: 'turquesa', tamano: 120}], sub: 'Remote Control'},
        {en: 'instalarlo', tipo: 'lista', titulo: 'Hoy aprendes a…', items: [
          {texto: 'Instalarlo', desde: 'instalarlo', icono: '⬇️'},
          {texto: 'Conectar el teléfono', desde: 'conectar', icono: '📱'},
          {texto: 'Mandarle tareas reales', desde: 'mandarle', icono: '✅'},
          {texto: 'Cuidar la seguridad', desde: 'seguridad', icono: '🔒'},
        ]},
      ],
    },
    '03': {
      bloques: [
        {en: 0, tipo: 'cronologia', titulo: 'Remote Control', items: [
          {fecha: '24 feb 2026', texto: 'Anthropic lo anuncia (vista previa)', desde: 'veinticuatro', icono: '📣', color: 'turquesa'},
          {fecha: 'Después', texto: 'Primero Max, luego Pro', desde: 'primero', icono: '🔑', color: 'amarillo'},
          {fecha: 'Hoy', texto: 'Pro, Max, Ultra, Team y Enterprise', desde: 'hoy', icono: '✅', color: 'verde'},
        ]},
        {en: 'cambia', capa: true, tipo: 'pildora', texto: 'Ya no necesitas estar frente a la pantalla', abajo: true, tamano: 46},
      ],
    },
    '04': {
      fondo: 'azul',
      bloques: [
        {en: 0, tipo: 'tarjeta', icono: '🎬', titulo: 'Este canal se hace con Claude Code', texto: 'Guion, voz y animación salen de un proyecto en mi computador. Y muchas veces lo reviso desde el celular.', ancho: 1500},
        {en: 'horas', capa: true, tipo: 'pildora', texto: '⏱️ Herramientas que te devuelven horas', abajo: true, tamano: 46},
      ],
    },
    '05': {
      bloques: [
        {en: 0, tipo: 'comparar', titulo: '¿Qué es?', izq: {titulo: 'Remote Control', icono: '📱', color: 'verde', items: [
          {texto: 'Corre en TU computador', desde: 'corriendo', icono: '✓'},
          {texto: 'Tus archivos no salen de ahí', desde: 'archivos', icono: '✓'},
          {texto: 'El celular es el control remoto', desde: 'remoto', icono: '✓'},
        ]}, der: {titulo: 'Claude Code en la nube', icono: '☁️', color: 'turquesa', desde: 'distinto', items: [
          {texto: 'Corre en servidores de Anthropic', desde: 'servidores'},
          {texto: 'No necesita tu PC encendido', desde: 'encendido'},
        ]}},
      ],
    },
    '06': {
      bloques: [
        {en: 0, tipo: 'lista', titulo: 'Lo que necesitas', items: [
          {texto: 'Plan Pro, Max, Ultra, Team o Enterprise', desde: 'plan', icono: '💳'},
          {texto: 'Claude Code instalado en tu PC', desde: 'instalado', icono: '💻'},
          {texto: 'App de Claude (Android o iPhone)', desde: 'aplicacion', icono: '📱'},
          {texto: 'La MISMA cuenta en los dos', desde: 'misma', icono: '👤'},
        ]},
        {en: 'gratuito', capa: true, tipo: 'pildora', texto: '✗ El plan gratuito no incluye Claude Code', tamano: 46},
        {en: 'ojo', capa: true, tipo: 'pildora', texto: '✗ No funciona con una clave de API', abajo: true, tamano: 46},
      ],
    },
    '07': {
      paso: {n: 1, texto: 'Instala Claude Code'},
      fondo: 'oscuro',
      bloques: [
        {en: 0, tipo: 'terminal', titulo: 'PowerShell (Windows)', lineas: [
          {texto: 'PS> irm https://claude.ai/install.ps1 | iex', desde: 'powershell'},
          {texto: '# macOS / Linux:', desde: 'mac', color: '#999'},
          {texto: '$ curl -fsSL https://claude.ai/install.sh | bash', desde: 'mac+0.3'},
          {texto: 'PS> claude --version', desde: 'termine'},
          {texto: '2.1.x (Claude Code)', desde: 'numero', color: VERDE},
        ]},
        {en: 'administrador', capa: true, tipo: 'pildora', texto: '👍 No necesitas ser administrador', tamano: 44},
      ],
    },
    '08': {
      paso: {n: 2, texto: 'Abre tu carpeta'},
      fondo: 'oscuro',
      bloques: [
        {en: 0, tipo: 'terminal', titulo: 'PowerShell', lineas: [
          {texto: 'PS> cd Documentos\\Reportes', desde: 'carpeta'},
          {texto: 'PS> claude', desde: 'escribe'},
          {texto: '✳ Welcome to Claude Code', desde: 'escribe+0.8', color: '#D97757'},
          {texto: '> /login   (inicia sesión con tu cuenta de Claude)', desde: 'sesion'},
        ]},
        {en: 'detalle', capa: true, tipo: 'pildora', texto: '📁 Claude trabaja en la carpeta donde lo abres', abajo: true, tamano: 46},
      ],
    },
    '09': {
      paso: {n: 3, texto: 'Activa el control remoto'},
      fondo: 'oscuro',
      bloques: [
        {en: 0, tipo: 'terminal', titulo: 'Claude Code', lineas: [
          {texto: '> /remote-control', desde: 'barra'},
          {texto: '> /rc   (versión corta)', desde: 'corta'},
          {texto: 'Enable Remote Control? (y/n)  y', desde: 'pregunta'},
          {texto: '✓ Remote Control activo', desde: 'si', color: VERDE},
        ]},
        {en: 'enlace', tipo: 'imagenes', items: [{src: QR, pie: 'Escanéalo con tu celular 📱', desde: 'enlace', ancho: 380}]},
        {en: 'indicador', capa: true, tipo: 'pildora', texto: '🟢 /rc active', tamano: 52},
        {en: 0.5, capa: true, tipo: 'pildora', texto: 'Recreación', abajo: true, tamano: 30},
      ],
    },
    '10': {
      paso: {n: 4, texto: 'Conéctate desde el celular'},
      bloques: [
        {en: 0, tipo: 'movil', pestana: 'Code', items: [
          {texto: 'Cloud sessions', sub: 'Sesiones en la nube', desde: 'abre', icono: '☁️'},
          {texto: 'Reportes ventas', sub: 'Remote Control · tu PC', desde: 'busca', online: true, icono: '💻'},
        ], qr: {src: QR, desde: 'escanea', pie: 'o escanea el QR'}, notas: [
          {texto: 'Toca Code', desde: 'toca', icono: '👆'},
          {texto: '🟢 = en línea', desde: 'verde', icono: '💻'},
        ]},
      ],
    },
    '11': {
      paso: {n: 5, texto: 'Mándale una tarea'},
      bloques: [
        {en: 0, tipo: 'movil', pestana: 'Reportes ventas', mensajes: [
          {rol: 'yo', texto: 'Ejecuta reportes.py y dime cuántos reportes salieron', desde: 'escribo'},
          {rol: 'ia', texto: 'Voy a ejecutar `python reportes.py` en tu computador…', desde: 'lee'},
        ], notas: [
          {texto: 'El script del video de Python + Excel', desde: 'programa', icono: '🐍'},
          {texto: 'Se ejecuta en tu PC, no en el celular', desde: 'ejecuta', icono: '💻'},
        ]},
      ],
    },
    '12': {
      fondo: 'oscuro',
      bloques: [
        {en: 0, tipo: 'terminal', titulo: 'Tu PC · python reportes.py', ancho: 1300, lineas: SALIDA.map((texto, i) => ({texto, desde: 'computador+' + (0.3 + i * 0.35).toFixed(2), color: VERDE}))},
        {en: 'celular', tipo: 'movil', pestana: 'Reportes ventas', mensajes: [
          {rol: 'yo', texto: 'Ejecuta reportes.py y dime cuántos reportes salieron', desde: 0},
          {rol: 'ia', texto: '✅ Listo: 12 reportes en la carpeta `reportes`, uno por ciudad.', desde: 'resumen'},
        ], notas: [{texto: 'Los archivos quedan en tu computador', desde: 'archivos', icono: '📁'}]},
      ],
    },
    '13': {
      bloques: [
        {en: 0, tipo: 'cuadricula', titulo: 'Modos de permisos', items: [
          {icono: '✋', texto: 'Manual: pregunta todo', desde: 'manual'},
          {icono: '✏️', texto: 'Aceptar ediciones', desde: 'aceptar'},
          {icono: '🗺️', texto: 'Plan: primero propone', desde: 'plan'},
          {icono: '⚡', texto: 'Automático', desde: 'automatico'},
        ]},
        {en: 'celular', capa: true, tipo: 'pildora', texto: '🔒 Desde la app NO se pueden saltar los permisos', abajo: true, tamano: 44},
      ],
    },
    '14': {
      bloques: [
        {en: 0, tipo: 'movil', items: [
          {texto: 'Claude necesita tu aprobación', sub: 'Reportes ventas · ahora', desde: 'aviso', icono: '🔔'},
          {texto: 'Tarea terminada ✅', sub: 'Reportes ventas', desde: 'suena', icono: '🔔'},
        ], notas: [
          {texto: 'En el PC: `/config`', desde: 'config', icono: '⚙️'},
          {texto: 'Activa las notificaciones', desde: 'notificaciones', icono: '🔔'},
        ]},
      ],
    },
    '15': {
      fondo: 'oscuro',
      bloques: [
        {en: 0, tipo: 'terminal', titulo: 'Claude Code', lineas: [
          {texto: '> /config', desde: 'config'},
          {texto: 'Enable Remote Control for all sessions:  on', desde: 'todas', color: VERDE},
          {texto: 'PS> claude remote-control', desde: 'servidor'},
          {texto: '[espacio] → muestra el código QR', desde: 'espaciadora', color: '#FFE500'},
        ]},
      ],
    },
    '16': {
      bloques: [
        {en: 0, tipo: 'tarjetas', titulo: 'También desde el navegador', items: [
          {icono: '🌐', titulo: 'claude.ai/code', texto: 'Busca tu sesión por el nombre', desde: 'navegador'},
          {icono: '🔁', titulo: 'Misma conversación', texto: 'Con el mismo historial', desde: 'historial'},
          {icono: '🏷️', titulo: 'Nombre claro', texto: '`/remote-control Reportes ventas`', desde: 'nombre#2'},
        ]},
      ],
    },
    '17': {
      bloques: [
        {en: 0, tipo: 'tarjetas', titulo: '¿Es seguro?', items: [
          {icono: '🔒', titulo: 'Solo salida HTTPS', texto: 'No abre puertos de entrada', desde: 'salida'},
          {icono: '📄', titulo: 'La conversación', texto: 'Se guarda en Anthropic mientras está conectada', desde: 'conversacion'},
          {icono: '📱', titulo: 'Dispositivos de confianza', texto: 'Opción para exigirlos', desde: 'proteccion'},
        ]},
      ],
    },
    '18': {
      bloques: [
        {en: 0, tipo: 'errores', titulo: 'Si no te funcionó', items: [
          {mal: 'Cerraste la terminal', bien: 'Déjala abierta: la sesión vive ahí', desde: 'cierras'},
          {mal: 'El portátil se suspendió', bien: 'Se reconecta solo al volver', desde: 'suspende'},
          {mal: 'Entraste con clave de API', bien: 'Usa tu cuenta: `/login`', desde: 'clave'},
          {mal: 'Plan gratuito', bien: 'Necesitas Pro o superior', desde: 'gratuito'},
        ]},
      ],
    },
    '19': {
      bloques: [
        {en: 0, tipo: 'cuadricula', titulo: 'Ideas para tu oficina', items: [
          {icono: '📊', texto: 'Generar reportes de Excel', desde: 'reportes'},
          {icono: '🐍', texto: 'Correr tus scripts de Python', desde: 'programas'},
          {icono: '🧹', texto: 'Limpiar un archivo desordenado', desde: 'limpiar'},
          {icono: '📝', texto: 'Resumir un documento largo', desde: 'resumir'},
          {icono: '🔎', texto: 'Revisar una hoja con errores', desde: 'revisar'},
          {icono: '📱', texto: 'Un dato en plena reunión', desde: 'reunion'},
        ]},
        {en: 'aprendes', tipo: 'titulo', lineas: [{texto: 'SI NO LO APRENDES', color: 'blanco', tamano: 130}, {texto: 'AHORA, TE EXTINGUES', color: 'amarillo', tamano: 150}]},
      ],
    },
    '20': {
      bloques: [
        {en: 0, tipo: 'resumen', ideas: [
          {texto: 'Corre en TU computador', desde: 'corriendo'},
          {texto: '`/rc` y escaneas el QR', desde: 'escribes'},
          {texto: 'Tú decides los permisos', desde: 'decides'},
        ]},
      ],
    },
    '21': {
      bloques: [
        {en: 0, tipo: 'tienda'},
        {en: 'proximo', tipo: 'cierre', siguiente: 'Etiquetas con QR y código de barras en Excel', suscribir: 'suscribete', web: 'proximo+0.5'},
      ],
    },
  },
  shorts: [
    {id: 'short-1', escena: '10', gancho: [{texto: 'Controla tu PC', color: 'blanco', tamano: 100}, {texto: 'DESDE EL CELULAR', color: 'amarillo', tamano: 120}]},
    {id: 'short-2', escena: '17', gancho: [{texto: '¿Claude Code en', color: 'blanco', tamano: 96}, {texto: 'EL CELULAR', color: 'amarillo', tamano: 130}, {texto: 'es seguro?', color: 'blanco', tamano: 96}]},
  ],
  miniatura: {
    lineas: [{texto: 'CLAUDE CODE', color: 'amarillo'}, {texto: 'DESDE TU', color: 'blanco', tamano: 90}, {texto: 'CELULAR', color: 'turquesa'}],
    pildora: 'Remote Control',
    insignia: 'PASO A PASO',
    codigo: '> /remote-control\n✓ Remote Control activo\n📱 Escanea el QR\n> Genera los reportes\nListo: 12 reportes',
  },
};
