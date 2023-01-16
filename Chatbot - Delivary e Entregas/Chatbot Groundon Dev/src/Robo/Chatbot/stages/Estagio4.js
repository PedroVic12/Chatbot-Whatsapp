const Chatbot = require("../../chatbot");
const Estagio2 = require("./Estagio2.js");

class Estagio4 {
    constructor(Chatbot, Estagio2) {
        this.chatbot = Chatbot;
        this.estagio2 = Estagio2;
    }

    mostrarProdutos(message) {

        this.chatbot.enviarBotao(message, `Vamos lá,  ${this.estagio2.getNome()}! Escolha uma opção abaixo do que voce deseja`,
            [
                { body: "Sanduiches" },
                { body: "Bebidas" },
                { body: "Salgados" }
            ]
        );



    }

    getTotal() {

    }

    setTotal() {

    }

    delTotal() {

    }

    getCarrinho(message) {
        this.chatbot.enviarMensagem(message, 'Ola mundo 3!');

    }

    setCarrinho() {

    }

    delCarrinho() {

    }

}

module.exports = Estagio4