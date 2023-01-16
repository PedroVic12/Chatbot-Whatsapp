const { Client, LocalAuth, Buttons, List, MessageMedia, MessageAck, LegacySessionAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

class Chatbot {
    constructor() {
        // this._chatbot = new Chatbot();
        this.numero_estagio = 1

        //! Instanciando o Objeto com o nome do Cliente
        this.whatsapp = new Client({
            authStrategy: new LocalAuth({ clientId: "BigBi-Citta" })
        });

        const wpp = this.whatsapp;
        //const whatsapp = new Client();
    }

    conectandoWpp = () => {


        return new Promise((resolve, reject) => {
            console.log("\nIniciando o Chatbot...")
            console.log('Gerando QR code...');

            this.whatsapp.on('qr', qr => {
                qrcode.generate(qr, { small: true });
            });


            this.whatsapp.on('ready', () => {
                console.log('whatsapp pronto! Pode usar agora :)');
                resolve(this.whatsapp);
            });
            this.whatsapp.initialize();
        });
    };

    recebeMensagem() {

        //hora atual
        let data_atual = new Date();
        let hora = data_atual.getHours();
        let minuto = data_atual.getMinutes();

        this.whatsapp.on('message', message => {

            let nome = message._data.notifyName;
            let telefone = message.from.split('@')[0]

            console.log("\n")
            console.log("Data  = ", data_atual)
            console.log("Horário inicio do Atendimento = " + hora + ":" + minuto);
            console.log("Nome do Cliente = ", nome)
            console.log("Número do Usuário = " + telefone);
            console.log("Mensagem recebida = " + message.body); //Salvar dentro de uma lista para usar I.A depois
            console.log("Fluxo Atual =  ", this.numero_estagio)
            console.log("\n")
        });

    };

    //! Funções anonimas
    avancarEstagio() {
        this.numero_estagio++
        console.log("Avançando o estágio!")
    }

    enviarMensagem(message, text) {
        return this.whatsapp.sendMessage(message.from, text);
    }

    enviarLista(whatsapp, message, items) {
        const list = new List(items);
        return whatsapp.sendMessage(message.from, list);
    }

    enviarBotao(whatsapp, message, text, buttons) {
        const botoes = new Buttons(text, buttons);
        return whatsapp.sendMessage(message.from, botoes);
    }

    getHoras() {
        let data_atual = new Date();
        let hora = data_atual.getHours();
        let minuto = data_atual.getMinutes();

        return hora + ":" + minuto
    }

}

module.exports = Chatbot;