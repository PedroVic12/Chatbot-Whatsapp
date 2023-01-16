const Chatbot = require("../../chatbot")

class Estagio3 extends Chatbot {
    constructor() {
        super();
    }

    async boasVindas(message) {
        super.enviarMensagem(message, 'Ola mundo 3!');
    }

    getTotal() {

    }

    setTotal() {

    }

    delTotal() {

    }

    getCarrinho() {

    }

    setCarrinho() {

    }

    delCarrinho() {

    }
}