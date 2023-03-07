const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const { authenticate } = require('@google-cloud/local-auth');
const { google } = require('googleapis');
const calendar = google.calendar({ version: 'v3' });

//! Rodar no terminal
// npm install googleapis@105 @ google-cloud/local-auth@2.1.0 - -save
const ID_CALENDARIO = 'c_4d13ef860af70d745b52aa97c9e21722cc879cb28c62e2b57239da42f7a278cb@group.calendar.google.com';
const scopes_calendar = ['https://www.googleapis.com/auth/calendar'];
const privateKey = 'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDG+y1vpcI3ttmF\nxbUpnCicT7fGnJ4NSp4T0pwUZYh8cnVMJaEqSbh2L+c/AAr4N0hAAgQNx09EGhgs\ngPT+o8wRWiQC5r7xim9U90rWHq0z7Mw3zFfuaO3yPvqZY9WO+2Tp9ijjCpmZbEb9\nkIYSgPRPFZb56TedM24JoyIDGXxRsUghjEAWHoD+4snY4lyrvZv8PnK6Hi245Y+Q\ntmq8AuJ17BNlISS+J6rsRCejO+2hkvZdLVb87vWiXyK9O27M4y29TnxE3gqhj9hK\noOGNaotv5BfvZpbsglq48dOEF/+ZxAFH4QQm00EliSMPJ57HmDgUz60lILceise5\nl01cPHwVAgMBAAECggEAIiRFBowth/vC1RY4YHxf53oyMUz8PZGZEBOqHkHRqnDF\nOZyXS7c8hGLxzbiHKVHq/riZ03doXWoQzcoOv4aBZFTQKwNGrhEvyydnWtgGpgsy\nezx/tfOhKFiwDRO5OABgr1hCabqO4mlWwPlEV/ZydQNiVV0z4rBJaDPqiRedYjK4\nDRzfbDKAP8V37MsZCVeJ34SIFdk14QvauzSF+nWjz94jaWUE6qorU5WD9UOK/xmF\nSohr589ecprPHiNDDx31xftO1SPxsgJWaYAjbYu8YoOUULEOs5JnsyYqjTwZjeq2\nH44B0Vjr1WxvEJTyHZBik0EH1gG7pFE/xEFTAvum/QKBgQD96gT7yfFeHI+J1mPM\nx1QNK0YxYcO2et3AsgrB6Z7dIgqqFTk3n4CBPgQyTJoad1mTZE5SAiMef9MJz8aN\n3NqISJtgEeCHzSoXVmsh3UrJBj3vsXhhZYn2VMnZWNq7a/3xVkyQmjhsnKKWA/Z9\nrmKdyZ4W7aQH0Fc7ldjq1KpYTwKBgQDInaJYgwsXZ2t09OzvFpj5UBWEp5I5oe6u\nClRNqyDsl7NZnUyoQsHj0YR4fxkcbtnUhq9iOPxe9J+AAwHLMBK753WlpeqeiVxu\n14M+qMovUWeIYAw6Yn9LnAyHVGhYAeAa9Mlw/c06swLQltBEq2wCbqBFfSMWS9YR\n1LjS8IFoWwKBgDuVdfPsEKLoCtrqn2LHh7bLZ95gtb+Vl4IHhbS5cNktitkcv9+I\no2wwtGVlSmhZh4Cp8iMWc01N66UKx+o0YGfIugVSTKExiOYPFnbM6ibAOzqLJ9eb\nL0PJ49AIJNQEZIQEn1Tzi7gZDaIsbeRSTrv+OwXgYDShNEc8Q7nfi9XLAoGALO/i\nZaE04tEvqMsUJ5oQOghOSaCfiHlVVXbK23rxrQ1uByzM9wO9GqLb4YHWxh+ue4SP\n1JifL0XsVGhYBoOGLsDyAWDg5RIvukRcCbUVVPQPFOUu2AUoLm+N/uJRXSVOZbtf\nRAgV6IggoUim7jrXvtO44tfc/CmQkf3sSJPG6PECgYB37UtOtcg6gySNRp2S9Vw5\n66h98QJqKEp+ncEG6v5BA5Z9ycO1BE2DUCP4jIwL3Pn+G2UrA4e4kTWzMH+Hd77c\ndlp83fgO+wHrfJcMdilGSb0DOYqtsUGrzXT1B3nRIEv5apNaTKJgEx0IWhJRWqZw\nGsBQ2/FSI+mTwoOa7oBuwg==';
const clientEmail = 'bot-agendamento@chabot-370717.iam.gserviceaccount.com';
const projectNumber = '618403188001';

