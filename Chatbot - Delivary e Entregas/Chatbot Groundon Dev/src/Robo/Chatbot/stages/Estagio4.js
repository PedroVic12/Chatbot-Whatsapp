const Chatbot = require("../../chatbot");
const Estagio2 = require("./Estagio2.js");
const Cliente = require("../Pedido/Cliente.js");

class Estagio4 {
    constructor(Chatbot, Estagio2) {
        this.chatbot = Chatbot;
        this.estagio2 = Estagio2;
    }



    enviarListaBebidas(message) {

    }

    enviarListaSalgados(message) {

    }
    enviarListaSanduiches(message) {

    }

    continuarPedido(message) {
        this.chatbot.enviarBotao(message, ` Escolha uma opção abaixo do que voce deseja`,
            [
                { body: "Continuar Pedido" },
                { body: "Finalizar Pedido" },
                { body: "Reiniciar Pedido" }
            ]
        );

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

    getTotal() {

    }

    setTotal() {

    }

    delTotal() {

    }

    getItens(message) {
        this.chatbot.enviarMensagem(message, 'Ola mundo 3!');

    }

    setItens() {

    }

    delItens() {

    }


 



    //! Métodos dos outros itens
    //chatbot.ProcessaPagamento() -> joga na base de dados

    //enviarPedido (pegar localização)

    //chatbot.notaFiscal() 

}

module.exports = Estagio4