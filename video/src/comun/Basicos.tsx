import React, {useMemo} from 'react';
import {AbsoluteFill, random, useVideoConfig} from 'remotion';
import type {Palabra, Tema} from './tipos';
import {contorno, entrada, progreso, useSegundos, visible} from './tiempo';

/* ───────────── Fondos ───────────── */

const Circuito: React.FC<{s: number; color: string; semilla?: string}> = ({s, color, semilla = 'c'}) => {
  const lineas = useMemo(
    () =>
      new Array(14).fill(0).map((_, i) => {
        const y = 60 + random(`${semilla}y${i}`) * 960;
        const x1 = random(`${semilla}a${i}`) * 900;
        const largo = 300 + random(`${semilla}l${i}`) * 900;
        const quiebre = x1 + largo * 0.6;
        const dy = (random(`${semilla}d${i}`) - 0.5) * 160;
        return {x1, y, quiebre, x2: x1 + largo, dy, fase: random(`${semilla}f${i}`) * 6};
      }),
    [semilla],
  );
  return (
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, opacity: 0.55}}>
      {lineas.map((l, i) => (
        <g key={i}>
          <polyline
            points={`${l.x1},${l.y} ${l.quiebre},${l.y} ${l.quiebre + 60},${l.y + l.dy} ${l.x2},${l.y + l.dy}`}
            fill="none"
            stroke={color}
            strokeWidth={2}
            opacity={0.5}
          />
          <circle cx={l.x1} cy={l.y} r={5} fill={color} />
          <circle
            cx={l.x2}
            cy={l.y + l.dy}
            r={7 + 3 * Math.sin(s * 3 + l.fase)}
            fill={color}
            opacity={0.6 + 0.4 * Math.sin(s * 3 + l.fase)}
          />
        </g>
      ))}
    </svg>
  );
};

export type VarianteFondo = 'naranja' | 'azul' | 'claro' | 'oscuro';

export const Fondo: React.FC<{tema: Tema; variante?: VarianteFondo; semilla?: string}> = ({
  tema,
  variante = 'naranja',
  semilla,
}) => {
  const s = useSegundos();
  const c = tema.colores;
  if (variante === 'naranja') {
    return (
      <AbsoluteFill
        style={{background: `radial-gradient(circle at 35% 45%, ${c.principal2} 0%, ${c.principal} 58%, #D94400 100%)`}}
      >
        <AbsoluteFill
          style={{
            background: `repeating-conic-gradient(from ${s * 5}deg at 35% 45%, rgba(255,255,255,0.10) 0deg 7deg, rgba(255,255,255,0) 7deg 20deg)`,
          }}
        />
      </AbsoluteFill>
    );
  }
  if (variante === 'azul') {
    return (
      <AbsoluteFill style={{background: `linear-gradient(135deg, ${c.azul} 0%, #0E2275 100%)`}}>
        <Circuito s={s} color="#4D8BFF" semilla={semilla} />
      </AbsoluteFill>
    );
  }
  if (variante === 'oscuro') {
    return (
      <AbsoluteFill style={{background: `radial-gradient(circle at 50% 40%, #2A2F3A 0%, #12141A 100%)`}}>
        <Circuito s={s} color="#3DD6C8" semilla={semilla} />
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill
      style={{
        backgroundColor: c.claro,
        backgroundImage: 'radial-gradient(rgba(0,0,0,0.09) 2px, transparent 2px)',
        backgroundSize: '34px 34px',
      }}
    />
  );
};

/* ───────────── Títulos con contorno ───────────── */

export type LineaTitulo = {texto: string; color?: string; tamano?: number};

export const TituloContorno: React.FC<{
  tema: Tema;
  lineas: LineaTitulo[];
  desde?: number;
  tamano?: number;
  alineacion?: 'center' | 'left' | 'right';
  rotacion?: number;
  grosor?: number;
  style?: React.CSSProperties;
}> = ({tema, lineas, desde = 0, tamano = 150, alineacion = 'center', rotacion = -3, grosor, style}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: alineacion === 'center' ? 'center' : alineacion === 'left' ? 'flex-start' : 'flex-end',
        transform: `rotate(${rotacion}deg)`,
        ...style,
      }}
    >
      {lineas.map((l, i) => {
        const e = entrada(s, fps, desde + i * 0.12, 200);
        const t = l.tamano ?? tamano;
        return (
          <div
            key={i}
            style={{
              fontFamily: tema.fuentes.titulo,
              fontSize: t,
              lineHeight: 1.02,
              color: l.color ?? tema.colores.acento,
              textShadow: contorno(grosor ?? Math.max(4, t * 0.055), '#000'),
              transform: `scale(${0.5 + 0.5 * e}) translateY(${(1 - e) * 40}px)`,
              opacity: Math.min(1, e * 1.5),
              whiteSpace: 'nowrap',
              letterSpacing: 1,
            }}
          >
            {l.texto}
          </div>
        );
      })}
    </div>
  );
};

