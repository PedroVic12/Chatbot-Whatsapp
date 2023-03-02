const Chatbot = require("../chatbot");
const Cliente = require("../Cliente/Cliente");

class Estagio8 {
    //Herança implícita da classe Chatbot
    constructor(Chatbot) {
        this.chatbot = Chatbot;
        this.NomeCliente = ""

    }

    getCarrinho(message) {
        const my_money = this.carrinho.carrinho_loja
        console.log(my_money)
        this.chatbot.enviarMensagem(message, `*Itens do Pedido:* ${my_money.nomeProduto.map(item => `${item.title}`).join(", ")} \n *Valor total do pedido:* R$ ${my_money.total}`)
    }


    setItensCarrinho(item) {
        this.carrinho.market_place.push(item)

    }

    delItensCarrinho() {

    }

    getMyMarket() {
        return this.carrinho.market_place;
    }
    //chatbot.ProcessaPagamento() -> joga na base de dados

    //enviarPedido (pegar localização)

    //chatbot.notaFiscal() 




    //!Métodos
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
        return `*Itens do Pedido:* ${this.carrinho_loja.nomeProduto.map(item => `${item.title}`).join(", ")} \n *Valor total do pedido:* R$ ${this.carrinho_loja.total}`
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











    adicionarCarrinhoZdg(message) {

        // Colocando o pedido na base de dados
        this.chatbot.delay(1000).then(async function () {
            const cliente = message._data.notifyName;
            const itens = getItens(cliente)
            const total = getTotal(cliente)
            this.setItens(`${itens}, ${message._data.ListResponse.title, cliente}`)
            this.setTotal()
        });

        // Enviando mensagem de confirmação
        this.chatbot.delay(2000).then(async function () {
            const cliente = message._data.notifyName;
            const itens = getItens(cliente)
            const total = getTotal(cliente)
            this.chatbot.enviarMensagem(message, `Seu pedido é: ${itens} e o total é: ${total}`)
        })

        this.chatbot.enviarMensagem(message, `|${produtoEscolhido} \n| Deseja adicionar mais algum produto?`);

    }

    getTotalCarrinho() {

    }

    setTotalCarrinho() {

    }

    delTotalCarrinho() {

    }
}

module.exports = Estagio8;
