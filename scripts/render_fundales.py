"""Renderiza los videos del proyecto Fundales (Entrenador Docente) en horizontal y vertical.

Uso:
  python scripts/render_fundales.py 01-primer-simulacro                 # 16:9 + 9:16 + portadas
  python scripts/render_fundales.py 01-primer-simulacro --solo h|v|portadas
  python scripts/render_fundales.py 01-primer-simulacro --muestras 3 20 45   # PNG de revisión (segundos), ambos formatos
  python scripts/render_fundales.py todos

Salida: proyectos/fundales/salida/horizontal/<slug>.mp4, salida/vertical/<slug>.mp4,
        salida/miniaturas/<slug>-h.png y <slug>-v.png  ·  muestras en proyectos/fundales/muestras/<slug>/
"""
import argparse
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
RAIZ = Path(__file__).resolve().parent.parent
VIDEO = RAIZ / "video"
PROY = RAIZ / "proyectos" / "fundales"
NPX = "npx.cmd" if sys.platform == "win32" else "npx"
NPM = "npm.cmd" if sys.platform == "win32" else "npm"


def correr(cmd):
    print("→", " ".join(str(c) for c in cmd), flush=True)
    if subprocess.run(cmd, cwd=VIDEO).returncode:
        sys.exit(f"Falló: {' '.join(str(c) for c in cmd)}")


def ids():
    """slug → id de composición, leído de los archivos de datos."""
    res = {}
    for f in (VIDEO / "src" / "fundales" / "videos").glob("v*.ts"):
        t = f.read_text(encoding="utf-8")
        for m in re.finditer(r"id: '([^']+)',\s*slug: '([^']+)'", t):
            res[m.group(2)] = m.group(1)
    return res


def copiar_audio(slug):
    audio = PROY / "videos" / slug / "audio"
    if not (audio / "manifest.json").exists():
        sys.exit(f"Falta la voz de {slug}: python scripts/tts_elevenlabs.py fundales {slug}")
    pub = VIDEO / "public" / "fundales" / slug
    pub.mkdir(parents=True, exist_ok=True)
    for f in list(audio.glob("*.mp3")) + [audio / "manifest.json"]:
        d = pub / f.name
        if not d.exists() or d.stat().st_size != f.stat().st_size or d.stat().st_mtime < f.stat().st_mtime:
            shutil.copy2(f, d)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("slug")
    ap.add_argument("--solo", choices=["h", "v", "portadas"])
    ap.add_argument("--muestras", nargs="*", type=float)
    ap.add_argument("--concurrencia", default="50%")
    a = ap.parse_args()
    mapa = ids()
    slugs = sorted(mapa) if a.slug == "todos" else [a.slug]
    for s in slugs:
        if s not in mapa:
            sys.exit(f"No hay datos de video para '{s}'. Disponibles: {', '.join(sorted(mapa))}")
        copiar_audio(s)
    correr([NPM, "run", "-s", "validar"])
    for s in slugs:
        i = mapa[s]
        print(f"=== {s} ({i})", flush=True)
        if a.muestras is not None:
            mu = PROY / "muestras" / s
            mu.mkdir(parents=True, exist_ok=True)
            for seg in a.muestras:
                for f in ("H", "V"):
                    correr([NPX, "remotion", "still", f"{i}-{f}", str(mu / f"{f.lower()}-{seg:05.1f}.png"), f"--frame={round(seg * 30)}", "--log=error"])
            continue
        if a.solo in (None, "h"):
            d = PROY / "salida" / "horizontal"
            d.mkdir(parents=True, exist_ok=True)
            correr([NPX, "remotion", "render", f"{i}-H", str(d / f"{s}.mp4"), f"--concurrency={a.concurrencia}", "--log=error"])
        if a.solo in (None, "v"):
            d = PROY / "salida" / "vertical"
            d.mkdir(parents=True, exist_ok=True)
            correr([NPX, "remotion", "render", f"{i}-V", str(d / f"{s}.mp4"), f"--concurrency={a.concurrencia}", "--log=error"])
        if a.solo in (None, "portadas"):
            d = PROY / "salida" / "miniaturas"
            d.mkdir(parents=True, exist_ok=True)
            correr([NPX, "remotion", "still", f"{i}-Portada-H", str(d / f"{s}-h.png"), "--log=error"])
            correr([NPX, "remotion", "still", f"{i}-Portada-V", str(d / f"{s}-v.png"), "--log=error"])
        print(f"OK {s}", flush=True)


if __name__ == "__main__":
    main()
