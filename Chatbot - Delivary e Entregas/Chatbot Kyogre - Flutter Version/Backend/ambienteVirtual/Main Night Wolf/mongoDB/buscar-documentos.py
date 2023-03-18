from pymongo import MongoClient

# conexão com o banco de dados
client = MongoClient('mongodb://localhost:27017/')
db = client['loja_de_bebidas']
colecao = db['produtos']

# buscar todos os documentos na coleção
for produto in colecao.find():
    print(produto)
    
# buscar apenas um documento com filtro
filtro = {"nome": "Vinho"}
vinho = colecao.find_one(filtro)
print(vinho)
