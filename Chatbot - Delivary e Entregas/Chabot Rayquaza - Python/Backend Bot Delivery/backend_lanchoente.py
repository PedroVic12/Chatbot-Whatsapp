import datetime as dt
import requests


def fazerRequisicao():

    global hora_atual
    hora_atual = dt.datetime.now()
    global numero_req
    numero_req += 1

    requisicao_banco_de_dados = requests.get(
        'https://banco-de-dados-lanchonete-default-rtdb.firebaseio.com/.json')
    data = requisicao_banco_de_dados.json()
    return data


def showMessage():
    print('Hora atual: ', hora_atual)
    fazerRequisicao()
    print('Número de requisições: ', numero_req)


def main():
    fazerRequisicao()
    showMessage()
