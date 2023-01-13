const Bot_Groundon = require("../__init__");

class Pedido extends Bot_Groundon {
    constructor(nome, telefone, local_entrega, num_pedido, forma_pagamento) {

        super(nome, telefone)
        this.local_entrega = local_entrega
        this.num_pedido = num_pedido

        this.bebida = bebida;
        this.sanduiche = sanduiche;
        this.salgado = salgado;
        this.sobremesa = sobremesa;


        this.status_pedido = status_pedido;
        this.tempo_preparo = tempo_preparo;
        this.tempo_entrega = tempo_entrega;


        this.observacao = observacao;
        this.forma_pagamento = forma_pagamento


        this.tempo_total = tempo_total;
        this.valor_total = valor_total;



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


    processarPedido() {
        //recebe o pedido do cliente
        let cliente1 = new Cliente("Pedro", 999289987, "Campo Grande RJ")
        cliente1.fazerPedido()
    }

    calcularTempoPreparo() {

    }

    enviarMensagemCliente() {

    }

    calcularTempoRota() {

    }

    exportarPedidoExcel() {
        //Se o pedido estiver 100% confirmado
    }
}


console.log(Pedido)



module.exports = Pedido;

