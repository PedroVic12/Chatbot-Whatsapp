const Chatbot = require("../../chatbot");
const Bebidas = require("../Cardapio - LOJA/Bebidas");

class Carrinho {
    constructor(Chatbot) {
        this.chatbot = Chatbot;
        this.carrinho_loja = {
            itensPedido: [],
            total: 0
        };
    }

    todosItensCardapio() {
        //Instanciando os produtos do estabelecimento
        const cardapio_bebidas = Bebidas.getAllBebidas()

        // Percorre todas as bebidas e adiciona a lista
        let bebidas_array = []

        cardapio_bebidas.forEach(bebida => {
            bebidas_array.push({ title: bebida.nome, description: `R$ ${bebida.preco}` })
        })

        console.log("Todos os Produtos: ", bebidas_array)


    }

    adicionarProdutoCarrinho(_nome_produto) {

        let produto = itens.find(p => p.nome === _nome_produto);
        if (produto) {
            this.carrinho_loja.itensPedido.push(produto);
            this.carrinho_loja.total += produto.preco;
        }

        this.chatbot.enviarMensagem(message, `*Itens do Pedido:* ${this.carrinho_loja.itensPedido} \n *Valor total do pedido:* R$ ${this.carrinho_loja.total}`)

    }

    removeProdutoCarrinho(produto) {
        this.carrinho_loja = this.itens.filter(p => p !== produto);
    }

    verCarrinho() {
        return this.carrinho_loja;
    }


}




module.exports = Carrinho;
