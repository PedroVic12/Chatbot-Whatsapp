const { Client, LocalAuth, Buttons, List, MessageMedia } = require('whatsapp-web.js');


class Produto {
    constructor(nome, preco) {
        this.nome = nome;
        this.preco = preco;
    }
}

class Lanchonete {
    constructor(whatsapp) {
        this.whatsapp = whatsapp;
        this.qrcode = require('qrcode-terminal');

        this.whatsapp = new Client({
            authStrategy: new LocalAuth({ clientId: "client-one" })
        });

        this.carrinho = [];
        this.produtos = [
            new Produto('Refrigerante', 3.50),
            new Produto('Suco', 4.00),
            new Produto('Água', 2.50),
        ];

        console.log("Gerando QR Code...\n")

        this.whatsapp.on('qr', qr => {
            this.qrcode.generate(qr, { small: true });
        });

        this.whatsapp.on('ready', () => {
            console.log('Client is ready! Pronto para usar agora :) ');
        });

        console.log("Inicializando o BOT...\n")

        this.whatsapp.initialize();

        //Arrumando
        this.estagio = 1;
        this.pedido_iniciado = false

    }

    async iniciar() {
        this.whatsapp.on('message', async message => {
            if (this.estagio === 1) {
                await this.estagio1(message);

                if (this.pedido_iniciado) {
                    this.avancarEstagio();
                }

            } else if (this.estagio === 2) {
                await this.estagio2(message);
                this.avancarEstagio();
            }
        });
    }

    async enviarMenu() {
        let menu = 'Menu';
        this.produtos.forEach(produto => {
            menu += `${produto.nome} - R$${produto.preco}\n`;
        });
        this.whatsapp.sendMessage(message.from, menu);
    }

    async adicionarAoCarrinho(nomeProduto) {
        let produto = this.produtos.find(p => p.nome === nomeProduto);
        if (!produto) {
            this.whatsapp.sendMessage(message.from, 'Desculpe, esse produto não está disponível.');
        } // ... código para adicionar produto

    }

    recebeMensagem() {

        //hora atual
        let data_atual = new Date();
        let hora = data_atual.getHours();
        let minuto = data_atual.getMinutes();


        this.whatsapp.on('message', message => {

            let nome = message._data.notifyName;
            let telefone = message.from.split('@')[0]

            console.log("Data  = ", data_atual)
            console.log("Horário inicio do Atendimento = " + hora + ":" + minuto);
            console.log("Nome do Cliente = ", nome)
            console.log("Número do Usuário = " + telefone);
            console.log("Mensagem recebida = " + message.body); //Salvar dentro de uma lista para usar I.A depois
            console.log("Pedido Iniciado = ", this.pedido_iniciado)
            console.log("\n")
        });

    }

    //!TESTE DE ESTÁGIOS
    async estagio1(message) {
        this.whatsapp.sendMessage(message.from, 'Bem vindo a Citta Lanchonete, nos agradecemos sua preferencia');
        await this.whatsapp.sendMessage(message.from, 'Bem vindo ao Robô Groundon! \n Eu vou ser responsável pelo seu atendimento \n Antes de começarmos,  *Digite seu Nome*:');

        this.pedido_iniciado = true

    }

    async estagio2(message) {

        let nome_cliente = message.body;
        await this.whatsapp.sendMessage(message.from, `Um prazer te conhecer! ${nome_cliente}`);

        const nome = nome_cliente;
    }

    avancarEstagio() {
        this.estagio++;
    }
}

const lanchonete = new Lanchonete(this.whatsapp);

lanchonete.recebeMensagem()
lanchonete.iniciar();