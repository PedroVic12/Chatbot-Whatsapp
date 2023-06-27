const { Client, LocalAuth, Buttons, List, MessageMedia, LegacySessionAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fetch = require('node-fetch');
const fs = require('fs');
const puppeteer = require('puppeteer');

class Groundon {
    constructor() {
        this.numero_estagio = 1
        this.conversas = [[], [], [], [], [], [], [], [], [], []];
        this.numero_pedido_dia = 1

        //! Instanciando o Objeto com o nome do Cliente
        this.whatsapp = new Client({

            // Se o código travar e não gerar o QRCODE, mude o nome do ClientID
            authStrategy: new LocalAuth({ clientId: "CITTA-RJ-Lanchonete-Botafogo" })
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

        //const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        // console.log(browser.version)

        const wppIsOn = false;

        return new Promise(async (resolve, reject) => {

            console.log("\n\n====================================")
            console.log("\t CHATBOT GROUNDON 8.2.{1} \nby:pvpeterparker")
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
    enviarLista(message, _sections, texto_botao, titulo, footer_lista) {
        try {
            const formattedSections = this.formatSections(_sections);
            const lista = new List(message.from, texto_botao, formattedSections, titulo, footer_lista);
            console.log(lista);

            this.whatsapp.sendMessage(message, lista);

        } catch (error) {
            console.log('Erro ao enviar a lista', error);
        }
    }

    formatSections(sections) {
        return sections.map(section => {
            const formattedRows = this.formatRows(section.rows);

            return {
                title: section.title,
                rows: formattedRows
            };
        });
    }

    formatRows(rows) {
        if (rows && Array.isArray(rows)) {
            return rows.map(row => {
                const formattedRow = {
                    id: row.id,
                    title: row.title,
                    description: row.description || ''
                };

                if (row.rows) {
                    formattedRow.rows = this.formatRows(row.rows);
                }

                return formattedRow;
            });
        }

        return [];
    }

    mostrarProdutosLista(message) {
        const _sections = [
            {
                title: 'Sanduíches',
                rows: [
                    { id: 1, title: 'Hambúrguer', description: 'Descrição do hambúrguer' },
                    { id: 2, title: 'Cheeseburger', description: 'Descrição do cheeseburger' },
                    { id: 3, title: 'X-Burger', description: 'Descrição do x-burger' }
                ]
            },
            {
                title: 'Bebidas',
                rows: [
                    { id: 4, title: 'Coca Cola', description: 'Descrição da Coca Cola' },
                    { id: 5, title: 'Guaraná', description: 'Descrição do guaraná' },
                    { id: 6, title: 'Suco de Laranja', description: 'Descrição do suco de laranja' }
                ]
            },
            {
                title: 'Salgados',
                rows: [
                    { id: 7, title: 'Coxinha', description: 'Descrição da coxinha' },
                    { id: 8, title: 'Pastel', description: 'Descrição do pastel' },
                    { id: 9, title: 'Empada', description: 'Descrição da empada' }
                ]
            }
        ];

        const _buttonText = 'Escolha uma opção:';
        const _title = '🤖 Chatbot Groundon';
        const _footer = 'footer';

        this.enviarLista(message, _sections, _buttonText, _title, _footer);
    }




    sendListsTeste(message) {
        const productsList = {
            buttonText: "View products",
            sections: [
                {
                    title: "Products list",
                    rows: [
                        { id: "apple", title: "Apple" },
                        { id: "mango", title: "Mango" },
                        { id: "banana", title: "Banana" },
                    ],
                },
            ],
            title: "Amazing deal on these products",
            footer: "Please select a product"
        };

        this.enviarLista(
            message,
            productsList.sections,
            productsList.buttonText,
            productsList.title,
            productsList.footer
        );
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

        const formattedButtons = this._format(buttons);

        this.enviarBotao(
            message,
            'Escolha uma opção abaixo do que você deseja',
            formattedButtons,
            '🤖 Chatbot Groundon',
            'footer'
        );
    }

    _format(buttons) {
        return buttons.map(button => ({
            buttonText: { displayText: button.body },
            type: 1
        }));
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

    gerarPedidoJson(nomeCliente) {
        const pedido = {
            nome: nomeCliente,
            telefone: "21999289987",
            carrinho: {
                itensPedido: [
                    {
                        nome: "X Tudo",
                        quantidade: 2
                    },
                    {
                        nome: "Coca Cola",
                        quantidade: 1
                    },
                    {
                        nome: "Acai",
                        quantidade: 1
                    }
                ],
                totalPrecoPedido: 100.0
            },
            forma_pagamento: "Dinheiro",
            endereco_cliente: "Copacabana"
        };

        const caminho = "src/Server Python/repository";
        const nomeArquivo = `${caminho}/pedido_${nomeCliente.replace(' ', '_').toLowerCase()}.json`;
        const conteudoArquivo = JSON.stringify(pedido, null, 2);

        fs.writeFile(nomeArquivo, conteudoArquivo, (err) => {
            if (err) {
                console.error(`Erro ao criar o arquivo ${nomeArquivo}: ${err}`);
            } else {
                console.log(`Arquivo ${nomeArquivo} criado com sucesso.`);
            }
        });
    }

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