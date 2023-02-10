const Chatbot = require("../chatbot");

//Apresentação, Consulta No Banco de dados, iniciar Atendimento
class Estagio1 {


    //Herança implícita da classe Chatbot
    constructor(Chatbot) {
        this.chatbot = Chatbot;

    }

    boasVindas(message) {

        this.chatbot.enviarMensagem(message, `Bem-vindo a *Night Wolf | Lanchonete*! Obrigado por escolher a nossa lanchonete. \n Eu sou o Robô Groundon e estou aqui para ajudá-lo. `);
        this.chatbot.enviarMensagem(message, "Antes de começarmos, por favor, digite seu *nome*:")

    }



}

module.exports = Estagio1;