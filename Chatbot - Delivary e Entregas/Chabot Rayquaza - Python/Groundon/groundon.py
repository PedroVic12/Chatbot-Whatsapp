from python_whatsapp_bot import Whatsapp

# TOKEN DE ACESSO DE FACEBOOK
TOKEN = 'EAADg0t3xBfkBAMuL24kp03cilHxr3ZCTJXFX6hduDWw1Ev2szqtk2PyyTmLrdfNLeGh7MfA173cdJ1RhwUsTsFZB1Oi78guBJN5SDzdiBEZAxBCPJvu6ZCjRf6pD9ZCYCAbrcopCSXZACSAIZAo5Ew4gF37JSA98xhYU6PFPbWO2iwbZBZCVhrzGVZABrlccT5ytriaOGiQUzeZCgZDZD'
ID_TELEFONE = '116871841400852'
NUMERO_TELEFONE_GROUNDON = '5521983524026'


class Bot:
    def __init__(self, phone_number, client_id, client_token):
        self.phone_number = phone_number
        self.client = Whatsapp(client_id, client_token)
        #self.client.authenticate(self.phone_number)

    def send_message(self, recipient, message):
        self.client.send_message(recipient, message)


bot = Bot(NUMERO_TELEFONE_GROUNDON, ID_TELEFONE, TOKEN)
bot.send_message('5521999289987', "Olá! Tudo bem?")
