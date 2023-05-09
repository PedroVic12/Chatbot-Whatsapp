from green_api_whatsapp.client import WhatsappClient

class MyWhatsappClient:
    def __init__(self, phone_number, token):
        self.client = WhatsappClient(phone_number, token)
        self.client.connect()
        
    def on_message(self, message):
        # Verificar se a mensagem é de um grupo ou individual
        if message.is_group_message():
            sender = message.author
            group_name = message.chat.name
            text = message.text
            print(f"Nova mensagem no grupo {group_name} de {sender}: {text}")
        else:
            sender = message.author
            text = message.text
            print(f"Nova mensagem de {sender}: {text}")

        # Enviar a mensagem de resposta
        self.client.send_message(message.chat.id, "Olá, mundo!")

# Substitua com o seu número de telefone e token da API do Green API
client = MyWhatsappClient("<seu-número-de-telefone>", "<seu-token>")

# Aguardar novas mensagens
client.client.wait_for_messages()
