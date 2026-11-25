#!/usr/bin/env python3
"""
Publica en YouTube los videos del estudio de canales con la YouTube Data API v3.

IMPORTANTE: YouTube deja en privado (bloqueado) todo video SUBIDO con videos.insert desde un proyecto de
API no auditado. Por eso hay dos modos:
  · Modo normal (sin auditoría): el creador arrastra el .mp4 a YouTube Studio (queda en borrador/privado) y este
    script le aplica TODO lo demás: título, descripción, etiquetas, categoría, idioma, audiencia,
    contenido sintético, miniatura, subtítulos, playlist y publicación inmediata o programada.
  · Modo auditado: si el proyecto de Google Cloud ya pasó la auditoría de YouTube, YOUTUBE_PROYECTO_AUDITADO=true
    en .env habilita `subir`, que también sube el archivo.

Comandos:
  python scripts/youtube_publicar.py conectar <canal>                 # autoriza el canal (abre el navegador)
  python scripts/youtube_publicar.py estado <canal>                   # canal conectado + últimos videos
  python scripts/youtube_publicar.py publicar <canal> <slug> --ultimo # aplica metadatos al último video subido
  python scripts/youtube_publicar.py publicar <canal> <slug> --video-id ID [--item short-1]
  python scripts/youtube_publicar.py subir <canal> <slug> [--item short-1]   # solo con proyecto auditado
Opciones de publicar/subir:
  --programar "2026-11-25 18:00"   publica en esa fecha (hora local, ver ZONA_HORARIA_UTC en .env) · --privado  deja en privado
  --simular                        muestra lo que haría sin llamar a la API

Lee canales/<canal>/episodios/<slug>/publicacion.json (lo genera /publicar-youtube).
Credenciales: secretos/client_secret.json (OAuth de Google Cloud) y secretos/youtube-<canal>.json (token por canal).
"""
import argparse
import datetime as dt
import json
import os
import sys
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")  # consola de Windows

RAIZ = Path(__file__).resolve().parent.parent
SECRETOS = RAIZ / "secretos"
CLIENTE = SECRETOS / "client_secret.json"
SCOPES = [
    "https://www.googleapis.com/auth/youtube.upload",
    "https://www.googleapis.com/auth/youtube.force-ssl",
]
def _zona():
    """Zona horaria para programar: ZONA_HORARIA_UTC en .env (p. ej. -5 Colombia/Perú, -6 México, 1 España)."""
    valor = None
    env = RAIZ / ".env"
    if env.exists():
        for linea in env.read_text(encoding="utf-8").splitlines():
            if linea.startswith("ZONA_HORARIA_UTC="):
                valor = linea.split("=", 1)[1].strip()
    try:
        return dt.timezone(dt.timedelta(hours=float(valor if valor else -5)))
    except ValueError:
        return dt.timezone(dt.timedelta(hours=-5))


ZONA = _zona()


def dependencias():
    try:
        from google.auth.transport.requests import Request  # noqa: F401
        from google.oauth2.credentials import Credentials  # noqa: F401
        from google_auth_oauthlib.flow import InstalledAppFlow  # noqa: F401
        from googleapiclient.discovery import build  # noqa: F401
        from googleapiclient.http import MediaFileUpload  # noqa: F401
    except ImportError:
        sys.exit("Faltan dependencias: pip install google-api-python-client google-auth-oauthlib python-dotenv")


def token_path(canal):
    return SECRETOS / f"youtube-{canal}.json"


def servicio(canal, nuevo=False):
    from google.auth.transport.requests import Request
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from googleapiclient.discovery import build

    SECRETOS.mkdir(exist_ok=True)
    cred = None
    tp = token_path(canal)
    if tp.exists() and not nuevo:
        cred = Credentials.from_authorized_user_file(str(tp), SCOPES)
    if cred and cred.expired and cred.refresh_token:
        try:
            cred.refresh(Request())
        except Exception:
            cred = None
    if not cred or not cred.valid:
        if nuevo is False and not tp.exists():
            sys.exit(f"El canal '{canal}' no está conectado. Ejecuta: python scripts/youtube_publicar.py conectar {canal}")
        if not CLIENTE.exists():
            sys.exit("Falta secretos/client_secret.json (credencial OAuth de Google Cloud). Ver docs/youtube-conexion.md")
        flow = InstalledAppFlow.from_client_secrets_file(str(CLIENTE), SCOPES)
        print(f"Se abrirá el navegador. Inicia sesión y ELIGE EL CANAL '{canal}' (cuenta de marca si aplica).")
        cred = flow.run_local_server(port=0, prompt="consent")
    tp.write_text(cred.to_json(), encoding="utf-8")
    try:
        os.chmod(tp, 0o600)
    except OSError:
        pass
    return build("youtube", "v3", credentials=cred, cache_discovery=False)


