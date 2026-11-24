"""Crea ventas.xlsx de ejemplo (datos ficticios) para el video."""
import random
import pandas as pd

random.seed(2026)
sucursales = ["Bogotá", "Medellín", "Cali", "Barranquilla", "CDMX", "Monterrey", "Guadalajara", "Puebla", "Lima", "Arequipa", "Santiago", "Quito"]
vendedores = {s: [f"Vendedor {s[:3].upper()}-{n}" for n in range(1, 5)] for s in sucursales}
productos = {"Laptop": 1200, "Monitor": 310, "Teclado": 60, "Mouse": 35, "Audífonos": 85}
filas = []
for i in range(2400):
    s = random.choice(sucursales)
    p = random.choice(list(productos))
    cant = random.randint(1, 5)
    filas.append({"Fecha": pd.Timestamp("2026-11-01") + pd.Timedelta(days=random.randint(0, 29)), "Sucursal": s,
                  "Vendedor": random.choice(vendedores[s]), "Producto": p, "Cantidad": cant, "Monto": cant * productos[p]})
pd.DataFrame(filas).sort_values("Fecha").to_excel("ventas.xlsx", index=False)
print("ventas.xlsx:", len(filas), "filas")
