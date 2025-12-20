from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import math
from utils import ambos_marcan, mas_menos_goles

API_KEY = "316eeee13f5de37eba3ad7b3849eab4e"
BASE_URL = "https://api.odds-api.io/v4/odds"

app = FastAPI()

# Permitir CORS para frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/matches")
def get_matches():
    params = {
        "sport": "soccer",
        "region": "EU",
        "mkt": "h2h",  # 1X2
        "apiKey": API_KEY
    }
    response = requests.get(BASE_URL, params=params)
    data = response.json()

    matches_list = []
    for partido in data.get("matches", []):
        local = partido["home_team"]
        visitante = partido["away_team"]

        # Ejemplo λ basado en promedio histórico (puedes reemplazar por tu modelo ML/Poisson)
        lambda_local = 1.4
        lambda_visitante = 1.1

        cuotas = partido["bookmakers"][0]["markets"][0]["outcomes"]
        matches_list.append({
            "local": local,
            "visitante": visitante,
            "cuota_local": cuotas[0]["price"],
            "cuota_empate": cuotas[1]["price"],
            "cuota_visitante": cuotas[2]["price"],
            "mas_menos": mas_menos_goles(lambda_local + lambda_visitante),
            "ambos_marcan": ambos_marcan(lambda_local, lambda_visitante),
            "mejores_cuotas": {b["title"]: [o["price"] for o in b["markets"][0]["outcomes"]] 
                                for b in partido.get("bookmakers", [])}
        })
    return matches_list
