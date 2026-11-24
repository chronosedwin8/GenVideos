---
name: investigar-termino
description: Investiga un tema del backlog del canal y crea la ficha del episodio (definición con fuentes, partes, caso actual, errores comunes, SEO). Usar cuando el usuario diga "investiga <tema>", "siguiente tema", "haz el siguiente video" o "/investigar-termino".
---

# Investigar un tema

1. Define el canal y lee `canales/<canal>/canal.md`.
2. Si no hay tema, toma el primero con `estado = pendiente` y prioridad alta en `canales/<canal>/backlog.csv`
   y confírmalo en una línea. Si el tema no está en el backlog, agrégalo.
3. Crea `canales/<canal>/episodios/<slug>/` y copia `plantillas/ficha.md` como `ficha.md` (ajusta `canal` y `tipo`).
4. Investiga en la web según el tipo y las "Reglas de contenido" del canal:
   - **concepto:** 1–2 definiciones de fuentes reconocidas (cita textual solo si se verifica), partes/tipos,
     un caso o ejemplo real de los últimos 12–24 meses con fuente, 3 errores comunes, una analogía.
   - **tutorial:** pasos exactos en la versión actual del programa o herramienta (verificar en documentación oficial),
     errores típicos y su solución.
   - **otros tipos:** lo que pida su `estructura-<tipo>.md`.
   - Cómo lo busca la gente (preguntas y palabras clave en el idioma del canal).
5. Todo dato con enlace en "Fuentes". Marca `investigado` en el backlog y resume en 5 líneas para el usuario.
