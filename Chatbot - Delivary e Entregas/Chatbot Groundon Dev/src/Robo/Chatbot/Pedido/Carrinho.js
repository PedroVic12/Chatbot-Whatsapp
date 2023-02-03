const Chatbot = require("../../Chatbot/chatbot");
const Bebidas = require("../Cardapio - LOJA/Bebidas");
const Salgados = require("../Cardapio - LOJA/Salgados");
const Sanduiches = require("../Cardapio - LOJA/Sanduiche");


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

    //!Métodos de TESTE
    setItens(...item) {
        this.market_place.push(item)
    }
    getNameProductsMarket() {
        return this.market_place;
    }

    removeProdutoCarrinho(produto) {
        this.carrinho_loja = this.itens.filter(p => p !== produto);
    }

    //!=========================== Métodos ===========================
    adicionarProdutoCarrinho(...array_pedido_cliente) {

        const cardapio = this.todosItensCardapio()

        array_pedido_cliente.forEach(_nome_produto => {

            let produtoCarrinho = cardapio.find(element => element.title === _nome_produto);

            if (produtoCarrinho) {
                this.carrinho_loja.nomeProduto.push(produtoCarrinho);
                this.carrinho_loja.total += produtoCarrinho.description;
            }
        })

        //console.log('JUSTIN BIEBER AINDA VOU SER VOCE')
    }

    verCarrinho() {
        return `🛒 Seu Carrinho:\n\n*Itens do Pedido:* ${this.carrinho_loja.nomeProduto.map(item => `${item.title}`).join(", ")} \n *Valor total do pedido:* R$ ${this.carrinho_loja.total}`
    }

    getNomesProdutosPedido() {

        let produtos = this.carrinho_loja.nomeProduto.map(item => `${item.title}`).join(", ")

        return produtos
    }

    getTotalPrecoPedido() {
        return this.carrinho_loja.total
    }

    todosItensCardapio() {
        //Instanciando os produtos do estabelecimento
        let _cardapio_bebidas = Bebidas.getAllBebidas()
        let _cardapio_salgados = Salgados.getAllSalgados()
        let _cardapio_sanduiches = Sanduiches.getAllSanduiches()

        // Percorre todas as bebidas e adiciona a lista
        const all_products = []

        _cardapio_bebidas.forEach(bebida => {
            all_products.push({ title: bebida.nome, description: bebida.preco })
        })

        _cardapio_salgados.forEach(salgado => {
            all_products.push({ title: salgado.nome, description: salgado.preco })
        })

        _cardapio_sanduiches.forEach(sanduiche => {
            all_products.push({ title: sanduiche.nome, description: sanduiche.preco })
        })

        return all_products
    }


}


// let c1 = new Carrinho(Chatbot)

// let _cardapio = c1.todosItensCardapio()

// c1.adicionarProdutoCarrinho("Guaraná")
// c1.adicionarProdutoCarrinho('Pepsi')
// c1.adicionarProdutoCarrinho('Fanta Uva')

//console.log(c1.verCarrinho())

//console.log(c1.getNomesProdutosPedido())

module.exports = Carrinho;
