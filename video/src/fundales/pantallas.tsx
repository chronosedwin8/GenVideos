import React from 'react';
import {interpolate, useVideoConfig} from 'remotion';
import {entrada, progreso, useSegundos} from '../comun/tiempo';
import {Aparece, C, F, Icono, PaginaApp, Tocable} from './ui';
import {ASISTENTE_REAL, COACH_REAL, COMPETENCIAS, LEYES, PLANES, PREGUNTA_REAL, RUTA_DOCENTE, TABLERO, VIDEOS_MATE} from './datos';

/* Tiempos: todos los props de tiempo llegan en segundos de la escena (ya resueltos desde las palabras de la voz). */
export type Toque = {id: string; en: number};
const tq = (toques: Toque[] | undefined, id: string) => toques?.find((x) => x.id === id)?.en;
const ya = (s: number, en?: number) => en !== undefined && s >= en;

/** Texto que se escribe solo desde `desde` (≈ 14 caracteres por segundo). */
const useEscrito = (texto: string, desde?: number, cps = 16) => {
  const s = useSegundos();
  if (desde === undefined) return '';
  const n = Math.max(0, Math.floor((s - desde) * cps));
  return texto.slice(0, n);
};

const tarjeta: React.CSSProperties = {background: 'white', border: `1px solid ${C.borde}`, borderRadius: 14, boxShadow: '0 1px 2px rgba(0,0,0,.05)'};
const h1 = (m?: boolean): React.CSSProperties => ({fontFamily: F.titulo, fontWeight: 900, fontSize: m ? 28 : 32, color: C.texto, letterSpacing: -0.5, margin: 0});

type Base = {m?: boolean; toques?: Toque[]; scroll?: number};

/* ═══════════════ 1. Inicio (LandingPage.tsx) ═══════════════ */

