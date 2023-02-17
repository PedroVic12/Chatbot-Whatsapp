const Chatbot = require("../chatbot");
const BancoDeDados = require("../Banco de Dados - EXCEL/Banco")
const Cliente = require("../Pedido/Cliente")
const Carrinho = require("../Pedido/Carrinho")

class Estagio7 {
    //!Herança implícita da classe Chatbot
    constructor(Chatbot) {
        this.chatbot = Chatbot;

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
