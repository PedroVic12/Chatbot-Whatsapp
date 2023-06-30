const fs = require('fs');
const axios = require('axios');

const Groundon = require('../models/Groundon');
const GroundonView = require('./GroundonView');

const Cliente = require('../models/Regras de Negocio/Cliente/Cliente')
const Carrinho = require("../models/Regras de Negocio/Pedido/Carrinho");
const Pedido = require('../models/Regras de Negocio/Pedido/Pedido')

const Widgets = require('../models/widgets/Widgets')
const Menu = require('../models/widgets/Menu/Menu')

const Estagio1 = require('./Stages/Estagio1')
const Estagio2 = require('./Stages/Estagio2');
const Estagio3 = require('./Stages/Estagio3');



class StagesView extends GroundonView {
    constructor(whatsapp, groundonController, backendController) {
        super(whatsapp, groundonController, backendController);
        this.estagio1 = new Estagio1()
        this.estagio2 = new Estagio2()
        this.estagio3 = new Estagio3()
        this.Widgets = new Widgets()
        this.Menu = new Menu()

        this.carrinho = new Carrinho()

    }

    async start_chat_Groundon() {

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
                } else if (numero_estagio === 2) {
                    this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);
                    console.log('\nEstágio 2:', message.body);

                    //Pega dados do CLiente
                    const cliente = new Cliente()
                    const nome_cliente = this.getLastMessage(message)
                    Cliente.setNome(nome_cliente)

                    const numero_cliente = this.estagio2.getTelefoneCliente(message)
                    cliente.setPhoneNumber(numero_cliente)

                    //TODO checar cliente na base de dados

                    //TODO se cliente não existir, cadastrar cliente

                    //TODO se cliente existir, pegar dados do cliente

                    this.delay(3000).then(
                        this.enviarMensagem(message, `✅ Prazer em te conhecer, ${cliente.nome}!`)
                    )

                    // Mostra o menu principal
                    const menuPrincipal = this.widgets.menuPrincipal;
                    const menuPrincipalText = this.widgets.getMenuText('Menu Principal', menuPrincipal);
                    this.enviarMensagem(message, menuPrincipalText)



                    this.delay(3000).then(
                        this.enviarMensagem(message, `O que deseja fazer?`)
                    )


                    this.pushStage(3);

                    //!=====================  Estágio 3 - Responde as funcionalidades do Botão =====================
                } else if (numero_estagio === 3) {
                    this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);

                    if (message.body === '1' && message.type !== 'location') {
                        this.enviarMensagem(message, 'Vou mostrar o cardapio em PDF!')
                        this.delay(3000).then(
                            this.enviarMensagem(message, menu_principal)
                        )
                    }
                    if (message.body === '2') {
                        const menu_categorias = this.Widgets.menuCategorias()
                        const menu_cardapio = this.Menu.mostrarComidasLista()

                        //Menu Principal
                        const menu_categoriasText = this.widgets.getMenuText('Menu Principal', menu_categorias);
                        this.enviarMensagem(message, menu_categoriasText)

                        this.delay(3000).then(
                            this.enviarMensagem(message,'processando...').then(
                                this.pushStage(4)
                            )
                        )

                    }
                    if (message.body === '3' && message.type !== 'location') {
                        estagio3.mostrarLocal(message)
                        this.delay(3000).then(
                            this.enviarMensagem(message, menu_principal)
                        )
                    }


                    //!=====================  Estagio 4 - Cliente Escolhe os Produtos da Loja =====================
                } else if (numero_estagio === 4) {

                    //aqui o cliente escolhe que tipo de produto ele deseja

                    this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);

                    const categoria_escolha = this.getLastMessage(message)

                    if (categoria_escolha === 'Comida'){
                        const menu_comidas = this.Menu.mostrarComidasLista()
                        const menu_comidasText = this.widgets.getMenuText('Menu Comidas', menu_comidas);
                        this.enviarMensagem(message, menu_comidasText)
                    }

                    if (categoria_escolha === 'Bebidas'){
                        const menu_bebidas = this.Menu.mostrarBebidasLista()
                        const menu_bebidasText = this.widgets.getMenuText('Menu Bebidas', menu_bebidas);
                        this.enviarMensagem(message, menu_bebidasText)
                    }


                    this.pushStage(5);
                }


                //!=====================  Estagio 5 - Pega o pedido e adiciona no carrinho =====================
                else if (numero_estagio === 5) {
                    this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);
                    if (message.body === '1') {
                        const produto = {
                          nome: 'Americano',
                          preco: 17.0
                        };
                        this.carrinho.adicionarProduto(produto);
                      } else if (message.body === '2') {
                        const produto = {
                          nome: 'Bauru',
                          preco: 30.0
                        };
                        this.carrinho.adicionarProduto(produto)
                      }
                    this.popStage(); // Retorna ao estágio anterior
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