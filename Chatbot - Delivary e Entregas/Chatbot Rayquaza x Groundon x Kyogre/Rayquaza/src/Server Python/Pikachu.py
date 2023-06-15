from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
import os
import json
import requests
import uvicorn
import glob

app = FastAPI()


class PedidoController:
    def __init__(self, repository_path):
        self.repository_path = repository_path

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
                    print("Processando arquivo JSON:", json_file)
                    self.process_json_file(json_file)
                except Exception as e:
                    print(f"Erro ao processar o arquivo JSON: {json_file}")
                    print(e)


class PedidoModel:
    def __init__(self, json_data):
        self.json_data = json_data

    def process(self):
        print("Pedidos recebidos:", self.json_data)
        return {"message": "Pedidos recebidos com sucesso"}


class PedidoView:
    def __init__(self, repository_path):
        self.repository_path = repository_path

    def get_all(self):
        json_files = glob.glob(os.path.join(self.repository_path, "*.json"))
        json_data_list = []

        for json_file in json_files:
            with open(json_file, "r") as file:
                json_data = json.load(file)
                json_data_list.append(json_data)

        return json_data_list


class RayquazaApp:
    def __init__(self):
        self.app = FastAPI()
        self.pedido_controller = PedidoController("repository")
        self.pedido_view = PedidoView(self.pedido_controller.repository_path)

    def configure_routes(self):
        @self.app.get("/")
        async def get():
            return HTMLResponse("<h1>Rayquaza Server está Online!</h1>")

        @self.app.post("/pedidos")
        async def pedidos(pedidos: dict):
            model = PedidoModel(pedidos)
            return model.process()

        @self.app.get("/pedidos")
        async def visualizar_pedidos():
            pedidos = self.pedido_view.get_all()
            print("Pedidos:", pedidos)
            return pedidos

    def run(self):
        self.configure_routes()
        self.pedido_controller.check_json_files()
        uvicorn.run(self.app, host="0.0.0.0", port=5000)


# Exemplo de uso da classe RayquazaApp
rayquaza_app = RayquazaApp()
rayquaza_app.run()
