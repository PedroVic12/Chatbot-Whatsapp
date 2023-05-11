from fastapi import FastAPI, Request
from pydantic import BaseModel
from typing import List
import dialogflow_v2 as dialogflow
import uvicorn

class DialogflowConnector:
    def __init__(self, project_id: str):
        self.project_id = project_id
        self.session_client = dialogflow.SessionsClient()

    def detect_intent_from_text(self, session_id: str, text: str):
        session = self.session_client.session_path(self.project_id, session_id)

        text_input = dialogflow.types.TextInput(
            text=text, language_code='en-US')
        query_input = dialogflow.types.QueryInput(text=text_input)

        response = self.session_client.detect_intent(
            session=session, query_input=query_input)

        return response.query_result

    def detect_intent_from_event(self, session_id: str, event_name: str, parameters_dict: dict = None):
        session = self.session_client.session_path(self.project_id, session_id)

        event_input = dialogflow.types.EventInput(
            name=event_name, parameters=parameters_dict)
        query_input = dialogflow.types.QueryInput(event=event_input)

        response = self.session_client.detect_intent(
            session=session, query_input=query_input)

        return response.query_result


class Message(BaseModel):
    text: str


class WebhookRequest(BaseModel):
    session: str
    queryResult: dict


class WebhookResponse:
    def __init__(self, fulfillment_text: str, parameters_dict: dict = None, fulfillment_messages: List[dict] = None):
        self.fulfillment_text = fulfillment_text
        self.parameters_dict = parameters_dict
        self.fulfillment_messages = fulfillment_messages

    def to_dict(self):
        response_dict = {'fulfillmentText': self.fulfillment_text}

        if self.parameters_dict:
            response_dict['outputContexts'] = [{
                'name': f"projects/{project_id}/agent/sessions/{session_id}/contexts/context_name",
                'lifespanCount': 5,
                'parameters': self.parameters_dict
            }]

        if self.fulfillment_messages:
            response_dict['fulfillmentMessages'] = self.fulfillment_messages

        return response_dict


app = FastAPI()
project_id = 'PROJECT_ID'
dialogflow_connector = DialogflowConnector(project_id)


@app.post('/webhook')
async def webhook(request: Request):
    request_json = await request.json()
    webhook_request = WebhookRequest(**request_json)
    session_id = webhook_request.session.split('/')[-1]
    query_result = webhook_request.queryResult

    response_text = 'Hello World!'
    webhook_response = WebhookResponse(fulfillment_text=response_text)
    return webhook_response.to_dict()


@app.post('/send_message')
async def send_message(message: Message, session_id: str):
    query_result = dialogflow_connector.detect_intent_from_text(
        session_id=session_id, text=message.text)
    response_text = query_result.fulfillment_text
    webhook_response = WebhookResponse(fulfillment_text=response_text)
    return webhook_response.to_dict()


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=7000)
