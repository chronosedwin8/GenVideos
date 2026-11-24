import React from 'react';
import {AbsoluteFill} from 'remotion';
import {
  CierreSiguiente,
  Cortinilla,
  EtiquetaPaso,
  ListaErrores,
  LogoEO,
  Pildora,
  Resumen3,
  Tarjeta,
  TituloContorno,
} from '../../comun/Basicos';
import {Episodio, type DefEscena} from '../../comun/Episodio';
import {DialogoOffice, LineaTurno, Ventana} from '../../comun/Extras';
import {ShortEscena} from '../../comun/Short';
import {crearT} from '../../comun/tiempo';
import {type CeldaExcel, HojaExcel, type HojaExcelProps} from '../../comun/HojaExcel';
import type {EscenaProps, Manifest} from '../../comun/tipos';
import manifestJson from '../../../public/edwin-o/horas-extra-excel/manifest.json';
import {temaEdwinO as tema} from '../tema';

export const manifestHorasExtra = manifestJson as Manifest;

/* ───────── Datos de la hoja (verificados en ficha.md) ───────── */

const DIAS = [
  ['Lunes', '7:00', '17:30', '10:30', '2:30'],
  ['Martes', '8:00', '17:00', '9:00', '1:00'],
  ['Miércoles', '7:30', '16:00', '8:30', '0:30'],
  ['Jueves', '8:00', '15:30', '7:30', '0:00'],
  ['Viernes', '7:00', '19:15', '12:15', '4:15'],
  ['Sábado', '22:00', '6:00', '8:00', '0:00'],
];
const ENC = {negrita: true, fondo: '#E9F3EC'};
const VERDE_OK = {fondo: '#DFF7E7', color: '#0F5A32', negrita: true};
const ROJO_EXCEL = {fondo: '#FFC7CE', color: '#9C0006'};

const BASE: Partial<HojaExcelProps> = {
  archivo: 'Control de horas.xlsx',
  columnas: 8,
  anchos: {A: 200, B: 160, C: 160, D: 170, E: 190, F: 50, G: 210, H: 170},
  hoja: 'Semana',
};

type Tiempo = number | ((i: number) => number);
const en = (d: Tiempo, i: number) => (typeof d === 'function' ? d(i) : d);

const encabezados = (d: Tiempo = 0): CeldaExcel[] =>
  ['Día', 'Entrada', 'Salida', 'Horas', 'Horas extra'].map((v, i) => ({ref: `${'ABCDE'[i]}1`, valor: v, desde: en(d, i), ...ENC}));

const datos = (d: Tiempo = 0, omitir: string[] = []): CeldaExcel[] =>
  DIAS.flatMap((f, i) =>
    ['A', 'B', 'C']
      .map((col, j) => ({ref: `${col}${i + 2}`, valor: f[j], desde: en(d, i)}))
      .filter((c) => !omitir.includes(c.ref)),
  );

const horas = (d: Tiempo = 0, sabado: 'ok' | 'error' = 'ok'): CeldaExcel[] =>
  DIAS.map((f, i) =>
    i === 5 && sabado === 'error'
      ? {ref: 'D7', valor: '#####', desde: en(d, i), color: '#C00000'}
      : {ref: `D${i + 2}`, valor: f[3], desde: en(d, i)},
  );

const extra = (d: Tiempo = 0, condicional?: (i: number) => number): CeldaExcel[] =>
  DIAS.map((f, i) => ({
    ref: `E${i + 2}`,
    valor: f[4],
    desde: en(d, i),
    ...(condicional && f[4] !== '0:00' ? {...ROJO_EXCEL, fondoDesde: condicional(i)} : {}),
  }));

const config = (j = 0, v?: number, r?: number): CeldaExcel[] => [
  {ref: 'G2', valor: 'Jornada', desde: j, negrita: true},
  {ref: 'H2', valor: '8:00', desde: j + 0.3},
  ...(v !== undefined
    ? [
        {ref: 'G3', valor: 'Valor hora', desde: v, negrita: true},
        {ref: 'H3', valor: '40', desde: v + 0.3},
      ]
    : []),
  ...(r !== undefined
    ? [
        {ref: 'G4', valor: 'Recargo extra', desde: r, negrita: true},
        {ref: 'H4', valor: '25%', desde: r + 0.3},
      ]
    : []),
];

