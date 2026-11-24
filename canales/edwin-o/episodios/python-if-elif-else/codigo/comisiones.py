ventas = float(input("Ventas del mes: "))

if ventas >= 5000:
    comision = ventas * 0.05
elif ventas >= 1000:
    comision = ventas * 0.03
else:
    comision = 0

print(f"Comisión: {comision:.2f}")
