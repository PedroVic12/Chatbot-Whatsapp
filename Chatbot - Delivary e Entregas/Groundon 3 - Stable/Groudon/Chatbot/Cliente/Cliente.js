const Bot_Groundon = require("../../__init__");
const { Client, LocalAuth, Buttons, List, MessageMedia } = require('whatsapp-web.js');

class Cliente {

    constructor(nome, telefone, endereco) {

        this.nome = nome;
        this.telefone = telefone;
        this.endereco = endereco;

    }

    setNumeroPedido() {
        this.num_pedido = num_pedido;
        return this.num_pedido
    }

    fazerPedido(item, price) {

        // Adicione o item ao pedido do cliente
        this.addItem(item, price);

        // Envie o pedido para a lanchonete
        this.sendOrder();
    }

    fazerPedido() {

        this.whatsapp.connect().then(() => {

            this.whatsapp.on('message', message => {
                // Seu código aqui
                this.whatsapp.sendMessage(message.from, 'pong');


            });
        });

        let button = new Buttons("Tudo bem, ${nome_cliente}? Escolha uma opção abaixo do que voce deseja", [
            { body: 'Sanduiche' },
            { body: 'Bebidas' },
            { body: 'Salgados' }
        ], 'Chatbot Groundon', 'Horário de Atendimento = ');

        this.whatsapp.sendMessage(message.from, button)


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

            this.whatsapp.sendMessage(message.from, lista_produtos)

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

            this.whatsapp.sendMessage(message.from, lista_produtos)

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

            this.whatsapp.sendMessage(message.from, lista_produtos)
        }

        if (message.body === 'Voltar') {
            this.whatsapp.sendMessage(message.from, 'Voltando...');

        }

    }


}

let cliente1 = new Cliente("Pedro", 99289987, "Campo Grande RJ")

console.log(cliente1)

module.exports = Cliente;