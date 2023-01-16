const { Client, LocalAuth, Buttons, List, MessageMedia, MessageAck } = require('whatsapp-web.js');


class Estagio1 {

    constructor(whatsapp) {
        this.whatsapp = whatsapp;
        this.pedido_iniciado = false
        this.nome_cliente = 'nome'
    }


    //!Métodos
    async boasVindas(message) {
        this.whatsapp.sendMessage(message.from, 'Bem vindo a Citta Lanchonete, nos agradecemos sua preferencia');
        await this.whatsapp.sendMessage(message.from, 'Bem vindo ao Robô Groundon! \n\n Eu vou ser responsável pelo seu atendimento \n Antes de começarmos,  *Digite seu Nome*:');
    }


    async getNome(message) {

        this.nome_cliente = message.body;

        this.pedido_iniciado = true;
        return this.nome_cliente;


    }


    getCliente() {
        //procurar o cliente na base de dados

    }

    mostrarCliente() {
        //mostrar o cliente na tela

    }
}

module.exports = Estagio1;
