import React, {useMemo} from 'react';
import {AbsoluteFill, Audio, Sequence, interpolate, staticFile, useVideoConfig} from 'remotion';
import {entrada, progreso, useSegundos} from '../comun/tiempo';
import type {Palabra} from '../comun/tipos';
import {Aparece, C, Celular, F, Icono, Navegador} from './ui';
import {Cargando, Coach, Configuracion, DocumentoPdf, Entrevista, Inicio, Matematicas, Normativa, Planes, Registro, Resultados, Simulador, Tablero} from './pantallas';
import {GRAFICOS} from './graficos';
import {planificarF, type BloqueR} from './motor-plan';
import type {Camara, VideoF} from './motor-tipos';

export const PANTALLAS: Record<string, React.FC<any>> = {Inicio, Registro, Configuracion, Cargando, Simulador, Resultados, Tablero, Coach, Normativa, Entrevista, Planes, Matematicas, DocumentoPdf};

export type Formato = 'h' | 'v';
export const duracionF = (v: VideoF, fps = 30) => Math.ceil((v.manifest.duracion_total + 1.2) * fps);

/* ─────────── Fondo de marca ─────────── */
const Fondo: React.FC<{v: boolean; oscuro: boolean}> = ({v, oscuro}) => {
  const s = useSegundos();
  const fondo = oscuro || v ? 'radial-gradient(120% 80% at 50% 0%, #1667d9 0%, #0b3f8f 45%, #071d42 100%)' : 'linear-gradient(160deg, #eaf3ff 0%, #f5f7f8 55%, #e6f0fb 100%)';
  return (
    <AbsoluteFill style={{background: fondo, overflow: 'hidden'}}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 700,
            height: 700,
            borderRadius: 999,
            background: oscuro || v ? 'rgba(13,127,242,.25)' : 'rgba(13,127,242,.08)',
            filter: 'blur(80px)',
            left: `${[-10, 60, 20][i] + Math.sin(s * 0.3 + i) * 4}%`,
            top: `${[-10, 30, 70][i] + Math.cos(s * 0.25 + i) * 4}%`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

/* ─────────── Píldora fija fundales.com (todo el video) ─────────── */
const PildoraWeb: React.FC<{v: boolean; claro: boolean}> = ({v, claro}) => (
  <div
    style={{
      position: 'absolute',
      zIndex: 60,
      ...(v ? {top: 150, left: 0, right: 0, display: 'flex', justifyContent: 'center'} : {top: 16, right: 40}),
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        background: claro ? C.primario : 'white',
        color: claro ? 'white' : C.primario,
        fontFamily: F.titulo,
        fontWeight: 900,
        fontSize: v ? 40 : 28,
        padding: v ? '12px 30px' : '8px 22px',
        borderRadius: 99,
        boxShadow: '0 8px 20px rgba(0,0,0,.2)',
      }}
    >
      <Icono n="language" t={v ? 40 : 28} /> fundales.com
    </div>
  </div>
);

/* ─────────── Subtítulos (caja blanca, palabra activa en azul) ─────────── */
const Subtitulos: React.FC<{palabras: Palabra[]; v: boolean}> = ({palabras, v}) => {
  const s = useSegundos();
  const max = v ? 4 : 6;
  const bloques = useMemo(() => {
    const res: Palabra[][] = [];
    let act: Palabra[] = [];
    palabras.forEach((p, i) => {
      const prev = palabras[i - 1];
      if (act.length && (act.length >= max || (prev && p.inicio - prev.fin > 0.35))) {
        res.push(act);
        act = [];
      }
      act.push(p);
      if (/[.?!:;,]$/.test(p.texto) && act.length >= 2) {
        res.push(act);
        act = [];
      }
    });
    if (act.length) res.push(act);
    return res;
  }, [palabras, max]);
  const b = bloques.find((x, i) => {
    const fin = bloques[i + 1] ? Math.min(bloques[i + 1][0].inicio, x[x.length - 1].fin + 0.5) : x[x.length - 1].fin + 0.5;
    return s >= x[0].inicio - 0.05 && s < fin;
  });
  if (!b) return null;
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: v ? 430 : 28, zIndex: 70, pointerEvents: 'none'}}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: v ? '4px 16px' : '0 14px',
          maxWidth: v ? 940 : 1600,
          background: 'white',
          borderRadius: v ? 28 : 20,
          padding: v ? '16px 30px' : '10px 28px',
          boxShadow: '0 12px 30px rgba(0,0,0,.25)',
          fontFamily: F.titulo,
          fontWeight: 800,
          fontSize: v ? 62 : 46,
          lineHeight: 1.2,
        }}
      >
        {b.map((p, i) => {
          const act = s >= p.inicio && s < p.fin + 0.08;
          return (
            <span key={i} style={{color: act ? C.primario : C.texto, transform: `scale(${act ? 1.06 : 1})`, display: 'inline-block'}}>
              {p.texto.replace(/^\[[^\]]*\]\s*/, '')}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ─────────── Cámara (zoom suave dentro de la interfaz) ─────────── */
const camaraEn = (cams: Camara[] | undefined, s: number) => {
  if (!cams?.length) return {k: 1, x: 0.5, y: 0.5};
  let prev = {k: 1, x: 0.5, y: 0.5};
  for (const c of cams as Array<Camara & {en: number}>) {
    const destino = {k: c.k, x: c.x ?? 0.5, y: c.y ?? 0.5};
    if (s < c.en) return prev;
    const p = progreso(s, c.en, 0.8);
    prev = {k: prev.k + (destino.k - prev.k) * p, x: prev.x + (destino.x - prev.x) * p, y: prev.y + (destino.y - prev.y) * p};
    if (p < 1) return prev;
    prev = destino;
  }
  return prev;
};

const ConCamara: React.FC<{cams?: Camara[]; W: number; H: number; children: React.ReactNode}> = ({cams, W, H, children}) => {
  const s = useSegundos();
  const {k, x, y} = camaraEn(cams, s);
  const tx = Math.min(0, Math.max(W - W * k, W / 2 - x * W * k));
  const ty = Math.min(0, Math.max(H - H * k, H / 2 - y * H * k));
  return <div style={{position: 'absolute', inset: 0, transform: `translate(${tx}px, ${ty}px) scale(${k})`, transformOrigin: '0 0'}}>{children}</div>;
};

/** Props efectivos en el segundo s: base + pasos ya ocurridos. */
const propsEn = (b: Extract<BloqueR, {tipo: 'pantalla'}>, s: number, v: boolean) => {
  let p: Record<string, unknown> = {...(b.props ?? {})};
  const pasos = [...(b.pasos ?? []), ...(v ? b.pasosV ?? [] : [])].sort((x, y) => (x.en as number) - (y.en as number));
  for (const paso of pasos as Array<{en: number} & Record<string, unknown>>) {
    if (s >= paso.en) {
      const {en: _en, ...resto} = paso;
      p = {...p, ...resto};
    }
  }
  return p;
};

/* ─────────── Bloques ─────────── */
const BloquePantalla: React.FC<{b: Extract<BloqueR, {tipo: 'pantalla'}>; v: boolean; textoNota?: string}> = ({b, v, textoNota}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const Comp = PANTALLAS[b.p];
  const e = entrada(s, fps, b.de, 140);
  const props = propsEn(b, s, v);
  const pantalla = <Comp {...props} m={v} />;
  const nota = textoNota ? (
    <div style={{position: 'absolute', left: v ? 0 : 20, right: v ? 0 : undefined, top: v ? 88 : 58, bottom: undefined, zIndex: 50, display: 'flex', justifyContent: 'center'}}>
      <div style={{background: 'rgba(13,20,28,.82)', color: 'white', fontFamily: F.texto, fontWeight: 500, fontSize: v ? 26 : 20, padding: '6px 16px', borderRadius: 99}}>{textoNota}</div>
    </div>
  ) : null;
  if (v) {
    return (
      <div style={{position: 'absolute', left: 0, right: 0, top: 470, display: 'flex', justifyContent: 'center', opacity: Math.min(1, e * 1.5), transform: `translateY(${(1 - e) * 80}px)`}}>
        <div style={{position: 'relative'}}>
          <Celular ancho={580}>
            <ConCamara cams={b.camaraV ?? b.camara} W={390} H={806}>
              {pantalla}
            </ConCamara>
          </Celular>
          {nota}
        </div>
      </div>
    );
  }
  return (
    <div style={{position: 'absolute', left: 150, top: 70, opacity: Math.min(1, e * 1.5), transform: `translateY(${(1 - e) * 60}px) scale(${0.96 + 0.04 * e})`}}>
      <div style={{position: 'relative'}}>
        <Navegador ancho={1620} alto={860} ruta={b.ruta}>
          <ConCamara cams={b.camara} W={1440} H={(860 - 46) / (1620 / 1440)}>
            {pantalla}
          </ConCamara>
        </Navegador>
        {nota}
      </div>
    </div>
  );
};

const Titular: React.FC<{b: Extract<BloqueR, {tipo: 'titular'}>; v: boolean; sobrePantalla: boolean}> = ({b, v, sobrePantalla}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const e = entrada(s, fps, b.de, 180);
  if (v) {
    return (
      <div style={{position: 'absolute', left: 50, right: 50, top: sobrePantalla ? 240 : 300, textAlign: 'center', zIndex: 55, opacity: Math.min(1, e * 1.4), transform: `scale(${0.85 + 0.15 * e})`}}>
        <div style={{fontFamily: F.titulo, fontWeight: 900, fontSize: b.texto.length > 26 ? 58 : 70, color: 'white', lineHeight: 1.05, letterSpacing: -1, textShadow: '0 6px 20px rgba(0,0,0,.3)'}}>{b.texto}</div>
        {b.sub ? <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: 38, color: '#bfe0ff', marginTop: 10}}>{b.sub}</div> : null}
      </div>
    );
  }
  if (!sobrePantalla) {
    return (
      <div style={{position: 'absolute', left: 120, right: 120, top: 130, textAlign: 'center', zIndex: 55, opacity: Math.min(1, e * 1.4)}}>
        <div style={{fontFamily: F.titulo, fontWeight: 900, fontSize: 84, color: 'white', lineHeight: 1.05, letterSpacing: -1.5}}>{b.texto}</div>
        {b.sub ? <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: 42, color: '#bfe0ff', marginTop: 10}}>{b.sub}</div> : null}
      </div>
    );
  }
  return (
    <div style={{position: 'absolute', left: 70, top: 600, zIndex: 55, opacity: Math.min(1, e * 1.4), transform: `translateX(${(1 - e) * -80}px)`}}>
      <div style={{background: C.oscuro, color: 'white', borderRadius: 22, padding: '18px 28px', maxWidth: 640, boxShadow: '0 20px 40px rgba(0,0,0,.3)', borderLeft: `10px solid ${C.primario}`}}>
        <div style={{fontFamily: F.titulo, fontWeight: 900, fontSize: 46, lineHeight: 1.08, display: 'flex', alignItems: 'center', gap: 14}}>
          {b.icono ? <Icono n={b.icono} t={50} c="#6cb6ff" /> : null}
          {b.texto}
        </div>
        {b.sub ? <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: 28, color: '#9fc9f5', marginTop: 6}}>{b.sub}</div> : null}
      </div>
    </div>
  );
};

