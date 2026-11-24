import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {Fondo, LogoEO, Pildora, type LineaTitulo, TituloContorno} from './Basicos';
import type {Tema} from './tipos';
import {contorno} from './tiempo';

export type MiniaturaProps = {
  tema: Tema;
  lineas: LineaTitulo[];
  pildora?: string;
  /** Ruta dentro de public/ (p. ej. 'edwin-o/edwin-foto.png'). Si no hay, se usa `apoyo`. */
  foto?: string;
  /** Elemento visual alternativo a la foto (maqueta de Excel, gráfico, código…). */
  apoyo?: React.ReactNode;
  insignia?: string;
};

/** Miniatura 1280×720 con el estilo actual del canal (componer como Still). */
export const Miniatura: React.FC<MiniaturaProps> = ({tema, lineas, pildora, foto, apoyo, insignia}) => (
  <AbsoluteFill>
    <Fondo tema={tema} variante="naranja" />
    <AbsoluteFill style={{left: 0, width: 560}}>
      {foto ? (
        <Img src={staticFile(foto)} style={{position: 'absolute', bottom: 0, left: -10, height: 690, objectFit: 'contain', filter: 'drop-shadow(10px 10px 0 rgba(0,0,0,0.35))'}} />
      ) : (
        <div style={{position: 'absolute', left: 30, top: 70, width: 520, height: 580, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{apoyo}</div>
      )}
    </AbsoluteFill>
    <AbsoluteFill style={{left: 520, width: 760, alignItems: 'center', justifyContent: 'center', paddingBottom: pildora ? 110 : 0}}>
      <TituloContorno tema={tema} lineas={lineas} tamano={150} rotacion={-4} desde={-5} />
    </AbsoluteFill>
    {pildora ? (
      <div style={{position: 'absolute', right: 40, bottom: 40}}>
        <Pildora tema={tema} texto={pildora} tamano={78} desde={-5} />
      </div>
    ) : null}
    {insignia ? (
      <div style={{position: 'absolute', right: 34, top: 28, background: tema.colores.rojo, color: 'white', fontFamily: tema.fuentes.titulo, fontSize: 52, padding: '4px 22px', borderRadius: 14, border: '5px solid #000', transform: 'rotate(6deg)', textShadow: contorno(2, '#000', false)}}>
        {insignia}
      </div>
    ) : null}
    <div style={{position: 'absolute', left: 24, top: 22, transform: 'scale(0.5)', transformOrigin: 'top left'}}>
      <LogoEO tema={tema} tamano={150} />
    </div>
  </AbsoluteFill>
);

/** Mini maqueta de hoja para usar como `apoyo` en miniaturas. */
export const MiniHoja: React.FC<{filas: (string | number)[][]; resaltarFila?: number; formula?: string}> = ({filas, resaltarFila, formula}) => (
  <div style={{background: 'white', border: '6px solid #000', borderRadius: 18, boxShadow: '12px 12px 0 #000', overflow: 'hidden', transform: 'rotate(-4deg)', fontFamily: 'Segoe UI, Poppins, sans-serif', width: 500}}>
    <div style={{background: '#217346', color: 'white', fontWeight: 800, fontSize: 26, padding: '8px 16px'}}>X  Excel</div>
    {formula ? <div style={{fontFamily: 'Consolas, monospace', fontSize: 24, padding: '8px 14px', borderBottom: '2px solid #DDD', whiteSpace: 'nowrap', overflow: 'hidden'}}>fx {formula}</div> : null}
    {filas.map((f, i) => (
      <div key={i} style={{display: 'flex', borderBottom: '2px solid #E5E5E5', background: i === 0 ? '#E9F3EC' : i === resaltarFila ? '#FFE500' : 'white', fontWeight: i === 0 || i === resaltarFila ? 800 : 500}}>
        {f.map((c, j) => (
          <div key={j} style={{flex: 1, padding: '10px 12px', fontSize: 28, borderRight: '2px solid #E5E5E5', textAlign: j === 0 ? 'left' : 'right'}}>
            {c}
          </div>
        ))}
      </div>
    ))}
  </div>
);
