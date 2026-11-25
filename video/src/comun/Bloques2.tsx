import React from 'react';
import {AbsoluteFill, Img, staticFile, useVideoConfig} from 'remotion';
import {TituloContorno} from './Basicos';
import {TextoRico} from './Bloques';
import type {Tema} from './tipos';
import {contorno, entrada, progreso, useSegundos} from './tiempo';

/* Bloques del lote de enero 2027: imágenes reales (QR, códigos de barras), etiquetas de inventario,
   celular con la app de Claude, editor de Power Query y tarjeta de la tienda. Tiempos en segundos de la escena. */

const BORDE = '5px solid #000';
const SOMBRA = '10px 10px 0 #000';
const MONO = {fontVariantLigatures: 'none' as const, fontFeatureSettings: '"calt" 0, "liga" 0'};

/* ───────────── Imagen (o varias) con pie ───────────── */

export const Imagenes: React.FC<{
  tema: Tema;
  titulo?: string;
  items: {src: string; pie?: string; desde: number; ancho?: number; alto?: number}[];
  desde?: number;
}> = ({tema, titulo, items, desde = 0}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 50}}>
      {titulo ? <TituloContorno tema={tema} desde={desde} tamano={90} rotacion={0} lineas={[{texto: titulo, color: 'white'}]} /> : null}
      <div style={{display: 'flex', gap: 60, alignItems: 'flex-end'}}>
        {items.map((it, i) => {
          const e = entrada(s, fps, it.desde);
          if (s < it.desde - 0.05) return <div key={i} style={{width: it.ancho ?? 420}} />;
          return (
            <div key={i} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, transform: `scale(${e})`}}>
              <div style={{background: 'white', border: BORDE, boxShadow: SOMBRA, borderRadius: 24, padding: 24}}>
                <Img src={staticFile(it.src)} style={{width: it.ancho ?? 420, height: it.alto ?? it.ancho ?? 420, objectFit: 'contain', imageRendering: 'pixelated'}} />
              </div>
              {it.pie ? (
                <div style={{fontFamily: tema.fuentes.texto, fontWeight: 800, fontSize: 40, color: 'white', textShadow: contorno(4, '#000', false), textAlign: 'center', maxWidth: (it.ancho ?? 420) + 120}}>
                  <TextoRico tema={tema} texto={it.pie} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ───────────── Etiquetas de inventario (hoja de etiquetas lista para imprimir) ───────────── */

export type Etiqueta = {codigo: string; producto: string; ubicacion: string; qr: string; barras: string; desde: number};

export const Etiquetas: React.FC<{tema: Tema; titulo?: string; items: Etiqueta[]; columnas?: number; desde?: number}> = ({tema, titulo, items, columnas = 3, desde = 0}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const ancho = columnas === 2 ? 760 : 540;
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 34}}>
      {titulo ? <TituloContorno tema={tema} desde={desde} tamano={84} rotacion={0} lineas={[{texto: titulo, color: 'white'}]} /> : null}
      <div style={{display: 'grid', gridTemplateColumns: `repeat(${columnas}, ${ancho}px)`, gap: 30, background: 'white', padding: 34, border: BORDE, boxShadow: SOMBRA, borderRadius: 18}}>
        {items.map((it, i) => {
          const e = entrada(s, fps, it.desde);
          return (
            <div
              key={i}
              style={{
                height: 250,
                border: '3px dashed #888',
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                padding: 16,
                opacity: Math.min(1, e * 1.4),
                transform: `scale(${0.7 + 0.3 * e})`,
                fontFamily: tema.fuentes.texto,
              }}
            >
              <Img src={staticFile(it.qr)} style={{width: 150, height: 150, imageRendering: 'pixelated'}} />
              <div style={{display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 0}}>
                <div style={{fontWeight: 900, fontSize: 30, color: '#111', fontFamily: tema.fuentes.codigo, ...MONO}}>{it.codigo}</div>
                <div style={{fontWeight: 700, fontSize: 26, color: '#222', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{it.producto}</div>
                <div style={{fontSize: 22, color: '#555'}}>📍 {it.ubicacion}</div>
                <Img src={staticFile(it.barras)} style={{height: 62, width: '100%', objectFit: 'contain', objectPosition: 'left', marginTop: 4}} />
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ───────────── Celular con la app (lista de sesiones o chat) ───────────── */

export type ItemMovil = {texto: string; sub?: string; desde: number; online?: boolean; icono?: string};
export type MensajeMovil = {rol: 'yo' | 'ia'; texto: string; desde: number};

export const Movil: React.FC<{
  tema: Tema;
  app?: string;
  pestana?: string;
  items?: ItemMovil[];
  mensajes?: MensajeMovil[];
  /** Texto a la derecha del celular (lista de notas). */
  notas?: {texto: string; desde: number; icono?: string}[];
  /** Imagen (QR) que se muestra junto al celular. */
  qr?: {src: string; desde: number; pie?: string};
  desde?: number;
}> = ({tema, app = 'Claude', pestana, items = [], mensajes = [], notas = [], qr, desde = 0}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const e = entrada(s, fps, desde, 120);
  const visibles = mensajes.filter((m) => s >= m.desde);
  return (
    <AbsoluteFill style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 90}}>
      {qr && s >= qr.desde ? (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, transform: `scale(${entrada(s, fps, qr.desde)})`}}>
          <div style={{background: 'white', border: BORDE, boxShadow: SOMBRA, borderRadius: 20, padding: 20}}>
            <Img src={staticFile(qr.src)} style={{width: 330, height: 330, imageRendering: 'pixelated'}} />
          </div>
          {qr.pie ? <div style={{fontFamily: tema.fuentes.texto, fontWeight: 800, fontSize: 36, color: 'white', textShadow: contorno(4, '#000', false)}}>{qr.pie}</div> : null}
        </div>
      ) : null}
      <div
        style={{
          width: 440,
          height: 790,
          marginBottom: 90,
          borderRadius: 64,
          background: '#111',
          border: '6px solid #000',
          boxShadow: '16px 16px 0 #000',
          padding: 18,
          transform: `translateY(${(1 - e) * 600}px)`,
        }}
      >
        <div style={{width: '100%', height: '100%', borderRadius: 48, background: '#F7F3EE', overflow: 'hidden', display: 'flex', flexDirection: 'column', fontFamily: tema.fuentes.texto}}>
          <div style={{height: 46, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{width: 120, height: 30, borderRadius: 20, background: '#111'}} />
          </div>
          <div style={{padding: '10px 26px 16px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '2px solid #E4DDD3'}}>
            <span style={{fontSize: 34, color: '#D97757'}}>✳</span>
            <span style={{fontSize: 32, fontWeight: 800, color: '#222'}}>{app}</span>
            {pestana ? <span style={{marginLeft: 'auto', fontSize: 24, fontWeight: 800, background: '#222', color: 'white', borderRadius: 16, padding: '4px 16px'}}>{pestana}</span> : null}
          </div>
          <div style={{flex: 1, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden', justifyContent: mensajes.length ? 'flex-end' : 'flex-start'}}>
            {items.map((it, i) =>
              s >= it.desde ? (
                <div key={i} style={{background: 'white', borderRadius: 18, padding: '16px 18px', border: '2px solid #E4DDD3', display: 'flex', alignItems: 'center', gap: 14, opacity: progreso(s, it.desde, 0.3)}}>
                  <span style={{fontSize: 34}}>{it.icono ?? '💻'}</span>
                  <div style={{flex: 1, minWidth: 0}}>
                    <div style={{fontSize: 26, fontWeight: 800, color: '#222', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{it.texto}</div>
                    {it.sub ? <div style={{fontSize: 21, color: '#777'}}>{it.sub}</div> : null}
                  </div>
                  {it.online ? <span style={{width: 18, height: 18, borderRadius: 9, background: '#22C55E', boxShadow: '0 0 0 4px #DCFCE7'}} /> : null}
                </div>
              ) : null,
            )}
            {visibles.slice(-5).map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.rol === 'yo' ? 'flex-end' : 'flex-start',
                  maxWidth: '86%',
                  background: m.rol === 'yo' ? '#EAE4DB' : 'white',
                  border: m.rol === 'ia' ? '2px solid #E4DDD3' : 'none',
                  borderRadius: 20,
                  padding: '12px 16px',
                  fontSize: 23,
                  lineHeight: 1.3,
                  color: '#222',
                  opacity: progreso(s, m.desde, 0.3),
                }}
              >
                <TextoRico tema={tema} texto={m.texto} />
              </div>
            ))}
          </div>
          <div style={{margin: 16, borderRadius: 26, border: '2px solid #D8D0C4', background: 'white', padding: '14px 20px', fontSize: 22, color: '#999'}}>Escribe una tarea…</div>
        </div>
      </div>
      {notas.length ? (
        <div style={{display: 'flex', flexDirection: 'column', gap: 26, maxWidth: 760}}>
          {notas.map((n, i) =>
            s >= n.desde ? (
              <div key={i} style={{background: 'white', border: BORDE, boxShadow: SOMBRA, borderRadius: 22, padding: '20px 28px', fontFamily: tema.fuentes.texto, fontWeight: 800, fontSize: 40, color: '#111', display: 'flex', gap: 18, alignItems: 'center', transform: `scale(${entrada(s, fps, n.desde)})`}}>
                <span style={{fontSize: 46}}>{n.icono ?? '✅'}</span>
                <span>
                  <TextoRico tema={tema} texto={n.texto} />
                </span>
              </div>
            ) : null,
          )}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

/* ───────────── Editor de Power Query (recreación) ───────────── */

export type EstadoPQ = {desde: number; columnas: string[]; filas: (string | number | null)[][]; resaltarCol?: number[]; resaltarFila?: number[]};

const PESTANAS_PQ = ['Archivo', 'Inicio', 'Transformar', 'Agregar columna', 'Vista'];

export const EditorPQ: React.FC<{
  tema: Tema;
  consulta?: string;
  consultas?: string[];
  estados: EstadoPQ[];
  pasos: {texto: string; desde: number}[];
  /** Comando de la cinta que "se pulsa" (aparece resaltado con el cursor). */
  botones?: {pestana: string; texto: string; desde: number; hasta?: number}[];
  anchos?: number[];
  desde?: number;
}> = ({tema, consulta = 'Ventas', consultas, estados, pasos, botones = [], anchos, desde = 0}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const e = entrada(s, fps, desde, 140);
  const estado = [...estados].reverse().find((x) => s >= x.desde) ?? estados[0];
  const cambio = progreso(s, estado.desde, 0.5);
  const boton = [...botones].reverse().find((b) => s >= b.desde && (b.hasta === undefined || s < b.hasta));
  const pestanaActiva = boton?.pestana ?? 'Inicio';
  const pasosVisibles = pasos.filter((p) => s >= p.desde);
  const listaConsultas = consultas ?? [consulta];
  const anchoTabla = 1240;
  const wCols = anchos ?? estado.columnas.map(() => Math.floor(anchoTabla / estado.columnas.length));
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div style={{width: 1760, height: 940, background: 'white', border: BORDE, boxShadow: '16px 16px 0 #000', borderRadius: 14, overflow: 'hidden', transform: `scale(${0.85 + 0.15 * e})`, opacity: Math.min(1, e * 1.5), fontFamily: 'Segoe UI, Arial, sans-serif', display: 'flex', flexDirection: 'column'}}>
        {/* Título */}
        <div style={{height: 46, background: '#217346', color: 'white', display: 'flex', alignItems: 'center', padding: '0 20px', fontSize: 22, fontWeight: 600}}>
          {consulta} - Editor de Power Query
        </div>
        {/* Pestañas */}
        <div style={{height: 44, background: '#F3F3F3', display: 'flex', alignItems: 'flex-end', gap: 6, padding: '0 14px', borderBottom: '1px solid #CCC'}}>
          {PESTANAS_PQ.map((p) => (
            <div key={p} style={{padding: '8px 18px', fontSize: 20, background: p === pestanaActiva ? 'white' : p === 'Archivo' ? '#217346' : 'transparent', color: p === 'Archivo' ? 'white' : '#222', borderTop: p === pestanaActiva ? '3px solid #217346' : '3px solid transparent', fontWeight: p === pestanaActiva ? 700 : 400}}>
              {p}
            </div>
          ))}
        </div>
        {/* Cinta: el comando pulsado */}
        <div style={{height: 92, background: 'white', borderBottom: '1px solid #CCC', display: 'flex', alignItems: 'center', gap: 18, padding: '0 24px'}}>
          {boton ? (
            <div style={{position: 'relative', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 22px', borderRadius: 10, background: '#DFF1E5', border: '3px solid #217346', fontSize: 28, fontWeight: 700, color: '#0F5A32', transform: `scale(${entrada(s, fps, boton.desde)})`}}>
              {boton.texto}
              <span style={{position: 'absolute', right: -26, bottom: -30, fontSize: 44, transform: `scale(${1 - 0.2 * Math.sin(progreso(s, boton.desde + 0.4, 0.3) * Math.PI)})`}}>🖱️</span>
            </div>
          ) : (
            <div style={{fontSize: 22, color: '#888'}}>Cerrar y cargar · Actualizar vista previa · Quitar filas · Dividir columna · Agrupar por · Combinar consultas</div>
          )}
        </div>
        <div style={{flex: 1, display: 'flex', minHeight: 0}}>
          {/* Panel de consultas */}
          <div style={{width: 200, background: '#FAFAFA', borderRight: '1px solid #DDD', padding: 14, fontSize: 19}}>
            <div style={{fontWeight: 700, color: '#555', marginBottom: 10}}>Consultas [{listaConsultas.length}]</div>
            {listaConsultas.map((q) => (
              <div key={q} style={{padding: '6px 8px', borderRadius: 6, background: q === consulta ? '#DFF1E5' : 'transparent', fontWeight: q === consulta ? 700 : 400}}>
                ▦ {q}
              </div>
            ))}
          </div>
          {/* Vista previa de la tabla */}
          <div style={{flex: 1, padding: 18, overflow: 'hidden'}}>
            <div style={{display: 'flex', borderBottom: '2px solid #888'}}>
              {estado.columnas.map((c, i) => (
                <div key={i} style={{width: wCols[i], padding: '10px 12px', fontSize: 22, fontWeight: 700, background: estado.resaltarCol?.includes(i) ? '#FFF3B0' : '#F0F0F0', borderRight: '1px solid #DDD', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                  {c}
                </div>
              ))}
            </div>
            {estado.filas.map((f, r) => (
              <div key={r} style={{display: 'flex', borderBottom: '1px solid #E5E5E5', background: estado.resaltarFila?.includes(r) ? '#FFE3E3' : r % 2 ? '#FBFBFB' : 'white', opacity: 0.35 + 0.65 * cambio}}>
                {f.map((v, i) => (
                  <div
                    key={i}
                    style={{
                      width: wCols[i],
                      padding: '7px 12px',
                      fontSize: 21,
                      borderRight: '1px solid #EEE',
                      whiteSpace: 'pre',
                      overflow: 'hidden',
                      textAlign: typeof v === 'number' ? 'right' : 'left',
                      color: v === null ? '#999' : '#111',
                      fontStyle: v === null ? 'italic' : 'normal',
                      background: estado.resaltarCol?.includes(i) ? 'rgba(255,243,176,0.55)' : undefined,
                      fontFamily: typeof v === 'string' && /^\s|\s$/.test(v) ? 'Consolas, monospace' : undefined,
                    }}
                  >
                    {v === null ? 'null' : typeof v === 'number' ? v.toLocaleString('es-CO') : typeof v === 'string' && /^\s|\s$/.test(v) ? v.replace(/ /g, '·') : v}
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* Pasos aplicados */}
          <div style={{width: 330, background: '#FAFAFA', borderLeft: '1px solid #DDD', padding: 16}}>
            <div style={{fontSize: 19, fontWeight: 700, color: '#555', marginBottom: 6}}>CONFIGURACIÓN DE CONSULTA</div>
            <div style={{fontSize: 18, color: '#777', marginBottom: 14}}>Nombre: {consulta}</div>
            <div style={{fontSize: 22, fontWeight: 800, color: '#217346', marginBottom: 10}}>PASOS APLICADOS</div>
            {pasosVisibles.map((p, i) => {
              const ultimo = i === pasosVisibles.length - 1;
              return (
                <div key={i} style={{padding: '8px 10px', fontSize: 21, borderRadius: 6, background: ultimo ? '#DFF1E5' : 'transparent', fontWeight: ultimo ? 700 : 400, opacity: progreso(s, p.desde, 0.3), display: 'flex', gap: 8}}>
                  <span style={{color: '#217346'}}>⚙</span>
                  {p.texto}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ───────────── Tarjeta de la web y la tienda (con QR real) ───────────── */

export const Tienda: React.FC<{tema: Tema; desde?: number; texto?: string; qr?: string}> = ({tema, desde = 0, texto = 'Plantillas, cursos y recursos', qr = 'edwin-o/comun/qr-tienda.png'}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const e = entrada(s, fps, desde);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 60, background: 'white', border: BORDE, boxShadow: '16px 16px 0 #000', borderRadius: 30, padding: '50px 70px', transform: `scale(${e})`}}>
        <Img src={staticFile(qr)} style={{width: 340, height: 340, imageRendering: 'pixelated'}} />
        <div style={{display: 'flex', flexDirection: 'column', gap: 22, fontFamily: tema.fuentes.texto}}>
          <div style={{fontFamily: tema.fuentes.titulo, fontSize: 92, color: tema.colores.principal, textShadow: contorno(4, '#000')}}>🛒 TIENDA</div>
          <div style={{fontSize: 56, fontWeight: 900, color: '#111', fontFamily: tema.fuentes.codigo, ...MONO}}>edwinortiz.net/tienda</div>
          <div style={{fontSize: 40, fontWeight: 700, color: '#444'}}>{texto}</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** Píldora fija con la dirección de la web (para el cierre). */
export const PildoraWeb: React.FC<{tema: Tema; desde?: number}> = ({tema, desde = 0}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const e = entrada(s, fps, desde);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-start', paddingTop: 26}}>
      <div style={{background: 'white', border: BORDE, boxShadow: '8px 8px 0 #000', borderRadius: 50, padding: '14px 40px', fontFamily: tema.fuentes.texto, fontWeight: 900, fontSize: 44, color: '#111', transform: `scale(${e})`}}>
        🛒 edwinortiz.net/tienda
      </div>
    </AbsoluteFill>
  );
};
