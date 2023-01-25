const Chatbot = require("../../chatbot");
const Cliente = require("../Pedido/Cliente.js");
const Carrinho = require("../Pedido/Carrinho")

class Estagio5 {
    constructor(Chatbot, Carrinho) {
        this.chatbot = Chatbot;
        this.carrinho = Carrinho;
    }



    getItensCarrinho(message) {
        this.chatbot.enviarMensagem(message, `*Itens do Pedido:* ${this.carrinho_loja.nomeProduto.map(item => `${item.title}`).join(", ")} \n *Valor total do pedido:* R$ ${this.carrinho_loja.total}`)
    }

    setItensCarrinho() {

    }

    delItensCarrinho() {

    }


    //chatbot.ProcessaPagamento() -> joga na base de dados

    //enviarPedido (pegar localização)

    //chatbot.notaFiscal() 


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

module.exports = Estagio5;