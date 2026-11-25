#!/usr/bin/env python3
"""
Genera la voz en off de un episodio con ElevenLabs, escena por escena.

Lee canales/<canal>/episodios/<slug>/guion.md, extrae el texto de cada bloque [VOZ] por escena
(## ESCENA NN · Título) y llama al endpoint
POST /v1/text-to-speech/{voice_id}/with-timestamps

Salida en canales/<canal>/episodios/<slug>/audio/:
  escena-NN.mp3        audio de cada escena
  escena-NN.json       tiempos por palabra (relativos a la escena)
  manifest.json        escenas en orden con duración, inicio global y palabras (para Remotion)
  subtitulos.srt       subtítulos del episodio completo

Uso:
  python scripts/tts_elevenlabs.py <canal> <slug>              # escenas que falten
  python scripts/tts_elevenlabs.py <canal> <slug> --escena 05  # solo una escena
  python scripts/tts_elevenlabs.py <canal> <slug> --forzar     # regenerar todas
  python scripts/tts_elevenlabs.py <canal> <slug> --simular    # sin gastar créditos

Voz por canal: ELEVENLABS_VOICE_ID_<CANAL> (p. ej. ELEVENLABS_VOICE_ID_MI_CANAL).
Los ajustes ELEVENLABS_STABILITY / _SIMILARITY / _STYLE / _MODEL_ID aceptan el mismo sufijo por canal.
"""
import argparse
import base64
import json
import os
import re
import sys
from pathlib import Path

try:
    import requests
    from dotenv import load_dotenv
except ImportError:
    sys.exit("Falta instalar dependencias: pip install requests python-dotenv")

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")  # consola de Windows

RAIZ = Path(__file__).resolve().parent.parent
API = "https://api.elevenlabs.io/v1/text-to-speech/{voice_id}/with-timestamps"

ESCENA_RE = re.compile(r"^##\s*ESCENA\s+(\d+)\s*[·\-:|]?\s*(.*)$", re.IGNORECASE)
ETIQUETA_RE = re.compile(r"^\[(VOZ|VISUAL|NOTA|PANTALLA|SFX|GRABACION|GRABACIÓN|ZOOM|HOJA|FORMULA|FÓRMULA|CODIGO|CÓDIGO)\]\s*(.*)$", re.IGNORECASE)


def leer_escenas(guion: Path):
    """Devuelve [{'num': '01', 'titulo': ..., 'voz': ...}] a partir del guion."""
    escenas, actual, modo = [], None, None
    for linea in guion.read_text(encoding="utf-8").splitlines():
        m = ESCENA_RE.match(linea.strip())
        if m:
            actual = {"num": m.group(1).zfill(2), "titulo": m.group(2).strip(), "voz": []}
            escenas.append(actual)
            modo = None
            continue
        if actual is None:
            continue
        e = ETIQUETA_RE.match(linea.strip())
        if e:
            modo = e.group(1).upper()
            resto = e.group(2).strip()
            if modo == "VOZ" and resto:
                actual["voz"].append(resto)
            continue
        if linea.strip() in ("---", "***", "___"):  # separador de markdown: cierra la escena
            modo = None
            continue
        if linea.strip().startswith("## "):  # otro encabezado: cierra la escena
            modo = None
            continue
        if linea.strip().startswith("<!--"):  # comentarios del guion (p. ej. <!-- APORTE: confirmar -->): no se narran
            continue
        if modo == "VOZ" and linea.strip():
            actual["voz"].append(re.sub(r"<!--.*?-->", "", linea).strip())
    for esc in escenas:
        esc["voz"] = " ".join(esc["voz"]).strip()
    return [e for e in escenas if e["voz"]]


ETIQUETA_AUDIO_RE = re.compile(r"\[[^\[\]]{1,40}\]")


def es_v3(modelo: str) -> bool:
    return modelo.startswith("eleven_v3")


def sin_etiquetas(texto: str) -> str:
    """Quita las etiquetas de emoción de eleven_v3 ([excited], [laughs]…) para subtítulos y conteos."""
    return re.sub(r"\s{2,}", " ", ETIQUETA_AUDIO_RE.sub(" ", texto)).strip()


