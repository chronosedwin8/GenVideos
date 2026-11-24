---
canal: edwin-o
tipo: tutorial
tema: Calcular horas trabajadas y horas extra en Excel
slug: horas-extra-excel
programa: Excel para Microsoft 365 en español · Windows
duracion_objetivo: 7 min
estado: aprobado   # borrador | aprobado (Edwin, 24 nov 2026)
siguiente_video: BUSCARX en Excel (buscarx-excel)
---

<!--
Formato: ## ESCENA NN · Título · [VOZ] se narra (eleven_v3, etiquetas de emoción entre corchetes en minúscula).
[VISUAL] [PANTALLA] [HOJA] [FORMULA] no se narran. Todo 100 % animado con HojaExcel.
Hoja de ejemplo (verificada en ficha.md): A Día | B Entrada | C Salida | D Horas | E Horas extra · H2 jornada 8:00 · H3 valor hora 40 · H4 recargo 25 %.
-->

## ESCENA 01 · Gancho
[VISUAL] Hoja terminada: la semana se llena sola, el turno nocturno pasa de ##### a 8:00, total 55:45 y pago 412,50 con destello.
[PANTALLA] Horas extra automáticas
[VOZ]
[curious] ¿Todavía calculas las horas extra con calculadora y papel? [excited] Mira esto: escribes la entrada y la salida, y Excel hace todo lo demás. Horas trabajadas, turnos de noche, horas extra y hasta lo que hay que pagar.

## ESCENA 02 · Presentación
[VISUAL] Cortinilla del canal + píldora "Horas extra en Excel"
[VOZ]
[excited] ¡Bienvenidos, amigos del canal! Vamos en busca del poder tecnológico. En siete minutos vas a tener tu propia hoja de control de horas. Y al final te enseño el error que comete casi todo el mundo con los totales.

## ESCENA 03 · El caso
[VISUAL] Tarjeta 1: "Colombia: 42 horas semanales desde el 15 de julio de 2026 · nocturna desde las 7 p. m.". Tarjeta 2: "México: de 48 a 40 horas entre 2027 y 2030". Luego la celda H2 "Jornada" que cambia de 8:00 a 7:00.
[PANTALLA] La jornada cambia. Tu hoja también.
[VOZ]
¿Y por qué esto es tan importante justo ahora? En Colombia la jornada bajó a cuarenta y dos horas semanales en julio de este año. Y en México ya se aprobó bajarla de cuarenta y ocho a cuarenta horas, poco a poco, desde el dos mil veintisiete.
Cuando desarrollé el sistema de control de entradas y salidas del colegio, el problema nunca fue registrar la hora: fue calcularla bien cuando alguien salía después de medianoche.
Las reglas cambian rápido, y como siempre digo: [serious] si no lo aprendes ahora, te extingues. Por eso hoy la jornada no va escondida dentro de la fórmula. Va en una celda que cambias en un segundo.

## ESCENA 04 · Paso 1 · Prepara la tabla
[VISUAL] HojaExcel vacía. Se escriben los encabezados A1:E1 y la semana. Zoom a B2 mientras se escribe 7:00. Globo: "Usa dos puntos ( : )".
[HOJA] Lunes 7:00 17:30 · Martes 8:00 17:00 · Miércoles 7:30 16:00 · Jueves 8:00 15:30 · Viernes 7:00 19:15 · Sábado 22:00 6:00
[PANTALLA] Paso 1: escribe entrada y salida
[VOZ]
Paso uno. Arma cinco columnas: día, entrada, salida, horas y horas extra. Ahora escribe las horas de cada día. Ojo aquí: escribe siete, dos puntos, cero cero. Con dos puntos, no con punto. Si escribes siete punto treinta, Excel cree que es un número cualquiera, no una hora.

## ESCENA 05 · Paso 2 · Resta salida menos entrada
[VISUAL] Selección D2. Se escribe la fórmula; resaltes de colores en C2 y B2; resultado 10:30 con destello. Arrastrar el controlador de relleno hasta D7. D7 (sábado) muestra #####.
[FORMULA] =C2-B2
[PANTALLA] Paso 2: =C2-B2
[VOZ]
Paso dos. En la celda de horas escribe igual, C dos, menos, B dos. Es decir, salida menos entrada. Enter, y aparecen diez horas y media. [excited] ¡Perfecto! Arrastra hacia abajo para los demás días y… [surprised] un momento. ¿Qué pasó con el sábado? Salen puros numerales.

## ESCENA 06 · Paso 3 · El truco del turno nocturno
[VISUAL] Zoom a D7: entrada 22:00, salida 6:00. Línea de tiempo animada: 22:00 → medianoche → 6:00. Se reescribe la fórmula y ##### se convierte en 8:00.
[FORMULA] =RESIDUO(C2-B2;1)
[PANTALLA] Paso 3: RESIDUO para turnos de noche
[VOZ]
Pasa porque el sábado entró a las diez de la noche y salió a las seis de la mañana. Seis menos veintidós da negativo, y Excel no muestra horas negativas. La solución es una función muy simple: RESIDUO. Escribe igual, RESIDUO, abre paréntesis, C dos menos B dos, punto y coma, uno, y cierra. [excited] ¡Listo! Ocho horas exactas. Y lo mejor: funciona también para los turnos de día, así que usa esta fórmula siempre.

