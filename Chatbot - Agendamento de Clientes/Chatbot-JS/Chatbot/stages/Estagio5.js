const Chatbot = require("../chatbot");
const Cliente = require("../Cliente/Cliente");

class Estagio5 {
    constructor(Chatbot) {
        this.chatbot = Chatbot;
    }

    //TODO Mostrar o Carrinho



    setItensCarrinho() {
        return this.carrinho.adicionarProdutoCarrinho(this.carrinho.getNameProductsMarket()) // estagio 5

    }

    verCarrinho(message) {
        return this.chatbot.enviarMensagem(message, this.carrinho.verCarrinho()) // 

    }

}

module.exports = Estagio5;