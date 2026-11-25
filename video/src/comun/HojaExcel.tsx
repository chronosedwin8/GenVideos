import React from 'react';
import {AbsoluteFill, Img, staticFile, useVideoConfig} from 'remotion';
import type {Tema} from './tipos';
import {entrada, progreso, useSegundos} from './tiempo';

/**
 * Maqueta animada de Excel (sin grabar pantalla).
 * Todos los tiempos son segundos relativos a la escena.
 *
 * Referencias para `cursor[].a`, `zoom[].a` y `menu.ancla`:
 *   'C5'                 → celda
 *   'tab:Inicio'         → pestaña de la cinta
 *   'btn:Formato condicional' → botón de la cinta
 *   'menu:Reglas para resaltar celdas' → ítem del menú desplegable
 *   'fx'                 → barra de fórmulas
 */

export type CeldaExcel = {
  ref: string;
  valor: string | number;
  desde?: number;
  negrita?: boolean;
  fondo?: string;
  color?: string;
  alinear?: 'left' | 'right' | 'center';
  /** Si se define, la celda cambia de fondo en ese segundo (p. ej. formato condicional). */
  fondoDesde?: number;
  /** La celda desaparece en este segundo (para reemplazar un valor por otro). */
  hasta?: number;
  /** Imagen dentro de la celda (ruta en public/), como el resultado de =IMAGEN(). */
  imagen?: string;
  /** Fuente de la celda (p. ej. la de código de barras) y tamaño de letra. */
  fuente?: string;
  tamano?: number;
};

export type HojaExcelProps = {
  tema: Tema;
  archivo?: string;
  columnas?: number;
  anchos?: Record<string, number>;
  filas?: number;
  celdas: CeldaExcel[];
  /** `enter`: segundo en que se "presiona Enter" y aparece el resultado (por defecto, al terminar de escribir). */
  escritura?: {celda: string; texto: string; desde: number; duracion?: number; enter?: number}[];
  resaltes?: {rango: string; desde: number; hasta?: number; color?: string}[];
  seleccion?: {celda: string; desde: number}[];
  zoom?: {a: string; desde: number; escala?: number; dur?: number}[];
  cursor?: {a: string; desde: number; clic?: boolean}[];
  pestanas?: string[];
  pestanaActiva?: {nombre: string; desde: number}[];
  /** Pestañas de hoja (abajo) y cuál está activa en cada momento. */
  hojas?: string[];
  hojaActiva?: {nombre: string; desde: number}[];
  botones?: string[];
  menu?: {ancla: string; items: string[]; desde: number; hasta: number; elegido?: string}[];
  /** Notas flotantes tipo globo junto a una celda. */
  globos?: {a: string; texto: string; desde: number; hasta?: number; color?: string; lado?: 'derecha' | 'abajo' | 'izquierda'}[];
  hoja?: string;
  /** Segundo en que aparece la ventana (por defecto 0). */
  aparece?: number;
};

// Geometría (en px dentro del lienzo 1920×1080)
const VX = 110;
const VY = 60;
const VW = 1700;
const VH = 960;
const BARRA_TITULO = 46;
const BARRA_PESTANAS = 44;
const CINTA = 110;
const BARRA_FX = 52;
const CAB_COL = 36;
const ALTO_FILA = 48;
const CAB_FILA = 60;
const ANCHO_COL = 190;
const Y_CELDAS = BARRA_TITULO + BARRA_PESTANAS + CINTA + BARRA_FX + CAB_COL;

const letra = (i: number) => String.fromCharCode(65 + i);
const colIndice = (l: string) => l.toUpperCase().charCodeAt(0) - 65;

export const parsearRef = (ref: string) => {
  const m = /^([A-Za-z])(\d+)$/.exec(ref.trim());
  if (!m) return {col: 0, fila: 1};
  return {col: colIndice(m[1]), fila: parseInt(m[2], 10)};
};

const anchoTab = (t: string) => t.length * 12 + 40;
const anchoBtn = (t: string) => Math.max(120, t.length * 11 + 36);

