from fastapi import FastAPI

app = FastAPI()


@app.get("/cliente")
def get_cliente():
    # Aqui você pode implementar a lógica para ler o arquivo JSON e retornar os dados do cliente
    # Por exemplo, você pode abrir o arquivo JSON e retornar seu conteúdo como resposta
    with open("cliente.json", "r") as file:
        cliente_data = file.read()
    return cliente_data