const totales = (d = 0): CeldaExcel[] => [
  {ref: 'A8', valor: 'Total', desde: d, negrita: true},
  {ref: 'D8', valor: '55:45', desde: d, negrita: true},
  {ref: 'E8', valor: '8:15', desde: d, negrita: true},
];

const pago = (d = 0): CeldaExcel[] => [
  {ref: 'G6', valor: 'Pago extra', desde: d, negrita: true},
  {ref: 'H6', valor: '412,50', desde: d, negrita: true, fondo: '#FFE500'},
];

/* ───────── Escenas ───────── */

const E01: React.FC<EscenaProps> = ({t}) => {
  const ap = t('mira') - 0.1;
  return (
    <>
      <Ventana de={0} a={ap}>
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
          <TituloContorno
            tema={tema}
            lineas={[
              {texto: '¿Horas extra con', color: 'white', tamano: 110},
              {texto: 'CALCULADORA', color: tema.colores.acento, tamano: 210},
              {texto: 'y papel?', color: tema.colores.acento3, tamano: 140},
            ]}
          />
        </AbsoluteFill>
      </Ventana>
      <HojaExcel
        tema={tema}
        {...BASE}
        aparece={ap}
        celdas={[
          ...encabezados(ap),
          ...datos((i) => t('entrada') + i * 0.12),
          ...horas((i) => t('trabajadas') + i * 0.15, 'error').map((c) => (c.ref === 'D7' ? {...c, hasta: t('noche') + 0.2} : c)),
          {ref: 'D7', valor: '8:00', desde: t('noche') + 0.2, ...VERDE_OK},
          ...extra((i) => t('extra', 2) + i * 0.15),
          ...config(ap, ap, ap),
          {ref: 'A8', valor: 'Total', desde: t('extra', 2) + 0.9, negrita: true},
          {ref: 'D8', valor: '55:45', desde: t('extra', 2) + 0.9, negrita: true},
          {ref: 'E8', valor: '8:15', desde: t('extra', 2) + 0.9, negrita: true},
          ...pago(t('pagar')),
        ]}
        zoom={[
          {a: 'D7', desde: t('turnos'), escala: 1.6},
          {a: 'D7', desde: t('extra', 2), escala: 1},
          {a: 'H6', desde: t('pagar') - 0.2, escala: 1.7},
        ]}
      />
    </>
  );
};

const E02: React.FC<EscenaProps> = ({t}) => {
  const corte = t('siete') - 0.3;
  return (
    <>
      <Ventana de={0} a={corte}>
        <Cortinilla tema={tema} titulo="Horas extra en Excel" />
      </Ventana>
      <Ventana de={corte}>
        <AbsoluteFill style={{alignItems: 'center', paddingTop: 110, gap: 70}}>
          <TituloContorno
            tema={tema}
            lineas={[
              {texto: 'Tu hoja de', color: 'white', tamano: 100},
              {texto: 'CONTROL DE HORAS', color: tema.colores.acento, tamano: 170},
              {texto: 'en 7 minutos', color: tema.colores.acento4, tamano: 110},
            ]}
          />
          <Tarjeta tema={tema} icono="⚠️" titulo="El error de los totales" texto="Casi todo el mundo lo comete. Te lo enseño al final." desde={t('error') - corte} ancho={1100} color={tema.colores.rojo} />
        </AbsoluteFill>
      </Ventana>
    </>
  );
};

