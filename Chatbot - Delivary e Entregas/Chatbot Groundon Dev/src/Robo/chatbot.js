const { Client, LocalAuth, Buttons, List, MessageMedia, MessageAck, LegacySessionAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

//!============================= MANUTENÇÃO =============================
//! - SOMENTE FUNÇÕES GLOBAIS 
//! - SOMENTE VARIÁVEIS COM CONST
//!====================================================================

class Chatbot {
    constructor() {
        // this._chatbot = new Chatbot();
        this.numero_estagio = 1
        this.conversa_cliente = []
        this.numero_pedido_dia = 1

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
            console.log("\n\n====================================")
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
            this.delay(3000)
            console.log("\n\n")
            console.log("=====================================")
            console.log("|  INFORMAÇÕES DO CLIENTE  |")
            console.log(`| Data  = ${data_atual.getDate()}/${data_atual.getMonth() + 1}/${data_atual.getFullYear()} |`)
            console.log(`| Horário inicio do Atendimento = ${hora}:${minuto}:0${segundos} |`);
            console.log("| Nome do Cliente = ", nome)
            console.log("| Número do Usuário = " + telefone);

            //Salvar dentro de uma lista para usar I.A depois
            let ultima_mensagem = message.body
            console.log("|Ultima Mensagem recebida = " + ultima_mensagem);
            //let teste = pegarConversa(message)

            //Mostrando onde o seu código está
            console.log("\n--> Fluxo Atual =  " + this.numero_estagio + "|")
            console.log("=====================================")
        });

    };


    //!====================================================================
    //! Funções anonimas ASSÍNCRONAS

    delay(t, v) {
        return new Promise(function (resolve) {
            setTimeout(() => {
                resolve.bind(null, v)
            }, t);
        })
    }
    getDataAtual() {
        let dia_trabalho = new Date()
        let mes = dia_trabalho.getMonth() + 1
        return `${dia_trabalho.getDate()}/${mes}/${dia_trabalho.getFullYear()}`
    }

    getHoras() {
        let data_atual = new Date();
        let hora = data_atual.getHours();
        let minuto = data_atual.getMinutes();

        return ` ${hora}:${minuto}`
    }

    contarNumeroPedidos() {
        return this.numero_pedido_dia++
    }

    avancarEstagio() {
        return new Promise((resolve, reject) => {
            try {
                this.numero_estagio++
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    }


    //!====================================================================
    //! Funções para a conversa de fluxo
    enviarMensagem(message, text) {
        return this.whatsapp.sendMessage(message.from, text)
    }

    getLastMessage(message) {
        let lastMessage = message.body;
        return lastMessage
    }

    verCarrinho(message) {
        return this.whatsapp.sendMessage(message.from, `*Itens do Pedido:* ${this.carrinho_loja.nomeProduto.map(item => `${item.title}`).join(", ")} \n *Valor total do pedido:* R$ ${this.carrinho_loja.total}`)
    }

    //!====================================================================
    //!Funções para enviar Listas

    enviarLista_old(message, itens_list) {
        let _itens = new List("listBody", "BtnText", itens_list, "🤖 Chatbot Groundon", "footer");
        return this.whatsapp.sendMessage(message.from, _itens);
    }

    enviarLista(message, listBody, BtnText, itens_list) {
        let _itens = new List(listBody, BtnText, itens_list, "🤖 Chatbot Groundon", "footer");
        return this.whatsapp.sendMessage(message.from, _itens);
    }

    mostrarProdutosLista(message) {

        let itens_lista_wpp = [{
            title: "==> Continue Seu Pedido",
            rows:
                [{ title: "Continuar Pedido", description: "Escolha as opções de comida novamente" },
                { title: "Ver Carrinho", description: "Ver os produtos que voce possui no carrinho" },
                { title: "Reiniciar Pedido", description: "Cancelar o pedido e voltar para o estágio inicial" },
                { title: "Finalizar Pedido", description: "Finalizar o pedido" }
                ]
        }]

        this.enviarLista(message, "Escolha umas opções abaixo", "Continuar Pedido", itens_lista_wpp)
    }

    //!====================================================================
    //!Funções para enviar Botões

    mostrarProdutosBotao(message) {

        this.enviarBotao(message, `Escolha uma opção abaixo do que voce deseja`,
            [
                { body: "Sanduíches" },
                { body: "Bebidas" },
                { body: "Salgados" }
            ]
        );
    }

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

    //!====================================================================
    //! Funções mortas
    procuraPedidoEstoque(message, productItemArray) {
        //Checando se o que o usuario pediu esta na lista 
        const produtoEscolhido = productItemArray.find(item => item.nome === message.body);
        carrinho.adicionarProdutoCarrinho(produtoEscolhido);
    }


    enviarMensagemComDelay(message, text, delay) {
        setTimeout(async () => {
            await this.whatsapp.sendMessage(message.from, text);
            console.log("Mensagem enviada com sucesso!");
        }, delay)
    }


    tempo_perdido() {
        let tempo_calcular = segundos_ultima_mensagem - segundos_primeira_mensagem
    }
    debugStage(n) {
        console.log("====================================")
        console.log("DEBUGING o Chatbot")
        console.log("====================================")
        this.numero_estagio = n;
    }

}

module.exports = Chatbot;