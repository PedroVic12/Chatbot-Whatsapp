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

            // Chamada para a função START fora da classe
            this.START();
        } catch (error) {
            throw error;
        }
    }





    
    START() {
        this.whatsapp.onMessage(async (message) => {
            // Implementação da lógica de cada estágio

            // Exemplo para Estágio 1
            if (this.numero_estagio === 1) {
                this.enviarMensagem(message.from, 'Teste');
                console.log(this.verConversa());
            }

            // Exemplo para Estágio 2
            if (this.numero_estagio === 2) {
                this.enviarMensagem(message.from, 'Estágio 2');
                console.log(this.verConversa());
            }

            // Exemplo para Estágio 3
            if (this.numero_estagio === 3) {
                this.enviarMensagem(message.from, 'Estágio 3');
                console.log(this.verConversa());
            }
        });
    }
    START_VENOM() {
        this.whatsapp.onMessage(async (message) => {
            async function recebeMensagemKEY(client) {
                if (message.body === 'Hi' && message.isGroupMsg === false) {
                    try {
                        const result = await client.sendText(message.from, 'Welcome Venom 🕷');
                        console.log('Result: ', result); // retorna o objeto de sucesso
                    } catch (error) {
                        console.error('Error when sending: ', error); // retorna o objeto de erro
                    }
                }
            }

            this.enviarMensagem(5521999289987, 'OLA MUNDO');
            this.getLastMessage();

            recebeMensagemKEY(this.whatsapp);

            // this.mostrarMenuFluxoListas(5521999289987,'titulo','button_text',[]);
        });
    }

    receberMensagem() {
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
        try {
            const result = await this.whatsapp.sendText(phoneNumber, message);
            console.log(`Mensagem enviada para ${phoneNumber}: ${message}`);
            return result;
        } catch (error) {
            console.error(`Erro ao enviar mensagem para ${phoneNumber}: ${error}`);
            throw error;
        }
    }

    getLastMessage() {
        const currentStage = this.conversas[this.numero_estagio - 1];
        if (currentStage.length > 0) {
            return currentStage[currentStage.length - 1];
        }
        return null;
    }

    avancarEstagio() {
        this.numero_estagio++;
    }

    async mostrarMenuFluxoListas(phoneNumber, title, buttonText, listItems) {
        const rows = listItems.map((item) => ({
            title: item.title,
            description: item.description,
        }));

        const listMessage = {
            buttonText: buttonText,
            sections: [
                {
                    title: title,
                    rows: rows,
                },
            ],
        };

        try {
            await this.whatsapp.sendListMessage(phoneNumber, listMessage);
            console.log(`Lista enviada para ${phoneNumber}`);
        } catch (error) {
            console.error(`Erro ao enviar lista para ${phoneNumber}: ${error}`);
            throw error;
        }
    }
}

function main() {
    const groundon = new Groundon();

    try {
        groundon.conectarWpp()
            .then(() => {
                console.log('✅ Conectado com sucesso!\n\n');
                groundon.receberMensagem();
            })
            .catch((error) => {
                console.error('Ops! Deu problema ao conectar! :(');
                console.error(error);
            });

        groundon.START();
    } catch (error) {
        console.error('Ops! Deu problema ao conectar! :(');
        console.error(error);
    }
}

main();
