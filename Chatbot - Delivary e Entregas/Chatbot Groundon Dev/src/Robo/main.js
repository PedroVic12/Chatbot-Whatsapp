//! ============== MANUTENÇÃO ==============
/**
 *  Use funções para evitar repetição de código: ao invés de escrever o mesmo código várias vezes, crie uma função que realize essa tarefa e chame-a sempre que necessário.

    Use variáveis em vez de escrever o mesmo valor várias vezes: ao invés de escrever o mesmo valor várias vezes, crie uma variável e atribua-lhe esse valor. Depois, basta chamar a variável sempre que precisar desse valor.

    Limite o uso de bibliotecas externas: ao invés de incluir muitas bibliotecas externas, tente usar apenas aquelas que realmente são necessárias para seu projeto. Isso pode ajudar a reduzir o tamanho do seu código.

    Use a sintaxe de funções arrow: a sintaxe de funções arrow é mais curta que a sintaxe de funções convencional, o que pode ajudar a reduzir o tamanho do seu código.

    Remova comentários desnecessários: remova comentários que já são explicativos pelo próprio código ou que não acrescentam nenhum valor ao seu projeto. Isso pode ajudar a reduzir o tamanho do seu código.
*/
//! ============== MANUTENÇÃO ==============

//! Importações 
// Documentação:  https://wwebjs.dev/guide/#replying-to-messages

// const { Client, LocalAuth, Buttons, List, MessageMedia, MessageAck, LegacySessionAuth } = require('whatsapp-web.js');
// const qrcode = require('qrcode-terminal');

const Groundon = require('./chatbot.js');
const Estagio1 = require('./Chatbot/stages/Estagio1')
const Estagio2 = require('./Chatbot/stages/Estagio2')

//!Inicializando o BOT
const chatbot = new Groundon();
const estagio1 = new Estagio1(chatbot);
const estagio2 = new Estagio2(chatbot)

function delay() {
    return new Promise(resolve => setTimeout(resolve, 1000));

}

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

        // Boas Vindas
        chatbot.enviarMensagem(message, `Bem-vindo a Citta Lanchonete! Obrigado por escolher a nossa lanchonete. \n Eu sou o Robô Groundon e estou aqui para ajudá-lo. `);

        estagio1.boasVindas(message)

        delay()
        chatbot.avancarEstagio()
    }

    if (chatbot.numero_estagio === 2) {

        //Pegando o nome do cliente
        estagio2.getNomeCliente(message)

        // Verificar na Base de dados com try e catch
        console.log("Estou no Estágio 2")


        // Mostrando o Menu
        // chatbot.mostrarCardapio(whatsapp, message)
        // chatbot.enviarMensagem(whatsapp, message, `Horário de Atendimento = ${chatbot.getHoras()}`)
        // whatsapp.sendMessage(message.from, `Horário de Atendimento = ${chatbot.getHoras()}`)

    }


    //const nome_cliente = chatbot.getNome(whatsapp, message);
    chatbot.enviarMensagem(whatsapp, message, `Um prazer te conhecer, ${nome_cliente}`)


})


//! Estágio 2 - Mostrar Opções

//! Estágio 3 - Pedido


//! Estagio 4 - Pagamento


//! Estagio 5 - Entrega e Resumo


//! Estagio 6 - Finalização

