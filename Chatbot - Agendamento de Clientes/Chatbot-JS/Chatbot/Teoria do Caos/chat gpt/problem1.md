este é o meu codigo main.js de um chatbot de agendamento de clientes

const stageMap = new Map(); // Cria um Map vazio para armazenar o estágio atual de cada número de telefone

function iniciaConversaCliente(message) {
    const phoneNumber = message.from.split('@')[0];
    const numero_estagios = 10;
    const currentStage = stageMap.get(phoneNumber) || 1;

    console.log(`Debug -> ${currentStage}`);

    if (currentStage === 1) {
        stageMap.set(phoneNumber, 1);
        estagio1.boasVindas(message);
    } else if (currentStage < numero_estagios) {
        chatbot.avancarEstagio();
        let estagios;
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
        let flag_impressora = false;

        //! ===================== Estágio 1 - Apresentação =====================
        if (chatbot.numero_estagio === 1) {
            iniciaConversaCliente(message)
            // estagio1.boasVindas(message);
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

            // Mostrando o menu principal
            chatbot.enviarMensagem(message, `✅ Prazer em te conhecer, ${Cliente.getNome()}!`);
            chatbot.avancarEstagio().then(
                estagio2.mostrarMenuPrincipal(message)
            )
        }

class Chatbot {
    constructor() {
        this.numero_estagio = 1
        this.conversas = [[], [], [], [], [], [], [], [], [], []];
        this.numero_pedido_dia = 1

        //! Instanciando o Objeto com o nome do Cliente
        this.whatsapp = new Client({

            // Se o código travar e não gerar o QRCODE, mude o nome do ClientID
            authStrategy: new LocalAuth({ clientId: "Barbearia" })
        });


    }

so que tenho um problema, quando eu rodo o script, ele funciona normal mas quando mais de uma pessoa fala com o chatbot mesmo com o script ligado, ele nao faz nada, como posso fazer que ele atenda varios clientes ao mesmo tempo?