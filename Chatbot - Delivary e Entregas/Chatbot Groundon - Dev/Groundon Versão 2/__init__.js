const { Client, LocalAuth, Buttons, List, MessageMedia } = require('whatsapp-web.js');

const Cliente = require("./Chatbot/Cliente/Cliente")

const Bebidas = require("./Chatbot/Cardapio/bebida")

//npm install git+https://github.com/pedroslopez/whatsapp-web.js#fix-buttons-list

class Bot_Groundon {

    constructor() {
        //Instanciando um novo Objeto de Chatbot
        this.whatsapp = new Client({
            authStrategy: new LocalAuth({ clientId: "client-one" })
        });
        this.qrcode = require('qrcode-terminal');


        //hora atual
        let data_atual = new Date();
        let hora = data_atual.getHours();
        let minuto = data_atual.getMinutes();

        //Itens do Cliente
        this.carrinho = []
        this.pedido_iniciado = false
        this.valor_total = 0
        this.numero_pedidos_cliente = 0

        //Instanciando Objetos
        this.Bebidas = new Bebidas()

    }

    conectandoWpp() {
        console.log("Gerando QR Code...\n")

        this.whatsapp.on('qr', qr => {
            this.qrcode.generate(qr, { small: true });
        });

        this.whatsapp.on('ready', () => {
            console.log('Client is ready! Pronto para usar agora :) ');
        });

        console.log("Inicializando o BOT...\n")

        this.whatsapp.initialize();
    }

    verBebidas() {
        return this.bebidas.getArray();
    }

    //!Getters e Setters
    getTelefone() {
        this.telefone = message.from.split('@')[0]
        return this.telefone

    }

    getCliente() {

    }

    setCliente() {

    }

    //!Métodos
    recebeMensagem() {

        //hora atual
        let data_atual = new Date();
        let hora = data_atual.getHours();
        let minuto = data_atual.getMinutes();


        this.whatsapp.on('message', message => {

            let nome = message._data.notifyName;
            let telefone = message.from.split('@')[0]

            console.log("Data  = ", data_atual)
            console.log("Horário inicio do Atendimento = " + hora + ":" + minuto);
            console.log("Nome do Cliente = ", nome)
            console.log("Número do Usuário = " + telefone);
            console.log("Mensagem recebida = " + message.body); //Salvar dentro de uma lista para usar I.A depois
            console.log("Pedido Iniciado = ", this.pedido_iniciado)
            console.log("\n")
        });

    }

    boasVindas() {
        this.whatsapp.on('message', async message => {
            this.whatsapp.sendMessage(message.from, 'Bem vindo a Citta Lanchonete, nos agradecemos sua preferencia');

            this.whatsapp.sendMessage(message.from, 'Bem vindo ao Robô Groundon! \n Eu vou ser responsável pelo seu atendimento \n Antes de começarmos,  *Digite seu Nome*:');

            let nome_cliente = message.body;
            await this.whatsapp.sendMessage(message.from, `Um prazer te conhecer! ${nome_cliente}`);

            const nome = nome_cliente

            //se o cliente não estiver na base de dados
            if (nome === '') {
                console.log("Teste")
            }

            //se o cliente estiver na base de dados
            else {
                await this.whatsapp.sendMessage(message.from, `Um prazer ver voce novamente! ${nome}`);
                this.numero_pedidos_cliente++
            }

        });
        this.pedido_iniciado = true;


        //verificar o nome do cliente na base de dados
        //se não existir, cadastrar apos concluir o pedido
        //se existir, apresentar o menu


        // return nome_cliente;

    }

    //todo
    mandarMensagem() {
        this.whatsapp.on('message', message => {

            //Apresentando o Menu de 3 opções.
            let button = new Buttons('Escolha uma das opções abaixo', [

                { body: 'Ver o Carrinho' },
                { body: "Voltar ao Menu Principal" }

            ], 'Chatbot Groundon', 'Horário de Atendimento = ');

            this.whatsapp.sendMessage(message.from, button)

        });


        if (message.body === 'Voltar ao Menu Principal') {
            this.menu_principal()
        }

        if (message.body === 'Ver o Carrinho') {
            this.whatsapp.sendMessage(message.from, 'pong');
        }
    }

