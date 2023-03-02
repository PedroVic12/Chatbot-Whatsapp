const Chatbot = require("../chatbot");
const Cliente = require("../Cliente/Cliente");

class Estagio7 {
    //!Herança implícita da classe Chatbot
    constructor(Chatbot) {
        this.chatbot = Chatbot;

    }

    adicionandoClienteNaBasedeDados(message) {
        let data = this.chatbot.getDataAtual()

        // TODO Verificar na Base de dados com try e catch com uma função
        try {
            let excel_janeiro = "/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Delivary e Entregas/Chatbot Groundon Dev/src/Robo/Chatbot/Banco de Dados - EXCEL/Janeiro/base_de_dados_janeiro.xlsx"
            let dados_excel = Banco.lerDadosExcel(excel_janeiro)
            chatbot.enviarMensagem(message, "Base de Dados Atual " + dados_excel)


        } catch (error) {
            console.log('ERRO AO CADASTRAR O CLIENTE NA BASE DE DADOS', error);

        }

    }

    PegandoEnderecoCliente(message) {
        const address_user = this.chatbot.getLastMessage(message)
        return address_user
    }

    getLocationGoogleApi(message) {
        // pega o endereço pela localização do wpp
        if (message.type === 'location') {
            this.cliente.getAddressFromCoordinates(message)
            //cliente.getLocation(message)
        }
    }


    getInfoCliente() {
        return `Nome do Cliente = {} \n Telefone = {} \n Itens do Pedido ={} \n Total do Pedido = R$ {}\n Forma de Pagamento = {} \n Endereço de Entrega = {}`
    }
}

module.exports = Estagio7;
