const fs = require('fs');
const axios = require('axios');

const Groundon = require('../models/Groundon');
const GroundonView = require('./GroundonView');

//TODO this.whatsapp = null no momento, atualizei o venom-bot e bugou muita coisa
const DataBaseController = require('../models/Regras de Negocio/Cardapio/DataBaseController');
const BinaryTree = require('../models/Regras de Negocio/Cardapio/ArvoreBinaria')

const Cliente = require('../models/Regras de Negocio/Cliente/Cliente')
const CarrinhoPedido = require("../models/Regras de Negocio/Pedido/Carrinho");
const Pedido = require('../models/Regras de Negocio/Pedido/Pedido')
const CardapioMenu = require('../models/Regras de Negocio/Cardapio/Menu_Cardapio');

const Widgets = require('../models/widgets/Widgets')

const Estagio1 = require('./Stages/Estagio1')
const Estagio2 = require('./Stages/Estagio2');
const Estagio3 = require('./Stages/Estagio3');

const cliente = new Cliente()
const pedido = new Pedido()
const cardapio = new CardapioMenu()

class StagesView extends GroundonView {
    constructor(whatsapp, groundonController, backendController) {
        super(whatsapp, groundonController, backendController);
        this.estagio1 = new Estagio1()
        this.estagio2 = new Estagio2()
        this.estagio3 = new Estagio3()

        this.Widgets = new Widgets()

        this.carrinho = new CarrinhoPedido()

        //this.comidaTree = new BinaryTree();
        //this.sanduicheTree = new BinaryTree();
    }

