from __future__ import print_function

import datetime
import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']


class GoogleAgenda:
    def __init__(self, calendar_id):
        self.calendar_id = calendar_id
        self.creds = self.autenticarApi()

    def autenticarApi(self):
        creds = None
        if os.path.exists('token.json'):
            creds = Credentials.from_authorized_user_file(
                'token.json', SCOPES)
        if not creds or not creds.valid:
            if creds and creds.expired and creds.refresh_token:
                creds.refresh(Request())
            else:
                flow = InstalledAppFlow.from_client_secrets_file(
                    'credencials/credentials.json', SCOPES)
                creds = flow.run_local_server(port=0)
            with open('token.json', 'w') as token:
                token.write(creds.to_json())
        return creds

    def check_permissions(self):
        try:
            service = build('calendar', 'v3', credentials=self.creds)
            acl = service.acl().list(calendarId=self.calendar_id).execute()
            for rule in acl['items']:
                if rule.get('role') in ['owner', 'writer']:
                    return True
            return False
        except HttpError as error:
            print('An error occurred: %s' % error)

    def list_events(self):
        try:
            service = build('calendar', 'v3', credentials=self.creds)
            now = datetime.datetime.utcnow().isoformat() + 'Z'
            print('Getting the upcoming 10 events')
            events_result = service.events().list(calendarId=self.calendar_id, timeMin=now,
                                                  maxResults=10, singleEvents=True,
                                                  orderBy='startTime').execute()
            events = events_result.get('items', [])
            if not events:
                print('No upcoming events found.')
                return
            for event in events:
                start = event['start'].get(
                    'dateTime', event['start'].get('date'))
                print(start, event['summary'])
        except HttpError as error:
            print('An error occurred: %s' % error)

    def criarEvento(self, data, hora, summary, description):
        try:
            service = build('calendar', 'v3', credentials=self.creds)
            event = {
                'summary': summary,
                'description': description,
                'start': {
                    'dateTime': f'{data}T{hora}:00-03:00',
                    'timeZone': 'America/Sao_Paulo',
                },
                'end': {
                    'dateTime': f'{data}T{hora}:30-03:00',
                    'timeZone': 'America/Sao_Paulo',
                },
            }
            event = service.events().insert(calendarId=self.calendar_id, body=event).execute()
            print(f'Event created: {event.get("htmlLink")}')
        except HttpError as error:
            print('An error occurred: %s' % error)


if __name__ == '__main__':
    calendar_id = 'c_4d13ef860af70d745b52aa97c9e21722cc879cb28c62e2b57239da42f7a278cb@group.calendar.google.com'
    calendar = GoogleAgenda(calendar_id)
    calendar.autenticarApi()
    calendar.check_permissions()

    # Funções de eventos
    calendar.list_events()
    #calendar.criarEvento('2021-09-01', '10:00', 'Reunião com os desenvolvedores', 'Vai trabalhar vagabundo!')
