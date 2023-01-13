const { Client, LocalAuth, Buttons, List, MessageMedia, MessageAck } = require('whatsapp-web.js');
const Estagio1 = require("./1")
const Lanchonete = require("../Cardapio/Lanchonete")



class Estagio4 {

    constructor(whatsapp) {
        this.whatsapp = whatsapp;

        this.pedido_feito = false
    }


    //!Métodos
    fazerPedido(message) {

        let lanchonete = new Lanchonete()

        //Esperando a mensagem do Usuário para escolher o lanche
        if (message.body === 'Sanduiche') {
            //loop que pega o ID, Nome do produto e o Preço

            const lista_produtos = new List(
                "Here's our list of products at 50% off",
                "Escolha um Sanduiche",
                [
                    {
                        title: "Sanduiches Disponíveis",
                        rows: [
                            { id: "1", title: "Americano", description: "R$ 8,00" },
                            { id: "2", title: "Bauru", description: "R$ 10,00" },
                            { id: "3", title: "Queijo Quente", description: "R$ 7,00" },
                        ],
                    },
                ],
                "Por favor selecione um produto"
            );

            this.whatsapp.sendMessage(message.from, lista_produtos)

        }

        if (message.body === 'Bebidas') {

            this.whatsapp.sendMessage(message.from, `${lanchonete.verBebidas().nome}`)

            const lista_produtos = new List(
                "Here's our list of products at 50% off",
                "Escolha uma Bebida",
                [
                    {
                        title: "Bebidas Disponíveis",
                        rows: [
                            { id: "1", title: "Água Mineral (Copo)", description: "R$ 8,00" },
                            { id: "2", title: "Refrigerante (Lata)", description: "R$ 8,00" },
                            { id: "3", title: "Suco (Copo)", description: "R$ 8,00" },
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
                "Escolha um Salgado",
                [
                    {
                        title: "Salgados Disponíveis",
                        rows: [
                            { id: "1", title: "Pão de Queijo", description: "R$ 8,00" },
                            { id: "2", title: "Salgados Diversos", description: "R$ 8,00" },
                            { id: "3", title: "Fatia de Pizza", description: "R$ 8,00" },
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


    teste(message) {
        const lista_produtos = new List(
            "Pedido: {carrinho}",
            "Acompanhar o Pedido",
            [
                {
                    title: "Opções",
                    rows: [
                        { id: "1", title: "Finalizar Pedido" },
                        { id: "2", title: "Ver Carrinho" },
                        { id: "3", title: "Cancelar Pedido" },
                        { id: "4", title: "Escolher Outro Produto" }

                    ],
                },
            ],
            "Pedido de {nome_cliente}"
        );

        this.whatsapp.sendMessage(message.from, lista_produtos)

        if (message.body === 'Finalizar Pedido') {
            this.whatsapp.sendMessage(message.from, 'Finalizando Pedido...');
            this.pedido_feito = true

        }
    }

    adicionarAoCarrinho(nomeProduto) {
        let produto = this.produtos.find(p => p.nome === nomeProduto);
        if (!produto) {
            this.whatsapp.sendMessage(message.from, 'Desculpe, esse produto não está disponível.');
        } // ... código para adicionar produto

    }

}

module.exports = Estagio4;
