from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
import json
import requests
import uvicorn
import glob

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:5000",
    "https://groundon-app.web.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Link(BaseModel):
    link: str


class Rayquaza:
    def __init__(self):
        self.repository_path = "repository"

    def process_json_file(self, json_file):
        with open(json_file, "r") as file:
            json_data = json.load(file)
            print('\nRequisição =', json_data)

        try:
            response = requests.post(
                "http://localhost:5000/pedidos", json=json_data)

            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code, detail=response.text)

            return 'Post de Pedidos concluído!'

        except Exception as e:
            print('Falha ao fazer a solicitação POST:', str(e))

    def check_json_files(self):
        json_files = glob.glob(os.path.join(self.repository_path, "*.json"))

        if json_files:
            for json_file in json_files:
                try:
                    self.process_json_file(json_file)
                except Exception as e:
                    print(f"Erro ao processar o arquivo JSON: {json_file}")
                    print(e)

    def run(self):
        @app.get("/")
        async def get():
            return HTMLResponse("<h1>Rayquaza Server está Online!</h1>")

        @app.post("/receber-link")
        async def receber_link(link: Link):
            print("\n>>> Link recebido:", link.link)
            return {"message": "Link recebido com sucesso"}

        @app.post("/pedidos")
        async def pedidos(pedidos: dict):
            print("\n>>> Pedidos recebidos:", pedidos)
            return {"message": "Pedidos recebidos com sucesso"}

        self.check_json_files()

        @app.get("/pedidos")
        async def visualizar_pedidos():
            json_files = glob.glob("src/Server Python/repository/*.json")
            json_data_list = []

            for json_file in json_files:
                with open(json_file, "r") as file:
                    json_data = json.load(file)
                    json_data_list.append(json_data)

            return json_data_list

        uvicorn.run(app, host="0.0.0.0", port=5000)


rayquaza = Rayquaza()
rayquaza.run()
