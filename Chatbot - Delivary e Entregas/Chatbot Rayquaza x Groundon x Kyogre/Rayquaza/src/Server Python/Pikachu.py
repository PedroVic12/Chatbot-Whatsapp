from fastapi import FastAPI, WebSocket

app = FastAPI()

class LinkedList:
    def __init__(self, value):
        self.value = value
        self.next = None

@app.websocket("/chatbot")
async def chatbot_endpoint(websocket: WebSocket):
    await websocket.accept()

    linked_list = None  # Variável para armazenar a lista encadeada recebida

    while True:
        data = await websocket.receive_text()

        # Processar os dados recebidos do chatbot (no exemplo, esperamos uma lista encadeada em formato JSON)
        try:
            linked_list = parse_linked_list(data)  # Função para converter a string JSON em uma lista encadeada
            print("Lista encadeada recebida:", linked_list)
        except:
            print("Erro ao processar a lista encadeada recebida")

        # Realizar ações com base na lista encadeada recebida
        # ...

        # Enviar resposta para o chatbot (se necessário)
        response = "Resposta do servidor"
        await websocket.send_text(response)


def parse_linked_list(data):
    # Implemente a função para converter a string JSON em uma lista encadeada
    # Retorne a lista encadeada
    pass

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