def mi_canal(yt):
    r = yt.channels().list(part="snippet,contentDetails", mine=True).execute()
    if not r.get("items"):
        sys.exit("La cuenta autorizada no tiene canal de YouTube.")
    return r["items"][0]


# ---------- comandos ----------

def cmd_conectar(a):
    yt = servicio(a.canal, nuevo=True)
    c = mi_canal(yt)
    print(f"✓ Conectado: '{c['snippet']['title']}' (ID {c['id']}) → guardado como {a.canal}")
    print("  Si no es el canal correcto, borra secretos/youtube-%s.json y vuelve a conectar." % a.canal)


def cmd_estado(a):
    yt = servicio(a.canal)
    c = mi_canal(yt)
    print(f"Canal: {c['snippet']['title']} (ID {c['id']})")
    uploads = c["contentDetails"]["relatedPlaylists"]["uploads"]
    items = yt.playlistItems().list(part="snippet,status", playlistId=uploads, maxResults=8).execute().get("items", [])
    ids = [i["snippet"]["resourceId"]["videoId"] for i in items]
    if not ids:
        print("Sin videos.")
        return
    vids = yt.videos().list(part="snippet,status", id=",".join(ids)).execute().get("items", [])
    print("Últimos videos:")
    for v in vids:
        print(f"- {v['id']} · {v['status']['privacyStatus']:<8} · {v['snippet']['publishedAt'][:10]} · {v['snippet']['title']}")


def leer_publicacion(canal, slug, item):
    ep = RAIZ / "canales" / canal / "episodios" / slug
    p = ep / "publicacion.json"
    if not p.exists():
        sys.exit(f"No existe {p}. Ejecuta primero /publicar-youtube.")
    data = json.loads(p.read_text(encoding="utf-8"))
    if item:
        sub = next((s for s in data.get("shorts", []) if s.get("id") == item), None)
        if not sub:
            sys.exit(f"No hay un item '{item}' en publicacion.json (shorts).")
        base = {k: v for k, v in data.items() if k not in ("shorts", "titulo", "descripcion", "miniatura", "subtitulos", "archivo")}
        base.update(sub)
        data = base
    return ep, data


