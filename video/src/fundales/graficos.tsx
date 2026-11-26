import React from 'react';
import {interpolate, useVideoConfig} from 'remotion';
import {entrada, progreso, useSegundos} from '../comun/tiempo';
import {Aparece, C, F, Icono} from './ui';
import {OPCIONES_CORTAS, TABLERO, USO} from './datos';

/* Gráficos de pantalla completa. `v` = formato vertical 1080×1920; si no, horizontal 1920×1080.
   Fondo transparente: el motor pone el fondo de marca. Todos los tiempos en segundos de la escena. */
type G = {v?: boolean};

const blanco = '#ffffff';
const azulClaro = '#bfe0ff';
const titulo = (v?: boolean, t = 1): React.CSSProperties => ({fontFamily: F.titulo, fontWeight: 900, color: blanco, fontSize: (v ? 84 : 92) * t, lineHeight: 1.05, letterSpacing: -1.5, textAlign: 'center'});
const centro: React.CSSProperties = {position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'};

const Pop: React.FC<{desde?: number; children: React.ReactNode; style?: React.CSSProperties}> = ({desde = 0, children, style}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const e = entrada(s, fps, desde, 200);
  return <div style={{transform: `scale(${0.6 + 0.4 * e})`, opacity: Math.min(1, e * 1.5), ...style}}>{children}</div>;
};

/** Frase de gancho grande con ícono. */
export const Gancho: React.FC<G & {texto: string; sub?: string; icono?: string; desde?: number}> = ({v, texto, sub, icono, desde = 0}) => (
  <div style={{...centro, padding: v ? '0 70px' : '0 200px', gap: 30, paddingTop: v ? 0 : 0}}>
    {icono ? (
      <Pop desde={desde}>
        <div style={{width: v ? 190 : 170, height: v ? 190 : 170, borderRadius: 48, background: 'rgba(255,255,255,.14)', border: '2px solid rgba(255,255,255,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Icono n={icono} t={v ? 120 : 108} c={blanco} />
        </div>
      </Pop>
    ) : null}
    <Aparece desde={desde + 0.1}>
      <div style={titulo(v)}>{texto}</div>
    </Aparece>
    {sub ? (
      <Aparece desde={desde + 0.35}>
        <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: v ? 48 : 46, color: azulClaro, textAlign: 'center'}}>{sub}</div>
      </Aparece>
    ) : null}
  </div>
);

/** Contadores con cifras reales. */
export const Cifras: React.FC<G & {items: {n: number; texto: string; desde?: number}[]}> = ({v, items}) => {
  const s = useSegundos();
  return (
    <div style={{...centro, flexDirection: v ? 'column' : 'row', gap: v ? 60 : 120}}>
      {items.map((it, i) => {
        const d = it.desde ?? i * 0.4;
        const n = Math.round(it.n * progreso(s, d, 1.3));
        return (
          <Aparece key={it.texto} desde={d}>
            <div style={{textAlign: 'center'}}>
              <div style={{fontFamily: F.titulo, fontWeight: 900, fontSize: v ? 190 : 170, color: blanco, lineHeight: 1}}>+{n.toLocaleString('es-CO')}</div>
              <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: v ? 52 : 46, color: azulClaro}}>{it.texto}</div>
            </div>
          </Aparece>
        );
      })}
    </div>
  );
};

