const { body, validationResult } = require('express-validator');
const express = require('express');

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

        this.app.post('/send-message', [
            body('number').notEmpty().withMessage('O campo "number" não pode estar vazio.'),
            body('message').notEmpty().withMessage('O campo "message" não pode estar vazio.')
        ], this.sendMessage.bind(this));

        this.app.post('/send-lists', [
            // parametros
            body('to').notEmpty().withMessage('O campo "to" não pode estar vazio.'),
            body('title').notEmpty().withMessage('O campo "title" não pode estar vazio.'),
            body('subTitle').notEmpty().withMessage('O campo "subTitle" não pode estar vazio.'),
            body('description').notEmpty().withMessage('O campo "description" não pode estar vazio.'),
            body('menu').notEmpty().withMessage('O campo "menu" não pode estar vazio.'),

            //lista de opções
            body('option1').notEmpty(),
            body('titulo1').notEmpty(),
            body('descricao1').notEmpty(),

            body('option2').notEmpty(),
            body('titulo2').notEmpty(),
            body('descricao2').notEmpty(),
            //body('list_object').notEmpty().withMessage('O campo "list_object" não pode estar vazio.')
        ], this.sendLists.bind(this));
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
        const errors_request = validationResult(request);

        if (!errors_request.isEmpty()) {
            return response.status(422).json({
                status: false,
                message: errors_request.errors.map(error => error.msg)
            });
        }

        // Extraia os parâmetros da lista do corpo da solicitação
        const to = request.body.to;
        const title = request.body.title;
        const subTitle = request.body.subTitle;
        const description = request.body.description;
        const menu = request.body.menu;

        //extrair lista do menu
        const option1 = request.body.option1
        const titulo1 = request.body.titulo1
        const descricao1 = request.body.descricao1

        const option2 = request.body.option2
        const titulo2 = request.body.titulo2
        const descricao2 = request.body.descricao2

        //objeto Lista
        const list_menu = [
            {
                title: option1,
                rows: [
                    {
                        title: titulo1,
                        description: descricao1
                    }
                ]
            },
            {
                title: option2,
                rows: [
                    {
                        title: titulo2,
                        description: descricao2
                    }
                ]
            }
        ];

        // Envie a lista usando a implementação existente
        this.enviarListaRequest(to, title, subTitle, description, menu, list_menu)
            .then(result => {
                response.status(200).json({
                    status: true,
                    message: 'Lista Enviada',
                    result: result
                });
            })
            .catch(error => {
                console.error('Erro ao enviar a lista:', error);
                response.status(500).json({
                    status: false,
                    message: 'Erro ao enviar a lista'
                });
            });
    }

    async enviarListaRequest(to, title, subTitle, description, menu, list_object) {
        // Certifique-se de que as variáveis estejam definidas e contenham os valores esperados
        if (!to || !title || !subTitle || !description || !menu || !list_object) {
            throw new Error('Parâmetros ausentes ou inválidos.');
        }

        // Realize o envio da lista utilizando this.whatsapp.sendListMenu
        // Certifique-se de passar os parâmetros corretamente
        // Exemplo:
        return this.whatsapp.sendListMenu(to, title, subTitle, description, menu, list_object);
    }

    start() {
        const port = 3000;
        this.app.listen(port, () => {
            console.log(`Servidor iniciado na porta ${port}`);
        });
    }
}

module.exports = BackendController;


function main_Backend() {
    const backend = new BackendController();
    backend.start();
}

main_Backend()