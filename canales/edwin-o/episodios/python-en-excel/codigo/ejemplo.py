"""Reproduce localmente lo que hace cada celda =PY del video (en Excel, xl() reemplaza al DataFrame de abajo)."""
import pandas as pd

df = pd.DataFrame([
    ("Ene", "Norte", "Laptop", 2400), ("Ene", "Sur", "Mouse", 70), ("Ene", "Centro", "Monitor", 620),
    ("Ene", "Norte", "Monitor", 310), ("Ene", "Sur", "Laptop", 1200), ("Ene", "Centro", "Mouse", 105),
    ("Feb", "Norte", "Laptop", 3600), ("Feb", "Sur", "Monitor", 930), ("Feb", "Centro", "Laptop", 1200),
    ("Feb", "Norte", "Mouse", 35), ("Feb", "Sur", "Mouse", 140), ("Feb", "Centro", "Monitor", 310),
], columns=["Mes", "Región", "Producto", "Monto"])

print(df.describe())
print(df.groupby("Región")["Monto"].sum())
# En Excel: df.groupby("Región")["Monto"].sum().plot(kind="bar", title="Ventas por región")  → gráfico de barras
