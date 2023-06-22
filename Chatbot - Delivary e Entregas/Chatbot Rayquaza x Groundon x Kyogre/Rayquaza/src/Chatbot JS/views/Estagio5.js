const Groundon = require("../Robo_Groundon");
const Cliente = require("../Pedido/Cliente.js");
const Carrinho = require("../Pedido/Carrinho")

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