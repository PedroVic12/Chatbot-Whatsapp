const { Client, LocalAuth, Buttons, List, MessageMedia, MessageAck } = require('whatsapp-web.js');
const Estagio1 = require("./Chatbot/Estágios/1")
const Estagio2 = require("./Chatbot/Estágios/2")
const Estagio3 = require('./Chatbot/Estágios/3');
const Estagio4 = require('./Chatbot/Estágios/4');

const Bebidas = require("./Chatbot/Cardapio/bebida");


//!HORAS GASTAS = 10H 


// Toda vez que clicar no fazer pedido, cliente na base de dados com pagamento não confirmado

// se tiver o pix, pagamento confirmado

// pegar endereço do cliente 

//pegar o nome do cliente e conferir na base de dados

// se tiver o nome, pegar o endereco e o telefone e os horários

class Lanchonete {
    constructor(whatsapp) {
        //Instanciando um novo Objeto de Chatbot
        this.whatsapp = whatsapp;
        this.qrcode = require('qrcode-terminal');
        this.whatsapp = new Client({
            authStrategy: new LocalAuth({ clientId: "client-one" })
        });

        //Variáveis
        this.carrinho = [];


        //Arrumando
        this.estagio = 1;

        //Instanciando Objetos
        this.bebidas = new Bebidas();


    }

    //! Conectando o chatbot ao wpp
    recebeMensagem() {

        //hora atual
        let data_atual = new Date();
        let hora = data_atual.getHours();
        let minuto = data_atual.getMinutes();


        let estagio2 = new Estagio2(this.whatsapp)
        let estagio1 = new Estagio1(this.whatsapp)



        this.whatsapp.on('message', message => {

            let nome = message._data.notifyName;
            let telefone = message.from.split('@')[0]

            console.log("Data  = ", data_atual)
            console.log("Horário inicio do Atendimento = " + hora + ":" + minuto);
            console.log("Nome do Cliente = ", nome)
            console.log("Número do Usuário = " + telefone);
            console.log("Mensagem recebida = " + message.body); //Salvar dentro de uma lista para usar I.A depois
            console.log("Fluxo Atual = Estágio ", this.estagio)
            console.log("\n")
        });

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

    async iniciar() {

        //!Estágios
        let estagio1 = new Estagio1(this.whatsapp)
        let estagio2 = new Estagio2(this.whatsapp)
        let estagio3 = new Estagio3(this.whatsapp)
        let estagio4 = new Estagio4(this.whatsapp)


        //Evento listener para esperando receber as mensagens
        this.whatsapp.on('message', async message => {

            //!Estágio 1
            if (this.estagio === 1) {

                //Boas Vindas, pegar o nome e ver na base de dados

                estagio1.boasVindas(message);
                this.avancarEstagio();



            }

            //!EStágio 2
            else if (this.estagio === 2) {
                // Mostrar o Menu, Cardápio e Localização

                estagio2.getNome(message);

                //?FLAG
                // if (estagio2.cliente_escolheu_pedido === true) {
                //     console.log("Escolheu Pedido? ", estagio2.cliente_escolheu_pedido)
                //     this.avancarEstagio();
                // }

                estagio2.mostrarMenu(message)
                this.avancarEstagio()
            }

            //!Estágio 3
            else if (this.estagio === 3) {
                //Anota o Pedido, adiciona ao carrinho, ver carrinho
                //estagio3.mostrarMenu(message)
                estagio3.respostaMenu(message)

                if (estagio3.cliente_escolheu_pedido === true) {
                    this.avancarEstagio();
                }
            }

            //!Estágio 4
            else if (this.estagio === 4) {
                estagio4.fazerPedido(message)
                estagio4.teste(message)

                if (estagio4.pedido_feito === true) {
                    this.avancarEstagio();
                }
            }

            else if (this.estagio === 5) {
                estagio5.pedidoSendoRealizado(message)
                this.avancarEstagio();
            }

            else if (this.estagio === 6) {
                //estagio4.pedidoSendoRealizado(message)
                this.avancarEstagio();
            }
        });
    }




    //!Métodos
    verBebidas() {
        return this.bebidas.getArray();
    }

    avancarEstagio() {
        this.estagio++;
    }

    retrocederEstagio() {
        this.estagio -= 1;
    }

}

//!RODANDO O CÓDIGO
const lanchonete = new Lanchonete(this.whatsapp);

lanchonete.conectandoWpp();
lanchonete.iniciar();
// let teste = lanchonete.verBebidas()
// console.log(teste)
lanchonete.recebeMensagem()