const E03: React.FC<EscenaProps> = ({t}) => {
  const col = t('colombia') - 0.3;
  const mex = t('mexico') - 0.2;
  const apo = t('cuando') - 0.2;
  const ext = t('aprendes') - 0.6;
  const hoja = t('eso') - 0.7;
  const Centro: React.FC<{children: React.ReactNode}> = ({children}) => (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>{children}</AbsoluteFill>
  );
  return (
    <>
      <Ventana de={0} a={col}>
        <Centro>
          <TituloContorno tema={tema} lineas={[{texto: '¿Por qué', color: 'white', tamano: 130}, {texto: 'JUSTO AHORA?', color: tema.colores.acento, tamano: 210}]} />
        </Centro>
      </Ventana>
      <Ventana de={col} a={mex}>
        <Centro>
          <Tarjeta tema={tema} icono="🇨🇴" titulo="Colombia" texto="42 horas semanales desde el 15 de julio de 2026. El recargo nocturno empieza a las 7:00 p. m." fuente="Ley 2101 de 2021 · Ley 2466 de 2025" />
        </Centro>
      </Ventana>
      <Ventana de={mex} a={apo}>
        <Centro>
          <Tarjeta tema={tema} icono="🇲🇽" titulo="México" texto="De 48 a 40 horas semanales, poco a poco, entre 2027 y 2030." fuente="Reforma al artículo 123 constitucional (DOF, 2026)" color={tema.colores.acento2} />
        </Centro>
      </Ventana>
      <Ventana de={apo} a={ext}>
        <Centro>
          <Tarjeta
            tema={tema}
            icono="🏫"
            titulo="Desde el aula"
            texto="«El problema nunca fue registrar la hora: fue calcularla bien cuando alguien salía después de medianoche.»"
            fuente="Edwin Ortiz · creó el sistema de control de entradas y salidas de su colegio"
            color={tema.colores.acento3}
          />
        </Centro>
      </Ventana>
      <Ventana de={ext} a={hoja}>
        <Centro>
          <TituloContorno tema={tema} lineas={[{texto: 'Si no lo aprendes ahora,', color: 'white', tamano: 110}, {texto: 'TE EXTINGUES', color: tema.colores.acento, tamano: 240}]} rotacion={-4} />
        </Centro>
      </Ventana>
      <Ventana de={hoja}>
        <HojaExcel
          tema={tema}
          {...BASE}
          celdas={[...encabezados(), ...datos(), ...config(0)]}
          seleccion={[{celda: 'H2', desde: 0.6}]}
          zoom={[{a: 'H2', desde: 0.5, escala: 2.2}]}
          globos={[{a: 'H2', texto: 'La jornada va aquí', desde: t('celda') - hoja, lado: 'abajo'}]}
        />
      </Ventana>
    </>
  );
};

const E04: React.FC<EscenaProps> = ({t}) => {
  const b2 = t('siete');
  return (
    <>
      <HojaExcel
        tema={tema}
        {...BASE}
        celdas={[
          {ref: 'A1', valor: 'Día', desde: t('dia'), ...ENC},
          {ref: 'B1', valor: 'Entrada', desde: t('entrada'), ...ENC},
          {ref: 'C1', valor: 'Salida', desde: t('salida'), ...ENC},
          {ref: 'D1', valor: 'Horas', desde: t('horas'), ...ENC},
          {ref: 'E1', valor: 'Horas extra', desde: t('extra'), ...ENC},
          ...datos((i) => t('cada') + i * 0.25, ['B2']),
          {ref: 'B2', valor: '7:00', desde: b2},
        ]}
        escritura={[{celda: 'B2', texto: '7:00', desde: b2, duracion: 2.6, enter: b2 + 3}]}
        seleccion={[{celda: 'B2', desde: t('ojo')}]}
        zoom={[
          {a: 'B2', desde: t('ojo'), escala: 2},
          {a: 'B3', desde: t('si'), escala: 1.8},
        ]}
        globos={[
          {a: 'B2', texto: 'Usa dos puntos ( : )', desde: t('dos'), hasta: t('si') - 0.2},
          {a: 'B3', texto: '7.30 ✗ no es una hora', desde: t('treinta'), color: '#FFC7CE'},
        ]}
      />
      <EtiquetaPaso tema={tema} n={1} texto="Prepara la tabla" desde={0.2} />
    </>
  );
};

const E05: React.FC<EscenaProps> = ({t}) => {
  const ini = t('igual');
  const abajo = t('abajo');
  return (
    <>
      <HojaExcel
        tema={tema}
        {...BASE}
        celdas={[
          ...encabezados(),
          ...datos(),
          {ref: 'D2', valor: '10:30'},
          ...horas((i) => abajo + i * 0.2, 'error').filter((c) => c.ref !== 'D2'),
        ]}
        seleccion={[{celda: 'D2', desde: t('celda')}]}
        escritura={[{celda: 'D2', texto: '=C2-B2', desde: ini, duracion: t('dos', 3) + 0.2 - ini, enter: t('enter')}]}
        resaltes={[
          {rango: 'C2', desde: t('c'), hasta: t('enter'), color: '#E5197F'},
          {rango: 'B2', desde: t('b'), hasta: t('enter'), color: '#1F6FEB'},
          {rango: 'D2:D7', desde: t('arrastra'), hasta: t('momento'), color: '#1E9E4A'},
        ]}
        zoom={[
          {a: 'D2', desde: t('celda'), escala: 1.8},
          {a: 'D2', desde: t('arrastra'), escala: 1},
          {a: 'D7', desde: t('momento'), escala: 2},
        ]}
        cursor={[
          {a: 'D2', desde: t('arrastra')},
          {a: 'D7', desde: abajo + 1, clic: false},
        ]}
        globos={[{a: 'D7', texto: '¿Y esto? 🤔', desde: t('sabado'), color: '#FFC7CE'}]}
      />
      <EtiquetaPaso tema={tema} n={2} texto="Salida − entrada" desde={0.2} />
    </>
  );
};