/** Cronología de fechas del concurso (con nota de fuente). */
export const Cronologia: React.FC<G & {items: {fecha: string; texto: string; icono: string; desde?: number}[]; nota: string}> = ({v, items, nota}) => (
  <div style={{...centro, gap: v ? 40 : 30, padding: v ? '0 70px' : 0}}>
    <div style={{display: 'flex', flexDirection: v ? 'column' : 'row', gap: v ? 34 : 60, alignItems: 'center'}}>
      {items.map((it, i) => (
        <React.Fragment key={it.texto}>
          {i > 0 ? <Icono n={v ? 'arrow_downward' : 'arrow_forward'} t={80} c={azulClaro} /> : null}
          <Pop desde={it.desde ?? i * 0.6}>
            <div style={{background: blanco, borderRadius: 34, padding: v ? '36px 46px' : '40px 50px', width: v ? 820 : 640, boxShadow: '0 30px 60px rgba(0,0,0,.3)', display: 'flex', alignItems: 'center', gap: 30}}>
              <div style={{width: 120, height: 120, borderRadius: 30, background: C.azul50, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                <Icono n={it.icono} t={76} c={C.primario} />
              </div>
              <div>
                <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: 36, color: C.s500}}>{it.texto}</div>
                <div style={{fontFamily: F.titulo, fontWeight: 900, fontSize: 56, color: C.texto, lineHeight: 1.1}}>{it.fecha}</div>
              </div>
            </div>
          </Pop>
        </React.Fragment>
      ))}
    </div>
    <Aparece desde={1.2}>
      <div style={{fontFamily: F.texto, fontSize: v ? 30 : 28, color: azulClaro, textAlign: 'center', maxWidth: v ? 900 : 1300}}>{nota}</div>
    </Aparece>
  </div>
);

/** Calendario 2026 → 2027 con sello. */
export const Calendario: React.FC<G & {selloEn?: number}> = ({v, selloEn = 0.8}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const giro = progreso(s, 0.2, 0.6);
  const sello = entrada(s, fps, selloEn, 220);
  const hoja = (anio: string, op: number, dx: number) => (
    <div style={{position: 'absolute', width: 460, height: 500, borderRadius: 36, background: blanco, boxShadow: '0 30px 60px rgba(0,0,0,.3)', overflow: 'hidden', opacity: op, transform: `translateX(${dx}px)`}}>
      <div style={{height: 130, background: C.primario, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.titulo, fontWeight: 900, fontSize: 60, color: blanco}}>CONCURSO</div>
      <div style={{fontFamily: F.titulo, fontWeight: 900, fontSize: 170, color: C.texto, textAlign: 'center', marginTop: 40}}>{anio}</div>
    </div>
  );
  return (
    <div style={centro}>
      <div style={{position: 'relative', width: 460, height: 500, marginTop: v ? 0 : 40}}>
        {hoja('2026', 1 - giro, -giro * 200)}
        {hoja('2027', giro, (1 - giro) * 200)}
        <div
          style={{
            position: 'absolute',
            right: -120,
            top: 420,
            transform: `rotate(-10deg) scale(${2 - sello})`,
            opacity: sello,
            border: `10px solid ${C.rojo}`,
            color: C.rojo,
            background: 'rgba(255,255,255,.92)',
            fontFamily: F.titulo,
            fontWeight: 900,
            fontSize: 56,
            padding: '6px 24px',
            borderRadius: 16,
            whiteSpace: 'nowrap',
          }}
        >
          NUEVAS FECHAS
        </div>
      </div>
    </div>
  );
};

