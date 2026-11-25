# Ficha · Calcular probabilidad binomial al instante (Excel y Python)

- **Canal:** edwin-o · **Tipo:** tutorial (Data Analyst + historia de misterio) · **Temporada:** Data Analyst · **Publicación:** jueves 14 ene 2027, 7:00 a. m.
- **Palabra clave:** probabilidad binomial excel / distr.binom.n / distribución binomial ejemplos / binomial python
- **Programa:** Excel 365 en español (también 2016–2024) y Python 3 (biblioteca estándar `math.comb`).

## Fuentes
- DISTR.BINOM.N (es-es): `DISTR.BINOM.N(núm_éxito;ensayos;prob_éxito;acumulado)`; FALSO = exactamente k, VERDADERO = como máximo k.
  Ejemplo oficial: 6 de 10 con 0,5 → 0,2050781. https://support.microsoft.com/es-es/office/distr-binom-n-funci%C3%B3n-distr-binom-n-c5ae37b6-f39c-4be2-94c2-509a1480770c
- DISTR.BINOM.SERIE: `DISTR.BINOM.SERIE(ensayos;prob_éxito;núm_éxito;[núm_éxito2])` → probabilidad de un rango de éxitos.
  https://support.microsoft.com/es-es/office/distr-binom-serie-funci%C3%B3n-distr-binom-serie-17331329-74c7-4053-bb4c-6653a7421595
- **Caso actual:** Prensa Latina, 11 jul 2026, "El Mundial de los penales fallados": a mitad del Mundial 2026 se habían fallado 21 de 60 penales
  (35 %), contando los del partido y las tandas. https://www.prensa-latina.cu/2026/07/11/el-mundial-de-los-penales-fallados/
  → tasa de acierto en ese momento: 65 %.

## Cálculos (verificados en Excel 365 real por COM y en Python, 25 nov 2026)
| Fórmula | Resultado |
|---|---|
| `=DISTR.BINOM.N(5;5;0,65;FALSO)` | 0,11602906 → 11,6 % (meter los 5 penales) |
| `=DISTR.BINOM.N(5;5;0,75;FALSO)` | 0,23730469 → 23,7 % (con 75 % de acierto) |
| `=DISTR.BINOM.N(3;5;0,65;FALSO)` | 0,33641563 → 33,6 % |
| `=DISTR.BINOM.SERIE(5;0,65;4;5)` | 0,428415 → 42,8 % (al menos 4 de 5) |
| `=DISTR.BINOM.N(SECUENCIA(6;1;0);5;0,65;FALSO)` | 0,0053 · 0,0488 · 0,1811 · 0,3364 · 0,3124 · 0,1160 |
| `=1-DISTR.BINOM.N(4;20;0,05;VERDADERO)` = `=DISTR.BINOM.SERIE(20;0,05;5;20)` | 0,00257394 → 0,26 % (≈ 1 en 389) |
| `=DISTR.BINOM.N(0;20;0,05;FALSO)` / `(1;…)` / `(2;…;VERDADERO)` | 35,8 % / 37,7 % / 92,5 % |
| `=DISTR.BINOM.N(10;10;0,9;FALSO)` | 0,34867844 → 34,9 % |
| `=DISTR.BINOM.SERIE(10;0,9;8;10)` | 0,92980917 → 93,0 % |
| `=COMBINAT(5;3)` | 10 |
| `=DISTR.BINOM.N(5;5;65;FALSO)` | #¡NUM! (probabilidad mayor que 1) |
| `=DISTR.BINOM.N(A1;5;0,65;FALSO)` con texto en A1 | #¡VALOR! |
Python `codigo/binomial.py` (ejecutado): 5 de 5 penales 11.6% · 5 o más defectuosos de 20 0.26% · 10 de 10 fórmulas 34.9%.

## Historia de misterio
"El caso del proveedor sospechoso": el proveedor jura 5 % de defectos; un lote de 20 piezas llega con 5 defectuosas.
¿Mala suerte? P(5 o más) = 0,26 % → casi imposible si el 5 % fuera cierto → hay que reclamar.

## Aporte de Edwin (confirmar)
- Licenciado en Matemáticas y Física: en el aula, la binomial es el tema que más asusta y el que más sirve en el trabajo.

## SEO
Título: **Probabilidad binomial en Excel al instante (DISTR.BINOM.N + Python)**