    async start_chat_Groundon() {
        const menu_principal = this.Widgets.menuPrincipal
        const menuCategorias = this.Widgets.menuCategorias;
        const menuLanches = this.Widgets.menuLanchesSalgados;
        const menuBebidas = this.Widgets.menuBebidas

        return new Promise((resolve, reject) => {



            this.whatsapp.onMessage(async (message) => {
                //! MensagemLog -> Controller()
                // Verifica se o usuário já está online

                // Lógica para processar a mensagem recebida
                //const robo_groundon = new Groundon()
                //robo_groundon.armazenarConversa(message)
                const numero_estagio = this.getCurrentStage();


                //! ===================== Estágio 1 - Apresentação =====================
                if (numero_estagio === 1) {
                    this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);
                    console.log('\nEstágio 1:', message.body);

                    this.enviarMensagem(message, `Bem-vindo a Lanchonete *Citta RJ* Obrigado por escolher a nossos Serviços. \n Eu sou o Robô Groundon e estou aqui para ajudá-lo. `)
                    this.enviarMensagem(message, "Antes de começarmos, por favor, *Digite Seu Nome*:")


                    this.pushStage(2); // Avança para o próximo estágio


                    //!=====================  Estágio 2 - Mostrar Menu Principal =====================
                }

                else if (numero_estagio === 2) {

                    this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);
                    console.log('\nEstágio 2:', message.body);

                    //Pega dados do CLiente
                    const nome_cliente = this.getLastMessage(message)
                    cliente.set_nome(nome_cliente)

                    const numero_cliente = this.estagio2.getTelefoneCliente(message)
                    cliente.setPhoneNumber(numero_cliente)



                    //TODO checar cliente na base de dados
                    //console.log(cliente)

                    //TODO se cliente não existir, cadastrar cliente

                    //TODO se cliente existir, pegar dados do cliente

                    this.delay(1000).then(
                        this.enviarMensagem(message, `✅ Prazer em te conhecer, ${cliente.nome}!`)
                    )

                    // Mostra o menu principal
                    let menu_principal_text = this.Widgets.getMenuText('Menu Principal', menu_principal);
                    this.enviarMenu(message, menu_principal_text)


                    this.pushStage(3);

                }

                //!=====================  Estágio 3 - Responde as funcionalidades do Botão =====================

                else if (numero_estagio === 3) {


                    //TODO desculpa nao entendi, voce quis dizer? ['opção1, opção2, 'opção3']
                    this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);
                    console.log(`\nEstágio ${numero_estagio}:`, message.body);

                    //TODO FUNCAO PARA O GROUNDON
                    const choice_escolhida = this.getLastMessage(message);
                    const selectedOption = this.Widgets.getSelectedOption(menu_principal, choice_escolhida);

                    if (selectedOption) {

                        this.enviarMensagem(message, `Voce escolheu a opção *${selectedOption.button.text.slice(3)}*`)

                        //TODO Cardapio
                        if (selectedOption.button.text.toUpperCase() === 'Ver Cardápio' || choice_escolhida === '1') {
                            this.enviarMensagem(message, 'Vou mostrar o cardápio em PDF!');
                            this.enviarPdf(message.from, '/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Delivary e Entregas/Chatbot Rayquaza x Groundon x Kyogre/Rayquaza/src/Chatbot Mega Groundon/repository/assets/sanduiches.pdf')

                            // Mostra o menu principal
                            let menu_principal_text = this.Widgets.getMenuText('Menu Principal', menu_principal);
                            this.enviarMenu(message, menu_principal_text)

                        }

                        // Menu de Categorias
                        else if (
                            selectedOption.button.text.toUpperCase() === 'FAZER PEDIDO' ||
                            selectedOption.button.text.toLowerCase().includes('pedido')
                        ) {
                            const menuCategoriasText = this.Widgets.getMenuText('Menu Categorias de Lanches', menuCategorias);
                            this.enviarMensagem(message, menuCategoriasText);
                            this.delay(3000).then(() => {
                                this.enviarMensagem(message, 'processando...').then(() => {
                                    this.pushStage(4);
                                });
                            });
                        }

                        // Localização
                        else if (selectedOption.button.text.toUpperCase() === 'LOCALIZAÇÃO') {
                            estagio3.mostrarLocal(message);
                            this.delay(3000).then(() => {
                                this.enviarMensagem(message, menu_principal);
                            });
                        }
                    }
                }




                //!=====================  Estagio 4 - Cliente Escolhe os Produtos da Categoria escolhida da Loja =====================
                else if (numero_estagio === 4) {
                    this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);
                    console.log(`\nEstágio ${numero_estagio}:`, message.body);

                    const categoria_escolhida = this.getLastMessage(message);


                    //TODO -> Buscar o numero ou nome correspondente da lista de produtos escolhidos
                    if (categoria_escolhida === '1') {
                        const selectedOption2 = this.Widgets.getSelectedOption(menuCategorias, categoria_escolhida);

                        if (selectedOption2) {
                            this.enviarMensagem(message, `Voce escolheu a opção *${selectedOption2.button.text.slice(3)}*`)
                        }

                        const menuLanchesText = this.Widgets.getMenuText('Menu Lanches e Comidas', menuLanches)
                        this.enviarMensagem(message, menuLanchesText)

                    }

                    if (categoria_escolhida === '2') {
                        const selectedOption3 = this.Widgets.getSelectedOption(menuCategorias, categoria_escolhida);

                        if (selectedOption3) {
                            this.enviarMensagem(message, `Voce escolheu a opção *${selectedOption3.button.text.slice(3)}*`)
                        }

                        const menuLanchesText = this.Widgets.getMenuText('Menu Bebidas, Sucos e Cervejas', menuBebidas)
                        this.enviarMensagem(message, menuLanchesText)
                    }

                    this.pushStage(5);
                }


                //!=====================  Estagio 5 - Cliente escolhe o Lanche Desejado =====================
                else if (numero_estagio === 5) {
                    console.log(`\nEstágio ${numero_estagio}:`, message.body);
                    this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);


                    //TODO -> Buscar o numero ou nome correspondente da lista de produtos escolhidos
                    const PRODUTO_ESCOLHIDO = this.getLastMessage(message);


                    const { tipo_produto, arquivo_produto } = cardapio.getTipoEArquivoProduto(PRODUTO_ESCOLHIDO);
                    this.enviarMensagem(message, `Voce escolheu o produto: *${tipo_produto}*`)

                    cardapio.criarArvore(tipo_produto, arquivo_produto)
                        .then((produtos) => {
                            const menuProdutosText = this.Widgets.getMenuProdutos(tipo_produto, produtos);
                            this.enviarMensagem(message, menuProdutosText)

                            // Aqui você pode enviar o menuProdutosText para o usuário por meio do seu chatbot
                        })
                        .catch((error) => {
                            console.log('Erro ao criar a árvore de produtos:', error);
                        });



                    //!tentativa botao
                    // Send Messages with Buttons Reply
                    const buttons = [
                        {
                            "buttonText": {
                                "displayText": "Text of Button 1"
                            }
                        },
                        {
                            "buttonText": {
                                "displayText": "Text of Button 2"
                            }
                        }
                    ]
                    this.enviarBotoes(message.from, 'title', buttons, 'Descrição')
                    this.enviarFoto(message.from, '/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Delivary e Entregas/Chatbot Rayquaza x Groundon x Kyogre/Rayquaza/src/Chatbot Mega Groundon/repository/assets/sanduiches.png')

                    this.pushStage(6)
                }


