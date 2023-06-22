//! ============== MANUTENÇÃO ==============
/**
 *  Use funções para evitar repetição de código: ao invés de escrever o mesmo código várias vezes, crie uma função que realize essa tarefa e chame-a sempre que necessário.

 Use variáveis em vez de escrever o mesmo valor várias vezes: ao invés de escrever o mesmo valor várias vezes, crie uma variável e atribua-lhe esse valor. Depois, basta chamar a variável sempre que precisar desse valor.

 Use a sintaxe de funções arrow: a sintaxe de funções arrow é mais curta que a sintaxe de funções convencional, o que pode ajudar a reduzir o tamanho do seu código.

 Ao invés de importar todos os estágios separadamente, crie um arquivo que exporte todos eles de uma só vez. Dessa forma, você poderá importar apenas um objeto contendo todos os estágios, o que deixará o código mais limpo e fácil de entender.

Considere usar classes ao invés de funções para os estágios. Dessa forma, você poderá encapsular o comportamento e o estado de cada estágio em um objeto, o que deixará o código mais organizado e mais fácil de testar.

Considere separar o código de cada estágio em um arquivo separado. Dessa forma, cada estágio ficará em um arquivo próprio e você poderá importá-los facilmente conforme necessário.

Considere usar o padrão de projeto "Chain of Responsibility" para lidar com as mensagens do usuário. Esse padrão permite que você encadeie objetos que possam lidar com a mensagem do usuário de forma mais flexível e escalável.

Considere usar ferramentas de linting, como o ESLint, para manter o código mais consistente e livre de erros comuns.

 */
//! ============== MANUTENÇÃO ==============

//! Importações e variáveis GLOBAIS
// Documentação:  https://wwebjs.dev/guide/#replying-to-messages
const Groundon = require('./Chatbot/chatbot');
const BancoDeDados = require("./Chatbot/Banco de Dados - EXCEL/Banco");

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


const Bebidas = require('./Chatbot/Cardapio - LOJA/Bebidas.js');
const Salgados = require("./Chatbot/Cardapio - LOJA/Salgados.js")
const Sanduiches = require("./Chatbot/Cardapio - LOJA/Sanduiche.js");

const Carrinho = require("./Chatbot/Pedido/Carrinho");
const Cliente = require("./Chatbot/Pedido/Cliente");

const { List } = require('whatsapp-web.js');

//!Inicializando o BOT
const chatbot = new Groundon();
const Banco = new BancoDeDados(chatbot)

const carrinho = new Carrinho(chatbot)
const cliente = new Cliente(chatbot, carrinho)


const estagio1 = new Estagio1(chatbot);
const estagio2 = new Estagio2(chatbot);
const estagio3 = new Estagio3(chatbot);
const estagio4 = new Estagio4(chatbot, estagio2);
const estagio5 = new Estagio5(chatbot, carrinho)
const estagio7 = new Estagio7(chatbot)

