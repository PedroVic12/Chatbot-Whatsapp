from fastapi import FastAPI, WebSocket

app = FastAPI()

# Rota para receber os pedidos do cliente via WebSocket


@app.websocket("/pedido")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    while True:
        # Recebe uma mensagem do cliente
        message = await websocket.receive_text()

        # Processa a mensagem (por exemplo, salvar em um arquivo JSON)

        # Envie uma resposta de confirmação ao cliente
        await websocket.send_text("Pedido recebido com sucesso!")

# Inicie o servidor usando o Uvicorn
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
