import pandas as pd
from pathlib import Path

ventas = pd.read_excel("ventas.xlsx")
carpeta = Path("reportes")
carpeta.mkdir(exist_ok=True)

for sucursal, datos in ventas.groupby("Sucursal"):
    archivo = carpeta / f"Reporte {sucursal}.xlsx"
    resumen = datos.groupby("Vendedor")["Monto"].sum()
    with pd.ExcelWriter(archivo) as excel:
        datos.to_excel(excel, sheet_name="Ventas", index=False)
        resumen.to_excel(excel, sheet_name="Resumen")
    print(f"Listo: {archivo.name} ({len(datos)} ventas)")
