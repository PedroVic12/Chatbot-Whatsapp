from gerencianet import Gerencianet
from credentials import CREDENTIALS

# Instanciando o Objeto
gn = Gerencianet(CREDENTIALS)

headers = {"x-skip-mtls-checking": "false"}

# Informar a chave pix que foi gerada
#!INPUT
params = {"chave": "d1792422-1a3c-4481-a788-fe501261d942"}

# URL que vai receber as notificações dos pagamentos
#!INPUT
body = {"webhookUrl": ""}

response = gn.pix_config_webhook(params=params, body=body, headers=headers)
print(response)
