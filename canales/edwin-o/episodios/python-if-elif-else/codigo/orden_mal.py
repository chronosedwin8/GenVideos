ventas = float(input("Ventas del mes: "))

if ventas >= 1000:
    comision = ventas * 0.03
elif ventas >= 5000:
    comision = ventas * 0.05
else:
    comision = 0

print(f"Comisión: {comision:.2f}")
