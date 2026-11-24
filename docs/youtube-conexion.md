# Conectar YouTube (una sola vez)

El acceso se da con **OAuth de Google**: el creador inicia sesión en su navegador y autoriza. Claude nunca ve ni guarda
la contraseña; solo un token por canal en `secretos/` (excluido de git).

## 1. Crear el proyecto en Google Cloud (10 min)
1. Entra a https://console.cloud.google.com con la cuenta dueña de los canales → **Nuevo proyecto** → "Estudio canales".
2. **APIs y servicios → Biblioteca** → busca **YouTube Data API v3** → **Habilitar**.
3. **APIs y servicios → Pantalla de consentimiento de OAuth** (o "Google Auth Platform"):
   - Tipo de usuario: **Externo**. Nombre de la app: "Estudio canales". Correo de soporte: el tuyo.
   - En **Público / Usuarios de prueba** agrega tu correo.
   - **Estado de publicación: pásalo a "En producción"**. En modo "Prueba" el permiso vence cada 7 días y habría que
     volver a conectar. En producción, al autorizar verás "Google no verificó esta app": es normal para uso propio →
     *Configuración avanzada → Ir a Estudio canales*.
4. **Credenciales → Crear credenciales → ID de cliente de OAuth** → tipo **App de escritorio** → Crear → **Descargar JSON**.
5. Guarda ese archivo como `secretos/client_secret.json` dentro del proyecto.

## 2. Conectar cada canal
En Claude Code: **"Conecta YouTube"** (o en la terminal):
```
python scripts/youtube_publicar.py conectar <canal>
```
Se abre el navegador: inicia sesión y **elige el canal correcto** (si son cuentas de marca, Google te deja escoger).
El script confirma el nombre del canal conectado.

Requisito para miniaturas personalizadas: el canal debe estar verificado por teléfono (YouTube Studio → Configuración → Canal → Elegibilidad de funciones).

## 3. Cómo se publica
YouTube **bloquea en privado** los videos *subidos* por la API desde proyectos no auditados, y no se pueden apelar. Por eso:

| Paso | Quién | Cómo |
|------|-------|------|
| Subir el .mp4 | Tú | Arrastrarlo a YouTube Studio y cerrar la ventana (queda como borrador privado). ~30 s |
| Todo lo demás | Claude | `publicar <canal> <slug> --ultimo`: título, descripción con capítulos, etiquetas, categoría, idioma, "creado para niños", contenido sintético, miniatura, subtítulos, playlist y publicación inmediata o programada |

El costo de cuota por video es bajo (metadatos 50 + miniatura 50 + subtítulos 400 + playlist 50 unidades) frente a las 10.000 diarias.

## 4. (Opcional) Auditoría para que Claude suba también el archivo
Llenar el formulario *YouTube API Services – Audit and Quota Extension Form*
(https://support.google.com/youtube/contact/yt_api_form) explicando el uso: herramienta interna para publicar
contenido propio de tus canales. Si la aprueban, poner `YOUTUBE_PROYECTO_AUDITADO=true` en `.env`
y usar `subir <canal> <slug>`.

## Seguridad
- `secretos/` y `.env` nunca se suben a git ni se comparten.
- Para revocar el acceso: https://myaccount.google.com/permissions → "Estudio canales" → Quitar acceso.
