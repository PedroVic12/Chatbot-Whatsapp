class Chatbot {
    constructor() {
        this.estagio = 1;
        this.nomeCliente = '';
        this.carrinho = [];
    }

    avancarEstagio() {
        this.estagio++;
    }

    voltarEstagio() {
        this.estagio--;
    }

    async iniciar(message) {
        switch (this.estagio) {
            case 1:
                await this.boasVindas(message);
                break;
            case 2:
                await this.getNome(message);
                break;
            case 3:
                await this.mostrarMenu(message);
                break;
            case 4:
                await this.fazerPedido(message);
                break;
            case 5:
                await this.solicitarPagamento(message);
                break;
            case 6:
                await this.resumoPedido(message);
                break;
            default:
                console.log('Estágio inválido');
        }
    }

    async boasVindas(message) {
        this.whatsapp.sendMessage(message.from, 'Bem vindo a Citta Lanchonete, nos agradecemos sua preferencia');
        await this.whatsapp.sendMessage(message.from, 'Bem vindo ao Robô Groundon! \n\n Eu vou ser responsável pelo seu atendimento \n Antes de começarmos,  *Digite seu Nome*:');
    }

    async getNome(message) {
        this.nomeCliente = message.body;
        this.avancarEstagio();
    }

    async mostrarMenu(message) {
        let button = new Buttons(`Vamos lá, ${this.nomeCliente}! Escolha uma opção abaixo do que voce deseja`, [
            { body: 'Ver Cardápio' },
            { body: 'Fazer Pedido' },
            { body: 'Ver nossa Localização' }
        ], 'Chatbot Groundon', `Horário de Atendimento = ${this.getHoras()}`);

        this.whatsapp.sendMessage(message.from, button)
    }

    async fazerPedido(message) {
        // lógica para adicionar produto ao carrinho
    }

    async solicitarPagamento(message) {
        // lógica para solicitar pagamento
    }

    async resumoPedido(message) {
        // lógica para mostrar resumo do pedido e finalizar o atendimento
    }

    getHoras() {
        // lógica para retornar as horas atuais
    }
}

