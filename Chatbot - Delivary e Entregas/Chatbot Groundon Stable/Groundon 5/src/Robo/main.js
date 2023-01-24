//! ============== MANUTENÇÃO ==============
/**
 *  Use funções para evitar repetição de código: ao invés de escrever o mesmo código várias vezes, crie uma função que realize essa tarefa e chame-a sempre que necessário.

    Use variáveis em vez de escrever o mesmo valor várias vezes: ao invés de escrever o mesmo valor várias vezes, crie uma variável e atribua-lhe esse valor. Depois, basta chamar a variável sempre que precisar desse valor.

    Use a sintaxe de funções arrow: a sintaxe de funções arrow é mais curta que a sintaxe de funções convencional, o que pode ajudar a reduzir o tamanho do seu código.
*/
//! ============== MANUTENÇÃO ==============

//! Importações e variáveis GLOBAIS
// Documentação:  https://wwebjs.dev/guide/#replying-to-messages
const Groundon = require('./chatbot.js');
const BancoDeDados = require("./Chatbot/Banco de Dados - EXCEL/Banco");

const Estagio1 = require('./Chatbot/stages/Estagio1')
const Estagio2 = require('./Chatbot/stages/Estagio2')
const Estagio3 = require('./Chatbot/stages/Estagio3')
const Estagio4 = require('./Chatbot/stages/Estagio4')

const Bebidas = require('./Chatbot/Cardapio - LOJA/Bebidas.js');
const Salgados = require("./Chatbot/Cardapio - LOJA/Salgados")
const Sanduiches = require("./Chatbot/Cardapio - LOJA/Sanduiche");

const Carrinho = require("./Chatbot/Pedido/Carrinho");
const Cliente = require("./Chatbot/Pedido/Cliente");
const { List } = require('whatsapp-web.js');

//!Inicializando o BOT
const chatbot = new Groundon();
const estagio1 = new Estagio1(chatbot);
const estagio2 = new Estagio2(chatbot);
const estagio3 = new Estagio3(chatbot);
const estagio4 = new Estagio4(chatbot, estagio2);
const Banco = new BancoDeDados(chatbot)
const cliente = new Cliente(chatbot)
const carrinho = new Carrinho(chatbot)


function delay(tempo) {
    return new Promise(resolve => setTimeout(resolve, tempo));
}

// Talvez seja necessário um código para autenticar 
chatbot.conectandoWpp()
    .then(() => {
        // Código a ser executado após a promise ser resolvida
        console.log('Conectado com sucesso!\n\n')

    })
    .catch((error) => {
        // Código a ser executado após a promise ser rejeitada
        console.log("Ops Deu Problema ao conectar! :(")
        console.log(error)
    })

chatbot.recebeMensagem()

//Evento Listener para o Robo receber as mensagens
chatbot.whatsapp.on('message', message => {

    //! ===================== Estágio 1 - Apresentação =====================
    if (chatbot.numero_estagio === 1) {
        estagio1.boasVindas(message)
        chatbot.avancarEstagio()
    }

    //!=====================  Estágio 2 - Mostrar Opções =====================
    else if (chatbot.numero_estagio === 2) {

        estagio2.getNomeCliente(message)
        estagio2.mostrarMenuPrincipal(message)

        // TODO Verificar na Base de dados com try e catch com uma função
        // excel_janeiro = "Chatbot/Banco de Dados - EXCEL/Janeiro/base_de_dados_janeiro.xlsx"
        // let dados_excel = Banco.lerDadosExcel(excel_janeiro)
        //chatbot.enviarMensagem(message, "Base de Dados Atual " + dados_excel)

        //TODO criar um objeto Cliente(nome) que pegue todos as informações do cliente atual
        //estagio2.infoCliente(message)

        
        chatbot.avancarEstagio()
    }


    //!=====================  Estágio 3 - Anota o pedido e coloca no carrinho  =====================
    else if (chatbot.numero_estagio === 3) {
        if (message.body === 'Ver Cardápio') {
            estagio3.mostrarCardapioNoChat(message)
        }
        if (message.body === 'Fazer Pedido') {
            chatbot.avancarEstagio().then(
                estagio4.mostrarProdutos(message)
            )
        }
        if (message.body === 'Ver nossa Localização') {
            estagio3.mostrarLocal(message)
        }
    }
    //!=====================  Estagio 4 - Cliente Escolhe Pedido e faz Pagamento ===================== 
    else if (chatbot.numero_estagio === 4) {

        //TODO Modularizar Instanciando os produtos do estabelecimento
        const cardapio_sanduiche = Sanduiches.getAllSanduiches()
        const cardapio_bebidas = Bebidas.getAllBebidas()
        const cardapio_salgados = Salgados.getAllSalgados()

        //TODO Fazer uma função dentro do estágio 4 para cada produto
        if (message.body === 'Sanduíches') {
            let sanduiche_array = []

            // Percorre todas as bebidas e adiciona a lista
            cardapio_sanduiche.forEach(sanduiche => {
                sanduiche_array.push({ title: sanduiche.nome, description: `R$ ${sanduiche.preco}` })
            })

            // Guarda o array para colocar dentro da lista do wpp
            let itens_lista_wpp = [{
                title: "==> ESCOLHA os Sanduíches MAIS CAROS ", rows: sanduiche_array
            }]
            chatbot.enviarLista(message, `${estagio2.getNome()}, Escolha os itens do seu pedido`, "FAZER PEDIDO", itens_lista_wpp)
        }

        let bebidas_array = []
        if (message.body === 'Bebidas') {

            // Percorre todas as bebidas e adiciona a lista
            cardapio_bebidas.forEach(bebida => {
                bebidas_array.push({ title: bebida.nome, description: `R$ ${bebida.preco}` });
            });

            // Guarda o array para colocar dentro da lista do wpp
            let itens_lista_wpp = [{
                title: "==> ESCOLHA AS BEBIDAS MAIS CARAS", rows: bebidas_array
            }]

            chatbot.enviarLista(message, "ESCOLHA O PRODUTO QUE VOCE DESEJA", "FAZER PEDIDO", itens_lista_wpp)
        }

        if (message.body === 'Salgados') {

            let salgados_array = []

            // Percorre todas as bebidas e adiciona a lista
            cardapio_salgados.forEach(salgado => {
                salgados_array.push({ title: salgado.nome, description: `R$ ${salgado.preco}` });
            })

            // Guarda o array para colocar dentro da lista do wpp
            let itens_lista_wpp = [{
                title: "==> ESCOLHA os Salgados MAIS CAROS ", rows: salgados_array
            }]

            chatbot.enviarLista3(message, "COMPRE AQUI", "FAZER PEDIDO", itens_lista_wpp)
        }

        if (message.body === 'Finalizar Pedido') { }

        if (message.body === 'Reiniciar Pedido') { }


        //Adicionando no carrinho
        chatbot.enviarMensagem(message, `Adicionando no carrinho... ${bebidas_array}`)
        cliente.realizaPedido(message, bebidas_array)


        chatbot.enviarMensagem(message, "Bom Apetite!")
    }

    //!=====================  Estagio 5 - Entrega e Resumo ===================== 

    else if (chatbot.numero_estagio === 5) {
        chatbot.enviarMensagem(message, "Estamos processando seu a sua entrega, aguarde um momento")

    }

    //!=====================   Estagio 6 - Finalização ===================== 

    else if (chatbot.numero_estagio == 6) {
        chatbot.enviarMensagem(message, "Seu pedido está pronto para entrega!!!!!")
    }

})


