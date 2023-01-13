const { Client, LocalAuth, Buttons } = require('whatsapp-web.js');

class Bot_Groundon {

    constructor() {
        //Instanciando um novo Objeto de Chatbot
        this.whatsapp = new Client({
            authStrategy: new LocalAuth({ clientId: "client-one" })
        });

        this.qrcode = require('qrcode-terminal');
    }


    conectandoWpp() {
        console.log("Gerando QR Code...\n")
        this.whatsapp.on('qr', qr => {
            this.qrcode.generate(qr, { small: true });
        });

        this.whatsapp.on('ready', () => {
            console.log('Client is ready! Pronto para usar agora :) ');
        });

        console.log("Inicializando o BOT...\n")
        this.whatsapp.initialize();
    }

    recebeMensagem() {

        //hora atual
        let data_atual = new Date();
        let hora = data_atual.getHours();
        let minuto = data_atual.getMinutes();

        this.whatsapp.on('message', message => {
            console.log("Data  = ", data_atual)
            console.log("Horário da mensagem inicio do Atendimento = " + hora + ":" + minuto);
            console.log("Número do Usuário = " + message.from.split('@')[0]);
            console.log("Mensagem recebida = " + message.body);
            console.log("\n")
        });

    }

    mandaMensagem() {
        //evento esperando Mensagem
        this.whatsapp.on('message', message => {

            this.whatsapp.sendMessage(message.from, 'Bem vindo ao Robô Groundon!');

            //comandos Bot
            if (message.body === '!ping') {
                this.whatsapp.sendMessage(message.from, 'pong');
            }
        });
    }

    menu() {

        //evento esperando Mensagem
        this.whatsapp.on('message', message => {

            //comandos Bot
            if (message.body === '!botão') {

                let button = new Buttons('Button body', [
                    { body: 'bt1' },
                    { body: 'bt2' },
                    { body: 'bt3' }
                ], 'title', 'footer');


                this.whatsapp.sendMessage(message.from, button)
            }
        });

    }
}

module.exports = Bot_Groundon;
