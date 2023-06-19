from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
import os
import json
import uvicorn
import glob
import time

from PedidoRepository import PedidoRepository,  PedidoRepositoryFile, PedidoModel


app = FastAPI()


class RayquazaApp:
    def __init__(self):
        self.app = FastAPI()
        self.pedido_repository = PedidoRepositoryFile(
            "Server Python/repository")

    def configure_routes(self):
        @self.app.get("/")
        def get():
            return HTMLResponse("<h1>Rayquaza Server está Online!</h1>")

        @self.app.get("/pedidos")
        def visualizar_pedidos():
            pedidos = self.pedido_repository.get_all()
            print("\nPedidos Recebido! ", pedidos)
            return pedidos

        @self.app.post("/pedidos")
        def pedidos(pedido: dict):
            self.pedido_repository.save(pedido)
            print('\nNovo Pedido Salvo!')
            model = PedidoModel(pedido)
            return model.process()

        @self.app.delete("/deletarPedido/{pedido_id}")
        def delete_pedido(pedido_id: int):
            self.pedido_repository.delete(pedido_id)
            return {"message": f"Pedido {pedido_id} excluído com sucesso"}

    def run(self):
        self.configure_routes()
        print('\n\nLigando o servidor...')
        uvicorn.run(self.app, host="0.0.0.0", port=5000)


if __name__ == '__main__':
    rayquaza_app = RayquazaApp()
    rayquaza_app.run()