export const Inicio: React.FC<Base> = ({m, toques, scroll = 0}) => (
  <div style={{position: 'absolute', inset: 0, background: C.fondo, fontFamily: F.texto, overflow: 'hidden'}}>
    <div style={{height: m ? 60 : 68, background: 'rgba(255,255,255,.9)', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: m ? '0 16px' : '0 48px'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 8}}>
        <Icono n="school" t={30} c={C.primario} />
        <b style={{fontFamily: F.titulo, fontSize: 18, color: C.texto}}>Entrenador Docente</b>
      </div>
      {m ? null : (
        <div style={{display: 'flex', gap: 32, fontSize: 14, color: C.s600, fontWeight: 500}}>
          {['Inicio', 'Características', 'Galería', 'Videos', 'Planes', 'Preguntas'].map((x) => (
            <span key={x}>{x}</span>
          ))}
        </div>
      )}
      <div style={{background: C.primario, color: 'white', fontWeight: 700, fontSize: 14, padding: '10px 22px', borderRadius: 12}}>Ingresar</div>
    </div>
    <div style={{position: 'absolute', left: 0, right: 0, top: (m ? 60 : 68) - scroll, background: 'linear-gradient(270deg, rgba(219,234,254,.7), rgba(245,247,248,0) 55%)'}}>
      <div style={{maxWidth: m ? 360 : 900, margin: '0 auto', textAlign: 'center', padding: m ? '48px 0' : '86px 0 70px'}}>
        <div style={{display: 'inline-block', padding: '4px 12px', borderRadius: 99, background: C.azul100, color: '#1d4ed8', fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 18}}>
          Concurso Docente 2026
        </div>
        <h1 style={{fontFamily: F.titulo, fontWeight: 900, fontSize: m ? 34 : 60, lineHeight: 1.1, color: C.texto, margin: '0 0 22px', letterSpacing: -1}}>
          Simulacro Concurso Docente 2026: Tu Plaza en la Carrera Pública con{' '}
          <span style={{background: 'linear-gradient(90deg,#0d7ff2,#2563eb)', WebkitBackgroundClip: 'text', color: 'transparent'}}>Entrenamiento de Élite</span>.
        </h1>
        <p style={{fontSize: m ? 17 : 20, color: C.s600, lineHeight: 1.6, margin: '0 auto 34px', maxWidth: 680}}>
          Plataforma especializada para Rectores, Coordinadores, Orientadores y Docentes. Domina el Juicio Situacional y los Ejes Temáticos de la CNSC.
        </p>
        <Tocable en={tq(toques, 'empezar')} style={{display: 'inline-block'}}>
          <div style={{background: C.primario, color: 'white', fontFamily: F.titulo, fontWeight: 700, fontSize: m ? 16 : 18, padding: m ? '16px 22px' : '18px 34px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 10px 20px rgba(13,127,242,.3)'}}>
            EMPEZAR MI ENTRENAMIENTO <Icono n="arrow_forward" t={22} />
          </div>
        </Tocable>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: m ? 14 : 26, maxWidth: m ? 358 : 1160, margin: '0 auto', padding: m ? 0 : '30px 0'}}>
        {[
          ['smart_toy', '#7c3aed', 'Simulacros con IA', 'Genera pruebas que imitan la estructura y dificultad del examen real.'],
          ['psychology', '#f97316', 'Juicio Situacional', 'Entrena con preguntas de juicio situacional y razonamiento lógico.'],
          ['analytics', C.primario, 'Análisis de Resultados', 'Recibe una calificación detallada por cada área de competencia.'],
        ].map(([ic, col, t, d]) => (
          <div key={t} style={{background: C.s50, border: '1px solid #f1f5f9', borderRadius: 22, padding: 26}}>
            <div style={{width: 50, height: 50, borderRadius: 14, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14}}>
              <Icono n={ic} t={28} c={col} />
            </div>
            <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: 19, marginBottom: 6}}>{t}</div>
            <div style={{fontSize: 14, color: C.s600, lineHeight: 1.5}}>{d}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ═══════════════ 2. Registro (Onboarding.tsx) ═══════════════ */

export const Registro: React.FC<Base & {nombreDesde?: number; rol?: string; rolEn?: number; area?: string; areaEn?: number; correoDesde?: number; claveDesde?: number}> = ({
  m,
  toques,
  nombreDesde,
  rol,
  rolEn,
  area,
  areaEn,
  correoDesde,
  claveDesde,
}) => {
  const s = useSegundos();
  const nombre = useEscrito('Laura Gómez', nombreDesde);
  const correo = useEscrito('laura.gomez@correo.com', correoDesde, 22);
  const clave = useEscrito('••••••••', claveDesde, 12);
  const campo = (label: string, icono: string | null, valor: string, vacio: string, id?: string, en?: number) => (
    <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
      <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: 14, color: C.texto, display: 'flex', alignItems: 'center', gap: 6}}>
        {icono ? <Icono n={icono} t={19} c={C.primario} /> : null}
        {label}
      </div>
      <Tocable en={id ? tq(toques, id) : undefined}>
        <div
          style={{
            height: 54,
            borderRadius: 12,
            border: `1px solid ${en !== undefined && s >= en && s < en + 1.2 ? C.primario : '#cbd5e1'}`,
            background: 'white',
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 16,
            color: valor ? C.texto : C.s400,
          }}
        >
          <span>{valor || vacio}</span>
          {id ? <Icono n="expand_more" t={22} c={C.s500} /> : null}
        </div>
      </Tocable>
    </div>
  );
  return (
    <PaginaApp m={m} sinWhatsApp>
      <div style={{display: 'flex', minHeight: m ? 760 : 840}}>
        <div style={{flex: 1, display: 'flex', justifyContent: 'center', padding: m ? '28px 20px' : '56px 0'}}>
          <div style={{width: m ? 350 : 440, display: 'flex', flexDirection: 'column', gap: 18}}>
            <div>
              <span style={{display: 'inline-block', padding: '4px 12px', borderRadius: 99, background: C.azul100, color: C.primario, fontSize: 12, fontWeight: 700}}>Paso 1 de 3</span>
              <h1 style={{...h1(m), fontSize: m ? 32 : 38, margin: '10px 0 6px'}}>Crea tu Cuenta</h1>
              <div style={{color: C.s500, fontSize: 17}}>Configura tu perfil para un entrenamiento personalizado.</div>
            </div>
            {campo('Nombre del Aspirante', null, nombre, 'Tu nombre completo')}
            {campo('Cargo a Aspirar', 'badge', rol && ya(s, rolEn) ? rol : '', 'Selecciona tu rol', 'rol', rolEn)}
            {rol === 'Docente de Aula' || !rol ? campo('Área de Conocimiento', 'category', area && ya(s, areaEn) ? area : '', 'Selecciona el área', 'area', areaEn) : null}
            {campo('Correo Electrónico', null, correo, 'ejemplo@correo.com')}
            {campo('Contraseña', null, clave, '••••••••')}
            <Tocable en={tq(toques, 'crear')}>
              <div style={{height: 56, borderRadius: 12, background: C.primario, color: 'white', fontFamily: F.titulo, fontWeight: 700, fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 6px 14px rgba(13,127,242,.25)'}}>
                Configurar Cuenta <Icono n="arrow_forward" t={22} />
              </div>
            </Tocable>
          </div>
        </div>
        {m ? null : (
          <div style={{width: 560, background: 'white', borderLeft: `1px solid ${C.borde}`, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 22, padding: 56}}>
            {[
              ['gavel', 'Motor Normativo', 'Preguntas generadas basándose estrictamente en Ley 115, Decreto 1278 y 1075.'],
              ['psychology', 'IA Situacional', 'Casos pedagógicos realistas adaptados a tu cargo específico.'],
            ].map(([ic, t, d]) => (
              <div key={t} style={{...tarjeta, padding: 24}}>
                <Icono n={ic} t={30} c={C.primario} />
                <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: 19, margin: '8px 0 4px'}}>{t}</div>
                <div style={{fontSize: 14, color: C.s500}}>{d}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PaginaApp>
  );
};

/** Lista desplegada de un select (roles, áreas o competencias). */
export const ListaOpciones: React.FC<{opciones: string[]; elegida?: string; desde?: number; ancho?: number}> = ({opciones, elegida, desde = 0, ancho = 340}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const e = entrada(s, fps, desde);
  return (
    <div style={{...tarjeta, width: ancho, padding: 6, boxShadow: '0 16px 30px rgba(13,20,28,.18)', opacity: e, transform: `translateY(${(1 - e) * -10}px)`}}>
      {opciones.map((o) => (
        <div key={o} style={{padding: '9px 12px', borderRadius: 8, fontSize: 15, background: o === elegida ? C.primario : 'transparent', color: o === elegida ? 'white' : C.s700, fontWeight: o === elegida ? 700 : 400}}>
          {o}
        </div>
      ))}
    </div>
  );
};

/* ═══════════════ 3. Diseña tu Estrategia (ConfigPanel.tsx) ═══════════════ */

const MODOS = [
  {id: 'diag', titulo: 'Diagnóstico Inicial', desc: 'Sesión corta (10 preguntas) para identificar fortalezas y debilidades normativas rápidamente.', icono: 'health_and_safety', fondo: C.indigo100, color: C.indigo},
  {id: 'cnsc', titulo: 'Simulacro Tipo CNSC', desc: 'Experiencia realista. Cronómetro activo, mezcla de todas las competencias y retroalimentación al final.', icono: 'timer', fondo: '#fef3c7', color: C.ambar600},
  {id: 'foco', titulo: 'Entrenamiento Focalizado', desc: 'Practica una competencia específica sin límite de tiempo y con feedback inmediato.', icono: 'category', fondo: '#d1fae5', color: '#059669'},
];

export const Configuracion: React.FC<
  Base & {modo?: string; cantidad?: number; rol?: string; area?: string; premium?: boolean; competencia?: string; listaEn?: number; competenciaEn?: number; cantidadDesde?: number; cantidadA?: number}
> = ({m, toques, scroll, modo = 'diag', cantidad = 10, rol = 'Docente de Aula', area = 'Primaria', premium = false, competencia, listaEn, competenciaEn, cantidadDesde, cantidadA}) => {
  const s = useSegundos();
  const max = modo === 'diag' ? 15 : 50;
  let cant = cantidad;
  if (cantidadDesde !== undefined && cantidadA !== undefined) cant = Math.round(interpolate(progreso(s, cantidadDesde, 0.8), [0, 1], [cantidad, cantidadA]) / 5) * 5;
  const comp = competencia && ya(s, competenciaEn) ? competencia : undefined;
  const listaAbierta = ya(s, listaEn) && !(competenciaEn !== undefined && s >= competenciaEn + 0.5);
  return (
    <PaginaApp m={m} activa="simulacros" scroll={scroll} premium={premium}>
      <div style={{maxWidth: m ? 358 : 1024, margin: '0 auto', padding: m ? '22px 0' : '36px 0', display: 'flex', flexDirection: 'column', gap: 20}}>
        <div>
          <div style={{fontSize: 14, color: C.s500}}>
            Inicio / <b style={{color: C.primario}}>Configuración</b>
          </div>
          <h1 style={{...h1(m), margin: '6px 0'}}>Diseña tu Estrategia</h1>
          <div style={{color: C.s500, fontSize: 16}}>
            Personaliza la sesión para el perfil de <b style={{color: C.s800}}>{rol}{rol === 'Docente de Aula' ? ` - ${area}` : ''}</b>.
          </div>
        </div>
        <div style={{display: 'flex', flexDirection: m ? 'column' : 'row', gap: m ? 18 : 30}}>
          <div style={{flex: 2, display: 'flex', flexDirection: 'column', gap: 14}}>
            <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: 18}}>Selecciona el Modo de Preparación</div>
            {MODOS.map((x) => {
              const sel = x.id === modo;
              return (
                <Tocable key={x.id} en={tq(toques, x.id)}>
                  <div style={{padding: m ? 16 : 22, borderRadius: 14, border: `2px solid ${sel ? C.primario : C.borde}`, background: sel ? 'rgba(239,246,255,.6)' : 'white', display: 'flex', gap: 14, alignItems: 'flex-start'}}>
                    <div style={{width: 48, height: 48, borderRadius: 10, background: x.fondo, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                      <Icono n={x.icono} t={26} c={x.color} />
                    </div>
                    <div style={{flex: 1}}>
                      <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: 18}}>{x.titulo}</div>
                      <div style={{fontSize: 14, color: C.s500, marginTop: 4, lineHeight: 1.45}}>{x.desc}</div>
                    </div>
                    {sel ? <Icono n="check_circle" t={26} c={C.primario} /> : null}
                  </div>
                </Tocable>
              );
            })}
          </div>
          <div style={{flex: 1}}>
            <div style={{...tarjeta, padding: 22, display: 'flex', flexDirection: 'column', gap: 18}}>
              <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: 18, display: 'flex', alignItems: 'center', gap: 8}}>
                <Icono n="tune" t={24} c={C.s400} /> Parámetros
              </div>
              {modo === 'foco' ? (
                <div style={{position: 'relative'}}>
                  <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: 14, marginBottom: 8}}>Competencia Objetivo</div>
                  <Tocable en={tq(toques, 'lista')}>
                    <div style={{height: 46, borderRadius: 8, border: '1px solid #cbd5e1', background: C.s50, padding: '0 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 14, color: comp ? C.texto : C.s400}}>
                      {comp ?? 'Seleccionar...'} <Icono n="expand_more" t={20} c={C.s500} />
                    </div>
                  </Tocable>
                  {listaAbierta ? (
                    <div style={{position: 'absolute', top: 82, left: 0, zIndex: 10}}>
                      <ListaOpciones opciones={COMPETENCIAS[rol]} elegida={competencia && competenciaEn !== undefined && s >= competenciaEn - 0.3 ? competencia : undefined} desde={listaEn} ancho={m ? 320 : 300} />
                    </div>
                  ) : null}
                </div>
              ) : null}
              <div>
                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 700}}>
                  <span style={{fontFamily: F.titulo}}>Cantidad de Preguntas</span>
                  <span style={{color: C.primario}}>{cant}</span>
                </div>
                <div style={{position: 'relative', height: 20, marginTop: 8}}>
                  <div style={{position: 'absolute', top: 8, left: 0, right: 0, height: 5, borderRadius: 9, background: '#e2e8f0'}} />
                  <div style={{position: 'absolute', top: 8, left: 0, width: `${((cant - 5) / (max - 5)) * 100}%`, height: 5, borderRadius: 9, background: C.primario}} />
                  <div style={{position: 'absolute', top: 1, left: `calc(${((cant - 5) / (max - 5)) * 100}% - 9px)`, width: 18, height: 18, borderRadius: 99, background: C.primario, border: '2px solid white', boxShadow: '0 1px 3px rgba(0,0,0,.3)'}} />
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 12, color: C.s400}}>
                  <span>Min: 5</span>
                  <span>Max: {max}</span>
                </div>
              </div>
              {premium ? (
                <div style={{display: 'flex', gap: 10, padding: 14, borderRadius: 8, background: 'linear-gradient(90deg,#fffbeb,#fff7ed)', border: '1px solid #fde68a'}}>
                  <div style={{width: 16, height: 16, borderRadius: 4, border: '2px solid #f59e0b', marginTop: 2}} />
                  <div>
                    <div style={{fontSize: 14, fontWeight: 700, color: '#92400e', display: 'flex', alignItems: 'center', gap: 4}}>
                      <Icono n="auto_awesome" t={16} /> Generar preguntas nuevas
                    </div>
                    <div style={{fontSize: 12, color: C.ambar600}}>Ignora el banco de preguntas y genera con IA en tiempo real.</div>
                  </div>
                </div>
              ) : null}
              <div style={{padding: 14, background: C.s50, border: `1px solid ${C.s100}`, borderRadius: 8, fontSize: 14, display: 'flex', flexDirection: 'column', gap: 6}}>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <span style={{color: C.s500}}>Tiempo estimado:</span>
                  <b>{Math.ceil(cant * 2.5)} min</b>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <span style={{color: C.s500}}>Dificultad:</span>
                  <b>Adaptativa (Media/Alta)</b>
                </div>
              </div>
              <Tocable en={tq(toques, 'generar')}>
                <div style={{height: 56, borderRadius: 12, background: C.primario, color: 'white', fontFamily: F.titulo, fontWeight: 700, fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: '0 4px 10px rgba(13,127,242,.25)'}}>
                  Generar Simulacro IA <Icono n="auto_awesome" t={22} />
                </div>
              </Tocable>
            </div>
          </div>
        </div>
      </div>
    </PaginaApp>
  );
};

