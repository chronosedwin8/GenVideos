import {loadFont as cargarAnton} from '@remotion/google-fonts/Anton';
import {loadFont as cargarPoppins} from '@remotion/google-fonts/Poppins';
import {loadFont as cargarMono} from '@remotion/google-fonts/JetBrainsMono';

// Se cargan una sola vez al importar este módulo.
cargarAnton('normal', {subsets: ['latin']});
cargarPoppins('normal', {weights: ['500', '600', '800'], subsets: ['latin']});
cargarMono('normal', {weights: ['500', '700'], subsets: ['latin']});

export const fuentesListas = true;
