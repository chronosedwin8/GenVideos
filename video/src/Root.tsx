import React from 'react';
import {Composition, Folder, Still} from 'remotion';
import './comun/fuentes';
import {MiniHoja, Miniatura} from './comun/Miniatura';
import {DemoEdwinO} from './edwin-o/Demo';
import {HorasExtraExcel, manifestHorasExtra, SHORTS_HORAS_EXTRA, ShortHorasExtra} from './edwin-o/episodios/HorasExtraExcel';
import {duracionShort} from './comun/Short';
import {duracionEpisodio} from './comun/Episodio';
import {temaEdwinO} from './edwin-o/tema';

// Los episodios se registran aquí (uno por video). Ver .claude/skills/construir-escenas.
export const RemotionRoot: React.FC = () => (
  <>
    <Folder name="edwin-o">
      <Composition id="EdwinO-HorasExtraExcel" component={HorasExtraExcel} durationInFrames={duracionEpisodio(manifestHorasExtra)} fps={30} width={1920} height={1080} />
      {SHORTS_HORAS_EXTRA.map((sh, i) => (
        <Composition key={sh.id} id={`EdwinO-HorasExtraExcel-${sh.id}`} component={ShortHorasExtra} defaultProps={{n: i}} durationInFrames={duracionShort(sh.escena, sh.recorte)} fps={30} width={1080} height={1920} />
      ))}
      <Still
        id="EdwinO-HorasExtraExcel-Miniatura"
        width={1280}
        height={720}
        component={() => (
          <Miniatura
            tema={temaEdwinO}
            lineas={[
              {texto: 'HORAS', color: temaEdwinO.colores.acento},
              {texto: 'EXTRA', color: temaEdwinO.colores.acento2},
              {texto: 'automáticas', color: temaEdwinO.colores.acento3, tamano: 96},
            ]}
            pildora="en Excel"
            insignia="+ TURNO NOCHE"
            apoyo={
              <MiniHoja
                formula="=RESIDUO(C7-B7;1)"
                filas={[
                  ['Día', 'Horas', 'Extra'],
                  ['Lunes', '10:30', '2:30'],
                  ['Viernes', '12:15', '4:15'],
                  ['Sábado', '8:00', '0:00'],
                ]}
                resaltarFila={2}
              />
            }
          />
        )}
      />
      <Composition id="EdwinO-Demo" component={DemoEdwinO} durationInFrames={1000} fps={30} width={1920} height={1080} />
      <Still
        id="EdwinO-MiniaturaDemo"
        width={1280}
        height={720}
        component={() => (
          <Miniatura
            tema={temaEdwinO}
            lineas={[
              {texto: 'HORAS', color: temaEdwinO.colores.acento},
              {texto: 'EXTRA', color: temaEdwinO.colores.acento2},
              {texto: 'automáticas', color: temaEdwinO.colores.acento3, tamano: 96},
            ]}
            pildora="en Excel"
            apoyo={
              <MiniHoja
                formula="=RESIDUO(C2-B2;1)"
                filas={[
                  ['Nombre', 'Horas', 'Extra'],
                  ['Ana', '11:30', '3:30'],
                  ['Luis', '9:00', '1:00'],
                  ['Marta', '8:00', '0:00'],
                ]}
                resaltarFila={1}
              />
            }
          />
        )}
      />
    </Folder>
  </>
);