/* ═══════════════ 4. Preparando sesión (App.tsx LOADING_EXAM) ═══════════════ */

const MENSAJES = ['Conectando con la inteligencia artificial...', 'Generando casos pedagógicos personalizados...', 'Aplicando marco normativo vigente...', 'Calibrando nivel de dificultad CNSC...'];

export const Cargando: React.FC<Base & {desde?: number; hasta?: number}> = ({m, desde = 0, hasta = 3}) => {
  const s = useSegundos();
  const p = Math.round(interpolate(s, [desde, hasta], [10, 100], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const msg = p >= 100 ? '¡Preguntas listas! Iniciando simulacro...' : MENSAJES[Math.min(MENSAJES.length - 1, Math.floor(((s - desde) / Math.max(0.1, hasta - desde)) * MENSAJES.length))];
  return (
    <PaginaApp m={m} activa="simulacros">
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: m ? 150 : 170}}>
        <div style={{position: 'relative', width: 128, height: 128, marginBottom: 30}}>
          <svg width="128" height="128" style={{transform: 'rotate(-90deg)'}}>
            <circle cx="64" cy="64" r="60" stroke="#e2e8f0" strokeWidth="8" fill="none" />
            <circle cx="64" cy="64" r="60" stroke={C.primario} strokeWidth="8" fill="none" strokeDasharray={377} strokeDashoffset={377 - (377 * p) / 100} strokeLinecap="round" />
          </svg>
          <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.titulo, fontWeight: 700, fontSize: 22, color: C.primario}}>{p}%</div>
        </div>
        <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: 26, marginBottom: 16}}>Preparando Sesión</div>
        <div style={{fontSize: 18, color: C.s600, maxWidth: 420, minHeight: 56}}>{msg}</div>
        <div style={{fontSize: 14, color: C.s400, maxWidth: 360, marginTop: 10}}>El examen comenzará en breve y se cargarán más preguntas mientras respondes.</div>
      </div>
    </PaginaApp>
  );
};

/* ═══════════════ 5. Simulador (Simulator.tsx) ═══════════════ */

export const Simulador: React.FC<
  Base & {n?: number; total?: number; practica?: boolean; tiempo?: number; relojDesde?: number; elegida?: string; elegidaEn?: number; verificadaEn?: number; competencia?: string}
