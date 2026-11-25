import pandas as pd

ARCHIVO = "ventas.xlsx"

# Leer las tres hojas
ene = pd.read_excel(ARCHIVO, sheet_name="Ene")
feb = pd.read_excel(ARCHIVO, sheet_name="Feb")
clientes = pd.read_excel(ARCHIVO, sheet_name="Clientes")

# Marcar el mes de origen y juntar los pedidos
ene["Mes"] = "Ene"
feb["Mes"] = "Feb"
pedidos = pd.concat([ene, feb], ignore_index=True)

# Limpiar datos: espacios en los IDs (p. ej. "C-02 ", incluidos espacios duros)
# y montos guardados como texto
pedidos["Cliente"] = (
    pedidos["Cliente"].astype(str).str.replace(" ", " ").str.strip()
)
clientes["ID"] = clientes["ID"].astype(str).str.replace(" ", " ").str.strip()
pedidos["Monto"] = pd.to_numeric(pedidos["Monto"], errors="coerce")

# Agregar Nombre y Ciudad (left join: se conservan los pedidos sin cliente)
tabla = pedidos.merge(
    clientes, left_on="Cliente", right_on="ID", how="left"
).drop(columns="ID")

# Avisar de clientes que no existen en la hoja Clientes
faltantes = tabla.loc[tabla["Nombre"].isna(), "Cliente"].unique()
if len(faltantes):
    print(f"Aviso: clientes sin registro en 'Clientes': {', '.join(faltantes)}\n")

tabla[["Nombre", "Ciudad"]] = tabla[["Nombre", "Ciudad"]].fillna("No encontrado")

print("Pedidos combinados:")
print(tabla.to_string(index=False))

# Total vendido por ciudad
por_ciudad = (
    tabla.groupby("Ciudad", as_index=False)["Monto"]
    .sum()
    .sort_values("Monto", ascending=False)
)
print("\nTotal por ciudad:")
print(por_ciudad.to_string(index=False))
print(f"\nTotal general: {tabla['Monto'].sum():,.0f}")
