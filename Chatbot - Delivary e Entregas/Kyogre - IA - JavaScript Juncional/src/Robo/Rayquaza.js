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

let numero_estagio = 1
function avancarEstagio() {
    numero_estagio++
    console.log("numero do estagio = ", numero_estagio)
}



//!ESTAGIOS
const Estagio1 = new (class {
    constructor() {
        // código da classe aqui
        this.pedido_iniciado = false
        this.numero_pedido = 0

        this.nextLevel = false
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



    pegaNomeCliente(whatsapp, message) {
        whatsapp.on('message', message => {
            let client = message.body
            whatsapp.sendMessage(message.from, 'pong');
            return client
        });

        enviarMensagem(whatsapp, message, "Prazer te conhecer")

    }


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
            //console.log(` ${this.pedido_iniciado}`)
            console.log("\n")
        });

    };

    getHoras() {
        let data_atual = new Date();
        let hora = data_atual.getHours();
        let minuto = data_atual.getMinutes();

        return hora + ":" + minuto
    }


    infoCliente(message) {
        horario_pedido = this.getHoras()
        //let nome_cliente = this.getNome(whatsapp, message);
        let telefone_cliente = message.from.split('@')[0]
        this.numero_pedido++

        return {
            "horario_pedido": horario_pedido,
            "telefone_cliente": telefone_cliente
        }
    }

    getNome(whatsapp, message) {

        enviarMensagem(whatsapp, message, "Seja bem vindo! Antes de começarmos, por favor, digite seu *Nome*:")
        let nome_cliente;
        nome_cliente = message.body;
        this.pedido_iniciado = true
        return nome_cliente;
    }


    async getNomeCLiente(whatsapp, message) {
        let nome_cliente;

        while (this.pedido_iniciado === false) {
            console.log("Aguardando resposta do usuário...");

            nome_cliente = await new Promise(resolve => {
                whatsapp.on("message", response => {
                    if (response.from === message.from) {
                        this.pedido_iniciado = true;

                        nome_cliente = message.body;

                        resolve(response.body);
                    }
                });
            });
        }

        return nome_cliente
    }

    async setCliente(whatsapp, message) {

        //Fazendo um Objeto Promise
        enviarMensagem(whatsapp, message, `SET CLIENTE `
        ).then((response) => {
            return response

            //Retornando a resposta do Objeto 
        }).then(() => {
            console.log('Cliente cadastrado com sucesso')
        })


        return "Cliente cadastrado com sucesso NA MENSAGEM"
    }



    // ===================================
    funcaoPrincipal() {
        // código aqui
        const nome = getCliente_ChatBot();

        // código que depende do nome do cliente
        return nome
    }

    async getCliente_ChatBot(whatsapp, message) {
        // envia a mensagem para o usuário pedindo o nome
        await enviarMensagem(whatsapp, message, "Por favor, digite seu nome:");
        // espera a resposta do usuário
        const response = await esperarResposta(whatsapp, message);
        return response.body;
    }

    async esperarResposta(whatsapp, message) {
        let nome_cliente;

        await enviarMensagem(whatsapp, message, "Seja bem vindo! Antes de começarmos, por favor, digite seu *Nome*:")

        while (this.pedido_iniciado === false) {
            console.log("Aguardando resposta do usuário...");
            nome_cliente = await new Promise(resolve => {
                whatsapp.on("message", response => {
                    if (response.from === message.from) {
                        this.pedido_iniciado = true;
                        resolve(response.body);
                    }
                });
            });
        }

        return nome_cliente
    }

    // getCliente(whatsapp, message) {
    //     let nome_whatsapp = message._data.notifyName;
    //     const nome = this.getNome(whatsapp, message)

    //     if (nome.toUpperCase() in nome_whatsapp.toUpperCase()) {
    //         this.pedido_iniciado = true
    //         enviarMensagem(whatsapp, message, `OLA MUNDO ${nome}`)

    //     }

    //     //procurar o cliente na base de dados
    // }
    boasVindas(whatsapp, message) {
        // Boas Vindas
        enviarMensagem(whatsapp, message, `Bem-vindo a Citta Lanchonete! Obrigado por escolher a nossa lanchonete. \n Eu sou o Robô Groundon e estou aqui para ajudá-lo. `
        );
        enviarMensagem(whatsapp, message, "Antes de começarmos, por favor, digite seu *nome*:");

        //Pegando o nome do cliente
        let nome_cliente = this.getNome(whatsapp, message);
        enviarMensagem(whatsapp, message, `Um prazer te conhecer, ${nome_cliente}`)
    }

    boasVindas = async (whatsapp, message) => {
        try {
            const nome = await this.getNome(whatsapp, message)
            enviarMensagem(whatsapp, message, `Um prazer te conhecer, ${nome}`)
        } catch (err) {
            console.log(err)
        }
    };




    // Função para mostrar o cardápio ao usuário



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


const Estagio2 = new (class {
    constructor() {
        this.pedido_iniciado = false;
    }
    async boasVindasPromise(whatsapp, message) {
        try {
            //const nome = await getNome(whatsapp, message);
            const nome = message.body
            await enviarMensagem(whatsapp, message, `Prazer em te conhecer, ${nome}!`);
        } catch (err) {
            console.log(err);
        }
    }
    mostrarMenuPrincipal = (whatsapp, message) => {
        enviarMensagem(whatsapp, message, "Escolha uma opção abaixo do que voce deseja");

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
        console.log("Etapa =", numero_estagio)

        //! ===================== Estágio 1 - Apresentação =====================
        if (numero_estagio === 1) {
            enviarMensagem(whatsapp, message, 'Olá, seja bem vindo ao Groundon!');
            enviarMensagem(whatsapp, message, 'Meu nome é Groundon, sou um chatbot e estou aqui para te ajudar a fazer seu pedido!');
            enviarMensagem(whatsapp, message, "Antes de começarmos, por favor, digite seu nome:");

            avancarEstagio()
        }

        //!=====================  Estágio 2 - Mostrar Opções =====================
        else if (numero_estagio === 2) {
            Estagio2.boasVindasPromise(whatsapp, message)
            console.log("Estou no segundo estagio!")
            Estagio2.mostrarMenuPrincipal(whatsapp, message)

        }


        //!=====================  Estágio 3 - Faz o pedido e processa o pedido =====================
        else if (numero_estagio === 3) {
            estagio3.mostrarMenu(whatsapp, message);

            if (message.body === 'ver cardápio') {
                estagio3.mostrarMenu(whatsapp, message);
            }

            if (message.body === 'fazer pedido') {
                estagio3.fazerPedido2(whatsapp, message)

            }

            if (message.body === 'Ver Nossa Localização') {
                estagio3.mostrarLocal(whatsapp, message)
            }
        }

    });
}
iniciarBot()






module.exports = { Estagio1, Estagio2, estagio3 };
