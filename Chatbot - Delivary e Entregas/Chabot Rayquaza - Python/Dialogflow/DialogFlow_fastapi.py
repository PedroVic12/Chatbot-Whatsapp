from google.cloud import dialogflow
from fastapi import FastAPI, Request
import requests
import uvicorn
import os
import json

# Setando variáveis de ambiente
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/caminho/para/arquivo.json"


# Criando a classe Rayquaza
app = FastAPI()
verify_token = "rayquaza"
whatsapp_token = "EAADg0t3xBfkBAMOS206vpzWFwfuv9ToL3EstZBF7cMt10n5hCY2AZCShyVBxhxvfQJpwS8YZBb8Nv0cipoR3xOZAgaq0g1AfRXeFCRbnwZBXBIEeUpvX5WtmXDaORgntyiffa79gj78dZBbfS9gNpALod6eqco2yWJroxwZCZB3Oqlv2VstUmjHOXUSdZBNroOtAbNYyG0ECkmQZDZD"


class Rayquaza:
    def __init__(self, project_id):
        self.project_id = project_id
        self.session_client = dialogflow.SessionsClient()

    def process_message(self, from_number, msg_body):
        session_path = self.session_client.session_path(
            self.project_id, from_number)
        dialogflow_request = {
            "session": session_path,
            "query_input": {
                "text": {
                    "text": msg_body,
                    "language_code": "pt-BR"
                }
            }
        }
        response = self.session_client.detect_intent(dialogflow_request)
        fulfillment_messages = response.query_result.fulfillment_messages

        for message in fulfillment_messages:
            response_text = ""
            if message.text:
                response_text = "\n".join(message.text.text)

            self.send_message(from_number, response_text)

    def send_message(self, to_number, message):
        url = f"https://graph.facebook.com/v12.0/{to_number}/messages?access_token={whatsapp_token}"
        payload = {
            "messaging_product": "whatsapp",
            "to": to_number,
            "text": {"body": message}
        }
        headers = {"Content-Type": "application/json"}
        requests.post(url, json=payload, headers=headers)


@app.get("/webhook")
async def verify_webhook(request: Request):

    mode = request.query_params.get("hub.mode")
    token = request.query_params.get("hub.verify_token")
    challenge = request.query_params.get("hub.challenge")

    if mode and token:
        if mode == "subscribe" and token == verify_token:
            return challenge
        else:
            return {"status": "Forbidden"}
    else:
        return {"status": "Bad Request"}


@app.post("/webhook")
async def process_webhook(request: Request):
    payload = await request.json()

    if (
        "entry" in payload and
        payload["entry"] and
        "changes" in payload["entry"][0] and
        payload["entry"][0]["changes"] and
        "value" in payload["entry"][0]["changes"][0] and
        payload["entry"][0]["changes"][0]["value"]["messages"]
    ):
        to = payload["entry"][0]["changes"][0]["value"]["metadata"]["phone_number_id"]
        from_number = payload["entry"][0]["changes"][0]["value"]["messages"][0]["from"]
        msg_body = payload["entry"][0]["changes"][0]["value"]["messages"][0]["text"]["body"]

        rayquaza_bot.process_message(from_number, msg_body)

        return {"status": "OK"}


@app.get("/")
async def root():
    return {"message": "Hello World"}

# função main
if __name__ == "__main__":
    # Erro de autenticação aqui
    rayquaza_bot = Rayquaza(project_id="chabot-370717")
    uvicorn.run(app, host="", port=8000, reload=True, debug=True)
