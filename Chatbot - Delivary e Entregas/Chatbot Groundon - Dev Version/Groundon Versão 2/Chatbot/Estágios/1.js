const { Client, LocalAuth, Buttons, List, MessageMedia } = require('whatsapp-web.js');
const Estagios = require('../../teste');

class Estagio1 {

    constructor(whatsapp) {
        this.whatsapp = whatsapp;
    }


    //!Métodos
    async boasVindas(message) {
        this.whatsapp.sendMessage(message.from, 'Bem vindo a Citta Lanchonete, nos agradecemos sua preferencia');
        this.whatsapp.sendMessage(message.from, 'Bem vindo ao Robô Groundon! \n Eu vou ser responsável pelo seu atendimento \n Antes de começarmos,  *Digite seu Nome*:');

        let nome_cliente = message.body;
        await this.whatsapp.sendMessage(message.from, `Um prazer te conhecer! ${nome_cliente}`);

        const nome = nome_cliente;
    }
}

module.exports = Estagio1;