## ESCENA 07 · Paso 4 · La jornada en una celda
[VISUAL] Celdas G2:H4 con etiquetas "Jornada", "Valor hora", "Recargo". H2 = 8:00. En E2 se escribe la fórmula; al pulsar F4 aparecen los signos $ con destello. Se arrastra hasta E7: 2:30, 1:00, 0:30, 0:00, 4:15, 0:00.
[FORMULA] =MAX(0;D2-$H$2)
[PANTALLA] Paso 4: =MAX(0;D2-$H$2)
[VOZ]
Paso cuatro, las horas extra. A un lado escribe "Jornada" y, al frente, ocho horas. Ahora, en horas extra, escribe igual, MAX, abre paréntesis, cero, punto y coma, D dos, menos H dos. Antes de cerrar, presiona F4 para fijar la celda de la jornada con signos de dólar. ¿Y por qué MAX con cero? Porque si alguien trabajó menos de ocho horas, no queremos horas extra negativas. Arrastra hacia abajo y [excited] ¡mira! El viernes tiene cuatro horas y cuarto extra.

## ESCENA 08 · Paso 5 · El error de los totales
[VISUAL] Fila 8 "Total". D8 =SUMA(D2:D7) muestra 7:45 (destello rojo y globo "¿¡Solo 7:45!?"). Clic derecho > Formato de celdas > Personalizada > se escribe [h]:mm > Aceptar → 55:45 en verde.
[FORMULA] =SUMA(D2:D7)
[PANTALLA] Paso 5: formato [h]:mm
[VOZ]
Paso cinco, y aquí viene el error que te prometí. Suma la semana con igual, SUMA, de D dos a D siete. [surprised] ¿Siete horas con cuarenta y cinco? ¡Imposible! Lo que pasa es que Excel cuenta las horas como un reloj: al llegar a veinticuatro vuelve a cero. La solución: clic derecho, formato de celdas, personalizada, y escribe hora entre corchetes, dos puntos, eme eme. Aceptar… [excited] ¡y ahora sí! Cincuenta y cinco horas con cuarenta y cinco minutos.

## ESCENA 09 · Paso 6 · Cuánto hay que pagar
[VISUAL] H3 = 40, H4 = 25 %. En E10 se escribe primero =E8*$H$3 → 13,75 (globo "¿Solo 13,75?"). Se corrige con *24 → 412,50 con destello amarillo y signo de moneda.
[FORMULA] =E8*24*$H$3*(1+$H$4)
[PANTALLA] Paso 6: multiplica por 24
[VOZ]
Paso seis: el dinero. Escribe el valor de la hora y el recargo de la hora extra. Ese porcentaje depende de la ley de tu país, por eso también va en su propia celda. Si multiplicas las horas extra por el valor de la hora te sale… [laughs] trece con setenta y cinco. ¡Demasiado poco! ¿Por qué? Porque para Excel una hora es una fracción del día. El truco es multiplicar por veinticuatro. Igual, E ocho, por veinticuatro, por el valor de la hora, por uno más el recargo. ¡Cuatrocientos doce con cincuenta!

## ESCENA 10 · Nivel pro · Que Excel te avise
[VISUAL] Seleccionar E2:E7 > Inicio > Formato condicional > Reglas para resaltar celdas > Mayor que… > 0 > relleno rojo claro. Las celdas con extra se pintan una por una.
[PANTALLA] Nivel pro: resalta las horas extra
[VOZ]
Nivel pro. Selecciona la columna de horas extra, ve a Inicio, formato condicional, reglas para resaltar celdas, mayor que, y escribe cero. Ahora cada día con horas extra se pinta solo. Tu jefe, o tu contador, lo ve en un segundo.

## ESCENA 11 · Si no te funcionó
[VISUAL] ListaErrores: (1) "Error en la fórmula" → "Cambia ; por , según tu país"; (2) "Sale #####" → "Usa RESIDUO(C2-B2;1)"; (3) "El total no cuadra" → "Formato [h]:mm"; (4) "El pago sale muy bajo" → "Multiplica por 24".
[PANTALLA] Si no te funcionó…
[VOZ]
¿No te funcionó? Revisa esto. Si Excel dice que la fórmula tiene un error, cambia el punto y coma por una coma: depende de la configuración de tu país. Si ves numerales, usa RESIDUO. Si el total no cuadra, formato hora entre corchetes. Y si el pago sale demasiado bajo, multiplica por veinticuatro.

## ESCENA 12 · Resumen
[VISUAL] Resumen3: "RESIDUO para turnos de noche" · "La jornada en una celda" · "[h]:mm y ×24".
[VOZ]
En resumen: RESIDUO para los turnos de noche. La jornada y el valor de la hora siempre en su propia celda. Y para los totales, hora entre corchetes y multiplicar por veinticuatro.

## ESCENA 13 · Cierre
[VISUAL] CierreSiguiente: "BUSCARX en Excel" + botón Suscríbete. Enlace a la plantilla en la descripción.
[VOZ]
Si esta hoja te ahorró tiempo, suscríbete: cada martes y jueves te traigo una herramienta nueva para tu trabajo. Y en el próximo video vas a conocer BUSCARX, la función que reemplaza a BUSCARV. Y recuerda: el poder de la tecnología te va a cambiar el mundo. [cheerfully] ¡Nos vemos en el próximo video!

---

## Lista de verificación antes de aprobar
- [x] Aporte del creador (escena 03): propuesta basada en el CV, aprobada por Edwin con el guion.
- [ ] Fórmulas en español con `;` (se menciona la variante con `,`).
- [ ] Datos legales con fuente (ficha.md §4).
- [ ] Siguiente video: BUSCARX (cambiar si se prefiere otro).
