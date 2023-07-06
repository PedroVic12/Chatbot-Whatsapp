const { body, validationResult } = require('express-validator');
const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');


// TODO -> TENTATIVA DE ENVIAR LISTAR POR SOLITAÇÕES HTTP, codigo funcional mas nao envia a lista na tela

const GroundonController = require('../../controllers/GroundonController');
class CharizardBackend extends GroundonController {
    constructor() {
        super();
        this.app = express();
        this.setupRoutes();
        this.startVenom();
    }

    setupRoutes() {
        this.app.use(express.json());

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

    async startVenom() {
        await this.conectarWpp();

        this.whatsapp.onMessage(async (message) => {
            if (message.body.toLowerCase() === 'lista') {
                // Realize as ações necessárias quando a mensagem "lista" for recebida
                console.log('\n\nRecebida a mensagem "lista".');

                const url = 'http://localhost:8000/send-lists'; // URL da rota para o POST
                const body = {
                    to: message.from,
                    title: 'título',
                    subTitle: 'subtítulo',
                    description: 'descrição',
                    menu: 'menu',
                    option1: 'opção 1',
                    titulo1: 'título 1',
                    descricao1: 'descrição 1',
                    option2: 'opção 2',
                    titulo2: 'título 2',
                    descricao2: 'descrição 2',
                };

                const url2 = 'http://localhost:8000/send-message'
                const body2 = {
                    number: message.from,
                    message: 'Eae Homem aranha, pronto para ser rico?'

                };

                try {
                    const response = await fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(body),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log('\n\nResposta do servidor:', data);
                    } else {
                        console.error('\n\nErro na resposta do servidor:', response);
                    }
                } catch (error) {
                    console.error('Erro ao fazer a requisição:', error);
                }
            }
        });


        this.app.listen(8000, () => {
            console.log('Servidor está em execução na porta 8000');
        });
    }

    async sendMessage(request, response) {
        const errorsRequest = validationResult(request);

        if (!errorsRequest.isEmpty()) {
            return response.status(422).json({
                status: false,
                message: errorsRequest.errors.map((error) => error.msg),
            });
        }

        const cellNumber = request.body.number;
        const message = request.body.message;

        this.whatsapp
            .sendText(cellNumber, message)
            .then(() => {
                response.status(200).json({
                    status: true,
                    message: 'Mensagem Enviada',
                });
            })
            .catch((error) => {
                console.error('Erro ao enviar a mensagem:', error);
                response.status(500).json({
                    status: false,
                    message: 'Erro ao enviar a mensagem',
                });
            });
    }

    async sendLists(request, response) {
        const errorsRequest = validationResult(request);

        if (!errorsRequest.isEmpty()) {
            return response.status(422).json({
                status: false,
                message: errorsRequest.errors.map((error) => error.msg),
            });
        }

        const to = request.body.to;
        const title = request.body.title;
        const subTitle = request.body.subTitle;
        const description = request.body.description;
        const menu = request.body.menu;

        const option1 = request.body.option1;
        const titulo1 = request.body.titulo1;
        const descricao1 = request.body.descricao1;

        const option2 = request.body.option2;
        const titulo2 = request.body.titulo2;
        const descricao2 = request.body.descricao2;

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

        try {
            await this.enviarListaRequest(to, title, subTitle, description, menu, listMenu);
            response.status(200).json({
                status: true,
                message: 'Lista Enviada',
            });
        } catch (error) {
            console.error('Erro ao enviar a lista:', error);
            response.status(500).json({
                status: false,
                message: 'Erro ao enviar a lista',
            });
        }
    }

    async enviarListaRequest(to, title, subTitle, description, menu, listObject) {
        // Certifique-se de que as variáveis estejam definidas e contenham os valores esperados
        if (!to || !title || !subTitle || !description || !menu || !listObject) {
            throw new Error('Parâmetros ausentes ou inválidos.');
        }

        // Realize o envio da lista utilizando this.whatsapp.sendListMenu
        return this.whatsapp.sendListMenu(to, title, subTitle, description, menu, listObject);
    }
}

function main_CharizardBackend() {
    const backend = new CharizardBackend();
}

main_CharizardBackend();