> = ({m, toques, scroll, n = 1, total = 10, practica, tiempo, relojDesde = 0, elegida, elegidaEn, verificadaEn, competencia}) => {
  const s = useSegundos();
  const q = PREGUNTA_REAL;
  const sel = elegida && ya(s, elegidaEn) ? elegida : undefined;
  const verif = practica && ya(s, verificadaEn);
  const restante = Math.max(0, Math.round((tiempo ?? total * 120) - Math.max(0, s - relojDesde)));
  const reloj = `${Math.floor(restante / 60)}:${String(restante % 60).padStart(2, '0')}`;
  const opciones = q.opciones.map((o) => {
    let borde = C.borde;
    let fondo = 'white';
    let op = 1;
    if (sel === o.id) {
      borde = C.primario;
      fondo = C.azul50;
    }
    if (verif) {
      if (o.id === q.correcta) {
        borde = C.verde500;
        fondo = C.verde50;
      } else if (sel === o.id) {
        borde = C.rojo;
        fondo = C.rojo50;
      } else op = 0.5;
    }
    const marcada = sel === o.id || (verif && o.id === q.correcta);
    return (
      <Tocable key={o.id} en={tq(toques, o.id)}>
        <div style={{padding: m ? 12 : 16, borderRadius: 12, border: `2px solid ${borde}`, background: fondo, opacity: op, display: 'flex', gap: 12, alignItems: 'flex-start'}}>
          <div style={{width: 30, height: 30, borderRadius: 99, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, background: marcada ? C.primario : C.s100, color: marcada ? 'white' : C.s600}}>
            {o.id}
          </div>
          <div style={{fontSize: m ? 14 : 16, color: C.s800, lineHeight: 1.45, paddingTop: 3}}>{o.texto}</div>
        </div>
      </Tocable>
    );
  });
  return (
    <PaginaApp m={m} activa="simulacros" scroll={scroll}>
      <div style={{maxWidth: m ? 366 : 1120, margin: '0 auto', padding: m ? '14px 0' : '24px 0', display: 'flex', flexDirection: 'column', gap: m ? 14 : 22}}>
        <div style={{...tarjeta, padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 14}}>
            <b style={{fontSize: 18, color: C.s700}}>
              Pregunta {n} <span style={{color: C.s400, fontSize: 14}}>/ {total}</span>
            </b>
            {m ? null : (
              <div style={{width: 130, height: 8, borderRadius: 9, background: C.s100, overflow: 'hidden'}}>
                <div style={{width: `${(n / total) * 100}%`, height: '100%', background: C.primario}} />
              </div>
            )}
          </div>
          {practica ? null : (
            <div style={{display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'monospace', fontWeight: 700, fontSize: 18, padding: '4px 12px', borderRadius: 6, background: C.s50, color: restante < 300 ? C.rojo600 : C.s700}}>
              <Icono n="timer" t={22} /> {reloj}
            </div>
          )}
        </div>
        <div style={{display: 'flex', flexDirection: m ? 'column' : 'row', gap: m ? 14 : 22}}>
          <div style={{...tarjeta, flex: 1, overflow: 'hidden', alignSelf: 'flex-start'}}>
            <div style={{background: C.s50, borderBottom: `1px solid ${C.borde}`, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <b style={{display: 'flex', alignItems: 'center', gap: 8, color: C.s700, fontSize: 16}}>
                <Icono n="menu_book" t={22} c={C.primario} /> Caso Situacional
              </b>
              <span style={{fontSize: 12, padding: '3px 8px', border: `1px solid ${C.borde}`, borderRadius: 4, color: C.s500, background: 'white', maxWidth: 160, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>
                {competencia ?? q.competencia}
              </span>
            </div>
            <div style={{padding: m ? 16 : 22}}>
              <div style={{fontSize: m ? 15 : 18, lineHeight: 1.6, color: C.s800}}>{q.contexto}</div>
              <div style={{marginTop: 18, padding: 14, background: C.azul50, borderLeft: `4px solid ${C.primario}`, borderRadius: '0 8px 8px 0'}}>
                <div style={{fontWeight: 700, color: C.primarioOsc, marginBottom: 4}}>Pregunta:</div>
                <div style={{fontWeight: 500, fontSize: m ? 14 : 16, lineHeight: 1.5, color: C.texto}}>{q.pregunta}</div>
              </div>
            </div>
          </div>
          <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 10}}>
            {opciones}
            {verif ? (
              <Aparece desde={verificadaEn}>
                <div style={{...tarjeta, padding: 18, boxShadow: '0 10px 24px rgba(0,0,0,.08)'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, color: sel === q.correcta ? C.verde600 : C.rojo600, marginBottom: 6}}>
                    <Icono n={sel === q.correcta ? 'check_circle' : 'cancel'} t={24} /> {sel === q.correcta ? 'Respuesta Correcta' : 'Respuesta Incorrecta'}
                  </div>
                  <div style={{fontSize: 14, color: C.s700, lineHeight: 1.5}}>{q.explicacion}</div>
                  <div style={{marginTop: 12, height: 48, borderRadius: 8, background: C.primario, color: 'white', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Siguiente Pregunta</div>
                </div>
              </Aparece>
            ) : (
              <Tocable en={tq(toques, 'confirmar')}>
                <div style={{height: 56, borderRadius: 12, background: C.primario, opacity: sel ? 1 : 0.5, color: 'white', fontWeight: 700, fontSize: 17, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  {practica ? 'Verificar Respuesta' : 'Confirmar y Avanzar'}
                </div>
              </Tocable>
            )}
          </div>
        </div>
      </div>
    </PaginaApp>
  );
};

/* ═══════════════ 6. Resultados (ResultsDashboard.tsx) ═══════════════ */

export const Resultados: React.FC<Base & {puntaje?: number; desde?: number; barras?: [string, number][]; pdfEn?: number}> = ({m, toques, scroll, puntaje = 80, desde = 0, barras, pdfEn}) => {
  const s = useSegundos();
  const p = Math.round(interpolate(progreso(s, desde, 1.4), [0, 1], [0, puntaje]));
  const datos = barras ?? [
    ['Lectura Crítica', 100],
    ['Competencias Pedagógicas', 75],
    ['Conocimientos Específicos', 80],
    ['Razonamiento Cuantitativo', 50],
    ['Competencias Comportamentales', 100],
  ];
  const generando = pdfEn !== undefined && s >= pdfEn && s < pdfEn + 1.6;
  return (
    <PaginaApp m={m} activa="simulacros" scroll={scroll}>
      <div style={{maxWidth: m ? 366 : 1120, margin: '0 auto', padding: m ? '18px 0' : '32px 0', display: 'flex', flexDirection: 'column', gap: 20}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: m ? 'flex-start' : 'center', flexDirection: m ? 'column' : 'row', gap: 10}}>
          <div>
            <h1 style={h1(m)}>Resultados del Simulacro</h1>
            <div style={{color: C.s500}}>Análisis detallado de tu desempeño alineado con CNSC.</div>
          </div>
          <Tocable en={tq(toques, 'pdf')}>
            <div style={{display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', borderRadius: 8, background: C.s800, color: 'white', fontWeight: 500}}>
              {generando ? (
                <>
                  <Icono n="progress_activity" t={20} /> {Math.min(100, Math.round(((s - (pdfEn ?? 0)) / 1.4) * 100))}%
                </>
              ) : (
                <>
                  <Icono n="picture_as_pdf" t={20} /> Guardar Reporte
                </>
              )}
            </div>
          </Tocable>
        </div>
        <div style={{display: 'flex', flexDirection: m ? 'column' : 'row', gap: 22}}>
          <div style={{...tarjeta, borderRadius: 18, padding: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: 1}}>
            <div style={{position: 'relative', width: 160, height: 160}}>
              <svg width="160" height="160" style={{transform: 'rotate(-90deg)'}}>
                <circle cx="80" cy="80" r="70" stroke={C.s100} strokeWidth="12" fill="none" />
                <circle cx="80" cy="80" r="70" stroke={p >= 70 ? C.verde : C.ambar} strokeWidth="12" fill="none" strokeDasharray={440} strokeDashoffset={440 - (440 * p) / 100} strokeLinecap="round" />
              </svg>
              <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <span style={{fontFamily: F.titulo, fontWeight: 900, fontSize: 38}}>{p}%</span>
                <span style={{fontSize: 11, fontWeight: 700, color: C.s400, textTransform: 'uppercase'}}>Puntaje Global</span>
              </div>
            </div>
            <div style={{marginTop: 18, fontWeight: 500, color: C.s700}}>{puntaje >= 90 ? '¡Excelente desempeño! Estás listo para el concurso.' : puntaje >= 70 ? 'Buen trabajo. Refuerza las competencias débiles.' : 'Se requiere mayor estudio de la normativa y casos.'}</div>
          </div>
          <div style={{...tarjeta, borderRadius: 18, padding: 24, flex: 2}}>
            <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: 18, marginBottom: 16}}>Desempeño por Competencia</div>
            {datos.map(([nombre, v], i) => {
              const w = v * progreso(s, desde + 0.4 + i * 0.15, 0.7);
              return (
                <div key={nombre} style={{display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14}}>
                  <div style={{width: m ? 120 : 230, fontSize: m ? 11 : 13, fontWeight: 600, textAlign: 'right', color: C.s700}}>{nombre}</div>
                  <div style={{flex: 1, height: 20}}>
                    <div style={{width: `${w}%`, height: '100%', borderRadius: '0 4px 4px 0', background: v >= 70 ? C.verde : C.ambar}} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{...tarjeta, borderRadius: 18, overflow: 'hidden'}}>
          <div style={{padding: 16, background: C.s50, borderBottom: `1px solid ${C.borde}`, fontWeight: 700, color: C.s700}}>Detalle de Respuestas y Retroalimentación Pedagógica</div>
          <div style={{padding: 22, display: 'flex', flexDirection: 'column', gap: 14}}>
            <div style={{display: 'flex', gap: 14}}>
              <div style={{width: 32, height: 32, borderRadius: 99, background: C.rojo, color: 'white', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>1</div>
              <div>
                <div style={{fontWeight: 700, fontSize: m ? 15 : 17, marginBottom: 8}}>{PREGUNTA_REAL.pregunta}</div>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 12}}>
                  <span style={{padding: '3px 8px', borderRadius: 4, background: C.azul50, color: C.primario, border: '1px solid #dbeafe', fontWeight: 700}}>{PREGUNTA_REAL.competencia}</span>
                  <span style={{padding: '3px 8px', borderRadius: 4, background: C.s100, color: C.s500, border: '1px solid #e2e8f0'}}>Norma: Ley 115 de 1994 - Artículo 132</span>
                </div>
              </div>
            </div>
            <div style={{display: 'flex', flexDirection: m ? 'column' : 'row', gap: 12, marginLeft: m ? 0 : 46}}>
              <div style={{flex: 1, padding: 12, borderRadius: 8, background: C.rojo50, border: '1px solid #fecaca'}}>
                <div style={{fontSize: 12, fontWeight: 700, color: '#b91c1c', textTransform: 'uppercase'}}>Tu Respuesta (C):</div>
                <div style={{fontSize: 14, color: C.s800}}>{PREGUNTA_REAL.opciones[2].texto}</div>
              </div>
              <div style={{flex: 1, padding: 12, borderRadius: 8, background: C.verde50, border: '1px solid #bbf7d0'}}>
                <div style={{fontSize: 12, fontWeight: 700, color: '#15803d', textTransform: 'uppercase'}}>Respuesta Correcta (B):</div>
                <div style={{fontSize: 14, color: C.s800}}>{PREGUNTA_REAL.opciones[1].texto}</div>
              </div>
            </div>
            <div style={{marginLeft: m ? 0 : 46, padding: 14, background: C.s50, borderLeft: `4px solid ${C.primario}`, borderRadius: '0 8px 8px 0'}}>
              <div style={{fontSize: 12, fontWeight: 700, color: C.primario, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 4}}>
                <Icono n="psychology" t={16} /> Retroalimentación Pedagógica y Legal
              </div>
              <div style={{fontSize: 14, color: C.s700, lineHeight: 1.5}}>{PREGUNTA_REAL.explicacion}</div>
            </div>
          </div>
        </div>
      </div>
    </PaginaApp>
  );
};

/* ═══════════════ 7. Tablero de Control (GlobalStatsView.tsx) ═══════════════ */

const Curva: React.FC<{datos: number[]; color: string; desde: number; prefijo: string}> = ({datos, color, desde, prefijo}) => {
  const s = useSegundos();
  const W = 420;
  const H = 200;
  const pts = datos.map((v, i) => [30 + (i * (W - 50)) / (datos.length - 1), 10 + (1 - v / 100) * (H - 30)]);
  const k = progreso(s, desde, 1.2);
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join(' ');
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H + 14}`}>
      {[0, 25, 50, 75, 100].map((v) => (
        <g key={v}>
          <line x1={30} x2={W - 20} y1={10 + (1 - v / 100) * (H - 30)} y2={10 + (1 - v / 100) * (H - 30)} stroke="#f1f5f9" strokeDasharray="3 3" />
          <text x={22} y={14 + (1 - v / 100) * (H - 30)} fontSize={9} fill="#94a3b8" textAnchor="end">
            {v}
          </text>
        </g>
      ))}
      <path d={d} fill="none" stroke={color} strokeWidth={3} strokeDasharray={1200} strokeDashoffset={1200 * (1 - k)} />
      {pts.map((p, i) => (k > i / (pts.length - 1) - 0.01 ? <circle key={i} cx={p[0]} cy={p[1]} r={5} fill={color} /> : null))}
      {pts.map((p, i) => (
        <text key={`t${i}`} x={p[0]} y={H + 8} fontSize={9} fill="#94a3b8" textAnchor="middle">
          {prefijo}-{i + 1}
        </text>
      ))}
    </svg>
  );
};

export const Tablero: React.FC<Base & {desde?: number}> = ({m, scroll, desde = 0}) => {
  const s = useSegundos();
  const T = TABLERO;
  const kpi = (icono: string, fondo: string, color: string, t: string, v: string) => (
    <div style={{...tarjeta, padding: 20, display: 'flex', alignItems: 'center', gap: 16, flex: 1}}>
      <div style={{width: 50, height: 50, borderRadius: 99, background: fondo, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Icono n={icono} t={24} c={color} />
      </div>
      <div>
        <div style={{fontSize: 14, color: C.s500}}>{t}</div>
        <div style={{fontFamily: F.titulo, fontWeight: 900, fontSize: 26}}>{v}</div>
      </div>
    </div>
  );
  return (
    <PaginaApp m={m} activa="estadisticas" scroll={scroll}>
      <div style={{maxWidth: m ? 366 : 1080, margin: '0 auto', padding: m ? '18px 0' : '34px 0', display: 'flex', flexDirection: 'column', gap: 20}}>
        <div style={{textAlign: 'center'}}>
          <h1 style={h1(m)}>Tablero de Control</h1>
          <div style={{color: C.s500}}>Analítica segmentada por tipo de prueba y competencias.</div>
        </div>
        <div style={{display: 'flex', flexDirection: m ? 'column' : 'row', gap: 14}}>
          {kpi('history', C.azul50, C.primario, 'Pruebas Totales', String(Math.round(T.pruebas * progreso(s, desde, 1))))}
          {kpi('monitoring', C.indigo50, C.indigo, 'Promedio Global', `${Math.round(T.promedio * progreso(s, desde, 1))}%`)}
          {kpi('trophy', C.ambar50, C.ambar600, 'Mejor Resultado', `${Math.round(T.mejor * progreso(s, desde, 1))}%`)}
        </div>
        <div style={{display: 'flex', flexDirection: m ? 'column' : 'row', gap: 18}}>
          <div style={{...tarjeta, padding: 20, flex: 1}}>
            <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: 17, display: 'flex', alignItems: 'center', gap: 8}}>
              <Icono n="health_and_safety" t={22} c={C.indigo} /> Progreso en Diagnósticos
            </div>
            <Curva datos={T.diagnosticos} color="#6366f1" desde={desde + 0.5} prefijo="D" />
          </div>
          <div style={{...tarjeta, padding: 20, flex: 1}}>
            <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: 17, display: 'flex', alignItems: 'center', gap: 8}}>
              <Icono n="timer" t={22} c={C.ambar} /> Progreso en Simulacros Tipo CNSC
            </div>
            <Curva datos={T.simulacros} color={C.ambar} desde={desde + 0.9} prefijo="S" />
          </div>
        </div>
        <div style={{...tarjeta, padding: 22}}>
          <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: 17, display: 'flex', alignItems: 'center', gap: 8}}>
            <Icono n="donut_large" t={22} c={C.verde} /> Consolidado por Competencias
          </div>
          <div style={{fontSize: 12, color: C.s500, marginBottom: 14}}>Promedio histórico acumulado (Categorías principales)</div>
          {T.consolidado.map(([n, v], i) => (
            <div key={n} style={{display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8}}>
              <div style={{width: m ? 130 : 220, fontSize: m ? 10 : 12, fontWeight: 600, textAlign: 'right', color: C.s700}}>{n}</div>
              <div style={{flex: 1, height: 16}}>
                <div style={{width: `${v * progreso(s, desde + 1.2 + i * 0.08, 0.6)}%`, height: '100%', background: v >= 70 ? C.verde : v >= 50 ? C.ambar : C.rojo, borderRadius: '0 3px 3px 0'}} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </PaginaApp>
  );
};

/* ═══════════════ 8. Coach IA (AIAnalysisView.tsx) ═══════════════ */

export const Coach: React.FC<Base & {fase?: 'bloqueo' | 'intro' | 'cargando' | 'analisis'; desde?: number}> = ({m, toques, scroll, fase = 'intro', desde = 0}) => {
  const lista = (items: string[], color: string, d: number) =>
    items.map((x, i) => (
      <Aparece key={x} desde={d + i * 0.3}>
        <div style={{display: 'flex', gap: 8, fontSize: 14, color, lineHeight: 1.45, marginBottom: 8}}>
          <span>•</span>
          {x}
        </div>
      </Aparece>
    ));
  return (
    <PaginaApp m={m} activa="ai-coach" scroll={scroll} premium>
      <div style={{maxWidth: m ? 366 : 900, margin: '0 auto', padding: m ? '18px 0' : '32px 0', display: 'flex', flexDirection: 'column', gap: 20}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10}}>
          <div>
            <h1 style={{...h1(m), display: 'flex', alignItems: 'center', gap: 10}}>
              <Icono n="psychology" t={36} c={C.primario} /> Coach Inteligente
            </h1>
            <div style={{color: C.s500}}>Análisis de desempeño y plan de mejora diario.</div>
          </div>
          {fase === 'analisis' ? (
            <Tocable en={tq(toques, 'pdf')}>
              <div style={{display: 'flex', alignItems: 'center', gap: 6, background: C.rojo600, color: 'white', fontWeight: 700, padding: '10px 14px', borderRadius: 8, whiteSpace: 'nowrap'}}>
                <Icono n="download" t={20} /> Descargar PDF
              </div>
            </Tocable>
          ) : null}
        </div>
        {fase === 'intro' || fase === 'cargando' ? (
          <div style={{...tarjeta, borderRadius: 18, padding: 36, textAlign: 'center'}}>
            {fase === 'intro' ? (
              <>
                <Icono n="analytics" t={64} c="rgba(13,127,242,.25)" />
                <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: 21, margin: '14px 0 8px'}}>¿Listo para tu diagnóstico de hoy?</div>
                <div style={{color: C.s500, maxWidth: 440, margin: '0 auto'}}>La IA analizará tus últimos 28 simulacros para generar un plan de acción.</div>
                <div style={{display: 'inline-block', fontSize: 12, fontWeight: 700, color: C.ambar600, background: C.ambar50, padding: '4px 8px', borderRadius: 4, margin: '10px 0 22px'}}>Límite: 1 análisis cada 24 horas</div>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Tocable en={tq(toques, 'analizar')}>
                    <div style={{display: 'flex', alignItems: 'center', gap: 8, background: C.primario, color: 'white', fontWeight: 700, fontSize: 18, padding: '14px 30px', borderRadius: 12}}>
                      <Icono n="auto_fix_high" t={22} /> Analizar mi Desempeño
                    </div>
                  </Tocable>
                </div>
              </>
            ) : (
              <div style={{padding: 30}}>
                <Icono n="progress_activity" t={52} c={C.primario} style={{transform: `rotate(${(useSegundos() * 360) % 360}deg)`}} />
                <div style={{color: C.s600, fontWeight: 500, marginTop: 14}}>Analizando tus respuestas...</div>
                <div style={{color: C.s400, fontSize: 12, marginTop: 6}}>Consultando normatividad vigente...</div>
              </div>
            )}
          </div>
        ) : null}
        {fase === 'analisis' ? (
          <>
            <div style={{display: 'flex', flexDirection: m ? 'column' : 'row', gap: 18}}>
              <div style={{flex: 1, background: C.verde50, border: '1px solid #dcfce7', borderRadius: 14, padding: 20}}>
                <div style={{fontWeight: 700, color: '#166534', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12}}>
                  <Icono n="thumb_up" t={22} /> Fortalezas
                </div>
                {lista(COACH_REAL.fortalezas, '#14532d', desde)}
              </div>
              <div style={{flex: 1, background: C.rojo50, border: '1px solid #fee2e2', borderRadius: 14, padding: 20}}>
                <div style={{fontWeight: 700, color: '#991b1b', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12}}>
                  <Icono n="warning" t={22} /> A Mejorar
                </div>
                {lista(COACH_REAL.mejorar, '#7f1d1d', desde + 0.6)}
              </div>
            </div>
            <div style={{...tarjeta, overflow: 'hidden'}}>
              <div style={{background: C.s50, padding: 14, borderBottom: `1px solid ${C.borde}`, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8}}>
                <Icono n="strategy" t={22} c={C.primario} /> Estrategia Personalizada
              </div>
              <div style={{padding: 20}}>
                <div style={{fontSize: 13, fontWeight: 700, color: C.s500, textTransform: 'uppercase', marginBottom: 10}}>Recomendaciones Clave</div>
                {COACH_REAL.recomendaciones.map((r) => (
                  <div key={r} style={{display: 'flex', gap: 10, background: 'rgba(239,246,255,.6)', padding: 10, borderRadius: 8, marginBottom: 8, fontSize: 14, color: C.s700}}>
                    <Icono n="check_circle" t={18} c={C.primario} /> {r}
                  </div>
                ))}
                <div style={{fontSize: 13, fontWeight: 700, color: C.s500, textTransform: 'uppercase', margin: '16px 0 10px'}}>Resumen Plan de Estudio</div>
                <div style={{background: C.s50, border: '1px solid #e2e8f0', borderRadius: 8, padding: 14, fontSize: 14, color: C.s700, lineHeight: 1.55}}>{COACH_REAL.plan}</div>
              </div>
            </div>
            <div style={{background: C.indigo50, border: '1px solid #e0e7ff', borderRadius: 14, padding: 20}}>
              <div style={{fontWeight: 700, color: '#3730a3', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12}}>
                <Icono n="library_books" t={22} /> Normativa Sugerida
              </div>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: 8}}>
                {COACH_REAL.normativa.map((l) => (
                  <span key={l} style={{padding: '5px 12px', background: 'white', color: C.indigo, borderRadius: 99, fontSize: 12, fontWeight: 700, border: '1px solid #e0e7ff'}}>
                    {l}
                  </span>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </PaginaApp>
  );
};

/* ═══════════════ 9. Normativa (NormativaView.tsx) ═══════════════ */

export const Normativa: React.FC<Base & {rutaEn?: number; leyEn?: number; preguntaDesde?: number; respuestaEn?: number}> = ({m, toques, scroll, rutaEn, leyEn, preguntaDesde, respuestaEn}) => {
  const s = useSegundos();
  const ruta = ya(s, rutaEn);
  const ley = ya(s, leyEn) ? LEYES[3] : undefined;
  const pregunta = useEscrito(ASISTENTE_REAL.pregunta, preguntaDesde, 20);
  const respuesta = ya(s, respuestaEn);
  return (
    <PaginaApp m={m} activa="normativa" scroll={scroll} premium>
      <div style={{maxWidth: m ? 366 : 1080, margin: '0 auto', padding: m ? '18px 0' : '32px 0', display: 'flex', flexDirection: 'column', gap: 24}}>
        <div style={{textAlign: 'center'}}>
          <h1 style={h1(m)}>Biblioteca Normativa CNSC</h1>
          <div style={{color: C.s500}}>Accede a las fuentes oficiales, genera tu ruta de estudio y consulta a nuestro experto IA.</div>
        </div>
        <div style={{...tarjeta, borderRadius: 18, overflow: 'hidden'}}>
          <div style={{background: C.s50, padding: 20, borderBottom: `1px solid ${C.borde}`, display: 'flex', flexDirection: m ? 'column' : 'row', justifyContent: 'space-between', gap: 12}}>
            <div>
              <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: 18, display: 'flex', alignItems: 'center', gap: 8}}>
                <Icono n="alt_route" t={24} c={C.primario} /> Generador de Ruta de Aprendizaje
              </div>
              <div style={{fontSize: 14, color: C.s500}}>Selecciona tu cargo para ver los documentos obligatorios de estudio.</div>
            </div>
            <Tocable en={tq(toques, 'cargo')}>
              <div style={{height: 48, minWidth: 250, borderRadius: 12, border: '1px solid #cbd5e1', background: 'white', padding: '0 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 500, color: C.s700}}>
                {ruta ? 'Docente de Aula' : 'Seleccionar Cargo...'} <Icono n="expand_more" t={20} />
              </div>
            </Tocable>
          </div>
          <div style={{padding: 20}}>
            {ruta ? (
              RUTA_DOCENTE.map((x, i) => (
                <Aparece key={x.doc} desde={(rutaEn ?? 0) + 0.2 + i * 0.35}>
                  <div style={{display: 'flex', gap: 14}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                      <div style={{width: 32, height: 32, borderRadius: 99, background: i === 0 ? C.primario : C.s100, color: i === 0 ? 'white' : C.s500, fontWeight: 700, fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{i + 1}</div>
                      {i < RUTA_DOCENTE.length - 1 ? <div style={{width: 2, flex: 1, background: C.s100, margin: '4px 0'}} /> : null}
                    </div>
                    <div style={{...tarjeta, padding: 14, marginBottom: 14, flex: 1}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', gap: 8}}>
                        <b style={{color: C.s800}}>{x.doc}</b>
                        <span style={{fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 4, textTransform: 'uppercase', background: x.prioridad === 'Alta' ? C.rojo50 : C.ambar50, color: x.prioridad === 'Alta' ? C.rojo600 : C.ambar600, whiteSpace: 'nowrap'}}>
                          Prioridad {x.prioridad}
                        </span>
                      </div>
                      <div style={{fontSize: 14, color: C.s600}}>
                        <b style={{color: C.primario}}>Enfoque de estudio: </b>
                        {x.foco}
                      </div>
                    </div>
                  </div>
                </Aparece>
              ))
            ) : (
              <div style={{border: '2px dashed #f1f5f9', borderRadius: 12, padding: 40, textAlign: 'center', color: C.s400}}>
                <Icono n="touch_app" t={36} />
                <div style={{fontSize: 14, fontWeight: 500}}>Elige un rol arriba para desplegar la ruta.</div>
              </div>
            )}
          </div>
        </div>
        <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: 20, display: 'flex', alignItems: 'center', gap: 8}}>
          <Icono n="library_books" t={26} /> Biblioteca General
        </div>
        <div style={{display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : 'repeat(4,1fr)', gap: 14}}>
          {LEYES.map((l) => {
            const sel = ley?.titulo === l.titulo;
            return (
              <Tocable key={l.titulo} en={tq(toques, l.titulo)}>
                <div style={{padding: m ? 14 : 20, borderRadius: 14, border: `2px solid ${sel ? C.primario : C.borde}`, background: sel ? C.azul50 : 'white', height: '100%', boxSizing: 'border-box'}}>
                  <div style={{width: 40, height: 40, borderRadius: 8, background: sel ? C.primario : C.s100, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10}}>
                    <Icono n={l.icono} t={22} c={sel ? 'white' : C.s500} />
                  </div>
                  <div style={{fontWeight: 700, fontSize: m ? 14 : 16}}>{l.titulo}</div>
                  <div style={{fontSize: m ? 10 : 12, fontWeight: 700, color: C.primario, textTransform: 'uppercase', marginTop: 2}}>{l.sub}</div>
                  {m ? null : <div style={{fontSize: 12, color: C.s500, marginTop: 8, lineHeight: 1.5}}>{l.desc}</div>}
                </div>
              </Tocable>
            );
          })}
        </div>
        <div style={{...tarjeta, borderRadius: 18, overflow: 'hidden', display: 'flex', flexDirection: m ? 'column' : 'row', minHeight: 340, boxShadow: '0 10px 24px rgba(0,0,0,.06)'}}>
          <div style={{width: m ? 'auto' : 320, background: C.s50, borderRight: `1px solid ${C.borde}`, padding: 24}}>
            <div style={{fontFamily: F.titulo, fontWeight: 700, fontSize: 18, display: 'flex', alignItems: 'center', gap: 8}}>
              <Icono n="psychology" t={24} c={C.primario} /> Asistente Legal IA
            </div>
            <div style={{fontSize: 14, color: C.s500, marginTop: 8}}>{ley ? `Pregunta específicamente sobre el contexto de: ${ley.titulo}.` : 'Selecciona una norma arriba o haz una pregunta general sobre el sistema educativo.'}</div>
          </div>
          <div style={{flex: 1, padding: 22, display: 'flex', flexDirection: 'column', gap: 14}}>
            <div style={{flex: 1}}>
              {respuesta ? (
                <Aparece desde={respuestaEn}>
                  <div style={{display: 'flex', gap: 12}}>
                    <div style={{width: 32, height: 32, borderRadius: 99, background: C.primario, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                      <Icono n="smart_toy" t={18} c="white" />
                    </div>
                    <div style={{background: C.azul50, border: '1px solid #dbeafe', borderRadius: '0 16px 16px 16px', padding: 14, fontSize: m ? 12 : 14, lineHeight: 1.55, color: C.s800}}>
                      {ASISTENTE_REAL.respuesta.map((r, i) => (
                        <div key={i} style={{marginBottom: 4}}>
                          {i + 1}. {r}
                        </div>
                      ))}
                    </div>
                  </div>
                </Aparece>
              ) : (
                <div style={{height: 160, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1'}}>
                  <Icono n="forum" t={46} />
                  <div>Haz una pregunta para comenzar</div>
                </div>
              )}
            </div>
            <div style={{height: 54, borderRadius: 12, border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 6px 0 14px'}}>
              <span style={{color: pregunta ? C.texto : C.s400, fontSize: m ? 13 : 15}}>{pregunta || `Preguntar sobre ${ley?.titulo ?? 'normativa general'}...`}</span>
              <Tocable en={tq(toques, 'enviar')}>
                <div style={{width: 40, height: 40, borderRadius: 8, background: C.primario, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Icono n="send" t={20} c="white" />
                </div>
              </Tocable>
            </div>
          </div>
        </div>
      </div>
    </PaginaApp>
  );
};

/* ═══════════════ 10. Entrevista (InterviewView.tsx + InterviewModal) ═══════════════ */

export const Entrevista: React.FC<Base & {modalEn?: number}> = ({m, toques, scroll, modalEn}) => {
  const s = useSegundos();
  const modal = ya(s, modalEn);
  const info = [
    ['timer', '#9333ea', 'Tiempo Límite', 'Cada sesión tiene una duración máxima de 8 minutos.', C.s50],
    ['calendar_month', '#2563eb', 'Frecuencia', 'Acceso limitado a 1 entrevista por mes calendario.', C.s50],
    ['psychology', C.verde600, 'Feedback', 'Interactúa con una IA avanzada entrenada para el contexto educativo.', C.s50],
    ['headphones', C.ambar600, 'Usa Audífonos', 'Usa audífonos para evitar que la IA escuche su propia voz (eco).', C.ambar50],
  ];
  return (
    <PaginaApp m={m} activa="entrevista" scroll={scroll} premium>
      <div style={{maxWidth: m ? 366 : 1000, margin: '0 auto', padding: m ? '18px 0' : '34px 0'}}>
        <div style={{...tarjeta, borderRadius: 18, padding: m ? 20 : 36, textAlign: 'center'}}>
          <div style={{display: 'inline-flex', padding: 16, borderRadius: 99, background: C.morado50, position: 'relative', marginBottom: 18}}>
            <Icono n="record_voice_over" t={40} c={C.morado} />
            <span style={{position: 'absolute', top: -6, right: -16, background: '#facc15', color: '#713f12', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99, textTransform: 'uppercase'}}>Premium</span>
          </div>
          <h1 style={{...h1(m), color: C.s800, marginBottom: 12}}>Simulacro de Entrevista con IA</h1>
          <div style={{fontSize: m ? 15 : 18, color: C.s600, maxWidth: 640, margin: '0 auto 26px', lineHeight: 1.55}}>
            Practica tus habilidades de comunicación oral en un entorno seguro y realista. Nuestro agente de IA evaluará tus respuestas en tiempo real simulando una entrevista docente.
          </div>
          <div style={{display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : 'repeat(4,1fr)', gap: 14, textAlign: 'left', marginBottom: 28}}>
            {info.map(([ic, col, t, d, bg], i) => (
              <Aparece key={t} desde={i * 0.15}>
                <div style={{background: bg, border: '1px solid #f1f5f9', borderRadius: 14, padding: 16, height: '100%', boxSizing: 'border-box'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, color: C.s700, marginBottom: 6}}>
                    <Icono n={ic} t={22} c={col} /> {t}
                  </div>
                  <div style={{fontSize: m ? 12 : 14, color: C.s500}}>{d}</div>
                </div>
              </Aparece>
            ))}
          </div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Tocable en={tq(toques, 'iniciar')}>
              <div style={{display: 'flex', alignItems: 'center', gap: 10, background: C.morado, color: 'white', fontWeight: 700, fontSize: 18, padding: '16px 40px', borderRadius: 12, boxShadow: '0 10px 20px rgba(147,51,234,.25)'}}>
                <Icono n="play_circle" t={24} /> Iniciar Simulacro
              </div>
            </Tocable>
          </div>
          <div style={{fontSize: 12, color: C.s400, marginTop: 10}}>Al iniciar, se descontará tu cupo del mes actual.</div>
        </div>
      </div>
      {modal ? <ModalEntrevista m={m} desde={modalEn ?? 0} /> : null}
    </PaginaApp>
  );
};

const ModalEntrevista: React.FC<{m?: boolean; desde: number}> = ({m, desde}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const e = entrada(s, fps, desde);
  return (
    <div style={{position: 'absolute', inset: 0, background: `rgba(13,20,28,${0.55 * e})`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 40}}>
      <div style={{width: m ? 340 : 560, background: 'white', borderRadius: 22, padding: 30, textAlign: 'center', transform: `scale(${0.85 + 0.15 * e})`, opacity: e}}>
        <div style={{fontFamily: F.titulo, fontWeight: 900, fontSize: 22, color: C.indigo, letterSpacing: 1}}>ENTREVISTA IA</div>
        <div style={{margin: '26px auto', width: 120, height: 120, borderRadius: 99, background: 'linear-gradient(135deg,#9333ea,#4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 ${10 + Math.sin(s * 6) * 8}px rgba(147,51,234,.15)`}}>
          <Icono n="mic" t={56} c="white" lleno />
        </div>
        <div style={{display: 'flex', justifyContent: 'center', gap: 5, height: 40, alignItems: 'center'}}>
          {Array.from({length: 18}).map((_, i) => (
            <div key={i} style={{width: 6, borderRadius: 3, background: C.morado, height: 8 + Math.abs(Math.sin(s * 7 + i * 0.7)) * 30}} />
          ))}
        </div>
        <div style={{color: C.s500, marginTop: 12}}>Escuchando… habla con naturalidad.</div>
      </div>
    </div>
  );
};

/* ═══════════════ 11. Planes (PlansView / sección de la landing) ═══════════════ */

export const Planes: React.FC<Base & {entrevistaEn?: number; resaltar?: string; resaltarEn?: number; desde?: number; soloFree?: boolean}> = ({m, toques, scroll, entrevistaEn, resaltar, resaltarEn, desde = 0, soloFree}) => {
  const s = useSegundos();
  const conEnt = ya(s, entrevistaEn);
  const planes = soloFree ? PLANES.slice(0, 1) : PLANES;
  return (
    <PaginaApp m={m} activa="planes" scroll={scroll}>
      <div style={{maxWidth: m ? 366 : 1200, margin: '0 auto', padding: m ? '18px 0' : '30px 0', display: 'flex', flexDirection: 'column', gap: 22, alignItems: 'center'}}>
        <div style={{textAlign: 'center'}}>
          <h1 style={{...h1(m), fontSize: m ? 26 : 34}}>Elige el Plan de Entrenamiento que se adapta a tu cargo</h1>
          <div style={{color: C.s500, marginTop: 6}}>Selecciona tu suscripción anual y empieza a entrenar hoy mismo.</div>
        </div>
        {soloFree ? null : (
          <Tocable en={tq(toques, 'entrevista')}>
            <div style={{...tarjeta, borderRadius: 16, padding: '8px 22px 8px 8px', display: 'flex', alignItems: 'center', gap: 14}}>
              <div style={{width: 56, height: 28, borderRadius: 99, background: conEnt ? C.primario : '#e2e8f0', position: 'relative'}}>
                <div style={{position: 'absolute', top: 2, left: conEnt ? 30 : 2, width: 24, height: 24, borderRadius: 99, background: 'white'}} />
              </div>
              <div>
                <div style={{fontSize: 14, fontWeight: 700, color: C.s800, display: 'flex', alignItems: 'center', gap: 6}}>
                  Incluir Entrenamiento de Entrevista con IA
                  <span style={{background: 'linear-gradient(90deg,#0d7ff2,#3b82f6)', color: 'white', fontSize: 10, padding: '1px 8px', borderRadius: 99}}>NUEVO</span>
                </div>
                <div style={{fontSize: 12, color: C.s500, maxWidth: 300}}>
                  Incluye <b style={{color: C.primario}}>12 sesiones</b> con retroalimentación y plan de mejora.
                </div>
              </div>
            </div>
          </Tocable>
        )}
        <div style={{display: 'grid', gridTemplateColumns: m || soloFree ? '1fr' : 'repeat(4,1fr)', gap: m ? 12 : 20, width: soloFree ? (m ? 340 : 380) : '100%'}}>
          {planes.map((p, i) => {
            const res = resaltar === p.nombre && ya(s, resaltarEn);
            const precio = conEnt && p.precio ? p.conEntrevista : p.precio;
            return (
              <Aparece key={p.nombre} desde={desde + i * 0.15}>
                <div
                  style={{
                    background: 'white',
                    borderRadius: 22,
                    padding: m ? 16 : 22,
                    border: `2px solid ${res ? C.primario : p.nombre === 'Intermedio' ? '#e2e8f0' : 'rgba(13,127,242,.15)'}`,
                    boxShadow: res ? '0 0 0 6px rgba(13,127,242,.18), 0 20px 40px rgba(13,20,28,.12)' : '0 4px 10px rgba(0,0,0,.05)',
                    transform: res ? 'scale(1.04)' : 'scale(1)',
                    position: 'relative',
                  }}
                >
                  {p.nombre === 'Intermedio' ? (
                    <div style={{position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: C.s800, color: 'white', fontSize: 11, fontWeight: 700, padding: '3px 12px', borderRadius: 99, textTransform: 'uppercase', whiteSpace: 'nowrap'}}>Más Popular</div>
                  ) : null}
                  {p.nombre === 'Free' ? (
                    <div style={{position: 'absolute', top: 0, right: 0, background: 'rgba(13,127,242,.1)', color: C.primario, fontSize: 10, fontWeight: 700, padding: '4px 12px', borderRadius: '0 20px 0 12px', textTransform: 'uppercase'}}>¡Gratis por 1 año!</div>
                  ) : null}
                  <div style={{fontSize: 10, fontWeight: 700, textTransform: 'uppercase', color: C.s500, letterSpacing: 1, marginBottom: 8}}>{p.etiqueta}</div>
                  <div style={{display: 'flex', alignItems: 'center', gap: 8, fontFamily: F.titulo, fontWeight: 700, fontSize: 24}}>
                    <Icono n={p.icono} t={26} c={p.color} /> {p.nombre}
                  </div>
                  {p.nombre === 'Free' ? (
                    <div style={{fontSize: 12, color: C.s500, display: 'flex', alignItems: 'center', gap: 4, margin: '6px 0'}}>
                      <Icono n="credit_card_off" t={16} /> Sin tarjeta de crédito
                    </div>
                  ) : (
                    <div style={{height: 24}} />
                  )}
                  <div style={{fontFamily: F.titulo, fontWeight: 900, fontSize: m ? 34 : 38, margin: '8px 0 14px'}}>
                    ${precio === 0 ? '0' : `${precio}k`} <span style={{fontSize: 14, fontWeight: 500, color: C.s400}}>/ año</span>
                  </div>
                  {[
                    ['Simulacros / Día', p.dia ?? '—'],
                    ['Simulacros / Mes', p.mes],
                    ['Preguntas / Simulacro', p.preguntas],
                  ]
                    .filter(([, v]) => v !== '—')
                    .map(([l, v]) => (
                      <div key={String(l)} style={{marginBottom: 10}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 700, color: C.s600}}>
                          <span>{l}</span>
                          <span>{v}</span>
                        </div>
                        <div style={{height: 6, borderRadius: 9, background: C.s100, marginTop: 4}}>
                          <div style={{height: '100%', borderRadius: 9, background: p.color, width: `${Math.min(100, (Number(v) / (String(l).includes('Día') ? 3 : String(l).includes('Mes') ? 40 : 50)) * 100)}%`}} />
                        </div>
                      </div>
                    ))}
                  {conEnt && p.precio ? (
                    <div style={{display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: C.primario, background: C.azul50, padding: 8, borderRadius: 8, marginBottom: 10}}>
                      <Icono n="mic" t={16} /> + 12 Entrevistas con IA
                    </div>
                  ) : null}
                  <Tocable en={tq(toques, `btn-${p.nombre}`)}>
                    <div style={{height: 46, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, background: p.nombre === 'Free' ? C.primario : p.nombre === 'Intermedio' ? C.s800 : C.azul50, color: p.nombre === 'Free' || p.nombre === 'Intermedio' ? 'white' : p.color}}>
                      {p.nombre === 'Free' ? 'EMPEZAR GRATIS AHORA' : 'Suscribirse'}
                    </div>
                  </Tocable>
                </div>
              </Aparece>
            );
          })}
        </div>
        {soloFree ? null : <div style={{fontSize: 12, color: C.s400}}>* Precios en COP. Pago seguro procesado por Wompi.</div>}
      </div>
    </PaginaApp>
  );
};

/* ═══════════════ 12. Matemáticas (MathLearningView + MathPracticeView) ═══════════════ */

const MiniaturaVideo: React.FC<{tema: string}> = ({tema}) => (
  <div style={{aspectRatio: '16/9', border: '4px solid #c00', borderRadius: '10px 10px 0 0', background: '#ddd', position: 'relative', overflow: 'hidden'}}>
    <div style={{background: '#111', color: '#f97316', fontFamily: F.titulo, fontWeight: 900, fontSize: 13, textAlign: 'center', padding: '4px 0'}}>Curso de Aptitud Matemática</div>
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 8, textAlign: 'center', color: '#b91c1c', fontFamily: F.titulo, fontWeight: 900, fontSize: 17}}>{tema}</div>
    <div style={{position: 'absolute', left: '50%', top: '48%', transform: 'translate(-50%,-50%)', width: 44, height: 44, borderRadius: 99, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Icono n="play_arrow" t={28} c="#dc2626" lleno />
    </div>
  </div>
);

export const Matematicas: React.FC<Base & {sub?: 'videos' | 'ejercicios'; desde?: number}> = ({m, toques, scroll, sub = 'videos', desde = 0}) => (
  <PaginaApp m={m} activa="matematicas" scroll={scroll}>
    <div style={{maxWidth: m ? 366 : 1200, margin: '0 auto', padding: m ? '18px 0' : '32px 0', display: 'flex', flexDirection: 'column', gap: 18}}>
      <div style={{display: 'flex', gap: 8}}>
        <Tocable en={tq(toques, 'videos')}>
          <div style={{padding: '8px 16px', borderRadius: 8, fontWeight: 700, background: sub === 'videos' ? C.primario : 'white', color: sub === 'videos' ? 'white' : C.s600, border: `1px solid ${C.borde}`, display: 'flex', gap: 6, alignItems: 'center'}}>
            <Icono n="smart_display" t={20} /> Videos
          </div>
        </Tocable>
        <Tocable en={tq(toques, 'ejercicios')}>
          <div style={{padding: '8px 16px', borderRadius: 8, fontWeight: 700, background: sub === 'ejercicios' ? C.primario : 'white', color: sub === 'ejercicios' ? 'white' : C.s600, border: `1px solid ${C.borde}`, display: 'flex', gap: 6, alignItems: 'center'}}>
            <Icono n="auto_awesome" t={20} /> Ejercicios con IA
            <span style={{background: '#fbbf24', color: 'white', fontSize: 9, fontWeight: 900, padding: '1px 6px', borderRadius: 99}}>PREMIUM</span>
          </div>
        </Tocable>
      </div>
      {sub === 'videos' ? (
        <>
          <div>
            <h1 style={{...h1(m), display: 'flex', alignItems: 'center', gap: 10}}>
              <Icono n="calculate" t={34} c={C.primario} /> Aprende Matemáticas
            </h1>
            <div style={{color: C.s500, marginTop: 6}}>Domina el Razonamiento Cuantitativo con esta selección de videos especializados para el Concurso Docente.</div>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: m ? '1fr 1fr' : 'repeat(3,1fr)', gap: m ? 12 : 22}}>
            {VIDEOS_MATE.map((v, i) => (
              <Aparece key={v.titulo} desde={desde + i * 0.15}>
                <div style={{...tarjeta, borderRadius: 14, overflow: 'hidden'}}>
                  <MiniaturaVideo tema={v.tema} />
                  <div style={{padding: m ? 10 : 16}}>
                    <span style={{fontSize: 10, fontWeight: 700, color: C.verde600, background: C.verde50, border: '1px solid #bbf7d0', padding: '2px 6px', borderRadius: 4}}>BÁSICO</span>
                    <div style={{fontWeight: 700, fontSize: m ? 12 : 16, marginTop: 8, lineHeight: 1.3}}>{v.titulo}</div>
                  </div>
                </div>
              </Aparece>
            ))}
          </div>
        </>
      ) : (
        <div style={{...tarjeta, borderRadius: 18, padding: m ? 20 : 34, textAlign: 'center'}}>
          <div style={{display: 'inline-flex', padding: 16, borderRadius: 99, background: '#fef3c7', position: 'relative', marginBottom: 14}}>
            <Icono n="calculate" t={44} c={C.ambar600} />
            <span style={{position: 'absolute', top: -6, right: -20, background: C.rojo, color: 'white', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99}}>PREMIUM</span>
          </div>
          <h1 style={{...h1(m), marginBottom: 10}}>Ejercicios de Matemáticas con IA</h1>
          <div style={{color: C.s600, maxWidth: 620, margin: '0 auto 22px', lineHeight: 1.55}}>
            Genera <b>ejercicios ilimitados</b> de aptitud numérica sobre el tema que quieras (fracciones, porcentajes, regla de tres, series y más), con soluciones paso a paso y descarga en PDF.
          </div>
          <div style={{display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3,1fr)', gap: 12, textAlign: 'left'}}>
            {[
              ['category', '13 temas', 'Elige exactamente lo que necesitas reforzar.'],
              ['format_list_numbered', 'Soluciones paso a paso', 'Aprende el procedimiento, no solo la respuesta.'],
              ['picture_as_pdf', 'Descarga en PDF', 'Practica sin conexión e imprime tus hojas.'],
            ].map(([ic, t, d], i) => (
              <Aparece key={t} desde={desde + i * 0.2}>
                <div style={{background: C.ambar50, border: '1px solid #fde68a', borderRadius: 12, padding: 14}}>
                  <Icono n={ic} t={22} c={C.ambar600} />
                  <div style={{fontWeight: 700, fontSize: 14, marginTop: 4}}>{t}</div>
                  <div style={{fontSize: 12, color: C.s500}}>{d}</div>
                </div>
              </Aparece>
            ))}
          </div>
        </div>
      )}
    </div>
  </PaginaApp>
);

/* ═══════════════ 13. Documento PDF (reporte / plan de mejora) ═══════════════ */

export const DocumentoPdf: React.FC<{tipo: 'reporte' | 'plan'; desde?: number}> = ({tipo, desde = 0}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const e = entrada(s, fps, desde);
  return (
    <div style={{position: 'absolute', inset: 0, background: '#525659', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{width: 560, height: 780, background: 'white', boxShadow: '0 20px 50px rgba(0,0,0,.4)', transform: `translateY(${(1 - e) * 60}px) scale(${0.9 + 0.1 * e})`, opacity: e, fontFamily: 'Helvetica, Arial, sans-serif', overflow: 'hidden'}}>
        {tipo === 'plan' ? (
          <>
            <div style={{background: C.primario, color: 'white', padding: '26px 30px'}}>
              <div style={{fontSize: 26, fontWeight: 700}}>Plan de Mejora Personalizado</div>
              <div style={{fontSize: 14}}>Entrenador Docente CNSC - Coach IA</div>
            </div>
            <div style={{padding: 30, fontSize: 12, color: '#333', lineHeight: 1.6}}>
              <div style={{color: '#27ae60', fontWeight: 700, fontSize: 16, marginBottom: 6}}>Fortalezas Identificadas</div>
              {COACH_REAL.fortalezas.map((x) => (
                <div key={x}>• {x}</div>
              ))}
              <div style={{color: '#c0392b', fontWeight: 700, fontSize: 16, margin: '16px 0 6px'}}>Áreas de Mejora (Debilidades)</div>
              {COACH_REAL.mejorar.map((x) => (
                <div key={x}>• {x}</div>
              ))}
              <div style={{color: C.primario, fontWeight: 700, fontSize: 16, margin: '16px 0 6px'}}>Recomendaciones Estratégicas</div>
              {COACH_REAL.recomendaciones.slice(0, 3).map((x) => (
                <div key={x}>• {x}</div>
              ))}
            </div>
          </>
        ) : (
          <div style={{padding: 30, fontSize: 12, color: '#333'}}>
            <div style={{fontSize: 22, fontWeight: 700, color: C.texto}}>Resultados del Simulacro</div>
            <div style={{color: '#64748b', marginBottom: 16}}>Análisis detallado de tu desempeño alineado con CNSC.</div>
            <div style={{display: 'flex', gap: 16, marginBottom: 16}}>
              <div style={{width: 150, height: 150, borderRadius: 12, border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, fontWeight: 900}}>80%</div>
              <div style={{flex: 1, border: '1px solid #e2e8f0', borderRadius: 12, padding: 12}}>
                {[100, 75, 80, 50, 100].map((v, i) => (
                  <div key={i} style={{height: 12, width: `${v}%`, background: v >= 70 ? C.verde : C.ambar, marginBottom: 10, borderRadius: 2}} />
                ))}
              </div>
            </div>
            <div style={{fontWeight: 700, marginBottom: 6}}>Detalle de Respuestas y Retroalimentación Pedagógica</div>
            <div style={{lineHeight: 1.6}}>{PREGUNTA_REAL.explicacion}</div>
          </div>
        )}
      </div>
    </div>
  );
};