def estado_publicacion(a, d):
    if a.privado:
        return {"privacyStatus": "private"}
    cuando = a.programar or d.get("programar")
    if cuando:
        fecha = dt.datetime.strptime(cuando, "%Y-%m-%d %H:%M").replace(tzinfo=ZONA)
        if fecha <= dt.datetime.now(ZONA):
            sys.exit(f"La fecha {cuando} ya pasó.")
        return {"privacyStatus": "private", "publishAt": fecha.astimezone(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")}
    return {"privacyStatus": d.get("privacidad", "public")}


def cuerpo_video(video_id, d, estado):
    tags, total = [], 0
    for t in d.get("tags", []):  # YouTube limita las etiquetas a ~500 caracteres en total
        costo = len(t) + (2 if " " in t else 0) + 1
        if total + costo > 495:
            break
        tags.append(t)
        total += costo
    def sin_angulos(t):  # YouTube rechaza "<" y ">" en título y descripción (invalidDescription)
        return t.replace(" > ", " → ").replace(">", "＞").replace("<", "＜")
    snippet = {
        "title": sin_angulos(d["titulo"])[:100],
        "description": sin_angulos(d.get("descripcion", ""))[:5000],
        "tags": tags,
        "categoryId": str(d.get("categoria", "27")),  # 27 = Educación
        "defaultLanguage": d.get("idioma", "es"),
        "defaultAudioLanguage": d.get("idioma", "es"),
    }
    status = {
        "selfDeclaredMadeForKids": bool(d.get("creado_para_ninos", False)),
        "containsSyntheticMedia": bool(d.get("contenido_sintetico", False)),
        "embeddable": True,
        "license": "youtube",
        **estado,
    }
    cuerpo = {"snippet": snippet, "status": status}
    if video_id:
        cuerpo["id"] = video_id
    return cuerpo


def extras(yt, ep, video_id, d, simular):
    """Miniatura, subtítulos y playlist."""
    from googleapiclient.http import MediaFileUpload
    if d.get("miniatura"):
        m = ep / d["miniatura"]
        if not m.exists():
            print(f"  ! no existe la miniatura {m.name}, se omite")
        elif simular:
            print(f"  [simular] miniatura ← {m.name}")
        else:
            try:
                yt.thumbnails().set(videoId=video_id, media_body=MediaFileUpload(str(m))).execute()
                print(f"  ✓ miniatura {m.name}")
            except Exception as e:
                print(f"  ✗ miniatura: {e}\n    (las miniaturas personalizadas requieren el canal verificado por teléfono)")
    if d.get("subtitulos"):
        s = ep / d["subtitulos"]
        if not s.exists():
            print(f"  ! no existe {s.name}, se omiten subtítulos")
        elif simular:
            print(f"  [simular] subtítulos ← {s.name}")
        else:
            yt.captions().insert(part="snippet", body={"snippet": {
                "videoId": video_id, "language": d.get("idioma", "es"), "name": "Español", "isDraft": False}},
                media_body=MediaFileUpload(str(s), mimetype="application/octet-stream")).execute()
            print("  ✓ subtítulos")
    if d.get("playlist"):
        if simular:
            print(f"  [simular] playlist ← {d['playlist']}")
            return
        pl = buscar_o_crear_playlist(yt, d["playlist"])
        yt.playlistItems().insert(part="snippet", body={"snippet": {
            "playlistId": pl, "resourceId": {"kind": "youtube#video", "videoId": video_id}}}).execute()
        print(f"  ✓ agregado a la playlist '{d['playlist']}'")


def buscar_o_crear_playlist(yt, nombre):
    token = None
    while True:
        r = yt.playlists().list(part="snippet", mine=True, maxResults=50, pageToken=token).execute()
        for p in r.get("items", []):
            if p["snippet"]["title"].strip().lower() == nombre.strip().lower():
                return p["id"]
        token = r.get("nextPageToken")
        if not token:
            break
    p = yt.playlists().insert(part="snippet,status", body={
        "snippet": {"title": nombre, "defaultLanguage": "es"}, "status": {"privacyStatus": "public"}}).execute()
    print(f"  + playlist nueva '{nombre}'")
    return p["id"]


def ultimo_video(yt):
    uploads = mi_canal(yt)["contentDetails"]["relatedPlaylists"]["uploads"]
    items = yt.playlistItems().list(part="snippet", playlistId=uploads, maxResults=1).execute().get("items", [])
    if not items:
        sys.exit("El canal no tiene videos subidos.")
    return items[0]["snippet"]["resourceId"]["videoId"], items[0]["snippet"]["title"]


def resumen(d, estado, video_id):
    print(f"\nVideo: {video_id or '(nuevo)'}")
    print(f"Título: {d['titulo']}")
    print(f"Etiquetas: {len(d.get('tags', []))} · Categoría: {d.get('categoria', '27')} · Idioma: {d.get('idioma', 'es')}")
    print(f"Creado para niños: {'sí' if d.get('creado_para_ninos') else 'no'} · "
          f"Contenido sintético realista: {'sí' if d.get('contenido_sintetico') else 'no'}")
    print("Publicación: " + (f"programada {estado['publishAt']} (UTC)" if "publishAt" in estado else estado["privacyStatus"]))


def cmd_publicar(a):
    ep, d = leer_publicacion(a.canal, a.slug, a.item)
    estado = estado_publicacion(a, d)
    if a.simular:
        resumen(d, estado, a.video_id or ("último subido" if a.ultimo else None))
        extras(None, ep, a.video_id, d, True)
        return
    yt = servicio(a.canal)
    if a.ultimo:
        vid, titulo = ultimo_video(yt)
        print(f"Último video del canal: {vid} · '{titulo}'")
    elif a.video_id:
        vid = a.video_id
    else:
        sys.exit("Indica --video-id ID o --ultimo")
    resumen(d, estado, vid)
    yt.videos().update(part="snippet,status", body=cuerpo_video(vid, d, estado)).execute()
    print("  ✓ metadatos y estado")
    extras(yt, ep, vid, d, False)
    guardar_registro(ep, a, vid, estado)
    print(f"\nListo: https://youtu.be/{vid}")


def cmd_subir(a):
    from googleapiclient.http import MediaFileUpload
    from dotenv import load_dotenv
    load_dotenv(RAIZ / ".env")
    if os.getenv("YOUTUBE_PROYECTO_AUDITADO", "false").lower() != "true":
        sys.exit("Tu proyecto de Google Cloud no está marcado como auditado: los videos subidos por API quedarían\n"
                 "bloqueados en privado. Sube el .mp4 en YouTube Studio y usa: publicar <canal> <slug> --ultimo\n"
                 "(Si ya pasaste la auditoría, pon YOUTUBE_PROYECTO_AUDITADO=true en .env)")
    ep, d = leer_publicacion(a.canal, a.slug, a.item)
    archivo = ep / d.get("archivo", "")
    if not d.get("archivo") or not archivo.exists():
        sys.exit(f"No encuentro el archivo de video ({d.get('archivo')}) en {ep}")
    estado = estado_publicacion(a, d)
    resumen(d, estado, None)
    if a.simular:
        print(f"  [simular] subir {archivo.name}")
        extras(None, ep, None, d, True)
        return
    yt = servicio(a.canal)
    req = yt.videos().insert(part="snippet,status", body=cuerpo_video(None, d, estado),
                             media_body=MediaFileUpload(str(archivo), chunksize=8 * 1024 * 1024, resumable=True))
    resp = None
    while resp is None:
        prog, resp = req.next_chunk()
        if prog:
            print(f"  subiendo… {int(prog.progress() * 100)}%")
    vid = resp["id"]
    print(f"  ✓ subido {vid}")
    extras(yt, ep, vid, d, False)
    guardar_registro(ep, a, vid, estado)
    print(f"\nListo: https://youtu.be/{vid}")


def guardar_registro(ep, a, vid, estado):
    reg = ep / "publicado.json"
    datos = json.loads(reg.read_text(encoding="utf-8")) if reg.exists() else {}
    datos[a.item or "principal"] = {"video_id": vid, "url": f"https://youtu.be/{vid}",
                                    "fecha": dt.datetime.now(ZONA).isoformat(timespec="minutes"), "estado": estado}
    reg.write_text(json.dumps(datos, ensure_ascii=False, indent=2), encoding="utf-8")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sp = ap.add_subparsers(dest="cmd", required=True)
    for nombre in ("conectar", "estado"):
        p = sp.add_parser(nombre)
        p.add_argument("canal")
    for nombre in ("publicar", "subir"):
        p = sp.add_parser(nombre)
        p.add_argument("canal")
        p.add_argument("slug")
        p.add_argument("--item", help="id de un short dentro de publicacion.json (p. ej. short-1)")
        p.add_argument("--programar", help='"AAAA-MM-DD HH:MM" hora local')
        p.add_argument("--privado", action="store_true")
        p.add_argument("--simular", action="store_true")
        if nombre == "publicar":
            p.add_argument("--video-id")
            p.add_argument("--ultimo", action="store_true")
    a = ap.parse_args()
    if a.canal not in [d.name for d in (RAIZ / "canales").iterdir() if d.is_dir() and not d.name.startswith(("_", "."))]:
        sys.exit(f"Canal desconocido '{a.canal}'.")
    if not getattr(a, "simular", False):
        dependencias()
    {"conectar": cmd_conectar, "estado": cmd_estado, "publicar": cmd_publicar, "subir": cmd_subir}[a.cmd](a)


if __name__ == "__main__":
    main()