    menu_principal() {

        //evento esperando Mensagem
        this.whatsapp.on('message', message => {

            //Apresentando o Menu
            if (message.body === 'menu') {

                let button = new Buttons("Tudo bem, ${nome_cliente}? Escolha uma opção abaixo do que voce deseja", [
                    { body: 'Ver Cardápio' },
                    { body: 'Fazer Pedido' },
                    { body: 'Ver nossa Localização' }
                ], 'Chatbot Groundon', 'Horário de Atendimento = ');

                this.whatsapp.sendMessage(message.from, button)
            }

            if (message.body === 'Ver Cardápio') {
                this.whatsapp.sendMessage(message.from, 'pong');
                let media = MessageMedia.fromFilePath('./assets/cardapio1.png');
                this.whatsapp.sendMessage(message.from, media);

            }

            // if (message.body === 'Fazer Pedido') {
            //     this.fazerPedido()

            // }


            if (message.body === 'Ver nossa Localização') {


            }

        });

    }


    processarPedido() {
        //recebe o pedido do cliente
        let cliente1 = new Cliente("Pedro", 999289987, "Campo Grande RJ")
        cliente1.fazerPedido()

    }

    reiniciarPedido() {

    }

    fazerPedido() {
        this.whatsapp.on('message', message => {
            if (message.body === 'Fazer Pedido') {

                let button = new Buttons("Tudo bem, ${nome_cliente}? Escolha uma opção abaixo do que voce deseja", [
                    { body: 'Sanduiche' },
                    { body: 'Bebidas' },
                    { body: 'Salgados' }
                ], 'Chatbot Groundon', 'Horário de Atendimento = ');

                this.whatsapp.sendMessage(message.from, button)
            }


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

                this.whatsapp.sendMessage(message.from, `${this.Bebidas.getBebidas()}`)

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


        });

    }


    novaFuncao() {
        const lista_produtos = new List(
            "Here's our list of products at 50% off",
            "Escolha um Salgado",
            [
                {
                    title: "Salgados Disponíveis",
                    rows: [
                        { id: "1", title: "Continuar Pedido" },
                        { id: "2", title: "Reiniciar Pedido" },
                        { id: "3", title: "Ver Cardápio" },
                        { id: "3", title: "Finalizar Pedido" }

                    ],
                },
            ],
            "Ver opções"
        );

        this.whatsapp.sendMessage(message.from, lista_produtos)
    }

    confirmarPedido() {

        this.whatsapp.on('message', message => {
            let button = new Buttons("Tudo bem, ${nome_cliente}? Escolha uma opção abaixo do que voce deseja", [
                { body: 'Confirmar Pedido' },
                { body: 'Reiniciar o Pedido' },
                { body: 'Cancelar o Pedido' }
            ], 'Chatbot Groundon', 'Horário de Atendimento = ');

            this.whatsapp.sendMessage(message.from, button)
            if (message.body === 'Confirmar Pedido') {

                this.whatsapp.sendMessage(message.from, `Novo pedido de entrega:
                Endereço do cliente: ${this.clientAddress}
                Itens do pedido: ${this.carrinho.join(', ')}
                Total do pedido: ${this.valor_total}`);
            }

        })

    }


    //TODO
    adicionaCarrinho(item, preco) {

        //pega o nome do produto escolhido e adiciona no carrinho

        //pega a quantidade do produto escolhido e adiciona no carrinho
        this.carrinho.push(item);

        //pega o preço do produto escolhido e adiciona no carrinho
        this.valor_total += preco;

        this.whatsapp.on('message', message => {
            //Deseja mais alguma coisa?
            this.whatsapp.sendMessage(message.from, 'Deseja mais alguma coisa?');


            if (message.body === 'Adicionar ao Carrinho') {
                this.whatsapp.sendMessage(message.from, 'pong');
            }
        })


    }

}





module.exports = Bot_Groundon;
