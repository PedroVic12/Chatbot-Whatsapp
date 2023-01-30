const Chatbot = require("../chatbot");
const Cliente = require("../Pedido/Cliente.js");
const Carrinho = require("../Pedido/Carrinho")

class Estagio5 {
    constructor(Chatbot, Carrinho) {
        this.chatbot = Chatbot;
        this.carrinho = Carrinho;
    }

    //TODO Mostrar o Carrinho



    setItensCarrinho(message) {
        this.carrinho.adicionarProdutoCarrinho(this.carrinho.getNameProductsMarket()) // estagio 5
        this.chatbot.enviarMensagem(message, this.carrinho.verCarrinho()) // 

    }

}

module.exports = Estagio5;