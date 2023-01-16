const { Client, LocalAuth, Buttons, List, MessageMedia, MessageAck } = require('whatsapp-web.js');
const Estagio1 = require("./1")



class Estagio5 {

    constructor(whatsapp) {
        this.whatsapp = whatsapp;

        this.cliente_escolheu_pedido = false
    }


    //!Métodos
    pedidoSendoRealizado(message) {

        const lista_produtos = new List(
            "Here's our list of products at 50% off",
            "Continuar o Pedido",
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
            "Clique Aqui para continuar o pedido"
        );

        this.whatsapp.sendMessage(message.from, lista_produtos)


        if (message.body === 'Finalizar Pedido') {

            // this.whatsapp.sendMessage(message.from, `Novo pedido de entrega:
            // Endereço do cliente: ${this.clientAddress}
            // Itens do pedido: ${this.carrinho.join(', ')}
            // Total do pedido: ${this.valor_total}`);

            this.pedido_feito = true

        }

        if (message.body === 'Ver Carrinho') {
            //Opção de reiniciar o pedido do zero


            let estagio2 = new Estagio2(this.whatsapp)
            estagio2.mostrarMenu(message)
        }
    }

}

module.exports = Estagio5;
