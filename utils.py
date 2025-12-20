import math

def ambos_marcan(lambda_local, lambda_visitante, umbral=0.5):
    p_local = 1 - math.exp(-lambda_local)
    p_visitante = 1 - math.exp(-lambda_visitante)
    return "Sí" if (p_local * p_visitante) >= umbral else "No"

def mas_menos_goles(lambda_total, umbral=2.5):
    return "Más de 2,5 goles" if lambda_total > umbral else "Menos de 2,5 goles"