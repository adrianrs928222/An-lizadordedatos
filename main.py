import os
from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import requests
from utils import calcular_1x2, ambos_marcan, mas_menos_goles
from dotenv import load_dotenv

# Carga variables de entorno
load_dotenv()
API_KEY = os.getenv("API_KEY")
BASE_URL = "https://api.odds-api.io/v4/odds"

app = FastAPI(title="Backend Bet365 Nivel Dios", version="1.0.0")

# Permitir CORS para frontend en cualquier dominio
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/matches")
def get_matches():
    try:
        response = requests.get(BASE_URL, params={
            "sport": "soccer",
            "region": "EU",
            "mkt": "h2h",
            "apiKey": API_KEY
        })
        response.raise_for_status()
        data = response.json()
    except Exception as e:
        return {"error": str(e)}

    matches_list = []

    for partido in data.get("matches", []):
        local = partido["home_team"]
        visitante = partido["away_team"]

        # Parámetros IA (puedes mejorar con estadísticas reales)
        lambda_local = 1.4
        lambda_visitante = 1.1
        p_local, p_empate, p_visitante = calcular_1x2(lambda_local, lambda_visitante)

        cuotas = partido["bookmakers"][0]["markets"][0]["outcomes"]
        matches_list.append({
            "local": local,
            "visitante": visitante,
            "cuota_local": cuotas[0]["price"],
            "cuota_empate": cuotas[1]["price"],
            "cuota_visitante": cuotas[2]["price"],
            "prob_IA_local": p_local,
            "prob_IA_empate": p_empate,
            "prob_IA_visitante": p_visitante,
            "mas_menos": mas_menos_goles(lambda_local+lambda_visitante),
            "ambos_marcan": ambos_marcan(lambda_local, lambda_visitante),
            "mejores_cuotas": {b["title"]: [o["price"] for o in b["markets"][0]["outcomes"]]
                                for b in partido.get("bookmakers", [])}
        })
    return matches_list

# WebSocket opcional para frontend en tiempo real
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        matches = get_matches()
        await websocket.send_json(matches)