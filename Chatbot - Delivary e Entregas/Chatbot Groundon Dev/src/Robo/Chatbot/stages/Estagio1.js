const Chatbot = require("../../chatbot");

class Estagio1 extends Chatbot {
    constructor() {
        super();
        this.numero_pedido = 1
        this.nome_cliente = ""
    }

    boasVindas(message) {

        super.enviarMensagem(message, 'Olá, seja bem vindo ao Groundon!');
        super.enviarMensagem(message, 'Meu nome é Groundon, sou um chatbot e estou aqui para te ajudar a fazer seu pedido!');
        super.enviarMensagem(message, "Antes de começarmos, por favor, digite seu *nome*:");

    }

    async getNomeCliente(whatsapp, message) {
        try {
            this.nome_cliente = message.body
            enviarMensagem(whatsapp, message, `Prazer em te conhecer, ${this.nome_cliente}!`);

        } catch (err) {
            console.log(err);
        }
    }

    getNome() {
        return this.nome_cliente;
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