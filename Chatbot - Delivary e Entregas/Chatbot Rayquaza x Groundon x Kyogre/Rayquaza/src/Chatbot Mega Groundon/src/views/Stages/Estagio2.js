



class Estagio2 extends GroundonView {
	constructor(whatsapp) {
		super(whatsapp);
	}

	start() {
		super.start();

		// Implementação específica do Estágio 2

	}


    getNomeCliente(message) {
        try {
            const name_user = message.body
            this.NomeCliente = message.body
            console.log(this.NomeCliente)
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


    mostrarMenuPrincipal = (message) => {


        const nome_cliente = this.getNomeCliente(message)
        this.chatbot.enviarBotao(message, `Vamos lá, ${nome_cliente}! Escolha uma opção abaixo do que voce deseja`,
            [
                { body: "Ver Cardápio" },
                { body: "FAZER PEDIDO" },
                { body: "Ver nossa Localização" }
            ], '🤖 Chatbot Groundon', `Horário de Atendimento = ${this.chatbot.getHoras()} `
        );

    }
}