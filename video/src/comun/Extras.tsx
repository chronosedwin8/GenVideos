import React from 'react';
import {AbsoluteFill, Sequence, useVideoConfig} from 'remotion';
import type {Tema} from './tipos';
import {entrada, progreso, useSegundos} from './tiempo';

/**
 * Muestra a sus hijos solo entre `de` y `a` (segundos de la escena).
 * Dentro, el tiempo vuelve a empezar en 0: usa `t(...) - de` para sincronizar.
 */
export const Ventana: React.FC<{de: number; a?: number; children: React.ReactNode; nombre?: string}> = ({de, a, children, nombre}) => {
  const {fps} = useVideoConfig();
  const desde = Math.max(0, Math.round(de * fps));
  const dur = a === undefined ? undefined : Math.max(1, Math.round(a * fps) - desde);
  return (
    <Sequence from={desde} durationInFrames={dur} name={nombre} layout="absolute-fill">
      {children}
    </Sequence>
  );
};

/** Diálogo estilo Office (Formato de celdas, Mayor que…). Tiempos relativos a la escena. */
export const DialogoOffice: React.FC<{
  titulo: string;
  desde: number;
  hasta: number;
  lista?: {items: string[]; elegido?: string; elegidoDesde?: number};
  campo?: {etiqueta: string; texto: string; desde: number; duracion?: number};
  extra?: React.ReactNode;
  aceptarEn?: number;
}> = ({titulo, desde, hasta, lista, campo, extra, aceptarEn}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  if (s < desde || s > hasta) return null;
  const e = entrada(s, fps, desde, 220);
  const n = campo ? Math.round(progreso(s, campo.desde, campo.duracion ?? 1.5) * campo.texto.length) : 0;
  const clic = aceptarEn !== undefined && s >= aceptarEn;
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', background: `rgba(0,0,0,${0.25 * e})`, zIndex: 60}}>
      <div style={{width: 900, background: 'white', border: '3px solid #555', borderRadius: 14, boxShadow: '0 30px 80px rgba(0,0,0,0.5)', transform: `scale(${0.85 + 0.15 * e})`, opacity: e, fontFamily: 'Segoe UI, Poppins, sans-serif', overflow: 'hidden'}}>
        <div style={{padding: '18px 28px', fontSize: 30, fontWeight: 600, borderBottom: '1px solid #DDD', display: 'flex', justifyContent: 'space-between'}}>
          <span>{titulo}</span>
          <span style={{color: '#888'}}>✕</span>
        </div>
        <div style={{display: 'flex', gap: 30, padding: 28}}>
          {lista ? (
            <div style={{width: 300, border: '1px solid #CCC', borderRadius: 6}}>
              {lista.items.map((it) => {
                const sel = lista.elegido === it && s >= (lista.elegidoDesde ?? desde);
                return (
                  <div key={it} style={{padding: '8px 16px', fontSize: 24, background: sel ? '#217346' : 'white', color: sel ? 'white' : '#222', fontWeight: sel ? 700 : 400}}>
                    {it}
                  </div>
                );
              })}
            </div>
          ) : null}
          <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 16}}>
            {campo ? (
              <>
                <div style={{fontSize: 24, color: '#444'}}>{campo.etiqueta}</div>
                <div style={{border: '3px solid #217346', borderRadius: 6, padding: '12px 16px', fontSize: 34, fontFamily: 'Consolas, JetBrains Mono, monospace', fontVariantLigatures: 'none', minHeight: 40}}>
                  {campo.texto.slice(0, n)}
                  {s >= campo.desde && n < campo.texto.length && Math.floor(s * 2.5) % 2 === 0 ? '|' : ''}
                </div>
              </>
            ) : null}
            {extra}
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end', gap: 16, padding: '0 28px 24px'}}>
          <div style={{padding: '10px 34px', fontSize: 24, borderRadius: 6, background: clic ? '#0F5A32' : '#217346', color: 'white', fontWeight: 700, transform: `scale(${clic && s < (aceptarEn ?? 0) + 0.2 ? 0.92 : 1})`, boxShadow: clic ? '0 0 0 6px rgba(255,229,0,0.8)' : undefined}}>
            Aceptar
          </div>
          <div style={{padding: '10px 34px', fontSize: 24, borderRadius: 6, border: '2px solid #999'}}>Cancelar</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Línea de tiempo de un turno nocturno: 22:00 → medianoche → 6:00. */
export const LineaTurno: React.FC<{tema: Tema; desde?: number; restaDesde?: number}> = ({tema, desde = 0, restaDesde}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const k = progreso(s, desde + 0.3, 2.2);
  const e = entrada(s, fps, desde);
  const er = entrada(s, fps, restaDesde ?? desde + 3);
  const X0 = 260;
  const W = 1400;
  const marcas = [
    {h: '22:00', x: 0},
    {h: '00:00', x: 2 / 8},
    {h: '6:00', x: 1},
  ];
  return (
    <AbsoluteFill style={{fontFamily: tema.fuentes.texto}}>
      <div style={{position: 'absolute', top: 200, left: X0, width: W, opacity: e}}>
        <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: tema.fuentes.titulo, fontSize: 64, color: 'white', marginBottom: 30}}>
          <span>🌙 Entra</span>
          <span>Sale ☀️</span>
        </div>
        <div style={{height: 70, background: 'rgba(255,255,255,0.2)', borderRadius: 40, border: '5px solid #000', position: 'relative', overflow: 'hidden'}}>
          <div style={{position: 'absolute', inset: 0, width: `${k * 100}%`, background: `linear-gradient(90deg, #2B2F77, ${tema.colores.azul} 25%, ${tema.colores.principal2})`}} />
        </div>
        {marcas.map((m) => (
          <div key={m.h} style={{position: 'absolute', left: m.x * W - 70, top: 190, width: 140, textAlign: 'center', fontSize: 48, fontWeight: 800, color: 'white', textShadow: '3px 3px 0 #000', opacity: k >= m.x - 0.02 ? 1 : 0.25}}>
            {m.h}
          </div>
        ))}
        <div style={{position: 'absolute', left: W / 2 - 160, top: -10, width: 320, textAlign: 'center', fontFamily: tema.fuentes.titulo, fontSize: 90, color: tema.colores.acento, textShadow: '5px 5px 0 #000', opacity: progreso(s, desde + 2.4, 0.4)}}>
          8 horas
        </div>
      </div>
      <div style={{position: 'absolute', top: 640, left: 0, right: 0, display: 'flex', justifyContent: 'center', transform: `scale(${er})`}}>
        <div style={{background: 'white', border: '6px solid #000', borderRadius: 26, boxShadow: '10px 10px 0 #000', padding: '20px 50px', fontFamily: tema.fuentes.codigo, fontVariantLigatures: 'none', fontFeatureSettings: '"calt" 0, "liga" 0', fontSize: 64, fontWeight: 700}}>
          6:00 − 22:00 = <span style={{color: tema.colores.rojo}}>−16 h ✗</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
