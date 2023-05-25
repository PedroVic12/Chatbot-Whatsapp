from pymongo import MongoClient

# criando a conexão com o MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['loja_de_bebidas']

# definindo a classe Cliente


class Cliente:
    def __init__(self, nome, telefone, endereco):
        self.nome = nome
        self.telefone = telefone
        self.endereco = endereco

    def salvar(self):
        clientes = db.clientes
        clientes.insert_one({
            'nome': self.nome,
            'telefone': self.telefone,
            'endereco': self.endereco
        })


#! HELLO WOLRD
