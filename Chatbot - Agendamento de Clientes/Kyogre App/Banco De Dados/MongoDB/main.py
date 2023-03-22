from pymongo import MongoClient

client = MongoClient('localhost', 27017)

db = client['nome_do_seu_banco_de_dados']

class Clientes:
    def __init__(self, db):
        self.db = db
        self.collection = self.db.clientes
