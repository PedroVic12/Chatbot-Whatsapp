//! ============== MANUTENÇÃO ==============
/**
 *  Use funções para evitar repetição de código: ao invés de escrever o mesmo código várias vezes, crie uma função que realize essa tarefa e chame-a sempre que necessário.

    Use variáveis em vez de escrever o mesmo valor várias vezes: ao invés de escrever o mesmo valor várias vezes, crie uma variável e atribua-lhe esse valor. Depois, basta chamar a variável sempre que precisar desse valor.

    Use a sintaxe de funções arrow: a sintaxe de funções arrow é mais curta que a sintaxe de funções convencional, o que pode ajudar a reduzir o tamanho do seu código.
*/
//! ============== MANUTENÇÃO ==============

//! Importações 
// Documentação:  https://wwebjs.dev/guide/#replying-to-messages
const Groundon = require('./chatbot.js');
const Estagio1 = require('./Chatbot/stages/Estagio1')
const Estagio2 = require('./Chatbot/stages/Estagio2')
const Estagio3 = require('./Chatbot/stages/Estagio3')
const Estagio4 = require('./Chatbot/stages/Estagio4')
const BancoDeDados = require("./Chatbot/Banco de Dados/Banco")


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
        console.log('Conectado com sucesso!')

    })
    .catch((error) => {
        // Código a ser executado após a promise ser rejeitada
        console.log("Ops Deu Problema ao conectar!")
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

        // TODO Verificar na Base de dados com try e catch
        dados = Banco.lerDadosExcel()
        console.log(dados)
        chatbot.enviarMensagem(message, `Horário de Atendimento = ${chatbot.getHoras()}`)

        chatbot.avancarEstagio()

        estagio2.infoCliente(message)

    }

    //!=====================  Estágio 3 - Anota o pedido e coloca no carrinho  =====================
    else if (chatbot.numero_estagio === 3) {

        //chatbot.enviarBotao(message, "Escolha as opções", ["Voltar", "Fazer Pedido", "Teste"])

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

    //! Estagio 4 - Pagamento
    else if (chatbot.numero_estagio === 4) {

        chatbot.enviarMensagem(message, "Estamos processando seu pedido, aguarde um momento")

        //chatbot.enviarBotao(message, "Escolha as opções", ["Sim", "Não"])

        sections = [{ title: 'Section Title', rows: [{ title: 'Lista 1', description: "Descrição do item" }, { title: "Lista 2" }] }]
        chatbot.enviarLista(message, sections)

        //Cliente Escolhe o que vai pedir

    }

})

//! Estagio 5 - Entrega e Resumo


//! Estagio 6 - Finalização

