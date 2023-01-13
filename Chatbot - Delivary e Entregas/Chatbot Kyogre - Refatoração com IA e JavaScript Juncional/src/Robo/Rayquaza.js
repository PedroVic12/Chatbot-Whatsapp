//Importações 
// Documentação:  https://wwebjs.dev/guide/#replying-to-messages

const { Client, LocalAuth, Buttons, List, MessageMedia, MessageAck, LegacySessionAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Instanciando o Objeto com o nome do Cliente
const whatsapp = new Client({
    authStrategy: new LocalAuth({ clientId: "BigBi-Citta" })
});
//const whatsapp = new Client();

//! Funções anonimas
let numero_estagio = 1


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

function avancarEstagio() {
    numero_estagio++
    console.log("Avançando o estágio!")
}

function getHoras() {
    let data_atual = new Date();
    let hora = data_atual.getHours();
    let minuto = data_atual.getMinutes();

    return hora + ":" + minuto
}


//!ESTAGIOS
const Estagio1 = new (class {
    constructor() {
        // código da classe aqui
    };
    conectandoWpp = () => {
        return new Promise((resolve, reject) => {
            console.log("\nIniciando o Chatbot...")
            console.log('Gerando QR code...');

            whatsapp.on('qr', qr => {
                qrcode.generate(qr, { small: true });
            });


            whatsapp.on('ready', () => {
                console.log('whatsapp pronto! Pode usar agora :)');
                resolve(whatsapp);
            });
            whatsapp.initialize();
        });
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
            console.log("Fluxo Atual =  ", numero_estagio)
            console.log("\n")
        });

    };



    boasVindas(whatsapp, message) {
        enviarMensagem(whatsapp, message, 'Olá, seja bem vindo ao Groundon!');
        enviarMensagem(whatsapp, message, 'Meu nome é Groundon, sou um chatbot e estou aqui para te ajudar a fazer seu pedido!');
        enviarMensagem(whatsapp, message, "Antes de começarmos, por favor, digite seu nome:");

    }



});


const Estagio2 = new (class {
    constructor() {
        this.numero_pedido = 1
        this.nome_cliente = ""
    }


    async getNomeCliente(whatsapp, message) {
        try {
            this.nome_cliente = message.body
            enviarMensagem(whatsapp, message, `Prazer em te conhecer, ${this.nome_cliente}!`);

        } catch (err) {
            console.log(err);
        }
    }

    getNome() {
        return this.nome_cliente;
    }

    infoCliente(whatsapp, message) {
        let horario_pedido = Estagio1.getHoras()
        let nome = this.getNomeCliente(whatsapp, message);
        let telefone_cliente = message.from.split('@')[0]

        this.numero_pedido++

        return {
            "Nome": nome,
            "Numero de Pedidos": this.numero_pedido,
            "horario do pedido": horario_pedido,
            "Telefone": telefone_cliente
        }
    }




})


const Estagio3 = new (class {
    constructor() {
        this.pedido_iniciado === false
    }

    //adicionar ao carrinho

    //confirmar pedido;

    setClienteBase() {
        if (this.pedido_iniciado === true) {

            console.log("Pedido Iniciado!")
            console.log(`Cliente ${Estagio2.getNome()} sendo cadastrado na base de dados!`)
        }
    }

    mostrarCardapioNoChat(whatsapp, message) {
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

    mostrarMenuPrincipal = (whatsapp, message) => {
        enviarMensagem(whatsapp, message, "Escolha uma opção abaixo do que voce deseja");

        // enviarBotao(whatsapp, message, "Vamos lá, ${Estagio2.getNomeCliente()}! Escolha uma opção abaixo do que voce deseja", [
        //     { body: "Ver Cardápio" },
        //     { body: "Fazer Pedido" },
        //     { body: "Ver nossa Localização" }
        // ], "Chatbot Groundon', `Horário de Atendimento = ${Estagio2.getHoras()}");

        enviarBotao(whatsapp, message, "Vamos lá, ${Estagio2.getNomeCliente()}! Escolha uma opção abaixo do que voce deseja",
            [
                { body: "Ver Cardápio" },
                { body: "Fazer Pedido" },
                { body: "Ver nossa Localização" }
            ]
        );
    }

    mandarMensagemTeste(whatsapp, message) {

        let button = new Buttons(`Vamos lá, ${Estagio2.getNome()}! Escolha uma opção abaixo do que voce deseja`, [
            { body: 'Ver Cardápio' },
            { body: 'Fazer Pedido' },
            { body: 'Ver nossa Localização' }
        ], 'Chatbot Groundon', `Horário de Atendimento = ${getHoras()}`);

        return whatsapp.sendMessage(message.from, button)

    }


    mostrarLocal(whatsapp, message) {
        let botafogo = {
            nome: 'Botafogo',
            rua1: 'Rua Praia de botafogo, 340',
            rua2: 'Rua Voluntários da Pátria, 156',
            rua3: 'Rua Voluntários da Pátria, 350'
        }

        enviarMensagem(whatsapp, message, `Aqui estão as nossas localizações: \n ${botafogo.nome} \n ${botafogo.rua1} \n ${botafogo.rua2} \n ${botafogo.rua3}`)

    }
})


//! Estagio 4 -  Processa o pedido e Pagamento
const Estagio4 = new (class {
    constructor() {
        // código da classe aqui
    }

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

    adicionarItemCarrinho() {

    }
    //chatbot.ProcessaPagamento() -> joga na base de dados

    //enviarPedido (pegar localização)

    //chatbot.notaFiscal() 

})

//! Estagio 5 - Entrega e Resumo


//!================ FUNÇÃO PRINCIPAL =====================
Estagio1.conectandoWpp()
    .then(() => {
        // Código a ser executado após a promise ser resolvida
        console.log('Conectado com sucesso!')

    })
    .catch((error) => {
        // Código a ser executado após a promise ser rejeitada
        console.log("Ops Deu Problema ao conectar!")
        console.log(error)
    })
Estagio1.recebeMensagem()

async function iniciarBot() {

    //Evento Listener esperando mensagem (loop)
    whatsapp.on('message', async message => {

        //! ===================== Estágio 1 - Apresentação =====================
        if (numero_estagio === 1) {

            Estagio1.boasVindas(whatsapp, message)

            avancarEstagio()
        }

        //!=====================  Estágio 2 - Mostrar Opções =====================
        else if (numero_estagio === 2) {

            Estagio2.getNomeCliente(whatsapp, message)

            // let info = Estagio2.infoCliente(whatsapp, message)
            // console.log(info)

            //Estagio2.setCliente(whatsapp, message)

            enviarMensagem(whatsapp, message, "Vamos iniciar o atendimento!")
            avancarEstagio()

        }

        //!=====================  Estágio 3 - Mostra o Menu e Faz o pedido  =====================
        else if (numero_estagio === 3) {

            Estagio3.pedido_iniciado = true

            //Estagio3.mostrarMenuPrincipal(whatsapp, message)
            Estagio3.mandarMensagemTeste(whatsapp, message)

            if (message.body === 'Ver Cardápio') {
                Estagio3.mostrarCardapioNoChat(whatsapp, message);
            }

            if (message.body === 'Fazer Pedido') {
                avancarEstagio()

            }

            if (message.body === 'Ver nossa Localização') {
                Estagio3.mostrarLocal(whatsapp, message)
            }
        }

        //!=====================  Estágio 4 - Processa o pedido e Pagamento =====================
        else if (numero_estagio === 4) {
            Estagio4.fazerPedido(whatsapp, message)
        }


    });
}
iniciarBot()






module.exports = { Estagio1, Estagio2, Estagio3 };
