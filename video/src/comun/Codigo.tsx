import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import type {Tema} from './tipos';
import {entrada, progreso, useSegundos} from './tiempo';

const PALABRAS_CLAVE = new Set([
  'def', 'if', 'elif', 'else', 'for', 'while', 'in', 'return', 'import', 'from', 'as', 'and', 'or', 'not',
  'class', 'try', 'except', 'finally', 'with', 'lambda', 'pass', 'break', 'continue', 'True', 'False', 'None', 'is',
]);
const INTEGRADAS = new Set(['print', 'input', 'int', 'float', 'str', 'range', 'len', 'list', 'dict', 'open', 'sum', 'round', 'max', 'min', 'sorted', 'enumerate']);

type Token = {t: string; c: string};

const colorear = (linea: string): Token[] => {
  const res: Token[] = [];
  const re = /(#.*$)|("(?:[^"\\]|\\.)*"?|'(?:[^'\\]|\\.)*'?)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_]\w*)|(\s+)|(.)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(linea))) {
    if (m[1]) res.push({t: m[1], c: '#6A9955'});
    else if (m[2]) res.push({t: m[2], c: '#CE9178'});
    else if (m[3]) res.push({t: m[3], c: '#B5CEA8'});
    else if (m[4]) res.push({t: m[4], c: PALABRAS_CLAVE.has(m[4]) ? '#C586C0' : INTEGRADAS.has(m[4]) ? '#DCDCAA' : '#9CDCFE'});
    else res.push({t: m[0], c: '#D4D4D4'});
  }
  return res;
};

export const CodigoAnimado: React.FC<{
  tema: Tema;
  codigo: string;
  desde?: number;
  /** caracteres por segundo */
  velocidad?: number;
  resaltar?: {lineas: number[]; desde: number; hasta?: number}[];
  archivo?: string;
  tamano?: number;
  ancho?: number;
  x?: number;
  y?: number;
}> = ({tema, codigo, desde = 0, velocidad = 30, resaltar = [], archivo = 'programa.py', tamano = 38, ancho = 1500, x, y}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const lineas = codigo.replace(/\n$/, '').split('\n');
  const total = codigo.length;
  const visibles = Math.floor(progreso(s, desde, total / velocidad) * total);
  const e = entrada(s, fps, desde - 0.4, 140);
  let restante = visibles;
  const activa = resaltar.filter((r) => s >= r.desde && (r.hasta === undefined || s <= r.hasta)).flatMap((r) => r.lineas);
  return (
    <AbsoluteFill style={{alignItems: x === undefined ? 'center' : undefined, justifyContent: y === undefined ? 'center' : undefined}}>
      <div
        style={{
          position: x === undefined ? 'relative' : 'absolute',
          left: x,
          top: y,
          width: ancho,
          background: '#1E1E1E',
          borderRadius: 22,
          border: '5px solid #000',
          boxShadow: '16px 16px 0 rgba(0,0,0,0.85)',
          overflow: 'hidden',
          transform: `scale(${0.85 + 0.15 * e})`,
          opacity: e,
        }}
      >
        <div style={{height: 56, background: '#2D2D2D', display: 'flex', alignItems: 'center', gap: 12, padding: '0 22px'}}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
            <div key={c} style={{width: 18, height: 18, borderRadius: 9, background: c}} />
          ))}
          <div style={{marginLeft: 20, color: '#CCC', fontFamily: tema.fuentes.codigo, fontSize: 22, display: 'flex', alignItems: 'center', gap: 10}}>
            <span style={{color: '#FFD43B'}}>●</span>
            {archivo}
          </div>
        </div>
        <div style={{padding: '26px 0', fontFamily: tema.fuentes.codigo, fontSize: tamano, lineHeight: 1.55}}>
          {lineas.map((l, i) => {
            const n = Math.max(0, Math.min(l.length, restante));
            restante -= l.length + 1;
            const escribiendo = restante < 0 && restante + l.length + 1 >= 0;
            const res = activa.includes(i + 1);
            return (
              <div key={i} style={{display: 'flex', background: res ? 'rgba(255,229,0,0.16)' : undefined, borderLeft: res ? `8px solid ${tema.colores.acento}` : '8px solid transparent', minHeight: tamano * 1.55}}>
                <div style={{width: 80, textAlign: 'right', paddingRight: 26, color: '#6E7681'}}>{i + 1}</div>
                <div style={{whiteSpace: 'pre'}}>
                  {colorear(l.slice(0, n)).map((tk, j) => (
                    <span key={j} style={{color: tk.c}}>
                      {tk.t}
                    </span>
                  ))}
                  {escribiendo && Math.floor(s * 2.5) % 2 === 0 ? <span style={{color: '#FFF'}}>▍</span> : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const Terminal: React.FC<{
  tema: Tema;
  lineas: {texto: string; desde: number; color?: string}[];
  titulo?: string;
  ancho?: number;
  x?: number;
  y?: number;
}> = ({tema, lineas, titulo = 'Terminal', ancho = 1200, x, y}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const e = entrada(s, fps, (lineas[0]?.desde ?? 0) - 0.3, 140);
  return (
    <AbsoluteFill style={{alignItems: x === undefined ? 'center' : undefined, justifyContent: y === undefined ? 'center' : undefined}}>
      <div
        style={{
          position: x === undefined ? 'relative' : 'absolute',
          left: x,
          top: y,
          width: ancho,
          background: '#0C0C0C',
          borderRadius: 18,
          border: '5px solid #000',
          boxShadow: '14px 14px 0 rgba(0,0,0,0.85)',
          transform: `translateY(${(1 - e) * 300}px)`,
          opacity: e,
          overflow: 'hidden',
        }}
      >
        <div style={{height: 48, background: '#333', color: '#DDD', fontFamily: tema.fuentes.codigo, fontSize: 22, display: 'flex', alignItems: 'center', padding: '0 20px'}}>▶ {titulo}</div>
        <div style={{padding: 26, fontFamily: tema.fuentes.codigo, fontSize: 36, lineHeight: 1.5}}>
          {lineas.map((l, i) =>
            s >= l.desde ? (
              <div key={i} style={{color: l.color ?? '#E6E6E6', whiteSpace: 'pre'}}>
                {l.texto}
              </div>
            ) : null,
          )}
          {Math.floor(s * 2) % 2 === 0 ? <span style={{color: '#3DD6C8'}}>▍</span> : null}
        </div>
      </div>
    </AbsoluteFill>
  );
};