class GoogleAgenda {
    constructor() {
        this.SCOPES = ['https://www.googleapis.com/auth/calendar'];
        this.TOKEN_PATH = path.join(process.cwd(), 'token.json');
        this.CREDENTIALS_PATH = path.join(process.cwd(), 'credencials/keys_kyogre.json');
        this.authClient = null;
        this.calendar = null;
    }

    async authorize() {
        try {
            let client = await this.loadSavedCredentialsIfExist();
            if (client) {
                this.authClient = client;
            } else {
                client = await authenticate({
                    scopes: this.SCOPES,
                    keyfilePath: this.CREDENTIALS_PATH,
                });
                if (client.credentials) {
                    await this.saveCredentials(client);
                    this.authClient = client;
                }
            }
            this.calendar = google.calendar({ version: 'v3', auth: this.authClient });
            return '\nAuthorização realizada com sucesso!\n'
        } catch (err) {
            console.log(`\n\nError authorizing Google Calendar: ${err}`);
            throw err;
        }
    }

    async loadSavedCredentialsIfExist() {
        try {
            const content = await fs.readFile(this.TOKEN_PATH);
            const credentials = JSON.parse(content);
            return google.auth.fromJSON(credentials);
        } catch (err) {
            return null;
        }
    }

    async saveCredentials(client) {
        const content = await fs.readFile(this.CREDENTIALS_PATH);
        const keys = JSON.parse(content);
        const key = keys.installed || keys.web;
        const payload = JSON.stringify({
            type: 'authorized_user',
            client_id: key.client_id,
            client_secret: key.client_secret,
            refresh_token: client.credentials.refresh_token,
        });
        await fs.writeFile(this.TOKEN_PATH, payload);
    }

    async checkPermissions() {
        try {
            const res = await this.calendar.acl.list({ calendarId: ID_CALENDARIO });
            console.log('Permissions:', res.data.items);
        } catch (err) {
            console.log(`Error checking permissions: ${err}`);
            throw err;
        }
    }

    //!MÉTODOS PARA AGENDAMENTO DE EVENTOS

    async listarEventos() {
        try {
            const response = await this.calendar.events.list({
                calendarId: 'c_4d13ef860af70d745b52aa97c9e21722cc879cb28c62e2b57239da42f7a278cb@group.calendar.google.com',
                timeMin: (new Date()).toISOString(),
                maxResults: 10,
                singleEvents: true,
                orderBy: 'startTime',
            });
            console.log('Eventos:');
            const events = response.data.items;
            if (events.length) {
                events.map((event, i) => {
                    const start = event.start.dateTime || event.start.date;
                    console.log(`${i + 1}. ${event.summary} - ${start}`);
                });
            } else {
                console.log('Não há eventos próximos.');
            }
        } catch (err) {
            console.log(`Erro ao listar eventos: ${err}`);
            throw err;
        }
    }



    async criarEvento(data, hora, summary, description) {
        const startDateTime = new Date(data);
        startDateTime.setHours(hora);
        startDateTime.setMinutes(0);
        startDateTime.setSeconds(0);

        const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);

        const event = {
            'summary': summary,
            'location': 'Local do Evento',
            'description': description,

        };

        try {
            const response_event = await this.calendar.events.insert({
                auth: this.authClient,
                calendarId: 'c_4d13ef860af70d745b52aa97c9e21722cc879cb28c62e2b57239da42f7a278cb@group.calendar.google.com',
                resource: event,
            });
            console.log('Evento criado: %s', response_event.data.htmlLink);
        } catch (err) {
            console.error('Erro ao criar o evento: ', err);
        }
    }

    async removeEvent(eventId) {
        try {
            const response = await this.calendar.events.delete({
                calendarId: 'primary',
                eventId: eventId,
            });
            console.log(`Event deleted: ${eventId}`);
            return response.data;
        } catch (err) {
            console.log(`Error deleting event: ${err}`);
            throw err;
        }
    }
}


module.exports = GoogleAgenda;

const agenda = new GoogleAgenda();

// Autoriza a aplicação
agenda.authorize().then(async () => {

    // Lista os eventos
    try {
        await agenda.listarEventos();
    } catch (err) {
        console.error(`Erro ao listar eventos: ${err}`);
    }

    agenda.checkPermissions();

    // Cria o evento

    // Define as informações do evento
    const summary = 'Reunião com o time de desenvolvimento';
    const description = 'Reunião para discutir o progresso do projeto';
    const data = '2023-02-28';
    const hora = 10;

    // try {
    //     await agenda.criarEvento('2023-03-10', 14, 'Reunião com o time de desenvolvimento', 'Reunião para discutir o progresso do projeto');
    //     console.log(`Evento criado com sucesso: ${summary} `);
    // } catch (err) {
    //     console.error(`Erro ao criar evento: ${err}`);
    // }



});



