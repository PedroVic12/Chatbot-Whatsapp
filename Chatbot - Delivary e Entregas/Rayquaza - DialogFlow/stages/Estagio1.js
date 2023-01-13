const { Client, Buttons } = require('whatsapp-web.js');

class Estagio1 {
    constructor(whatsapp) {
        this.whatsapp = whatsapp;
        this.nome_cliente = '';
        this.pedido_iniciado = false;
    }

    async boasVindas(message) {
        this.whatsapp.sendMessage(message.from, 'Bem vindo a Citta Lanchonete, nos agradecemos sua preferencia');
        await this.whatsapp.sendMessage(message.from, 'Bem vindo ao Robô Groundon! \n\n Eu vou ser responsável pelo seu atendimento \n Antes de começarmos,  *Digite seu Nome*:');
    }

    async getNome(message) {
        if (message.body === '') { // verifica se o nome foi informado
            this.nome_cliente = message.body;
            await this.whatsapp.sendMessage(message.from, `Um prazer te conhecer! ${this.nome_cliente}`);
            return this.nome_cliente;
        }

        this.pedido_iniciado = true;
    }

    async mostrarMenu(message) {
        let button = new Buttons(`Vamos lá, ${this.nome_cliente}! Escolha uma opção abaixo do que você deseja`, [
            { body: 'Ver Cardápio' },
            { body: 'Fazer Pedido' },
            { body: 'Ver nossa Localização' }
        ], 'Chatbot Groundon', `Horário de Atendimento = ${this.getHoras()}`);

        this.whatsapp.sendMessage(message.from, button);
    }

    getHoras() {
        let data_atual = new Date();
        let hora = data_atual.getHours();
        let minuto = data_atual.getMinutes();
        return `${hora}:${minuto}`;
    }
}

module.exports = Estagio1;
