import requests
import httpx
from fastapi import FastAPI


# TOKEN DE ACESSO DE FACEBOOK
TOKEN = 'EAADg0t3xBfkBAG937Dgc5OeP2WZCNR51qmuGjieTWi8RFjGKs9SqFZCPzrUeF0QY0vFIF8d1YbcW4D5sUZCFEzSfvwG311TtOMg7oSt7EOZBtLFD1pZAgvuxwoZCitJX8WiB1oN2uFB1Oc2uYi1RWn4HNxUnU4j39qc7aU80oK8VNTMTwWlmOPnxTqZC6ZCnMZCl8pyu4s883JQZDZD'
ID_TELEFONE = '116871841400852'
NUMERO_TELEFONE_GROUNDON = '5521983524026'
app = FastAPI()

@app.post("/enviar")
async def enviar_mensagem():
    url = "https://graph.facebook.com/v16.0/116871841400852/messages"
    access_token = TOKEN

    payload = {
        "messaging_product": "whatsapp",
        "to": NUMERO_TELEFONE_GROUNDON,
        "type": "text",
        "text": {
            "body": "Olá, mundo"
        }
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(
            url,
            headers={
                "Authorization": f"Bearer {access_token}",
                "Content-Type": "application/json"
            },
            json=payload
        )

    return response.json()
