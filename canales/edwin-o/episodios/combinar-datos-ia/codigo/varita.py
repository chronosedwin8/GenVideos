import pandas as pd

hojas = pd.read_excel("ventas.xlsx", sheet_name=None)
pedidos = pd.concat([hojas["Ene"], hojas["Feb"]])
pedidos["Cliente"] = pedidos["Cliente"].str.strip()
tabla = pedidos.merge(hojas["Clientes"], left_on="Cliente",
                      right_on="ID", how="left")
print(tabla.groupby("Ciudad", dropna=False)["Monto"].sum())