/** Precio $0 gigante. */
export const PrecioCero: React.FC<G> = ({v}) => {
  const s = useSegundos();
  const caida = interpolate(s, [0, 0.45], [-900, 0], {extrapolateRight: 'clamp', extrapolateLeft: 'clamp'});
  const rebote = s > 0.45 && s < 0.75 ? Math.sin(((s - 0.45) / 0.3) * Math.PI) * 30 : 0;
  return (
    <div style={{...centro, gap: 20}}>
      <div style={{fontFamily: F.titulo, fontWeight: 900, fontSize: v ? 460 : 400, color: blanco, lineHeight: 0.9, transform: `translateY(${caida - rebote}px)`, textShadow: '0 20px 50px rgba(0,0,0,.35)'}}>$0</div>
      <Aparece desde={0.7}>
        <div style={{fontFamily: F.titulo, fontWeight: 900, fontSize: v ? 76 : 70, color: blanco}}>Gratis por 1 año</div>
      </Aparece>
      <Aparece desde={1.1}>
        <div style={{display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(255,255,255,.15)', borderRadius: 99, padding: '14px 30px', fontFamily: F.titulo, fontWeight: 700, fontSize: v ? 44 : 40, color: azulClaro}}>
          <Icono n="credit_card_off" t={50} /> Sin tarjeta de crédito
        </div>
      </Aparece>
    </div>
  );
};

const CARGOS = [
  {n: 'Docente de Aula', i: 'school', d: 'Pedagogía · Saberes específicos'},
  {n: 'Rector', i: 'account_balance', d: 'Gestión directiva y financiera'},
  {n: 'Coordinador', i: 'groups', d: 'Convivencia · Gestión académica'},
  {n: 'Docente Orientador', i: 'psychology', d: 'Orientación · Inclusión'},
];

/** Las 4 tarjetas de cargo. */
export const Cargos: React.FC<G & {conDetalle?: boolean}> = ({v, conDetalle}) => (
  <div style={{...centro}}>
    <div style={{display: 'grid', gridTemplateColumns: v ? '1fr 1fr' : 'repeat(4, 1fr)', gap: v ? 30 : 34, padding: v ? 60 : 0}}>
      {CARGOS.map((c, i) => (
        <Pop key={c.n} desde={i * 0.25}>
          <div style={{width: v ? 440 : 380, height: v ? 440 : 400, borderRadius: 40, background: blanco, boxShadow: '0 30px 60px rgba(0,0,0,.28)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, padding: 26, boxSizing: 'border-box', textAlign: 'center'}}>
            <div style={{width: 140, height: 140, borderRadius: 40, background: C.azul50, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Icono n={c.i} t={90} c={C.primario} />
            </div>
            <div style={{fontFamily: F.titulo, fontWeight: 900, fontSize: 44, color: C.texto, lineHeight: 1.05}}>{c.n}</div>
            {conDetalle ? <div style={{fontFamily: F.texto, fontSize: 26, color: C.s500}}>{c.d}</div> : null}
          </div>
        </Pop>
      ))}
    </div>
  </div>
);

/** Barras reales de aspirantes por cargo. */
export const BarrasCargos: React.FC<G> = ({v}) => {
  const s = useSegundos();
  const max = USO.porCargo[0][1];
  return (
    <div style={{...centro, gap: 40, padding: v ? '0 70px' : '0 260px'}}>
      <Aparece>
        <div style={{...titulo(v, 0.8)}}>+{(2300).toLocaleString('es-CO')} aspirantes registrados</div>
      </Aparece>
      <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: 26}}>
        {USO.porCargo.map(([n, val], i) => {
          const k = progreso(s, 0.4 + i * 0.25, 0.9);
          return (
            <div key={n}>
              <div style={{display: 'flex', justifyContent: 'space-between', fontFamily: F.titulo, fontWeight: 700, fontSize: v ? 44 : 40, color: blanco, marginBottom: 10}}>
                <span>{n}</span>
                <span>{Math.round(val * k).toLocaleString('es-CO')}</span>
              </div>
              <div style={{height: v ? 44 : 40, borderRadius: 99, background: 'rgba(255,255,255,.15)'}}>
                <div style={{height: '100%', borderRadius: 99, width: `${Math.max(3, (val / max) * 100 * k)}%`, background: 'linear-gradient(90deg,#34d399,#10b981)'}} />
              </div>
            </div>
          );
        })}
      </div>
      <Aparece desde={1.6}>
        <div style={{fontFamily: F.texto, fontSize: 26, color: azulClaro}}>Datos de la plataforma · noviembre de 2026</div>
      </Aparece>
    </div>
  );
};

/** Ciclo de estudio: Diagnóstico → Focalizado → Simulacro CNSC. */
export const Ciclo: React.FC<G & {pasos?: {desde: number}[]}> = ({v, pasos}) => {
  const items = [
    {t: 'Diagnóstico', d: 'para medir', i: 'health_and_safety', c: C.indigo},
    {t: 'Focalizado', d: 'para mejorar lo débil', i: 'category', c: '#059669'},
    {t: 'Simulacro CNSC', d: 'para ponerte a prueba', i: 'timer', c: C.ambar600},
  ];
  return (
    <div style={{...centro}}>
      <div style={{display: 'flex', flexDirection: v ? 'column' : 'row', alignItems: 'center', gap: v ? 24 : 40}}>
        {items.map((it, i) => (
          <React.Fragment key={it.t}>
            {i > 0 ? <Icono n={v ? 'arrow_downward' : 'arrow_forward'} t={70} c={azulClaro} /> : null}
            <Pop desde={pasos?.[i]?.desde ?? i * 0.7}>
              <div style={{width: v ? 760 : 460, borderRadius: 36, background: blanco, padding: v ? '30px 40px' : '40px 30px', display: 'flex', flexDirection: v ? 'row' : 'column', alignItems: 'center', gap: 24, boxShadow: '0 24px 50px rgba(0,0,0,.28)', boxSizing: 'border-box'}}>
                <div style={{width: 120, height: 120, borderRadius: 32, background: C.s100, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                  <Icono n={it.i} t={76} c={it.c} />
                </div>
                <div style={{textAlign: v ? 'left' : 'center'}}>
                  <div style={{fontFamily: F.titulo, fontWeight: 900, fontSize: 50, color: C.texto}}>{it.t}</div>
                  <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: 34, color: C.s500}}>{it.d}</div>
                </div>
              </div>
            </Pop>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

/** Caso del quiz en grande (datos reales de la pregunta). */
export const Caso: React.FC<G & {pasos?: {desde: number}[]}> = ({v, pasos}) => {
  const datos = [
    {n: '10%', t: 'deserción anual', i: 'trending_down'},
    {n: '40%', t: 'se va por plata', i: 'payments'},
    {n: '30%', t: 'por bajo rendimiento', i: 'menu_book'},
    {n: '30%', t: 'por razones personales', i: 'person'},
    {n: '25%', t: 'cubren las becas (no crecen)', i: 'savings'},
  ];
  return (
    <div style={{...centro, gap: 26}}>
      <Aparece>
        <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: v ? 40 : 38, color: azulClaro, display: 'flex', alignItems: 'center', gap: 12}}>
          <Icono n="menu_book" t={48} /> Caso situacional · Rector
        </div>
      </Aparece>
      <div style={{display: 'grid', gridTemplateColumns: v ? '1fr' : '1fr 1fr', gap: 20, width: v ? 900 : 1500}}>
        {datos.map((d, i) => (
          <Pop key={d.t} desde={pasos?.[i]?.desde ?? i * 0.5}>
            <div style={{background: blanco, borderRadius: 28, padding: '20px 30px', display: 'flex', alignItems: 'center', gap: 24, boxShadow: '0 16px 30px rgba(0,0,0,.22)'}}>
              <Icono n={d.i} t={60} c={C.primario} />
              <div style={{fontFamily: F.titulo, fontWeight: 900, fontSize: 66, color: C.texto, width: 170}}>{d.n}</div>
              <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: 36, color: C.s600}}>{d.t}</div>
            </div>
          </Pop>
        ))}
      </div>
      <Aparece desde={(pasos?.[5]?.desde ?? 3) as number}>
        <div style={{background: C.ambar, color: C.texto, fontFamily: F.titulo, fontWeight: 900, fontSize: v ? 46 : 44, padding: '18px 34px', borderRadius: 24, textAlign: 'center', maxWidth: v ? 900 : 1400}}>
          Meta: bajar la deserción un 15 % sin aumentar becas
        </div>
      </Aparece>
    </div>
  );
};

/** Quiz: opciones cortas, cuenta regresiva y revelado de la B. */
export const Quiz: React.FC<G & {cuentaDesde?: number; revelarEn?: number; inmediato?: boolean}> = ({v, cuentaDesde, revelarEn, inmediato}) => {
  const s = useSegundos();
  const revelado = revelarEn !== undefined && s >= revelarEn;
  const cuenta = cuentaDesde !== undefined && s >= cuentaDesde && !revelado ? Math.max(1, 3 - Math.floor(s - cuentaDesde)) : null;
  return (
    <div style={{...centro, gap: 26}}>
      {cuenta !== null ? (
        <div style={{position: 'absolute', top: v ? 1380 : 40, right: v ? undefined : 80, width: 170, height: 170, borderRadius: 99, background: C.ambar, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.titulo, fontWeight: 900, fontSize: 110, color: C.texto, boxShadow: '0 20px 40px rgba(0,0,0,.3)'}}>
          {cuenta}
        </div>
      ) : null}
      <div style={{display: 'flex', flexDirection: 'column', gap: 22, width: v ? 920 : 1300}}>
        {OPCIONES_CORTAS.map((o, i) => {
          const ok = o.id === 'B';
          const bg = revelado ? (ok ? '#dcfce7' : 'rgba(255,255,255,.55)') : blanco;
          return (
            <Pop key={o.id} desde={inmediato ? -2 : i * 0.25}>
              <div style={{background: bg, borderRadius: 30, padding: '24px 30px', display: 'flex', alignItems: 'center', gap: 26, border: revelado && ok ? `6px solid ${C.verde500}` : '6px solid transparent', boxShadow: '0 16px 30px rgba(0,0,0,.22)', transform: revelado && ok ? 'scale(1.04)' : undefined}}>
                <div style={{width: 92, height: 92, borderRadius: 99, background: revelado && ok ? C.verde500 : C.primario, color: blanco, fontFamily: F.titulo, fontWeight: 900, fontSize: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                  {revelado && ok ? <Icono n="check" t={64} /> : o.id}
                </div>
                <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: v ? 44 : 46, color: C.texto, lineHeight: 1.15}}>{o.texto}</div>
              </div>
            </Pop>
          );
        })}
      </div>
    </div>
  );
};

/** Pila de normas para el gancho de normativa. */
export const Normas: React.FC<G> = ({v}) => {
  const normas = ['Ley 115 de 1994', 'Decreto 1278 de 2002', 'Decreto 1075 de 2015', 'Ley 1620 de 2013', 'Decreto 1290 de 2009', 'Decreto 1421 de 2017'];
  return (
    <div style={{...centro}}>
      <div style={{position: 'relative', width: v ? 820 : 900, height: v ? 900 : 760}}>
        {normas.map((n, i) => (
          <Pop key={n} desde={i * 0.35} style={{position: 'absolute', left: (i % 2) * (v ? 90 : 120) + 20, top: i * (v ? 130 : 105)}}>
            <div style={{width: v ? 640 : 680, background: blanco, borderRadius: 26, padding: '22px 30px', display: 'flex', alignItems: 'center', gap: 22, boxShadow: '0 20px 40px rgba(0,0,0,.28)', transform: `rotate(${(i % 3) - 1}deg)`}}>
              <Icono n="description" t={60} c={C.primario} />
              <div style={{fontFamily: F.titulo, fontWeight: 900, fontSize: v ? 40 : 46, color: C.texto, whiteSpace: 'nowrap'}}>{n}</div>
            </div>
          </Pop>
        ))}
      </div>
    </div>
  );
};

/** Micrófono con ondas (gancho de entrevista). */
export const Micro: React.FC<G> = ({v}) => {
  const s = useSegundos();
  return (
    <div style={{...centro, gap: 40}}>
      <Pop>
        <div style={{width: 320, height: 320, borderRadius: 999, background: 'linear-gradient(135deg,#9333ea,#4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 ${30 + Math.sin(s * 5) * 18}px rgba(255,255,255,.12)`}}>
          <Icono n="mic" t={190} c={blanco} lleno />
        </div>
      </Pop>
      <div style={{display: 'flex', gap: 12, height: 160, alignItems: 'center'}}>
        {Array.from({length: v ? 20 : 28}).map((_, i) => (
          <div key={i} style={{width: 16, borderRadius: 8, background: 'rgba(255,255,255,.85)', height: 20 + Math.abs(Math.sin(s * 6 + i * 0.6)) * 130}} />
        ))}
      </div>
    </div>
  );
};

/** Anillo de puntaje que se llena (gancho de resultados). */
export const Puntaje: React.FC<G & {valor?: number}> = ({valor = 74}) => {
  const s = useSegundos();
  const p = Math.round(valor * progreso(s, 0.2, 1.5));
  return (
    <div style={{...centro}}>
      <div style={{position: 'relative', width: 560, height: 560}}>
        <svg width="560" height="560" style={{transform: 'rotate(-90deg)'}}>
          <circle cx="280" cy="280" r="240" stroke="rgba(255,255,255,.15)" strokeWidth="44" fill="none" />
          <circle cx="280" cy="280" r="240" stroke={C.verde} strokeWidth="44" fill="none" strokeDasharray={1508} strokeDashoffset={1508 - (1508 * p) / 100} strokeLinecap="round" />
        </svg>
        <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{fontFamily: F.titulo, fontWeight: 900, fontSize: 170, color: blanco}}>{p}%</div>
          <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: 34, color: azulClaro, letterSpacing: 2}}>PUNTAJE GLOBAL</div>
        </div>
      </div>
    </div>
  );
};

/** Lista de simulacros con puntajes que suben y bajan (gancho del Coach IA; curva real del tablero). */
export const ListaSims: React.FC<G> = ({v}) => (
  <div style={{...centro}}>
    <div style={{display: 'flex', flexDirection: 'column', gap: 18, width: v ? 860 : 900}}>
      {TABLERO.simulacros.map((p, i) => (
        <Pop key={i} desde={i * 0.25}>
          <div style={{background: blanco, borderRadius: 24, padding: '18px 30px', display: 'flex', alignItems: 'center', gap: 24, boxShadow: '0 14px 28px rgba(0,0,0,.22)'}}>
            <Icono n="timer" t={50} c={C.ambar} />
            <div style={{flex: 1, fontFamily: F.titulo, fontWeight: 700, fontSize: 40, color: C.texto}}>Simulacro {i + 1}</div>
            <div style={{fontFamily: F.titulo, fontWeight: 900, fontSize: 54, color: p >= 70 ? C.verde600 : C.rojo600}}>{p}%</div>
            <Icono n={i === 0 ? 'remove' : p > TABLERO.simulacros[i - 1] ? 'trending_up' : p < TABLERO.simulacros[i - 1] ? 'trending_down' : 'trending_flat'} t={54} c={C.s400} />
          </div>
        </Pop>
      ))}
    </div>
  </div>
);

/** Ejercicio de porcentaje (gancho de matemáticas). */
export const Mate: React.FC<G> = ({v}) => {
  const s = useSegundos();
  return (
    <div style={{...centro, gap: 30}}>
      <Pop>
        <div style={{background: blanco, borderRadius: 40, padding: v ? '44px 50px' : '50px 90px', boxShadow: '0 30px 60px rgba(0,0,0,.3)', fontFamily: F.titulo, fontWeight: 900, fontSize: v ? 96 : 150, color: C.texto, display: 'flex', alignItems: 'center', gap: v ? 18 : 30, whiteSpace: 'nowrap'}}>
          25% de 360 =<span style={{color: C.primario, transform: `rotate(${Math.sin(s * 4) * 10}deg)`, display: 'inline-block'}}>?</span>
        </div>
      </Pop>
      <Aparece desde={0.6}>
        <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: 46, color: azulClaro}}>Razonamiento cuantitativo</div>
      </Aparece>
    </div>
  );
};

export const GRAFICOS: Record<string, React.FC<any>> = {Gancho, Cifras, Cronologia, Calendario, PrecioCero, Cargos, BarrasCargos, Ciclo, Caso, Quiz, Normas, Micro, Puntaje, ListaSims, Mate};
