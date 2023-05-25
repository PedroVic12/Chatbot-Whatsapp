from pymongo import MongoClient

# conexão com o banco de dados
client = MongoClient('mongodb://localhost:27017/')
db = client['loja_de_bebidas']
colecao = db['produtos']

# atualizar um documento na coleção
filtro = {"nome": "Cerveja"}
novo_valor = {"$set": {"preco": 6.99}}
colecao.update_one(filtro, novo_valor)

# atualizar vários documentos na coleção
filtro = {"preco": {"$lt": 5.00}}
novo_valor = {"$set": {"preco": 4.99}}
colecao.update_many(filtro, novo_valor)