const E06: React.FC<EscenaProps> = ({t}) => {
  const de = t('solucion') - 0.3;
  const r = (x: number) => x - de;
  return (
    <>
      <Ventana de={0} a={de}>
        <LineaTurno tema={tema} desde={0.2} restaDesde={t('seis', 2)} />
      </Ventana>
      <Ventana de={de}>
        <HojaExcel
          tema={tema}
          {...BASE}
          celdas={[
            ...encabezados(),
            ...datos(),
            ...horas(0, 'error').map((c) => (c.ref === 'D7' ? {...c, hasta: r(t('listo')) + 0.3} : c)),
            {ref: 'D7', valor: '8:00', desde: r(t('listo')) + 0.3, ...VERDE_OK},
          ]}
          seleccion={[{celda: 'D2', desde: 0.3}]}
          escritura={[{celda: 'D2', texto: '=RESIDUO(C2-B2;1)', desde: r(t('igual')), duracion: r(t('cierra')) + 0.3 - r(t('igual')), enter: r(t('listo'))}]}
          resaltes={[{rango: 'D2:D7', desde: r(t('mejor')), color: '#1E9E4A'}]}
          zoom={[
            {a: 'D2', desde: r(t('escribe')), escala: 1.7},
            {a: 'D7', desde: r(t('listo')), escala: 1.9},
            {a: 'D7', desde: r(t('mejor')), escala: 1},
          ]}
          globos={[
            {a: 'D7', texto: '8:00 ✔', desde: r(t('ocho')), hasta: r(t('mejor')), color: '#DFF7E7'},
            {a: 'D2', texto: 'Sirve de día y de noche', desde: r(t('dia')), color: '#DFF7E7'},
          ]}
        />
        <EtiquetaPaso tema={tema} n={3} texto="Turnos de noche: RESIDUO" desde={0.2} />
      </Ventana>
    </>
  );
};

const E07: React.FC<EscenaProps> = ({t}) => {
  const ini = t('igual');
  const f4 = t('f4');
  const abajo = t('arrastra');
  return (
    <>
      <HojaExcel
        tema={tema}
        {...BASE}
        celdas={[
          ...encabezados(),
          ...datos(),
          ...horas(),
          {ref: 'G2', valor: 'Jornada', desde: t('jornada'), negrita: true},
          {ref: 'H2', valor: '8:00', desde: t('ocho')},
          {ref: 'E2', valor: '2:30'},
          ...extra((i) => abajo + 0.3 + i * 0.2).filter((c) => c.ref !== 'E2'),
        ]}
        seleccion={[
          {celda: 'H2', desde: t('jornada')},
          {celda: 'E2', desde: t('ahora')},
        ]}
        escritura={[
          {celda: 'E2', texto: '=MAX(0;D2-H2', desde: ini, duracion: t('dos', 2) + 0.3 - ini, enter: abajo},
          {celda: 'E2', texto: '=MAX(0;D2-$H$2)', desde: f4, duracion: 0.35, enter: abajo},
        ]}
        resaltes={[
          {rango: 'D2', desde: t('d'), hasta: abajo, color: '#1F6FEB'},
          {rango: 'H2', desde: t('h'), hasta: abajo, color: '#E5197F'},
        ]}
        zoom={[
          {a: 'H2', desde: t('jornada'), escala: 1.6},
          {a: 'E2', desde: t('ahora'), escala: 1.5},
          {a: 'E2', desde: abajo, escala: 1},
          {a: 'E6', desde: t('viernes'), escala: 2},
        ]}
        globos={[
          {a: 'H2', texto: 'F4 → $H$2 🔒', desde: f4, hasta: t('por'), lado: 'abajo'},
          {a: 'E5', texto: '7:30 < 8:00 → 0, nunca negativo', desde: t('alguien'), hasta: abajo, color: '#DFF7E7'},
          {a: 'E6', texto: '¡4:15 extra!', desde: t('viernes') + 0.4},
        ]}
      />
      <EtiquetaPaso tema={tema} n={4} texto="La jornada en una celda" desde={0.2} />
    </>
  );
};

