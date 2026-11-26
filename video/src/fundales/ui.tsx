import React from 'react';
import {interpolate, useVideoConfig} from 'remotion';
import {ICONOS, NOTO, PUBLIC} from './fuentes';
import {entrada, useSegundos} from '../comun/tiempo';

/* Colores reales de la app (Tailwind config de entrenador-docente-cnsc + clases usadas). */
export const C = {
  primario: '#0d7ff2',
  primarioOsc: '#0b6bcb',
  fondo: '#f5f7f8',
  superficie: '#ffffff',
  borde: '#e7edf4',
  texto: '#0d141c',
  s400: '#94a3b8',
  s500: '#64748b',
  s600: '#475569',
  s700: '#334155',
  s800: '#1e293b',
  s100: '#f1f5f9',
  s50: '#f8fafc',
  azul50: '#eff6ff',
  azul100: '#dbeafe',
  indigo: '#4f46e5',
  indigo50: '#eef2ff',
  indigo100: '#e0e7ff',
  morado: '#9333ea',
  morado50: '#faf5ff',
  ambar: '#f59e0b',
  ambar600: '#d97706',
  ambar50: '#fffbeb',
  naranja: '#f97316',
  verde: '#10b981',
  verde500: '#22c55e',
  verde600: '#16a34a',
  verde50: '#f0fdf4',
  rojo: '#ef4444',
  rojo600: '#dc2626',
  rojo50: '#fef2f2',
  oscuro: '#0d141c',
  whatsapp: '#25D366',
};
export const F = {titulo: PUBLIC, texto: NOTO};

/** Ícono Material Symbols (mismo nombre que en la app). */
export const Icono: React.FC<{n: string; t?: number; c?: string; lleno?: boolean; style?: React.CSSProperties}> = ({n, t = 24, c, lleno, style}) => (
  <span
    style={{
      fontFamily: ICONOS,
      fontSize: t,
      lineHeight: 1,
      color: c,
      fontVariationSettings: `'FILL' ${lleno ? 1 : 0}, 'wght' 400, 'GRAD' 0, 'opsz' 24`,
      display: 'inline-block',
      userSelect: 'none',
      ...style,
    }}
  >
    {n}
  </span>
);

/** Efecto de "toque": anillo y rebote sobre el elemento cuando `en` llega (segundos de la escena). */
export const useToque = (en?: number) => {
  const s = useSegundos();
  if (en === undefined || s < en - 0.05) return {escala: 1, anillo: 0, activo: false};
  const d = s - en;
  const escala = d < 0.12 ? interpolate(d, [0, 0.12], [1, 0.94]) : d < 0.35 ? interpolate(d, [0.12, 0.35], [0.94, 1]) : 1;
  const anillo = d < 0.7 ? d / 0.7 : 0;
  return {escala, anillo, activo: true};
};

