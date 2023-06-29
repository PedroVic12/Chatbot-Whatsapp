const { body, validationResult } = require('express-validator');
const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');

const GroundonController = require('./GroundonController')



class BackendController extends GroundonController {
    constructor() {
        super();
        this.app = express();
        this.setupRoutes();
    }

    //! Funções de integração com o Rayquaza
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


    //! Métodos BackEnd 
    //Configurando Rotas
    setupRoutes() {
        this.app.use(express.json());

        // Rota para verificar o status do servidor
        this.app.get('/', (req, res) => {
            res.send('Tudo certo! O servidor está em execução.');
        });

        this.app.post(
            '/send-message',
            [
                body('number').notEmpty().withMessage('O campo "number" não pode estar vazio.'),
                body('message').notEmpty().withMessage('O campo "message" não pode estar vazio.'),
            ],
            this.sendMessage.bind(this)
        );

        this.app.post(
            '/send-lists',
            [
                body('to').notEmpty().withMessage('O campo "to" não pode estar vazio.'),
                body('title').notEmpty().withMessage('O campo "title" não pode estar vazio.'),
                body('subTitle').notEmpty().withMessage('O campo "subTitle" não pode estar vazio.'),
                body('description').notEmpty().withMessage('O campo "description" não pode estar vazio.'),
                body('menu').notEmpty().withMessage('O campo "menu" não pode estar vazio.'),

                body('option1').optional(),
                body('titulo1').optional(),
                body('descricao1').optional(),

                body('option2').optional(),
                body('titulo2').optional(),
                body('descricao2').optional(),
            ],
            this.sendLists.bind(this)
        );
    }

    //! Enviar Mensagem por http
    sendMessage(request, response) {
        // Verifique se existem erros de validação nos campos do formulário
        const errors_request = validationResult(request);

        if (!errors_request.isEmpty()) {
            return response.status(422).json({
                status: false,
                message: errors_request.errors.map(error => error.msg)
            });
        }

        // Extraia o número de telefone e a mensagem do corpo da solicitação
        const cell_number = request.body.number;
        const mensagem = request.body.message;

        // Envie a mensagem usando a implementação existente
        client.sendText(cell_number, mensagem)
            .then(response => {
                response.status(200).json({
                    status: true,
                    message: 'Mensagem Enviada',
                    response: response
                });
            })
            .catch(error => {
                console.error('Erro ao enviar a mensagem:', error);
                response.status(500).json({
                    status: false,
                    message: 'Erro ao enviar a mensagem'
                });
            });
    }

    //!Enviar Listas
    sendLists(request, response) {
        // Verifique se existem erros de validação nos campos do formulário
        const errorsRequest = validationResult(request);

        if (!errorsRequest.isEmpty()) {
            return response.status(422).json({
                status: false,
                message: errorsRequest.errors.map((error) => error.msg),
            });
        }

        // Extraia os parâmetros da lista do corpo da solicitação
        const to = request.body.to;
        const title = request.body.title;
        const subTitle = request.body.subTitle;
        const description = request.body.description;
        const menu = request.body.menu;

        // Extrair itens da lista do menu
        const option1 = request.body.option1;
        const titulo1 = request.body.titulo1;
        const descricao1 = request.body.descricao1;

        const option2 = request.body.option2;
        const titulo2 = request.body.titulo2;
        const descricao2 = request.body.descricao2;

        // Objeto Lista
        const listMenu = [
            {
                title: option1,
                rows: [
                    {
                        title: titulo1,
                        description: descricao1,
                    },
                ],
            },
            {
                title: option2,
                rows: [
                    {
                        title: titulo2,
                        description: descricao2,
                    },
                ],
            },
        ];

        // Envie a lista usando a implementação existente
        this.enviarListaRequest(to, title, subTitle, description, menu, listMenu)
            .then((result) => {
                response.status(200).json({
                    status: true,
                    message: 'Lista Enviada',
                    result: result,
                });
            })
            .catch((error) => {
                console.error('Erro ao enviar a lista:', error);
                response.status(500).json({
                    status: false,
                    message: 'Erro ao enviar a lista',
                });
            });
    }

    async enviarListaRequest(to, title, subTitle, description, menu, listObject) {
        // Certifique-se de que as variáveis estejam definidas e contenham os valores esperados
        if (!to || !title || !subTitle || !description || !menu || !listObject) {
            throw new Error('Parâmetros ausentes ou inválidos.');
        }

        // Realize o envio da lista utilizando this.whatsapp.sendListMenu
        return this.whatsapp.sendListMenu(to, title, subTitle, description, menu, listObject);
    }

    //! Iniciar Servidor
    async start_backend() {
        const port = 3000;

        try {
            this.app.listen(port, () => {
                console.log(`\n\nServidor Whatsapp iniciado na porta ${port}`);
            });
        } catch (error) {
            console.log('\n\nfalha ao conectar o servidor', error)
        }

    }
}

module.exports = BackendController;


function main_Backend() {
    const backend = new BackendController();
    backend.start_backend();
}

//main_Backend()