/** Sello del producto (centro del logo, sin el anillo "Simulacros oficiales"). */
export const SelloMarca: React.FC<{t?: number; claro?: boolean}> = ({t = 1, claro}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: 18 * t}}>
    <div style={{width: 110 * t, height: 110 * t, borderRadius: 30 * t, background: claro ? 'white' : C.primario, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,.2)'}}>
      <Icono n="school" t={76 * t} c={claro ? C.primario : 'white'} />
    </div>
    <div style={{fontFamily: F.titulo, fontWeight: 900, fontSize: 64 * t, color: claro ? 'white' : C.texto, lineHeight: 0.95, letterSpacing: -1}}>
      Entrenador
      <br />
      Docente
    </div>
  </div>
);

const Cierre: React.FC<{b: Extract<BloqueR, {tipo: 'cierre'}>; v: boolean}> = ({b, v}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const e = entrada(s, fps, b.de, 160);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: v ? 50 : 34, zIndex: 40, paddingBottom: v ? 200 : 60}}>
      <div style={{transform: `scale(${0.7 + 0.3 * e})`, opacity: e}}>
        <SelloMarca t={v ? 1.25 : 1.1} claro />
      </div>
      {b.premium ? (
        <Aparece desde={b.de + 0.3}>
          <div style={{background: 'linear-gradient(90deg,#f59e0b,#f97316)', color: 'white', fontFamily: F.titulo, fontWeight: 900, fontSize: v ? 40 : 34, padding: '8px 26px', borderRadius: 99, display: 'flex', alignItems: 'center', gap: 10}}>
            <Icono n="workspace_premium" t={v ? 44 : 38} /> PREMIUM
          </div>
        </Aparece>
      ) : null}
      <Aparece desde={b.de + 0.35}>
        <div style={{textAlign: 'center'}}>
          <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: v ? 56 : 48, color: '#bfe0ff'}}>{b.extra ?? 'Entra gratis a'}</div>
          <div style={{fontFamily: F.titulo, fontWeight: 900, fontSize: v ? 130 : 120, color: 'white', letterSpacing: -2, lineHeight: 1.05}}>fundales.com</div>
        </div>
      </Aparece>
      <Aparece desde={b.de + 0.6}>
        <div style={{display: 'flex', alignItems: 'center', gap: 12, background: 'white', color: C.primario, fontFamily: F.titulo, fontWeight: 900, fontSize: v ? 46 : 40, padding: v ? '20px 44px' : '16px 40px', borderRadius: 99, boxShadow: '0 14px 30px rgba(0,0,0,.3)'}}>
          Empieza gratis <Icono n="arrow_forward" t={v ? 50 : 44} />
        </div>
      </Aparece>
      <Aparece desde={b.de + 0.8}>
        <div style={{textAlign: 'center', fontFamily: F.texto, fontSize: v ? 28 : 24, color: 'rgba(255,255,255,.8)', maxWidth: v ? 900 : 1400}}>
          Plataforma privada · Sin relación con la CNSC · No garantiza resultados
        </div>
      </Aparece>
    </AbsoluteFill>
  );
};

