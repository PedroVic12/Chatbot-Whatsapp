import datetime
import pytz
from google.oauth2 import service_account
from googleapiclient.errors import HttpError
from googleapiclient.discovery import build

SCOPES = ['https://www.googleapis.com/auth/calendar']
SERVICE_ACCOUNT_FILE = '/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Agendamento de Clientes/Chatbot-JS/chabot-370717-ecc506aa3bca.json'
CALENDAR_ID = 'primary'


class AgendaGoogle:
    def __init__(self, timezone):
        self.timezone = timezone
        self.credentials = service_account.Credentials.from_service_account_file(
            SERVICE_ACCOUNT_FILE, scopes=SCOPES)
        self.service = build('calendar', 'v3', credentials=self.credentials)

    def criar_evento(self, inicio, fim, nome, descricao):
        evento = {
            'summary': nome,
            'description': descricao,
            'start': {
                'dateTime': inicio.strftime('%Y-%m-%dT%H:%M:%S'),
                'timeZone': self.timezone,
            },
            'end': {
                'dateTime': fim.strftime('%Y-%m-%dT%H:%M:%S'),
                'timeZone': self.timezone,
            },
        }

        try:
            evento_criado = self.service.events().insert(
                calendarId=CALENDAR_ID, body=evento).execute()
            return evento_criado['id']
        except HttpError as error:
            print(f'Ocorreu um erro: {error}')
            return None

    def remover_evento(self, evento_id):
        try:
            self.service.events().delete(calendarId=CALENDAR_ID, eventId=evento_id).execute()
        except HttpError as error:
            print(f'Ocorreu um erro: {error}')
