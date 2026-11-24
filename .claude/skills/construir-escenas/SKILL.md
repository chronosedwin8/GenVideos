---
name: construir-escenas
description: Construye el video en Remotion sincronizado con el manifest de audio de ElevenLabs y con la marca del canal; incluye montaje de grabaciones de pantalla para tutoriales. Usar cuando el usuario diga "arma el video", "construye las escenas" o "/construir-escenas".
---

# Construir las escenas en Remotion

Entrada: `canales/<canal>/episodios/<slug>/guion.md` + `audio/manifest.json` (+ `grabaciones/paso-NN.mp4` en tutoriales).

## Primera vez (o primer video de un canal nuevo)
- Si no existe `video/`: `npx create-video@latest video` (blank, TypeScript).
- Componentes comunes en `video/src/comun/`: `EscenaConAudio`, `Subtitulos` (palabra activa resaltada), `TarjetaCita`,
  `Diagrama` (nodos que entran en orden), `Comparacion` (✗/✓), `LineaTiempo`, `ListaPasos`, `Resumen3`, `CierreSiguiente`,
  `PantallaTutorial` (clip sobre fondo de marca, zoom animado, círculo de clic, etiqueta "Paso N"), `Miniatura`.
- Tema del canal en `video/src/<canal>/tema.ts` (colores y fuentes de `canales/<canal>/marca.md`) + su `Cortinilla`
  con el logo de `canales/<canal>/assets/`. Los componentes reciben el tema; nunca colores fijos.

## Componentes ya construidos (`video/src/comun/`)
- `Episodio` + `duracionEpisodio(manifest)`: una `<Sequence>` por escena con audio, fondo, visual y subtítulos.
  Cada escena se define como `{fondo, Visual}` y recibe `t('palabra')` → segundo exacto en que la voz dice esa palabra.
- `Basicos.tsx`: `Fondo` (naranja/azul/claro/oscuro), `TituloContorno`, `Pildora`, `EtiquetaPaso`, `Subtitulos`,
  `Tarjeta`, `ListaErrores` (✗/✓), `Resumen3`, `NumeroGigante`, `LogoEO`, `Cortinilla`, `CierreSiguiente`.
- `HojaExcel.tsx`: Excel 100 % animado — celdas, `escritura` (fórmula que se escribe sola en la celda y en la barra fx),
  `resaltes` de rangos, `seleccion`, `zoom` a celda/botón, `cursor` con clic, `menu` desplegable, `globos`, `pestanaActiva`.
- `Codigo.tsx`: `CodigoAnimado` (Python con resaltado de sintaxis, se escribe solo) y `Terminal`.
- `Miniatura.tsx`: miniatura 1280×720 con el estilo del canal + `MiniHoja` como apoyo visual.
- Demo de referencia: composición `EdwinO-Demo` (`video/src/edwin-o/Demo.tsx`).

## Por video
1. Copia `audio/` (y `grabaciones/`) a `video/public/<canal>/<slug>/`.
2. `video/src/<canal>/episodios/<Slug>.tsx`: una `<Sequence>` por escena del manifest
   (`from = inicio*fps`, `durationInFrames = duracion*fps`) con su `<Audio>`.
3. Visual según [VISUAL]/[PANTALLA]; sincroniza las entradas con `palabras[].inicio`. Un cambio visual cada 4–8 s.
4. Tutoriales: clip `paso-NN.mp4` en la escena NN; si es más largo que la voz, `playbackRate` hasta 2× y recorta;
   si es más corto, congela el último fotograma. Zoom a la zona de `[ZOOM]`.
5. Registra la composición en `Root.tsx`: 1920×1080, 30 fps.
6. Vista previa con `npx remotion studio` para que el usuario revise. Con su aprobación, render:
   `npx remotion render <Id> ../canales/<canal>/episodios/<slug>/render/<slug>.mp4`.
7. Marca `video` en el backlog.
