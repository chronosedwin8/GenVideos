"""uso: probar_excel.py formula.txt [celda]  → evalúa la fórmula (sintaxis local en español) en Excel real y muestra el resultado."""
import sys, win32com.client as w
sys.stdout.reconfigure(encoding="utf-8")
formula=open(sys.argv[1],encoding="utf-8").read().strip()
celda=sys.argv[2] if len(sys.argv)>2 else "A2"
ene=[("P-101","C-01",1200),("P-102","C-03",450),("P-103","C-02",980),("P-104","C-05",300),("P-105","C-01",760),("P-106","C-04",1500)]
feb=[("P-201","C-02 ",640),("P-202","C-06",820),("P-203","C-03",1100),("P-204","C-01",390),("P-205","C-05",2100),("P-206","C-04",530)]
cli=[("C-01","Ana Torres","Bogotá"),("C-02","Luis Gómez","Medellín"),("C-03","Sara Ruiz","Cali"),("C-04","Juan Pérez","Bogotá"),("C-05","Marta Díaz","Medellín")]
xl=w.DispatchEx("Excel.Application"); xl.Visible=False; xl.DisplayAlerts=False
try:
    wb=xl.Workbooks.Add()
    while wb.Sheets.Count<4: wb.Sheets.Add(After=wb.Sheets(wb.Sheets.Count))
    for sh,(nombre,enc,filas) in zip(wb.Sheets,[("Ene",("Pedido","Cliente","Monto"),ene),("Feb",("Pedido","Cliente","Monto"),feb),("Clientes",("ID","Nombre","Ciudad"),cli),("Resumen",None,[])]):
        sh.Name=nombre
        if enc:
            for j,v in enumerate(enc): sh.Cells(1,j+1).Value=v
            for i,f in enumerate(filas):
                for j,v in enumerate(f): sh.Cells(i+2,j+1).Value=v
    r=wb.Sheets("Resumen")
    r.Range(celda).Formula2Local=formula
    xl.Calculate()
    rng=r.Range(celda).SpillingToRange if r.Range(celda).HasSpill else r.Range(celda)
    print("Rango:",rng.Address)
    for fila in rng.Rows:
        print([c.Text for c in fila.Cells])
finally:
    wb.Close(False); xl.Quit()