/* ─────────── Escena y video ─────────── */
const Escena: React.FC<{video: VideoF; num: string; palabras: Palabra[]; duracion: number; v: boolean}> = ({video, num, palabras, duracion, v}) => {
  const s = useSegundos();
  const def = video.escenas[num];
  const plan = useMemo(() => planificarF(def, palabras, duracion), [def, palabras, duracion]);
  const activos = plan.filter((b) => s >= b.de - 0.01 && s < b.a + 0.3);
  const fundido = (b: BloqueR) => (b.a === Infinity || b.a > duracion + 1 ? 1 : interpolate(s, [b.a, b.a + 0.3], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const hayPantalla = activos.some((b) => b.tipo === 'pantalla' && s < b.a);
  const oscuro = !hayPantalla;
  const hayTitular = activos.some((b) => b.tipo === 'titular' && s < b.a);
  return (
    <AbsoluteFill>
      <Fondo v={v} oscuro={oscuro} />
      {activos.map((b, i) => (
        <AbsoluteFill key={i} style={{opacity: fundido(b)}}>
          {b.tipo === 'pantalla' ? <BloquePantalla b={b} v={v} textoNota={def.nota} /> : null}
          {b.tipo === 'titular' ? <Titular b={b} v={v} sobrePantalla={hayPantalla} /> : null}
          {b.tipo === 'grafico' ? <GraficoBloque b={b} v={v} conTitular={hayTitular} /> : null}
          {b.tipo === 'cierre' ? <Cierre b={b} v={v} /> : null}
        </AbsoluteFill>
      ))}
      <PildoraWeb v={v} claro={!v && !oscuro} />
      <Subtitulos palabras={palabras} v={v} />
    </AbsoluteFill>
  );
};

const GraficoBloque: React.FC<{b: Extract<BloqueR, {tipo: 'grafico'}>; v: boolean; conTitular?: boolean}> = ({b, v, conTitular}) => {
  const G = GRAFICOS[b.g];
  // Los gráficos usan tiempos relativos a su aparición.
  const desplazado = Object.fromEntries(Object.entries(b.props ?? {}).map(([k, val]) => [k, desplazar(val, b.de)]));
  return (
    <Sequence from={Math.round(b.de * 30)} layout="none">
      <AbsoluteFill style={{paddingTop: v ? (conTitular ? 560 : 300) : conTitular ? 330 : 110, paddingBottom: v ? 560 : 130}}>
        <div style={{position: 'relative', flex: 1}}>
          <G {...desplazado} v={v} />
        </div>
      </AbsoluteFill>
    </Sequence>
  );
};

/** Pasa los tiempos absolutos de la escena a relativos al bloque. */
const desplazar = (x: unknown, de: number, clave = ''): unknown => {
  if (Array.isArray(x)) return x.map((y) => desplazar(y, de));
  if (x && typeof x === 'object') return Object.fromEntries(Object.entries(x as Record<string, unknown>).map(([k, v]) => [k, desplazar(v, de, k)]));
  if (typeof x === 'number' && (clave === 'desde' || clave === 'hasta' || /En$|Desde$/.test(clave))) return x - de;
  return x;
};

export const VideoFundales: React.FC<{video: VideoF; formato: Formato}> = ({video, formato}) => {
  const {fps} = useVideoConfig();
  const v = formato === 'v';
  const m = video.manifest;
  return (
    <AbsoluteFill style={{background: '#071d42'}}>
      {m.escenas.map((e, i) => {
        const desde = Math.round(e.inicio * fps);
        const sig = m.escenas[i + 1];
        const hasta = sig ? Math.round(sig.inicio * fps) : Math.ceil((m.duracion_total + 1.2) * fps);
        return (
          <Sequence key={e.num} from={desde} durationInFrames={Math.max(1, hasta - desde)} name={`${e.num} · ${e.titulo}`}>
            <Escena video={video} num={e.num} palabras={e.palabras} duracion={e.duracion} v={v} />
            <Audio src={staticFile(`fundales/${video.slug}/${e.audio}`)} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

/* ─────────── Miniatura / portada (1280×720 y 1080×1920) ─────────── */
export const PortadaFundales: React.FC<{video: VideoF; formato: Formato}> = ({video, formato}) => {
  const v = formato === 'v';
  const mi = video.miniatura;
  const Comp = mi.pantalla ? PANTALLAS[mi.pantalla] : null;
  return (
    <AbsoluteFill style={{background: 'radial-gradient(120% 90% at 30% 0%, #1667d9 0%, #0b3f8f 50%, #071d42 100%)', overflow: 'hidden'}}>
      {Comp ? (
        <Sequence from={-150} layout="none">
        <div style={{position: 'absolute', ...(v ? {left: 160, top: 820} : {right: -40, top: 120}), transform: `rotate(${v ? -4 : 4}deg)`}}>
          {v ? (
            <Celular ancho={760}>
              <Comp {...(mi.props ?? {})} m />
            </Celular>
          ) : (
            <Navegador ancho={760} alto={520}>
              <Comp {...(mi.props ?? {})} />
            </Navegador>
          )}
        </div>
        </Sequence>
      ) : null}
      <div style={{position: 'absolute', left: v ? 70 : 60, top: v ? 120 : 50}}>
        <SelloMarca t={v ? 0.9 : 0.6} claro />
      </div>
      {mi.insignia ? (
        <div style={{position: 'absolute', ...(v ? {right: 60, top: 140} : {left: 60, top: 520}), background: C.ambar, color: C.texto, fontFamily: F.titulo, fontWeight: 900, fontSize: v ? 52 : 40, padding: '8px 26px', borderRadius: 18, transform: 'rotate(-4deg)', boxShadow: '0 10px 24px rgba(0,0,0,.3)'}}>
          {mi.insignia}
        </div>
      ) : null}
      <div style={{position: 'absolute', left: v ? 70 : 60, top: v ? 330 : 180, width: v ? 940 : 620}}>
        {mi.lineas.map((l, i) => (
          <div key={i} style={{fontFamily: F.titulo, fontWeight: 900, fontSize: (v ? 104 : 72) * (l.length > 14 ? 0.82 : 1), lineHeight: 1.02, letterSpacing: -2, color: l === mi.resalta ? '#ffd43b' : 'white', textShadow: '0 8px 24px rgba(0,0,0,.35)'}}>
            {l}
          </div>
        ))}
      </div>
      <div style={{position: 'absolute', left: v ? 70 : 60, bottom: v ? 120 : 40, background: 'white', color: C.primario, fontFamily: F.titulo, fontWeight: 900, fontSize: v ? 52 : 34, padding: v ? '12px 32px' : '8px 22px', borderRadius: 99, display: 'flex', alignItems: 'center', gap: 10}}>
        <Icono n="language" t={v ? 52 : 34} /> fundales.com
      </div>
    </AbsoluteFill>
  );
};
