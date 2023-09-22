const fs = require('fs');
const axios = require('axios');

const Groundon = require('../models/Groundon');
const GroundonView = require('./GroundonView');
const MewTwo = require('../models/NlpModel_IA')

const Cliente = require('../models/Regras de Negocio/Cliente/Cliente')

const Widgets = require('../models/widgets/Widgets')

//const Stage1 = require('./Stages/Estagio1')
const Estagio2 = require('./Stages/Estagio2');
const Estagio3 = require('./Stages/Estagio3');

const cliente = new Cliente()


/*
TODO 
Pesquisa sobre o “Anota Aí” e o “TakeEat App”

Robo saber responder : Voce quis dizer? [opção 1, opção 2]

Robo fazer consulta de dados pelo ID do pedido e telefone

tem que ter um botão: “voltar” e começar tudo novamente

Seu pedido está sendo preparado, caso precise modificar ou passar mais alguma informação para o atendente, ligue para (21)2222-2222”

Vai conseguir colocar “raio de atendimento” ? 
Pra direcionar o pedido pra loja A ou B e quem estiver fora da área, ser avisado que não dá pra prosseguir?

Mas mesmo cada loja tendo um número tem que ter um “você está fora da área de entrega”
*/


class StagesView extends GroundonView {
    constructor(whatsapp, groundonController, backendController) {
        super(whatsapp, groundonController, backendController);
        //this.estagio1 = new Stage1()
        this.estagio2 = new Estagio2()
        this.estagio3 = new Estagio3()
        this.clientes = {};
        this.Widgets = new Widgets()

        this.isNLPMode = false;
        this.mewTwo = new MewTwo();  // Instantiate MewTwo in the constructor

        this.dailyOrderCount = {}; // Armazena a contagem diária de pedidos por número de telefone

    }

    incrementOrderCount(phoneNumber) {
        if (!this.dailyOrderCount[phoneNumber]) {
            this.dailyOrderCount[phoneNumber] = 0;
        }
        this.dailyOrderCount[phoneNumber]++;
    }

    resetDailyOrderCount() {
        this.dailyOrderCount = {};
    }

    async start_chatbot_IA(message) {
        this.isNLPMode = true;
        this.enviarMensagem(message, 'Olá, sou o Mewtwo. Você está agora no modo de NLP. Digite "!sair" para sair.');
    }


    async processWithMewTwo(message) {
        const resposta = await this.mewTwo.processarIntencao(message.body);
        const stage = this.mewTwo.getStageForIntent(resposta.intent);


        //TODO IA TEM QUE SABER DIRECIONAR PARA OS ESTAGIOS CORRETOS
        if (stage) {

            try {
                this.pushStage(stage);
                this.navigateToStage(stage)
            } catch (error) {
                console.log('tentativa de ir para o estagio', error)
            }


        }

        this.enviarMensagem(message, resposta.answer);
    }




    resetEstagio(message) {
        // Handle back command
        if (message.body === "!") {
            const previousStage = this.stack[this.stack.length - 2]; // Get the previous stage from the stack

            if (previousStage) {
                this.popStage(); // Remove the current stage from the stack
                this.setCurrentStage(previousStage); // Set the previous stage as the current stage
                this.enviarMensagem(message, "Voltando para o estágio anterior.");
            } else {
                this.enviarMensagem(message, "Não é possível voltar mais.");
            }
            return;
        }
    }

