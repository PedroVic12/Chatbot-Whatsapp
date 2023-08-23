const fs = require('fs');
const axios = require('axios');

const Groundon = require('../models/Groundon');
const GroundonView = require('./GroundonView');

const Cliente = require('../models/Regras de Negocio/Cliente/Cliente')

const Widgets = require('../models/widgets/Widgets')

const Estagio1 = require('./Stages/Estagio1')
const Estagio2 = require('./Stages/Estagio2');
const Estagio3 = require('./Stages/Estagio3');

const cliente = new Cliente()


/*
TODO 
Pesquisa sobre o “Anota Aí” e o “TakeEat App”
tem que ter um botão: “voltar” e começar tudo novamente

Seu pedido está sendo preparado, caso precise modificar ou passar mais alguma informação para o atendente, ligue para (21)2222-2222”

Vai conseguir colocar “raio de atendimento” ? 
Pra direcionar o pedido pra loja A ou B e quem estiver fora da área, ser avisado que não dá pra prosseguir?

Mas mesmo cada loja tendo um número tem que ter um “você está fora da área de entrega”
*/


class StagesView extends GroundonView {
    constructor(whatsapp, groundonController, backendController) {
        super(whatsapp, groundonController, backendController);
        this.estagio1 = new Estagio1()
        this.estagio2 = new Estagio2()
        this.estagio3 = new Estagio3()
        this.clientes = {};

        this.Widgets = new Widgets()


    }

