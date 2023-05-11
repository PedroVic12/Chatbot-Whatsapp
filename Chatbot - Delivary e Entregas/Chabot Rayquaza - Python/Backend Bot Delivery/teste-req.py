import requests

# Token de acesso do Facebook
TOKEN = 'EAADg0t3xBfkBAMuL24kp03cilHxr3ZCTJXFX6hduDWw1Ev2szqtk2PyyTmLrdfNLeGh7MfA173cdJ1RhwUsTsFZB1Oi78guBJN5SDzdiBEZAxBCPJvu6ZCjRf6pD9ZCYCAbrcopCSXZACSAIZAo5Ew4gF37JSA98xhYU6PFPbWO2iwbZBZCVhrzGVZABrlccT5ytriaOGiQUzeZCgZDZD'

# Número de telefone do destinatário
NUMERO_TELEFONE_GROUNDON = '5521983524026'

# Texto da mensagem
texto_msg = 'Ola mundo! Groundon Esta vivo!'

# URL da API do Facebook para enviar mensagens para o WhatsApp
url = f'https://graph.facebook.com/v16.0/me/messages?access_token={TOKEN}'

# Parâmetros da mensagem
params = {
    'recipient': {'phone_number': f'whatsapp:{NUMERO_TELEFONE_GROUNDON}'},
    'message': {'text': texto_msg}
}

# Envia a mensagem
response = requests.post(url, json=params)

# Verifica a resposta
if response.status_code == 200:
    print('Mensagem enviada com sucesso!')
else:
    print('Falha ao enviar a mensagem.')
