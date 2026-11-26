import {validarEpisodio} from '../src/comun/motor-plan';
import {EPISODIOS} from '../src/edwin-o/episodios/index';
import {validarVideoF} from '../src/fundales/motor-plan';
import {VIDEOS_FUNDALES} from '../src/fundales/videos/index';

let total = 0;
for (const esp of EPISODIOS) {
  const errores = validarEpisodio(esp);
  total += errores.length;
  console.log(`${errores.length ? '✗' : '✓'} ${esp.slug} (${esp.manifest.escenas.length} escenas, ${(esp.manifest.duracion_total / 60).toFixed(1)} min)`);
  errores.forEach((e) => console.log('   ' + e));
}
for (const v of VIDEOS_FUNDALES) {
  const errores = validarVideoF(v);
  total += errores.length;
  console.log(`${errores.length ? '✗' : '✓'} fundales/${v.slug} (${v.manifest.escenas.length} escenas, ${v.manifest.duracion_total.toFixed(0)} s)`);
  errores.forEach((e) => console.log('   ' + e));
}
process.exit(total ? 1 : 0);
