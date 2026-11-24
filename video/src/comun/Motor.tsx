import React from 'react';
import {AbsoluteFill} from 'remotion';
import {
  CierreSiguiente,
  Cortinilla,
  EtiquetaPaso,
  ListaErrores,
  LogoEO,
  NumeroGigante,
  Pildora,
  Resumen3,
  Tarjeta,
  TituloContorno,
  type VarianteFondo,
} from './Basicos';
import {Barras, ChatIA, Cifra, Comparar, Cronologia, Cuadricula, FormulaGrande, ListaCheck, Teclas, TextoRico} from './Bloques';
import {CodigoAnimado, Terminal} from './Codigo';
import {Episodio, type DefEscena} from './Episodio';
import {HojaExcel} from './HojaExcel';
import {ShortEscena} from './Short';
import {crearT, progreso, useSegundos} from './tiempo';
import type {EscenaProps, Manifest, Tema} from './tipos';
import type {Bloque, Cue, EspecEpisodio, EspecEscena} from './motor-tipos';
import {planificar, resolverCue, type BloqueResuelto} from './motor-plan';

export * from './motor-tipos';
export * from './motor-plan';

/* ───────── Colores por nombre ───────── */

export const color = (tema: Tema, c?: string) => {
  if (!c) return undefined;
  const mapa: Record<string, string> = {
    blanco: 'white',
    negro: '#000',
    amarillo: tema.colores.acento,
    verde: tema.colores.acento2,
    magenta: tema.colores.acento3,
    turquesa: tema.colores.acento4,
    rojo: tema.colores.rojo,
    dorado: tema.colores.dorado,
    azul: tema.colores.azul,
    naranja: tema.colores.principal,
    oscuro: tema.colores.oscuro,
  };
  return mapa[c] ?? c;
};

/* ───────── Render de un bloque ───────── */

const Centro: React.FC<{children: React.ReactNode; gap?: number}> = ({children, gap = 50}) => (
  <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap, padding: '0 80px'}}>{children}</AbsoluteFill>
);

const RenderBloque: React.FC<{tema: Tema; b: BloqueResuelto}> = ({tema, b}) => {
  const d = b.de;
  switch (b.tipo) {
    case 'titulo':
      return (
        <Centro gap={40}>
          <TituloContorno tema={tema} desde={d} tamano={b.tamano ?? 150} rotacion={b.rotacion ?? -3} lineas={b.lineas.map((l) => ({...l, color: color(tema, l.color)}))} />
          {b.sub ? <Pildora tema={tema} texto={b.sub} desde={d + 0.4} tamano={60} /> : null}
          {b.texto ? (
            <div style={{fontFamily: tema.fuentes.texto, fontWeight: 700, fontSize: 48, color: 'white', textAlign: 'center', maxWidth: 1500, lineHeight: 1.3, opacity: 1}}>
              <TextoRico tema={tema} texto={b.texto} />
            </div>
          ) : null}
        </Centro>
      );
    case 'tarjeta':
      return (
        <Centro>
          <Tarjeta tema={tema} desde={d} icono={b.icono} titulo={b.titulo} texto={<TextoRico tema={tema} texto={b.texto} />} fuente={b.fuente} color={color(tema, b.color)} ancho={b.ancho} />
        </Centro>
      );
    case 'tarjetas':
      return (
        <Centro gap={44}>
          {b.titulo ? <TituloContorno tema={tema} desde={d} tamano={96} rotacion={0} lineas={[{texto: b.titulo, color: 'white'}]} /> : null}
          <div style={{display: 'flex', gap: 40, alignItems: 'stretch'}}>
            {b.items.map((it, i) => (
              <Tarjeta key={i} tema={tema} desde={(it.desde as number | undefined) ?? d + i * 0.3} icono={it.icono} titulo={it.titulo} texto={<TextoRico tema={tema} texto={it.texto} />} fuente={it.fuente} color={color(tema, it.color)} ancho={b.items.length >= 3 ? 540 : 800} />
            ))}
          </div>
        </Centro>
      );
    case 'lista':
      return <ListaCheck tema={tema} titulo={b.titulo} desde={d} items={b.items as {texto: string; desde: number; icono?: string}[]} />;
    case 'cuadricula':
      return <Cuadricula tema={tema} titulo={b.titulo} desde={d} items={b.items as {icono: string; texto: string; desde: number}[]} />;
    case 'numero':
      return <NumeroGigante tema={tema} n={b.n} total={b.total} texto={b.texto} desde={d} />;
    case 'cifra':
      return <Cifra tema={tema} valor={b.valor} texto={b.texto} fuente={b.fuente} color={color(tema, b.color)} desde={d} />;
    case 'hoja':
      return <HojaExcel tema={tema} aparece={d} {...(b.hoja as Omit<React.ComponentProps<typeof HojaExcel>, 'tema'>)} />;
    case 'codigo':
      return (
        <>
          <CodigoAnimado
            tema={tema}
            codigo={(b.previo ?? '') + b.codigo}
            desde={d + 0.2 - (b.previo ?? '').length / (b.velocidad ?? 40)}
            velocidad={b.velocidad ?? 40}
            archivo={b.archivo}
            tamano={b.tamano ?? (b.salida ? 30 : 36)}
            ancho={b.salida ? 1080 : b.ancho ?? 1500}
            x={b.salida ? 50 : undefined}
            y={b.salida ? 150 : undefined}
            resaltar={(b.resaltar ?? []) as {lineas: number[]; desde: number; hasta?: number}[]}
          />
          {b.salida ? <Terminal tema={tema} lineas={b.salida as {texto: string; desde: number; color?: string}[]} ancho={700} x={1170} y={b.salidaY ?? 470} titulo={b.tituloSalida ?? 'Terminal'} /> : null}
        </>
      );
    case 'terminal':
      return <Terminal tema={tema} lineas={b.lineas as {texto: string; desde: number; color?: string}[]} titulo={b.titulo} ancho={b.ancho ?? 1300} />;
    case 'chat':
      return <ChatIA tema={tema} mensajes={b.mensajes as never} titulo={b.titulo} panel={b.panel} aparece={d} />;
    case 'comparar':
      return <Comparar tema={tema} titulo={b.titulo} desde={d} izq={{...b.izq, color: color(tema, b.izq.color)} as never} der={{...b.der, color: color(tema, b.der.color)} as never} />;
    case 'formula':
      return <FormulaGrande tema={tema} formula={b.formula} partes={b.partes as never} titulo={b.titulo} desde={d} escribir={b.escribir ?? true} />;
    case 'cronologia':
      return <Cronologia tema={tema} titulo={b.titulo} desde={d} items={b.items.map((it) => ({...it, color: color(tema, it.color)})) as never} />;
    case 'barras':
      return <Barras tema={tema} titulo={b.titulo} items={b.items} desde={d} ancho={b.ancho} alto={b.alto} x={b.x} y={b.y} />;
    case 'teclas':
      return <Teclas tema={tema} teclas={b.teclas} texto={b.texto} desde={d} />;
    case 'cortinilla':
      return <Cortinilla tema={tema} titulo={b.titulo} desde={d} />;
    case 'cierre':
      return <CierreSiguiente tema={tema} siguiente={b.siguiente} desde={d} suscribirDesde={b.suscribir as number | undefined} />;
    case 'resumen':
      return <Resumen3 tema={tema} titulo={b.titulo} ideas={b.ideas as {texto: string; desde: number}[]} />;
    case 'errores':
      return <ListaErrores tema={tema} titulo={b.titulo} items={b.items as {mal: string; bien: string; desde: number}[]} />;
    case 'logo':
      return (
        <Centro gap={30}>
          <LogoEO tema={tema} tamano={300} />
          {b.texto ? <Pildora tema={tema} texto={b.texto} desde={d + 0.3} tamano={64} /> : null}
        </Centro>
      );
    case 'pildora':
      return (
        <AbsoluteFill style={{alignItems: 'center', justifyContent: b.abajo ? 'flex-end' : 'flex-start', padding: b.abajo ? '0 0 190px' : '40px 0 0', zIndex: 50}}>
          <Pildora tema={tema} texto={b.texto} desde={d} tamano={b.tamano ?? 56} />
        </AbsoluteFill>
      );
    default:
      return null;
  }
};

