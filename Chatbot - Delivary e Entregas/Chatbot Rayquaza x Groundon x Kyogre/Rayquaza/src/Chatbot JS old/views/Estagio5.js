const Groundon = require("../models/core/Groundon");
const Carrinho = require("../models/Carrinho")

class Estagio5 {
    constructor(Groundon, Carrinho) {
        this.chatbot = Groundon;
        this.carrinho = Carrinho;
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