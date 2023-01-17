const Chatbot = require("../../chatbot");

class Estagio2 {

    //Herança implícita da classe Chatbot
    constructor(Chatbot) {
        this.chatbot = Chatbot;

        //Numero de Pedidos por dia
        this.numero_pedido_dia = 1
        this.nome_cliente = ""

    }
    async getNomeCliente(message) {
        try {
            this.nome_cliente = message.body
            this.chatbot.enviarMensagem(message, `Prazer em te conhecer, ${this.nome_cliente}!`);
            this.chatbot.enviarMensagem(message, `Seu numero de Pedido é ${this.numero_pedido} `)

        } catch (err) {
            console.log(err);
        }
    }

    getNome() {
        return this.nome_cliente;
    }


    infoCliente(message) {

        let horario_pedido = this.chatbot.getHoras()

        //let nome = this.getNomeCliente(whatsapp, message);
        let nome = message._data.notifyName;

        let telefone_cliente = message.from.split('@')[0]

        dados = {
            "Nome": nome,
            "Numero de Pedidos": this.numero_pedido_dia,
            "horario do pedido": horario_pedido,
            "Telefone": telefone_cliente
        }

        this.chatbot.enviarMensagem(message, `Dados do Cliente: ${JSON.stringify(dados)}`)
    }
    

    mostrarMenuPrincipal = (message) => {

        this.chatbot.enviarBotao(message, `Vamos lá,  ${this.getNome()}! Escolha uma opção abaixo do que voce deseja`,
            [
                { body: "Ver Cardápio" },
                { body: "Fazer Pedido" },
                { body: "Ver nossa Localização" }
            ], 'Chatbot Groundon', `Horário de Atendimento = ${this.chatbot.getHoras()}`
        );

        //Testar os IFs aqui dentro para que não precise de outro estagio

        
    }

    mandarMensagemTeste(message) {

        this.chatbot.enviarBotao2(message, "Escolha as opções", ["Sim", "Não"])

    }


    

}

module.exports = Estagio2;