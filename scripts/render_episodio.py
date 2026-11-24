"""Renderiza un episodio hecho con el motor de escenas (video 16:9, Shorts 9:16 y miniatura).

Uso:
  python scripts/render_episodio.py <canal> <slug> <id-composición>              # todo
  python scripts/render_episodio.py <canal> <slug> <id> --solo video|shorts|miniatura
  python scripts/render_episodio.py <canal> <slug> <id> --muestras 12.5 40 95    # fotogramas de revisión (segundos)

1. Copia audio/*.mp3 y manifest.json a video/public/<canal>/<slug>/ (Remotion los lee de ahí).
2. Valida las escenas (npm run validar): si una palabra clave no existe en el audio, se detiene.
3. Renderiza en canales/<canal>/episodios/<slug>/render/ y la miniatura en <slug>/miniatura.png.
"""
import argparse
import shutil
import subprocess
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
RAIZ = Path(__file__).resolve().parent.parent
VIDEO = RAIZ / "video"
NPX = "npx.cmd" if sys.platform == "win32" else "npx"
NPM = "npm.cmd" if sys.platform == "win32" else "npm"


def correr(cmd, **kw):
    print("→", " ".join(str(c) for c in cmd), flush=True)
    r = subprocess.run(cmd, cwd=VIDEO, **kw)
    if r.returncode:
        sys.exit(f"Falló: {' '.join(str(c) for c in cmd)}")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("canal")
    ap.add_argument("slug")
    ap.add_argument("id")
    ap.add_argument("--solo", choices=["video", "shorts", "miniatura"])
    ap.add_argument("--muestras", nargs="*", type=float, help="segundos del video largo a exportar como PNG")
    ap.add_argument("--concurrencia", default="50%")
    a = ap.parse_args()

    ep = RAIZ / "canales" / a.canal / "episodios" / a.slug
    audio = ep / "audio"
    if not (audio / "manifest.json").exists():
        sys.exit(f"No existe {audio / 'manifest.json'}: genera la voz primero (scripts/tts_elevenlabs.py).")
    pub = VIDEO / "public" / a.canal / a.slug
    pub.mkdir(parents=True, exist_ok=True)
    for f in list(audio.glob("*.mp3")) + [audio / "manifest.json"]:
        destino = pub / f.name
        if not destino.exists() or destino.stat().st_mtime < f.stat().st_mtime or destino.stat().st_size != f.stat().st_size:
            shutil.copy2(f, destino)

    correr([NPM, "run", "-s", "validar"])
    render = ep / "render"
    render.mkdir(exist_ok=True)

    if a.muestras is not None:
        mu = ep / "muestras"
        mu.mkdir(exist_ok=True)
        for seg in a.muestras:
            correr([NPX, "remotion", "still", a.id, str(mu / f"t{seg:06.1f}.png"), f"--frame={round(seg * 30)}", "--log=error"])
        return

    if a.solo in (None, "video"):
        correr([NPX, "remotion", "render", a.id, str(render / f"{a.slug}.mp4"), f"--concurrency={a.concurrencia}", "--log=error"])
    if a.solo in (None, "shorts"):
        lista = subprocess.run([NPX, "remotion", "compositions", "--quiet"], cwd=VIDEO, capture_output=True, text=True, encoding="utf-8").stdout
        ids = sorted({w for w in lista.split() if w.startswith(a.id + "-short-")})
        for sid in ids:
            correr([NPX, "remotion", "render", sid, str(render / f"{sid[len(a.id) + 1:]}.mp4"), f"--concurrency={a.concurrencia}", "--log=error"])
    if a.solo in (None, "miniatura"):
        correr([NPX, "remotion", "still", f"{a.id}-Miniatura", str(ep / "miniatura.png"), "--log=error"])
    print("✓ Listo:", render)


if __name__ == "__main__":
    main()
