import type {EspecEpisodio} from '../../comun/motor-tipos';
import {episodio as formulasConIA} from './formulas-con-ia';
import {episodio as funcionesAhorranHoras} from './funciones-que-ahorran-horas';
import {episodio as pythonAutomatizaExcel} from './python-automatizar-excel';
import {episodio as excelEstaMuerto} from './excel-esta-muerto';
import {episodio as agruparPor} from './agruparpor-excel';
import {episodio as pythonIfElifElse} from './python-if-elif-else';
import {episodio as pythonEnExcel} from './python-en-excel';
import {episodio as erroresComunesExcel} from './errores-comunes-excel';
import {episodio as claudeCodeMovil} from './claude-code-movil';
import {episodio as etiquetasQR} from './etiquetas-qr-excel';
import {episodio as queEsPowerQuery} from './que-es-power-query';
import {episodio as combinarDatosIA} from './combinar-datos-ia';
import {episodio as dueloChatGPTClaude} from './duelo-chatgpt-claude';
import {episodio as probabilidadBinomial} from './probabilidad-binomial';
import {episodio as powerQuery10} from './power-query-10-minutos';
import {episodio as chatGPTEnExcel} from './chatgpt-en-excel';

/**
 * Episodios hechos con el motor declarativo. Para agregar uno:
 *   1. crea edwin-o/episodios/<slug>.ts que exporte `episodio: EspecEpisodio`
 *   2. impórtalo y agrégalo a la lista de abajo
 *   3. valida con:  npm run validar
 */
export const EPISODIOS: EspecEpisodio[] = [formulasConIA, funcionesAhorranHoras, pythonAutomatizaExcel, excelEstaMuerto, agruparPor, pythonIfElifElse, pythonEnExcel, erroresComunesExcel, claudeCodeMovil, etiquetasQR, queEsPowerQuery, combinarDatosIA, dueloChatGPTClaude, probabilidadBinomial, powerQuery10, chatGPTEnExcel];