/** Envoltorio que dibuja el toque (dedo/cursor + onda) encima de cualquier elemento. */
export const Tocable: React.FC<{en?: number; children: React.ReactNode; style?: React.CSSProperties; redondeo?: number}> = ({en, children, style, redondeo = 12}) => {
  const s = useSegundos();
  const {escala, anillo} = useToque(en);
  const cursor = en !== undefined && s > en - 0.8 && s < en + 0.9;
  const llegada = en !== undefined ? interpolate(s, [en - 0.8, en - 0.1], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 0;
  return (
    <div style={{position: 'relative', transform: `scale(${escala})`, ...style}}>
      {children}
      {anillo > 0 ? (
        <div
          style={{
            position: 'absolute',
            inset: -6 - anillo * 14,
            borderRadius: redondeo + 8,
            border: `${4 * (1 - anillo)}px solid ${C.primario}`,
            opacity: 1 - anillo,
            pointerEvents: 'none',
          }}
        />
      ) : null}
      {cursor ? (
        <div
          style={{
            position: 'absolute',
            right: '18%',
            bottom: -18,
            transform: `translate(${(1 - llegada) * 120}px, ${(1 - llegada) * 90}px)`,
            opacity: llegada,
            pointerEvents: 'none',
            zIndex: 30,
          }}
        >
          <svg width="44" height="52" viewBox="0 0 24 28">
            <path d="M5 2 L5 21 L9.5 16.8 L12.6 24 L15.6 22.7 L12.6 15.6 L18.6 15.6 Z" fill="#0d141c" stroke="white" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        </div>
      ) : null}
    </div>
  );
};

/* ─────────── Encabezado real de la app (Layout.tsx) ─────────── */

export type Pestana = 'simulacros' | 'normativa' | 'estadisticas' | 'matematicas' | 'ai-coach' | 'ayuda' | 'planes' | 'entrevista';

export const Encabezado: React.FC<{activa?: Pestana; m?: boolean; usuario?: string; premium?: boolean; tocar?: {id: Pestana; en: number}}> = ({
  activa = 'simulacros',
  m,
  usuario = 'Laura Gómez',
  premium,
  tocar,
}) => {
  const boton = (id: Pestana, texto: string, icono?: string) => {
    const act = activa === id;
    let estilo: React.CSSProperties = {color: C.s600};
    if (act) estilo = {background: 'white', color: C.primario, fontWeight: 700, boxShadow: '0 1px 2px rgba(0,0,0,.06)'};
    if (id === 'ai-coach') estilo = act ? {background: C.indigo, color: 'white', fontWeight: 700} : {color: C.indigo, fontWeight: 700};
    if (id === 'planes') estilo = act ? {background: '#fef3c7', color: '#b45309', fontWeight: 700} : {color: C.ambar600, fontWeight: 700};
    if (id === 'entrevista') estilo = act ? {background: C.indigo, color: 'white', fontWeight: 700} : {color: C.indigo};
    return (
      <Tocable key={id} en={tocar?.id === id ? tocar.en : undefined} redondeo={6}>
        <div style={{padding: '8px 14px', borderRadius: 6, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap', ...estilo}}>
          {icono ? <Icono n={icono} t={18} /> : null}
          {texto}
          {id === 'entrevista' && !premium ? <Icono n="lock" t={13} c={C.ambar} /> : null}
        </div>
      </Tocable>
    );
  };
  return (
    <div
      style={{
        height: m ? 60 : 64,
        background: 'white',
        borderBottom: `1px solid ${C.borde}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: m ? '0 16px' : '0 28px',
        boxShadow: '0 1px 2px rgba(0,0,0,.04)',
        fontFamily: F.titulo,
        flexShrink: 0,
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
        <Icono n="school" t={30} c={C.primario} />
        <div style={{fontWeight: 700, fontSize: m ? 16 : 18, color: C.texto, letterSpacing: -0.3, whiteSpace: 'nowrap'}}>
          Entrenador Docente{' '}
          <span style={{color: C.primario, fontSize: 11, border: `1px solid ${C.primario}`, borderRadius: 4, padding: '0 4px', marginLeft: 4, textTransform: 'uppercase'}}>CNSC Beta</span>
        </div>
      </div>
      {m ? (
        <div style={{width: 40, height: 40, borderRadius: 8, background: C.s100, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Icono n="menu" t={24} c={C.s600} />
        </div>
      ) : (
        <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 2, background: C.s100, padding: 4, borderRadius: 8}}>
            {boton('simulacros', 'Simulacros')}
            {boton('normativa', 'Normativa')}
            {boton('estadisticas', 'Estadísticas')}
            {boton('matematicas', 'Matemáticas')}
            {boton('ai-coach', 'Coach IA', 'psychology')}
            {boton('ayuda', 'Ayuda')}
            <div style={{width: 1, height: 22, background: '#cbd5e1', margin: '0 4px'}} />
            {boton('planes', 'Planes', 'workspace_premium')}
            {boton('entrevista', 'Entrevista', 'mic')}
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: 8, background: C.s50, border: `1px solid ${C.s100}`, borderRadius: 8, padding: '5px 10px'}}>
            <div style={{width: 30, height: 30, borderRadius: 99, background: '#e0efff', color: C.primario, fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              {usuario.charAt(0)}
            </div>
            <span style={{fontSize: 14, color: C.s700, fontWeight: 500}}>{usuario}</span>
          </div>
        </div>
      )}
    </div>
  );
};

/** Pie real de la app + botón flotante de WhatsApp. */
export const BotonWhatsApp: React.FC<{m?: boolean}> = ({m}) => (
  <div
    style={{
      position: 'absolute',
      right: m ? 14 : 24,
      bottom: m ? 14 : 22,
      width: m ? 50 : 58,
      height: m ? 50 : 58,
      borderRadius: 99,
      background: C.whatsapp,
      boxShadow: '0 6px 14px rgba(0,0,0,.18)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 20,
    }}
  >
    <svg width={m ? 26 : 30} height={m ? 26 : 30} viewBox="0 0 24 24" fill="white">
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.506-.669-.516l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.875 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  </div>
);

/* ─────────── Marcos: navegador (16:9) y celular (9:16) ─────────── */

/** Ventana de navegador con la barra de dirección en fundales.com. Contenido a 1440 px virtuales. */
export const Navegador: React.FC<{ancho: number; alto: number; children: React.ReactNode; ruta?: string}> = ({ancho, alto, children, ruta = ''}) => {
  const barra = 46;
  const escala = ancho / 1440;
  return (
    <div style={{width: ancho, height: alto, borderRadius: 16, overflow: 'hidden', background: 'white', boxShadow: '0 30px 80px rgba(13,20,28,.28), 0 0 0 1px rgba(13,20,28,.08)'}}>
      <div style={{height: barra, background: '#e9eef3', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 14}}>
        <div style={{display: 'flex', gap: 8}}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
            <div key={c} style={{width: 13, height: 13, borderRadius: 99, background: c}} />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            height: 30,
            background: 'white',
            borderRadius: 99,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '0 14px',
            fontFamily: F.texto,
            fontSize: 16,
            color: C.s700,
          }}
        >
          <Icono n="lock" t={16} c={C.s500} />
          <span>
            <b style={{color: C.texto}}>fundales.com</b>
            {ruta}
          </span>
        </div>
      </div>
      <div style={{width: 1440, height: (alto - barra) / escala, transform: `scale(${escala})`, transformOrigin: 'top left', overflow: 'hidden', position: 'relative', background: C.fondo}}>
        {children}
      </div>
    </div>
  );
};

/** Celular con la app en versión móvil: contenido a 390 px virtuales. */
export const Celular: React.FC<{ancho: number; children: React.ReactNode}> = ({ancho, children}) => {
  const marco = ancho * 0.035;
  const interior = ancho - marco * 2;
  const escala = interior / 390;
  const altoInt = interior * (844 / 390);
  return (
    <div
      style={{
        width: ancho,
        height: altoInt + marco * 2,
        borderRadius: ancho * 0.13,
        background: '#0b0f14',
        padding: marco,
        boxShadow: '0 40px 90px rgba(13,20,28,.35), inset 0 0 0 3px #2a3440',
      }}
    >
      <div style={{width: interior, height: altoInt, borderRadius: ancho * 0.1, overflow: 'hidden', position: 'relative', background: C.fondo}}>
        <div style={{width: 390, height: 844, transform: `scale(${escala})`, transformOrigin: 'top left', position: 'relative', overflow: 'hidden'}}>
          {/* barra de estado */}
          <div style={{height: 38, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 26px', fontFamily: F.titulo, fontSize: 14, fontWeight: 700, color: C.texto}}>
            <span>7:30</span>
            <div style={{width: 110, height: 26, borderRadius: 99, background: '#0b0f14'}} />
            <span style={{display: 'flex', gap: 4}}>
              <Icono n="signal_cellular_alt" t={16} />
              <Icono n="battery_full" t={16} />
            </span>
          </div>
          <div style={{position: 'absolute', top: 38, left: 0, right: 0, bottom: 0, overflow: 'hidden'}}>{children}</div>
        </div>
      </div>
    </div>
  );
};

/** Página de la app (encabezado + contenido desplazable + WhatsApp). `scroll` en px virtuales. */
export const PaginaApp: React.FC<{m?: boolean; activa?: Pestana; scroll?: number; children: React.ReactNode; sinWhatsApp?: boolean; premium?: boolean; tocarPestana?: {id: Pestana; en: number}}> = ({
  m,
  activa,
  scroll = 0,
  children,
  sinWhatsApp,
  premium,
  tocarPestana,
}) => (
  <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', background: C.fondo, fontFamily: F.texto, color: C.texto}}>
    <Encabezado activa={activa} m={m} premium={premium} tocar={tocarPestana} />
    <div style={{flex: 1, position: 'relative', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: -scroll}}>{children}</div>
    </div>
    {sinWhatsApp ? null : <BotonWhatsApp m={m} />}
  </div>
);

/** Aparición suave (subida + fundido) de un elemento a partir de `desde`. */
export const Aparece: React.FC<{desde?: number; children: React.ReactNode; dy?: number; style?: React.CSSProperties}> = ({desde = 0, children, dy = 24, style}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const e = entrada(s, fps, desde);
  return <div style={{opacity: Math.min(1, e * 1.4), transform: `translateY(${(1 - e) * dy}px)`, ...style}}>{children}</div>;
};
