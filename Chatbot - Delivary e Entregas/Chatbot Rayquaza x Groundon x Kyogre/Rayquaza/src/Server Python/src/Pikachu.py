from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
import os
import json
import uvicorn
import glob
import time

from repository.pedido_repository import (
    PedidoRepositoryFile,
    PedidoModel,
)


app = FastAPI()


class RayquazaApp:
    def __init__(self):
        self.app = FastAPI()
        self.pedido_repository = PedidoRepositoryFile(
            "/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Delivary e Entregas/Chatbot Rayquaza x Groundon x Kyogre/Rayquaza/src/Server Python/repository")

    def configure_routes(self):

        # Metodos GET
        @self.app.get("/")
        def get():
            return HTMLResponse("<h1>Rayquaza Server está Online!</h1>")

        @self.app.get("/pedidos")
        def visualizar_pedidos():
            pedidos = self.pedido_repository.get_all()
            print("\nPedidos Recebido! ", pedidos)
            return pedidos

        # Metodos POST
        @self.app.post("/pedidos")
        def pedidos(pedido: dict):
            self.pedido_repository.save(pedido)
            print('\nNovo Pedido Salvo!')
            model = PedidoModel(pedido)
            return model.process()

        # Metodos DELETE
        @self.app.delete("/deletarPedido/{pedido_id}")
        def delete_pedido(pedido_id: int):

            # TODO -> Interface Flutter vai fazer o delete no servidor

            # TODO -> Caso o delete no flutter for bem sucedida, esperar e apagar o arquivo json da maquina

            self.pedido_repository.delete(pedido_id)
            return {"message": f"Pedido {pedido_id} excluído com sucesso"}

        # Metodos PUT

        @self.app.put("/atualizarPedido/{pedido_id}")
        def atualizar_pedido(pedido_id: int, pedido: dict):

            # TODO -> Atualizar o Status do Pedido (Recebido, preparando, entregue, concluído)
            ...

    def run(self):
        self.configure_routes()
        print('\n\nLigando o servidor...')
        uvicorn.run(self.app, host="0.0.0.0", port=5000)


if __name__ == '__main__':
    rayquaza_app = RayquazaApp()
    rayquaza_app.run()