/* ───────────── Píldora oscura (firma de miniaturas) ───────────── */

export const Pildora: React.FC<{tema: Tema; texto: string; desde?: number; tamano?: number; style?: React.CSSProperties}> = ({
  tema,
  texto,
  desde = 0,
  tamano = 64,
  style,
}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const e = entrada(s, fps, desde);
  return (
    <div
      style={{
        background: tema.colores.oscuro,
        borderRadius: tamano,
        padding: `${tamano * 0.12}px ${tamano * 0.6}px`,
        fontFamily: tema.fuentes.titulo,
        fontSize: tamano,
        color: tema.colores.acento4,
        textShadow: contorno(2, '#000', false),
        transform: `scale(${e})`,
        display: 'inline-block',
        boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {texto}
    </div>
  );
};

/* ───────────── Etiqueta "PASO N" ───────────── */

export const EtiquetaPaso: React.FC<{tema: Tema; n: number | string; texto?: string; desde?: number; prefijo?: string}> = ({
  tema,
  n,
  texto,
  desde = 0,
  prefijo = 'PASO',
}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const e = entrada(s, fps, desde);
  return (
    <div
      style={{
        position: 'absolute',
        top: 34,
        left: 40,
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        transform: `translateX(${(1 - e) * -500}px)`,
        zIndex: 20,
      }}
    >
      <div
        style={{
          background: tema.colores.acento3,
          color: 'white',
          fontFamily: tema.fuentes.titulo,
          fontSize: 54,
          padding: '4px 26px',
          borderRadius: 16,
          border: '4px solid #000',
          boxShadow: '6px 6px 0 #000',
        }}
      >
        {prefijo} {n}
      </div>
      {texto ? (
        <div
          style={{
            background: 'white',
            fontFamily: tema.fuentes.texto,
            fontWeight: 800,
            fontSize: 38,
            padding: '10px 24px',
            borderRadius: 14,
            border: '4px solid #000',
            boxShadow: '6px 6px 0 #000',
          }}
        >
          {texto}
        </div>
      ) : null}
    </div>
  );
};

/* ───────────── Subtítulos palabra por palabra ───────────── */

export const Subtitulos: React.FC<{
  tema: Tema;
  palabras: Palabra[];
  maxPalabras?: number;
  abajo?: number;
  tamano?: number;
}> = ({tema, palabras, maxPalabras = 5, abajo = 70, tamano = 56}) => {
  const s = useSegundos();
  const bloques = useMemo(() => {
    const res: Palabra[][] = [];
    let actual: Palabra[] = [];
    palabras.forEach((p, i) => {
      const previa = palabras[i - 1];
      if (actual.length && (actual.length >= maxPalabras || (previa && p.inicio - previa.fin > 0.35))) {
        res.push(actual);
        actual = [];
      }
      actual.push(p);
      if (/[.?!:;,]$/.test(p.texto) && actual.length >= 2) {
        res.push(actual);
        actual = [];
      }
    });
    if (actual.length) res.push(actual);
    return res;
  }, [palabras, maxPalabras]);

  const bloque = bloques.find((b, i) => {
    const fin = bloques[i + 1] ? Math.min(bloques[i + 1][0].inicio, b[b.length - 1].fin + 0.5) : b[b.length - 1].fin + 0.5;
    return s >= b[0].inicio - 0.05 && s < fin;
  });
  if (!bloque) return null;
  return (
    <AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: abajo, zIndex: 50}}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '0 18px',
          maxWidth: 1500,
          fontFamily: tema.fuentes.texto,
          fontWeight: 800,
          fontSize: tamano,
          textTransform: 'uppercase',
        }}
      >
        {bloque.map((p, i) => {
          const activa = s >= p.inicio && s < p.fin + 0.08;
          return (
            <span
              key={i}
              style={{
                color: activa ? tema.colores.acento : 'white',
                textShadow: contorno(5, '#000', false),
                transform: `scale(${activa ? 1.08 : 1})`,
                display: 'inline-block',
              }}
            >
              {p.texto}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ───────────── Tarjeta de caso / dato con fuente ───────────── */

export const Tarjeta: React.FC<{
  tema: Tema;
  titulo: string;
  texto: string;
  fuente?: string;
  icono?: string;
  desde?: number;
  color?: string;
  ancho?: number;
}> = ({tema, titulo, texto, fuente, icono, desde = 0, color, ancho = 1300}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const e = entrada(s, fps, desde);
  return (
    <div
      style={{
        width: ancho,
        background: 'white',
        borderRadius: 32,
        border: '6px solid #000',
        boxShadow: '14px 14px 0 #000',
        padding: '44px 56px',
        transform: `scale(${0.7 + 0.3 * e}) rotate(${(1 - e) * -4}deg)`,
        opacity: e,
        fontFamily: tema.fuentes.texto,
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 24}}>
        {icono ? <div style={{fontSize: 80}}>{icono}</div> : null}
        <div style={{fontFamily: tema.fuentes.titulo, fontSize: 76, color: color ?? tema.colores.azul, lineHeight: 1.05}}>
          {titulo}
        </div>
      </div>
      <div style={{fontSize: 44, fontWeight: 600, marginTop: 20, color: tema.colores.texto, lineHeight: 1.3}}>{texto}</div>
      {fuente ? (
        <div style={{fontSize: 26, fontWeight: 500, marginTop: 24, color: '#666'}}>Fuente: {fuente}</div>
      ) : null}
    </div>
  );
};

/* ───────────── Lista de errores ✗ / ✓ ───────────── */

export const ListaErrores: React.FC<{tema: Tema; items: {mal: string; bien: string; desde: number}[]; titulo?: string}> = ({
  tema,
  items,
  titulo = 'Si no te funcionó…',
}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill style={{padding: '70px 120px', gap: 30, fontFamily: tema.fuentes.texto}}>
      <TituloContorno tema={tema} lineas={[{texto: titulo, color: tema.colores.acento}]} tamano={100} rotacion={0} />
      {items.map((it, i) => {
        const e = entrada(s, fps, it.desde);
        const e2 = entrada(s, fps, it.desde + 0.9);
        return (
          <div key={i} style={{display: 'flex', gap: 30, transform: `translateX(${(1 - e) * 1400}px)`}}>
            <div style={{flex: 1, background: '#FFE3E3', border: '5px solid #000', borderRadius: 24, padding: '22px 30px', fontSize: 40, fontWeight: 700, boxShadow: '8px 8px 0 #000'}}>
              <span style={{color: tema.colores.rojo, fontSize: 54, marginRight: 16}}>✗</span>
              {it.mal}
            </div>
            <div style={{flex: 1, background: '#DFF7E7', border: '5px solid #000', borderRadius: 24, padding: '22px 30px', fontSize: 40, fontWeight: 700, opacity: e2, transform: `scale(${0.8 + 0.2 * e2})`, boxShadow: '8px 8px 0 #000'}}>
              <span style={{color: tema.colores.acento2, fontSize: 54, marginRight: 16}}>✓</span>
              {it.bien}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

/* ───────────── Resumen en 3 tarjetas ───────────── */

export const Resumen3: React.FC<{tema: Tema; ideas: {texto: string; desde: number}[]; titulo?: string}> = ({
  tema,
  ideas,
  titulo = 'En resumen',
}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const colores = [tema.colores.acento, tema.colores.acento4, tema.colores.acento3];
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 60}}>
      <TituloContorno tema={tema} lineas={[{texto: titulo, color: 'white'}]} tamano={110} rotacion={0} />
      <div style={{display: 'flex', gap: 46}}>
        {ideas.map((idea, i) => {
          const e = entrada(s, fps, idea.desde);
          return (
            <div
              key={i}
              style={{
                width: 520,
                minHeight: 380,
                background: 'white',
                border: '6px solid #000',
                borderRadius: 30,
                boxShadow: '12px 12px 0 #000',
                padding: 36,
                transform: `translateY(${(1 - e) * 600}px) rotate(${(i - 1) * 2}deg)`,
                fontFamily: tema.fuentes.texto,
              }}
            >
              <div
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: 48,
                  background: colores[i % 3],
                  border: '5px solid #000',
                  fontFamily: tema.fuentes.titulo,
                  fontSize: 62,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {i + 1}
              </div>
              <div style={{fontSize: 42, fontWeight: 800, marginTop: 24, lineHeight: 1.25}}>{idea.texto}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ───────────── Número gigante (listas) ───────────── */

export const NumeroGigante: React.FC<{tema: Tema; n: number; total?: number; texto: string; desde?: number}> = ({
  tema,
  n,
  total,
  texto,
  desde = 0,
}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const e = entrada(s, fps, desde, 120);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 10}}>
      <div
        style={{
          fontFamily: tema.fuentes.titulo,
          fontSize: 420,
          lineHeight: 1,
          color: tema.colores.acento,
          textShadow: contorno(16, '#000'),
          transform: `scale(${e}) rotate(${(1 - e) * 30}deg)`,
        }}
      >
        {n}
        {total ? <span style={{fontSize: 160, color: 'white'}}>/{total}</span> : null}
      </div>
      <TituloContorno tema={tema} lineas={[{texto, color: 'white'}]} tamano={110} desde={desde + 0.3} rotacion={0} />
    </AbsoluteFill>
  );
};

/* ───────────── Logo EO ───────────── */

export const LogoEO: React.FC<{tema: Tema; tamano?: number}> = ({tema, tamano = 220}) => (
  <div
    style={{
      width: tamano,
      height: tamano,
      borderRadius: tamano,
      background: `radial-gradient(circle at 35% 30%, #3E63E0, ${tema.colores.azul} 70%)`,
      border: `${tamano * 0.05}px solid ${tema.colores.dorado}`,
      boxShadow: `0 0 0 ${tamano * 0.03}px #000, 0 20px 50px rgba(0,0,0,0.4)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: tema.fuentes.titulo,
      fontSize: tamano * 0.48,
      color: tema.colores.dorado,
      letterSpacing: 2,
    }}
  >
    {tema.monograma}
  </div>
);

/* ───────────── Cortinilla del canal (≈2,5 s) ───────────── */

export const Cortinilla: React.FC<{tema: Tema; titulo?: string; desde?: number}> = ({tema, titulo, desde = 0}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const e = entrada(s, fps, desde, 120);
  const barrido = progreso(s, desde, 0.5);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <Fondo tema={tema} variante="azul" semilla="cortinilla" />
      <AbsoluteFill
        style={{
          background: tema.colores.principal,
          clipPath: `polygon(0 0, ${barrido * 130}% 0, ${barrido * 130 - 30}% 100%, 0 100%)`,
          opacity: 1 - progreso(s, desde + 0.5, 0.4),
        }}
      />
      <div style={{display: 'flex', alignItems: 'center', gap: 50, transform: `scale(${e})`}}>
        <div style={{transform: `rotate(${(1 - e) * -180}deg)`}}>
          <LogoEO tema={tema} tamano={260} />
        </div>
        <div>
          <div style={{fontFamily: tema.fuentes.titulo, fontSize: 170, color: tema.colores.dorado, textShadow: contorno(7, '#000'), lineHeight: 1}}>
            {tema.nombre}
          </div>
          <div style={{fontFamily: tema.fuentes.texto, fontWeight: 600, fontSize: 46, color: 'white', letterSpacing: 10, textTransform: 'uppercase', opacity: visible(s, desde + 0.5)}}>
            {tema.lema}
          </div>
        </div>
      </div>
      {titulo ? (
        <div style={{position: 'absolute', bottom: 150, opacity: visible(s, desde + 0.8)}}>
          <Pildora tema={tema} texto={titulo} desde={desde + 0.8} tamano={70} />
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

/* ───────────── Cierre: siguiente video + suscripción ───────────── */

export const CierreSiguiente: React.FC<{tema: Tema; siguiente: string; desde?: number; suscribirDesde?: number}> = ({
  tema,
  siguiente,
  desde = 0,
  suscribirDesde,
}) => {
  const s = useSegundos();
  const {fps} = useVideoConfig();
  const e = entrada(s, fps, desde);
  const sub = entrada(s, fps, suscribirDesde ?? desde + 1.2);
  const clic = progreso(s, (suscribirDesde ?? desde + 1.2) + 0.8, 0.3);
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 70}}>
      <div style={{fontFamily: tema.fuentes.titulo, fontSize: 80, color: 'white', textShadow: contorno(5, '#000')}}>MIRA ESTE VIDEO 👇</div>
      <div
        style={{
          width: 1100,
          height: 420,
          borderRadius: 30,
          border: '8px solid #000',
          boxShadow: '16px 16px 0 #000',
          background: `radial-gradient(circle at 30% 40%, ${tema.colores.principal2}, ${tema.colores.principal})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 40,
          transform: `scale(${e})`,
        }}
      >
        <TituloContorno tema={tema} lineas={[{texto: siguiente, color: tema.colores.acento, tamano: 96}]} rotacion={-2} />
      </div>
      <div
        style={{
          background: clic > 0.5 ? '#606060' : '#FF0000',
          color: 'white',
          fontFamily: tema.fuentes.texto,
          fontWeight: 800,
          fontSize: 54,
          padding: '20px 60px',
          borderRadius: 60,
          transform: `scale(${sub * (1 - 0.1 * Math.sin(clic * Math.PI))})`,
          border: '5px solid #000',
        }}
      >
        {clic > 0.5 ? '✓ SUSCRITO' : 'SUSCRÍBETE'} 🔔
      </div>
    </AbsoluteFill>
  );
};
