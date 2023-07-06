const venom = require('venom-bot');

class GroundonController {
    constructor() {
        this.whatsapp = null;
    }

    async conectarWpp() {
        try {
            this.whatsapp = await venom.create({
                session: 'CITTA-RioDeJaneiro' // nome da sessão
            });

            console.log('Conectado ao WhatsApp com sucesso!');
        } catch (error) {
            console.error('Erro ao conectar ao WhatsApp:', error);
        }
    }

    // Restante do código...

    startChatbot() {
        this.whatsapp.onStateChanged((state) => {
            if (state === 'CONNECTED') {
                const groundonView = new GroundonView(this.whatsapp, this);
                groundonView.enviarMensagem('Hi', 'Welcome to Venom 🕷, Spider-Man!');
            }
        });
    }

    VenomMsgBot() {
        this.whatsapp.onMessage((message) => {
            if (message.body === 'Hi' && message.isGroupMsg === false) {
                this.whatsapp
                    .sendText(message.from, 'Bem vindo ao Venom 🕷, homem aranha!')
                    .then((result) => {
                        console.log('Result: ', result); //return object success
                    })
                    .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                    });
            }
        });
    }

    receberMensagemConsole() {
        if (this.whatsapp) {
            this.whatsapp.onMessage((message) => {
                console.log(`Mensagem recebida: ${message.body}`);
                this.groundon.armazenarConversa(message);
            });
        } else {
            console.error('WhatsApp client not connected.');
        }
    }

    start(client) {
        client.onMessage((message) => {
            //! ===================== Estágio 1 - Apresentação =====================
            if (this.groundon.numero_estagio === 1) {
                this.groundon.enviarMensagem(message.from, 'OLA MUNDO');
                console.log(this.groundon.verConversa());
            }

            // Outros estágios e lógica de controle aqui
        });
    }



    //! Outros métodos de interação com o cliente
    // Método auxiliar para adicionar atraso (em milissegundos)
    delay(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async IniciarStagesMessages() {
        this.groundon.whatsapp.onMessage((message) => {
            this.groundon.armazenarConversa(message);

            const currentStage = this.groundon.numeroEstagio;

            switch (currentStage) {
                case 1:
                    this.estagio1(message);
                    break;
                case 2:
                    this.estagio2(message);
                    break;
                case 3:
                    this.estagio3(message);
                    break;
                default:
                    console.log('Estágio desconhecido');
            }
        });
    }

    estagio1(message) {
        console.log('Estágio 1:', message.body);
        // Lógica específica do Estágio 1
    }

    estagio2(message) {
        console.log('Estágio 2:', message.body);
        // Lógica específica do Estágio 2
    }

    estagio3(message) {
        console.log('Estágio 3:', message.body);
        // Lógica específica do Estágio 3
    }

    //! Restante do código da classe GroundonController
    async handleMessage(message) {
        // Verifica se o usuário já está online
        if (!this.onlineUsers.has(message.sender.id)) {
            this.onlineUsers.add(message.sender.id);
            console.log(`Novo usuário online: ${message.sender.id}`);
        }

        // Lógica para processar a mensagem recebida
        console.log(`Mensagem recebida de ${message.sender.id}: ${message.body}`);

        // Realize as ações necessárias com base na mensagem

        // Exemplo: Enviar uma resposta
        await this.groundon.sendText(message.sender.id, 'Obrigado por sua mensagem!');

        // Exemplo: Contar o número de usuários online
        const onlineUserCount = this.onlineUsers.size;
        console.log(`Número de usuários online: ${onlineUserCount}`);
    }

    async desconectarWpp() {
        // Realize as ações necessárias antes de desconectar o bot

        // Limpar os usuários online
        this.onlineUsers.clear();

        // Desconectar o bot
        await this.groundon.close();
        console.log('Bot desconectado.');
    }
}

module.exports = GroundonController;


class GroundonView {
    constructor(whatsapp, groundonController) {
        this.whatsapp = whatsapp;
        this.groundonController = groundonController;
    }

    startChatbot() {
        this.whatsapp.onMessage((message) => {
            if (message.body === 'Hi' && message.isGroupMsg === false) {
                this.whatsapp
                    .sendText(message.from, 'Bem vindo ao Venom 🕷, homem aranha!')
                    .then((result) => {
                        console.log('Result: ', result); //return object success
                    })
                    .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                    });
            }
        });
    }

    // Restante do código...
}

module.exports = GroundonView;


// Import
//const GroundonController = require('./src/controllers/GroundonController');
//const GroundonView = require('./src/views/GroundonView');

async function main() {
    const groundonController = new GroundonController();
    await groundonController.conectarWpp();

    const groundonView = new GroundonView(groundonController.whatsapp, groundonController);
    groundonView.startChatbot();
}

main().catch((error) => {
    console.error('Ocorreu um erro:', error);
});