const Capa: React.FC<{de: number; a: number; children: React.ReactNode}> = ({de, a, children}) => {
  const s = useSegundos();
  if (s < de - 0.02 || s >= a) return null;
  const salida = a === Infinity ? 1 : 1 - progreso(s, a - 0.18, 0.18);
  return <AbsoluteFill style={{opacity: salida}}>{children}</AbsoluteFill>;
};

export const EscenaMotor: React.FC<EscenaProps & {esp: EspecEscena}> = ({tema, palabras, duracion, esp}) => {
  const plan = React.useMemo(() => planificar(esp, palabras, duracion), [esp, palabras, duracion]);
  const t = React.useMemo(() => crearT(palabras), [palabras]);
  const paso = esp.paso;
  return (
    <>
      {plan.map((b, i) => (
        <Capa key={i} de={b.de} a={b.a}>
          <RenderBloque tema={tema} b={b} />
        </Capa>
      ))}
      {paso ? <EtiquetaPaso tema={tema} n={paso.n} texto={paso.texto} prefijo={paso.prefijo} desde={paso.en === undefined ? 0.1 : resolverCue(t, paso.en)} /> : null}
    </>
  );
};

/** Convierte la especificación de escenas en las DefEscena que usa <Episodio>. */
export const definiciones = (esp: EspecEpisodio): Record<string, DefEscena> =>
  Object.fromEntries(
    Object.entries(esp.escenas).map(([num, e]) => {
      const Visual: React.FC<EscenaProps> = (props) => <EscenaMotor {...props} esp={e} />;
      return [num, {fondo: e.fondo as VarianteFondo | undefined, sinSubtitulos: e.sinSubtitulos, Visual}];
    }),
  );

export const EpisodioMotor: React.FC<{tema: Tema; esp: EspecEpisodio}> = ({tema, esp}) => {
  const defs = React.useMemo(() => definiciones(esp), [esp]);
  return <Episodio tema={tema} manifest={esp.manifest} base={`${esp.canal}/${esp.slug}`} escenas={defs} />;
};

/** Datos de un Short ya resuelto (escena, recorte en segundos). */
export const datosShort = (esp: EspecEpisodio, n: number) => {
  const sh = esp.shorts[n];
  const escena = esp.manifest.escenas.find((e) => e.num === sh.escena)!;
  const t = crearT(escena.palabras);
  const recorte = sh.desde === undefined ? 0 : Math.max(0, resolverCue(t, sh.desde) - 0.15);
  return {sh, escena, recorte};
};

export const ShortMotor: React.FC<{tema: Tema; esp: EspecEpisodio; n: number}> = ({tema, esp, n}) => {
  const defs = React.useMemo(() => definiciones(esp), [esp]);
  const {sh, escena, recorte} = datosShort(esp, n);
  return (
    <ShortEscena
      tema={tema}
      escena={escena}
      base={`${esp.canal}/${esp.slug}`}
      def={defs[sh.escena]}
      recorte={recorte}
      gancho={sh.gancho.map((l) => ({...l, color: color(tema, l.color)}))}
    />
  );
};

export type {Manifest};
