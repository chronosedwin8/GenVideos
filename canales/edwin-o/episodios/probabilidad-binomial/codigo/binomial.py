from math import comb

def binomial(k, n, p):
    return comb(n, k) * p**k * (1 - p)**(n - k)

print(f"5 de 5 penales: {binomial(5, 5, 0.65):.1%}")
al_menos_5 = sum(binomial(k, 20, 0.05) for k in range(5, 21))
print(f"5 o más defectuosos de 20: {al_menos_5:.2%}")
print(f"10 de 10 fórmulas bien: {binomial(10, 10, 0.9):.1%}")
