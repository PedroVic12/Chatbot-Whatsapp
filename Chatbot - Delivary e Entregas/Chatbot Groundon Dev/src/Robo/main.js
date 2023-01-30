//! ============== MANUTENÇÃO ==============
/**
 *  Use funções para evitar repetição de código: ao invés de escrever o mesmo código várias vezes, crie uma função que realize essa tarefa e chame-a sempre que necessário.

    Use variáveis em vez de escrever o mesmo valor várias vezes: ao invés de escrever o mesmo valor várias vezes, crie uma variável e atribua-lhe esse valor. Depois, basta chamar a variável sempre que precisar desse valor.

    Use a sintaxe de funções arrow: a sintaxe de funções arrow é mais curta que a sintaxe de funções convencional, o que pode ajudar a reduzir o tamanho do seu código.
*/
//! ============== MANUTENÇÃO ==============

//! Importações e variáveis GLOBAIS
// Documentação:  https://wwebjs.dev/guide/#replying-to-messages
const Groundon = require('./Chatbot/chatbot');
const BancoDeDados = require("./Chatbot/Banco de Dados - EXCEL/Banco");

const Estagio1 = require('./Chatbot/stages/Estagio1')
const Estagio2 = require('./Chatbot/stages/Estagio2')
const Estagio3 = require('./Chatbot/stages/Estagio3')
const Estagio4 = require('./Chatbot/stages/Estagio4')
const Estagio5 = require('./Chatbot/stages/Estagio5')

const Bebidas = require('./Chatbot/Cardapio - LOJA/Bebidas.js');
const Salgados = require("./Chatbot/Cardapio - LOJA/Salgados.js")
const Sanduiches = require("./Chatbot/Cardapio - LOJA/Sanduiche.js");

const Carrinho = require("./Chatbot/Pedido/Carrinho");
const Cliente = require("./Chatbot/Pedido/Cliente");
const { List } = require('whatsapp-web.js');

//!Inicializando o BOT
const chatbot = new Groundon();
const Banco = new BancoDeDados(chatbot)

const carrinho = new Carrinho(chatbot)
const cliente = new Cliente(chatbot, carrinho)

const estagio1 = new Estagio1(chatbot);
const estagio2 = new Estagio2(chatbot);
const estagio3 = new Estagio3(chatbot);
const estagio4 = new Estagio4(chatbot, estagio2);
const estagio5 = new Estagio5(chatbot, carrinho)



//! Talvez seja necessário um código para autenticar
chatbot.conectandoWpp()
    .then(() => {
        // Código a ser executado após a promise ser resolvida
        console.log('✅ Conectado com sucesso!\n\n')

    })
    .catch((error) => {
        // Código a ser executado após a promise ser rejeitada
        console.log("Ops Deu Problema ao conectar! :(")
        console.log(error)
    })
chatbot.contarNumeroPedidos()
chatbot.recebeMensagem()



//Evento Listener para o Robo receber as mensagens
chatbot.whatsapp.on('message', message => {

    chatbot.armazenarConversa(message);

    //! ===================== Estágio 1 - Apresentação =====================
    if (chatbot.numero_estagio === 1) {
        estagio1.boasVindas(message)
        chatbot.avancarEstagio()
    }



    //!=====================  Estágio 2 - Mostrar Opções =====================
    else if (chatbot.numero_estagio === 2) {

        estagio2.getNomeCliente(message)

        // TODO Verificar na Base de dados com try e catch com uma função
        // excel_janeiro = "Chatbot/Banco de Dados - EXCEL/Janeiro/base_de_dados_janeiro.xlsx"
        // let dados_excel = Banco.lerDadosExcel(excel_janeiro)
        //chatbot.enviarMensagem(message, "Base de Dados Atual " + dados_excel)

        //TODO criar um objeto Cliente(nome) que pegue todos as informações do cliente atual
        //estagio2.infoCliente(message)

        chatbot.enviarMensagem(message, 'Ola mundo!')

        chatbot.avancarEstagio().then(
            estagio2.mostrarMenuPrincipal(message)
        )
    }



    //!=====================  Estágio 3 - Anota o pedido e coloca no carrinho  =====================
    else if (chatbot.numero_estagio === 3) {
        if (message.body === 'Ver Cardápio' && message.type !== 'location') {
            //estagio3.mostrarCardapioNoChat(message)
            chatbot.enviarMensagem(message, 'Vou mostrar o cardapio em PDF!')
        }
        if (message.body === 'Fazer Pedido' && message.type !== 'location') {
            chatbot.avancarEstagio().then(
                chatbot.enviarMensagem(message, 'processando...')
            ).then(
                chatbot.mostrarProdutosBotao(message)
            )

        }
        if (message.body === 'Ver nossa Localização' && message.type !== 'location') {
            estagio3.mostrarLocal(message)
        }
    }



    //!=====================  Estagio 4 - Cliente Escolhe os Produtos da Loja =====================
    else if (chatbot.numero_estagio === 4) {

        //chatbot.promiseBotao(message)

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

    //!=====================  Estagio 5 - Entrega e Resumo ===================== 

    else if (chatbot.numero_estagio === 5) {

        //TODO Adicionando no carrinho ----> BUG AQUI DENTRO DESSA FUNÇÂO
        cliente.realizaPedido(message)

        //TODO Mostrar o Carrinho
        carrinho.adicionarProdutoCarrinho(carrinho.getNameProductsMarket()) // estagio 5
        chatbot.enviarMensagem(message, carrinho.verCarrinho()) // estagio 5

        chatbot.avancarEstagio().then(
            chatbot.mostrarProdutosLista(message)
        )
    }

    //!=====================   Estagio 6 - Finalização ===================== 

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

    else if (chatbot.numero_estagio === 7) {
        const address_user = chatbot.getLastMessage(message)


        if (message.type === 'location') {
            cliente.getAddressFromCoordinates(message)
            //cliente.getLocation(message)
        }


        chatbot.avancarEstagio().then(
            chatbot.mostrarBotaoConfirmaPedido(message,`Voce confirma? \n *Nome Cliente: ${estagio2.getNome()}* \n*Endereço de entrega: ${address_user}*`)
        )
    }

    else if (chatbot.numero_estagio === 8) {

        if (message.body ==='Sim' && message.type !== 'location'){
            chatbot.avancarEstagio().then(
                chatbot.mostrarFormasDePagamento(message)
            )
        }

        else{
            chatbot.numero_estagio === 7
        }


    }

    else if (chatbot.numero_estagio === 9) {

        cliente.setPagamento(message)
        cliente.getPagamento(message)

        // TODO armazenar na base de dados
        cliente.gerarNotaFiscal(message)  //Mudar de objeto --> Chatbot que tem que fazer isso

        chatbot.enviarMensagem(message, "🤖 Seu pedido está sendo preparado!!!!!")

    }

    else if (chatbot.numero_estagio === 10) {
        chatbot.enviarMensagem(message, "🤖 Seu pedido está pronto para entrega!!!!!")

    }

})


