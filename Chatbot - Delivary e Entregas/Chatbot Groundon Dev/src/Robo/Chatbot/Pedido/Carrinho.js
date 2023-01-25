const Chatbot = require("../../chatbot");
const Bebidas = require("../Cardapio - LOJA/Bebidas");

class Carrinho {
    constructor(Chatbot) {
        //herança
        this.chatbot = Chatbot;

        //atributos
        this.carrinho_loja = {
            nomeProduto: [],
            total: 0
        };
    }

    mensagemFormatadaMap(message) {
        return this.chatbot.enviarMensagem(message, `*Itens do Pedido:* ${this.carrinho_loja.nomeProduto.map(item => `${item.title}`).join(", ")} \n *Valor total do pedido:* R$ ${this.carrinho_loja.total}`)
    }

    verCarrinho(){
        return this.mensagemFormatadaMap()
    }

    todosItensCardapio() {
        //Instanciando os produtos do estabelecimento
        const cardapio_bebidas = Bebidas.getAllBebidas()

        // Percorre todas as bebidas e adiciona a lista
        let bebidas_array = []

        cardapio_bebidas.forEach(bebida => {
            bebidas_array.push({ title: bebida.nome, description: bebida.preco })
        })

        return bebidas_array
    }


    formatarProdutos() {
        return this.carrinho_loja.nomeProduto.map(item => `${item.title}`).join(", ")
    }

  
    adicionarProdutoCarrinho(...pedido_cliente) {

        let itens = this.todosItensCardapio()

        pedido_cliente.forEach(_nome_produto => {

            let produtoCarrinho = itens.find(element => element.title === _nome_produto);

            if (produtoCarrinho) {
                this.carrinho_loja.nomeProduto.push(produtoCarrinho);
                this.carrinho_loja.total += produtoCarrinho.description;
            }
        })

        //teste aqui em baixo
        this.verCarrinho()

    }

    removeProdutoCarrinho(produto) {
        this.carrinho_loja = this.itens.filter(p => p !== produto);
    }




}


let c1 = new Carrinho(Chatbot)
let _cardapio = c1.todosItensCardapio()
//console.log("Todos os Produtos: ", _cardapio)
c1.adicionarProdutoCarrinho("Guaraná")
c1.adicionarProdutoCarrinho('Pepsi')
c1.adicionarProdutoCarrinho('Fanta Uva')


module.exports = Carrinho;
