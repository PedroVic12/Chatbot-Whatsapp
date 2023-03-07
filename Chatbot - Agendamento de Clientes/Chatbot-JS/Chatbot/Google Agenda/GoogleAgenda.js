const { google } = require('googleapis');

class GoogleCalendar {
    constructor() {
        this.scopes = 'https://www.googleapis.com/auth/calendar';
        this.clientEmail = 'bot-agendamento@chabot-370717.iam.gserviceaccount.com';
        this.privateKey = 'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDG+y1vpcI3ttmF\nxbUpnCicT7fGnJ4NSp4T0pwUZYh8cnVMJaEqSbh2L+c/AAr4N0hAAgQNx09EGhgs\ngPT+o8wRWiQC5r7xim9U90rWHq0z7Mw3zFfuaO3yPvqZY9WO+2Tp9ijjCpmZbEb9\nkIYSgPRPFZb56TedM24JoyIDGXxRsUghjEAWHoD+4snY4lyrvZv8PnK6Hi245Y+Q\ntmq8AuJ17BNlISS+J6rsRCejO+2hkvZdLVb87vWiXyK9O27M4y29TnxE3gqhj9hK\noOGNaotv5BfvZpbsglq48dOEF/+ZxAFH4QQm00EliSMPJ57HmDgUz60lILceise5\nl01cPHwVAgMBAAECggEAIiRFBowth/vC1RY4YHxf53oyMUz8PZGZEBOqHkHRqnDF\nOZyXS7c8hGLxzbiHKVHq/riZ03doXWoQzcoOv4aBZFTQKwNGrhEvyydnWtgGpgsy\nezx/tfOhKFiwDRO5OABgr1hCabqO4mlWwPlEV/ZydQNiVV0z4rBJaDPqiRedYjK4\nDRzfbDKAP8V37MsZCVeJ34SIFdk14QvauzSF+nWjz94jaWUE6qorU5WD9UOK/xmF\nSohr589ecprPHiNDDx31xftO1SPxsgJWaYAjbYu8YoOUULEOs5JnsyYqjTwZjeq2\nH44B0Vjr1WxvEJTyHZBik0EH1gG7pFE/xEFTAvum/QKBgQD96gT7yfFeHI+J1mPM\nx1QNK0YxYcO2et3AsgrB6Z7dIgqqFTk3n4CBPgQyTJoad1mTZE5SAiMef9MJz8aN\n3NqISJtgEeCHzSoXVmsh3UrJBj3vsXhhZYn2VMnZWNq7a/3xVkyQmjhsnKKWA/Z9\nrmKdyZ4W7aQH0Fc7ldjq1KpYTwKBgQDInaJYgwsXZ2t09OzvFpj5UBWEp5I5oe6u\nClRNqyDsl7NZnUyoQsHj0YR4fxkcbtnUhq9iOPxe9J+AAwHLMBK753WlpeqeiVxu\n14M+qMovUWeIYAw6Yn9LnAyHVGhYAeAa9Mlw/c06swLQltBEq2wCbqBFfSMWS9YR\n1LjS8IFoWwKBgDuVdfPsEKLoCtrqn2LHh7bLZ95gtb+Vl4IHhbS5cNktitkcv9+I\no2wwtGVlSmhZh4Cp8iMWc01N66UKx+o0YGfIugVSTKExiOYPFnbM6ibAOzqLJ9eb\nL0PJ49AIJNQEZIQEn1Tzi7gZDaIsbeRSTrv+OwXgYDShNEc8Q7nfi9XLAoGALO/i\nZaE04tEvqMsUJ5oQOghOSaCfiHlVVXbK23rxrQ1uByzM9wO9GqLb4YHWxh+ue4SP\n1JifL0XsVGhYBoOGLsDyAWDg5RIvukRcCbUVVPQPFOUu2AUoLm+N/uJRXSVOZbtf\nRAgV6IggoUim7jrXvtO44tfc/CmQkf3sSJPG6PECgYB37UtOtcg6gySNRp2S9Vw5\n66h98QJqKEp+ncEG6v5BA5Z9ycO1BE2DUCP4jIwL3Pn+G2UrA4e4kTWzMH+Hd77c\ndlp83fgO+wHrfJcMdilGSb0DOYqtsUGrzXT1B3nRIEv5apNaTKJgEx0IWhJRWqZw\nGsBQ2/FSI+mTwoOa7oBuwg==';
        this.projectNumber = '618403188001';
        this.calendarId = 'c_4d13ef860af70d745b52aa97c9e21722cc879cb28c62e2b57239da42f7a278cb@group.calendar.google.com';

        this.jwtClient = new google.auth.JWT(
            this.clientEmail,
            null,
            this.privateKey,
            this.scopes
        );
        this.calendar = google.calendar({
            version: 'v3',
            project: this.projectNumber,
            auth: this.jwtClient
        });
    }

    async listarEventos() {
        const result = await this.calendar.events.list({
            calendarId: this.calendarId,
            timeMin: (new Date()).toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime',
        });
        if (result.data.items.length) {
            return { eventos: result.data.items };
        } else {
            return { mensagem: 'Nenhum evento futuro encontrado.' };
        }
    }

    async criarEvento() {
        const event = {
            'summary': 'Meu primeiro evento!',
            'location': 'Hyderabad, Índia',
            'description': 'Primeiro evento com nodeJS!',
            'start': {
                'dateTime': '2022-01-12T09:00:00-07:00',
                'timeZone': 'Asia/Dhaka',
            },
            'end': {
                'dateTime': '2022-01-14T17:00:00-07:00',
                'timeZone': 'Asia/Dhaka',
            },
            'attendees': [],
            'reminders': {
                'useDefault': false,
                'overrides': [
                    { 'method': 'email', 'minutes': 24 * 60 },
                    { 'method': 'popup', 'minutes': 10 },
                ],
            },
        };

        const auth = new google.auth.GoogleAuth({
            keyFile: '/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Agendamento de Clientes/Chatbot-JS/credencials/credentials.json',
            scopes: 'https://www.googleapis.com/auth/calendar',
        });
        const client = await auth.getClient();
        const result = await this.calendar.events.insert({
            auth: client,
            calendarId: this.calendarId,
            resource: event,
        });
        console.log('Evento criado: %s', result.data);
        return "Evento criado com sucesso!";
    }
}

const googleCalendar = new GoogleCalendar();

googleCalendar.listarEventos().then((result) => {
    console.log(result);
});