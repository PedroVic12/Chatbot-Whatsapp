const Chatbot = require("../chatbot")

class Estagio3 {
    constructor(Chatbot) {
        this.chatbot = Chatbot;
    }


    mostrarCardapioPDF(message) {
        this.chatbot.enviarMensagem(message, "Chatbot/Cardapio - LOJA/cardapio.png")
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