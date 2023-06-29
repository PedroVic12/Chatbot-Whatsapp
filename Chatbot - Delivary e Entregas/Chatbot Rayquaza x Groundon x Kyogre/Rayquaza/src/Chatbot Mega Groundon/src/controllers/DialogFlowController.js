/*
npm install express
npm install http
npm install dialogflow-fulfillment
npm install @google-cloud/dialogflow
npm install actions-on-google
*/


const GroundonController = require('./GroundonController');
const express = require('express');
const dialogflow = require('@google-cloud/dialogflow');
const { WebhookClient } = require('dialogflow-fulfillment');

class DialogFlow extends GroundonController {
    constructor() {
        super();
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

        const responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;
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

    start_DialogFlow() {
        this.whatsapp.onMessage(async (msg) => {
            if (msg.type === 'chat') {
                let texto_resposta = await this.executeQueries('chatbot-whatsapp-ae5f0', msg.from, [msg.body], 'pt-BR');
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
                    msg.from,
                    'SEJA BEM VINDO',
                    'venom-bot',
                    '\nSelecione uma opção: \n' + msg.body + '\n',
                    'CLIQUE AQUI',
                    list_dialog
                );
            }
        });
    }
}

const dialogFlow = new DialogFlow();
dialogFlow.start_DialogFlow();
