const Chatbot = require("../chatbot");
const Carrinho = require("./Carrinho")


class ClienteTeste {
    constructor(nome, telefone, Chatbot, Carrinho) {
        //herança
        this.chatbot = Chatbot;
        this.carrinho = Carrinho;

        // Atributos
        this.nome = nome;
        this.telefone = telefone;

        // Array de pedidos
        this.pedido_cliente = {};
    }


    // Métodos Da propria classe
    setNome(name) {
        this.nome = name;
    }
    getNome() {
        return this.nome;
    }

    getTelefone() {
        return this.telefone;
    }

    verCarrinhoCliente() {
        return this.carrinho;
    }


    // Métodos que o usuario informa

    realizaPedidoNovo(message) {

        // Pega o item escolhido
        const produtoEscolhidoComPreco = this.chatbot.getLastMessage(message)
        let nome_produto = this.BotpegarNomeProduto(produtoEscolhidoComPreco)

        //Coloca o Produto no carrinho
        let array_teste = []

        nome_produto = nome_produto.replace('\n', '')
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


    realizaPedidoReferencia(message, objeto_cliente) {

        // Pega o item escolhido
        const produtoEscolhidoComPreco = this.chatbot.getLastMessage(message)
        let nome_produto = this.BotpegarNomeProduto(produtoEscolhidoComPreco)

        //Coloca o Produto no carrinho
        let array_teste = []

        nome_produto = nome_produto.replace('\n', '')
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

    testeFunction(name) {
        const teste = name;
        this.pedido_cliente.novo_atributo = teste;
        return teste;
    }

    setEnderecoByName(message) {
        const address = this.chatbot.getLastMessage(message);
        this.pedido_cliente.endereco = address;
    }

    getAdressByName() {
        return this.pedido_cliente.endereco;
    }

    setFormaPagamento(message) {
        const payment = this.chatbot.getLastMessage(message);
        this.pedido_cliente.forma_pagamento = payment;

    }

    getPayamentMethod() {
        return this.pedido_cliente.forma_pagamento;
    }

    getAllInformations() {
        return {
            nome: this.getNome(),
            telefone: this.getTelefone(),
            pedido: this.pedido_cliente,
            carrinho: this.verCarrinhoCliente(),
            pagamento: this.getPayamentMethod(),
        }
    }

}


let pedro = new ClienteTeste("Anakin Skywalker", "11999999999", Chatbot, Carrinho)
pedro.testeFunction('Space X')

console.log(pedro.getAllInformations())

module.exports = ClienteTeste;