//Importações 
const { Client, LocalAuth, Buttons, List, MessageMedia, MessageAck } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');


//! Funções anonimas
const whatsapp = new Client({
    authStrategy: new LocalAuth({ whatsappId: "cliente-one" })
});

function enviarMensagem(whatsapp, message, text) {
    return whatsapp.sendMessage(message.from, text);
}

function enviarLista(whatsapp, message, items) {
    const list = new List(items);
    return whatsapp.sendMessage(message.from, list);
}

function enviarBotao(whatsapp, message, text, buttons) {
    const botoes = new Buttons(text, buttons);
    return whatsapp.sendMessage(message.from, botoes);
}

function enviarMensagem24(texto) {
    client.on('message', message => {

        return client.sendMessage(message.from, texto);

    });

}




//!ESTAGIOS
const estagio1 = new (class {
    constructor() {
        // código da classe aqui
    };
    conectandoWpp = () => {

        console.log("\nIniciando o Chatbot...")

        console.log('Gerando QR code...');
        whatsapp.on('qr', qr => {
            qrcode.generate(qr, { small: true });
        });

        whatsapp.on('ready', () => {
            console.log('whatsapp pronto! Pode usar agora :)');
        });

        whatsapp.initialize();

    };
    recebeMensagem() {

        //hora atual
        let data_atual = new Date();
        let hora = data_atual.getHours();
        let minuto = data_atual.getMinutes();

        whatsapp.on('message', message => {

            let nome = message._data.notifyName;
            let telefone = message.from.split('@')[0]

            console.log("\n")
            console.log("Data  = ", data_atual)
            console.log("Horário inicio do Atendimento = " + hora + ":" + minuto);
            console.log("Nome do Cliente = ", nome)
            console.log("Número do Usuário = " + telefone);
            console.log("Mensagem recebida = " + message.body); //Salvar dentro de uma lista para usar I.A depois
            //console.log("Fluxo Atual =  ", this.estagio)
            console.log("\n")
        });

    };

    getHoras() {
        let data_atual = new Date();
        let hora = data_atual.getHours();
        let minuto = data_atual.getMinutes();

        return hora + ":" + minuto
    }

    getNome(whatsapp, message) {
        enviarMensagem(whatsapp, message, "Antes de começarmos, por favor, digite seu *nome*:");
        let nome_cliente = message.body;
        return nome_cliente;
    }

    getCliente(message) {
        //procurar o cliente na base de dados
    }


    // Função para mostrar o cardápio ao usuário

    // const func2 = (x, y) => {
    //     return x + y;
    //   };


    mostrarCardapio(whatsapp, message) {
        // Verifica se a mensagem do usuário é "ver cardápio"
        if (message.body.toLowerCase() === 'ver cardápio') {
            // Define o cardápio
            const cardapio = [
                {
                    nome: 'Refrigerante',
                    preco: 3.50,
                },
                {
                    nome: 'Suco',
                    preco: 4.00,
                },
                {
                    nome: 'Água Mineral',
                    preco: 2.50,
                },
            ];
            // Transforma o cardápio em uma lista de strings
            const opcoes = cardapio.map(bebida => `${bebida.nome} - R$${bebida.preco}`).join('\n');
            // Envia a mensagem com o cardápio para o usuário
            enviarMensagem(whatsapp, message, `Aqui está o nosso cardápio: \n\n${opcoes}\n\nPor favor, digite o nome da bebida que deseja pedir:`);
        }
    }

});


const estagio2 = new (class {
    constructor() {
        this.pedido_iniciado = false;
    }

    mostrarMenuPrincipal = (whatsapp, message) => {
        enviarBotao(whatsapp, message, "Escolha uma opção", [
            { body: "Ver Cardápio" },
            { body: "Fazer Pedido" },
            { body: "Ver nossa Localização" }
        ]);
    }

    mandarMensagemTeste(whatsapp, message) {

        enviarMensagem(whatsapp, message, "Teste de mensagem")

        let button = new Buttons(`Vamos lá, ${nome_cliente}! Escolha uma opção abaixo do que voce deseja`, [
            { body: 'Ver Cardápio' },
            { body: 'Fazer Pedido' },
            { body: 'Ver nossa Localização' }
        ], 'Chatbot Groundon', `Horário de Atendimento = ${this.getHoras()}`);

        return whatsapp.sendMessage(message.from, button)

    }



    //fazer o pedido

    //adicionar ao carrinho

    //confirmar pedido;
})

//! Estágio 3 - Pedido

const estagio3 = new (class {
    constructor() {
        // código da classe aqui
    }


    mostrarMenu = (whatsapp, message) => {
        enviarBotao(whatsapp, message, "Escolha uma opção", [
            { body: "Ver Cardápio" },
            { body: "Fazer Pedido" },
            { body: "Ver nossa Localização" }
        ]);
    }

    fazerPedido2(whatsapp, message) {
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

    mostrarLocal(whatsapp, message) {
        botafogo = {
            nome: 'Botafogo',
            rua1: 'Rua Praia de botafogo, 340',
            rua2: 'Rua Voluntários da Pátria, 156',
            rua3: 'Rua Voluntários da Pátria, 350'
        }

        enviarMensagem(whatsapp, message, `Aqui estão as nossas localizações: \n ${botafogo.nome} \n ${botafogo.rua1} \n ${botafogo.rua2} \n ${botafogo.rua3}`)

    }

}

    //chatbot.ProcessaPedido() -> joga na base de dados

    //enviarPedido (pegar localização)

    //chatbot.notaFiscal() 

)


//! Estagio 4 - Pagamento


//! Estagio 5 - Entrega e Resumo


//!================ FUNÇÃO PRINCIPAL =====================
estagio1.conectandoWpp()
estagio1.recebeMensagem()

//Evento Listener esperando mensagem (loop)
whatsapp.on('message', message => {

    //! ===================== Estágio 1 - Apresentação =====================
    estagio3.mostrarMenu(whatsapp, message);

    // Boas Vindas
    enviarMensagem(whatsapp, message, `Bem-vindo a Citta Lanchonete! Obrigado por escolher a nossa lanchonete. \n Eu sou o Robô Groundon e estou aqui para ajudá-lo. `
    );

    whatsapp.sendMessage(message.from, "ola mundo")

    //Pegando o nome do cliente
    let nome_cliente = estagio1.getNome(message);
    enviarMensagem(whatsapp, message, `Um prazer te conhecer, ${nome_cliente}`)
    whatsapp.sendMessage(message.from, `Um prazer te conhecer, ${nome_cliente}`)


    // Mostrando o Menu
    estagio1.mostrarCardapio(whatsapp, message)


    estagio1.enviarMensagem(whatsapp, message, `Horário de Atendimento = ${this.getHoras()}`)
    whatsapp.sendMessage(message.from, `Horário de Atendimento = ${this.getHoras()}`)


    //!=====================  Estágio 2 - Mostrar Opções =====================

    estagio2.mostrarMenuPrincipal(whatsapp, message)
    estagio2.mandarMensagemTeste(whatsapp, message)

    //!=====================  Estágio 3 - Faz o pedido e processa o pedido =====================

    if (message.body === 'ver cardápio') {
        estagio3.mostrarMenu(whatsapp, message);
    }

    if (message.body === 'fazer pedido') {
        estagio3.fazerPedido2(whatsapp, message)

    }

    if (message.body === 'Ver Nossa Localização') {
        estagio3.mostrarLocal(whatsapp, message)
    }
});


module.exports = { estagio1, estagio2, estagio3 };
