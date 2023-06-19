from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
import os
import json
import requests
import uvicorn
import glob
import time

app = FastAPI()


#! Controle dos Arquivos de Pedidos em JSON
class PedidoController:
    def __init__(self, repository_path):
        self.repository_path = repository_path

    def process_json_file(self, json_file):
        with open(json_file, "r") as file:
            json_data = json.load(file)
            print('\nRequisição =', json_data)

        try:
            time.sleep(2)
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
                    print("\n\nProcessando arquivo JSON:", json_file)
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
        self.pedido_controller = PedidoController("Server Python/repository")
        self.pedido_view = PedidoView(self.pedido_controller.repository_path)

    #! Rotas

    def configure_routes(self):

        # Rotas GET
        @self.app.get("/")
        def get():
            return HTMLResponse("<h1>Rayquaza Server está Online!</h1>")

        @self.app.get("/pedidos")
        def visualizar_pedidos():
            pedidos = self.pedido_view.get_all()
            print("\nPedidos Recebido! ", pedidos)
            return pedidos

        # Rotas POST
        @self.app.post("/pedidos")
        def pedidos(pedidos: dict):
            model = PedidoModel(pedidos)
            print('\nNovo Pedido Salvo!')
            return model.process()

        # Rotas PUT

        # Rotas DELETE

        # TODO Parametro de rota do pedido para ser removida
        @self.app.delete("/deletarPedido/{pedido_id}")
        def delete_pedido(pedido_id: int):
            # Lógica para excluir o arquivo JSON correspondente ao pedido
            file_path = f"Server Python/repository/pedido_{pedido_id}.json"

            if os.path.exists(file_path):
                os.remove(file_path)
                return {"message": f"Pedido {pedido_id} excluído com sucesso"}
            else:
                raise HTTPException(
                    status_code=404, detail=f"Pedido {pedido_id} não encontrado")

    #! Funções Servidor Rayquaza

    def run(self):
        self.pedido_controller.check_json_files()
        self.configure_routes()
        time.sleep(2)
        print('\n\nLigando o servidor...')
        uvicorn.run(self.app, host="0.0.0.0", port=5000)


if __name__ == '__main__':
    rayquaza_app = RayquazaApp()
    rayquaza_app.run()
