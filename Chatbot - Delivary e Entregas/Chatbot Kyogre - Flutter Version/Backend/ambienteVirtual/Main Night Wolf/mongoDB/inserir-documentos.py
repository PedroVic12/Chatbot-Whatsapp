from pymongo import MongoClient

# conexão com o banco de dados
client = MongoClient('mongodb://localhost:27017/')
db = client['loja_de_bebidas']
colecao = db['produtos']

# inserir um documento na coleção
produto = {"nome": "Cerveja", "preco": 5.99, "estoque": 100}
colecao.insert_one(produto)
