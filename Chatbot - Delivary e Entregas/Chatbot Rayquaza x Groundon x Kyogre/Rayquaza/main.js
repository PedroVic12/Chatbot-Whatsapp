//! ============== MANUTENÇÃO ==============
/**
const BancoDeDados = require("./Chatbot/Banco de Dados - EXCEL/Banco");

const Bebidas = require('./Chatbot/Cardapio - LOJA/Bebidas.js');
const Salgados = require("./Chatbot/Cardapio - LOJA/Salgados.js")
const Sanduiches = require("./Chatbot/Cardapio - LOJA/Sanduiche.js");
 */
//! ============== MANUTENÇÃO ==============

//! Importações e variáveis GLOBAIS
// Documentação:  https://wwebjs.dev/guide/#replying-to-messages
const Groundon = require('./src/Chatbot JS/models/core/Groundon');

const Estagio1 = require('./src/Chatbot JS/views/Estagio1')
const Estagio2 = require('./src/Chatbot JS/views/Estagio2')
const Estagio3 = require('./src/Chatbot JS/views/Estagio3')
const Estagio4 = require('./src/Chatbot JS/views/Estagio4')
const Estagio5 = require('./Chatbot/stages/Estagio5')

const Carrinho = require("./Chatbot/Pedido/Carrinho");
const Cliente = require("./Chatbot/Pedido/Cliente");

//!Inicializando o BOT
const chatbot = new Groundon();
const carrinho = new Carrinho(chatbot)
const cliente = new Cliente(chatbot, carrinho)


const estagio1 = new Estagio1(chatbot);
const estagio2 = new Estagio2(chatbot);
const estagio3 = new Estagio3(chatbot);
const estagio4 = new Estagio4(chatbot, estagio2);
const estagio5 = new Estagio5(chatbot, carrinho)

//const browser = puppeteer.launch({ args: ['--no-sandbox'] });

//! Talvez seja necessário um código para autenticar
chatbot.conectandoWpp()
    .then(() => {
        console.log('✅ Conectado com sucesso!\n\n')

    })
    .catch((error) => {
        console.log("Ops! Deu Problema ao conectar! :(")
        console.log(error)
    })
chatbot.contarNumeroPedidos()
chatbot.recebeMensagem()


