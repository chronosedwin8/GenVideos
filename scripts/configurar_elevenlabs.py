#!/usr/bin/env python3
"""
Configura y verifica la conexión con ElevenLabs para el estudio de canales.

Lee ELEVENLABS_API_KEY desde .env (nunca la imprime) y:
  - muestra el plan, los créditos usados/disponibles y la fecha de renovación,
  - indica si el plan incluye licencia comercial (el plan gratuito no la incluye),
  - lista las voces disponibles (nombre, ID, categoría, etiquetas),
  - asigna una voz a cada canal escribiendo ELEVENLABS_VOICE_ID_<CANAL> en .env,
  - genera una frase de prueba por canal (gasta ~100 caracteres).

Uso:
  python scripts/configurar_elevenlabs.py                      # verificar cuenta y listar voces
  python scripts/configurar_elevenlabs.py --asignar mi-canal=VOICE_ID
  python scripts/configurar_elevenlabs.py --probar             # audio de prueba por canal en pruebas/
  python scripts/configurar_elevenlabs.py --pedir-clave        # pide la API key oculta y la guarda en .env
"""
import argparse
import datetime as dt
import getpass
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
ENV = RAIZ / ".env"
API = "https://api.elevenlabs.io"

def frase_prueba(canal):
    """Frase de bienvenida con el nombre del canal (primer título de canales/<canal>/canal.md)."""
    nombre = canal.replace("-", " ").title()
    f = RAIZ / "canales" / canal / "canal.md"
    if f.exists():
        m = re.search(r"^#\s*Canal:\s*(.+)$", f.read_text(encoding="utf-8"), re.MULTILINE)
        if m:
            nombre = m.group(1).strip()
    return f"Hola, te doy la bienvenida a {nombre}. Hoy vamos a aprender algo nuevo juntos."


def canales():
    return sorted(d.name for d in (RAIZ / "canales").iterdir() if d.is_dir() and not d.name.startswith(("_", ".")))


def var_voz(canal):
    return "ELEVENLABS_VOICE_ID_" + canal.upper().replace("-", "_")


def asegurar_env():
    if not ENV.exists():
        ejemplo = RAIZ / ".env.example"
        ENV.write_text(ejemplo.read_text(encoding="utf-8") if ejemplo.exists() else "", encoding="utf-8")
        print("Se creó .env a partir de .env.example")


def poner_en_env(clave, valor):
    """Escribe o reemplaza CLAVE=valor en .env sin tocar las demás líneas."""
    asegurar_env()
    texto = ENV.read_text(encoding="utf-8")
    patron = re.compile(rf"^{re.escape(clave)}=.*$", re.MULTILINE)
    linea = f"{clave}={valor}"
    texto = patron.sub(linea, texto) if patron.search(texto) else texto.rstrip("\n") + "\n" + linea + "\n"
    ENV.write_text(texto, encoding="utf-8")


def get(ruta, key):
    r = requests.get(API + ruta, headers={"xi-api-key": key}, timeout=60)
    if r.status_code == 401:
        sys.exit("La API key no es válida o no tiene permisos (401). Revisa la clave y sus permisos en ElevenLabs.")
    if r.status_code != 200:
        sys.exit(f"ElevenLabs respondió {r.status_code} en {ruta}: {r.text[:300]}")
    return r.json()


def mostrar_plan(key):
    s = get("/v1/user/subscription", key)
    tier = str(s.get("tier", "desconocido"))
    usados = s.get("character_count", 0)
    limite = s.get("character_limit", 0)
    reset = s.get("next_character_count_reset_unix")
    reset_txt = dt.datetime.fromtimestamp(reset).strftime("%Y-%m-%d") if reset else "—"
    print("\n== Cuenta ElevenLabs ==")
    print(f"Plan: {tier} · estado: {s.get('status', '—')}")
    print(f"Créditos usados este periodo: {usados:,} de {limite:,} · disponibles: {max(limite - usados, 0):,}")
    print(f"Se renuevan: {reset_txt}")
    if tier.lower() == "free":
        print("⚠ Plan gratuito: SIN licencia comercial. No sirve para canales monetizados.")
    else:
        print("✓ Plan de pago: incluye licencia comercial para el titular de la cuenta "
              "(ver docs/monetizacion.md antes de monetizar con una cuenta institucional).")
    # Estimación de videos con los créditos disponibles
    disp = max(limite - usados, 0)
    print(f"Alcanza aprox. para {disp // 8000} videos de 8–10 min (~8.000 car.) "
          f"o {disp // 3500} de 3–5 min (~3.500 car.).")


