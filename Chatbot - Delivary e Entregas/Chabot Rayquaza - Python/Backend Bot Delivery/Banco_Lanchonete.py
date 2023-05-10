import requests
import pandas as pd
import datetime as dt


class BancoDeDados:
    def __init__(self):
        self.numero_requisicoes = 0

        # Conecta ao banco de dados
        self.criar_tabela()
        # self.showMessageConsulta(self.numero_requisicoes, self.getDatetime,'1224')

    def exportarJson(self):
        # Exportar dados do banco de dados para o arquivo JSON
        pass

    def criar_tabela(self):
        # Conexão com o Firebase
        print('Criando tabela...')

        # produtos = self.requisicaoProdutos()
        # return produtos

    def requisicaoProdutos(self):

        # Fazendo a Requsição
        requisicao_banco_de_dados = requests.get(
            'https://banco-de-dados-lanchonete-default-rtdb.firebaseio.com/.json')

        # Contador de Requisições
        self.contandoRequisicao()

        data = requisicao_banco_de_dados.json()
        return data

    def contandoRequisicao(self):
        # Contador de Requisições
        qnt_consultas_dia = self.numero_requisicoes
        # Gerando a data da consulta do Banco de Dados
        qnt_consultas_dia += 1
        data_atual = self.getDatetime(qnt_consultas_dia)
        print('Data = ', data_atual)

    def gerarExcel(self):
        produtos = self.requisicaoProdutos()
        df = pd.DataFrame(produtos)

        df.to_excel('Backend Bot Delivery/produtos.xlsx', index=False)
        print('Arquivo EXCEL do Mes de {} atualizado com sucesso!')

    def lerExcel(self):
        excel = pd.read_excel('Backend Bot Delivery/produtos.xlsx')
        # print(excel)

    def inserir_produtos(self, nome, preco):
        # Inserir dados na tabela com método POST
        pass

    def listar_produtos(self):
        excel = pd.read_excel('Backend Bot Delivery/produtos.xlsx')
        print(excel)

    def getDatetime(self, qnt_requisicoes):
        global hora_atual
        hora_atual = dt.datetime.now()
        hora_formatada = hora_atual.strftime('%d/%m/%Y %H:%M:%S')
        hora_dividida = hora_formatada.split()
        data_consulta = hora_dividida[0]
        hora_consulta = hora_dividida[1]

        self.showMessageConsulta(qnt_requisicoes, data_consulta, hora_consulta)
        return data_consulta, hora_consulta

    def showMessageConsulta(self, num_consultas, data_consulta, hora_consulta):
        print(
            f'\n|======= Numero de consultas: {num_consultas } =========|')
        print(f"|Data: {data_consulta} | Hora:{hora_consulta}       |")
        print('|===========================================|\n')

    def getMesAtual(self):
        # se o mes for 1 entao o mes é janeiro
        if self.hora_atual.month == 1:
            return 'Janeiro'
        # se o mes for 2 entao o mes é fevereiro
        elif self.hora_atual.month == 2:
            return 'Fevereiro'
        # se o mes for 3 entao o mes é março
        pass

        def getMesAtual(self):
            meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                     'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
            return meses[self.hora_atual.month - 1]


if __name__ == '__main__':

    # Conexão com o Firebase
    banco_lanchonete = BancoDeDados()
    banco_lanchonete.listar_produtos()

    # banco_lanchonete.getMesAtual()

    # Gerando Relatorio em Excel
    banco_lanchonete.gerarExcel()
