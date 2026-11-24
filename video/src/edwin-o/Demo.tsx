import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {CierreSiguiente, Cortinilla, EtiquetaPaso, Fondo, ListaErrores, Subtitulos, TituloContorno} from '../comun/Basicos';
import {CodigoAnimado, Terminal} from '../comun/Codigo';
import {HojaExcel} from '../comun/HojaExcel';
import {palabrasFalsas} from '../comun/tiempo';
import {temaEdwinO as tema} from './tema';

/** Demo de estilo (sin audio) para revisar la identidad visual del canal. 30 s. */
export const DemoEdwinO: React.FC = () => (
  <Series>
    <Series.Sequence durationInFrames={90}>
      <Fondo tema={tema} variante="naranja" />
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <TituloContorno
          tema={tema}
          lineas={[
            {texto: '¿Sigues calculando', color: 'white', tamano: 110},
            {texto: 'HORAS EXTRA', color: tema.colores.acento, tamano: 220},
            {texto: 'a mano?', color: tema.colores.acento3, tamano: 150},
          ]}
        />
      </AbsoluteFill>
      <Subtitulos tema={tema} palabras={palabrasFalsas('¿Sigues calculando las horas extra a mano? ¡Detente!', 0.2, 170)} />
    </Series.Sequence>
    <Series.Sequence durationInFrames={80}>
      <Cortinilla tema={tema} titulo="Horas extra en Excel" />
    </Series.Sequence>
    <Series.Sequence durationInFrames={330}>
      <Fondo tema={tema} variante="claro" />
      <HojaExcel
        tema={tema}
        archivo="Control de horas.xlsx"
        columnas={6}
        anchos={{A: 260, B: 200, C: 200, D: 230, E: 230}}
        celdas={[
          {ref: 'A1', valor: 'Empleado', negrita: true, fondo: '#E9F3EC'},
          {ref: 'B1', valor: 'Entrada', negrita: true, fondo: '#E9F3EC'},
          {ref: 'C1', valor: 'Salida', negrita: true, fondo: '#E9F3EC'},
          {ref: 'D1', valor: 'Horas', negrita: true, fondo: '#E9F3EC'},
          {ref: 'E1', valor: 'Horas extra', negrita: true, fondo: '#E9F3EC'},
          {ref: 'A2', valor: 'Ana'},
          {ref: 'B2', valor: '7:00'},
          {ref: 'C2', valor: '18:30'},
          {ref: 'A3', valor: 'Luis'},
          {ref: 'B3', valor: '8:00'},
          {ref: 'C3', valor: '17:00'},
          {ref: 'A4', valor: 'Marta'},
          {ref: 'B4', valor: '22:00'},
          {ref: 'C4', valor: '6:00'},
          {ref: 'D2', valor: '11:30'},
          {ref: 'D3', valor: '9:00', desde: 5.2},
          {ref: 'D4', valor: '8:00', desde: 5.4},
          {ref: 'E2', valor: '3:30', desde: 8.2, fondo: '#FFD6D6', fondoDesde: 9.2},
        ]}
        seleccion={[
          {celda: 'D2', desde: 0.8},
          {celda: 'E2', desde: 7},
        ]}
        escritura={[{celda: 'D2', texto: '=RESIDUO(C2-B2;1)', desde: 1.4, duracion: 1.8}]}
        resaltes={[
          {rango: 'C2', desde: 2.3, hasta: 4.2, color: '#E5197F'},
          {rango: 'B2', desde: 2.6, hasta: 4.2, color: '#1F6FEB'},
          {rango: 'D2:D4', desde: 5, hasta: 6.6, color: '#1E9E4A'},
        ]}
        zoom={[
          {a: 'D2', desde: 1, escala: 1.7},
          {a: 'D2', desde: 6.2, escala: 1},
        ]}
        cursor={[
          {a: 'D2', desde: 0.8},
          {a: 'btn:Formato condicional', desde: 8},
          {a: 'menu:Reglas para resaltar celdas', desde: 9},
        ]}
        menu={[{ancla: 'btn:Formato condicional', items: ['Reglas para resaltar celdas', 'Reglas superiores e inferiores', 'Barras de datos', 'Escalas de color'], desde: 8.1, hasta: 10.5, elegido: 'Reglas para resaltar celdas'}]}
        globos={[{a: 'D4', texto: 'Turno nocturno ✔', desde: 5.6, hasta: 7.5}]}
      />
      <EtiquetaPaso tema={tema} n={1} texto="Calcula las horas" desde={0.3} />
      <Subtitulos tema={tema} palabras={palabrasFalsas('Escribe RESIDUO de salida menos entrada, y listo: funciona hasta con turnos nocturnos.', 1.2, 150)} />
    </Series.Sequence>
    <Series.Sequence durationInFrames={210}>
      <Fondo tema={tema} variante="azul" />
      <CodigoAnimado
        tema={tema}
        archivo="horas_extra.py"
        x={110}
        y={110}
        ancho={1100}
        tamano={34}
        codigo={'horas = float(input("Horas trabajadas: "))\nif horas > 8:\n    extra = horas - 8\n    print("Horas extra:", extra)\nelse:\n    print("Sin horas extra")\n'}
        resaltar={[{lineas: [2], desde: 4.4}]}
      />
      <Terminal tema={tema} x={1000} y={620} ancho={800} lineas={[{texto: 'Horas trabajadas: 11.5', desde: 5}, {texto: 'Horas extra: 3.5', desde: 5.6, color: '#FFE500'}]} />
    </Series.Sequence>
    <Series.Sequence durationInFrames={150}>
      <Fondo tema={tema} variante="naranja" />
      <ListaErrores
        tema={tema}
        items={[
          {mal: 'Sale ###### o negativo', bien: 'Usa RESIDUO(salida-entrada;1)', desde: 0.3},
          {mal: 'La suma pasa de 24 y se reinicia', bien: 'Formato personalizado [h]:mm', desde: 1.6},
          {mal: 'Muestra 0,47 en vez de horas', bien: 'Multiplica por 24 para decimales', desde: 2.9},
        ]}
      />
    </Series.Sequence>
    <Series.Sequence durationInFrames={140}>
      <Fondo tema={tema} variante="azul" />
      <CierreSiguiente tema={tema} siguiente="Nómina en Excel" desde={0.2} />
    </Series.Sequence>
  </Series>
);
