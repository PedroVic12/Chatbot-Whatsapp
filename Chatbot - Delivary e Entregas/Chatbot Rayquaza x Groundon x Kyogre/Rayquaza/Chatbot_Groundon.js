const { Client, LocalAuth, Buttons, List, MessageMedia, LegacySessionAuth } = require('whatsapp-web.js');
const Groundon = require('./src/Chatbot JS/models/core/Groundon')
const Carrinho = require("./src/Chatbot JS/models/Carrinho")
const Cliente = require("./src/Chatbot JS/models/Cliente")
const ProdutoCardapio = require('./src/Chatbot JS/models/Produto');

const Estagio1 = require('./src/Chatbot JS/views/Estagio1')
const Estagio2 = require('./src/Chatbot JS/views/Estagio2')
const Estagio3 = require('./src/Chatbot JS/views/Estagio3')
const Estagio4 = require('./src/Chatbot JS/views/Estagio4')
const Estagio5 = require('./src/Chatbot JS/views/Estagio5')

const TesteEstagio = require('./src/Chatbot JS/views/teste');

//!Inicializando o BOT
const bot_groundon = new Groundon();
const carrinho_loja = new Carrinho(bot_groundon)
const cliente = new Cliente(bot_groundon, carrinho_loja)
//const produto = new ProdutoCardapio()

const teste = new TesteEstagio()
const estagio1 = new Estagio1(bot_groundon)
const estagio2 = new Estagio2(bot_groundon)
const estagio3 = new Estagio3(bot_groundon)
const estagio4 = new Estagio4(bot_groundon, estagio2)
const estagio5 = new Estagio5(bot_groundon, carrinho_loja)


//! Talvez seja necessário um código para autenticar
bot_groundon.conectandoWpp()
    .then(() => {
        console.log('✅ Conectado com sucesso!\n\n')

    })
    .catch((error) => {
        console.log("Ops! Deu Problema ao conectar! :(")
        console.log(error)
    })
bot_groundon.contarNumeroPedidos()
bot_groundon.recebeMensagem()


//!Evento Listener para o Robo receber as mensagens
bot_groundon.whatsapp.on('message', message => {

    const GROUNDON_INICIADO = true
    bot_groundon.armazenarConversa(message);

    //! ===================== Estágio 1 - Apresentação =====================
    if (bot_groundon.numero_estagio === 1) {

        estagio1.boasVindas(message)
        bot_groundon.avancarEstagio()


    }


    //!=====================  Estágio 2 - Mostrar Menu Principal =====================
    else if (bot_groundon.numero_estagio === 2) {
        //Pegando os dados do cliente
        const nome_cliente = estagio2.getNomeCliente(message)
        cliente.setNome(nome_cliente)

        // Pegando o número de telefone
        const numero_telefone = estagio2.getTelefoneCliente(message)
        cliente.setPhoneNumber(numero_telefone)


        //TODO -> Checar client na base de Dados
        bot_groundon.delay(3000).then(
            bot_groundon.enviarMensagem(message, `✅ Prazer em te conhecer, ${nome_cliente}!`)
        );


        // TODO -> Mostra o menu principal
        try {
            bot_groundon.mostrarProdutosLista(message)
            bot_groundon.enviarMensagem(message, 'Tentativa de lista')
        } catch (error) {
            console.log('Nao foi possivel enviar a lista', error)
        }


        bot_groundon.avancarEstagio().then(
            bot_groundon.enviarMensagem(message, 'O que deseja fazer?')
        )
    }

    //!=====================  Estágio 3 - Responde as funcionalidades do Botão =====================
    if (bot_groundon.numero_estagio === 3) {

        bot_groundon.enviarMensagem(message, `Teste Estagio: ${bot_groundon.numero_estagio}`)

        //!Tentativa de conexão com o servidor python
        if (message.body === '!pedido') {

            try {
                bot_groundon.gerarPedidoJson(nome_cliente)
                bot_groundon.enviarMensagem(message, 'Json gerado!')

            } catch (error) {
                console.log('\nSEM JSON', error)
            }


        }



        //bot_groundon.avancarEstagio()

    }

    //!=====================  Estagio 4 - Cliente Escolhe os Produtos da Loja =====================
    if (bot_groundon.numero_estagio === 4) {

        bot_groundon.enviarMensagem(message, `Teste Estagio: ${bot_groundon.numero_estagio}`)

        //TODO MODIFICAR AQUI PARA UMA LISTA DOS PRODUTOS DO CLIENTE E PEGAR NA NOVA BASE DE DADOS

        if (message.body === 'Sanduíches' && message.type !== 'location') {
            // const cardapio_sanduiche = Sanduiches.getAllSanduiches()
            //estagio4.enviarListaSanduiches(message, cardapio_sanduiche)
        }

        if (message.body === 'Salgados' && message.type !== 'location') {
            //const cardapio_salgados = Salgados.getAllSalgados()
            //estagio4.enviarListaSalgados(message, cardapio_salgados)
        }

        if (message.body === 'Bebidas' && message.type !== 'location') {
            //const cardapio_bebidas = Bebidas.getAllBebidas()
            //estagio4.enviarListaBebidas(message, cardapio_bebidas)
        }

        bot_groundon.avancarEstagio()

    }

    //!=====================  Estagio 5 - Pega o pedido e adiciona no carrinho =====================
    if (bot_groundon.numero_estagio === 5) {


        bot_groundon.enviarMensagem(message, `Teste Estagio: ${bot_groundon.numero_estagio}`)


        //Escolhe o Produto
        cliente.realizaPedido(message)

        //Coloca no carrinho
        estagio5.setItensCarrinho();
        estagio5.verCarrinho(message)

        bot_groundon.avancarEstagio().then(
            bot_groundon.mostrarProdutosLista(message)
        );
    }

    //!=====================   Estagio 6 -Menu de listas para escolha de fluxo ===================
    if (bot_groundon.numero_estagio === 6) {


        //!Tentativa de conexão com o servidor python

        bot_groundon.enviarMensagem(message, `Teste Estagio: ${bot_groundon.numero_estagio}`)

        //bot_groundon.avancarEstagio()

    }



})