                //!=====================  Estagio 6 - Pega o pedido e adiciona no carrinho =====================
                else if (numero_estagio === 6) {
                    console.log(`\nEstágio ${numero_estagio}:`, message.body);
                    this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);

                    const item_escolhido = this.getLastMessage(message)
                    this.enviarMensagem(message, item_escolhido)
                    this.enviarFoto(message.from, '/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Delivary e Entregas/Chatbot Rayquaza x Groundon x Kyogre/Rayquaza/src/Chatbot Mega Groundon/repository/assets/sanduiches.png')

                    if (message.body === '2') {
                        const produto = {
                            nome: 'Americano',
                            preco: 17.0
                        };
                        this.carrinho.adicionarProduto(produto);
                    }
                    const total = this.carrinho.calcularTotal();
                    this.enviarMensagem(message, `Pedido {produto.nome} adicionado ao carrinho. \n\nTotal: R$ ${total}`);

                    this.popStage(); // Retorna ao estágio anterior

                }


                else if (numero_estagio === 7) {
                    console.log(`\nEstágio ${numero_estagio}:`, message.body);
                    this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);

                }


















            });




        });
    }
}

module.exports = StagesView;




/*
1 - boas vindas 
2- Pega o nome com cliente com o metodo do Groundon.getLastMessage() e salva no Cliente.nome
3- Aparece o menu principal onde a pessoa escolhe (Ver cardapio, Fazer Pedido, Ver localização)
4- O cliente faz a escolha e recebe a resposta
5- Ao fazer Pedido, aparece o Menu de Produtos onde o cliente escolhe qual Produto ele quer (comida, bebida, sobremesa, salgados, pizzas)
6 - O cliente escolhe o tipo de produto e recebe seu Cardapio
7 - O cliente faz o pedido e o Pedido é adicionado ao carrinho
8 - Aparece o MenuNavegacao onde o cliente escolhe se ele quer, [Continuar pedido, Ver Carrinho, Refazer Pedido, Finalizar Pedido]
9 - O cliente faz a sua escolha e recebe a resposta apropriada
10 - Se o cliente finaliza o pedido, ele vai para o Menu Pagamento onde ele escolhe [Cartao, Dinheiro, Pix)
11 - Menu de confirmacao Voce confirma? __forma_pagamento -> [Sim, Nao]
12 - O bot groundon pergunta o endereço de entrega
13 - O cliente responde o endereço
14 - O bot salva o endereço  no Cliente.endereco_entrega
15 - Aparece o MenuResumoPedido do Pedido e diz que o pedido foi enviado para o atendente e cospe o pedido em formato .json

*/