const { NlpManager } = require('node-nlp');
const Sentiment = require('sentiment');
const Groundon = require('./Groundon');
const fs = require('fs');


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
        };

        const respostas = {
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


    getStage(stackStage) {

        return stackStage

    }

    salvarConversaEmCSV() {
        const cabecalho = "Mensagem\n";
        let dadosCSV = cabecalho;

        this.conversa.forEach(subArray => {
            subArray.forEach(mensagem => {
                dadosCSV += `"${mensagem}"\n`;
            });
        });

        fs.writeFileSync('repository/mensagens.csv', dadosCSV, 'utf-8');
        console.log("Conversa salva no arquivo CSV!");
    }



    // Método para retornar o estágio correspondente com base na intenção detectada
    getStageForIntent(intent) {

        let estagio = this.getStage()
        console.log(`Estagio Groundon ${estagio}`)

        const intentToStageMapping = {
            'saudacao': 1,
            'despedida': 9,
            'pedido': 3,
            // Adicione outras intenções e seus estágios correspondentes aqui
        };

        return intentToStageMapping[intent] || null;
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

    salvarConversa(mensagem, contador) {
        if (mensagem && mensagem.trim() !== "") {
            if (this.conversa[contador]) {
                this.conversa[contador].push(mensagem);
            } else {
                console.warn('Índice inválido: ', contador);
            }
        } else {
            console.warn('Mensagem inválida ou vazia recebida: ', mensagem);
        }
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
                    this.salvarConversaEmCSV();

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