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
const Estagio1 = require('./Chatbot/stages/Estagio1')
const Estagio2 = require('./Chatbot/stages/Estagio2')
const Estagio3 = require('./Chatbot/stages/Estagio3')
const Estagio4 = require('./Chatbot/stages/Estagio4')
const BancoDeDados = require("./Chatbot/Banco de Dados - EXCEL/Banco");
const Bebidas = require('./Chatbot/Cardapio - LOJA/Bebidas.js');
const Salgados = require("./Chatbot/Cardapio - LOJA/Salgados")
const Sanduiches = require("./Chatbot/Cardapio - LOJA/Sanduiche");
const { List } = require('whatsapp-web.js');

//!Inicializando o BOT
const chatbot = new Groundon();
const estagio1 = new Estagio1(chatbot);
const estagio2 = new Estagio2(chatbot);
const estagio3 = new Estagio3(chatbot);
const estagio4 = new Estagio4(chatbot, estagio2);
const Banco = new BancoDeDados(chatbot)


function delay() {
    return new Promise(resolve => setTimeout(resolve, 1000));

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

        //Pegando o nome do cliente
        estagio2.getNomeCliente(message)

        // Mostrando o Menu
        estagio2.mostrarMenuPrincipal(message)
        //estagio2.mandarMensagemTeste(message)

        // TODO Verificar na Base de dados com try e catch com uma função
        excel_janeiro = "Chatbot/Banco de Dados - EXCEL/Janeiro/base_de_dados_janeiro.xlsx"
        dados = Banco.lerDadosExcel(excel_janeiro)
        console.log(dados)

        //TODO criar um objeto Cliente(nome) que pegue todos as informações do cliente atual
        estagio2.infoCliente(message)
        chatbot.enviarMensagem(message, `Horário de Atendimento = ${chatbot.getHoras()}`)
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
        chatbot.enviarMensagem(message, "Aqui está o seu pedido: ")

        // TODO pegar o objeto que vem de cada produto
        //Instanciando os produtos do estabelecimento
        let salgado = new Salgados("Coxinha", 2.50)
        let sanduiche = new Sanduiches("Hambúrguer", 12.99);
        let bebida = new Bebidas("Coca-cola", 4.99);

        // Mandando a lista de produtos para o cliente
        const sendList = function () {
            let _title = 'COMPRE AQUI';
            let _btnPedido = "Fazer Pedido"
            let _titulo = "Titulo"
            let _footer = "Footer"
            let sections = [
                { title: bebida.nome, description: `Preço: R$ ${bebida.preco}` },
                { title: sanduiche.nome, description: `Preço: R$ ${sanduiche.preco}` },
                { title: salgado.nome, description: `Preço: R$ ${salgado.preco}` }
            ];
            const _itens_lista = new List(_title, _btnPedido, sections, "_titulo", "_footer");
            chatbot.enviarLista_old(message, _itens_lista);
        }
        //sendList()



        //TODO Criar uma função para enviar a lista de produtos
        if (message.body === 'Salgados') {
            let sections = [{
                title: "==> ESCOLHA os Salgados MAIS CAROS ", rows:
                    [
                        { title: salgado.nome, description: "salgado.preco" },
                    ]
            }]
            chatbot.enviarLista_old(message, sections)
        }

        if (message.body === 'Bebidas') {
            let sections = [{
                title: "==> ESCOLHA OS REFRIGERANTES MAIS CAROS", rows:
                    [
                        { title: bebida.nome, description: "Preço = 1800k" },
                    ]
            }]
            chatbot.enviarLista_old(message, sections)
            chatbot.sendListWhatsapp(message, bebida.nome, bebida.preco)

        }

        if (message.body === 'Sanduíches') {

            let DEBUG = `${sanduiche.getPreco()}`
            let sections = [{
                title: "==> ESCOLHA os Sanduíches MAIS CAROS ", rows:
                    [
                        { title: sanduiche.nome, description: DEBUG },
                    ]
            }]
            chatbot.enviarLista_old(message, sections)
        }


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


