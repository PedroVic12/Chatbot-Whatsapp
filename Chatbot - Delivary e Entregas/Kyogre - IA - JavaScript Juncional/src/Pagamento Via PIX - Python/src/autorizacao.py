# Desenvolvido pela Consultoria Técnica da Gerencianet

import requests
import base64

credentials = {
    "client_id": "Client_Id_f5765f10062fdcbf1308e98ff97b3d2a2e7f75a0",
    "client_secret": "Client_Secret_4f382f29abe1c2fbe8a336cc83259a6a50beaa4d",
}

certificado = "./producao-430925-Chatbot.p12"  # A variável certificado é o diretório em que seu certificado em formato .pem deve ser inserido

auth = base64.b64encode(
    (f"{credentials['client_id']}:{credentials['client_secret']}").encode()
).decode()

url = "https://api-pix-h.gerencianet.com.br/oauth/token"  # Para ambiente de Desenvolvimento

payload = '{\r\n    "grant_type": "client_credentials"\r\n}'
headers = {"Authorization": f"Basic {auth}", "Content-Type": "application/json"}

response = requests.request(
    "POST", url, headers=headers, data=payload, cert=certificado
)

print(response.text)