def palabras_desde_alineacion(al):
    """Convierte la alineación por caracteres en una lista de palabras con inicio/fin.
    Los caracteres dentro de etiquetas de audio [ … ] (eleven_v3) se tratan como espacio."""
    chars = al.get("characters", [])
    ini = al.get("character_start_times_seconds", [])
    fin = al.get("character_end_times_seconds", [])
    palabras, buf, t0, t1 = [], "", None, None
    en_etiqueta = False
    for c, s, e in zip(chars, ini, fin):
        if c == "[":
            en_etiqueta = True
        if en_etiqueta:
            if c == "]":
                en_etiqueta = False
            c = " "
        if c.isspace():
            if buf:
                palabras.append({"texto": buf, "inicio": round(t0, 3), "fin": round(t1, 3)})
            buf, t0, t1 = "", None, None
            continue
        if not buf:
            t0 = s
        buf += c
        t1 = e
    if buf:
        palabras.append({"texto": buf, "inicio": round(t0, 3), "fin": round(t1, 3)})
    return palabras


def tts(texto, cfg, previo="", siguiente=""):
    url = API.format(voice_id=cfg["voice_id"])
    v3 = es_v3(cfg["model_id"])
    ajustes = {"stability": cfg["stability"], "similarity_boost": cfg["similarity"]}
    if v3:
        # eleven_v3 solo acepta estabilidad 0.0 (creativa), 0.5 (natural) o 1.0 (robusta)
        ajustes["stability"] = min((0.0, 0.5, 1.0), key=lambda x: abs(x - cfg["stability"]))
    else:
        ajustes["style"] = cfg["style"]
        ajustes["use_speaker_boost"] = True
    cuerpo = {"text": texto, "model_id": cfg["model_id"], "voice_settings": ajustes}
    if cfg.get("language_code"):  # p. ej. "es": fija el idioma (la variante la da el acento de la voz)
        cuerpo["language_code"] = cfg["language_code"]
    # Contexto de las escenas vecinas para que la entonación fluya entre escenas (v3 no lo admite:
    # su expresividad se controla con etiquetas como [excited] dentro del texto)
    if previo and not v3:
        cuerpo["previous_text"] = sin_etiquetas(previo)[-500:]
    if siguiente and not v3:
        cuerpo["next_text"] = sin_etiquetas(siguiente)[:500]
    r = requests.post(
        url,
        params={"output_format": cfg["output_format"]},
        headers={"xi-api-key": cfg["api_key"], "Content-Type": "application/json"},
        json=cuerpo,
        timeout=180,
    )
    if r.status_code != 200:
        raise RuntimeError(f"ElevenLabs respondió {r.status_code}: {r.text[:400]}")
    data = r.json()
    audio = base64.b64decode(data["audio_base64"])
    alineacion = data.get("normalized_alignment") or data.get("alignment") or {}
    return audio, alineacion


