---
canal: edwin-o
tipo: tutorial
termino: Calcular horas trabajadas y horas extra en Excel
slug: horas-extra-excel
temporada: 1 · Excel para la oficina
relacionados: [restar-horas-excel (video antiguo, CPM $8,56), buscarx-excel, fechas-excel]
programa: Excel para Microsoft 365 en español · Windows
---

# Ficha de investigación: Horas trabajadas y horas extra en Excel

## 1. Qué resuelve
Una hoja semanal en la que escribes la hora de entrada y la de salida, y Excel calcula solo:
- las horas trabajadas por día, incluso en turnos nocturnos que pasan la medianoche;
- las horas extra frente a una jornada configurable;
- los totales de la semana, aunque pasen de 24 horas;
- el valor a pagar.

Es el remaster de "Cómo RESTAR HORAS en Excel", el video de mayor CPM del canal ($8,56).

## 2. En palabras simples
Para Excel, una hora es una fracción de día: 12:00 vale 0,5 y 6:00 vale 0,25. Por eso se pueden restar.
Lo que confunde es cómo se muestran los resultados, no el cálculo.

## 3. Pasos (verificados)
1. **Datos**: columnas Día | Entrada | Salida | Horas | Horas extra. Las horas se escriben con dos puntos (7:30), no con punto (7.30).
2. **Horas trabajadas**: `=C2-B2`. En el turno nocturno (22:00 → 6:00) la resta es negativa (−0,6667) y Excel muestra `#####`.
3. **Turno nocturno**: `=RESIDUO(C2-B2;1)`. RESIDUO devuelve el resto con el mismo signo del divisor, así que con divisor 1
   convierte −0,6667 en 0,3333, es decir, 8:00. Funciona igual para turnos diurnos.
4. **Jornada en una celda**: H2 = `8:00`. Horas extra `=MAX(0;D2-$H$2)`. Los signos $ fijan la celda al arrastrar (tecla F4).
5. **Totales**: `=SUMA(D2:D7)`. Con formato `h:mm`, 55:45 aparece como 7:45 porque Excel reinicia cada 24 h.
   La solución es el formato personalizado `[h]:mm` (Microsoft documenta `[h]:mm;@`).
6. **Pago**: las horas son fracción de día, así que hay que multiplicar por 24 para tenerlas en decimal.
   `=E8*24*$H$3*(1+$H$4)`, con H3 = valor de la hora y H4 = recargo de la hora extra (según el país).
7. **Nivel pro**: formato condicional para resaltar en rojo los días con horas extra
   (Inicio > Formato condicional > Reglas para resaltar celdas > Mayor que… > `0`).

Ejemplo comprobado (Python, misma aritmética que Excel):

| Día | Entrada | Salida | Horas | Extra (jornada 8:00) |
|-----|---------|--------|-------|-----------------------|
| Lunes | 7:00 | 17:30 | 10:30 | 2:30 |
| Martes | 8:00 | 17:00 | 9:00 | 1:00 |
| Miércoles | 7:30 | 16:00 | 8:30 | 0:30 |
| Jueves | 8:00 | 15:30 | 7:30 | 0:00 |
| Viernes | 7:00 | 19:15 | 12:15 | 4:15 |
| Sábado | 22:00 | 6:00 | 8:00 | 0:00 |
| **Total** | | | **55:45** (con h:mm se ve 7:45) | **8:15** = 8,25 h |

Pago de ejemplo: 8,25 × 40 × 1,25 = **412,50**.

## 4. Caso real reciente
- **Colombia:** desde el 15 de julio de 2026 la jornada máxima del sector privado es de **42 horas semanales**
  (última etapa de la Ley 2101 de 2021). Desde el 25 de diciembre de 2025 la jornada nocturna empieza a las **7:00 p. m.**
  (Ley 2466 de 2025, reforma laboral).
- **México:** el decreto de reforma al artículo 123 reduce la jornada de 48 a **40 horas** de forma gradual, 2 horas por año
  desde 2027 hasta 2030 (46 h en 2027 y 40 h en 2030). Se publicó en el DOF en marzo de 2026 (las fuentes difieren en la fecha exacta).
- **Lección para la hoja:** la jornada cambia con la ley. Por eso va en una celda (H2) y no escrita dentro de la fórmula:
  cuando cambie, se ajusta un solo valor.

## 5. Aporte del creador (por confirmar con Edwin)
Su CV menciona que desarrolló el sistema de **control de entradas y salidas** del Colegio Alemán de Barranquilla.
Propuesta: contar en una o dos frases qué problema real vio al calcular horas (p. ej., errores con turnos o con el formato)
o una anécdota de sus clases de ofimática con secretarias y auxiliares administrativos.

## 6. Errores comunes
1. `#####` o un resultado negativo en turnos nocturnos → `RESIDUO(salida-entrada;1)`.
2. El total semanal "se reinicia" (7:45 en vez de 55:45) → formato `[h]:mm`.
3. El pago sale demasiado bajo (13,75 en vez de 330) porque las horas son fracción de día → multiplicar por 24.
4. La fórmula da error de sintaxis → separador de argumentos: `;` donde el decimal es la coma (Colombia, España, Chile, Argentina…)
   y `,` donde el decimal es el punto (México, entre otros). Depende de la configuración regional de Windows.
5. Escribir 7.30 en vez de 7:30 → Excel lo toma como número, no como hora.

## 7. Plantilla
Celdas de configuración: H2 jornada diaria, H3 valor de la hora y H4 % de recargo. Cada fila es un día.

## 8. Palabras clave SEO
- Principal: "calcular horas extra en excel".
- Secundarias: "horas trabajadas excel", "restar horas en excel", "sumar horas en excel más de 24",
  "turno nocturno excel fórmula", "planilla de horas extra excel", "control de horas excel".

## Fuentes
- [Microsoft — Sumar o restar tiempo en Excel](https://support.microsoft.com/es-ES/Excel/add-or-subtract-time-in-excel)
- [Microsoft — Función RESIDUO](https://support.microsoft.com/es-es/office/residuo-funci%C3%B3n-residuo-9b6cd169-b6ee-406a-a97b-edf2a9dc24f3)
- [Portafolio — La nueva jornada laboral en Colombia (42 horas, 15 jul 2026)](https://www.portafolio.co/economia/empleo/la-nueva-jornada-laboral-en-colombia-y-sus-implicaciones-499195)
- [Valora Analitik — ABC del recargo nocturno desde las 7 p. m.](https://www.valoraanalitik.com/?p=539966)
- [El Universal — Recargo nocturno a partir de las 7 de la noche (26 dic 2025)](https://www.eluniversal.com.co/colombia/2025/12/26/esto-es-lo-que-debe-saber-del-recargo-nocturno-a-partir-de-las-7-de-la-noche/)
- [Holland & Knight — Mexico Officially Enacts Constitutional Reform to Reduce the Workweek to 40 Hours (mar 2026)](https://www.hklaw.com/en/insights/publications/2026/03/mexico-officially-enacts-constitutional-reform)
- [STPS — Reducción de la jornada laboral a 40 horas: preguntas frecuentes](https://www.gob.mx/stps/documentos/reduccion-de-la-jornada-laboral-a-40-horas-preguntas-frecuentes?state=published)
- [Blog Edwin Ortiz — Restar horas en Excel](https://www.edwinortiz.net/restar-horas-en-excel/)
