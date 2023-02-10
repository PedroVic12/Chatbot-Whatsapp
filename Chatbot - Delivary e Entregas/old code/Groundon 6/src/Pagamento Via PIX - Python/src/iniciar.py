from gerencianet import Gerencianet
from credentials import CREDENTIALS

# Salvando as credenciais para arquivo separado por segurança
gn = Gerencianet(CREDENTIALS)

body = {
    "calendário": {"expiração": 3600},
    "devedor": {"cpf": "12345678909", "nome": "Francisco da Silva"},
    "valor": {"original": "123.45"},
    "chave": "71cdf9ba-c695-4e3c-b010-abb521a3f1be",
    "solicitaçãoPagador": "Cobrança dos serviços prestados.",
}


print(gn.create_charge(body=body))
