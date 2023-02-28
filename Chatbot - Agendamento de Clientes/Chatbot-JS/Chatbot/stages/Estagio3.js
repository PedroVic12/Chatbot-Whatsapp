const Chatbot = require("../chatbot")

class Estagio3 {
    constructor(Chatbot) {
        this.chatbot = Chatbot;
    }


    mostrarCardapioPDF(message) {
        this.chatbot.enviarMensagem(message, "https://www.zdgdelivery.com.br/wp-content/uploads/2019/05/Menu-ZDG-1.pdf")
    }


    mostrarLocal(message) {
        let botafogo = {
            nome: 'Botafogo',
            rua1: 'Rua Praia de botafogo, 340',
            rua2: 'Rua Voluntários da Pátria, 156',
            rua3: 'Rua Voluntários da Pátria, 350'
        }

        this.chatbot.enviarMensagem(message, `Aqui está a nossa localização: \n *Rua Gomes Freire 647 - Lapa*`)

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


}

module.exports = Estagio3;