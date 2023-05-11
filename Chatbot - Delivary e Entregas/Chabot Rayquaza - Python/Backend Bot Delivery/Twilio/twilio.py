from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse

account_sid = 'ACc725035ee7442fd675d9bad6a7c1385b'
auth_token = 'eb5367d0034cf07ccfd6bdda098d9319'
client = Client(account_sid, auth_token)

message = client.messages.create(
    from_='whatsapp:+14155238886',
    body='Ola mundo',
    to='whatsapp:+5521999289987'
)

print(message.sid)