const E08: React.FC<EscenaProps> = ({t}) => {
  const ini = t('igual');
  const enter = t('siete') + 0.9;
  const bien = t('cincuenta') - 0.6;
  return (
    <>
      <HojaExcel
        tema={tema}
        {...BASE}
        celdas={[
          ...encabezados(),
          ...datos(),
          ...horas(),
          ...extra(),
          {ref: 'A8', valor: 'Total', desde: t('suma'), negrita: true},
          {ref: 'D8', valor: '7:45', color: '#C00000', negrita: true, hasta: bien},
          {ref: 'D8', valor: '55:45', desde: bien, ...VERDE_OK},
          {ref: 'E8', valor: '8:15', desde: bien + 0.4, negrita: true},
        ]}
        seleccion={[{celda: 'D8', desde: t('suma')}]}
        escritura={[{celda: 'D8', texto: '=SUMA(D2:D7)', desde: ini, duracion: t('siete') + 0.3 - ini, enter}]}
        resaltes={[{rango: 'D2:D7', desde: t('d'), hasta: enter, color: '#1F6FEB'}]}
        zoom={[
          {a: 'D8', desde: t('suma'), escala: 1.8},
          {a: 'D8', desde: t('clic') - 0.5, escala: 1},
          {a: 'D8', desde: bien, escala: 2},
        ]}
        cursor={[
          {a: 'D8', desde: t('clic')},
          {a: 'menu:Formato de celdas…', desde: t('formato')},
        ]}
        menu={[{ancla: 'D8', items: ['Cortar', 'Copiar', 'Opciones de pegado', 'Formato de celdas…'], desde: t('derecho'), hasta: t('formato') + 0.6, elegido: 'Formato de celdas…'}]}
        globos={[{a: 'D8', texto: '¿¡Solo 7:45!? 😱', desde: t('siete', 2), hasta: t('pasa'), color: '#FFC7CE'}]}
      />
      <Ventana de={t('pasa')} a={t('solucion') - 0.2}>
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.35)'}}>
          <Tarjeta tema={tema} icono="⏰" titulo="Excel cuenta como un reloj" texto="Al pasar de 24 horas vuelve a cero: 55:45 se ve como 7:45." color={tema.colores.rojo} ancho={1200} />
        </AbsoluteFill>
      </Ventana>
      <DialogoOffice
        titulo="Formato de celdas"
        desde={t('celdas') + 0.3}
        hasta={t('aceptar') + 0.5}
        lista={{items: ['General', 'Número', 'Moneda', 'Fecha', 'Hora', 'Porcentaje', 'Personalizada'], elegido: 'Personalizada', elegidoDesde: t('personalizada')}}
        campo={{etiqueta: 'Tipo:', texto: '[h]:mm', desde: t('hora'), duracion: t('eme', 2) - t('hora')}}
        aceptarEn={t('aceptar')}
      />
      <EtiquetaPaso tema={tema} n={5} texto="Totales con [h]:mm" desde={0.2} />
    </>
  );
};

const E09: React.FC<EscenaProps> = ({t}) => {
  const si = t('si');
  const igual = t('igual');
  const ok = t('cuatrocientos');
  return (
    <>
      <HojaExcel
        tema={tema}
        {...BASE}
        celdas={[
          ...encabezados(),
          ...datos(),
          ...horas(),
          ...extra(),
          ...totales(),
          ...config(0, t('valor'), t('recargo')),
          {ref: 'G6', valor: 'Pago extra', desde: si, negrita: true},
          {ref: 'H6', valor: '13,75', color: '#C00000', hasta: igual},
          {ref: 'H6', valor: '412,50', desde: ok, negrita: true, fondo: '#FFE500'},
        ]}
        seleccion={[
          {celda: 'H3', desde: t('valor')},
          {celda: 'H6', desde: si},
        ]}
        escritura={[
          {celda: 'H6', texto: '=E8*$H$3', desde: t('multiplicas'), duracion: 1.6, enter: t('sale')},
          {celda: 'H6', texto: '=E8*24*$H$3*(1+$H$4)', desde: igual, duracion: t('recargo', 2) + 0.3 - igual, enter: ok},
        ]}
        zoom={[
          {a: 'H3', desde: t('valor'), escala: 1.6},
          {a: 'H6', desde: si, escala: 1.8},
        ]}
        globos={[
          {a: 'H4', texto: 'Según la ley de tu país', desde: t('porcentaje'), hasta: si, lado: 'abajo'},
          {a: 'H6', texto: '¿Solo 13,75? 🤨', desde: t('trece'), hasta: t('porque'), color: '#FFC7CE', lado: 'abajo'},
          {a: 'H6', texto: '¡Correcto!', desde: ok + 0.3, color: '#DFF7E7', lado: 'abajo'},
        ]}
      />
      <Ventana de={t('porque') - 0.2} a={igual - 0.3}>
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.35)'}}>
          <Tarjeta tema={tema} icono="🕐" titulo="1 hora = 1/24 del día" texto="Por eso: horas × 24 = número decimal. 8:15 → 8,25 horas." ancho={1200} />
        </AbsoluteFill>
      </Ventana>
      <EtiquetaPaso tema={tema} n={6} texto="Calcula el pago" desde={0.2} />
    </>
  );
};

