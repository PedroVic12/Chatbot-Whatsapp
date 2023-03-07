const { google } = require('googleapis');
const calendar = google.calendar({ version: 'v3' });

// Função para criar um evento no Google Agenda
async function criarEvento(data, hora) {
    const startDateTime = new Date(data);
    startDateTime.setHours(hora);
    startDateTime.setMinutes(0);
    startDateTime.setSeconds(0);

    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);

    const event = {
        'summary': 'Evento criado via API',
        'location': 'Local do Evento',
        'description': 'Descrição do Evento',
        'start': {
            'dateTime': startDateTime.toISOString(),
            'timeZone': 'America/Sao_Paulo',
        },
        'end': {
            'dateTime': endDateTime.toISOString(),
            'timeZone': 'America/Sao_Paulo',
        },
    };

    try {
        const response = await calendar.events.insert({
            auth: auth,
            calendarId: 'primary',
            resource: event,
        });
        console.log('Evento criado: %s', response.data.htmlLink);
    } catch (err) {
        console.error('Erro ao criar o evento: ', err);
    }
}

// Função para listar os eventos do Google Agenda

async function main() {
    
    

}