const Chatbot = require("../../chatbot");
const Carrinho = require("./Carrinho")

class Cliente {
    constructor(Chatbot, Carrinho) {
        //herança
        this.chatbot = Chatbot;
        this.carrinho = Carrinho;

        //atributos
        // this.nome = nome
        // this.telefone = telefone
    }
    realizaPedido(message) {
        const produtoEscolhido = this.chatbot.getLastMessage(message)

        //todo carrinho.adicionarProdutoCarrinho(produtoEscolhido);

        return this.chatbot.enviarMensagem(message, `🤖 ${produtoEscolhido} adicionado ao carrinho!`)
        //return produtoEscolhido
    }

    getNome() {
        //return this.nome
    }


    getLocation() {

    }

    getLocationGoogleMaps() {

    }
}



module.exports = Cliente;