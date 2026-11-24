nota = 82
asistencia = 90

if nota >= 60 and asistencia >= 80:
    print("Aprobado")
else:
    print("Reprobado")

estado = "Aprobado" if nota >= 60 else "Reprobado"
print(estado)
