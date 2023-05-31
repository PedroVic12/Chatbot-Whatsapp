const Rayquaza = require("../models/core/Groundon");


//Apresentação, Consulta No Banco de dados, iniciar Atendimento
class Estagio1 {


    //Herança implícita da classe Chatbot
    constructor(Rayquaza) {
        this.chatbot = Rayquaza;

    }

    boasVindas(message) {
        this.chatbot.enviarMensagem(message, `Bem-vindo a Lanchonete *Citta RJ* Obrigado por escolher a nossos Serviços. \n Eu sou o Robô Groundon e estou aqui para ajudá-lo. `);
        this.chatbot.enviarMensagem(message, "Antes de começarmos, por favor, *Digite Seu Nome*:")

    }



}

module.exports = Estagio1;

