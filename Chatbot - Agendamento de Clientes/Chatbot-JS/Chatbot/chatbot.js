const { Client, LocalAuth, Buttons, List, MessageMedia, MessageAck, LegacySessionAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const puppeteer = require('puppeteer');
const EstabelicimentoSalao = require("/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Agendamento de Clientes/Chatbot-JS/Chatbot/Banco de Dados - EXCEL/Estabelicimento.js");
const Excel = require('exceljs');


//!============================= MANUTENÇÃO =============================
//! - SOMENTE FUNÇÕES GLOBAIS 
//! - SOMENTE VARIÁVEIS COM CONST
//!======================================================================

class Chatbot {
    constructor() {
        this.numero_estagio = 1
        this.conversas = [[], [], [], [], [], [], [], [], [], []];
        this.numero_pedido_dia = 1

        //! Instanciando o Objeto com o nome do Cliente
        this.whatsapp = new Client({

            // Se o código travar e não gerar o QRCODE, mude o nome do ClientID
            authStrategy: new LocalAuth({ clientId: "Barbearia" })
        });


    }


    //! Funções de LOG
    armazenarConversa(message) {

        if (message.body.length < 1000) {
            this.conversas[this.numero_estagio - 1].push(message.body);
        }

    }

    verConversa() {
        return this.conversas
    }

    //! Métodos
    async conectandoWpp() {

        // const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        // console.log(browser.version)


        return new Promise(async (resolve, reject) => {

            console.log("\n\n================================================")
            console.log("\t CHATBOT KYOGRE - Atendimentos! V1.3.{1} \nby:pvpeterparker")
            console.log("================================================\n")
            console.log("\nIniciando o Chatbot...")
            console.log('Gerando QR code...');
            console.log("================================================")

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

    voltarEstagio() {
        return new Promise((resolve, reject) => {
            try {
                this.numero_estagio--
                resolve()
            } catch (error) {
                reject(error)
            }
        })

    }

    voltarEstagio(num_estagio) {

        return new Promise((resolve, reject) => {

            try {

                this.numero_estagio = num_estagio;

                resolve()

            } catch (error) {
                reject(error)
            }
        })

    }



    //!========================================================================================================================================================================================================
    //! Funções anonimas ASSÍNCRONAS
    //!========================================================================================================================================================================================================
    async delay(t, v) {
        return new Promise(function (resolve) {
            setTimeout(resolve.bind(null, v), t);
        });
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
        this.numero_pedido_dia++
        return this.numero_pedido_dia
    }

    //!========================================================================================================================================================================================================
    //! Funções para a conversa de fluxo
    enviarMensagem(message, text) {
        return this.whatsapp.sendMessage(message.from, text)
    }

    getLastMessage(message) {
        const lastMessage = message.body;
        return lastMessage
    }

    async enviarArquivo(message, path) {
        const fileData = fs.readFileSync(path);
        const base64Data = Buffer.from(fileData).toString('base64');
        const media = new MessageMedia('image/png', base64Data, 'tabela_precos.png');

        try {
            return await this.whatsapp.sendMessage(message.from, media, { caption: 'Esta é a tabela de Preços!' });
        } catch (error) {
            return this.enviarMensagem(message, "Erro ao enviar o arquivo");
        }
    }









    //!========================================================================================================================================================================================================
    //!Funções para enviar Listas

    enviarLista_oldMethod(message, itens_list) {
        let _itens = new List("listBody", "BtnText", itens_list, "🤖 Chatbot Groundon", "footer");
        return this.whatsapp.sendMessage(message.from, _itens);
    }

    enviarLista(message, listBody, BtnText, itens_list) {
        // método customizavel de enviar lista
        let _itens = new List(listBody, BtnText, itens_list, "🤖 Chatbot Kyogre", "footer");
        return this.whatsapp.sendMessage(message.from, _itens);
    }

    sendListServices(message) {

        let itens_lista_wpp = [{
            title: "==> Aqui esta os nossos serviços <==",
            rows:
                [{ title: "Item 1", description: "description text " },
                { title: "item 2", description: "description text " },
                { title: "Item 3", description: "description text " }
                ]
        }]

        return this.enviarLista(message, "Escolha umas opções abaixo", "Agendar um Serviço", itens_lista_wpp)
    }

    //! Funç~oes para mostrar a lista de serviços da planilha
    async carregarServicosPlanilha(path) {

        const workbook = new Excel.Workbook();
        await workbook.xlsx.readFile(path);

        const worksheet = workbook.getWorksheet(1);
        const servicos_planilha = {};

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) {
                // ignora o cabeçalho da planilha
                return;
            }

            const nome_servico = row.getCell('A').value;
            const categoria = row.getCell('B').value;

            if (!servicos_planilha[categoria]) {
                servicos_planilha[categoria] = [];
            }

            servicos_planilha[categoria].push(nome_servico);
        });

        return servicos_planilha;
    }

    showServicesList(message) {
        const servicos = {
            "Cabelo": ["Corte de Cabelo", "Coloração", "Hidratação"],
            "Maquiagem": ["Maquiagem para festas", "Maquiagem para noivas"],
            "Unhas": ["Manicure", "Pedicure", "Alongamento de unhas"]
        };

        const itensLista = [];
        for (const categoria in servicos) {
            const servicosList = servicos[categoria].join(", ");
            itensLista.push({ title: categoria, description: servicosList });
        }

        const lista = [{
            title: "==> Aqui estão os nossos serviços <==",
            rows: itensLista
        }];

        return this.enviarLista(message, "Escolha uma opção abaixo", "Agendar um Serviço", lista);
    }


    async mostrarListasServicos(message) {
        const servicos = await this.carregarServicosPlanilha('/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Agendamento de Clientes/Chatbot-JS/Chatbot/Banco de Dados - EXCEL/Base de Dados Produtos/servicos-salao.xlsx');

        const categorias = {};

        // Percorre o objeto de serviços
        for (const nomeServico in servicos) {
            const categoria = servicos[nomeServico][0];

            if (!categorias[categoria]) {
                categorias[categoria] = [];
            }

            categorias[categoria].push(nomeServico);
        }

        const itensLista = [];
        for (const categoria in categorias) {
            const servicosList = categorias[categoria].join(", ");
            itensLista.push({ title: categoria, description: servicosList });
        }

        const lista = [{
            title: "==> Aqui estão os nossos serviços <==",
            rows: itensLista
        }];

        return this.enviarLista(message, "Escolha uma opção abaixo", "Agendar um Serviço", lista);
    }















    //!====================================================================
    //!Funções para enviar Botões
    mostrarOpcoesBotao(message, titulo, opcoes) {
        let botoes = opcoes.map(opcao => {
            return { body: opcao };
        });

        this.enviarBotao(message, titulo, botoes);
    }


    mostrarBotaoConfirmaPedido(message, txt) {
        this.enviarBotao(message, txt,
            [
                { body: "Sim" },
                { body: "Não" }
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



}

module.exports = Chatbot;