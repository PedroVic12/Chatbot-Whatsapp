const Chatbot = require("../../chatbot");
const Carrinho = require("./Carrinho")

class Cliente {
    constructor(Chatbot, nome, telefone) {
        this.chatbot = Chatbot;

        this.nome = nome
        this.telefone = telefone
    }

    getNome() { }

    realizaPedido(message, productItemArray) {
        //Checando se o que o usuario pediu esta na lista 
        const produtoEscolhido = productItemArray.find(item => item.nome === message.body);

        Carrinho.adicionarProdutoCarrinho(produtoEscolhido);
        this.chatbot.enviarMensagem(message, `${produtoEscolhido.nome} adicionado ao carrinho!`);
    }

    getLocation() {

    }

    getLocationGoogleMaps() {

    }
}



module.exports = Cliente;