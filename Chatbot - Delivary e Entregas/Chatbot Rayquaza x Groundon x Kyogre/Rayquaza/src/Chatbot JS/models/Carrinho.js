const Chatbot = require("./core/Rayquaza");

class CarrinhoNew {
    constructor(nome_produto, preco_produto, tipo_produto) {

    }
}


class Carrinho {
    constructor(Chatbot) {
        //herança
        this.chatbot = Chatbot;

        //atributos
        this.carrinho_loja = {
            nomeProduto: [],
            total: 0
        };

        this.market_place = []
    }
}

module.exports = Carrinho;