//const browser = puppeteer.launch({ args: ['--no-sandbox'] });

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

    const GROUNDON_INICIADO = true


    chatbot.armazenarConversa(message);
    const flag_impressora = false;

    //! ===================== Estágio 1 - Apresentação =====================
    if (chatbot.numero_estagio === 1) {
        chatbot.enviarMensagem(message, 'Ola mundo 3')

        estagio1.boasVindas(message)
        chatbot.avancarEstagio()

    }


    //!=====================  Estágio 2 - Mostrar Menu Principal =====================
    else if (chatbot.numero_estagio === 2) {
        //Pegando os dados do cliente
        const nome_cliente = estagio2.getNomeCliente(message)
        cliente.setNome(nome_cliente)

        // Pegando o numeo de telefone
        const numero_telefone = estagio2.getTelefoneCliente(message)
        cliente.setPhoneNumber(numero_telefone)



        //TODO checar cliente na base de dados

        chatbot.delay(3000).then(
            chatbot.enviarMensagem(message, `✅ Prazer em te conhecer, ${nome_cliente}!`)
        );


        // Mostra o menu principal
        chatbot.delay(300).then(
            estagio2.mostrarMenuPrincipal(message)
        )


        chatbot.avancarEstagio().then(
            chatbot.enviarMensagem(message, 'O que deseja fazer?')
        )
    }



    //!=====================  Estágio 3 - Responde as funcionalidades do Botão =====================
    else if (chatbot.numero_estagio === 3) {
        if (message.body === 'Ver Cardápio' && message.type !== 'location') {
            chatbot.enviarMensagem(message, 'Vou mostrar o cardapio em PDF!')
            chatbot.delay(3000).then(
                estagio3.mostrarMenuPrincipal(message)
            )
        }
        if (message.body === 'FAZER PEDIDO') {
            chatbot.avancarEstagio().then(
                chatbot.enviarMensagem(message, 'processando...')
            ).then(
                chatbot.mostrarProdutosBotao(message)
            )

        }
        if (message.body === 'Ver nossa Localização' && message.type !== 'location') {
            estagio3.mostrarLocal(message)
            chatbot.delay(3000).then(
                estagio3.mostrarMenuPrincipal(message)
            )
        }
    }



    //!=====================  Estagio 4 - Cliente Escolhe os Produtos da Loja =====================
    else if (chatbot.numero_estagio === 4) {

        //TODO MODIFICAR AQUI PARA UMA LISTA DOS PRODUTOS DO CLIENTE E PEGAR NA NOVA BASE DE DADOS

        if (message.body === 'Sanduíches' && message.type !== 'location') {
            const cardapio_sanduiche = Sanduiches.getAllSanduiches()
            estagio4.enviarListaSanduiches(message, cardapio_sanduiche)
        }

        if (message.body === 'Salgados' && message.type !== 'location') {
            const cardapio_salgados = Salgados.getAllSalgados()
            estagio4.enviarListaSalgados(message, cardapio_salgados)
        }

        if (message.body === 'Bebidas' && message.type !== 'location') {
            const cardapio_bebidas = Bebidas.getAllBebidas()
            estagio4.enviarListaBebidas(message, cardapio_bebidas)
        }

        chatbot.avancarEstagio()

    }

    //!=====================  Estagio 5 - Pega o pedido e adiciona no carrinho =====================

    else if (chatbot.numero_estagio === 5) {

        //Escolhe o Produto
        cliente.realizaPedido(message)

        //Coloca no carrinho
        estagio5.setItensCarrinho();
        estagio5.verCarrinho(message)

        chatbot.avancarEstagio().then(
            chatbot.mostrarProdutosLista(message)
        );
    }

    //!=====================   Estagio 6 -Menu de listas para escolha de fluxo ===================
    else if (chatbot.numero_estagio === 6) {

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
        cliente.setEndereco(endereco_cliente)

        //TODO --> Procurar uma api que pegue o endereço certinho indepedendente do que o cliente digitar

        chatbot.mostrarBotaoConfirmaPedido(message, `Voce confirma ?\n *Nome Cliente: ${cliente.getNome()}* \n *Endereço de entrega: ${cliente.getEndereco()}* `)

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
        const cliente_forma_pagamento = cliente.pegandoFormaPagamentoCliente(message)
        cliente.setFormaPagamento(cliente_forma_pagamento)
        chatbot.delay(2000).then(
            chatbot.enviarMensagem(message, `Forma de Pagamento Escolhida =  ${cliente.forma_pagamento}`)

        )






        // TODO armazenar na base de dados todas as informalçoes do cliente
        // Todo Enviar Nota Fiscal COM ARDUINO E ATIVAR O CODIGO EM C++
        //! ERRO AQUI AI TER A NOTA FISCAL ARQUIVO NÃO EXISTE
        chatbot.delay(2000).then(
            chatbot.enviarMensagem(message, `Nota Fiscal do seu pedido: \n ${cliente.gerarNotaFiscal()}`)
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


