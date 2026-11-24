"""Genera publicacion.json y publicacion.md de un episodio a partir de un archivo de datos (datos_publicacion.json).

Los capítulos se calculan con los tiempos reales de audio/manifest.json: en los datos solo se indica
qué escena abre cada capítulo ("05": "Paso 1: …"). Así, si se regenera una escena, basta con volver a ejecutar esto.

Uso:
  python scripts/generar_publicacion.py <canal> <slug>
"""
import json
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
RAIZ = Path(__file__).resolve().parent.parent


def mmss(s: float) -> str:
    s = int(s)
    return f"{s // 60}:{s % 60:02d}"


def main():
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    canal, slug = sys.argv[1:]
    ep = RAIZ / "canales" / canal / "episodios" / slug
    d = json.loads((ep / "datos_publicacion.json").read_text(encoding="utf-8"))
    m = json.loads((ep / "audio" / "manifest.json").read_text(encoding="utf-8"))
    inicio = {e["num"]: e["inicio"] for e in m["escenas"]}
    caps = [(inicio[n] if n != "01" else 0.0, t) for n, t in d["capitulos"].items()]
    caps.sort()
    for (a, _), (b, t) in zip(caps, caps[1:]):
        if b - a < 10:
            sys.exit(f"El capítulo '{t}' empieza a menos de 10 s del anterior (YouTube no lo acepta).")
    capitulos = "\n".join(f"{mmss(t)} {titulo}" for t, titulo in caps)

    partes = [d["intro"]]
    if d.get("aprenderas"):
        partes.append("En este video aprenderás:\n" + "\n".join(f"✅ {x}" for x in d["aprenderas"]))
    if d.get("bloque"):
        partes.append(d["bloque"])
    partes.append("Capítulos\n" + capitulos)
    if d.get("enlaces"):
        partes.append("\n".join(d["enlaces"]))
    if d.get("fuentes"):
        partes.append("Fuentes\n" + "\n".join(d["fuentes"]))
    partes.append("La voz de este video es la voz de Edwin, clonada con inteligencia artificial (ElevenLabs).")
    partes.append(d.get("cierre", "Vamos en busca del poder tecnológico. 🚀") + "\n" + " ".join(d.get("hashtags", [])))
    descripcion = "\n\n".join(partes)
    if len(descripcion) > 5000:
        sys.exit(f"La descripción tiene {len(descripcion)} caracteres (máximo 5000).")

    pub = {
        "titulo": d["titulo"],
        "descripcion": descripcion,
        "tags": d["tags"],
        "categoria": 27,
        "idioma": "es",
        "creado_para_ninos": False,
        "contenido_sintetico": True,
        "privacidad": "public",
        "programar": d["programar"],
        "playlist": d["playlist"],
        "archivo": f"render/{slug}.mp4",
        "miniatura": "miniatura.png",
        "subtitulos": "audio/subtitulos.srt",
        "shorts": [
            {**s, "archivo": f"render/{s['id']}.mp4", "tags": s.get("tags", []) + ["shorts"]} for s in d.get("shorts", [])
        ],
    }
    (ep / "publicacion.json").write_text(json.dumps(pub, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    md = [f"# Publicación · {d['titulo']}", "", "## Título (elegido el 1)"]
    md += [f"{i}. {'**' + t + '**' if i == 1 else t}" for i, t in enumerate([d["titulo"]] + d.get("titulos_alternativos", []), 1)]
    md += ["", "## Programación (UTC-5)", f"- Video: **{d['programar']}**"]
    md += [f"- {s['id']}: {s['programar']} · {s['titulo']}" for s in d.get("shorts", [])]
    md += ["", "## Datos", f"- Playlist: \"{d['playlist']}\" · Categoría 27 (Educación) · Español",
           "- Creado para niños: no. **Contenido alterado o sintético: sí** (voz clonada de Edwin; regla de YouTube para voces sintéticas de personas reales).",
           "- Miniatura: `miniatura.png` · Subtítulos: `audio/subtitulos.srt`",
           f"- Duración: {mmss(m['duracion_total'])}", "", "## Capítulos", capitulos, "",
           "## Antes de publicar", "- [ ] Edwin confirma el aporte personal (escena marcada `APORTE: confirmar` en guion.md).",
           "- [ ] Edwin ve el video completo.", ""]
    (ep / "publicacion.md").write_text("\n".join(md), encoding="utf-8")
    print(f"✓ {slug}: {len(caps)} capítulos · {len(descripcion)} caracteres · {len(pub['shorts'])} shorts")


if __name__ == "__main__":
    main()
