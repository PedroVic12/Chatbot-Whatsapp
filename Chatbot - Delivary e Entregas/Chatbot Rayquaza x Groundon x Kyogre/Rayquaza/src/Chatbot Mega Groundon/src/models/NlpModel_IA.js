const { NlpManager } = require('node-nlp');
const Sentiment = require('sentiment');
const Groundon = require('./Groundon');

class MewTwo {
    constructor() {
        this.manager = new NlpManager({ languages: ['pt'] });
        this.sentimento = new Sentiment();
        this.contador = 0;
        this.conversa = [[], [], [], [], [], [], [], [], [], []];
    }

    adicionarDadosTreinamento() {
        // Adicione dados de treinamento
        this.manager.addDocument('pt', 'boa noite', 'saudacao');
        this.manager.addDocument('pt', 'boa tarde', 'saudacao');
        this.manager.addDocument('pt', 'bom dia', 'saudacao');
        this.manager.addDocument('pt', 'alo', 'saudacao');
        this.manager.addDocument('pt', 'olá', 'saudacao');
        this.manager.addDocument('pt', 'oi', 'saudacao');
        this.manager.addDocument('pt', 'hello', 'saudacao');

        this.manager.addDocument('pt', 'obrigado e tchau', 'despedida');
        this.manager.addDocument('pt', 'te vejo mais tarde', 'despedida');
        this.manager.addDocument('pt', 'aguardo o pedido', 'despedida');


        // DADOS DE DELIVERY
        this.manager.addDocument('pt', 'fazer pedido', 'pedido');
        this.manager.addDocument('pt', 'fazer um pedido', 'pedido');
        this.manager.addDocument('pt', 'fazer um pedido de delivery', 'pedido');
        this.manager.addDocument('pt', 'fazer um delivery', 'pedido');
        this.manager.addDocument('pt', 'entregar comida', 'pedido');
        this.manager.addDocument('pt', 'entrega de comida', 'pedido');
        this.manager.addDocument('pt', 'entregar pizza', 'pedido');

        // Adicione respostas
        this.manager.addAnswer('pt', 'saudacao', 'Olá, como posso ajudar você?');
        this.manager.addAnswer('pt', 'saudacao', 'Oi, tudo bem?');
        this.manager.addAnswer('pt', 'despedida', 'Até logo!');
        this.manager.addAnswer('pt', 'despedida', 'Aguardo seu próximo pedido!');

        // Treine o modelo
        this.manager.train();
    }

    async processarIntencao(texto) {
        this.contador++; // Incrementa o contador sempre que processa uma intenção.
        const resposta = await this.manager.process('pt', texto);
        return resposta;
    }

    analisarSentimentos(texto) {
        try {
            const analise = this.sentimento.analyze(texto);
            return analise;
        } catch (erro) {
            console.log('Não foi possível identificar os sentimentos.');
        }
    }

    gerarRespostaDinamica(intencao) {
        switch (intencao) {
            case 'saudacao':
                return 'Olá, como posso ajudar você?';

            case 'despedida':
                return 'Até logo!';

            default:
                return 'Desculpe, não entendi. Como posso ajudar você?';
        }
    }

    cout(text) {
        console.log('\n==================================================================')
        console.log(text)
        console.log('====================================================================\n')
    }

    armazenarConversa(mensagem) {
        if (this.contador > 0 && this.contador <= this.conversa.length) {
            this.conversa[this.contador - 1].push(mensagem);
        } else {
            console.log('Número de contador inválido.');
        }
    }

    resetarContador() {
        this.contador = 0;
    }

    async executarChatbot() {
        this.adicionarDadosTreinamento();
        console.log('Bem-vindo ao Chatbot MewTwo!\n');

        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const interagir = async () => {
            rl.question('Digite uma mensagem para o MewTwo (ou digite "sair" para encerrar): ', async (entradaUsuario) => {
                if (entradaUsuario.toLowerCase() === 'sair') {
                    rl.close();
                    return;
                }

                console.log(this.conversa)


                // Processar a intenção do usuário.
                const respostaIntencao = await this.processarIntencao(entradaUsuario);
                console.log(`Resposta da intenção: ${respostaIntencao.answer}`);

                // Realizar análise de sentimentos.
                const analiseSentimentos = this.analisarSentimentos(entradaUsuario);
                console.log('Análise de Sentimentos:', analiseSentimentos);

                // Gerar uma resposta dinâmica com base na intenção.
                const respostaDinamica = this.gerarRespostaDinamica(respostaIntencao.intent);
                this.cout(`Resposta Dinâmica: ${respostaDinamica}`);

                // Armazenar a mensagem na conversa.
                this.armazenarConversa(entradaUsuario);

                // Incrementar o contador.
                this.contador++;

                // Continuar interagindo.
                interagir();
            });
        };

        interagir();
    }
}

// Iniciar o Chatbot
const mewTwo = new MewTwo();
mewTwo.executarChatbot();
