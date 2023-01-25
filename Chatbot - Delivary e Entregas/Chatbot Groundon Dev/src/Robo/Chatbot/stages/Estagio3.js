const Chatbot = require("../../chatbot")

class Estagio3 {
    constructor(Chatbot) {
        this.chatbot = Chatbot;
    }



    mostrarCardapioNoChat(message) {
        // Define o cardápio
        const cardapio = [
            {
                nome: 'Refrigerante',
                preco: 3.50,
            },
            {
                nome: 'Suco',
                preco: 4.00,
            },
            {
                nome: 'Água Mineral',
                preco: 2.50,
            },
        ];
        // Transforma o cardápio em uma lista de strings
        const opcoes = cardapio.map(bebida => `${bebida.nome} - R$${bebida.preco}`).join('\n');

        // Envia a mensagem com o cardápio para o usuário
        this.chatbot.enviarMensagem(message, `Aqui está o nosso cardápio: \n\n${opcoes}\n\nPor favor, digite o nome da bebida que deseja pedir:`);

    }

    mostrarLocal(message) {
        let botafogo = {
            nome: 'Botafogo',
            rua1: 'Rua Praia de botafogo, 340',
            rua2: 'Rua Voluntários da Pátria, 156',
            rua3: 'Rua Voluntários da Pátria, 350'
        }

        this.chatbot.enviarMensagem(message, `Aqui estão as nossas localizações: \n ${botafogo.nome} \n ${botafogo.rua1} \n ${botafogo.rua2} \n ${botafogo.rua3}`)

    }



}

module.exports = Estagio3;