    async start_chatbot_Groundon() {
        const menu_principal = this.Widgets.menuPrincipal;
        const menu_formaPagamento = this.Widgets.menuPagamento;
        let LINK_PEDIDO_ID = ''


        this.whatsapp.onMessage(async (message) => {

            console.log('\nGroundon esperando mensagens...')

            //!Configurações Backend
            this.restartChatbot()
            const numero_estagio = this.getCurrentStage();
            console.log(`Mensagem recebida: ${message.body}`);


            //TODO Aceitar vários pedidos ao mesmo tempo

            //TODO tratamento de mensagens ("Desculpa nao entendi, voce quis dizer [opção1,opção2,opção3]?")


            //! ===================== Estágio 1 - Apresentação =====================
            if (numero_estagio === 1) {
                console.log('\nEstágio 1:', message.body);

                await this.delay(1000).then(
                    this.enviarMensagem(message, `Bem-vindo a Lanchonete *Citta RJ* Obrigado por escolher a nossos Serviços.\n🤖 Eu sou o Robô Groundon e estou aqui para ajudá-lo. `)
                )


                this.pushStage(2).then(
                    await this.delay(3000).then(
                        this.enviarMensagem(message, "🤖 Antes de começarmos, por favor, *Digite Seu Nome*:")
                    )
                )


                //!=====================  Estágio 2 - Mostrar Menu Principal =====================
            }

            else if (numero_estagio === 2) {
                console.log('\nEstágio 2:', message.body);

                //Pega dados do CLiente
                const nome_cliente = this.getLastMessage(message)
                cliente.setNome(nome_cliente)

                const numero_cliente = this.estagio2.getTelefoneCliente(message)
                cliente.setTelefone(numero_cliente)

                // Envia os dados do cliente para o servidor
                LINK_PEDIDO_ID = this.backendController.gerarIdPedido();
                cliente.setId(LINK_PEDIDO_ID);
                this.backendController.enviarDadosClienteServidor(cliente, LINK_PEDIDO_ID);


                // TODO CHECAR SE ESTAR CONECTADO A INTERNET E INICIAR O CHATBOT

                //TODO checar cliente na base de dados
                //console.log(cliente)

                //TODO se cliente não existir, cadastrar cliente

                //TODO se cliente existir, pegar dados do cliente


                await this.delay(2000).then(
                    this.enviarMensagem(message, `✅ Prazer em te conhecer, ${cliente.nome}!`)
                )



                // Mostra o menu principal
                let menu_principal_text = this.Widgets.getMenuText('Menu Principal', menu_principal);
                this.enviarMensagem(message, menu_principal_text)

                this.pushStage(3);
            }

            //!=====================  Estágio 3 - Responde as funcionalidades do Botão =====================

            else if (numero_estagio === 3) {


                //TODO desculpa nao entendi, voce quis dizer? ['opção1, opção2, 'opção3']
                console.log(`\nEstágio ${numero_estagio}:`, message.body);


                // Pega a ultima mensagem enviada pelo cliente
                const choice_escolhida = this.getLastMessage(message);
                const selectedOption = this.Widgets.getSelectedOption(menu_principal, choice_escolhida);

                if (selectedOption) {
                    this.enviarMensagem(message, `Voce escolheu a opção *${selectedOption.button.text.slice(3)}*`)

                    // Localização
                    if (selectedOption.button.text.toUpperCase() === 'VER NOSSA LOCALIZAÇÃO' ||
                        selectedOption.button.text.toUpperCase().includes('LOCALIZAÇÃO')) {

                        this.enviarMensagem(message, 'Estamos implementando essa funcionalidade, por favor tente outra opção.')

                        this.delay(2000)

                        // Mostra o menu principal
                        let menu_principal_text = this.Widgets.getMenuText('Menu Principal', menu_principal);
                        this.enviarMensagem(message, menu_principal_text)
                    }

                    // Fazer Pedido com o Cardapio digital
                    else if (
                        selectedOption.button.text.toUpperCase() === 'FAZER PEDIDO' ||
                        selectedOption.button.text.toLowerCase().includes('pedido')
                    ) {
                        try {
                            // Chama o backend e aguarda o link ser gerado
                            const linkPedidoId = await this.backendController.enviarLinkServidor(LINK_PEDIDO_ID);

                            await this.delay(2000);

                            await this.enviarMensagem(message, `Processando... Aguarde um instante`);
                            //await this.enviarMensagem(message, linkPedidoId)

                            await this.delay(2000);

                            // Envia a mensagem com o link para o cliente
                            return new Promise((resolve, reject) => {
                                resolve(this.enviarMensagem(message, `Abra esse link do seu pedido: ---> ${linkPedidoId}`))
                                    .then(
                                        console.log('Link enviado com sucesso')
                                    )
                                    .catch(error => {
                                        console.error('\nLINK AINDA NAO ENVIADO:', error);
                                        //reject();
                                    });
                            }).then(() => {
                                this.pushStage(4);
                            });

                        } catch (error) {
                            console.log('\n\nNão foi possível enviar o link', error)
                        }
                    }

                    // Localização
                    else if (selectedOption.button.text.toUpperCase() === 'Reiniciar') {
                        this.restartChatbot()
                    }

                    else if (selectedOption.button.text.toUpperCase() === 'FALAR COM UM ATENDENTE') {

                        this.enviarMensagem(message, "Desculpe a essa funcionalidade ainda nao foi implementada")
                        this.delay(3000).then(() => {
                            this.enviarMensagem(message, menu_principal);
                        });
                    }

                    else if (selectedOption.button.text.toUpperCase() === 'FALAR COM UM ATENDENTE') {

                        this.enviarMensagem(message, "Foi um prazer conversar com voce :) ")
                        this.delay(3000).then(() => {
                            this.restartChatbot()
                        });
                    }


                }
            }




            //!=====================  Estagio 4 - Cliente Escolhe os Produtos no Cardapio Digital da Loja =====================
            else if (numero_estagio === 4) {
                console.log(`\nEstágio ${numero_estagio}:`, message.body);

                const pedido_escolhido_cardapio = this.getLastMessage(message);


                const pedido_json = this.getPedidoCardapio(pedido_escolhido_cardapio)

                //TODO COLOCAR OS ITENS, QUANTIDADE E PRECO DENTRO DO PEDIDO NA CLASSE CLIENTE
                try {
                    cliente.setPedido(pedido_json)

                    this.delay(1000).then(
                        this.enviarMensagem(message, `✅ Seu pedido foi anotado!`)
                    )


                    console.log('\n\n\nPedido atraves do Cardapio:', cliente.getDadosCompletos())

                } catch (error) {
                    console.log('Nao foi possivel salvar os produtos do pedido', error)
                }


                this.delay(3000).then(
                    this.enviarMensagem(message, ` Boa escolha ${cliente.nome}, *Digite o seu endereço de entrega:*`)
                )

                this.pushStage(5);
            }


            //!=====================  Estagio 5 - Cliente escolhe o Lanche Desejado =====================
            else if (numero_estagio === 5) {
                console.log(`\nEstágio ${numero_estagio}:`, message.body);


                const endereco_entrega = this.getLastMessage(message);
                cliente.setEndereco(endereco_entrega)

                this.enviarMensagem(message, 'Seu endereço precisa de algum complemento? Digite Sim ou Não')
                this.pushStage(6)
            }


            //!=====================  Estágio 6 - Pergunta sobre o complemento =====================
            else if (numero_estagio === 6) {
                console.log(`\nEstágio ${numero_estagio}:`, message.body);

                const resposta_cliente = this.getLastMessage(message).toUpperCase().trim();

                if (resposta_cliente === 'SIM') {
                    this.enviarMensagem(message, 'Digite seu complemento.');
                    this.pushStage(6.5); // Estágio intermediário
                } else if (resposta_cliente === 'NÃO' || resposta_cliente === 'NAO') {
                    cliente.setComplemento('Sem Complemento.')


                    // Mostra o menu principal
                    let menu_pagamento_text = this.Widgets.getMenuText('Digite a forma de pagamento', menu_formaPagamento);
                    this.enviarMensagem(message, menu_pagamento_text)
                    this.pushStage(7);
                }
            }

            //!=====================  Estágio 6.5 - Coleta o complemento =====================
            else if (numero_estagio === 6.5) {
                console.log(`\nEstágio ${numero_estagio}:`, message.body);


                const complemento = this.getLastMessage(message);
                cliente.setComplemento(complemento);


                // Mostra o menu principal
                let menu_pagamento_text = this.Widgets.getMenuText('Digite a forma de pagamento', menu_formaPagamento);
                this.enviarMensagem(message, menu_pagamento_text)
                this.pushStage(7);
            }



            else if (numero_estagio === 7) {
                console.log(`\nEstágio ${numero_estagio}:`, message.body);

                const forma_pagamento = this.getLastMessage(message)
                cliente.setFormaPagamento(forma_pagamento)

                this.delay(1000).then(
                    this.enviarMensagem(message, `Você escolheu a forma de pagamento: *${forma_pagamento}*`)
                )



                // TODO gerar pedido json e enviar para o servidor Rayquaza
                // Get complete client data
                const pedido_cliente = cliente.getPedido()
                cliente.setDataAtual()
                const DADOS_CLIENTE = cliente.getDadosCompletos(pedido_cliente);

                // Generate and save the JSON file using the pedido data
                cliente.gerarPedidoJson(DADOS_CLIENTE);

                console.log('\n>>> DADOS DO CLIENTE:\n', DADOS_CLIENTE)

                try {
                    this.backendController.enviarPedidoRayquaza(DADOS_CLIENTE)
                } catch (error) {
                    console.log('Erro ao fazer o post do pedido no servidor')
                }


                this.delay(3000).then(
                    this.enviarMensagem(message, 'Confirma o seu pedido?')
                )
                this.pushStage(8)


            }

            else if (numero_estagio === 8) {
                console.log(`\nEstágio ${numero_estagio}:`, message.body);

                //TODO -> VERIFICAR QUANDO O PEDIDO FICAR PRONTO PARA MANDAR QUE FOI ENVIADO PARA ENTREGA

                const confirmacao = this.getLastMessage(message)

                this.enviarMensagem(message, `*Obrigado, ${cliente.nome}*!\nSeu pedido esta sendo preparado e volto quando ele estiver sendo enviado para entrega!`)



            }

















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