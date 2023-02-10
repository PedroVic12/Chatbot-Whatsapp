import pandas as pd


class Database:
    def __init__(self) -> None:
        self.data = None

    def get_data(self):
        return self.data

    def lerDadosExcel(self, xlsx_path):
        data = pd.read_excel(xlsx_path)
        return data

    def lerDadosTxt(self, txt_path):
        data_txt = pd.read_csv(txt_path)
        return data_txt


meuBanco = Database()

dados = meuBanco.lerDadosExcel(
    'Chatbot/Banco de Dados - EXCEL/Janeiro/base_de_dados_janeiro.xlsx')

# print(dados['Nome'])

nome_cliente = meuBanco.lerDadosTxt(
    'Teoria do Caos/arquivos txt/nome_cliente.txt')
print(nome_cliente.columns)


dados_cliente = {
    'Nome': nome_cliente['Nome'],
    'CPF': nome_cliente['CPF'],
    'Telefone': nome_cliente['Telefone'],
    'Email': nome_cliente['Email'],
    'Endereço': nome_cliente['Endereço'],
}
