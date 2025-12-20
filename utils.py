import math

def poisson(k, lamb):
    return (lamb**k * math.exp(-lamb)) / math.factorial(k)

def calcular_1x2(lambda_local, lambda_visitante, max_goles=10):
    p_local = 0
    p_empate = 0
    p_visitante = 0
    for i in range(max_goles+1):
        for j in range(max_goles+1):
            p = poisson(i, lambda_local) * poisson(j, lambda_visitante)
            if i > j:
                p_local += p
            elif i == j:
                p_empate += p
            else:
                p_visitante += p
    return round(p_local*100,1), round(p_empate*100,1), round(p_visitante*100,1)

def ambos_marcan(lambda_local, lambda_visitante):
    prob_local = 1 - poisson(0, lambda_local)
    prob_visitante = 1 - poisson(0, lambda_visitante)
    return "Sí" if prob_local * prob_visitante > 0.5 else "No"

def mas_menos_goles(lambda_total, umbral=2.5):
    return "Más de 2,5 goles" if lambda_total > umbral else "Menos de 2,5 goles"