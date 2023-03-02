const Chatbot = require("../chatbot");
const Cliente = require("../Cliente/Cliente")
const BancoClientes = require("../Banco de Dados - EXCEL/BancoClientes")


//! Verificar se o Cliente esta na Base de Dados
class Estagio2 {
    //Herança implícita da classe Chatbot
    constructor(Chatbot) {
        this.chatbot = Chatbot;
    }

    getNomeCliente(message) {
        try {
            const name_user = message.body
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


    // Verificar se o Cliente esta na Base de Dados
    async verificarClienteBaseDados(message, _NomeCliente, _TelefoneCliente) {

        //Lendo a planilha
        const filePath = '/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Agendamento de Clientes/Chatbot-JS/Chatbot/Banco de Dados - EXCEL/Base de Dados Clientes/base-clientes.xlsx';
        const banco_clientes = new BancoClientes();
        let planilha_excel = await banco_clientes.loadWorkbook(filePath);

        //verificar na coluna nome se o cliente esta cadastrado
        const colunaNome = planilha_excel.getColumn(2);
        const nomes_planilha = colunaNome.values;
        const cliente_existe = nomes_planilha.some(cell => cell.toUpperCase() === _NomeCliente.toUpperCase());

        //verificar na coluna telefone se o cliente esta cadastrado
        const colunaTelefone = planilha_excel.getColumn(3);
        const telefones_planilha = colunaTelefone.values;
        const telefone_existe = telefones_planilha.some(cell => cell === _TelefoneCliente);

        if (cliente_existe && telefone_existe) {
            this.chatbot.enviarMensagem(message, `Cliente ${_NomeCliente} já existe na base de dados. \nUm prazer ter voce de volta :)`);
        } else {
            this.chatbot.enviarMensagem(message, `Cliente ${_NomeCliente} não existe na base de dados. :( `);
        }

        //TODO voce quis dizer: Pedro Victor invez de pedrov12 com o numero tal?

    }



    mostrarMenuPrincipal = (message) => {

        try {
            const nome_cliente = this.getNomeCliente(message)

            this.chatbot.enviarBotao(message, `Vamos lá, ${nome_cliente}! Escolha uma opção abaixo do que voce deseja`,
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


module.exports = Estagio2;