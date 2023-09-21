const { NlpManager } = require('node-nlp');
const Sentiment = require('sentiment');
const fs = require('fs');
const readline = require('readline');

// Classe principal do Chatbot
class MewTwo {
    constructor() {
        this.initializeProperties();
        this.initializeNLP();
    }

    // -------------- Inicialização --------------
    initializeProperties() {
        this.sentimento = new Sentiment();
        this.contador = 0;
        this.conversa = [[], [], [], [], [], [], [], [], [], []];
    }

    initializeNLP() {
        this.manager = new NlpManager({ languages: ['pt'] });
        this.addTrainingData();
        this.manager.train();
    }

    // -------------- Treinamento de NLP --------------
    addTrainingData() {
        const intentsAndResponses = this.getIntentsAndResponses();
        for (const intent in intentsAndResponses.intents) {
            intentsAndResponses.intents[intent].forEach(phrase => this.manager.addDocument('pt', phrase, intent));
            intentsAndResponses.responses[intent].forEach(response => this.manager.addAnswer('pt', intent, response));
        }
    }

    getIntentsAndResponses() {
        // Adicione seus intents e responses aqui
        return {
            intents: {
                // exemplo: ['exemplo frase 1', 'exemplo frase 2'],
            },
            responses: {
                // exemplo: ['exemplo resposta 1', 'exemplo resposta 2'],
            }
        };
    }

    // -------------- Gerenciamento de CSV --------------
    saveConversationToCSV() {
        let dataCSV = "Mensagem\n";
        this.conversa.forEach(subArray => subArray.forEach(message => dataCSV += `"${message}"\n`));
        fs.writeFileSync('repository/mensagens.csv', dataCSV, 'utf-8');
        console.log("Conversa salva no arquivo CSV!");
    }

    // -------------- Gerenciamento de Mensagens --------------
    storeMessage(message, counter) {
        if (message && message.trim() !== "" && this.conversa[counter]) {
            this.conversa[counter].push(message);
        } else {
            console.warn('Mensagem inválida ou índice inválido recebido: ', message, counter);
        }
    }

    // -------------- Processamento de Intenções --------------
    async processIntent(text) {
        this.counter++;
        return await this.manager.process('pt', text);
    }

    // -------------- Análise de Sentimentos --------------
    analyzeSentiments(text) {
        try {
            return this.sentimento.analyze(text);
        } catch (error) {
            console.warn('Não foi possível analisar os sentimentos: ', error);
        }
    }

    // -------------- Geração de Respostas Dinâmicas --------------
    generateDynamicResponse(intent) {
        const responses = {
            // Adicione suas respostas dinâmicas aqui, exemplo:
            // 'exemplo': 'Exemplo de resposta dinâmica',
        };
        return responses[intent] || 'Desculpa, não entendi.';
    }

    // -------------- Execução do Chatbot --------------
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

                this.storeMessage(userInput, this.counter);
                this.counter++;

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
