const Rayquaza = require("../models/core/Rayquaza");

class TesteEstagio extends Rayquaza {
    constructor() {
        super(); // Chama o construtor da classe pai (Rayquaza)
    }

    boasVindas(message) {
        this.enviarMensagem(message, `Bem-vindo a Lanchonete *Citta* Obrigado por escolher a nossos Serviços. \n Eu sou o Robô Groundon e estou aqui para ajudá-lo. `);
        this.enviarMensagem(message, "Antes de começarmos, por favor, *Digite Seu Nome*:")
    }
}

module.exports = TesteEstagio;