def listar_voces(key):
    data = get("/v1/voices", key)
    voces = data.get("voices", [])
    print(f"\n== Voces disponibles ({len(voces)}) ==")
    for v in sorted(voces, key=lambda x: (x.get("category", ""), x.get("name", ""))):
        etiquetas = ", ".join(f"{k}: {val}" for k, val in (v.get("labels") or {}).items())
        print(f"- {v.get('name')} · ID {v.get('voice_id')} · {v.get('category', '')}" + (f" · {etiquetas}" if etiquetas else ""))
    return {v["voice_id"]: v.get("name") for v in voces}


def probar(key):
    load_dotenv(ENV, override=True)
    modelo = os.getenv("ELEVENLABS_MODEL_ID", "eleven_multilingual_v2")
    destino = RAIZ / "pruebas"
    destino.mkdir(exist_ok=True)
    for canal in canales():
        voz = os.getenv(var_voz(canal), "")
        if not voz or "pega_aqui" in voz:
            print(f"  ! {canal}: sin voz asignada ({var_voz(canal)}), se omite")
            continue
        texto = frase_prueba(canal)
        r = requests.post(f"{API}/v1/text-to-speech/{voz}", params={"output_format": "mp3_44100_128"},
                          headers={"xi-api-key": key, "Content-Type": "application/json"},
                          json={"text": texto, "model_id": modelo}, timeout=120)
        if r.status_code != 200:
            print(f"  ✗ {canal}: error {r.status_code} {r.text[:200]}")
            continue
        archivo = destino / f"prueba-{canal}.mp3"
        archivo.write_bytes(r.content)
        print(f"  ✓ {canal}: {archivo.relative_to(RAIZ)} ({len(texto)} caracteres)")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--pedir-clave", action="store_true", help="pedir la API key (oculta) y guardarla en .env")
    ap.add_argument("--asignar", nargs="*", default=[], metavar="CANAL=VOICE_ID")
    ap.add_argument("--probar", action="store_true", help="generar una frase de prueba por canal")
    ap.add_argument("--sin-voces", action="store_true", help="no listar voces")
    args = ap.parse_args()

    asegurar_env()
    if args.pedir_clave:
        clave = getpass.getpass("Pega tu API key de ElevenLabs (no se verá en pantalla): ").strip()
        if not clave:
            sys.exit("No se ingresó ninguna clave.")
        poner_en_env("ELEVENLABS_API_KEY", clave)
        print("API key guardada en .env")

    load_dotenv(ENV, override=True)
    key = os.getenv("ELEVENLABS_API_KEY", "")
    if not key or "pega_aqui" in key:
        sys.exit("Falta la API key. Pégala en .env (ELEVENLABS_API_KEY=...) o ejecuta con --pedir-clave.")

    mostrar_plan(key)
    voces = {} if args.sin_voces and not args.asignar else listar_voces(key)

    for par in args.asignar:
        if "=" not in par:
            sys.exit(f"Formato inválido '{par}'. Usa canal=VOICE_ID")
        canal, voz = par.split("=", 1)
        if canal not in canales():
            sys.exit(f"Canal desconocido '{canal}'. Disponibles: {', '.join(canales())}")
        if voces and voz not in voces:
            sys.exit(f"La voz {voz} no está en tu cuenta.")
        poner_en_env(var_voz(canal), voz)
        print(f"✓ {canal} → {voces.get(voz, voz)} ({var_voz(canal)})")

    load_dotenv(ENV, override=True)
    print("\n== Voces por canal ==")
    for canal in canales():
        v = os.getenv(var_voz(canal), "")
        print(f"- {canal}: {'sin asignar' if not v or 'pega_aqui' in v else voces.get(v, v)}")

    if args.probar:
        print("\n== Prueba de voz ==")
        probar(key)


if __name__ == "__main__":
    main()
