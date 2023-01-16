const Chatbot = require("../../chatbot");

//Apresentação, Consulta No Banco de dados, iniciar Atendimento
class Estagio1 {


    //Herança implícita da classe Chatbot
    constructor(Chatbot) {
        this.chatbot = Chatbot;

    }

    boasVindas(message) {

        this.chatbot.enviarMensagem(message, 'Meu nome é Groundon, sou um chatbot e estou aqui para te ajudar a fazer seu pedido!');
        this.chatbot.enviarMensagem(message, "Antes de começarmos, por favor, digite seu *nome*:")

    }

    infoCliente(whatsapp, message) {
        let horario_pedido = Estagio1.getHoras()
        let nome = this.getNomeCliente(whatsapp, message);
        let telefone_cliente = message.from.split('@')[0]

        this.numero_pedido++

        return {
            "Nome": nome,
            "Numero de Pedidos": this.numero_pedido,
            "horario do pedido": horario_pedido,
            "Telefone": telefone_cliente
        }
    }

}

module.exports = Estagio1;