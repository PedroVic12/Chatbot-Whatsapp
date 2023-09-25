const { NlpManager } = require('node-nlp');
const Sentiment = require('sentiment');
const fs = require('fs');
const readline = require('readline');


//TODO Robo tem que ter um botão: “voltar” e começar tudo novamente e usar isso com o nlp


class MewTwo {
    constructor() {
        this.initializeProperties();
        this.initializeNLP();
    }

    initializeProperties() {
        this.sentimento = new Sentiment();
        this.counter = 0;
        this.conversation = [];
    }

    initializeNLP() {
        this.manager = new NlpManager({ languages: ['pt'] });
        this.addTrainingData();
        this.manager.train();
    }

    addTrainingData() {
        const { intents, responses } = this.getIntentsAndResponses();
        for (const intent in intents) {
            intents[intent].forEach(phrase => this.manager.addDocument('pt', phrase, intent));
            responses[intent].forEach(response => this.manager.addAnswer('pt', intent, response));
        }
    }

    getIntentsAndResponses() {
        return {
            intents: {
                saudacao: ['boa noite', 'boa tarde', 'bom dia', 'alo', 'olá', 'oi', 'hello'],

                despedida: ['obrigado e tchau', 'te vejo mais tarde', 'aguardo o pedido'],

                pedido: ['fazer pedido', 'fazer um pedido', 'fazer um pedido de delivery', 'fazer um delivery', 'entregar comida', 'entrega de comida', 'entregar pizza'],

                estagio1: ['iniciar', 'começar', 'olá de novo'],
                estagio2: ['meu nome é', 'chamo-me', 'telefone é'],
                estagio3: ['cardápio', 'ver menu', 'opções de pedido'],
                estagio4: ['escolher produto', 'quero uma pizza'],
                estagio5: ['endereço é', 'entregar em', 'morada'],
                estagio6: ['complemento é', 'apartamento', 'bloco'],
                estagio7: ['pagar com', 'forma de pagamento', 'dinheiro ou cartão'],
                estagio8: ['confirmar pedido', 'tudo certo', 'finalizar pedido'],
                estagio9: ['pedido foi entregue?', 'status do pedido', 'pedido está pronto?'],

                reclamacao: ['não gostei', 'teve um problema', 'quero reclamar'],

                //erro: ['Fiz meu pedido errado', 'Preciso ajustar meu pedido', 'To com erro'],

                elogio: ['adorei', 'excelente serviço', 'muito bom'],

                ajuda: ['não entendi', 'como funciona?', 'me ajude']
            },
            responses: {
                saudacao: ['Olá, como posso ajudar você?', 'Oi, tudo bem?'],
                despedida: ['Até logo!', 'Aguardo seu próximo pedido!'],
                pedido: ['Você gostaria de fazer um pedido?', 'Faça seu pedido com calma'],
                estagio1: ['Bem-vindo de volta! Como posso ajudar?'],
                estagio2: ['Qual é o seu nome e telefone?'],
                estagio3: ['Aqui está o nosso menu. O que você gostaria?'],
                estagio4: ['Qual produto você gostaria de escolher?'],
                estagio5: ['Por favor, forneça o seu endereço de entrega.'],
                estagio6: ['Há algum complemento para o seu endereço?'],
                estagio7: ['Como você gostaria de pagar?'],
                estagio8: ['Por favor, confirme seu pedido.'],
                estagio9: ['Seu pedido está sendo preparado.'],
                reclamacao: ['Lamento ouvir isso. Por favor, nos dê mais detalhes para que possamos ajudar.'],
                elogio: ['Muito obrigado pelo seu feedback positivo!'],
                ajuda: ['Claro! Como posso ajudar você hoje?']
            }
        };
    }

    saveConversationToCSV() {
        let dataCSV = "Mensagem\n";
        this.conversation.forEach(message => dataCSV += `"${message}"\n`);
        fs.writeFileSync('repository/mensagens.csv', dataCSV, 'utf-8');
        console.log("Conversa salva no arquivo CSV!");
    }

    storeMessage(message) {
        if (message && message.trim() !== "") {
            this.conversation.push(message);
        } else {
            console.warn('Mensagem inválida recebida: ', message);
        }
    }

    async processIntent(text) {
        this.counter++;
        return await this.manager.process('pt', text);
    }

    analyzeSentiments(text) {
        try {
            return this.sentimento.analyze(text);
        } catch (error) {
            console.warn('Não foi possível analisar os sentimentos: ', error);
        }
    }

    generateDynamicResponse(intent) {
        switch (intent) {
            case 'saudacao':
                return 'Olá, como posso ajudar você?';
            case 'despedida':
                return 'Até logo!';
            case 'pedido':
                return 'Você gostaria de fazer um pedido?';
            default:
                return 'Desculpa nao entendi, voce quis dizer [opção1,opção2,opção3]?';
        }
    }

    runChatbot() {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        const interact = async () => {
            rl.question('Digite uma mensagem (ou "sair" para encerrar): ', async userInput => {
                if (userInput.toLowerCase() === 'sair') {
                    this.saveConversationToCSV();
                    rl.close();
                    return;
                }

                const intentResponse = await this.processIntent(userInput);
                const sentimentsAnalysis = this.analyzeSentiments(userInput);
                const dynamicResponse = this.generateDynamicResponse(intentResponse.intent);

                // Mostrando a resposta da intenção, análise de sentimentos e resposta dinâmica no terminal
                console.log('\n\nResposta da Intenção: ', intentResponse);
                console.log('\n\nAnálise de Sentimentos: ', sentimentsAnalysis);
                console.log('\n\nResposta Dinâmica: ', dynamicResponse);

                // Armazenando a mensagem do usuário
                this.storeMessage(userInput);
                this.storeMessage(userInput);

                interact();
            });
        };
        interact();
    }
}

// Exportação e Inicialização do MewTwo
module.exports = MewTwo;
const mewTwo = new MewTwo();
mewTwo.runChatbot();

