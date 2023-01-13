// O pedido tem que ser intuitivo, o bot tem que ja saber as respostas dos clientes, tem que seguir um padrão

let Bebidas = require("./bebida")

class Lanchonete {
    constructor() {
        this.bebidas = new Bebidas();
    }

    verBebidas() {
        return this.bebidas.getArray();
    }

    fazerPedido() {
        this.whatsapp.on('message', async message => {
            // obtemos a resposta do usuário
            let nome_produto = message.body;
            // criamos uma instância da classe Bebidas
            const bebidas = new Bebidas();
            // adicionamos o produto ao carrinho
            bebidas.adicionarCarrinho(nome_produto);
        });
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




module.exports = Lanchonete;