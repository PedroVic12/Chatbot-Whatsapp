from flask import Flask, jsonify, request
from heyoo import WhatsApp

app = Flask(__name__)


@app.route("/enviar/", methods=["POST", "GET"])
def enviar():
    # TOKEN DE ACESSO DE FACEBOOK
    TOKEN = 'EAADg0t3xBfkBAN38DeoHJq9SadZBdeuytx0Vb1He03nl57QugFj1j9AoZCQ3rJ5Q1JXzBeW5l8HhgMONBHYgsyPxWBgWYbeSKqERzw2p0gZAhKKVSAY8RSs4VWfdMarZBLJQRlTkCUUq06T7ZA3Gy6SLZBck2fsKdtaexYZBBZCsIldN9tv1lmWB4cRd6jdGaIWjhd1N40PaPwZDZD'

    # IDENTIFICADOR DE NÚMERO DE TELÉFONO
    id_telefone = '116907067953774'

    # TELEFONO QUE RECIBE (EL DE NOSOTROS QUE DIMOS DE ALTA)
    NUMERO_TELEFONE = '527122264370'

    # MENSAJE A ENVIAR
    texto_msg = "Ola mundo! Groundon Esta vivo!"

    # INICIALIZAMOS ENVIO DE MENSAJES
    GROUNDON = WhatsApp(TOKEN, id_telefone)
    GROUNDON.send_message(texto_msg, NUMERO_TELEFONE)

    # ENVIAMOS UNA IMAGEN
    # urlImagen='https://i.imgur.com/r5lhxgn.png'
    # GROUNDON.send_image(image=urlImagen,recipient_id=telefonoEnvia,)

    return "Requisição de mensagem Enviada"


if __name__ == "__main__":
    app.run(debug=True)