def srt_tiempo(seg):
    ms = int(round(seg * 1000))
    h, ms = divmod(ms, 3_600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"


def escribir_srt(palabras, destino: Path, max_palabras=7, max_dur=3.0):
    bloques, actual = [], []
    for p in palabras:
        if actual and (len(actual) >= max_palabras or p["fin"] - actual[0]["inicio"] > max_dur):
            bloques.append(actual)
            actual = []
        actual.append(p)
        if p["texto"].endswith((".", "?", "!", ":")):
            bloques.append(actual)
            actual = []
    if actual:
        bloques.append(actual)
    lineas = []
    for i, b in enumerate(bloques, 1):
        lineas += [str(i), f"{srt_tiempo(b[0]['inicio'])} --> {srt_tiempo(b[-1]['fin'])}",
                   " ".join(p["texto"] for p in b), ""]
    destino.write_text("\n".join(lineas), encoding="utf-8")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("canal", help="carpeta del canal dentro de canales/ (p. ej. mi-canal)")
    ap.add_argument("slug", help="carpeta del episodio dentro de canales/<canal>/episodios/")
    ap.add_argument("--escena", help="número de escena a regenerar (p. ej. 05)")
    ap.add_argument("--forzar", action="store_true", help="regenerar todas las escenas")
    ap.add_argument("--simular", action="store_true", help="no llama a la API")
    ap.add_argument("--pausa", type=float, default=0.4, help="silencio entre escenas en segundos (para el manifest)")
    args = ap.parse_args()

    load_dotenv(RAIZ / ".env")
    dir_canal = RAIZ / "canales" / args.canal
    if not dir_canal.exists():
        disponibles = ", ".join(sorted(d.name for d in (RAIZ / "canales").iterdir() if d.is_dir()))
        sys.exit(f"No existe el canal '{args.canal}'. Disponibles: {disponibles}")
    ep = dir_canal / "episodios" / args.slug
    guion = ep / "guion.md"
    if not guion.exists():
        sys.exit(f"No existe {guion}")
    escenas = leer_escenas(guion)
    if not escenas:
        sys.exit("El guion no tiene escenas con bloque [VOZ]. Revisa el formato (## ESCENA 01 · Título / [VOZ]).")

    total_chars = sum(len(e["voz"]) for e in escenas)
    total_pal = sum(len(sin_etiquetas(e["voz"]).split()) for e in escenas)
    ppm = 145
    m = re.search(r"^ritmo_ppm:\s*(\d+)", (dir_canal / "canal.md").read_text(encoding="utf-8"), re.MULTILINE) \
        if (dir_canal / "canal.md").exists() else None
    if m:
        ppm = int(m.group(1))
    print(f"[{args.canal}] {len(escenas)} escenas · {total_pal} palabras · {total_chars} caracteres "
          f"· duración estimada {total_pal / ppm:.1f} min")

    if args.simular:
        for e in escenas:
            print(f"\n[{e['num']}] {e['titulo']} ({len(e['voz'])} car.)\n{e['voz']}")
        return

    sufijo = "_" + args.canal.upper().replace("-", "_")

    def env(nombre, defecto=""):
        """Primero la variable específica del canal, luego la general."""
        return os.getenv(nombre + sufijo) or os.getenv(nombre) or defecto

    cfg = {
        "api_key": os.getenv("ELEVENLABS_API_KEY", ""),
        "voice_id": env("ELEVENLABS_VOICE_ID"),
        "model_id": env("ELEVENLABS_MODEL_ID", "eleven_multilingual_v2"),
        "output_format": env("ELEVENLABS_OUTPUT_FORMAT", "mp3_44100_128"),
        "stability": float(env("ELEVENLABS_STABILITY", "0.5")),
        "similarity": float(env("ELEVENLABS_SIMILARITY", "0.75")),
        "style": float(env("ELEVENLABS_STYLE", "0.0")),
        "language_code": env("ELEVENLABS_LANGUAGE_CODE"),
    }
    if not cfg["api_key"] or not cfg["voice_id"] or "pega_aqui" in cfg["api_key"] + cfg["voice_id"]:
        sys.exit(f"Configura ELEVENLABS_API_KEY y ELEVENLABS_VOICE_ID{sufijo} en .env (ver .env.example)")

    out = ep / "audio"
    out.mkdir(exist_ok=True)
    objetivo = args.escena.zfill(2) if args.escena else None

    for i, e in enumerate(escenas):
        mp3 = out / f"escena-{e['num']}.mp3"
        meta = out / f"escena-{e['num']}.json"
        if objetivo and e["num"] != objetivo:
            continue
        if mp3.exists() and meta.exists() and not (args.forzar or objetivo):
            print(f"  = escena {e['num']} ya existe (usa --escena {e['num']} para regenerarla)")
            continue
        previo = escenas[i - 1]["voz"] if i > 0 else ""
        siguiente = escenas[i + 1]["voz"] if i + 1 < len(escenas) else ""
        print(f"  → generando escena {e['num']} · {e['titulo']} ({len(e['voz'])} car.)")
        audio, al = tts(e["voz"], cfg, previo, siguiente)
        palabras = palabras_desde_alineacion(al)
        dur = palabras[-1]["fin"] if palabras else 0
        mp3.write_bytes(audio)
        meta.write_text(json.dumps({"num": e["num"], "titulo": e["titulo"], "texto": sin_etiquetas(e["voz"]),
                                    "texto_tts": e["voz"], "modelo": cfg["model_id"],
                                    "duracion": dur, "palabras": palabras},
                                   ensure_ascii=False, indent=2), encoding="utf-8")

    # Manifest global para Remotion + SRT
    manifest, todas, t = [], [], 0.0
    for e in escenas:
        meta = out / f"escena-{e['num']}.json"
        if not meta.exists():
            print(f"  ! falta audio de la escena {e['num']}; el manifest queda incompleto")
            continue
        d = json.loads(meta.read_text(encoding="utf-8"))
        manifest.append({"num": d["num"], "titulo": d["titulo"], "audio": f"escena-{d['num']}.mp3",
                         "inicio": round(t, 3), "duracion": d["duracion"], "palabras": d["palabras"]})
        todas += [{**p, "inicio": round(p["inicio"] + t, 3), "fin": round(p["fin"] + t, 3)} for p in d["palabras"]]
        t += d["duracion"] + args.pausa
    (out / "manifest.json").write_text(json.dumps({"canal": args.canal, "slug": args.slug, "duracion_total": round(t, 3),
                                                   "pausa_entre_escenas": args.pausa, "escenas": manifest},
                                                  ensure_ascii=False, indent=2), encoding="utf-8")
    escribir_srt(todas, out / "subtitulos.srt")
    print(f"Listo: {len(manifest)} escenas · {t / 60:.1f} min · {out}")


if __name__ == "__main__":
    main()
