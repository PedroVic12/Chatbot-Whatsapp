import json
from flask import Flask, render_template, redirect, url_for, Response
from rayquaza import Rayquaza
import requests

app = Flask(__name__)
rayquaza = Rayquaza("server/config.json")
print(rayquaza)


class Servidor:
    def __init__(self, config_path):
        self.config_path = config_path
        self.load_config()

    def load_config(self):
        with open(self.config_path) as f:
            self.config = json.load(f)

        app.config.update(self.config)
        return Response("Arquivo Carregado", status=200)

    def run(self):
        @app.route("/")
        def index():
            return "<p>Hello, World! 2</p>"

            # return render_template('server/index.html', name=__name__)

        @app.route('/conectar', methods=['GET'])
        async def conectar():
            with open(self.config_path) as f:
                self.config = json.load(f)

            app.config.update(self.config)
            return Response("Arquivo Carregado", status=200)

        @app.route('/enviar', methods=['POST'])
        def send_message_with_requests():
            data = rayquaza.get_text_message_input(
                '5521983524026', 'Acorda Groundon')

            print(data)

            headers = {
                "Content-type": "application/json",
                "Authorization": f"Bearer {self.config['ACCESS_TOKEN']}"
            }
            url = f"https://graph.facebook.com/{self.config['VERSION']}/{self.config['PHONE_NUMBER_ID']}/messages"

            try:
                response = requests.post(url, data=data, headers=headers)
                if response.status_code == 200:
                    print("Mensagem por requests")
                    return "Mensagem enviada com sucesso!"
                else:
                    print(
                        f"Failed to send message. Status: {response.status_code}")
                    return "Falha ao enviar mensagem."
            except requests.exceptions.RequestException as e:
                print(f"Error sending message: {str(e)}")
                return "Erro ao enviar mensagem."

        @app.route('/welcome', methods=['POST'])
        async def welcome():

            try:
                # rayquaza.send_message("5511999999999", "Olá, mundo!")
                data = rayquaza.get_text_message_input(
                    app.config['RECIPIENT_WAID'], 'Welcome to the Flight Confirmation Demo App for Python!')

                await rayquaza.send_message(
                    recipient='5521983524026', message=data)

                if Response.status_code == 200:
                    print("tentativa concluída!!!")
                else:
                    print(
                        f"Failed to send message. Status: {str(Response.status_code)}")

                return Response("Mensagem Enviada", status=200)

            except Exception as e:
                print("\n\nErro ao enviar mensagem:", str(e))
                return Response("Error sending message", status=500)

        app.run()


# Executar o servidor
if __name__ == '__main__':
    servidor = Servidor('server/config.json')
    servidor.run()
