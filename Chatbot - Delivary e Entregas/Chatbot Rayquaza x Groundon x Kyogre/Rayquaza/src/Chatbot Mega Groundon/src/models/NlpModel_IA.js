const { nlPManager, NlpManager } = require('node-nlp')
const Sentiment = require('sentiment');


class MewTwo {
    constructor() {
        this.manager = new NlpManager({ languages: ['pt'] });
        this.sentimento = new Sentiment()
    }

    addTrainingData() {
        //Adicionar dados
        this.manager.addDocument('pt', 'boa noite', 'greeting')
        this.manager.addDocument('pt', 'boa tarde', 'greeting')
        this.manager.addDocument('pt', 'bom dia', 'greeting')
        this.manager.addDocument('pt', 'Alo', 'greeting')
        this.manager.addDocument('pt', 'Hello', 'greeting')
        this.manager.addDocument('pt', 'Obrigado e Tchau', 'greeting.bye')
        this.manager.addDocument('pt', 'Okay te vejo mais tarde', 'greeting.bye')
        this.manager.addDocument('pt', 'Aguardo o pedido', 'greeting.bye')


        //Adicionar respostas
        this.manager.addAnswer('pt', 'greeting', 'Olá, tudo bem?')
        this.manager.addAnswer('pt', 'greeting', 'Olá, como vai?')
        this.manager.addAnswer('pt', 'greeting', 'Oi!')
        this.manager.addAnswer('pt', 'greeting', 'Fala gurizada!')
        this.manager.addAnswer('pt', 'greeting.bye', 'Te vejo em breve :)')
        this.manager.addAnswer('pt', 'greeting.bye', 'Ate o proximo pedido!')
    }

    async trainModel() {
        await this.manager.train().then(async () => {
            this.manager.save()
            this.manager.load()
            const response = await this.manager.process('pt', 'boa tarde')
            console.log(response)
        })
    }

    //! Métodos para o Chatbot Delivery
    async processIntent(text) {
        const response = await this.manager.process('pt', text);
        return response;
    }

    analiseDeSentimentos(text) {
        const analysis = this.sentiment.analyze(text);
        return analysis; // Isso retornará o resultado da análise de sentimento.
    }

    gerarRespostasDinamicas(intent) {
        switch (intent) {
            case 'greeting':
                return 'Olá, como posso ajudar você?';

            case 'goodbye':
                return 'Até logo!';

            // Adicione mais casos conforme necessário.

            default:
                return 'Desculpe, não entendi. Como posso ajudar você?';
        }
    }


    //! Métodos de NLP padrão
    tokenization(text) {
        // Dividir o texto em tokens (palavras ou partes).
        const tokens = text.split(' ');
        return tokens;
    }

    removeStopWords(tokens) {
        // Remover palavras de parada (stop words) do texto.
        const stopWords = ['o', 'a', 'de', 'e', 'um', 'uma']; // Exemplo de lista de stop words.
        const filteredTokens = tokens.filter(token => !stopWords.includes(token));
        return filteredTokens;
    }

    stemText(tokens) {
        // Realizar stemização nos tokens.
        // A stemização reduz as palavras às suas formas radicais.
        // Por exemplo, "correndo" se torna "corre".
        const stemmedTokens = tokens.map(token => performStemming(token));
        return stemmedTokens;
    }

    performStemming(token) {
        // Implemente a lógica de stemização aqui.
        // Você pode usar uma biblioteca de stemização, como "natural", se desejar.
        return token;
    }
}

module.exports = MewTwo;



async function run_mewtwo() {
    const mewtwo = new MewTwo();

    // Adicione dados de treinamento e treine o modelo.
    mewtwo.addTrainingData();
    await mewtwo.trainModel();

    // Processar uma intenção.
    const userInput = 'boa tarde';
    const response = await mewtwo.processIntent(userInput);
    console.log('Resposta da intenção:', response);

    // Realizar análise de sentimentos.
    //const userText = 'Estou muito feliz!';
    //const sentimentAnalysis = mewtwo.analiseDeSentimentos(userText);
    //console.log('Análise de Sentimentos:', sentimentAnalysis);

    // Gerar uma resposta dinâmica.
    const userIntent = 'greeting';
    const dynamicResponse = mewtwo.gerarRespostasDinamicas(userIntent);
    console.log('Resposta Dinâmica:', dynamicResponse);
}

run_mewtwo();





