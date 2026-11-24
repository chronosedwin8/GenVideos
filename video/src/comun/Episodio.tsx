import React from 'react';
import {AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig} from 'remotion';
import {Fondo, Subtitulos, type VarianteFondo} from './Basicos';
import type {EscenaProps, Manifest, Palabra, Tema} from './tipos';
import {crearT} from './tiempo';

export type DefEscena = {
  fondo?: VarianteFondo;
  Visual: React.FC<EscenaProps>;
  /** Ocultar subtítulos en esta escena (p. ej. cortinilla). */
  sinSubtitulos?: boolean;
};

/** Duración en frames de un episodio a partir de su manifest. */
export const duracionEpisodio = (m: Manifest, fps = 30, colaSegundos = 1) => Math.ceil((m.duracion_total + colaSegundos) * fps);

/**
 * Arma un episodio: una <Sequence> por escena del manifest, con su audio, fondo, visual y subtítulos.
 * `base` es la carpeta dentro de public/ donde están los mp3 (p. ej. 'edwin-o/horas-extra-excel').
 */
export const Episodio: React.FC<{
  tema: Tema;
  manifest: Manifest;
  base: string;
  escenas: Record<string, DefEscena>;
  musica?: string;
  volumenMusica?: number;
}> = ({tema, manifest, base, escenas, musica, volumenMusica = 0.08}) => {
  const {fps} = useVideoConfig();
  const pausa = manifest.pausa_entre_escenas ?? 0.4;
  return (
    <AbsoluteFill style={{background: '#000'}}>
      {manifest.escenas.map((e, i) => {
        const def = escenas[e.num];
        const desde = Math.round(e.inicio * fps);
        const siguiente = manifest.escenas[i + 1];
        const hasta = siguiente ? Math.round(siguiente.inicio * fps) : Math.ceil((e.inicio + e.duracion + pausa + 1) * fps);
        const palabras: Palabra[] = e.palabras;
        const props: EscenaProps = {tema, palabras, duracion: e.duracion, t: crearT(palabras)};
        return (
          <Sequence key={e.num} from={desde} durationInFrames={Math.max(1, hasta - desde)} name={`${e.num} · ${e.titulo}`}>
            <Fondo tema={tema} variante={def?.fondo ?? 'naranja'} semilla={e.num} />
            {def ? <def.Visual {...props} /> : <EscenaPendiente titulo={`${e.num} · ${e.titulo}`} />}
            {!def?.sinSubtitulos ? <Subtitulos tema={tema} palabras={palabras} /> : null}
            <Audio src={staticFile(`${base}/${e.audio}`)} />
          </Sequence>
        );
      })}
      {musica ? <Audio src={staticFile(musica)} volume={volumenMusica} loop /> : null}
    </AbsoluteFill>
  );
};

const EscenaPendiente: React.FC<{titulo: string}> = ({titulo}) => (
  <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 60, fontFamily: 'Poppins'}}>
    Visual pendiente: {titulo}
  </AbsoluteFill>
);
