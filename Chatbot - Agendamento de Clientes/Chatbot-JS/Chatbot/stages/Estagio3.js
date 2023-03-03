const Chatbot = require("../chatbot")
const Cliente = require("../Cliente/Cliente")
const Salao = require("../Banco de Dados - EXCEL/Estabelicimento")

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


    mostrarListaSalaoBeleza(message) {
        const caminhoPlanilha = '/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Agendamento de Clientes/Chatbot-JS/Chatbot/Banco de Dados - EXCEL/Base de Dados Produtos/servicos-salao.xlsx'; // Altere para o caminho da planilha que contém os serviços e categorias
        const salao = new Salao();
        salao.carregarServicos(caminhoPlanilha);

        const itensLista = [];
        for (const categoria in salao.servicosPorCategoria) {
            const servicos = salao.servicosPorCategoria[categoria];
            const servicosList = servicos.map(servico => servico.nome).join(", ");
            itensLista.push({ title: categoria, description: servicosList });
        }

        const lista = [{
            title: "==> Aqui estão os nossos serviços <==",
            rows: itensLista
        }];

        return this.enviarLista(message, "Escolha uma opção abaixo", "Agendar um Serviço", lista);
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