const E10: React.FC<EscenaProps> = ({t}) => {
  const pinta = t('ahora');
  const nz = [0, 1, 2, 4];
  return (
    <>
      <HojaExcel
        tema={tema}
        {...BASE}
        celdas={[...encabezados(), ...datos(), ...horas(), ...extra(0, (i) => pinta + 0.2 + nz.indexOf(i) * 0.35), ...totales(), ...config(0, 0, 0), ...pago()]}
        seleccion={[{celda: 'E2', desde: t('selecciona')}]}
        resaltes={[{rango: 'E2:E7', desde: t('selecciona'), hasta: pinta, color: '#1E9E4A'}]}
        pestanaActiva={[{nombre: 'Inicio', desde: t('inicio')}]}
        cursor={[
          {a: 'tab:Inicio', desde: t('inicio')},
          {a: 'btn:Formato condicional', desde: t('formato')},
          {a: 'menu:Reglas para resaltar celdas', desde: t('reglas')},
          {a: 'menu:Mayor que…', desde: t('mayor')},
        ]}
        menu={[
          {ancla: 'btn:Formato condicional', items: ['Reglas para resaltar celdas', 'Reglas superiores e inferiores', 'Barras de datos', 'Escalas de color'], desde: t('formato') + 0.1, hasta: t('mayor') + 0.4, elegido: 'Reglas para resaltar celdas'},
          {ancla: 'menu:Escalas de color', items: ['Mayor que…', 'Menor que…', 'Entre…', 'Es igual a…'], desde: t('reglas') + 0.4, hasta: t('mayor') + 0.4, elegido: 'Mayor que…'},
        ]}
        zoom={[{a: 'E4', desde: pinta, escala: 1.5}]}
        globos={[{a: 'E6', texto: 'Se pinta solo ✨', desde: t('pinta'), color: '#FFC7CE'}]}
      />
      <DialogoOffice
        titulo="Mayor que"
        desde={t('mayor') + 0.5}
        hasta={pinta - 0.1}
        campo={{etiqueta: 'Aplicar formato a las celdas que son MAYORES QUE:', texto: '0', desde: t('cero'), duracion: 0.3}}
        extra={<div style={{fontSize: 24, color: '#444'}}>con <b style={{background: '#FFC7CE', color: '#9C0006', padding: '4px 10px'}}>Relleno rojo claro con texto rojo oscuro</b></div>}
        aceptarEn={t('cero') + 0.5}
      />
      <EtiquetaPaso tema={tema} prefijo="NIVEL" n="PRO" texto="Que Excel te avise" desde={0.2} />
    </>
  );
};

const E11: React.FC<EscenaProps> = ({t}) => (
  <ListaErrores
    tema={tema}
    items={[
      {mal: 'Error en la fórmula', bien: 'Cambia ; por , según tu país', desde: t('si', 1)},
      {mal: 'Salen #####', bien: 'Usa RESIDUO(C2-B2;1)', desde: t('si', 2)},
      {mal: 'El total no cuadra', bien: 'Formato [h]:mm', desde: t('si', 3)},
      {mal: 'El pago sale muy bajo', bien: 'Multiplica por 24', desde: t('si', 4)},
    ]}
  />
);

