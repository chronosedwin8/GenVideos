import {loadFont as cargarAnton} from '@remotion/google-fonts/Anton';
import {loadFont as cargarPoppins} from '@remotion/google-fonts/Poppins';
import {loadFont as cargarMono} from '@remotion/google-fonts/JetBrainsMono';
import {loadFont as cargarBarras} from '@remotion/google-fonts/LibreBarcode39';

// Se cargan una sola vez al importar este módulo.
cargarAnton('normal', {subsets: ['latin']});
cargarPoppins('normal', {weights: ['500', '600', '800'], subsets: ['latin']});
cargarMono('normal', {weights: ['500', '700'], subsets: ['latin']});
// Fuente de código de barras (Code 39) para mostrar el método sin internet: ="*"&A2&"*".
export const FUENTE_BARRAS = cargarBarras('normal', {subsets: ['latin']}).fontFamily;

export const fuentesListas = true;
