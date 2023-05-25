from flask import Flask, request, jsonify
import requests
import json


# TOKEN DE ACESSO DE FACEBOOK
TOKEN = 'EAADg0t3xBfkBAG937Dgc5OeP2WZCNR51qmuGjieTWi8RFjGKs9SqFZCPzrUeF0QY0vFIF8d1YbcW4D5sUZCFEzSfvwG311TtOMg7oSt7EOZBtLFD1pZAgvuxwoZCitJX8WiB1oN2uFB1Oc2uYi1RWn4HNxUnU4j39qc7aU80oK8VNTMTwWlmOPnxTqZC6ZCnMZCl8pyu4s883JQZDZD'
ID_TELEFONE = '116871841400852'
NUMERO_TELEFONE_GROUNDON = '5521983524026'


class WhatsappPikachu:
    def __init__(self, access_token, cellphone_id):
        self.access_token = access_token
        self.cellphone_id = cellphone_id

    def send_message(self, phone_number, message):
        headers = {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json"
        }

        dados = json.dumps({
            "messaging_product": "whatsapp",
            "to": phone_number,
            "type": "text",
            "text": {
                "body": message
            }
        })

        response = requests.post(
            f"https://graph.facebook.com/v16.0/{self.cellphone_id}/messages", headers=headers, json=dados)

        return response.json()

    def enviarMsgTemplate(self, phone_number):
        headers = {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json"
        }

        body_request = json.dumps({
            {
                "messaging_product": "whatsapp",
                "to": phone_number,
                "type": "template",
                "template": {
                    "name": "hello_world",
                    "language": {
                        "code": "en_US"
                    }
                }
            }
        })

        response = requests.post(
            f"https://graph.facebook.com/v16.0/{self.cellphone_id}/messages", headers=headers, json=body_request)

        return response.json()

    def authenticate_whatsapp():
        # Sua lógica de autenticação aqui
        access_token = TOKEN

        return WhatsappPikachu(access_token)

    def connect_whatsapp():
        # Sua lógica de conexão aqui
        access_token = "SEU_TOKEN_DE_CONEXAO_AQUI"

        return WhatsappPikachu(access_token)


def main():
    # Autenticando o WhatsApp
    whatsapp_api = WhatsappPikachu(TOKEN, ID_TELEFONE)

    # Enviando uma mensagem
    response = whatsapp_api.send_message(
        NUMERO_TELEFONE_GROUNDON, "Hello world!")

    print(response)

    return 'tentando enviar hello world'


#!===============Servidor ==========================
app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Flask ta Funcionando! Prefiro Fast"


@app.route('/conectar/', methods=['GET'])
def conectar():

    dados = request.get_json(silent=True)
    # dados['fulfillmentText'] = 'Confirmado mestre Pedro'
    print(dados)

    return jsonify(dados)
    # return jsonify({"status": "Conectado"}), 200


@app.route('/enviarTemplate/', methods=['POST'])
def enviarMsgTemplate():
    # Autenticando o WhatsApp
    whatsapp_api = WhatsappPikachu(TOKEN, ID_TELEFONE)

    # Enviando uma mensagem
    response = whatsapp_api.enviarMsgTemplate(NUMERO_TELEFONE_GROUNDON)

    print(response)

    return 'tentando enviar hello world'


@app.route("/enviarMensagem/", methods=["POST"])
def enviarMensagem():

    if "phone_number" not in request.json:
        return jsonify({"error": "Missing phone_number"}), 400

    if "template_name" not in request.json:
        return jsonify({"error": "Missing template_name"}), 400

    client = WhatsappPikachu(access_token=TOKEN, cellphone_id=ID_TELEFONE)

    response = client.send_message(NUMERO_TELEFONE_GROUNDON, 'Fala viado')

    main()

    print(response)

    return jsonify(
        {
            "data": response,
            "status": "Mensagem Enviada",
        },
    ), 200


if __name__ == "__main__":
    app.debug = True
    app.run()
    # main()
