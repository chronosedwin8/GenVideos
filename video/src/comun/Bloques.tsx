import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {TituloContorno} from './Basicos';
import type {Tema} from './tipos';
import {contorno, entrada, progreso, useSegundos} from './tiempo';

/* Componentes visuales extra para el motor de escenas (Motor.tsx). Tiempos en segundos de la escena. */

const BORDE = '5px solid #000';
const SOMBRA = '10px 10px 0 #000';

/** Texto con `código` entre comillas invertidas → fuente monoespaciada resaltada. */
export const TextoRico: React.FC<{tema: Tema; texto: string; fondoCodigo?: string}> = ({tema, texto, fondoCodigo = '#FFF3B0'}) => (
  <>
    {texto.split(/(`[^`]+`)/g).map((p, i) =>
      p.startsWith('`') && p.endsWith('`') ? (
        <span key={i} style={{fontFamily: tema.fuentes.codigo, background: fondoCodigo, color: '#111', padding: '0 8px', borderRadius: 8, fontWeight: 600}}>
          {p.slice(1, -1)}
        </span>
      ) : (
        <React.Fragment key={i}>{p}</React.Fragment>
      ),
    )}
  </>
);

/** Recorta un texto con `código` respetando las comillas (para el efecto de escritura). */
const recortar = (texto: string, n: number) => {
  const cortado = texto.slice(0, n);
  const abiertas = (cortado.match(/`/g) ?? []).length;
  return abiertas % 2 ? cortado + '`' : cortado;
};

/* ───────────── Chat con un asistente de IA (genérico, sin marca) ───────────── */

export type MensajeChat = {rol: 'yo' | 'ia'; texto: string; desde: number; duracion?: number};

