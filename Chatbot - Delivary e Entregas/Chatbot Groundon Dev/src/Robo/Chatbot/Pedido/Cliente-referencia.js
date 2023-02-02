const Chatbot = require("../chatbot");
const Carrinho = require("./Carrinho")


class ClienteTeste {
    constructor(Chatbot, Carrinho) {
        //herança
        this.chatbot = Chatbot;
        this.carrinho = Carrinho;


        // Array de pedidos
        this.pedido_cliente = {
            nome: "this.getNome()",
            telefone: "this.getTelefone()",
        };
    }


    // Métodos Da propria classe
    setNome(name_user) {
        this.pedido_cliente.nome = name_user;
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
    BotpegarNomeProduto(string) {
        // Método que depende da função realizaPedido
        const _array = string.split("R$ ");
        return _array[0];
    }
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


let pedro = new ClienteTeste(Chatbot, Carrinho)
pedro.setNome('Anakin Skywalker')

console.log(pedro.getAllInformations())
console.log(pedro.informacoes_cliente)

module.exports = ClienteTeste;