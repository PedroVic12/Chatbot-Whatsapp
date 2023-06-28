const venom = require('venom-bot');

class Groundon {
    constructor() {
        this.numero_estagio = 1;
        this.conversas = [[], [], [], [], [], [], [], [], [], []];
        this.numero_pedido_dia = 1;
        this.whatsapp = null;
    }

    async conectarWpp() {
        return new Promise((resolve, reject) => {
            venom
                .create()
                .then((client) => {
                    this.whatsapp = client;
                    resolve(client);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    async receberMensagem() {
        if (this.whatsapp) {
            this.whatsapp.onMessage((message) => {
                console.log(`Mensagem recebida: ${message.body}`);
                this.armazenarConversa(message);
            });
        } else {
            console.error('WhatsApp client not connected.');
        }
    }

    armazenarConversa(message) {
        if (message.body.length < 1000) {
            this.conversas[this.numero_estagio - 1].push(message.body);
        }
    }

    verConversa() {
        return this.conversas;
    }




    async enviarMensagem(phoneNumber, message) {
        return this.whatsapp
            .sendText(phoneNumber, message)
            .then((result) => {
                console.log(`Mensagem enviada para ${phoneNumber}: ${message}`);
                return result;
            })
            .catch((error) => {
                console.error(`Erro ao enviar mensagem para ${phoneNumber}: ${error}`);
                throw error;
            });
    }

    async enviarLista(phoneNumber, listBody, btnText, items) {
        const rows = items.map((item) => ({
            title: item.title,
            description: item.description,
        }));

        const listMessage = {
            buttonText: btnText,
            sections: [
                {
                    title: listBody,
                    rows: rows,
                },
            ],
        };

        return this.whatsapp
            .sendListMessage(phoneNumber, listMessage)
            .then(() => {
                console.log(`Lista enviada para ${phoneNumber}`);
            })
            .catch((error) => {
                console.error(`Erro ao enviar lista para ${phoneNumber}: ${error}`);
                throw error;
            });
    }

    async enviarBotao(phoneNumber, text, buttons) {
        const formattedButtons = buttons.map((button) => ({
            buttonId: button.id,
            buttonText: button.body,
        }));

        return this.whatsapp
            .sendButtons(phoneNumber, text, formattedButtons, '🤖 Chatbot Groundon', 'footer')
            .then(() => {
                console.log(`Botões enviados para ${phoneNumber}`);
            })
            .catch((error) => {
                console.error(`Erro ao enviar botões para ${phoneNumber}: ${error}`);
                throw error;
            });
    }
}

module.exports = Groundon;


async function main() {
    const groundon = new Groundon();
    groundon.conectarWpp().
        then(() => {
            console.log('✅ Conectado com sucesso!\n\n')

        })
        .catch((error) => {
            console.log("Ops! Deu Problema ao conectar! :(")
            console.log(error)
        })
    await groundon.receberMensagem();

    if (this.whatsapp) {
        groundon.whatsapp.onMessage('message', message => {

            //! ===================== Estágio 1 - Apresentação =====================
            if (groundon.numero_estagio === 1) {

                groundon.enviarMensagem(message.from, 'Teste');

                //groundon.enviarLista('5516999999999', 'Teste', 'Teste', [{ title: 'Teste', description: 'Teste' }]);
                //groundon.enviarBotao('5516999999999', 'Teste', [{ id: '1', body: 'Teste' }]);
                console.log(groundon.verConversa());

            }
        });

    } else {

        console.error('WhatsApp client not connected.');
    }



}
main()