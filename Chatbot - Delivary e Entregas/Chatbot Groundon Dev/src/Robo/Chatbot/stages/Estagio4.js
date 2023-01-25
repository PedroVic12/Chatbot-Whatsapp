const Chatbot = require("../../chatbot");
const Estagio2 = require("./Estagio2");
const Cliente = require("../Pedido/Cliente");
const Sanduiches = require("../Cardapio - LOJA/Sanduiche.js");
const Salgados = require("../Cardapio - LOJA/Salgados.js");


class Estagio4 {
    constructor(Chatbot, Estagio2) {
        this.chatbot = Chatbot;
        this.estagio2 = Estagio2;
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

    getItensCarrinho(message) {
        this.chatbot.enviarMensagem(message, 'Ola mundo 3!');

    }

    setItensCarrinho() {

    }

    delItensCarrinho() {

    }



    //! MÉTODOS PARA SER IMPLEMENTADOS NO FUTURO
    enviarListaBebidas(message, array) {

        //Pega as bebidas do cardapio
        const bebidas_array = []

        // Percorre todas as bebidas e adiciona a lista
        array.forEach(bebida => {
            bebidas_array.push({ title: bebida.nome, description: `R$ ${bebida.preco}` });
        });

        // Guarda o array para colocar dentro da lista do wpp para enviar para o usuario
        let itens_lista_wpp = [{
            title: "==> ESCOLHA AS BEBIDAS MAIS CARAS", rows: bebidas_array
        }]

        //Envia a Lista formatada
        return this.chatbot.enviarLista(message, `Escolha os itens do seu pedido`, "Escolher Bebidas", itens_lista_wpp)

    }

    enviarListaSalgados(message, array) {

        const salgados_array = []

        // Percorre todas as bebidas e adiciona a lista
        array.forEach(salgado => {
            salgados_array.push({ title: salgado.nome, description: `R$ ${salgado.preco}` });
        })

        // Guarda o array para colocar dentro da lista do wpp
        let itens_lista_wpp = [{
            title: "==> ESCOLHA os Salgados MAIS CAROS ", rows: salgados_array
        }]

        return this.chatbot.enviarLista(message, `Escolha os itens do seu pedido`, "ESCOLHER SALGADOS", itens_lista_wpp)
    }

    enviarListaSanduiches(message, array) {

        const sanduiche_array = []

        // Percorre todas as bebidas e adiciona a lista
        array.forEach(sanduiche => {
            sanduiche_array.push({ title: sanduiche.nome, description: `R$ ${sanduiche.preco}` })
        })

        // Guarda o array para colocar dentro da lista do wpp
        let itens_lista_wpp = [{
            title: "==> ESCOLHA os Sanduíches MAIS CAROS ", rows: sanduiche_array
        }]
        return this.chatbot.enviarLista(message, `Escolha os itens do seu pedido`, "ESCOLHER SANDUICHES", itens_lista_wpp)
    }


}

module.exports = Estagio4