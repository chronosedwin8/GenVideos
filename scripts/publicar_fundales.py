"""Programa los Reels de Fundales en Facebook y deja listos los textos de TikTok.

Uso:
  python scripts/publicar_fundales.py --simular            # revisa archivos, textos y fechas (no publica)
  python scripts/publicar_fundales.py                      # programa en Facebook todos los que falten
  python scripts/publicar_fundales.py --slug 07-promo-fechas-2027
  python scripts/publicar_fundales.py --tiktok             # solo escribe publicacion/tiktok.md

Lee proyectos/fundales/publicacion/publicaciones.json. Sube salida/vertical/<slug>.mp4 como Reel a la página
«Fundales.com» con scripts/fb_reel_fundales.php (conexión de edwinortizNET). Registra en publicacion/publicado.json.
"""
import argparse
import json
import subprocess
import sys
import tempfile
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
RAIZ = Path(__file__).resolve().parent.parent
PROY = RAIZ / "proyectos" / "fundales"
PUB = PROY / "publicacion"
PHP = r"C:\xampp\php\php.exe"


def texto_fb(d, v):
    return f"{v['facebook']}\n\n{d['aviso']}\n\n{' '.join(v['hashtags'])}"


def escribir_tiktok(d):
    lineas = ["# TikTok · textos listos para subir (video: salida/vertical/<slug>.mp4)", ""]
    for v in d["videos"]:
        lineas += [f"## {v['fecha']} · {v['slug']}", "", f"{v['tiktok']} {' '.join(v['hashtags'])}", ""]
    (PUB / "tiktok.md").write_text("\n".join(lineas), encoding="utf-8")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--slug")
    ap.add_argument("--simular", action="store_true")
    ap.add_argument("--tiktok", action="store_true")
    a = ap.parse_args()
    d = json.loads((PUB / "publicaciones.json").read_text(encoding="utf-8"))
    escribir_tiktok(d)
    if a.tiktok:
        print("Escrito", PUB / "tiktok.md")
        return
    reg_f = PUB / "publicado.json"
    reg = json.loads(reg_f.read_text(encoding="utf-8")) if reg_f.exists() else {}
    for v in d["videos"]:
        if a.slug and v["slug"] != a.slug:
            continue
        if v["slug"] in reg and not a.simular:
            print(f"= {v['slug']}: ya programado ({reg[v['slug']]['video_id']})")
            continue
        mp4 = PROY / "salida" / "vertical" / f"{v['slug']}.mp4"
        if not mp4.exists():
            sys.exit(f"Falta {mp4}: renderízalo primero (scripts/render_fundales.py).")
        texto = texto_fb(d, v)
        if "fundales.com" not in texto:
            sys.exit(f"{v['slug']}: el texto no promociona fundales.com")
        with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False, encoding="utf-8") as t:
            t.write(texto)
        cmd = [PHP, str(RAIZ / "scripts" / "fb_reel_fundales.php"), str(mp4), t.name, "--programar", v["fecha"]] + (["--simular"] if a.simular else [])
        r = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8")
        Path(t.name).unlink(missing_ok=True)
        if r.returncode:
            sys.exit(f"✗ {v['slug']}: {r.stderr.strip()}")
        res = json.loads(r.stdout.strip().splitlines()[-1])
        print(("· " if a.simular else "✓ ") + f"{v['slug']} → {v['fecha']} · {res}")
        if not a.simular:
            reg[v["slug"]] = {**res, "fecha": v["fecha"]}
            reg_f.write_text(json.dumps(reg, ensure_ascii=False, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
