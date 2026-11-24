---
name: construir-escenas
description: Construye el video en Remotion sincronizado con el manifest de audio de ElevenLabs y con la marca del canal; incluye montaje de grabaciones de pantalla para tutoriales. Usar cuando el usuario diga "arma el video", "construye las escenas" o "/construir-escenas".
---

# Construir las escenas en Remotion

Entrada: `canales/<canal>/episodios/<slug>/guion.md` + `audio/manifest.json` (+ `grabaciones/paso-NN.mp4` en tutoriales).

## Forma recomendada: el motor declarativo (desde dic 2026)
Cada episodio es **un archivo de datos**, `video/src/<canal>/episodios/<slug>.ts`, que exporta `episodio: EspecEpisodio`
(tipos en `video/src/comun/motor-tipos.ts`). No se escriben componentes a mano: cada escena es una lista de **bloques**
que aparecen en la palabra exacta en que la voz la dice.

```ts
'07': {
  paso: {n: 1, texto: 'La fórmula básica'},          // etiqueta "PASO 1" arriba a la izquierda (opcional)
  fondo: 'naranja',                                  // naranja | azul | claro | oscuro
  bloques: [
    {en: 0, tipo: 'titulo', lineas: [{texto: 'AGRUPARPOR', color: 'amarillo', tamano: 220}]},
    {en: 'escribe', tipo: 'hoja', hoja: {...}},      // aparece cuando la voz dice "escribe"
    {en: 'listo', capa: true, tipo: 'pildora', texto: '✓ Listo'},  // capa: se superpone sin cortar el bloque anterior
  ],
},
```

**Cues (momentos):** `'palabra'` (primera vez que la dice) · `'palabra#2'` (segunda vez) · `'palabra+0.5'` / `'palabra#2-0.3'`
(desplazamiento en segundos) · `3.2` (segundo exacto). Sin tildes ni signos; coincide primero exacto y luego por prefijo.
Un bloque normal dura hasta que empieza el siguiente bloque normal; `hasta` lo corta antes; `capa: true` se superpone.
Todos los tiempos internos (`desde`, `hasta`, `enter`, `fondoDesde`…) aceptan cues.

**Tipos de bloque** (`Motor.tsx` + `Bloques.tsx`): `titulo` · `tarjeta` · `tarjetas` (2–3) · `lista` · `cuadricula` (hasta 12)
· `numero` (n/total, para listas) · `cifra` (dato grande con conteo y fuente) · `hoja` (HojaExcel completa) · `codigo`
(con `previo` = código ya escrito, `resaltar` líneas y `salida` = terminal al lado) · `terminal` · `chat` (asistente de IA
genérico; `panel: true` = panel lateral tipo Copilot) · `comparar` (A vs B) · `formula` (fórmula grande con partes
explicadas) · `cronologia` · `teclas` · `barras` (gráfico estilo matplotlib) · `cortinilla` · `cierre` · `resumen` ·
`errores` (✗/✓) · `logo` · `pildora`. Texto entre `comillas invertidas` se muestra como código.

**HojaExcel:** `celdas` (con `desde`/`hasta` para reemplazar valores), `escritura` (fórmula que se escribe sola; `enter` =
cuándo aparece el resultado), `resaltes`, `seleccion`, `zoom`, `cursor` ('C5', 'tab:Fórmulas', 'btn:Insertar Python'),
`menu`, `globos` (lado derecha/abajo/izquierda), `botones` y `pestanaActiva` (**cinta**), `hojas` y `hojaActiva`
(**pestañas de hoja abajo**), `filas` (por defecto 14).

## Pasos por video
1. Voz lista (`/generar-voz`). Copia de `audio/` a `video/public/<canal>/<slug>/` (el script de render lo hace solo).
2. Crea `video/src/<canal>/episodios/<slug>.ts` siguiendo el `[VISUAL]` de cada escena; un cambio visual cada 4–8 s.
   Datos, fórmulas y salidas de código **verificados** (Python/pandas o ejecución real) antes de ponerlos en pantalla.
3. Agrégalo a `video/src/<canal>/episodios/index.ts`. Se registran solos en Remotion: `<Id>`, `<Id>-short-N` y `<Id>-Miniatura`.
4. `cd video && npm run validar` → avisa si una palabra clave no existe en el audio o si los bloques están desordenados.
5. Revisión visual: `python scripts/render_episodio.py <canal> <slug> <Id> --muestras 12.5 40 95` (PNG en `muestras/`).
   Revisa solapamientos (etiqueta de paso vs. píldoras, globos vecinos) y que el texto quepa.
6. Render final: `python scripts/render_episodio.py <canal> <slug> <Id>` → `render/<slug>.mp4`, `render/short-N.mp4`
   y `miniatura.png`. (`--solo video|shorts|miniatura` para rehacer una parte.)
7. Marca `video` en el backlog.

## Componentes base (`video/src/comun/`)
- `Episodio` + `duracionEpisodio(manifest)`; `Short.tsx` (`ShortEscena`: 9:16 a partir de una escena, con `recorte`).
- `Basicos.tsx`: `Fondo`, `TituloContorno`, `Pildora`, `EtiquetaPaso`, `Subtitulos`, `Tarjeta`, `ListaErrores`, `Resumen3`,
  `NumeroGigante`, `LogoEO`, `Cortinilla`, `CierreSiguiente`.
- `HojaExcel.tsx`, `Codigo.tsx` (`CodigoAnimado`, `Terminal`), `Bloques.tsx`, `Extras.tsx` (`Ventana`, `DialogoOffice`),
  `Miniatura.tsx` (`Miniatura`, `MiniHoja`) y `MiniCodigo` (en `Bloques.tsx`).
- La fuente de código no usa ligaduras: `>=` se ve como en Excel/Python, no como `≥`.
- Episodio hecho a mano (referencia antigua): `video/src/edwin-o/episodios/HorasExtraExcel.tsx`.

## Tutoriales con grabaciones (si el canal no es 100 % animado)
Clip `paso-NN.mp4` en la escena NN; si es más largo que la voz, `playbackRate` hasta 2× y recorta; si es más corto,
congela el último fotograma.