    async start_chatbot_Groundon() {

        //! Variáveis GLOBAIS
        const menu_principal = this.Widgets.menuPrincipal;
        const menu_formaPagamento = this.Widgets.menuPagamento;
        let ID_PEDIDO = ''
        let KYOGRE_LINK_ID = ''

        //!EVENTO DE ESPERAR MENSAGENS DO WHATSAPP
        this.whatsapp.onMessage(async (message) => {

            console.log('\n\nGroundon esperando mensagens...')
            console.log(`\n\nMEWTWO LIGADO ${this.isNLPMode}`)


            //!Configurações de Conversa
            this.armazenarConversa(message);
            console.log(this.conversa)
            console.log(`Mensagem recebida: ${message.body}`)
            this.mewTwo.salvarConversa(message.body, this.mewTwo.contador)


            //!Configurações Backend
            this.restartChatbot()
            this.resetEstagio(message) // Função que reseta os estagios


            //! Configurações de Estagios de Fluxo
            const phoneNumber = message.from;
            console.log('Novo telefone detectado!', phoneNumber)

            // Inicializa o estado do cliente se não existir
            if (!this.clientStates[phoneNumber]) {
                this.clientStates[phoneNumber] = {
                    stack: [1] // Começa no estágio 1
                };
            }
            console.log('\n==================================================')
            console.log('Cliente Fazendo atendimento :', this.clientStates)
            console.log('==================================================\n')

            let numero_estagio
            numero_estagio = this.clientStates[phoneNumber].stack[this.clientStates[phoneNumber].stack.length - 1];

            try {
                console.log(this.clearStages[phoneNumber])
            } catch (error) {
                console.log('Erro ', error)
            }



            //! Configurações de IA
            if (this.isNLPMode) {
                if (message.body.toLowerCase() === '!sair') {
                    this.isNLPMode = false;

                    try {
                        this.mewTwo.salvarConversaEmCSV();

                    } catch (error) {
                        console.log('Erro ao salvar conversa em CSV', error);
                    }

                    this.enviarMensagem(message, 'Você saiu do modo de NLP e voltou ao chatbot padrão.');
                } else {
                    this.processWithMewTwo(message);
                    return;
                }
            } else {
                if (message.body === '!startIA') {
                    this.start_chatbot_IA(message);

                } else {
                    // ... [existing logic to process message with the standard chatbot]
                    //! ===================== Estágio 1 - Apresentação =====================
                    if (numero_estagio === 1) {
                        console.log(`\n\n\nEstágio ${numero_estagio}:`, message.body);

                        await this.delay(1000).then(
                            this.enviarMensagem(message, `Bem-vindo a Lanchonete *Citta RJ* Obrigado por escolher a nossos Serviços.\n🤖 Eu sou o Robô Groundon e estou aqui para ajudá-lo. `)
                        )
                        this.clientStates[phoneNumber].stack.push(2);
                        await this.delay(3000).then(
                            this.enviarMensagem(message, "🤖 Antes de começarmos, por favor, *Digite Seu Nome*:")
                        )

                        //TODO DEBUG HERE

                        //this.pushStage(2)

                    }
                    //!=====================  Estágio 2 - Mostrar Menu Principal =====================
                    else if (numero_estagio === 2) {
                        console.log(`\n\n\nEstágio ${numero_estagio}:`, message.body);


                        const salvarDadosCliente = async () => {
                            try {
                                //Pega dados do CLiente
                                const nome_cliente = this.getLastMessage(message)
                                cliente.setNome(nome_cliente)

                                const numero_cliente = this.estagio2.getTelefoneCliente(message)
                                cliente.setTelefone(numero_cliente)

                                // Envia os dados do cliente para o servidor
                                ID_PEDIDO = this.backendController.gerarIdPedido();
                                cliente.setId(ID_PEDIDO);
                                this.backendController.enviarDadosClienteServidor(cliente, ID_PEDIDO);

                                // Gera o Link do Cardapio Digital
                                KYOGRE_LINK_ID = await this.backendController.enviarLinkServidor(ID_PEDIDO);

                            } catch (error) {
                                console.log('Não foi possível fazer uma conexão no backend')
                            }

                        }

                        //await salvarDadosCliente()

                        const iniciandoAtendimentoPeloTelefone = async () => {

                            if (!phoneNumber) {
                                console.error('Error - phoneNumber is undefined or null');
                                return;
                            }

                            if (!this.clientStates[phoneNumber]) {
                                this.clientStates[phoneNumber] = {
                                    stack: [2],  // If it's initializing at stage 2, then the stack should start with 2.
                                    cliente: new Cliente()
                                };
                            }

                            if (!this.clientStates[phoneNumber].cliente) {
                                console.log('\nNovo Cliente detectado!');
                                this.clientStates[phoneNumber].cliente = new Cliente();
                            }


                            try {
                                const nomeCLiente = this.getLastMessage(message);
                                const numCliente = this.estagio2.getTelefoneCliente(message);
                                ID_PEDIDO = this.backendController.gerarIdPedido();
                                console.log("ID Pedido:", ID_PEDIDO);

                                // Set values
                                this.clientStates[phoneNumber].cliente.setNome(nomeCLiente);
                                this.clientStates[phoneNumber].cliente.setTelefone(numCliente);
                                this.clientStates[phoneNumber].cliente.setId(ID_PEDIDO);


                                // Incrementa o contador de pedidos para o número de telefone
                                this.incrementOrderCount(numCliente);


                                //Enviando dados para o backEnd
                                await this.backendController.enviarDadosClienteServidor(this.clientStates[phoneNumber].cliente, ID_PEDIDO);
                                KYOGRE_LINK_ID = await this.backendController.enviarLinkServidor(ID_PEDIDO);

                                console.log('\n\nDados Coletados!')
                                console.log(this.clientStates[phoneNumber].cliente);


                            } catch (error) {
                                console.log('Não foi possível fazer uma conexão no backend', error);
                            }
                        }



                        await iniciandoAtendimentoPeloTelefone()

                        await this.delay(2000).then(
                            //TODO se cliente não existir, cadastrar cliente

                            //TODO se cliente existir, pegar dados do cliente

                            await this.enviarMensagem(message, `✅ Prazer em te conhecer, ${this.clientStates[phoneNumber].cliente.getNome()}!`)
                        )

                        this.enviarMensagem(message, `Seu numero de pedido é #${ID_PEDIDO}`)

                        // Mostra o menu principal
                        let menu_principal_text = this.Widgets.getMenuText('Menu Principal', menu_principal);
                        this.enviarMensagem(message, menu_principal_text)
                        this.enviarMensagem(message, `*${cliente.nome}* agora temos uma nova funcionalidade de IA!\n\nDigite *!startIA* para conversar com o nosso modelo NLP!`)

                        //!Change here
                        this.clientStates[phoneNumber].stack.push(3);
                        //this.pushStage(3);
                    }

                    //!=====================  Estágio 3 - Responde as funcionalidades do Botão =====================
                    else if (numero_estagio === 3) {


                        //TODO desculpa nao entendi, voce quis dizer? ['opção1, opção2, 'opção3']
                        console.log(`\n\n\nEstágio ${numero_estagio}:`, message.body);


                        //? Pega a ultima mensagem enviada pelo cliente
                        const choice_escolhida = this.getLastMessage(message);
                        const selectedOption = this.Widgets.getSelectedOption(menu_principal, choice_escolhida);

                        // Verifica qual opção
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


                            //!Enviar o cardapio Digital
                            if (
                                selectedOption.button.text.toUpperCase() === 'FAZER PEDIDO' ||
                                selectedOption.button.text.toLowerCase().includes('pedido')
                            ) {

                                let tel = this.clientStates[phoneNumber].cliente.getTelefone()
                                console.log('debug', tel)
                                this.enviarLinkCardapioDigital(message, KYOGRE_LINK_ID, tel)
                            }


                            // Reiniciar
                            else if (selectedOption.button.text.toUpperCase() === 'Reiniciar') {
                                //this.restartChatbot()
                                this.popStage()
                                this.popStage()
                            }

                            else if (
                                selectedOption.button.text.toUpperCase() === 'FALAR COM UM ATENDENTE' ||
                                selectedOption.button.text.toLowerCase().includes('atendente')
                            ) {

                                this.enviarMensagem(message, "Desculpe a essa funcionalidade ainda nao foi implementada")
                                this.delay(3000).then(() => {
                                    this.enviarMensagem(message, menu_principal);
                                });
                            }

                            else if (selectedOption.button.text.toUpperCase().includes('SAIR')) {

                                this.enviarMensagem(message, "Foi um prazer conversar com voce :) ")
                                this.delay(3000).then(() => {
                                    this.restartChatbot()
                                });
                            }


                        }


                    }




                    //!=====================  Estagio 4 - Cliente Escolhe os Produtos no Cardapio Digital da Loja =====================
                    else if (numero_estagio === 4) {
                        console.log(`\n\nEstágio ${numero_estagio}:`, message.body);

                        const pedido_escolhido_cardapio = this.getLastMessage(message);
                        const pedido_json = this.getPedidoCardapio(pedido_escolhido_cardapio)

                        //TODO COLOCAR OS ITENS, QUANTIDADE E PRECO DENTRO DO PEDIDO NA CLASSE CLIENTE
                        try {
                            cliente.setPedido(pedido_json)
                            console.log('\n\n\nPedido atraves do Cardapio:', cliente.getDadosCompletos(pedido_json))

                            this.delay(1000).then(
                                this.enviarMensagem(message, `✅ Seu pedido foi anotado!`)
                            )

                        } catch (error) {
                            console.log('Nao foi possivel salvar os produtos do pedido', error)
                        }


                        this.delay(3000).then(
                            this.enviarMensagem(message, ` Boa escolha ${cliente.nome}!  *Digite o seu endereço de entrega:*`)
                        )


                        this.clientStates[phoneNumber].stack.push(5);
                        this.pushStage(5);
                    }


                    //!=====================  Estagio 5 - Cliente escolhe o Lanche Desejado =====================
                    else if (numero_estagio === 5) {
                        console.log(`\n\nEstágio ${numero_estagio}:`, message.body);

                        //TODO VERIFICAR RAIO DE ALCANCE DO PEDIDO USANDO UMA API 


                        const endereco_entrega = this.getLastMessage(message);
                        cliente.setEndereco(endereco_entrega)

                        this.enviarMensagem(message, 'Seu endereço precisa de algum complemento? Digite Sim ou Não')
                        this.pushStage(6)
                    }


                    //!=====================  Estágio 6 - Pergunta sobre o complemento =====================
                    else if (numero_estagio === 6) {
                        console.log(`\n\nEstágio ${numero_estagio}:`, message.body);

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


                    //! escolhe forma de pagamento
                    else if (numero_estagio === 7) {
                        console.log(`\n\nEstágio ${numero_estagio}:`, message.body);


                        //? Pega a ultima mensagem enviada pelo cliente
                        const forma_pagamento = this.getLastMessage(message)
                        const selectedOption = this.Widgets.getSelectedOption(menu_formaPagamento, forma_pagamento);

                        // Verifica qual opção
                        if (selectedOption) {
                            this.enviarMensagem(message, `Voce escolheu a opção *${selectedOption.button.text.slice(3)}*`)
                        }

                        cliente.setFormaPagamento(forma_pagamento)

                        this.delay(1000).then(
                            this.enviarMensagem(message, `Você escolheu a forma de pagamento -> *${forma_pagamento}*`)
                        )



                        // TODO USAR O MENU E TRATAMENTO DE DADOS PARA 3 RESPOSTAS
                        // Get complete client data
                        const pedido_cliente = cliente.getPedido()
                        cliente.setDataAtual()
                        const DADOS_CLIENTE = cliente.getDadosCompletos(pedido_cliente);



                        try {

                            // Generate and save the JSON file using the pedido data
                            cliente.gerarPedidoJson(DADOS_CLIENTE);
                            console.log('\n\n>>> DADOS DO CLIENTE:\n', DADOS_CLIENTE)

                            // Enviando para o servidor
                            this.backendController.enviarPedidoRayquaza(DADOS_CLIENTE)

                        } catch (error) {
                            console.log('Erro ao fazer o post do pedido no servidor')
                        }


                        await this.delay(2000).then(
                            await this.enviarMensagem(message, 'Confirma o seu pedido?')
                        )
                        this.pushStage(8)


                    }

                    //!PEDIDO EVNIADO PARA COZINHA
                    else if (numero_estagio === 8) {
                        console.log(`\nEstágio ${numero_estagio}:`, message.body);

                        //TODO -> VERIFICAR QUANDO O PEDIDO FICAR PRONTO PARA MANDAR QUE FOI ENVIADO PARA ENTREGA

                        const confirmacao = this.getLastMessage(message)

                        this.enviarMensagem(message, `*Obrigado, ${cliente.nome}*!\nSeu pedido esta sendo preparado e volto quando ele estiver sendo enviado para entrega!`)



                    }

                    //!PEDIDO PRONTO E ENVIADO PARA ENTREGA
                    else if (numero_estagio === 9) {
                        console.log(`\nEstágio ${numero_estagio}:`, message.body);


                        //TODO

                    }



                }
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