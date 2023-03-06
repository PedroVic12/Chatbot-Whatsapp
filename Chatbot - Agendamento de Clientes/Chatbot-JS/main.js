//! ============== MANUTENÇÃO ==============
/**
 *  Use funções para evitar repetição de código: ao invés de escrever o mesmo código várias vezes, crie uma função que realize essa tarefa e chame-a sempre que necessário.

 Use variáveis em vez de escrever o mesmo valor várias vezes: ao invés de escrever o mesmo valor várias vezes, crie uma variável e atribua-lhe esse valor. Depois, basta chamar a variável sempre que precisar desse valor.

 Use a sintaxe de funções arrow: a sintaxe de funções arrow é mais curta que a sintaxe de funções convencional, o que pode ajudar a reduzir o tamanho do seu código.

Considere usar o padrão de projeto "Chain of Responsibility" para lidar com as mensagens do usuário. Esse padrão permite que você encadeie objetos que possam lidar com a mensagem do usuário de forma mais flexível e escalável.

Considere usar ferramentas de linting, como o ESLint, para manter o código mais consistente e livre de erros comuns.

 */
//! ============== MANUTENÇÃO ==============

//! Importações e variáveis GLOBAIS
// Documentação:  https://wwebjs.dev/guide/#replying-to-messages
const Kyogre = require('./Chatbot/chatbot');

const Estagio1 = require('./Chatbot/stages/Estagio1')
const Estagio2 = require('./Chatbot/stages/Estagio2')
const Estagio3 = require('./Chatbot/stages/Estagio3')
const Estagio4 = require('./Chatbot/stages/Estagio4')
const Estagio5 = require('./Chatbot/stages/Estagio5')
const Estagio6 = require('./Chatbot/stages/Estagio6')
const Estagio7 = require('./Chatbot/stages/Estagio7')
const Estagio8 = require('./Chatbot/stages/Estagio8')
const Estagio9 = require('./Chatbot/stages/Estagio9')
const Estagio10 = require('./Chatbot/stages/Estagio10')

const ServicoCliente = require('./Chatbot/Banco de Dados - EXCEL/Servicos_Cliente')
const ClienteAtual = require("./Chatbot/Cliente/Cliente");
const { List } = require('whatsapp-web.js');

//!Inicializando o BOT
const chatbot = new Kyogre();
const Cliente = new ClienteAtual(chatbot)


const estagio1 = new Estagio1(chatbot);
const estagio2 = new Estagio2(chatbot);
const estagio3 = new Estagio3(chatbot);
const estagio4 = new Estagio4(chatbot);
const estagio5 = new Estagio5(chatbot)
const estagio7 = new Estagio7(chatbot)

//const browser = puppeteer.launch({ args: ['--no-sandbox'] });

function iniciaConversaClinte(message) {
    const phoneNumber = message.from.split('@')[0];
    const numero_estagios = 10
    const currentStage = stageMap.get(phoneNumber) || 0;
    if (currentStage === 0) {
        stageMap.set(phoneNumber, 1);
        estagio1.boasVindas(message);
    } else if (currentStage < numero_estagios) {
        chatbot.avancarEstagio();
        estagios[currentStage](message);
    }
}




