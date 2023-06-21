import json
import glob
import os
from fastapi.responses import HTMLResponse
from fastapi import FastAPI, HTTPException


class PedidoRepository:
    def save(self, pedido):
        raise NotImplementedError

    def get_all(self):
        raise NotImplementedError

    def delete(self, pedido_id):
        raise NotImplementedError


class PedidoRepositoryFile(PedidoRepository):
    def __init__(self, repository_path):
        self.repository_path = repository_path

    def save(self, pedido):
        file_path = os.path.join(self.repository_path,
                                 f"pedido_{pedido['id']}.json")
        with open(file_path, "w") as file:
            json.dump(pedido, file)

    def get_all(self):
        json_files = glob.glob(os.path.join(self.repository_path, "*.json"))
        json_data_list = []

        for json_file in json_files:
            with open(json_file, "r") as file:
                json_data = json.load(file)
                json_data_list.append(json_data)

        return json_data_list

    def delete(self, pedido_id):
        file_path = os.path.join(self.repository_path,
                                 f"pedido_{pedido_id}.json")
        if os.path.exists(file_path):
            os.remove(file_path)
        else:
            raise HTTPException(
                status_code=404, detail=f"Pedido {pedido_id} não encontrado")


class PedidoModel:
    def __init__(self, pedido):
        self.pedido = pedido

    def process(self):
        print("\n\n>>>Pedidos recebidos:\n" + self.pedido + '\n')
        return {"message": "Pedidos recebidos com sucesso"}
