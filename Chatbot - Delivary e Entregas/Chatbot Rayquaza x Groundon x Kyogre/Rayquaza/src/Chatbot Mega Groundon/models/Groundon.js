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



function start(client) {
    client.onMessage((message) => {
        //! ===================== Estágio 1 - Apresentação =====================
        if (groundon.numero_estagio === 1) {
            groundon.enviarMensagem(message.from, 'Teste');
            console.log(groundon.verConversa());
        }
    });
}




async function main() {
    const groundon = new Groundon();

    try {
        await groundon.conectarWpp();
        console.log('✅ Conectado com sucesso!\n\n');
        await groundon.receberMensagem();


        start(groundon.whatsapp)

        groundon.whatsapp.onMessage((message) => {

        });
    } catch (error) {
        console.error('Ops! Deu problema ao conectar! :(');
        console.error(error);
    }
}

main();
