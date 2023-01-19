const Chatbot = require("../../chatbot");
const Estagio2 = require("./Estagio2.js");

class Estagio4 {
    constructor(Chatbot, Estagio2) {
        this.chatbot = Chatbot;
        this.estagio2 = Estagio2;
    }

    mostrarProdutos(message) {

        this.chatbot.enviarBotao(message, `Vamos lá,  ${this.estagio2.getNome()}! Escolha uma opção abaixo do que voce deseja`,
            [
                { body: "Sanduiches" },
                { body: "Bebidas" },
                { body: "Salgados" }
            ]
        );
    }

    


    adicionarItensCarrinho() {

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

    fazerPedido(whatsapp, message) {
        let button = new Buttons("Tudo bem, ${nome_cliente}? Escolha uma opção abaixo do que voce deseja", [
            { body: 'Sanduiche' },
            { body: 'Bebidas' },
            { body: 'Salgados' }
        ], 'Chatbot Groundon', 'Horário de Atendimento = ');

        whatsapp.sendMessage(message.from, button)


        if (message.body === 'Sanduiche') {

            //loop que pega o ID, Nome do produto e o Preço

            const lista_produtos = new List(
                "Here's our list of products at 50% off",
                "Lanches Disponíveis",
                [
                    {
                        title: "Sanduiches Disponíveis",
                        rows: [
                            { id: "1", title: "Sanduiche" },
                            { id: "2", title: "Bebidas" },
                            { id: "3", title: "Salgados" },
                        ],
                    },
                ],
                "Por favor selecione um produto"
            );

            whatsapp.sendMessage(message.from, lista_produtos)

        }

        if (message.body === 'Bebidas') {
            const lista_produtos = new List(
                "Here's our list of products at 50% off",
                "Lanches Disponíveis",
                [
                    {
                        title: "Bebidas Disponíveis",
                        rows: [
                            { id: "1", title: "Sanduiche" },
                            { id: "2", title: "Bebidas" },
                            { id: "3", title: "Salgados" },
                        ],
                    },
                ],
                "Por favor selecione um produto"
            );

            whatsapp.sendMessage(message.from, lista_produtos)

        }

        if (message.body === 'Salgados') {
            const lista_produtos = new List(
                "Here's our list of products at 50% off",
                "Lanches Disponíveis",
                [
                    {
                        title: "Salgados Disponíveis",
                        rows: [
                            { id: "1", title: "Sanduiche" },
                            { id: "2", title: "Bebidas" },
                            { id: "3", title: "Salgados" },
                        ],
                    },
                ],
                "Por favor selecione um produto"
            );

            whatsapp.sendMessage(message.from, lista_produtos)
        }

        if (message.body === 'Voltar') {
            whatsapp.sendMessage(message.from, 'Voltando...');

        }


    }
}

module.exports = Estagio4