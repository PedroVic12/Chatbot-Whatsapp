const venom = require('venom-bot');

class Groundon {
    constructor() {
        this.client = null;
    }

    async conectar() {
        try {
            this.client = await venom.create({
                session: 'session-name' // nome da sessão
            });

            this.client.onMessage((message) => {
                if (message.body === 'Hi' && message.isGroupMsg === false) {
                    this.client
                        .sendText(message.from, 'Welcome Venom 🕷')
                        .then((result) => {
                            console.log('Result: ', result); // retorna o objeto de sucesso
                        })
                        .catch((error) => {
                            console.error('Error when sending: ', error); // retorna o objeto de erro
                        });
                }
            });

            console.log('Groundon conectado com sucesso!');
        } catch (error) {
            console.error('Erro ao conectar o Groundon:', error);
        }
    }
}

function main() {
    const groundon = new Groundon();
    groundon.conectar();
}

main();
