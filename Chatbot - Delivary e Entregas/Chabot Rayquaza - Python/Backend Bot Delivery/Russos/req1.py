import requests


ID_INSTANCE = '1101817410'
API_TOKEN_INSTANCE = '98a75332802e4da28066a757ee5f97ae3597594afa574dc395'
NUMERO_TELEFONE_GROUNDON = '5521983524026'

url = f"https://api.green-api.com/waInstance{ID_INSTANCE}/ReceiveNotification/{API_TOKEN_INSTANCE}"

payload = {}
headers = {}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text.encode('utf8'))
