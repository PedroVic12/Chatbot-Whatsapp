from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Pedido(BaseModel):
    nome_cliente: str
    endereco_entrega: str
    itens: list


class Rayquaza:
    def __init__(self):
        self.app = app

    def configurar_rotas(self):
        @self.app.post("/enviar-pedido")
        def enviar_pedido(pedido: Pedido):
            """
            A rota /enviar-pedido é usada para receber um pedido do aplicativo Flutter. Ela espera receber um objeto JSON seguindo a estrutura definida na classe Pedido. Você pode acessar os dados do pedido recebido na função enviar_pedido() e executar a lógica necessária para processá-lo
            """
            # TODO Lógica para processar o pedido recebido

            # TODO Aqui você pode salvar as informações em um banco de dados, enviar para o chatbot, etc.

            return {"message": "Pedido recebido com sucesso"}

        @self.app.post("/receber-informacoes")
        def receber_informacoes(informacoes: dict):
            """
            A rota /receber-informacoes é usada para receber informações do aplicativo Flutter. Ela espera receber um objeto JSON genérico. Na função receber_informacoes(), você pode acessar os dados recebidos e executar qualquer ação necessária com base nessas informações.
            """
            # TODO Lógica para processar as informações recebidas

            # TODO Aqui você pode realizar qualquer ação com base nas informações recebidas do aplicativo Flutter
            return {"message": "Informações recebidas com sucesso"}

    def executar_servidor(self, host="localhost", port=8000):
        self.configurar_rotas()
        import uvicorn
        uvicorn.run(self.app, host=host, port=port)


if __name__ == "__main__":
    rayquaza = Rayquaza()
    rayquaza.executar_servidor()
