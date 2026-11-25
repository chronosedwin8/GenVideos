
import pandas as pd

# 1. Leer el archivo Excel
archivo = "ventas.xlsx"

ene = pd.read_excel(archivo, sheet_name="Ene")
feb = pd.read_excel(archivo, sheet_name="Feb")
clientes = pd.read_excel(archivo, sheet_name="Clientes")

# 2. Limpiar identificadores de clientes
for df in [ene, feb, clientes]:
    df["Cliente"] = df["Cliente"].astype(str).str.strip()

# 3. Unir los pedidos de ambos meses
pedidos = pd.concat([ene, feb], ignore_index=True)

# 4. Agregar nombre y ciudad del cliente
ventas = pedidos.merge(
    clientes[["ID", "Nombre", "Ciudad"]],
    left_on="Cliente",
    right_on="ID",
    how="left"
)

# Eliminar columna ID duplicada
ventas = ventas.drop(columns=["ID"])

# 5. Mostrar la tabla consolidada
print("\nVENTAS CONSOLIDADAS")
print(ventas.to_string(index=False))

# 6. Identificar clientes no registrados
sin_cliente = ventas[ventas["Nombre"].isna()]

if not sin_cliente.empty:
    print("\nCLIENTES NO ENCONTRADOS:")
    print(sin_cliente[["Pedido", "Cliente", "Monto"]])

# 7. Calcular ventas por ciudad
resumen = (
    ventas.dropna(subset=["Ciudad"])
    .groupby("Ciudad", as_index=False)["Monto"]
    .sum()
    .sort_values("Monto", ascending=False)
)

print("\nTOTAL VENDIDO POR CIUDAD")
print(resumen.to_string(index=False))

# 8. Total general
print("\nTOTAL GENERAL:", ventas["Monto"].sum())
print("TOTAL SIN CIUDAD:", ventas.loc[
    ventas["Ciudad"].isna(), "Monto"
].sum())