async function mainFunction() {

    //! Talvez seja necessário um código para autenticar
    chatbot.conectandoWpp()
        .then(() => {
            // Código a ser executado após a promise ser resolvida
            console.log('✅ Conectado com sucesso!\n\n')

        })
        .catch((error) => {
            // Código a ser executado após a promise ser rejeitada
            console.log("Ops! Deu Problema ao conectar! :(")
            console.log(error)
        })
    chatbot.contarNumeroPedidos()
    chatbot.recebeMensagem()



    //Evento Listener para o Robo receber as mensagens
    chatbot.whatsapp.on('message', message => {

        chatbot.armazenarConversa(message);
        const flag_impressora = false;
        //iniciaConversaClinte(message)

        //! ===================== Estágio 1 - Apresentação =====================
        if (chatbot.numero_estagio === 1) {
            estagio1.boasVindas(message);
            chatbot.avancarEstagio()

        }


        //!=====================  Estágio 2 - Mostrar Menu Principal =====================
        else if (chatbot.numero_estagio === 2) {
            //Pegando os dados do cliente
            const nome_cliente = estagio2.getNomeCliente(message)
            Cliente.setNome(nome_cliente)

            // Pegando o numero de telefone
            const numero_telefone = estagio2.getTelefoneCliente(message)
            Cliente.setPhoneNumber(numero_telefone)


            // Verificando o clienete na base de dados
            try {
                estagio2.verificarClienteBaseDados(message, Cliente.getNome().toUpperCase(), Cliente.getPhoneNumber())

            } catch (error) {
                console.log('Erro ao verifciar o cliente na base de dados -->\n', error)
            }

            chatbot.enviarMensagem(message, `✅ Prazer em te conhecer, ${Cliente.getNome()}!`);
            chatbot.avancarEstagio().then(
                estagio2.mostrarMenuPrincipal(message)
            )
        }



        //!=====================  Estágio 3 - Responde as funcionalidades do Botão =====================
        else if (chatbot.numero_estagio === 3) {


            //TODO Enviar o pdf os serviços
            if (message.body === 'Consultar os Preços') {
                chatbot.enviarMensagem(message, 'Vou mostrar os serviços em PDF!');

                chatbot.enviarArquivo(message, 'Chatbot/Banco de Dados - EXCEL/Teoria do Caos/tabela_precos.png')
                    .then(() => {
                        return chatbot.delay(3000); // espera 3 segundos para exibir os botões
                    })
                    .then(() => {
                        return estagio3.mostrarMenuPrincipalEstagio3(message);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }


            if (message.body === 'Agendar um Serviço') {
                chatbot.avancarEstagio().then(
                    chatbot.mostrarListasServicos(message)
                )

            }

            // TODO pegar um evento no calendario e remover de acordo com o cliente
            if (message.body === 'Cancelar Agendamento') {
                estagio3.mostrarLocal(message)
                chatbot.delay(3000).then(
                    estagio3.mostrarMenuPrincipal(message)
                )
            }
        }



        //!=====================  Estagio 4 - Cliente Escolhe os Produtos da Loja =====================
        else if (chatbot.numero_estagio === 4) {

            //Escolhe o Serviço
            const pedido_cliente = Cliente.realizaPedido(message)
            console.log('Pedido do cliente -->', pedido_cliente)
            const servicoEscolhidoCliente = new ServicoCliente()


            //TODO modificar aqui os nomes de acordo com a base de dados
            if (message.body === 'Cabelo\nCorte de Cabelo, Penteado, Coloração') {
                servicoEscolhidoCliente.pegarDadosServico(pedido_cliente)
                    .then(servico_escolhido => {
                        const services_json = JSON.stringify(servico_escolhido)
                        chatbot.enviarMensagem(message, `Debug: ${services_json}`);
                        estagio4.enviarListaServicoEscolhido(message, services_json)
                        chatbot.enviarMensagem(message, 'WORKS!');
                    })
                    .catch(erro => {
                        console.error(erro);
                    });
            }


            // if (message.body === 'Maquiagem') {
            //     const cardapio_salgados = Salgados.getAllSalgados()
            //     estagio4.enviarListaSalgados(message, cardapio_salgados)
            // }

            // if (message.body === 'Colocar Cilios') {
            //     const cardapio_bebidas = Bebidas.getAllBebidas()
            //     estagio4.enviarListaBebidas(message, cardapio_bebidas)
            // }

            chatbot.avancarEstagio()

        }

        //!=====================  Estagio 5 - Pega o pedido e adiciona no Google Agenda =====================

        else if (chatbot.numero_estagio === 5) {

            chatbot.enviarMensagem(message, 'Cliente escolha o horário disponivel do serviço:')

            //Coloca no Google Agenda


            // Coloca na base de dados

            chatbot.avancarEstagio()

        }

        //!=====================   Estagio 6 -Menu de listas para escolha de fluxo ===================
        else if (chatbot.numero_estagio === 6) {

            // TODO CONFIRMAR TUDO COM O CLIENTE SOBRE O AGENDAMENTO
            chatbot.enviarMensagem(message, 'Seu pedido foi cadastrado com sucesso e agendando no Google Agenda!')


            if (message.body === 'Continuar Pedido\nEscolha as opções de comida novamente' && message.type !== 'location') {

                chatbot.voltarEstagio(4).then(
                    chatbot.mostrarProdutosBotao(message)
                )
            }

            if (message.body === 'Finalizar Pedido\nSe preparar para a entrega!' && message.type !== 'location') {
                chatbot.avancarEstagio().then(
                    chatbot.enviarMensagem(message, "🤖 Por favor, envie sua localização através do Whatsapp para realizar a entrega")
                )
            }

            if (message.body === 'Reiniciar Pedido' && message.type !== 'location') {
                chatbot.numero_estagio === 1;
            }
        }
        //!=====================   Estagio 7 - Pega localização do cliente =====================

        else if (chatbot.numero_estagio === 7) {

            const endereco_cliente = estagio7.PegandoEnderecoCliente(message)
            Cliente.setEndereco(endereco_cliente)

            //TODO Confirmar o agendamento do cliente

            chatbot.mostrarBotaoConfirmaPedido(message, `Voce confirma ?\n *Nome Cliente: ${Cliente.getNome()}* \n *Endereço de entrega: ${Cliente.getEndereco()}* `)

            chatbot.avancarEstagio().then(
                chatbot.enviarMensagem(message, 'Avançando...')
            )
        }

        //!=====================   Estagio 8 - Mostar as formas de Pagamento =====================
        else if (chatbot.numero_estagio === 8) {

            if (message.body === 'Sim' && message.type !== 'location') {
                chatbot.avancarEstagio().then(
                    chatbot.mostrarFormasDePagamento(message)
                )
            }

            else {
                chatbot.numero_estagio === 7
            }


        }
        //!=====================   Estagio 9 - Mostra todas as infromações finais =====================

        else if (chatbot.numero_estagio === 9) {

            //TODO --> Procurar uma api que pegue o endereço certinho indepedendente do que o cliente digitar

            // TODO REFATORAR O ESTAGIO 9 E 10

            chatbot.enviarMensagem(message, "🤖 Seu pedido está sendo preparado!!!!!")

            //pegando a forma de pagamento
            const cliente_forma_pagamento = Cliente.pegandoFormaPagamentoCliente(message)
            Cliente.setFormaPagamento(cliente_forma_pagamento)
            chatbot.delay(2000).then(
                chatbot.enviarMensagem(message, `Forma de Pagamento Escolhida =  ${Cliente.forma_pagamento}`)

            )






            // TODO armazenar na base de dados todas as informalçoes do cliente
            // Todo Enviar Nota Fiscal COM ARDUINO E ATIVAR O CODIGO EM C++
            //! ERRO AQUI AI TER A NOTA FISCAL ARQUIVO NÃO EXISTE
            chatbot.delay(2000).then(
                chatbot.enviarMensagem(message, `Nota Fiscal do seu pedido: \n ${Cliente.gerarNotaFiscal()}`)
            )


            // Imprimindo na impressora
            flag_impressora = true
            if (flag_impressora) {
                chatbot.delay(2000).then(
                    chatbot.enviarMensagem(message, "🤖 Imprimindo Nota Fiscal")
                )
                chatbot.delay(2000).then(() => {
                    const { exec } = require('child_process');
                    exec('./NomeDoExecutavel', (err, stdout, stderr) => {
                        if (err) {
                            console.error(`Erro ao imprimir: ${err}`);
                            return;
                        }
                        console.log(`Saída do comando: ${stdout}`);
                    });
                });
            }


            chatbot.avancarEstagio().then(
                chatbot.enviarMensagem(message, 'Avançando...')
            )
            //!=====================   Estagio 10 Mostra todas as infromações finais =====================
        }

        else if (chatbot.numero_estagio === 10) {
            chatbot.enviarMensagem(message, "🤖 Seu pedido está pronto para entrega!!!!!")

        }

    })




}


mainFunction()