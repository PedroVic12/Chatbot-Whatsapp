from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse
import uvicorn
import json
import os

app = FastAPI()


class Rayquaza:
    def __init__(self):
        self.connections = []

    async def receberPedido(self, pedido):
        # Implemente aqui a lógica para processar as informações do pedido recebido
        # Como exemplo, apenas exibimos a mensagem recebida
        print("Pedido recebido:", pedido)

        # Exemplo de envio de mensagem para todos os clientes conectados
        for connection in self.connections:
            await connection.send_text("Pedido recebido: " + pedido)

        # Enviar o pedido para o aplicativo Flutter
        await self.enviarPedido(pedido)

    async def enviarPedido(self, pedido):
        # Implemente aqui a lógica para enviar o pedido para o aplicativo Flutter
        # Como exemplo, apenas exibimos a mensagem
        print("Enviando pedido:", pedido)

    async def websocket_endpoint(self, websocket: WebSocket):
        await websocket.accept()
        self.connections.append(websocket)

        while True:
            # Verifica se há um arquivo JSON presente no diretório "repository"
            json_files = [f for f in os.listdir(
                "repository") if f.endswith(".json")]
            if json_files:
                json_filename = os.path.join("repository", json_files[0])
                with open(json_filename, "r") as file:
                    json_data = json.load(file)
                    print(json_data)

                # Envia os dados do JSON para o cliente
                await websocket.send_json(json_data)

            # Aguarda a recepção de uma mensagem do cliente
            message = await websocket.receive_text()
            await self.receberPedido(message)

    def run(self):
        # Rota para a página inicial
        @app.get("/")
        async def get():
            return HTMLResponse("<h1>Rayquaza Server</h1>")

        # Rota para estabelecer a conexão WebSocket
        @app.websocket("/ws")
        async def websocket_handler(websocket: WebSocket):
            await self.websocket_endpoint(websocket)

        uvicorn.run(app, host="0.0.0.0", port=8000)


# Exemplo de uso da classe Rayquaza
rayquaza = Rayquaza()
rayquaza.run()
