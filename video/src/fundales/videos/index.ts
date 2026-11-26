import type {VideoF} from '../motor-tipos';
import {video as v01} from './v01-primer-simulacro';
import {video as v02} from './v02-tres-modos';
import {video as v03} from './v03-resultados-estadisticas';
import {video as v04} from './v04-coach-ia';
import {video as v05} from './v05-normativa';
import {video as v06} from './v06-entrevista';
import {v07, v08, v09, v10, v11, v12} from './v07-12-promos';

/** Videos del proyecto Fundales (Entrenador Docente). Cada uno se registra en 16:9 (-H), 9:16 (-V) y portadas. */
export const VIDEOS_FUNDALES: VideoF[] = [v01, v02, v03, v04, v05, v06, v07, v08, v09, v10, v11, v12];