export const ChatIA: React.FC<{tema: Tema; mensajes: MensajeChat[]; titulo?: string; panel?: boolean; aparece?: number}> = ({
  tema,
  mensajes,
  titulo = 'Asistente de IA',
  panel = false,
  aparece,
}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const ini = aparece ?? (mensajes[0]?.desde ?? 0) - 0.4;
  const e = entrada(s, fps, ini, 160);
  const tam = panel ? 27 : 34;
  const caja: React.CSSProperties = panel
    ? {position: 'absolute', right: 40, top: 70, width: 660, height: 930}
    : {position: 'absolute', left: 210, top: 70, width: 1500, height: 830};
  return (
    <AbsoluteFill style={{zIndex: panel ? 40 : 1}}>
      <div
        style={{
          ...caja,
          background: '#F7F7FB',
          border: BORDE,
          borderRadius: 28,
          boxShadow: SOMBRA,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transform: panel ? `translateX(${(1 - e) * 800}px)` : `scale(${0.85 + 0.15 * e})`,
          opacity: Math.min(1, e * 1.4),
          fontFamily: tema.fuentes.texto,
        }}
      >
        <div style={{background: tema.colores.oscuro, color: 'white', padding: '16px 28px', display: 'flex', alignItems: 'center', gap: 16, fontSize: tam, fontWeight: 700}}>
          <div style={{width: 44, height: 44, borderRadius: 22, background: tema.colores.acento4, color: '#000', fontSize: 22, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>IA</div>
          {titulo}
        </div>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 22, padding: 28, overflow: 'hidden'}}>
          {mensajes
            .filter((m) => s >= m.desde)
            .map((m, i) => {
              const yo = m.rol === 'yo';
              const velocidad = yo ? 38 : 75;
              const espera = yo ? 0 : 0.6;
              const dur = m.duracion ?? Math.min(yo ? 4 : 5, m.texto.length / velocidad);
              const p = progreso(s, m.desde + espera, dur);
              const n = Math.round(p * m.texto.length);
              const me = entrada(s, fps, m.desde, 220);
              return (
                <div key={i} style={{display: 'flex', justifyContent: yo ? 'flex-end' : 'flex-start', gap: 14, transform: `translateY(${(1 - me) * 40}px)`, opacity: me}}>
                  {!yo ? (
                    <div style={{width: 52, height: 52, flex: 'none', borderRadius: 26, background: tema.colores.acento4, border: '3px solid #000', fontWeight: 800, fontSize: 22, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>IA</div>
                  ) : null}
                  <div
                    style={{
                      maxWidth: panel ? '86%' : '78%',
                      background: yo ? tema.colores.azul : 'white',
                      color: yo ? 'white' : '#111',
                      border: yo ? '3px solid #000' : '3px solid #222',
                      borderRadius: 24,
                      padding: '16px 24px',
                      fontSize: tam,
                      fontWeight: 600,
                      lineHeight: 1.35,
                      whiteSpace: 'pre-wrap',
                      boxShadow: '5px 5px 0 rgba(0,0,0,0.85)',
                    }}
                  >
                    {!yo && s < m.desde + espera ? (
                      <span style={{letterSpacing: 6, fontWeight: 800}}>{'•'.repeat(1 + (Math.floor(s * 4) % 3))}</span>
                    ) : (
                      <TextoRico tema={tema} texto={recortar(m.texto, n)} fondoCodigo={yo ? '#FFE500' : '#FFF3B0'} />
                    )}
                  </div>
                </div>
              );
            })}
        </div>
        <div style={{margin: '0 28px 24px', border: '3px solid #BBB', borderRadius: 18, padding: '12px 22px', color: '#999', fontSize: tam * 0.85, background: 'white'}}>
          Escribe tu pregunta…
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ───────────── Comparación A vs B ───────────── */

export type LadoComparar = {titulo: string; icono?: string; color?: string; items: {texto: string; desde: number; icono?: string}[]; desde?: number};

export const Comparar: React.FC<{tema: Tema; titulo?: string; izq: LadoComparar; der: LadoComparar; desde?: number}> = ({tema, titulo, izq, der, desde = 0}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const Lado: React.FC<{l: LadoComparar; i: number}> = ({l, i}) => {
    const e = entrada(s, fps, l.desde ?? desde + i * 0.3);
    const color = l.color ?? (i === 0 ? tema.colores.rojo : tema.colores.acento2);
    return (
      <div style={{width: 780, background: 'white', border: BORDE, borderRadius: 30, boxShadow: SOMBRA, overflow: 'hidden', transform: `translateY(${(1 - e) * 700}px)`, fontFamily: tema.fuentes.texto}}>
        <div style={{background: color, padding: '22px 32px', display: 'flex', gap: 18, alignItems: 'center', borderBottom: BORDE}}>
          {l.icono ? <span style={{fontSize: 64}}>{l.icono}</span> : null}
          <span style={{fontFamily: tema.fuentes.titulo, fontSize: 68, color: 'white', textShadow: contorno(3, '#000', false)}}>{l.titulo}</span>
        </div>
        <div style={{padding: '24px 32px', display: 'flex', flexDirection: 'column', gap: 18}}>
          {l.items.map((it, k) => {
            const ei = entrada(s, fps, it.desde, 200);
            return (
              <div key={k} style={{display: 'flex', gap: 16, fontSize: 40, fontWeight: 700, lineHeight: 1.25, opacity: ei, transform: `translateX(${(1 - ei) * 60}px)`}}>
                <span style={{flex: 'none'}}>{it.icono ?? (i === 0 ? '✗' : '✓')}</span>
                <span><TextoRico tema={tema} texto={it.texto} /></span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 40}}>
      {titulo ? <TituloContorno tema={tema} lineas={[{texto: titulo, color: 'white'}]} tamano={96} rotacion={0} desde={desde} /> : null}
      <div style={{display: 'flex', gap: 60, alignItems: 'flex-start'}}>
        <Lado l={izq} i={0} />
        <Lado l={der} i={1} />
      </div>
    </AbsoluteFill>
  );
};

/* ───────────── Cifra gigante (dato con fuente) ───────────── */

export const Cifra: React.FC<{tema: Tema; valor: string; texto: string; fuente?: string; color?: string; desde?: number}> = ({tema, valor, texto, fuente, color, desde = 0}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const e = entrada(s, fps, desde, 120);
  // Conteo animado si el valor empieza con un número (p. ej. "1.500 millones", "40 %").
  const m = /^([^\d]*)([\d.,]+)(.*)$/.exec(valor);
  let mostrado = valor;
  if (m) {
    const limpio = m[2].replace(/\./g, '').replace(',', '.');
    const objetivo = parseFloat(limpio);
    if (!isNaN(objetivo) && !/\d[.,]\d{1,2}$/.test(m[2])) {
      const p = progreso(s, desde, 1.1);
      const actual = Math.round(objetivo * p);
      mostrado = m[1] + actual.toLocaleString('es-CO') + m[3];
    }
  }
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 20, padding: '0 100px'}}>
      <div style={{fontFamily: tema.fuentes.titulo, fontSize: valor.length > 9 ? 220 : 300, lineHeight: 1, color: color ?? tema.colores.acento, textShadow: contorno(14, '#000'), transform: `scale(${e})`, whiteSpace: 'nowrap'}}>
        {mostrado}
      </div>
      <div style={{fontFamily: tema.fuentes.texto, fontWeight: 800, fontSize: 60, color: 'white', textAlign: 'center', textShadow: contorno(4, '#000', false), maxWidth: 1500, opacity: progreso(s, desde + 0.3, 0.3), lineHeight: 1.2}}>
        {texto}
      </div>
      {fuente ? (
        <div style={{marginTop: 20, background: 'rgba(0,0,0,0.7)', color: 'white', fontFamily: tema.fuentes.texto, fontSize: 28, padding: '8px 24px', borderRadius: 20, opacity: progreso(s, desde + 0.6, 0.3)}}>
          Fuente: {fuente}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

/* ───────────── Lista con iconos que aparecen con la voz ───────────── */

export const ListaCheck: React.FC<{tema: Tema; titulo?: string; items: {texto: string; desde: number; icono?: string}[]; desde?: number}> = ({tema, titulo, items, desde = 0}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const tam = items.length > 5 ? 40 : 48;
  return (
    <AbsoluteFill style={{padding: '60px 160px', gap: items.length > 5 ? 20 : 28, justifyContent: 'center', fontFamily: tema.fuentes.texto}}>
      {titulo ? <TituloContorno tema={tema} lineas={[{texto: titulo, color: tema.colores.acento}]} tamano={96} rotacion={0} alineacion="left" desde={desde} /> : null}
      {items.map((it, i) => {
        const e = entrada(s, fps, it.desde, 200);
        return (
          <div key={i} style={{display: 'flex', alignItems: 'center', gap: 26, background: 'white', border: BORDE, borderRadius: 24, boxShadow: '8px 8px 0 #000', padding: '18px 30px', fontSize: tam, fontWeight: 700, transform: `translateX(${(1 - e) * -1600}px)`, lineHeight: 1.25}}>
            <span style={{fontSize: tam * 1.3, flex: 'none'}}>{it.icono ?? '✅'}</span>
            <span><TextoRico tema={tema} texto={it.texto} /></span>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/* ───────────── Cuadrícula de iconos ───────────── */

export const Cuadricula: React.FC<{tema: Tema; titulo?: string; items: {icono: string; texto: string; desde: number}[]; desde?: number}> = ({tema, titulo, items, desde = 0}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const cols = items.length <= 3 ? items.length : items.length === 4 ? 2 : items.length <= 6 ? 3 : 4;
  const ancho = cols <= 2 ? 640 : cols === 3 ? 500 : 390;
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 44}}>
      {titulo ? <TituloContorno tema={tema} lineas={[{texto: titulo, color: 'white'}]} tamano={96} rotacion={0} desde={desde} /> : null}
      <div style={{display: 'grid', gridTemplateColumns: `repeat(${cols}, ${ancho}px)`, gap: 36}}>
        {items.map((it, i) => {
          const e = entrada(s, fps, it.desde, 190);
          return (
            <div key={i} style={{background: 'white', border: BORDE, borderRadius: 28, boxShadow: '9px 9px 0 #000', padding: '26px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, transform: `scale(${e}) rotate(${(1 - e) * 12}deg)`, fontFamily: tema.fuentes.texto}}>
              <div style={{fontSize: 92}}>{it.icono}</div>
              <div style={{fontSize: 38, fontWeight: 800, textAlign: 'center', lineHeight: 1.2}}>
                <TextoRico tema={tema} texto={it.texto} />
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ───────────── Fórmula explicada por partes ───────────── */

export type ParteFormula = {texto: string; nota: string; desde: number; ocurrencia?: number};

export const FormulaGrande: React.FC<{tema: Tema; formula: string; partes?: ParteFormula[]; titulo?: string; desde?: number; escribir?: boolean}> = ({
  tema,
  formula,
  partes = [],
  titulo,
  desde = 0,
  escribir = true,
}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const e = entrada(s, fps, desde, 170);
  const colores = [tema.colores.acento, tema.colores.acento4, '#FF9BCB', '#9BE7A8', '#FFC48C', '#B9C7FF'];
  const n = escribir ? Math.round(progreso(s, desde + 0.2, Math.min(2.2, formula.length / 22)) * formula.length) : formula.length;
  // Marca de color por carácter según las partes activas
  const marca: (number | null)[] = new Array(formula.length).fill(null);
  partes.forEach((p, k) => {
    if (s < p.desde) return;
    let idx = -1;
    for (let o = 0; o < (p.ocurrencia ?? 1); o++) idx = formula.indexOf(p.texto, idx + 1);
    if (idx < 0) return;
    for (let c = idx; c < idx + p.texto.length; c++) marca[c] = k;
  });
  const segmentos: {t: string; k: number | null}[] = [];
  for (let c = 0; c < n; c++) {
    const ult = segmentos[segmentos.length - 1];
    if (ult && ult.k === marca[c]) ult.t += formula[c];
    else segmentos.push({t: formula[c], k: marca[c]});
  }
  const tam = formula.length > 34 ? 50 : formula.length > 24 ? 62 : 78;
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 46, fontFamily: tema.fuentes.texto}}>
      {titulo ? <TituloContorno tema={tema} lineas={[{texto: titulo, color: 'white'}]} tamano={90} rotacion={0} desde={desde} /> : null}
      <div style={{display: 'flex', alignItems: 'stretch', background: 'white', border: BORDE, borderRadius: 24, boxShadow: SOMBRA, transform: `scale(${0.8 + 0.2 * e})`, opacity: e, maxWidth: 1760}}>
        <div style={{fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: tam * 0.8, padding: '18px 30px', borderRight: '4px solid #000', color: '#555', display: 'flex', alignItems: 'center'}}>fx</div>
        <div style={{fontFamily: tema.fuentes.codigo, fontSize: tam, padding: '22px 36px', whiteSpace: 'pre', fontWeight: 600}}>
          {segmentos.map((g, i) => (
            <span key={i} style={g.k === null ? {} : {background: colores[g.k % colores.length], borderRadius: 10, boxShadow: '0 0 0 4px #000 inset', padding: '0 2px'}}>
              {g.t}
            </span>
          ))}
          <span style={{opacity: n < formula.length || Math.floor(s * 2) % 2 ? 1 : 0}}>|</span>
        </div>
      </div>
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 26, justifyContent: 'center', maxWidth: 1700}}>
        {partes.map((p, k) => {
          const ep = entrada(s, fps, p.desde, 200);
          if (s < p.desde) return null;
          return (
            <div key={k} style={{display: 'flex', alignItems: 'center', gap: 16, background: 'white', border: '4px solid #000', borderRadius: 20, padding: '14px 26px', boxShadow: '6px 6px 0 #000', transform: `scale(${ep})`}}>
              <span style={{fontFamily: tema.fuentes.codigo, fontSize: 36, fontWeight: 700, background: colores[k % colores.length], padding: '2px 12px', borderRadius: 10, border: '3px solid #000'}}>{p.texto}</span>
              <span style={{fontSize: 36, fontWeight: 700}}>{p.nota}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ───────────── Línea de tiempo (noticias, versiones) ───────────── */

export const Cronologia: React.FC<{tema: Tema; titulo?: string; items: {fecha: string; texto: string; desde: number; icono?: string; color?: string}[]; desde?: number}> = ({
  tema,
  titulo,
  items,
  desde = 0,
}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const ancho = 1700;
  const paso = ancho / Math.max(1, items.length);
  const largo = progreso(s, desde, 0.8);
  return (
    <AbsoluteFill style={{fontFamily: tema.fuentes.texto}}>
      {titulo ? (
        <div style={{position: 'absolute', top: 60, width: '100%', display: 'flex', justifyContent: 'center'}}>
          <TituloContorno tema={tema} lineas={[{texto: titulo, color: 'white'}]} tamano={92} rotacion={0} desde={desde} />
        </div>
      ) : null}
      <div style={{position: 'absolute', left: 110, top: 560, width: ancho * largo, height: 14, background: '#000', borderRadius: 7}} />
      {items.map((it, i) => {
        const e = entrada(s, fps, it.desde, 190);
        const arriba = i % 2 === 0;
        const x = 110 + paso * i + paso / 2;
        return (
          <React.Fragment key={i}>
            <div style={{position: 'absolute', left: x - 34, top: 533, width: 68, height: 68, borderRadius: 34, background: it.color ?? tema.colores.acento, border: BORDE, transform: `scale(${e})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 34}}>
              {it.icono ?? ''}
            </div>
            <div
              style={{
                position: 'absolute',
                left: x - paso / 2 + 14,
                width: paso - 28,
                top: arriba ? 210 : 640,
                height: 290,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: arriba ? 'flex-end' : 'flex-start',
                opacity: e,
                transform: `translateY(${(1 - e) * (arriba ? -60 : 60)}px)`,
              }}
            >
              <div style={{background: 'white', border: BORDE, borderRadius: 22, boxShadow: '7px 7px 0 #000', padding: '18px 22px'}}>
                <div style={{fontFamily: tema.fuentes.titulo, fontSize: 46, color: tema.colores.azul}}>{it.fecha}</div>
                <div style={{fontSize: 30, fontWeight: 700, lineHeight: 1.25, marginTop: 6}}>
                  <TextoRico tema={tema} texto={it.texto} />
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};

/* ───────────── Teclas (atajos) ───────────── */

export const Teclas: React.FC<{tema: Tema; teclas: string[]; texto?: string; desde?: number}> = ({tema, teclas, texto, desde = 0}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 60}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 30}}>
        {teclas.map((k, i) => {
          const e = entrada(s, fps, desde + i * 0.18, 220);
          const pulsada = s > desde + teclas.length * 0.18 + 0.3 && s < desde + teclas.length * 0.18 + 0.7;
          return (
            <React.Fragment key={i}>
              {i > 0 ? <span style={{fontFamily: tema.fuentes.titulo, fontSize: 90, color: 'white', textShadow: contorno(5, '#000')}}>+</span> : null}
              <div
                style={{
                  minWidth: 190,
                  padding: '30px 40px',
                  background: 'white',
                  border: BORDE,
                  borderRadius: 26,
                  boxShadow: pulsada ? '0 4px 0 #000' : '0 18px 0 #000',
                  transform: `scale(${e}) translateY(${pulsada ? 14 : 0}px)`,
                  fontFamily: tema.fuentes.texto,
                  fontWeight: 800,
                  fontSize: 76,
                  textAlign: 'center',
                }}
              >
                {k}
              </div>
            </React.Fragment>
          );
        })}
      </div>
      {texto ? <TituloContorno tema={tema} lineas={[{texto, color: tema.colores.acento}]} tamano={90} rotacion={0} desde={desde + 0.4} /> : null}
    </AbsoluteFill>
  );
};

/* ───────────── Mini tarjeta de código para miniaturas ───────────── */

export const MiniCodigo: React.FC<{codigo: string}> = ({codigo}) => (
  <div style={{background: '#1E1E1E', border: '6px solid #000', borderRadius: 22, padding: '22px 28px', boxShadow: '10px 10px 0 #000', fontFamily: 'JetBrains Mono', fontSize: 34, color: '#D4D4D4', whiteSpace: 'pre', lineHeight: 1.35}}>
    {codigo}
  </div>
);
