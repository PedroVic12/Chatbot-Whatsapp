from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse
import uvicorn
import json
import os
from datetime import date

app = FastAPI()


class Rayquaza:
    def __init__(self):
        self.connections = []

    async def enviarPedido(self):
        # Implemente aqui a lógica para enviar o pedido para o aplicativo Flutter
        pass

    async def receberPedido(self, pedido):
        # Implemente aqui a lógica para processar as informações do pedido recebido
        # Como exemplo, apenas exibimos a mensagem recebida
        print("Pedido recebido:", pedido)

        # Exemplo de envio de mensagem para todos os clientes conectados
        for connection in self.connections:
            await connection.send_text("Pedido recebido: " + pedido)

    async def enviarStatusPedido(self, status):
        # Implemente aqui a lógica para enviar atualizações de status do pedido para o cliente
        # Como exemplo, apenas exibimos a mensagem de atualização de status
        print("Atualização de status:", status)

        # Exemplo de envio de mensagem para todos os clientes conectados
        for connection in self.connections:
            await connection.send_text("Status do pedido: " + status)

    async def receberInformacoes(self, informacoes):
        # Implemente aqui a lógica para processar as informações recebidas do chatbot

        # Executa alguma ação com base nas informações recebidas
        # ...

        # Exemplo de envio de mensagem para todos os clientes conectados
        for connection in self.connections:
            await connection.send_text("Informações recebidas: " + informacoes)

    async def verificarStatusChatbot(connections):
        return len(connections) >= 1

    async def websocket_endpoint(self, websocket: WebSocket):
        await websocket.accept()
        self.connections.append(websocket)

        while True:
            # Aguarda a recepção de uma mensagem do cliente
            message = await websocket.receive_text()

            # Processa a mensagem (por exemplo, salvar em um arquivo JSON)
            json_filename = "repository/pedido_09-06-23.json".format(
                date.today().strftime("%d-%m-%y"))
            with open(json_filename, "w") as file:
                file.write(message)

            # Verifica se o arquivo JSON tem a data de hoje
            if os.path.exists(json_filename):
                with open(json_filename, "r") as file:
                    json_data = json.load(file)

                # Envia os dados do JSON para o cliente
                await websocket.send_json(json_data)

    def run(self):
        # Rota para a página inicial
        @app.get("/")
        async def get():
            return HTMLResponse("<h1>Rayquaza Server</h1>")

        @app.post("/enviarJson")
        async def receber_json(json_data: dict):
            # Processa o arquivo JSON recebido
            # Por exemplo, você pode salvar o arquivo em disco
            with open("repository/pedido_29-05-23.json", "w") as file:
                json.dump(json_data, file)

                # Exibe o conteúdo do JSON no servidor
                print("JSON recebido:")
                print(json_data)

            # Envia uma resposta de confirmação ao cliente
            return {"message": "Arquivo JSON recebido com sucesso!"}

        @app.websocket("/status-chatbot")
        async def websocket_status_chatbot(websocket: WebSocket):
            await websocket.accept()
            status = self.verificarStatusChatbot(rayquaza.connections)
            await websocket.send_text("Status do chatbot: " + str(status))

        # Rota para estabelecer a conexão WebSocket

        @app.websocket("/ws")
        async def websocket_handler(websocket: WebSocket):
            await self.websocket_endpoint(websocket)

        uvicorn.run(app, host="0.0.0.0", port=8000)


# Exemplo de uso da classe Rayquaza
rayquaza = Rayquaza()
rayquaza.run()
