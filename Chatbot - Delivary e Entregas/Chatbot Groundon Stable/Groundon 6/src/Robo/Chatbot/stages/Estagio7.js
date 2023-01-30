const Chatbot = require("../chatbot");
const BancoDeDados = require("../Banco de Dados - EXCEL/Banco")
const Cliente = require("../Pedido/Cliente")
const Carrinho = require("../Pedido/Carrinho")

class Estagio7 {
    //Herança implícita da classe Chatbot
    constructor(Chatbot) {
        this.chatbot = Chatbot;
        this.NomeCliente = ""

    }

    getInfoCliente() {
        return `Nome do Cliente = {} \n Telefone = {} \n Itens do Pedido ={} \n Total do Pedido = R$ {}\n Forma de Pagamento = {} \n Endereço de Entrega = {}`
    }
}

module.exports = Estagio7;
