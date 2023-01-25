const Chatbot = require("../../chatbot");
const Carrinho = require("./Carrinho")
const Estagio5 = require("../stages/Estagio5")
const estagio5 = new Estagio5()
class Cliente {
    constructor(Chatbot, Carrinho) {
        //herança
        this.chatbot = Chatbot;
        this.carrinho = Carrinho;

        //atributos
        // this.nome = nome
        // this.telefone = telefone
    }
    BotpegarNomeProduto(string) {
        const _array = string.split("R$ ");
        return _array[0];
    }

    realizaPedido(message) {
        // Pega o item escolhido
        const produtoEscolhido = this.chatbot.getLastMessage(message)
        const name_product =  this.BotpegarNomeProduto(produtoEscolhido)

        //Coloca o Produto no carrinho
        this.carrinho.addCarrinho(name_product)
        let produto_cliente = this.carrinho.getNameProductsMarket()

        //BUG NESSAS 2 LINHAS
        this.carrinho.adicionarProdutoCarrinho(name_product)
        this.carrinho.adicionarProdutoCarrinho(produto_cliente);


        //Ver carrinho
        this.chatbot.enviarMensagem(message, ` adicionado ao carrinho!`)
    }

    verCarrinho(){
        return this.carrinho
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