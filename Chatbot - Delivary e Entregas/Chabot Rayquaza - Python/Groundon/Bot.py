from flask import Flask, request, jsonify

class WhatsAppBot:
    def __init__(self, webhook_secret):
        self.webhook_secret = webhook_secret

    def process_message(self, message):
        # Aqui você pode implementar a lógica de processamento da mensagem
        # Por exemplo, pode utilizar o Dialogflow para processar a mensagem e gerar uma resposta
        
        response_text = "Olá, você digitou: " + message["text"]
        response_message = {
            "phone_number": message["phone_number"],
            "message": {
                "type": "text",
                "text": response_text
            }
        }
        
        return response_message
    
    def verify_signature(self, request_data, signature):
        # Aqui você deve verificar se a assinatura da requisição é válida
        # Para isso, é necessário calcular o HMAC utilizando a chave secreta do webhook
        # e comparar com a assinatura recebida no cabeçalho da requisição
        
        return True  # Coloque aqui a sua lógica de verificação da assinatura
        
    def handle_webhook(self):
        signature = request.headers.get('X-Hub-Signature')
        if not self.verify_signature(request.data, signature):
            return jsonify({}), 401
        
        event = request.json.get('events')[0]
        message = event.get('message')
        
        response_message = self.process_message(message)
        return jsonify(response_message)

app = Flask(__name__)
bot = WhatsAppBot(webhook_secret="sua_chave_secreta")

@app.route('/webhook', methods=['POST'])
def webhook():
    return bot.handle_webhook()

if __name__ == '__main__':
    app.run()