//Evento Listener para o Robo receber as mensagens
chatbot.whatsapp.on('message', message => {

    const GROUNDON_INICIADO = true


    chatbot.armazenarConversa(message);
    const flag_impressora = false;

    //! ===================== Estágio 1 - Apresentação =====================
    if (chatbot.numero_estagio === 1) {
        estagio1.boasVindas(message)
        chatbot.avancarEstagio()

    }


    //!=====================  Estágio 2 - Mostrar Menu Principal =====================
    else if (chatbot.numero_estagio === 2) {
        //Pegando os dados do cliente
        const nome_cliente = estagio2.getNomeCliente(message)
        cliente.setNome(nome_cliente)

        // Pegando o numeo de telefone
        const numero_telefone = estagio2.getTelefoneCliente(message)
        cliente.setPhoneNumber(numero_telefone)



        //TODO checar cliente na base de dados


        //Checa o cliente na base de dados e responde
        //try {
        //    estagio2.adicionandoClienteNaBasedeDados(message)
        //    chatbot.gerarTxtUmItem(nome_cliente)
        //} catch (error) {
        //    console.log('Nao foi possivel cadastrar o cliente na base de dados')
        //}


        //let base_de_dados = estagio2.adicionandoClienteNaBasedeDados(message)

        // If cliente ja tem na base de dados, então uma forma de abordagem diferente
        // if (nome_cliente in base_de_dados){
        //
        // }

        chatbot.delay(3000).then(
            chatbot.enviarMensagem(message, `✅ Prazer em te conhecer, ${nome_cliente}!`)
        );


        // Mostra o menu principal
        chatbot.delay(300).then(
            estagio2.mostrarMenuPrincipal(message)
        )




        chatbot.avancarEstagio().then(
            chatbot.enviarMensagem(message, 'O que deseja fazer?')
        )
    }



    //!=====================  Estágio 3 - Responde as funcionalidades do Botão =====================
    else if (chatbot.numero_estagio === 3) {
        if (message.body === 'Ver Cardápio' && message.type !== 'location') {
            chatbot.enviarMensagem(message, 'Vou mostrar o cardapio em PDF!')
            chatbot.delay(3000).then(
                estagio3.mostrarMenuPrincipal(message)
            )
        }
        if (message.body === 'FAZER PEDIDO') {
            chatbot.avancarEstagio().then(
                chatbot.enviarMensagem(message, 'processando...')
            ).then(
                chatbot.mostrarProdutosBotao(message)
            )

        }
        if (message.body === 'Ver nossa Localização' && message.type !== 'location') {
            estagio3.mostrarLocal(message)
            chatbot.delay(3000).then(
                estagio3.mostrarMenuPrincipal(message)
            )
        }
    }



    //!=====================  Estagio 4 - Cliente Escolhe os Produtos da Loja =====================
    else if (chatbot.numero_estagio === 4) {

        //TODO MODIFICAR AQUI PARA UMA LISTA DOS PRODUTOS DO CLIENTE E PEGAR NA NOVA BASE DE DADOS

        if (message.body === 'Sanduíches' && message.type !== 'location') {
            const cardapio_sanduiche = Sanduiches.getAllSanduiches()
            estagio4.enviarListaSanduiches(message, cardapio_sanduiche)
        }

        if (message.body === 'Salgados' && message.type !== 'location') {
            const cardapio_salgados = Salgados.getAllSalgados()
            estagio4.enviarListaSalgados(message, cardapio_salgados)
        }

        if (message.body === 'Bebidas' && message.type !== 'location') {
            const cardapio_bebidas = Bebidas.getAllBebidas()
            estagio4.enviarListaBebidas(message, cardapio_bebidas)
        }

        chatbot.avancarEstagio()

    }

    //!=====================  Estagio 5 - Pega o pedido e adiciona no carrinho =====================

    else if (chatbot.numero_estagio === 5) {

        //Escolhe o Produto
        cliente.realizaPedido(message)

        //Coloca no carrinho
        estagio5.setItensCarrinho();
        estagio5.verCarrinho(message)

        chatbot.avancarEstagio().then(
            chatbot.mostrarProdutosLista(message)
        );
    }

    //!=====================   Estagio 6 -Menu de listas para escolha de fluxo ===================
    else if (chatbot.numero_estagio === 6) {

        if (message.body === 'Continuar Pedido\nEscolha as opções de comida novamente' && message.type !== 'location') {

            chatbot.voltarEstagio(4).then(
                chatbot.mostrarProdutosBotao(message)
            )
        }

        if (message.body === 'Finalizar Pedido\nSe preparar para a entrega!' && message.type !== 'location') {
            chatbot.avancarEstagio().then(
                chatbot.enviarMensagem(message, "🤖 Por favor, envie sua localização através do Whatsapp para realizar a entrega")
            )
        }

        if (message.body === 'Reiniciar Pedido' && message.type !== 'location') {
            chatbot.numero_estagio === 1;
        }
    }
    //!=====================   Estagio 7 - Pega localização do cliente =====================

    else if (chatbot.numero_estagio === 7) {

        const endereco_cliente = estagio7.PegandoEnderecoCliente(message)
        cliente.setEndereco(endereco_cliente)

        //TODO --> Procurar uma api que pegue o endereço certinho indepedendente do que o cliente digitar

        chatbot.mostrarBotaoConfirmaPedido(message, `Voce confirma ?\n *Nome Cliente: ${cliente.getNome()}* \n *Endereço de entrega: ${cliente.getEndereco()}* `)

        chatbot.avancarEstagio().then(
            chatbot.enviarMensagem(message, 'Avançando...')
        )
    }

    //!=====================   Estagio 8 - Mostar as formas de Pagamento =====================
    else if (chatbot.numero_estagio === 8) {

        if (message.body === 'Sim' && message.type !== 'location') {
            chatbot.avancarEstagio().then(
                chatbot.mostrarFormasDePagamento(message)
            )
        }

        else {
            chatbot.numero_estagio === 7
        }


    }
    //!=====================   Estagio 9 - Mostra todas as infromações finais =====================

    else if (chatbot.numero_estagio === 9) {

        //TODO --> Procurar uma api que pegue o endereço certinho indepedendente do que o cliente digitar

        // TODO REFATORAR O ESTAGIO 9 E 10

        chatbot.enviarMensagem(message, "🤖 Seu pedido está sendo preparado!!!!!")

        //pegando a forma de pagamento
        const cliente_forma_pagamento = cliente.pegandoFormaPagamentoCliente(message)
        cliente.setFormaPagamento(cliente_forma_pagamento)
        chatbot.delay(2000).then(
            chatbot.enviarMensagem(message, `Forma de Pagamento Escolhida =  ${cliente.forma_pagamento}`)

        )


        chatbot.delay(2000).then(
            chatbot.enviarMensagem(message, `Nota Fiscal do seu pedido: \n ${cliente.gerarNotaFiscal()}`)
        )




        chatbot.avancarEstagio().then(
            chatbot.enviarMensagem(message, 'Avançando...')
        )
        //!=====================   Estagio 10 Mostra todas as infromações finais =====================
    }

    else if (chatbot.numero_estagio === 10) {
        chatbot.enviarMensagem(message, "🤖 Seu pedido está pronto para entrega!!!!!")

    }

})

