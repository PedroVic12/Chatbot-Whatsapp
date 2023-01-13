const { Client, LocalAuth, Buttons, List, MessageMedia } = require('whatsapp-web.js');

class Estagios {
    constructor() {
        this.estagio = 1;
    }

    avancarEstagio() {
        this.estagio++;
    }
}

class Main {
    constructor(whatsapp) {
        this.whatsapp = whatsapp;

        this.whatsapp = new Client({
            authStrategy: new LocalAuth({ clientId: "client-one" })
        });
    }

    async iniciar() {
        const Estagio1 = require('./Chatbot/Estágios/1');

        const estagios = new Estagios();

        const estagio1 = new Estagio1(this.whatsapp);

        this.whatsapp.on('message', async message => {
            if (estagios.estagio === 1) {
                await estagio1.boasVindas(message);
                estagios.avancarEstagio();
            } // ... código para os demais estágios aqui
        });
    }
}

module.exports = Main;

const chatbot = new Main(this.whatsapp);

chatbot.iniciar();