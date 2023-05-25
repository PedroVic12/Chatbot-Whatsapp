import dialogflow_v2 as dialogflow

PROJECT_ID = 'chabot-370717'


class Groundon:
    def __init__(self, project_id):
        self.project_id = project_id
        self.session_client = dialogflow.SessionsClient()
        self.session = self.session_client.session_path(
            self.project_id, "<SESSION_ID>")

    def enviar_mensagem(self, mensagem):
        text_input = dialogflow.TextInput(text=mensagem, language_code="pt-BR")
        query_input = dialogflow.QueryInput(text=text_input)

        response = self.session_client.detect_intent(
            request={"session": self.session, "query_input": query_input}
        )

        return response.query_result.fulfillment_text


# função main
if __name__ == "__main__":
    projeto_dialogflow = "seu_projeto_dialogflow"
    groundon = Groundon(projeto_dialogflow)

    mensagem_usuario = "Esta na hora da batalha!"
    resposta_dialogflow = groundon.enviar_mensagem(mensagem_usuario)

    print("Resposta do Dialogflow:", resposta_dialogflow)
