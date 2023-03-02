const Chatbot = require("../chatbot");
const Cliente = require("../Cliente/Cliente");

class Estagio6 {
    constructor(Chatbot, Carrinho) {
        this.chatbot = Chatbot;
        this.carrinho = Carrinho;
    }

    //métodos

}

//! CÓDIGO A SER REFATORADO
// if (message.body === 'Continuar Pedido\nEscolha as opções de comida novamente' && message.type !== 'location') {

//     chatbot.voltarEstagio(4).then(
//         chatbot.mostrarProdutosBotao(message)
//     )
// }

// if (message.body === 'Finalizar Pedido\nSe preparar para a entrega!' && message.type !== 'location') {
//     chatbot.avancarEstagio().then(
//         chatbot.enviarMensagem(message, "🤖 Por favor, envie sua localização através do Whatsapp para realizar a entrega")
//     )
// }

// if (message.body === 'Reiniciar Pedido' && message.type !== 'location') {
//     chatbot.numero_estagio === 1;
// }