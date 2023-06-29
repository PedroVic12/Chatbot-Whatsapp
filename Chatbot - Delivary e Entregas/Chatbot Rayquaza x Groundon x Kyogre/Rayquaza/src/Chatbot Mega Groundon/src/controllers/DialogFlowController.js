const express = require('express');
const { WebhookClient } = require('dialogflow-fulfillment');
const dialogflow = require('@google-cloud/dialogflow');
const GroundonController = require('./GroundonController');

class DialogFlow extends GroundonController {
    constructor() {
        super()
        this.app = express();
        this.app.post('/webhook', this.handleWebhookRequest.bind(this));
    }

    async handleWebhookRequest(request, response) {
        const agent = new WebhookClient({ request, response });
        let intentMap = new Map();
        intentMap.set('nome_da_intencao', this.nameFunction.bind(this));
        await agent.handleRequest(intentMap);
    }

    async nameFunction(agent) {
        // Implemente a lógica da função aqui
        const responseText = 'Resposta da intenção nome_da_intencao';
        agent.add(responseText);
    }

    async detectIntent(projectId, sessionId, query, contexts, languageCode) {
        const sessionClient = new dialogflow.SessionsClient({ keyFilename: 'file_name.json' });
        const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: query,
                    languageCode: languageCode
                }
            }
        };

        const [response] = await sessionClient.detectIntent(request);
        const result = response.queryResult;
        return result;
    }

    async executeQueries(projectId, sessionId, queries, languageCode) {
        let responses = [];
        for (const query of queries) {
            const response = await this.detectIntent(projectId, sessionId, query, [], languageCode);
            responses.push(response);
        }
        return responses;
    }

    start_webhook() {
        const port = 5000;
        this.app.listen(port, () => {
            console.log(`DialogFlow webhook server is listening on port ${port}`);
        });
    }


    async start_DialogFlow() {
        await this.conectarWpp();


        this.whatsapp.onMessage(async (message) => {
            if (message.body === 'lista') {
                let texto_resposta = await this.executeQueries('chatbot-whatsapp-ae5f0', message.from, [message.body], 'pt-BR');
                const args = texto_resposta.split('|');
                const link1 = args[0].split('>');
                const link2 = args[1].split('>');

                const list_dialog = [
                    {
                        title: 'Escolha uma opção',
                        rows: [
                            {
                                title: link1[0],
                                description: link1[1]
                            },
                            {
                                title: link2[0],
                                description: link2[1]
                            }
                        ]
                    }
                ];

                this.whatsapp.sendListMenu(
                    message.from,
                    'SEJA BEM VINDO',
                    'venom-bot',
                    '\nSelecione uma opção: \n' + message.body + '\n',
                    'CLIQUE AQUI',
                    list_dialog
                );
            }
        });
    }
}

module.exports = DialogFlow;


// Exemplo de uso
function run_dialog() {
    const dialogFlow = new DialogFlow();
    dialogFlow.start_webhook();
    dialogFlow.start_DialogFlow()
}