type Caja = {x: number; y: number; w: number; h: number};

const geometria = (p: HojaExcelProps) => {
  const ncol = p.columnas ?? 7;
  const anchos = new Array(ncol).fill(0).map((_, i) => p.anchos?.[letra(i)] ?? ANCHO_COL);
  const xCol = (c: number) => CAB_FILA + anchos.slice(0, c).reduce((a, b) => a + b, 0);
  const celda = (ref: string): Caja => {
    const {col, fila} = parsearRef(ref);
    return {x: xCol(col), y: Y_CELDAS + (fila - 1) * ALTO_FILA, w: anchos[col] ?? ANCHO_COL, h: ALTO_FILA};
  };
  const rango = (r: string): Caja => {
    const [a, b] = r.split(':');
    const ca = celda(a);
    const cb = celda(b ?? a);
    return {x: Math.min(ca.x, cb.x), y: Math.min(ca.y, cb.y), w: Math.abs(cb.x - ca.x) + cb.w, h: Math.abs(cb.y - ca.y) + cb.h};
  };
  const pestanas = p.pestanas ?? ['Archivo', 'Inicio', 'Insertar', 'Disposición', 'Fórmulas', 'Datos', 'Revisar', 'Vista'];
  const tab = (nombre: string): Caja => {
    let x = 16;
    for (const t of pestanas) {
      if (t === nombre) return {x, y: BARRA_TITULO, w: anchoTab(t), h: BARRA_PESTANAS};
      x += anchoTab(t);
    }
    return {x: 16, y: BARRA_TITULO, w: 80, h: BARRA_PESTANAS};
  };
  const botones = p.botones ?? ['Pegar', 'Negrita', 'Bordes', 'Formato condicional', 'Dar formato como tabla', 'Autosuma', 'Ordenar y filtrar'];
  const btn = (nombre: string): Caja => {
    let x = 20;
    for (const b of botones) {
      if (b === nombre) return {x, y: BARRA_TITULO + BARRA_PESTANAS + 8, w: anchoBtn(b), h: CINTA - 16};
      x += anchoBtn(b) + 10;
    }
    return {x: 20, y: BARRA_TITULO + BARRA_PESTANAS + 8, w: 100, h: CINTA - 16};
  };
  return {ncol, anchos, xCol, celda, rango, pestanas, tab, botones, btn};
};

type Geo = ReturnType<typeof geometria>;

const ubicar = (geo: Geo, p: HojaExcelProps, a: string, s: number): Caja => {
  if (a.startsWith('tab:')) return geo.tab(a.slice(4));
  if (a.startsWith('btn:')) return geo.btn(a.slice(4));
  if (a === 'fx') return {x: 230, y: BARRA_TITULO + BARRA_PESTANAS + CINTA, w: 900, h: BARRA_FX};
  if (a.startsWith('menu:')) {
    const item = a.slice(5);
    const m = (p.menu ?? []).find((mm) => mm.items.includes(item) && s <= mm.hasta + 1) ?? (p.menu ?? []).find((mm) => mm.items.includes(item));
    if (m) {
      const ancla = ubicar(geo, p, m.ancla, s);
      const i = m.items.indexOf(item);
      return {x: ancla.x, y: ancla.y + ancla.h + 6 + i * 58, w: 460, h: 58};
    }
  }
  return geo.celda(a);
};

const centro = (c: Caja) => ({x: c.x + c.w / 2, y: c.y + c.h / 2});

const Cursor: React.FC<{x: number; y: number; clic: number}> = ({x, y, clic}) => (
  <div style={{position: 'absolute', left: x, top: y, zIndex: 40, pointerEvents: 'none'}}>
    {clic > 0 && clic < 1 ? (
      <div
        style={{
          position: 'absolute',
          left: -40 * clic - 6,
          top: -40 * clic - 6,
          width: 80 * clic + 12,
          height: 80 * clic + 12,
          borderRadius: '50%',
          border: `6px solid rgba(255,229,0,${1 - clic})`,
          background: `rgba(255,229,0,${0.35 * (1 - clic)})`,
        }}
      />
    ) : null}
    <svg width={44} height={56} viewBox="0 0 22 28" style={{filter: 'drop-shadow(2px 3px 2px rgba(0,0,0,0.4))'}}>
      <path d="M1 1 L1 22 L6.5 17 L10.5 26 L14 24.5 L10 15.5 L17.5 15.5 Z" fill="white" stroke="black" strokeWidth={1.6} strokeLinejoin="round" />
    </svg>
  </div>
);

