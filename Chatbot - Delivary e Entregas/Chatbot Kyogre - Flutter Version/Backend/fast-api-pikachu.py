from fastapi import FastAPI
from datetime import datetime

app = FastAPI()


@app.get("/produtos")
async def listar_produtos():
    # Aqui você pode consultar o banco de dados MongoDB para retornar a lista de produtos
    produtos = [{'nome': 'Cerveja', 'descricao': 'Cerveja Pilsen', 'preco': 5.50}, {
        'nome': 'Refrigerante', 'descricao': 'Refrigerante Coca-Cola', 'preco': 4.00}]
    return produtos


@app.post("/pedidos")
async def criar_pedido(pedido: Pedido):
    # Aqui você pode inserir o pedido no banco de dados MongoDB e retornar a resposta
    pedido.data = datetime.now()
    return {"mensagem": "Pedido criado com sucesso", "pedido": pedido}
