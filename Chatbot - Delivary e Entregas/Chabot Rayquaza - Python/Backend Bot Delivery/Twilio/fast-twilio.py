from fastapi import FastAPI, Request
from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse
from pydantic import BaseModel
import uvicorn
from heyoo import WhatsApp


# Configure the Twilio client with your Account SID and Auth Token
account_sid = 'ACc725035ee7442fd675d9bad6a7c1385b'
auth_token = 'eb5367d0034cf07ccfd6bdda098d9319'
client = Client(account_sid, auth_token)

# TOKEN DE ACESSO DE FACEBOOK
TOKEN = 'EAADg0t3xBfkBAMuL24kp03cilHxr3ZCTJXFX6hduDWw1Ev2szqtk2PyyTmLrdfNLeGh7MfA173cdJ1RhwUsTsFZB1Oi78guBJN5SDzdiBEZAxBCPJvu6ZCjRf6pD9ZCYCAbrcopCSXZACSAIZAo5Ew4gF37JSA98xhYU6PFPbWO2iwbZBZCVhrzGVZABrlccT5ytriaOGiQUzeZCgZDZD'
ID_TELEFONE = '116871841400852'
NUMERO_TELEFONE_GROUNDON = '5521983524026'


app = FastAPI()


# Define a model for the message data
class Message(BaseModel):
    message: str


@app.get("/")
async def root():
    try:
        GROUNDON = WhatsApp(TOKEN, ID_TELEFONE)
        return {"message": "Groundon esta online!!"}
    except:
        print('Groundon ta fora do ar')
    return {"message": "Groundon esta vivo!!"}


# Define a function to handle the incoming message
@app.post("/incoming")
async def incoming_message(request: Request):
    # Parse the incoming message
    message_body = await request.body()
    message = client.messages.create(
        body=message_body.decode("utf-8"),
        from_='whatsapp:+14155238886',
        to='whatsapp:+5521983524026'  # replace with your WhatsApp number
    )

    # Create a response to the incoming message
    response = MessagingResponse()
    response.message("Olá! Você enviou a seguinte mensagem: " + message.body)

    # Add buttons to the response
    response.message("Você gostaria de enviar uma resposta?")
    response.message().append(
        MessagingResponse().create_options(
            [
                ("Sim", "SIM"),
                ("Não", "NAO"),
            ]
        )
    )

    return response.to_xml(), 200

# Define a function to handle the response to the buttons


@app.post("/send_message")
async def send_message(message: Message):
    # Process the response
    if message.message == "SIM":
        response_message = "Sua resposta foi SIM"
    elif message.message == "NAO":
        response_message = "Sua resposta foi NÃO"
    else:
        response_message = "Por favor, responda SIM ou NÃO"

    # Send a confirmation message back to the user
    message = client.messages.create(
        body=response_message,
        from_='whatsapp:+14155238886',
        to='whatsapp:+XXXXXXXXXXX'  # replace with your WhatsApp number
    )

    return {"status": "success"}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
