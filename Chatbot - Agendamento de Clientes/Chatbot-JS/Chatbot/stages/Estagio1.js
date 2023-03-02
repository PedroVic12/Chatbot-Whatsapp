const Chatbot = require("../chatbot");

//Apresentação, Consulta No Banco de dados, iniciar Atendimento
class Estagio1 {

    //! Receber a mensagem do usuario e identificar a intenção

    //Herança implícita da classe Chatbot
    constructor(Chatbot) {
        this.chatbot = Chatbot;

    }

    boasVindas(message) {

        const nome_estabelicimento = 'Salão de Beleza Tom e Fábio'

        this.chatbot.enviarMensagem(message, `Bem-vindo ao Salão *${nome_estabelicimento}* Obrigado por escolher a nossos Serviços. \n Eu sou o Robô Kyogre e estou aqui para ajudá-lo. `);
        this.chatbot.enviarMensagem(message, "Antes de começarmos, por favor, digite seu *NOME*:")

    }



}

module.exports = Estagio1;