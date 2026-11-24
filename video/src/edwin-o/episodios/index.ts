import type {EspecEpisodio} from '../../comun/motor-tipos';
import {episodio as formulasConIA} from './formulas-con-ia';
import {episodio as funcionesAhorranHoras} from './funciones-que-ahorran-horas';
import {episodio as pythonAutomatizaExcel} from './python-automatizar-excel';
import {episodio as excelEstaMuerto} from './excel-esta-muerto';
import {episodio as agruparPor} from './agruparpor-excel';
import {episodio as pythonIfElifElse} from './python-if-elif-else';
import {episodio as pythonEnExcel} from './python-en-excel';
import {episodio as erroresComunesExcel} from './errores-comunes-excel';

/**
 * Episodios hechos con el motor declarativo. Para agregar uno:
 *   1. crea edwin-o/episodios/<slug>.ts que exporte `episodio: EspecEpisodio`
 *   2. impórtalo y agrégalo a la lista de abajo
 *   3. valida con:  npm run validar
 */
export const EPISODIOS: EspecEpisodio[] = [formulasConIA, funcionesAhorranHoras, pythonAutomatizaExcel, excelEstaMuerto, agruparPor, pythonIfElifElse, pythonEnExcel, erroresComunesExcel];
