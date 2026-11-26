import React from 'react';
import {Composition, Folder, Still} from 'remotion';
import './comun/fuentes';
import {MiniHoja, Miniatura} from './comun/Miniatura';
import {DemoEdwinO} from './edwin-o/Demo';
import {HorasExtraExcel, manifestHorasExtra, SHORTS_HORAS_EXTRA, ShortHorasExtra} from './edwin-o/episodios/HorasExtraExcel';
import {duracionShort} from './comun/Short';
import {duracionEpisodio} from './comun/Episodio';
import {temaEdwinO} from './edwin-o/tema';
import {EPISODIOS} from './edwin-o/episodios/index';
import {color, datosShort, EpisodioMotor, ShortMotor} from './comun/Motor';
import {MiniCodigo} from './comun/Bloques';
import './fundales/fuentes';
import {VIDEOS_FUNDALES} from './fundales/videos/index';
import {duracionF, PortadaFundales, VideoFundales} from './fundales/motor';

const buscar = (id: string) => EPISODIOS.find((e) => e.id === id)!;

const EpisodioPorId: React.FC<{id: string}> = ({id}) => <EpisodioMotor tema={temaEdwinO} esp={buscar(id)} />;
const ShortPorId: React.FC<{id: string; n: number}> = ({id, n}) => <ShortMotor tema={temaEdwinO} esp={buscar(id)} n={n} />;
const MiniaturaPorId: React.FC<{id: string}> = ({id}) => {
  const m = buscar(id).miniatura;
  return (
    <Miniatura
      tema={temaEdwinO}
      lineas={m.lineas.map((l) => ({...l, color: color(temaEdwinO, l.color)}))}
      pildora={m.pildora}
      insignia={m.insignia}
      apoyo={m.codigo ? <MiniCodigo codigo={m.codigo} /> : m.filas ? <MiniHoja filas={m.filas} formula={m.formula} resaltarFila={m.resaltarFila} /> : undefined}
    />
  );
};

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
      {EPISODIOS.map((esp) => (
        <Folder key={esp.id} name={esp.slug}>
          <Composition id={esp.id} component={EpisodioPorId} defaultProps={{id: esp.id}} durationInFrames={duracionEpisodio(esp.manifest)} fps={30} width={1920} height={1080} />
          {esp.shorts.map((sh, i) => {
            const d = datosShort(esp, i);
            return <Composition key={sh.id} id={`${esp.id}-${sh.id}`} component={ShortPorId} defaultProps={{id: esp.id, n: i}} durationInFrames={duracionShort(d.escena, d.recorte)} fps={30} width={1080} height={1920} />;
          })}
          <Still id={`${esp.id}-Miniatura`} component={MiniaturaPorId} defaultProps={{id: esp.id}} width={1280} height={720} />
        </Folder>
      ))}
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
    <Folder name="fundales">
      {VIDEOS_FUNDALES.map((vf) => (
        <React.Fragment key={vf.id}>
          <Composition id={`${vf.id}-H`} component={VideoFundales} defaultProps={{video: vf, formato: 'h' as const}} durationInFrames={duracionF(vf)} fps={30} width={1920} height={1080} />
          <Composition id={`${vf.id}-V`} component={VideoFundales} defaultProps={{video: vf, formato: 'v' as const}} durationInFrames={duracionF(vf)} fps={30} width={1080} height={1920} />
          <Still id={`${vf.id}-Portada-H`} component={PortadaFundales} defaultProps={{video: vf, formato: 'h' as const}} width={1280} height={720} />
          <Still id={`${vf.id}-Portada-V`} component={PortadaFundales} defaultProps={{video: vf, formato: 'v' as const}} width={1080} height={1920} />
        </React.Fragment>
      ))}
    </Folder>
  </>
);
