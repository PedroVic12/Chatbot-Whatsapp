const venom = require('venom-bot');

class Groundon {
    constructor() {
        this.client = null;
    }

    async conectar() {
        try {
            this.client = await venom.create();

            this.client.onMessage((message) => {
                // Trate as mensagens recebidas aqui
                if (message.body === 'Oi' && message.isGroupMsg === false) {
                    client
                        .sendText(message.from, 'Welcome Venom 🕷')
                        .then((result) => {
                            console.log('Result: ', result); //return object success
                        })
                        .catch((erro) => {
                            console.error('Error when sending: ', erro); //return object error
                        });
                }

                console.log('Mensagem recebida:', message.body);
            });

            console.log('Groundon conectado com sucesso!');
        } catch (error) {
            console.error('Erro ao conectar o Groundon:', error);
        }
    }

    async enviarMensagem(numero, mensagem) {
        if (!this.client) {
            console.error('Groundon não está conectado.');
            return;
        }

        try {
            await this.client.sendText(numero, mensagem);
            console.log('Mensagem enviada com sucesso:', mensagem);
        } catch (error) {
            console.error('Erro ao enviar a mensagem:', error);
        }
    }
}

module.exports = Groundon;


function main() {
    const groundon = new Groundon();
    groundon.conectar();
    //groundon.enviarMensagem('5511999999999', 'Olá, tudo bem?');
}

main()