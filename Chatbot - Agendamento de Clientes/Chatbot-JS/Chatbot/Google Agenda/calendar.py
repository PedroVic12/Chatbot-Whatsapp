import datetime
import pytz
from google.oauth2 import service_account
from googleapiclient.errors import HttpError
from googleapiclient.discovery import build


# Autenticação e autorização
SCOPES = ['https://www.googleapis.com/auth/calendar']
SERVICE_ACCOUNT_FILE = '/path/to/service_account.json' # substitua pelo caminho do seu arquivo JSON de credenciais de serviço

credentials = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_FILE, scopes=SCOPES)


# Acessando a API do Google Agenda
service = build('calendar', 'v3', credentials=credentials)


# Consultando a disponibilidade de horários
def check_availability(start_time, end_time):
    start_time = start_time.astimezone(pytz.UTC).strftime('%Y-%m-%dT%H:%M:%S.%fZ')
    end_time = end_time.astimezone(pytz.UTC).strftime('%Y-%m-%dT%H:%M:%S.%fZ')

    events_result = service.events().list(calendarId='primary', timeMin=start_time, timeMax=end_time, singleEvents=True, orderBy='startTime').execute()
    events = events_result.get('items', [])

    if not events:
        print('Não há eventos agendados para o período especificado.')
        return True

    print('Horários ocupados:')
    for event in events:
        start = event['start'].get('dateTime', event['start'].get('date'))
        print(f'{start} - {event["summary"]}')
        return False


# Adicionando um novo evento de agendamento
def add_event(summary, start_time, end_time):
    event = {
        'summary': summary,
        'start': {
            'dateTime': start_time.astimezone(pytz.UTC).strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
            'timeZone': 'America/Sao_Paulo',
        },
        'end': {
            'dateTime': end_time.astimezone(pytz.UTC).strftime('%Y-%m-%dT%H:%M:%S.%fZ'),
            'timeZone': 'America/Sao_Paulo',
        },
    }

    event = service.events().insert(calendarId='primary', body=event).execute()
    print(f'Evento adicionado: {event["htmlLink"]}')
