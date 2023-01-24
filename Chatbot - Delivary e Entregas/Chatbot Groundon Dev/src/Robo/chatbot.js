const { Client, LocalAuth, Buttons, List, MessageMedia, MessageAck, LegacySessionAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

class Chatbot {
    constructor() {
        // this._chatbot = new Chatbot();
        this.numero_estagio = 1
        this.conversa_cliente = []

        //! Instanciando o Objeto com o nome do Cliente
        this.whatsapp = new Client({
            authStrategy: new LocalAuth({ clientId: "BigBi-Citta" })
        });

        const wpp = this.whatsapp;
        //const whatsapp = new Client();

    }

    //! Métodos
    conectandoWpp = () => {


        return new Promise((resolve, reject) => {
            console.log("====================================")
            console.log("\t CHATBOT GROUNDON V4.3.0 \nby:pvpeterparker")
            console.log("====================================\n")
            console.log("\nIniciando o Chatbot...")
            console.log('Gerando QR code...');
            console.log("====================================")

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
        let segundos = data_atual.getSeconds()

        this.whatsapp.on('message', message => {

            //Pegando dados do cliente
            const whatsappIsOnMessage = true
            let nome = message._data.notifyName;
            let telefone = message.from.split('@')[0]
            const conversa_cliente = ["CONVERSA CLIENTE"]

            //Arquivo de Log (precisa da interface bonita)
            console.log("\n")
            console.log("=====================================")
            console.log(`| Data  = ${data_atual.getDate()}/${data_atual.getDate()}/${data_atual.getFullYear()} |`)
            console.log(`| Horário inicio do Atendimento = ${hora}:${minuto}:0${segundos} |`);
            console.log("| Nome do Cliente = ", nome)
            console.log("| Número do Usuário = " + telefone);

            //Salvar dentro de uma lista para usar I.A depois
            let ultima_mensagem = message.body
            console.log("Ultima Mensagem recebida = " + ultima_mensagem);
            //let teste = pegarConversa(message)

            //Mostrando onde o seu código está
            console.log("--> Fluxo Atual =  " + this.numero_estagio + "|")
            console.log("=====================================")
        });

    };

    // tempo_perdido(){
    //   let tempo_calcular =  segundos_ultima_mensagem -  segundos_primeira_mensagem
    // }

    //! ================== > Funções anonimas
    async avancarEstagio() {
        this.numero_estagio++
    }
    enviarMensagem(message, text) {
        return this.whatsapp.sendMessage(message.from, text)
    }
    getHoras() {
        let data_atual = new Date();
        let hora = data_atual.getHours();
        let minuto = data_atual.getMinutes();

        return ` ${hora}:${minuto}`
    }

    pegarConversa(message) {
        this.conversa_cliente.push(message.body);
        return `${this.conversa_cliente}`
    }

    delay(t, v) {
        return new Promise(function (resolve) {
            setTimeout(() => {
                resolve.bind(null, v)
            }, t);
        })
    }

    //!Funções para enviar Listas

    enviarLista_old(message, itens_list) {
        let _itens = new List("listBody", "BtnText", itens_list, "Chatbot Groundon", "footer");
        return this.whatsapp.sendMessage(message.from, _itens);
    }

    enviarLista(message, listBody, BtnText, itens_list) {
        let _itens = new List(listBody, BtnText, itens_list, "Chatbot Groundon", "footer");
        return this.whatsapp.sendMessage(message.from, _itens);
    }

    //!Funções para enviar Botões
    enviarBotao(message, text, buttons, _title, _footer) {
        const botoes = new Buttons(text, buttons, _title, _footer)
        return this.whatsapp.sendMessage(message.from, botoes);
    }


    enviarBotao2(message, frase, lista) {
        const botoes = [];

        for (let i = 0; i < lista.length; i++) {
            botoes.push({ body: lista[i] });
        }

        let button = new Buttons(frase, botoes, 'Chatbot Groundon', "Horário de Atendimento = ${this.chatbot.getHoras()}");
        return whatsapp.sendMessage(message.from, button)
    }

    enviarMensagemComDelay(message, text, delay) {
        setTimeout(async () => {
            await this.whatsapp.sendMessage(message.from, text);
            console.log("Mensagem enviada com sucesso!");
        }, delay)
    }


}

module.exports = Chatbot;