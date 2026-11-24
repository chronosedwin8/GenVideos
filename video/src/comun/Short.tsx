import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig} from 'remotion';
import {Fondo, type LineaTitulo, Pildora, Subtitulos, TituloContorno} from './Basicos';
import type {DefEscena} from './Episodio';
import type {EscenaManifest, Tema} from './tipos';
import {crearT, progreso, useSegundos} from './tiempo';

/** Duración en frames de un Short hecho con una escena (+1 s de cierre). */
export const duracionShort = (e: EscenaManifest, recorte = 0, fps = 30) => Math.ceil((e.duracion - recorte + 1.2) * fps);

/**
 * Short vertical 1080×1920 a partir de una escena del video largo (reutiliza su audio: no gasta créditos).
 * Arriba: gancho. Centro: la escena 16:9 escalada. Abajo: subtítulos grandes. Final: "Video completo en el canal".
 */
export const ShortEscena: React.FC<{
  tema: Tema;
  escena: EscenaManifest;
  base: string;
  def: DefEscena;
  gancho: LineaTitulo[];
  /** Segundos que se saltan al inicio de la escena (para empezar directo en el gancho). */
  recorte?: number;
}> = ({tema, escena, base, def, gancho, recorte = 0}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const escala = 1080 / 1920;
  const props = {tema, palabras: escena.palabras, duracion: escena.duracion, t: crearT(escena.palabras)};
  const finTxt = progreso(s, escena.duracion - recorte - 0.6, 0.4);
  return (
    <AbsoluteFill>
      <Fondo tema={tema} variante="naranja" />
      <AbsoluteFill style={{top: 120, height: 520, alignItems: 'center', justifyContent: 'center', padding: '0 40px'}}>
        <TituloContorno tema={tema} lineas={gancho} tamano={120} rotacion={-3} />
      </AbsoluteFill>
      <Sequence from={-Math.round(recorte * fps)} layout="none">
      <div style={{position: 'absolute', top: 700, left: 0, width: 1080, height: 1080 * (1080 / 1920), overflow: 'hidden', border: '8px solid #000', boxSizing: 'border-box', boxShadow: '0 20px 0 rgba(0,0,0,0.35)'}}>
        <div style={{position: 'relative', width: 1920, height: 1080, transform: `scale(${escala})`, transformOrigin: '0 0'}}>
          <Fondo tema={tema} variante={def.fondo ?? 'naranja'} semilla={escena.num} />
          <def.Visual {...props} />
        </div>
      </div>
      <AbsoluteFill style={{top: 1310, height: 420}}>
        <Subtitulos tema={tema} palabras={escena.palabras} maxPalabras={3} tamano={84} abajo={110} />
      </AbsoluteFill>
      <Audio src={staticFile(`${base}/${escena.audio}`)} />
      </Sequence>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 90, opacity: finTxt}}>
        <Pildora tema={tema} texto="Video completo en el canal 👆" tamano={60} desde={escena.duracion - recorte - 0.6} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
