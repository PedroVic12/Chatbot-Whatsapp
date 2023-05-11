import dialogflow_v2 as dialogflow
from google.protobuf.json_format import MessageToDict
from flask import Flask, request

app = Flask(__name__)


class DialogflowClient:
    def __init__(self, project_id, session_id, language_code):
        self.project_id = project_id
        self.session_id = session_id
        self.language_code = language_code

        self.session_client = dialogflow.SessionsClient()
        self.session = self.session_client.session_path(
            self.project_id, self.session_id)

        self.intents_client = dialogflow.IntentsClient()

        self.parent = dialogflow.AgentsClient.agent_path(self.project_id)

    def enviarMensagem(self, message_text):
        text_input = dialogflow.types.TextInput(
            text=message_text, language_code=self.language_code)
        query_input = dialogflow.types.QueryInput(text=text_input)

        response = self.session_client.detect_intent(
            session=self.session, query_input=query_input)
        return response.query_result.fulfillment_text

    def handle_intent(self, intent):
        # Adicione aqui o código para lidar com a intenção detectada pelo Dialogflow
        print(intent)

    def detect_intent(self, message):
        text_input = dialogflow.types.TextInput(
            text=message, language_code=self.language_code)
        query_input = dialogflow.types.QueryInput(text=text_input)

        response = self.session_client.detect_intent(
            session=self.session, query_input=query_input)

        return response.query_result.fulfillment_text

    def create_intent_with_buttons(self, display_name, training_phrases_parts, message_texts, contexts):
        training_phrases = []
        for training_phrases_part in training_phrases_parts:
            part = dialogflow.Intent.TrainingPhrase.Part(
                text=training_phrases_part)
            training_phrase = dialogflow.Intent.TrainingPhrase(parts=[part])
            training_phrases.append(training_phrase)

        quick_replies = dialogflow.Intent.Message.QuickReplies(quick_replies=[
                                                               dialogflow.Intent.Message.QuickReplies.QuickReply(title=context, payload=context) for context in contexts])
        text = dialogflow.Intent.Message.Text(text=message_texts)
        message = dialogflow.Intent.Message(
            text=text, quick_replies=quick_replies)

        intent = dialogflow.Intent(
            display_name=display_name,
            training_phrases=training_phrases,
            messages=[message],
        )

        response = self.intents_client.create_intent(
            request={'parent': self.parent, 'intent': intent})
        intent_dict = MessageToDict(response)

        print('Intent created:')
        print(f"Intent display name: {intent_dict['display_name']}")
        print(
            f"Intent training phrases: {[part['text'] for part in intent_dict['training_phrases'][0]['parts']]}")
        print(
            f"Intent response: {intent_dict['messages'][0]['text']['text'][0]}")
        print(
            f"Intent buttons: {[button['title'] for button in intent_dict['messages'][0]['quick_replies']['quick_replies']]}")

    @app.route('/webhook', methods=['POST'])
    def webhook():
        request_data = request.get_json()
        message = request_data['message']

        response = client.detect_intent(message)
        client.handle_intent(response.intent)

        return 'Success'


if __name__ == '__main__':
    project_id = 'your_project_id'
    session_id = 'your_session_id'
    language_code = 'your_language_code'

    client = DialogflowClient(project_id, session_id, language_code)

    # Criação da intent com botões de contexto
    display_name = 'DeliveryIntent'
    training_phrases_parts = [
        'Quais opções de entrega vocês oferecem?', 'Como posso receber meu pedido?']
    message_texts = ['Escolha uma das opções abaixo:']
    contexts = ['Delivery Grátis', 'Entrega Rápida', 'Entrega Econômica']

    client.create_intent_with_buttons(
        display_name, training_phrases_parts, message_texts, contexts)

    app.run()