export const HojaExcel: React.FC<HojaExcelProps> = (p) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const geo = geometria(p);
  const filas = p.filas ?? 14;
  const verde = '#217346';

  // ── Zoom (centra la caja objetivo) ──
  let z = {e: 1, x: VW / 2, y: VH / 2};
  for (const ev of p.zoom ?? []) {
    if (s < ev.desde) break;
    const k = progreso(s, ev.desde, ev.dur ?? 0.7);
    const escala = ev.escala ?? 2;
    const objetivo = escala === 1 ? {x: VW / 2, y: VH / 2} : centro(ubicar(geo, p, ev.a, s));
    z = {e: z.e + (escala - z.e) * k, x: z.x + (objetivo.x - z.x) * k, y: z.y + (objetivo.y - z.y) * k};
  }
  const tx = VW / 2 - z.x * z.e;
  const ty = VH / 2 - z.y * z.e;

  // ── Selección activa ──
  const sel = [...(p.seleccion ?? [])].filter((x) => x.desde <= s).pop();

  // ── Escritura activa ──
  const escrituraDe = (ref: string) => (p.escritura ?? []).filter((w) => w.celda === ref && w.desde <= s).pop();
  const textoEscrito = (w: {texto: string; desde: number; duracion?: number; enter?: number}) => {
    const dur = w.duracion ?? Math.max(0.8, w.texto.length / 18);
    const n = Math.round(progreso(s, w.desde, dur) * w.texto.length);
    const fin = w.enter ?? w.desde + dur + 0.25;
    return {texto: w.texto.slice(0, n), terminado: s >= fin, fin};
  };

  const celdaActiva = sel?.celda;
  const escrActiva = celdaActiva ? escrituraDe(celdaActiva) : undefined;
  const valorCelda = (ref: string) =>
    [...p.celdas].reverse().find((c) => c.ref === ref && (c.desde ?? 0) <= s && (c.hasta === undefined || s < c.hasta));
  const textoFx = (() => {
    if (escrActiva) return textoEscrito(escrActiva).texto;
    const c = celdaActiva ? valorCelda(celdaActiva) : undefined;
    return c && (c.desde ?? 0) <= s ? String(c.valor) : '';
  })();

  // ── Cursor ──
  let cur: {x: number; y: number; clic: number} | null = null;
  const evs = p.cursor ?? [];
  if (evs.length && s >= evs[0].desde - 0.6) {
    let pos = {x: VW * 0.75, y: VH * 0.9};
    let clic = 0;
    for (const ev of evs) {
      if (s < ev.desde - 0.6) break;
      const k = progreso(s, ev.desde - 0.6, 0.55);
      const c = centro(ubicar(geo, p, ev.a, s));
      const destino = {x: c.x, y: c.y};
      pos = {x: pos.x + (destino.x - pos.x) * k, y: pos.y + (destino.y - pos.y) * k};
      if (ev.clic !== false && s >= ev.desde && s < ev.desde + 0.45) clic = (s - ev.desde) / 0.45;
    }
    cur = {...pos, clic};
  }

  const tabActiva = [...(p.pestanaActiva ?? [])].filter((x) => x.desde <= s).pop()?.nombre ?? 'Inicio';
  const aparece = p.aparece ?? 0;
  if (s < aparece) return null;
  const aparicion = entrada(s, fps, aparece, 140);

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          left: VX,
          top: VY,
          width: VW,
          height: VH,
          transform: `translate(${tx}px, ${ty}px) scale(${z.e * (0.9 + 0.1 * aparicion)})`,
          transformOrigin: '0 0',
          opacity: aparicion,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'white',
            borderRadius: 18,
            overflow: 'hidden',
            border: '5px solid #000',
            boxShadow: '18px 18px 0 rgba(0,0,0,0.85)',
            fontFamily: 'Segoe UI, Poppins, sans-serif',
          }}
        >
          {/* Barra de título */}
          <div style={{height: BARRA_TITULO, background: verde, color: 'white', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 16, fontSize: 22, fontWeight: 600}}>
            <div style={{width: 30, height: 30, background: 'white', color: verde, borderRadius: 6, fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20}}>X</div>
            <div style={{flex: 1, textAlign: 'center'}}>{p.archivo ?? 'Libro1.xlsx'} - Excel</div>
            <div style={{letterSpacing: 18}}>— ▢ ✕</div>
          </div>
          {/* Pestañas */}
          <div style={{height: BARRA_PESTANAS, background: '#F3F3F3', display: 'flex', alignItems: 'flex-end', paddingLeft: 16, fontSize: 21}}>
            {geo.pestanas.map((t) => (
              <div
                key={t}
                style={{
                  width: anchoTab(t),
                  textAlign: 'center',
                  paddingBottom: 8,
                  color: t === 'Archivo' ? verde : '#222',
                  fontWeight: t === tabActiva ? 700 : 400,
                  borderBottom: t === tabActiva ? `4px solid ${verde}` : '4px solid transparent',
                }}
              >
                {t}
              </div>
            ))}
          </div>
          {/* Cinta */}
          <div style={{height: CINTA, background: '#FAFAFA', borderBottom: '1px solid #DDD', display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 20}}>
            {geo.botones.map((b, i) => (
              <div key={b} style={{width: anchoBtn(b), height: CINTA - 16, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 17, color: '#333', textAlign: 'center', lineHeight: 1.1, borderRadius: 8, background: cur && Math.abs(centro(geo.btn(b)).x - cur.x) < anchoBtn(b) / 2 && Math.abs(centro(geo.btn(b)).y - cur.y) < 40 ? '#E1EFE6' : 'transparent'}}>
                <div style={{width: 40, height: 34, borderRadius: 6, background: [verde, '#2B579A', '#C43E1C', '#7719AA', '#0F6CBD'][i % 5], opacity: 0.85}} />
                {b}
              </div>
            ))}
          </div>
          {/* Barra de fórmulas */}
          <div style={{height: BARRA_FX, display: 'flex', alignItems: 'center', borderBottom: '1px solid #DDD', fontSize: 26}}>
            <div style={{width: 150, borderRight: '1px solid #DDD', textAlign: 'center', color: '#333'}}>{celdaActiva ?? 'A1'}</div>
            <div style={{width: 70, textAlign: 'center', color: '#666', fontStyle: 'italic', fontFamily: 'serif', fontSize: 28}}>fx</div>
            <div style={{flex: 1, fontFamily: 'Consolas, JetBrains Mono, monospace', fontVariantLigatures: 'none', fontSize: 28, color: '#111', whiteSpace: 'nowrap', overflow: 'hidden'}}>
              {textoFx}
              {escrActiva && !textoEscrito(escrActiva).terminado && Math.floor(s * 2.5) % 2 === 0 ? '|' : ''}
            </div>
          </div>
          {/* Encabezados de columna */}
          <div style={{position: 'absolute', top: Y_CELDAS - CAB_COL, left: 0, right: 0, height: CAB_COL, background: '#F0F0F0', borderBottom: '1px solid #CCC'}}>
            {geo.anchos.map((w, i) => (
              <div key={i} style={{position: 'absolute', left: geo.xCol(i), width: w, height: CAB_COL, borderRight: '1px solid #D0D0D0', textAlign: 'center', fontSize: 20, lineHeight: `${CAB_COL}px`, color: '#444', background: celdaActiva && parsearRef(celdaActiva).col === i ? '#D3E6DA' : undefined}}>
                {letra(i)}
              </div>
            ))}
          </div>
          {/* Filas */}
          {new Array(filas).fill(0).map((_, r) => (
            <div key={r} style={{position: 'absolute', top: Y_CELDAS + r * ALTO_FILA, left: 0, right: 0, height: ALTO_FILA, borderBottom: '1px solid #E2E2E2'}}>
              <div style={{position: 'absolute', left: 0, width: CAB_FILA, height: ALTO_FILA, background: celdaActiva && parsearRef(celdaActiva).fila === r + 1 ? '#D3E6DA' : '#F0F0F0', borderRight: '1px solid #CCC', textAlign: 'center', fontSize: 20, lineHeight: `${ALTO_FILA}px`, color: '#444'}}>
                {r + 1}
              </div>
              {geo.anchos.map((w, i) => (
                <div key={i} style={{position: 'absolute', left: geo.xCol(i), width: w, height: ALTO_FILA, borderRight: '1px solid #E2E2E2'}} />
              ))}
            </div>
          ))}
          {/* Contenido de celdas */}
          {p.celdas.map((c, idx) => {
            if (c.hasta !== undefined && s >= c.hasta) return null;
            const caja = geo.celda(c.ref);
            const w = escrituraDe(c.ref);
            const escrita = w ? textoEscrito(w) : null;
            let contenido: string | null = null;
            let destello = 0;
            if (escrita && !escrita.terminado) contenido = escrita.texto;
            else {
              const desde = escrita ? Math.max(escrita.fin, c.desde ?? 0) : c.desde ?? 0;
              if (s >= desde) {
                contenido = String(c.valor);
                if (escrita || c.desde) destello = 1 - progreso(s, desde, 0.9);
              }
            }
            if (contenido === null) return null;
            const fondoActivo = c.fondo && (c.fondoDesde === undefined || s >= c.fondoDesde) ? c.fondo : undefined;
            const esNumero = typeof c.valor === 'number' || /^[-$\d.,:%\s]+$/.test(String(c.valor));
            const enEdicion = escrita && !escrita.terminado;
            return (
              <div
                key={`${c.ref}-${idx}`}
                style={{
                  position: 'absolute',
                  left: caja.x,
                  top: caja.y,
                  width: enEdicion ? undefined : caja.w,
                  minWidth: caja.w,
                  height: caja.h,
                  padding: '0 10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: c.alinear === 'center' ? 'center' : c.alinear === 'left' || enEdicion || !esNumero ? 'flex-start' : 'flex-end',
                  fontSize: c.tamano ?? 25,
                  fontWeight: c.negrita ? 700 : 400,
                  color: (c.fondoDesde === undefined || fondoActivo ? c.color : undefined) ?? '#111',
                  background: enEdicion ? 'white' : fondoActivo ?? (destello > 0 ? `rgba(255,229,0,${0.7 * destello})` : 'transparent'),
                  whiteSpace: 'nowrap',
                  overflow: enEdicion ? 'visible' : 'hidden',
                  fontFamily: enEdicion ? 'Consolas, JetBrains Mono, monospace' : c.fuente, fontVariantLigatures: 'none',
                  zIndex: enEdicion ? 5 : 1,
                  boxSizing: 'border-box',
                }}
              >
                {c.imagen && !enEdicion ? (
                  <Img src={staticFile(c.imagen)} style={{height: caja.h - 6, width: caja.w - 20, objectFit: 'contain', margin: '0 auto'}} />
                ) : (
                  contenido
                )}
              </div>
            );
          })}
          {/* Rangos resaltados (como las referencias de colores de Excel) */}
          {(p.resaltes ?? []).map((r, i) => {
            if (s < r.desde || (r.hasta !== undefined && s > r.hasta)) return null;
            const caja = geo.rango(r.rango);
            const k = progreso(s, r.desde, 0.35);
            const color = r.color ?? '#1F6FEB';
            return (
              <div key={i} style={{position: 'absolute', left: caja.x, top: caja.y, width: caja.w, height: caja.h, border: `4px solid ${color}`, background: `${color}22`, opacity: k, transform: `scale(${1.08 - 0.08 * k})`, zIndex: 6, boxSizing: 'border-box'}} />
            );
          })}
          {/* Celda seleccionada */}
          {celdaActiva ? (
            (() => {
              const caja = geo.celda(celdaActiva);
              return (
                <div style={{position: 'absolute', left: caja.x - 2, top: caja.y - 2, width: caja.w + 4, height: caja.h + 4, border: `4px solid ${verde}`, zIndex: 7, boxSizing: 'border-box'}}>
                  <div style={{position: 'absolute', right: -7, bottom: -7, width: 11, height: 11, background: verde, border: '2px solid white'}} />
                </div>
              );
            })()
          ) : null}
          {/* Pestaña de hoja */}
          <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 40, background: '#F3F3F3', borderTop: '1px solid #CCC', display: 'flex', alignItems: 'center', paddingLeft: 70, fontSize: 20}}>
            {(p.hojas ?? [p.hoja ?? 'Hoja1']).map((h) => {
              const activa = ([...(p.hojaActiva ?? [])].filter((x) => x.desde <= s).pop()?.nombre ?? p.hoja ?? (p.hojas ?? ['Hoja1'])[0]) === h;
              return (
                <div key={h} style={activa ? {background: 'white', padding: '6px 22px', color: verde, fontWeight: 700, borderBottom: `3px solid ${verde}`} : {padding: '6px 22px', color: '#555'}}>
                  {h}
                </div>
              );
            })}
          </div>
        </div>
        {/* Menús desplegables */}
        {(p.menu ?? []).map((m, i) => {
          if (s < m.desde || s > m.hasta) return null;
          const ancla = ubicar(geo, p, m.ancla, s);
          const k = progreso(s, m.desde, 0.2);
          return (
            <div key={i} style={{position: 'absolute', left: ancla.x, top: ancla.y + ancla.h + 6, width: 460, background: 'white', border: '2px solid #888', borderRadius: 8, boxShadow: '0 12px 30px rgba(0,0,0,0.3)', zIndex: 30, transform: `scaleY(${k})`, transformOrigin: 'top', fontSize: 23}}>
              {m.items.map((it) => {
                const caja = ubicar(geo, p, `menu:${it}`, s);
                const sobre = cur && cur.y > caja.y && cur.y < caja.y + caja.h && cur.x > caja.x && cur.x < caja.x + caja.w;
                return (
                  <div key={it} style={{height: 58, display: 'flex', alignItems: 'center', padding: '0 20px', background: sobre || (m.elegido === it && s > m.hasta - 0.5) ? '#D3E6DA' : 'white', fontWeight: m.elegido === it && s > m.hasta - 0.5 ? 700 : 400}}>
                    {it}
                  </div>
                );
              })}
            </div>
          );
        })}
        {/* Globos explicativos */}
        {(p.globos ?? []).map((g, i) => {
          if (s < g.desde || (g.hasta !== undefined && s > g.hasta)) return null;
          const caja = ubicar(geo, p, g.a, s);
          const e = entrada(s, fps, g.desde);
          return (
            <div key={i} style={{position: 'absolute', ...(g.lado === 'abajo' ? {left: caja.x - 40, top: caja.y + caja.h + 18} : g.lado === 'izquierda' ? {right: VW - caja.x + 24, top: caja.y - 20} : {left: caja.x + caja.w + 24, top: caja.y - 20}), zIndex: 35, background: g.color ?? '#FFE500', border: '4px solid #000', borderRadius: 18, padding: '12px 22px', fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: 30, boxShadow: '6px 6px 0 #000', transform: `scale(${e})`, transformOrigin: g.lado === 'abajo' ? 'top left' : g.lado === 'izquierda' ? 'right center' : 'left center', whiteSpace: 'nowrap'}}>
              {g.lado === 'abajo' ? '▲ ' : g.lado === 'izquierda' ? '' : '◀ '}
              {g.texto}
              {g.lado === 'izquierda' ? ' ▶' : ''}
            </div>
          );
        })}
        {cur ? <Cursor x={cur.x} y={cur.y} clic={cur.clic} /> : null}
      </div>
    </AbsoluteFill>
  );
};
