const { Client, LocalAuth, Buttons, List, MessageMedia, LegacySessionAuth } = require('whatsapp-web.js');

/**
const BancoDeDados = require("./Chatbot/Banco de Dados - EXCEL/Banco");

const Bebidas = require('./Chatbot/Cardapio - LOJA/Bebidas.js');
const Salgados = require("./Chatbot/Cardapio - LOJA/Salgados.js")
const Sanduiches = require("./Chatbot/Cardapio - LOJA/Sanduiche.js");


import Estagio2 from './Chatbot/stages/Estagio2';
import Estagio3 from './Chatbot/stages/Estagio3';
import Estagio4 from './Chatbot/stages/Estagio4';
import Estagio5 from './Chatbot/stages/Estagio5';


const estagio1 = new Estagio1(chatbot);
const estagio2 = new Estagio2(chatbot);
const estagio3 = new Estagio3(chatbot);
const estagio4 = new Estagio4(chatbot, estagio2);
const estagio5 = new Estagio5(chatbot, carrinho)

//const browser = puppeteer.launch({ args: ['--no-sandbox'] });

 */

const Groundon = require('./src/Chatbot JS/models/core/Groundon')
const Carrinho = require("./src/Chatbot JS/models/Carrinho")
const Cliente = require("./src/Chatbot JS/models/Cliente")
const Estagio1 = require('./src/Chatbot JS/views/Estagio1')
const Estagio2 = require('./src/Chatbot JS/views/Estagio2')
const TesteEstagio = require('./src/Chatbot JS/views/teste')

//!Inicializando o BOT
const bot_groundon = new Groundon();

const teste = new TesteEstagio()
const estagio1 = new Estagio1(bot_groundon)
const estagio2 = new Estagio2(bot_groundon)

const carrinho_loja = new Carrinho(bot_groundon)
const cliente = new Cliente(bot_groundon, carrinho_loja)

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

        //teste.boasVindas(message)
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
        //Menu principal tem que ser em formato de listas
        try {

            const sections = [
                {
                    title: 'Título da Seção',
                    rows: [
                        { id: 'item1', title: 'Item 1', description: 'Descrição do item 1' },
                        { id: 'item2', title: 'Item 2', description: 'Descrição do item 2' },
                    ]
                },

                {
                    title: 'Seção 2',
                    rows: [
                        { id: 'item3', title: 'Item 3', description: 'Descrição do item 3' },
                        { id: 'item4', title: 'Item 4', description: 'Descrição do item 4' }
                    ]
                }
            ];

            bot_groundon.enviarLista(message, sections, 'Botão', 'Título', 'Rodapé');
        } catch (error) {
            console.log('\n\nErro ao tentar enviar a lista', error);
        }


        const productsList = new List(
            "Here's our list of products at 50% off",
            "View all products",
            [
                {
                    title: "Products list",
                    rows: [
                        { id: "apple", title: "Apple" },
                        { id: "mango", title: "Mango" },
                        { id: "banana", title: "Banana" },
                    ],
                },
            ],
            "Please select a product"
        );

        try {
            bot_groundon.enviarMensagem(message, productsList)

        } catch (error) {
            console.log('ERROR FRACASSADO')
        }


        bot_groundon.avancarEstagio().then(
            bot_groundon.enviarMensagem(message, 'O que deseja fazer?')
        )
    }

    //!=====================  Estágio 3 - Responde as funcionalidades do Botão =====================
    if (bot_groundon.numero_estagio === 3) {


        //!Tentativa de conexão com o servidor python
        if (message.body === '!pedido') {
            bot_groundon.gerarPedidoJson(nome_cliente)
            bot_groundon.enviarMensagem(message, 'Json gerado!')

        }



        bot_groundon.avancarEstagio()

    }

    //!=====================  Estagio 4 - Cliente Escolhe os Produtos da Loja =====================
    if (bot_groundon.numero_estagio === 4) {

        bot_groundon.enviarMensagem(message, 'Teste')

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

        chatbot.avancarEstagio()

    }

    //!=====================  Estagio 5 - Pega o pedido e adiciona no carrinho =====================
    if (bot_groundon.numero_estagio === 5) {

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
    if (bot_groundon.numero_estagio === 6) {


        //!Tentativa de conexão com o servidor python

        bot_groundon.enviarMensagem(message, 'Teste')

        //bot_groundon.avancarEstagio()

    }



})
