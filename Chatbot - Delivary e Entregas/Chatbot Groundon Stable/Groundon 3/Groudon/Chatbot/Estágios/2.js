const { Client, LocalAuth, Buttons, List, MessageMedia, MessageAck } = require('whatsapp-web.js');
const Estagio1 = require("./1")



class Estagio2 {

    constructor(whatsapp) {
        this.whatsapp = whatsapp;

        this.nome_cliente = ''
        this.cliente_escolheu_pedido = false
        this.pedido_iniciado = false
    }



    //!Métodos

    getHoras() {
        let data_atual = new Date();
        let hora = data_atual.getHours();
        let minuto = data_atual.getMinutes();
        return hora + ":" + minuto
    }

    async getNome(message) {

        this.nome_cliente = message.body;
        await this.whatsapp.sendMessage(message.from, `Um prazer te conhecer! ${this.nome_cliente}`);
        this.pedido_iniciado = true;
        let nome = this.nome_cliente
        await this.whatsapp.sendMessage(message.from, `Vamos iniciar o atendimento`);

        return nome;
    }


    async mostrarMenu(message) {

        //let estagio2 = new Estagio2(this.whatsapp)

        //Apresentando o Menu
        let button = new Buttons(`Vamos lá, ${this.nome_cliente}! Escolha uma opção abaixo do que voce deseja`, [
            { body: 'Ver Cardápio' },
            { body: 'Fazer Pedido' },
            { body: 'Ver nossa Localização' }
        ], 'Chatbot Groundon', `Horário de Atendimento = ${this.getHoras()}`);

        await this.whatsapp.sendMessage(message.from, button)


    }
}

module.exports = Estagio2;
