const Chatbot = require("../../chatbot");

class Estagio2 {

    //Herança implícita da classe Chatbot
    constructor(Chatbot) {
        this.chatbot = Chatbot;

        //Numero de Pedidos por dia
        this.numero_pedido = 1
        this.nome_cliente = ""

    }
    async getNomeCliente(message) {
        try {
            this.nome_cliente = message.body
            this.chatbot.enviarMensagem(message, `Prazer em te conhecer, ${this.nome_cliente}!`);
            this.chatbot.enviarMensagem(message, `Seu numero de Pedido é ${this.numero_pedido} `)

        } catch (err) {
            console.log(err);
        }
    }

    getNome() {
        return this.nome_cliente;
    }


}

module.exports = Estagio2;