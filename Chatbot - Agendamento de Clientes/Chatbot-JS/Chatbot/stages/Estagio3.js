const Chatbot = require("../chatbot")
const Cliente = require("../Cliente/Cliente")

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

    mostrarMenuPrincipalEstagio3 = (message) => {

        try {
            this.chatbot.enviarBotao(message, `Escolha uma opção abaixo do que voce deseja`,
                [
                    { body: "Consultar os Preços" },
                    { body: "Agendar um Serviço" },
                    { body: "Cancelar Agendamento" }
                ], '🤖 Chatbot Kyogre', `Horário de Atendimento = ${this.chatbot.getHoras()} `
            );
        }

        catch (err) {
            console.log(err);
        }

    }


}

module.exports = Estagio3;