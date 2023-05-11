import requests


# TOKEN DE ACESSO DE FACEBOOK
TOKEN = 'EAADg0t3xBfkBAMuL24kp03cilHxr3ZCTJXFX6hduDWw1Ev2szqtk2PyyTmLrdfNLeGh7MfA173cdJ1RhwUsTsFZB1Oi78guBJN5SDzdiBEZAxBCPJvu6ZCjRf6pD9ZCYCAbrcopCSXZACSAIZAo5Ew4gF37JSA98xhYU6PFPbWO2iwbZBZCVhrzGVZABrlccT5ytriaOGiQUzeZCgZDZD'
ID_TELEFONE = '116871841400852'
NUMERO_TELEFONE_GROUNDON = '5521983524026'
NUMERO_TESTE = '+15550958927'


class WhatsAppAPI:
    def __init__(self, phone_number, access_token):
        self.phone_number = phone_number
        self.access_token = access_token
    
    def send_message(self, recipient, message):
        url = f'https://api.chat-api.com/instance/{self.phone_number}/message'
        headers = {'Authorization': f'Token {self.access_token}'}
        data = {'phone': recipient, 'body': message}
        response = requests.post(url, headers=headers, data=data)
        return response.json()
        

if __name__ == '__main__':
    phone_number = NUMERO_TESTE
    access_token = TOKEN
    whatsapp_api = WhatsAppAPI(phone_number, access_token)
    recipient = NUMERO_TELEFONE_GROUNDON
    message = 'Hello, World!'
    response = whatsapp_api.send_message(recipient, message)
    print(response)
