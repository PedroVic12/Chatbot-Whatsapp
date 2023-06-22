from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
import uvicorn

from repository.pedido_repository import PedidoRepositoryFile, PedidoModel


app = FastAPI()


class RayquazaApp:
    def __init__(self):
        self.app = FastAPI()
        self.pedido_repository = PedidoRepositoryFile(
            "/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Delivary e Entregas/Chatbot Rayquaza x Groundon x Kyogre/Rayquaza/src/Server Python/repository"
        )

    # Boas Práticas de Backend

    def validar_entrada(self, dados: dict):
        # Implemente a validação de entrada de acordo com suas necessidades
        if 'campo_obrigatorio' not in dados:
            raise HTTPException(
                status_code=400, detail='Campo obrigatório não fornecido'
            )
        # Outras validações...

    def paginacao(self, dados: list, page: int, limit: int):
        total_results = len(dados)
        total_pages = (total_results + limit - 1) // limit
        if page < 1 or page > total_pages:
            raise HTTPException(status_code=400, detail='Página inválida')
        start_index = (page - 1) * limit
        end_index = start_index + limit
        results = dados[start_index:end_index]
        return {
            'total_results': total_results,
            'total_pages': total_pages,
            'page': page,
            'limit': limit,
            'results': results
        }

    # Protocolo HTTP

    def configure_routes(self):
        # Métodos GET
        @self.app.get("/")
        def get():
            return HTMLResponse("<h1>Rayquaza Server está Online!</h1>")

        @self.app.get("/pedidos")
        def visualizar_pedidos(page: int = 1, limit: int = 10):
            pedidos = self.pedido_repository.get_all()
            paginacao_result = self.paginacao(pedidos, page, limit)
            print("\n>>> Pedidos Recebidos:\n", paginacao_result['results'])
            return paginacao_result

        # Métodos POST

        @self.app.post("/pedidos")
        def criar_pedido(pedido: dict):
            self.validar_entrada(pedido)
            self.pedido_repository.save(pedido)
            print('\nNovo Pedido Salvo!')
            model = PedidoModel(pedido)
            return model.process()

        # Métodos DELETE
        @self.app.delete("/pedidos/{pedido_id}")
        def deletar_pedido(pedido_id: int):
            # TODO: Interface Flutter vai fazer o delete no servidor
            # TODO: Caso o delete no Flutter for bem-sucedido, esperar e apagar o arquivo JSON da máquina
            self.pedido_repository.delete(pedido_id)
            return {"message": f"Pedido {pedido_id} excluído com sucesso"}

        # Métodos PUT
        @self.app.put("/pedidos/{pedido_id}")
        def atualizar_pedido(pedido_id: int, pedido: dict):
            # TODO: Atualizar o Status do Pedido (Recebido, preparando, entregue, concluído)
            # Implemente a lógica de atualização do pedido aqui
            return {"message": f"Pedido {pedido_id} atualizado"}

    def run(self):
        self.configure_routes()
        print('\n\nLigando o servidor...')
        uvicorn.run(self.app, host="0.0.0.0", port=5000)


if __name__ == '__main__':
    rayquaza_app = RayquazaApp()
    rayquaza_app.run()
