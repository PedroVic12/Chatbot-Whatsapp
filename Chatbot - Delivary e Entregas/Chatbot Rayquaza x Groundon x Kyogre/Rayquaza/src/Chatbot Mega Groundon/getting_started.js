const venom = require('venom-bot');

class Groundon {
    constructor() {
        this.numero_estagio = 1;
        this.conversas = [[], [], [], [], [], [], [], [], [], []];
        this.numero_pedido_dia = 1;
        this.whatsapp = null;
    }

    async conectarWpp() {
        try {
            this.whatsapp = await venom.create({
                session: 'session-name' // nome da sessão
            });

            // Chamada para a função start fora da classe
            start(this.whatsapp);
        } catch (error) {
            throw error;
        }
    }
}

function start(client) {
    client.onMessage((message) => {
        if (message.body === 'Hi' && message.isGroupMsg === false) {
            client
                .sendText(message.from, 'Welcome Venom 🕷')
                .then((result) => {
                    console.log('Result: ', result); // retorna o objeto de sucesso
                })
                .catch((error) => {
                    console.error('Error when sending: ', error); // retorna o objeto de erro
                });
        }
    });
}


function main() {
    const groundon = new Groundon();
    groundon.conectarWpp()
        .then(() => {
            console.log('Bot conectado e pronto para receber mensagens.');
        })
        .catch((error) => {
            console.error('Erro ao conectar o bot:', error);
        });
}

main()