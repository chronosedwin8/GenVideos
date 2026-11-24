# Ficha · Condicionales en Python: IF, ELIF y ELSE

- **Canal:** edwin-o · **Tipo:** tutorial · **Temporada:** 5 · Python práctico · **Publicación:** jueves 17 dic 2026, 7:00 a. m.
- **Palabra clave:** if elif else python / condicionales python / python para principiantes
- **Por qué:** el Short "Haz tus programas en Python más inteligentes con IF" es el video más visto del canal (22.756 vistas en 365 días).
- **Código en `codigo/`, ejecutado con Python 3.14.0 el 24 nov 2026.**

## Caso actual (verificado)
- Python 3.14 salió en octubre de 2025; una de sus novedades son **mensajes de error más claros**, por ejemplo
  `SyntaxError: 'elif' block follows an 'else' block` y la sugerencia de palabras clave mal escritas (`Did you mean 'if'?`).
  Fuentes: https://docs.python.org/3/whatsnew/3.14.html · https://blog.python.org/2025/10/python-3140-final-is-here/

## Ejemplo principal (misma regla de comisiones del video "Fórmulas con IA")
`codigo/comisiones.py` — salidas reales: 999 → 0.00 · 1000 → 30.00 · 4999 → 149.97 · 5000 → 250.00 · 7200 → 360.00
`codigo/orden_mal.py` (primero >= 1000): 7200 → **216.00** (debería ser 360.00).

## Errores reales (Python 3.14.0)
- Sin `float()`: `TypeError: '>=' not supported between instances of 'str' and 'int'`
- Sin dos puntos: `SyntaxError: expected ':'`
- Sin sangría: `IndentationError: expected an indented block after 'if' statement on line 2`
- `=` en vez de `==`: `SyntaxError: invalid syntax. Maybe you meant '==' or ':=' instead of '='?`
- elif después de else: `SyntaxError: 'elif' block follows an 'else' block`
- `iff`: `SyntaxError: invalid syntax. Did you mean 'if'?`

## Otros ejemplos (ejecutados)
- `codigo/notas.py`: `if nota >= 60 and asistencia >= 80` → Aprobado; una línea: `estado = "Aprobado" if nota >= 60 else "Reprobado"` → Aprobado.
- Equivalente en Excel: `=SI.CONJUNTO(C2>=5000;C2*5%;C2>=1000;C2*3%;VERDADERO;0)`.

## Aporte de Edwin (confirmar)
- En sus clases de tecnología, el IF es el momento en que los estudiantes sienten que el programa "piensa".

## SEO
Título: **Condicionales en Python: IF, ELIF y ELSE explicado fácil (con ejemplo real)**
