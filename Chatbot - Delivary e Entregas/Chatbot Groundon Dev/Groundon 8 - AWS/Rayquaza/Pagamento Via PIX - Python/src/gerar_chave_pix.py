from gerencianet import Gerencianet
from credentials import CREDENTIALS

# Salvando as credenciais para arquivo separado por segurança
gn = Gerencianet(CREDENTIALS)

#Gerando chave PIX
response = gn.pix_create_evp()
print(response)