const E12: React.FC<EscenaProps> = ({t}) => (
  <Resumen3
    tema={tema}
    ideas={[
      {texto: 'RESIDUO para los turnos de noche', desde: t('residuo')},
      {texto: 'Jornada y valor de la hora en su propia celda', desde: t('jornada')},
      {texto: '[h]:mm y × 24 para los totales', desde: t('totales')},
    ]}
  />
);

const E13: React.FC<EscenaProps> = ({t}) => {
  const sig = t('proximo') - 0.3;
  const fin = t('recuerda') - 0.2;
  return (
    <>
      <Ventana de={0} a={sig}>
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 40}}>
          <TituloContorno
            tema={tema}
            lineas={[
              {texto: '¿Te ahorró tiempo?', color: 'white', tamano: 110},
              {texto: 'SUSCRÍBETE', color: tema.colores.acento, tamano: 220},
            ]}
          />
          <Pildora tema={tema} texto="Martes y jueves · 7 a. m." desde={t('martes')} tamano={70} />
        </AbsoluteFill>
      </Ventana>
      <Ventana de={sig} a={fin}>
        <CierreSiguiente tema={tema} siguiente="Fórmulas con IA que SÍ funcionan" desde={0.1} suscribirDesde={2} />
      </Ventana>
      <Ventana de={fin}>
        <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', gap: 50}}>
          <LogoEO tema={tema} tamano={200} />
          <TituloContorno
            tema={tema}
            lineas={[
              {texto: 'El poder de la tecnología', color: 'white', tamano: 100},
              {texto: 'TE VA A CAMBIAR EL MUNDO', color: tema.colores.dorado, tamano: 150},
            ]}
            rotacion={0}
          />
        </AbsoluteFill>
      </Ventana>
    </>
  );
};

export const ESCENAS_HORAS_EXTRA: Record<string, DefEscena> = {
  '01': {fondo: 'naranja', Visual: E01},
  '02': {fondo: 'azul', Visual: E02, sinSubtitulos: false},
  '03': {fondo: 'azul', Visual: E03},
  '04': {fondo: 'claro', Visual: E04},
  '05': {fondo: 'claro', Visual: E05},
  '06': {fondo: 'azul', Visual: E06},
  '07': {fondo: 'claro', Visual: E07},
  '08': {fondo: 'claro', Visual: E08},
  '09': {fondo: 'claro', Visual: E09},
  '10': {fondo: 'claro', Visual: E10},
  '11': {fondo: 'naranja', Visual: E11},
  '12': {fondo: 'azul', Visual: E12},
  '13': {fondo: 'azul', Visual: E13},
};

export const HorasExtraExcel: React.FC = () => (
  <Episodio tema={tema} manifest={manifestHorasExtra} base="edwin-o/horas-extra-excel" escenas={ESCENAS_HORAS_EXTRA} />
);

/* ───────── Shorts (reutilizan el audio de las escenas) ───────── */

const esc = (n: string) => manifestHorasExtra.escenas.find((e) => e.num === n)!;
const tEsc = (n: string) => crearT(esc(n).palabras);

export const SHORTS_HORAS_EXTRA = [
  {
    id: 'short-1',
    escena: esc('06'),
    recorte: 0,
    gancho: [
      {texto: '¿Turno de NOCHE', color: 'white', tamano: 100},
      {texto: 'y sale #####?', color: tema.colores.acento, tamano: 140},
    ],
  },
  {
    id: 'short-2',
    escena: esc('08'),
    recorte: tEsc('08')('suma') - 0.15,
    gancho: [
      {texto: '¿La suma de horas', color: 'white', tamano: 100},
      {texto: 'NO CUADRA?', color: tema.colores.acento, tamano: 160},
    ],
  },
  {
    id: 'short-3',
    escena: esc('09'),
    recorte: tEsc('09')('escribe') - 0.15,
    gancho: [
      {texto: 'Pagar horas extra', color: 'white', tamano: 100},
      {texto: 'en EXCEL', color: tema.colores.acento2, tamano: 160},
      {texto: '(el truco del ×24)', color: tema.colores.acento, tamano: 90},
    ],
  },
];

export const ShortHorasExtra: React.FC<{n: number}> = ({n}) => {
  const sh = SHORTS_HORAS_EXTRA[n];
  return (
    <ShortEscena tema={tema} escena={sh.escena} base="edwin-o/horas-extra-excel" def={ESCENAS_HORAS_EXTRA[sh.escena.num]} gancho={sh.gancho} recorte={sh.recorte} />
  );
};
