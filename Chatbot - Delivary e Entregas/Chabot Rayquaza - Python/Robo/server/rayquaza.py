import json
import aiohttp


class Rayquaza:
    def __init__(self, config_path):
        self.config_path = config_path
        self.load_config()

    def load_config(self):
        try:
            with open(self.config_path) as f:
                self.config = json.load(f)
                print('Arquivo carregado!')
        except:
            print('Erro ao carregar o arquivo')

    async def send_message(self, recipient, message):
        data = self.get_text_message_input(recipient, message)
        headers = {
            "Content-type": "application/json",
            "Authorization": f"Bearer {self.config['ACCESS_TOKEN']}"
        }

        async with aiohttp.ClientSession() as session:
            url = f"https://graph.facebook.com/{self.config['VERSION']}/{self.config['PHONE_NUMBER_ID']}/messages"
            try:
                async with session.post(url, data=data, headers=headers) as response:
                    if response.status == 200:
                        print("Message sent successfully!!!")
                    else:
                        print(
                            f"Failed to send message. Status: {response.status}")
            except aiohttp.ClientConnectorError as e:
                print(f"Connection Error: {str(e)}")

    def get_text_message_input(self, recipient, text):
        return json.dumps({
            "messaging_product": "whatsapp",
            "preview_url": False,
            "recipient_type": "individual",
            "to": recipient,
            "type": "text",
            "text": {
                "body": text
            }
        })
