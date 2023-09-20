const { NlpManager } = require('node-nlp');
const Sentiment = require('sentiment');
const Groundon = require('./Groundon');


/*
Contexto de conversa
Significados sintáticos e semânticos
Interprete de textos
Analise de Sentimentos

*/


class MewTwo {
    constructor() {
        this.manager = new NlpManager({ languages: ['pt'] });
        this.sentimento = new Sentiment();
        this.contador = 0;
        this.conversa = [[], [], [], [], [], [], [], [], [], []];
        this.adicionarDadosTreinamento();
    }

    adicionarDadosTreinamento() {
        const intencoes = {
            saudacao: ['boa noite', 'boa tarde', 'bom dia', 'alo', 'olá', 'oi', 'hello'],
            despedida: ['obrigado e tchau', 'te vejo mais tarde', 'aguardo o pedido'],
            pedido: ['fazer pedido', 'fazer um pedido', 'fazer um pedido de delivery', 'fazer um delivery', 'entregar comida', 'entrega de comida', 'entregar pizza']
        };

        const respostas = {
            saudacao: ['Olá, como posso ajudar você?', 'Oi, tudo bem?'],
            despedida: ['Até logo!', 'Aguardo seu próximo pedido!'],
            pedido: ['Você gostaria de fazer um pedido?', 'Faça seu pedido com calma']
        };

        for (const intencao in intencoes) {
            intencoes[intencao].forEach((frase) => {
                this.manager.addDocument('pt', frase, intencao);
            });

            respostas[intencao].forEach((resposta) => {
                this.manager.addAnswer('pt', intencao, resposta);
            });
        }

        this.manager.train();
    }

    cout(text) {
        console.log('\n==================================================================')
        console.log(text)
        console.log('====================================================================\n')
    }

    async processarIntencao(texto) {
        this.contador++;
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
            case 'pedido':
                return 'Você gostaria de fazer um pedido?';
            default:
                return 'Desculpa nao entendi, voce quis dizer [opção1,opção2,opção3]?';
        }
    }

    armazenarConversa(mensagem) {
        this.conversa.push(mensagem);
    }

    resetarContador() {
        this.contador = 0;
    }

    executarChatbot() {
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

                console.log(this.conversa);

                const respostaIntencao = await this.processarIntencao(entradaUsuario);
                this.cout(`Resposta da intenção: ${respostaIntencao.answer}`);

                const analiseSentimentos = this.analisarSentimentos(entradaUsuario);
                console.log('Análise de Sentimentos:', analiseSentimentos);

                const respostaDinamica = this.gerarRespostaDinamica(respostaIntencao.intent);
                this.cout(`Resposta Dinâmica: ${respostaDinamica}`);

                this.armazenarConversa(entradaUsuario);
                this.contador++;

                interagir();
            });
        };

        interagir();
    }
}

module.exports = MewTwo;
// Iniciar o Chatbot
const mewTwo = new MewTwo();
mewTwo.executarChatbot();