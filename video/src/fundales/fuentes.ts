import {continueRender, delayRender} from 'remotion';
import {loadFont as cargarPublicSans} from '@remotion/google-fonts/PublicSans';
import {loadFont as cargarNotoSans} from '@remotion/google-fonts/NotoSans';

// Tipografías reales de la app (index.html de entrenador-docente-cnsc).
export const PUBLIC = cargarPublicSans('normal', {weights: ['400', '500', '700', '800', '900'], subsets: ['latin']}).fontFamily;
export const NOTO = cargarNotoSans('normal', {weights: ['400', '500', '700'], subsets: ['latin']}).fontFamily;

// Íconos: Material Symbols Outlined, igual que la app (se cargan desde Google Fonts como en fundales.com).
export const ICONOS = 'Material Symbols Outlined';
const URL_ICONOS = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0&display=block';

if (typeof document !== 'undefined' && !document.getElementById('ms-iconos')) {
  const h = delayRender('Cargando Material Symbols');
  const link = document.createElement('link');
  link.id = 'ms-iconos';
  link.rel = 'stylesheet';
  link.href = URL_ICONOS;
  const listo = () => continueRender(h);
  link.onload = () => {
    document.fonts.load(`24px "${ICONOS}"`, 'school').then(listo, listo);
  };
  link.onerror = listo;
  document.head.appendChild(link);
}
