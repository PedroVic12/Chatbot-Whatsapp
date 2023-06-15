from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
import os
import json
import requests
import uvicorn
import glob

app = FastAPI()


class Rayquaza:
    def __init__(self):
        self.repository_path = "repository"

    def process_json_file(self, json_file):
        # Implemente aqui a lógica para processar os dados do JSON e fazer a solicitação POST
        # Neste exemplo, apenas exibimos os dados do JSON
        with open(json_file, "r") as file:
            json_data = json.load(file)
            print('\nRequisição =', json_data)

        try:
            # Faça a solicitação POST para enviar os dados para a rota /pedidos
            response = requests.post(
                "http://localhost:5000/pedidos", json=json_data)

            if response.status_code != 200:
                raise HTTPException(
                    status_code=response.status_code, detail=response.text)

            return 'Post de Pedidos concluído!'

        except Exception as e:
            print('Falha ao fazer a solicitação POST:', str(e))

    def check_json_files(self):
        # Obtém a lista de todos os arquivos JSON na pasta "repository"
        json_files = glob.glob(os.path.join(self.repository_path, "*.json"))

        if json_files:
            for json_file in json_files:
                try:
                    self.process_json_file(json_file)
                except Exception as e:
                    print(f"Erro ao processar o arquivo JSON: {json_file}")
                    print(e)

    def run(self):
        # Rota para a página inicial
        @app.get("/")
        async def get():
            return HTMLResponse("<h1>Rayquaza Server está Online!</h1>")

        # Rota para receber os pedidos via POST
        @app.post("/pedidos")
        async def pedidos(pedidos: dict):
            # Implemente aqui a lógica para processar os pedidos recebidos
            # Neste exemplo, apenas exibimos os pedidos recebidos
            print("Pedidos recebidos:", pedidos)
            return {"message": "Pedidos recebidos com sucesso"}

        # Chamar a função check_json_files antes de definir a rota GET para visualizar os pedidos
        self.check_json_files()

        @app.get("/pedidos")
        async def visualizar_pedidos():
            # Implemente aqui a lógica para visualizar os dados de todos os arquivos JSON
            json_files = glob.glob("src/Server Python/repository/*.json")
            json_data_list = []

            for json_file in json_files:
                with open(json_file, "r") as file:
                    json_data = json.load(file)
                    json_data_list.append(json_data)

            return json_data_list

        uvicorn.run(app, host="0.0.0.0", port=5000)


# Exemplo de uso da classe Rayquaza
rayquaza = Rayquaza()
rayquaza.run()
