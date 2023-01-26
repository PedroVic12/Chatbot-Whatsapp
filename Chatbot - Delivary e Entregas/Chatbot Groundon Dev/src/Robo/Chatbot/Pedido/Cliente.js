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
        const produtoEscolhidoComPreco = this.chatbot.getLastMessage(message)
        let nome_produto =  this.BotpegarNomeProduto(produtoEscolhidoComPreco)

        //Coloca o Produto no carrinho
        let array_teste = []

        nome_produto = nome_produto.replace('\n','')
        array_teste.push(nome_produto)

        let produto_cliente = this.carrinho.getNameProductsMarket()
        array_teste.push(produto_cliente)

        //BUG NESSAS 2 LINHAS --> Ta esperando receber um array
        this.carrinho.adicionarProdutoCarrinho(produto_cliente);
        this.carrinho.setItens(nome_produto)
        this.carrinho.adicionarProdutoCarrinho(nome_produto)
        this.carrinho.adicionarProdutoCarrinho(array_teste)


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