import {validarEpisodio} from '../src/comun/motor-plan';
import {EPISODIOS} from '../src/edwin-o/episodios/index';

let total = 0;
for (const esp of EPISODIOS) {
  const errores = validarEpisodio(esp);
  total += errores.length;
  console.log(`${errores.length ? '✗' : '✓'} ${esp.slug} (${esp.manifest.escenas.length} escenas, ${(esp.manifest.duracion_total / 60).toFixed(1)} min)`);
  errores.forEach((e) => console.log('   ' + e));
}
process.exit(total ? 1 : 0);
