import os
import dialogflow_v2 as dialogflow


class Dialogflow:
    def __init__(self):
        self.project_id = 'your_project_id'
        self.credentials_file = 'path/to/credentials.json'
        self.session_client = dialogflow.SessionsClient.from_service_account_file(
            self.credentials_file
        )

    def detect_intent(self, session_id, text):
        session = self.session_client.session_path(self.project_id, session_id)

        text_input = dialogflow.types.TextInput(
            text=text, language_code='en-US')
        query_input = dialogflow.types.QueryInput(text=text_input)

        response = self.session_client.detect_intent(
            session=session, query_input=query_input)

        return response.query_result.fulfillment_text
