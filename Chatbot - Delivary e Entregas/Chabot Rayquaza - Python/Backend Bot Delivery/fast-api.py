from heyoo import WhatsApp
from fastapi import FastAPI, Request, Response, Body
import uvicorn
import requests
import httpx
import json
import hashlib
import hmac


app = FastAPI()

# TOKEN DE ACESSO DE FACEBOOK
TOKEN = 'EAADg0t3xBfkBAG937Dgc5OeP2WZCNR51qmuGjieTWi8RFjGKs9SqFZCPzrUeF0QY0vFIF8d1YbcW4D5sUZCFEzSfvwG311TtOMg7oSt7EOZBtLFD1pZAgvuxwoZCitJX8WiB1oN2uFB1Oc2uYi1RWn4HNxUnU4j39qc7aU80oK8VNTMTwWlmOPnxTqZC6ZCnMZCl8pyu4s883JQZDZD'
ID_TELEFONE = '116871841400852'
NUMERO_TELEFONE_GROUNDON = '5521983524026'


@app.get("/")
async def root():
    try:
        global GROUNDON
        GROUNDON = WhatsApp(TOKEN, ID_TELEFONE)
        return {"message": "Groundon esta online 2 !!"}
    except:
        return {"message": "Groundon esta fora do ar :( "}


@app.get("/webhook/")
async def webhook(request: Request, response: Response):
    # Verifique o token de verificação
    expected_token = "anakinSkywalker"
    received_token = request.query_params.get("hub.verify_token")
    if received_token != expected_token:
        response.status_code = 403
        return {"message": "Token de verificação inválido"}

    # Trate a solicitação de webhook
    body = await request.body()
    signature = request.headers.get("X-Hub-Signature")
    expected_signature = hmac.new(
        expected_token.encode(),
        body,
        hashlib.sha1
    ).hexdigest()
    if signature != f"sha1={expected_signature}":
        response.status_code = 403
        return {"message": "Assinatura inválida"}

    # Verifique se a mensagem é de um usuário e se o texto é "oi"
    data = json.loads(body)
    if "message" in data and "text" in data["message"] and data["message"]["is_echo"] == False and data["message"]["text"].lower() == "oi":
        # Enviar a resposta "Olá, mundo Groundon"
        recipient_id = data["sender"]["id"]
        url = f"https://graph.facebook.com/v16.0/me/messages?access_token={TOKEN}"
        payload = {
            "recipient": {"id": recipient_id},
            "message": {"text": "Olá, mundo Groundon"}
        }
        response = requests.post(url, json=payload)
        print(response.json())

    return {"message": "Webhook recebido com sucesso!"}


@app.post("/enviar")
async def enviar(mensagem: str = Body(...)):
    # GROUNDON.send_message(mensagem, NUMERO_TELEFONE_GROUNDON)

    response = GROUNDON.send_message(
        message="Testando o envio de mensagem pelo Heyoo!",
        recipient_id="5521983524026",
    )

    print(response)
    return {"message": "Mensagem enviada com sucesso!"}


@app.post("/enviarmsg")
async def enviar_mensagemPostman():
    url = f"https://graph.facebook.com/v16.0/{ID_TELEFONE}/messages"
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


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=7000)
