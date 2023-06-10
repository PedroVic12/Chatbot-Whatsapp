const { Client, LocalAuth, Buttons, List, MessageMedia, LegacySessionAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fetch = require('node-fetch');

//const fs = require('fs');
//const puppeteer = require('puppeteer');

class Groundon {
    constructor() {
        this.numero_estagio = 1
        this.conversas = [[], [], [], [], [], [], [], [], [], []];
        this.numero_pedido_dia = 1

        //! Instanciando o Objeto com o nome do Cliente
        this.whatsapp = new Client({

            // Se o código travar e não gerar o QRCODE, mude o nome do ClientID
            authStrategy: new LocalAuth({ clientId: "CITTA-RJ-Lanchonete2" })
        });

        // Registre o evento 'message' para responder às mensagens recebidas
        this.whatsapp.on('message', this.enviarMensagem.bind(this));


    }

    //!========================================================================================================================================================================================================
    //! Funções de LOG
    //!========================================================================================================================================================================================================

    armazenarConversa(message) {

        if (message.body.length < 1000) {
            this.conversas[this.numero_estagio - 1].push(message.body);
        }

    }

    verConversa() {
        return this.conversas
    }

    async conectandoWpp() {

        // const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        // console.log(browser.version)

        const wppIsOn = false;

        return new Promise(async (resolve, reject) => {

            console.log("\n\n====================================")
            console.log("\t CHATBOT GROUNDON 8.1.{1} \nby:pvpeterparker")
            console.log("====================================\n")
            console.log("\nIniciando o Chatbot...")
            console.log('Gerando QR code...');
            console.log("====================================")

            // Gerando QR Code
            this.whatsapp.on('qr', qr => {
                qrcode.generate(qr, { small: true });
            });

            //inicializando o whatsapp web
            try {
                this.whatsapp.initialize();

            } catch (error) {
                console.log("Erro ao conectar com o Whatsapp Web")
                reject(error)
            }

            // Conectando com o Whatsapp Web
            this.whatsapp.on('ready', () => {
                //wppIsOn = true
                console.log('whatsapp pronto! Pode usar agora :)');
                resolve(this.whatsapp);

            });


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
            let nome = message._data.notifyName;
            let telefone = message.from.split('@')[0]

            //Arquivo de Log (precisa da interface bonita)
            this.delay(1000)
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

            const todaConversa = this.verConversa()
            console.log("\nConversa = ", todaConversa)

            //Mostrando onde o seu código está
            console.log("\n--> Fluxo Atual =  " + this.numero_estagio + "|")
            console.log("=====================================")
        });

    };

    avancarEstagio() {
        return new Promise((resolve, reject) => {
            try {
                this.numero_estagio++
                resolve()
            } catch (error) {
                reject(error)
            }
        })
    };

    //!========================================================================================================================================================================================================
    //! Funções para a conversa de fluxo
    //!========================================================================================================================================================================================================

    enviarMensagem(message, text) {
        return this.whatsapp.sendMessage(message.from, text)
    }

    getLastMessage(message) {
        const lastMessage = message.body;
        return lastMessage
    }



    //!========================================================================================================================================================================================================
    //!Funções para enviar Listas e Botões
    //!========================================================================================================================================================================================================

    enviarLista_old(message, itens_list) {
        let _itens = new List("listBody", "BtnText", itens_list, "🤖 Chatbot Groundon", "footer");
        return this.whatsapp.sendMessage(message.from, _itens);
    }

    enviarLista(message, listBody, BtnText, itens_list) {
        let _itens = new List(listBody, BtnText, itens_list, "🤖 Chatbot Groundon", "footer");
        return this.whatsapp.sendMessage(message.from, _itens);
    }


    // TODO BOTOES NAO FUNCIONAM
    enviarBotao(message, text, buttons, title, footer) {
        const buttonMessage = new Buttons(text, buttons, title, footer);
        this.whatsapp.sendMessage(message.from, buttonMessage);
    }

    mostrarProdutosBotao(message) {
        const buttons = [
            { body: 'Sanduíches' },
            { body: 'Bebidas' },
            { body: 'Salgados' }
        ];

        this.enviarBotao(
            message,
            'Escolha uma opção abaixo do que você deseja',
            buttons,
            '🤖 Chatbot Groundon',
            'footer'
        );
    }

    mostrarBotaoConfirmaPedido(message, txt) {
        this.enviarBotao(message, txt,
            [
                { body: "Sim" },
                { body: "Não" }
            ]
        );
    }

    //!========================================================================================================================================================================================================
    //! Funções de Servidor e BackEND
    //!========================================================================================================================================================================================================
    enviarPedidosServidor(message) {

        //Conexão Fetch

        //Criar um Json do pedido


        //Enviar para o servidor de Fastapi

    }
    enviarPedido(pedido) {
        const url = 'http://localhost:8000/ws'; // URL do servidor FastAPI

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(pedido),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Pedido enviado com sucesso!');
                } else {
                    console.log('Falha ao enviar o pedido. Status:', response.status);
                }
            })
            .catch((error) => {
                console.error('Erro ao enviar o pedido:', error);
            });
    }

    gerarJson(message) {
        // Aqui você cria o objeto JSON com os dados do pedido


        //TODO corrigir aqui
        //const pedido_cliente_json = {
        //    nome: this.nome,
        //    telefone: this.telefone,
        //    itens: this.carrinho.getNomesProdutosPedido(),
        //    total: this.carrinho.getTotalPrecoPedido(),
        //    forma_pagamento: this.forma_pagamento,
        //    endereco_entrega: this.endereco_cliente
        //};

        const pedido = {
            // Preencha com as informações relevantes do pedido
            // Exemplo:
            itens: ['Hambúrguer', 'Batata frita'],
            endereco: 'Rua Principal, 123',
            cliente: 'Fulano de Tal',
        };

        //TODO salvar aqui em json no pc

        return pedido;
    }


    //!========================================================================================================================================================================================================
    //! Funções anonimas ASSÍNCRONAS
    //!========================================================================================================================================================================================================
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

        return `${hora}:${minuto}`
    }

    contarNumeroPedidos() {
        this.numero_pedido_dia++
        return this.numero_pedido_dia
    }




}

module.exports = Groundon;