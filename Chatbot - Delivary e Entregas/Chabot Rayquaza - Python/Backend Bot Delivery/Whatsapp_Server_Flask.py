from flask import Flask, jsonify, request
from heyoo import WhatsApp

app = Flask(__name__)


class Heyoo:
    def __init__(self, token, phone_id):
        self.TOKEN = token
        self.id_telefone = phone_id
        self.client = WhatsApp(self.TOKEN, self.id_telefone)

    def enviarMensagem(self, texto_msg, numero_destino):
        self.client.send_message(texto_msg, numero_destino)

    def conectarWpp(self):

        status = self.client.get_status()
        if status == "CONNECTED":
            return {"message": "WhatsApp conectado"}
        else:
            return {"message": "WhatsApp desconectado"}

    def iniciarServidor(self):
        app.run(debug=True)


h = Heyoo('EAADg0t3xBfkBAMuL24kp03cilHxr3ZCTJXFX6hduDWw1Ev2szqtk2PyyTmLrdfNLeGh7MfA173cdJ1RhwUsTsFZB1Oi78guBJN5SDzdiBEZAxBCPJvu6ZCjRf6pD9ZCYCAbrcopCSXZACSAIZAo5Ew4gF37JSA98xhYU6PFPbWO2iwbZBZCVhrzGVZABrlccT5ytriaOGiQUzeZCgZDZD', '116871841400852')


@app.route("/enviar/", methods=["POST", "GET"])
def enviar():
    NUMERO_TELEFONE_GROUNDON = '5521983524026'
    texto_msg = "Ola mundo! Groundon Esta vivo!"
    h.enviarMensagem(texto_msg, NUMERO_TELEFONE_GROUNDON)
    return "Requisição de mensagem Enviada"


@app.route("/", methods=["POST", "GET"])
def conectado():
    return str(h.conectarWpp())


@app.route("/webhook/", methods=["POST", "GET"])
def webhook_whatsapp():
    if request.method == "GET":
        # SI EL TOKEN ES IGUAL AL QUE RECIBIMOS
        if request.args.get('hub.verify_token') == "EAADg0t3xBfkBAMuL24kp03cilHxr3ZCTJXFX6hduDWw1Ev2szqtk2PyyTmLrdfNLeGh7MfA173cdJ1RhwUsTsFZB1Oi78guBJN5SDzdiBEZAxBCPJvu6ZCjRf6pD9ZCYCAbrcopCSXZACSAIZAo5Ew4gF37JSA98xhYU6PFPbWO2iwbZBZCVhrzGVZABrlccT5ytriaOGiQUzeZCgZDZD":
            return request.args.get('hub.challenge')
        else:
            # SI NO SON IGUALES RETORNAMOS UN MENSAJE DE ERROR
            return "Error de autenciação."

    # RECIBIMOS TODOS LOS DATOS ENVIADO VIA JSON
    data = request.get_json()

    # EXTRAEMOS EL NUMERO DE TELEFONO Y EL MANSAJE
    mensaje = "Telefono:" + \
        data['entry'][0]['changes'][0]['value']['messages'][0]['from']
    mensaje = mensaje+"|Mensagem:" + \
        data['entry'][0]['changes'][0]['value']['messages'][0]['text']['body']

    # ESCRIBIMOS EL NUMERO DE TELEFONO Y EL MENSAJE EN EL ARCHIVO TEXTO
    f = open("texto.txt", "w")
    f.write(mensaje)
    f.close()
    # RETORNAMOS EL STATUS EN UN JSON
    return jsonify({"status": "success"}, 200)


if __name__ == "__main__":
    h.iniciarServidor()
