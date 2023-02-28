const Chatbot = require("../chatbot");
const BancoDeDados = require("../Banco de Dados - EXCEL/Banco")
const Cliente = require("../Pedido/Cliente")


//! Verificar se o Cliente esta na Base de Dados

class Estagio2 {
    //Herança implícita da classe Chatbot
    constructor(Chatbot) {
        this.chatbot = Chatbot;
        this.NomeCliente = ""

    }


    mostrarMenuPrincipal = (message) => {

        try {
            const nome_cliente = this.getNomeCliente(message)
            this.chatbot.enviarBotao(message, `Vamos lá, ${nome_cliente}! Escolha uma opção abaixo do que voce deseja`,
                [
                    { body: "Ver Cardápio" },
                    { body: "Fazer Pedido" },
                    { body: "Ver nossa Localização" }
                ], '🤖 Chatbot Groundon', `Horário de Atendimento = ${this.chatbot.getHoras()} `
            );
        }

        catch (err) {
            console.log(err);
        }

    }

    getNameByJavaMethod(message) {
        this.NomeCliente = message.body
        return this.NomeCliente
    }

    getNomeCliente(message) {
        try {

            const name_user = message.body
            return name_user

        } catch (err) {
            console.log(err);
        }
    }

    getTelefoneCliente(message) {
        try {
            const telefone_user = message.from.split('@')[0]
            return telefone_user
        } catch (err) {
            console.log(err);
        }
    }


    adicionandoClienteNaBasedeDados(message) {
        let data = this.chatbot.getDataAtual()
        this.chatbot.gerarArquivoTxt(` Números de Pedido == ${this.chatbot.numero_pedido_dia} em |${data}|  `)
        this.chatbot.enviarMensagem(message, ` Números de Pedido == ${this.chatbot.numero_pedido_dia} em | ${data} | `)

        // TODO Verificar na Base de dados com try e catch com uma função
        try {
            let excel_janeiro = "/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Delivary e Entregas/Chatbot Groundon Dev/src/Robo/Chatbot/Banco de Dados - EXCEL/Janeiro/base_de_dados_janeiro.xlsx"
            let dados_excel = Banco.lerDadosExcel(excel_janeiro)
            chatbot.enviarMensagem(message, "Base de Dados Atual " + dados_excel)


        } catch (error) {
            console.log('ERRO AO CADASTRAR O CLIENTE NA BASE DE DADOS', error);

        }



    }




    infoCliente(message) {

        //let data_atual = new Date();

        let horario_pedido = this.chatbot.getHoras()
        let nome_cliente = message._data.notifyName;
        //let nome_cliente2 = this.getNome()
        let telefone_cliente = message.from.split('@')[0]

        // cliente_atual = new Cliente(this.chatbot, nome_cliente, telefone_cliente)

        dados = {
            "Nome": nome_cliente,
            "Numero do Pedido": this.numero_pedido_dia,
            "horario do pedido": horario_pedido,
            "Telefone": telefone_cliente
        }



        //!colocar a variavel dados para o excel
        this.chatbot.enviarMensagem(message, `Dados do Cliente: ${JSON.stringify(dados)}`)
        // excel = new BancoDeDados(this.chatbot)
        // excel.adicionarCliente(nome_cliente, telefone_cliente)

        // se o cliente estiver na base de dados, enviar uma mensagem que o cliente ja esta cadastrado
        //this.chatbot.enviarMensagem(message, `Cliente ${ nome_cliente2 } já cadastrado!`)

        // se o cliente não estiver na base de dados, cadastrar o cliente
        //this.chatbot.enviarMensagem(message, `Cliente atual = ${ cliente_atual } `)

    }








}


module.exports = Estagio2;