//import Rayquaza from './src/Chatbot JS/models/domain/Rayquaza';

const Rayquaza = require('./src/Chatbot JS/models/core/Rayquaza')
/**
const BancoDeDados = require("./Chatbot/Banco de Dados - EXCEL/Banco");

const Bebidas = require('./Chatbot/Cardapio - LOJA/Bebidas.js');
const Salgados = require("./Chatbot/Cardapio - LOJA/Salgados.js")
const Sanduiches = require("./Chatbot/Cardapio - LOJA/Sanduiche.js");


import Estagio2 from './Chatbot/stages/Estagio2';
import Estagio3 from './Chatbot/stages/Estagio3';
import Estagio4 from './Chatbot/stages/Estagio4';
import Estagio5 from './Chatbot/stages/Estagio5';


const estagio1 = new Estagio1(chatbot);
const estagio2 = new Estagio2(chatbot);
const estagio3 = new Estagio3(chatbot);
const estagio4 = new Estagio4(chatbot, estagio2);
const estagio5 = new Estagio5(chatbot, carrinho)

//const browser = puppeteer.launch({ args: ['--no-sandbox'] });

 */


const Carrinho = require("./src/Chatbot JS/models/Carrinho")
const Cliente = require("./src/Chatbot JS/models/Cliente")
const Estagio1 = require('./src/Chatbot JS/views/Estagio1')
const TesteEstagio = require('./src/Chatbot JS/views/teste')
const ClienteOld = require('./src/Chatbot JS/models/Cliente')
const Estagio2 = require('./src/Chatbot JS/views/Estagio2')

//!Inicializando o BOT
const rayquaza_bot = new Rayquaza();

const teste = new TesteEstagio()
const estagio1 = new Estagio1(rayquaza_bot)
const estagio2 = new Estagio2(rayquaza_bot)

const carrinho_loja = new Carrinho(rayquaza_bot)
const cliente = new ClienteOld(rayquaza_bot, carrinho_loja)

//! Talvez seja necessário um código para autenticar
rayquaza_bot.conectandoWpp()
    .then(() => {
        console.log('✅ Conectado com sucesso!\n\n')

    })
    .catch((error) => {
        console.log("Ops! Deu Problema ao conectar! :(")
        console.log(error)
    })
rayquaza_bot.contarNumeroPedidos()
rayquaza_bot.recebeMensagem()


//Evento Listener para o Robo receber as mensagens
rayquaza_bot.whatsapp.on('message', message => {

    const GROUNDON_INICIADO = true
    rayquaza_bot.armazenarConversa(message);

    //! ===================== Estágio 1 - Apresentação =====================
    if (rayquaza_bot.numero_estagio === 1) {
        rayquaza_bot.enviarMensagem(message, 'Ola mundo!')

        //teste.boasVindas(message)
        estagio1.boasVindas(message)

        rayquaza_bot.avancarEstagio()

    }


    //!=====================  Estágio 2 - Mostrar Menu Principal =====================
    else if (rayquaza_bot.numero_estagio === 2) {
        //Pegando os dados do cliente
        const nome_cliente = estagio2.getNomeCliente(message)
        cliente.setNome(nome_cliente)

        // Pegando o número de telefone
        const numero_telefone = estagio2.getTelefoneCliente(message)
        cliente.setPhoneNumber(numero_telefone)


        rayquaza_bot.delay(3000).then(
            rayquaza_bot.enviarMensagem(message, `✅ Prazer em te conhecer, ${nome_cliente}!`)
        );


        // Mostra o menu principal
        rayquaza_bot.delay(300).then(
            estagio2.mostrarMenuPrincipal(message)
        )


        rayquaza_bot.avancarEstagio().then(
            rayquaza_bot.enviarMensagem(message, 'O que deseja fazer?')
        )
    }




})

