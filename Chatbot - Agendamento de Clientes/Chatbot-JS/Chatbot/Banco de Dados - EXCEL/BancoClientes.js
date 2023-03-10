const Excel = require('exceljs');

class Agendamento {
    constructor(data_atendimento, nome, telefone, servico, categoria_servico, preco, data_agendada, hora_agendada) {
        this.data_atendimento = data_atendimento;
        this.nome = nome;
        this.telefone = telefone;
        this.servico = servico;
        this.categoria_servico = categoria_servico;
        this.preco = preco;
        this.data_agendada = data_agendada;
        this.hora_agendada = hora_agendada;


    }
}

class BancoDeDadosClientes {
    constructor() {
        this.agendamentos_salvos = [];
        this.workbook = new Excel.Workbook();
        this.worksheet = null;
    }

    //! MÉTODOS DE MANIPULAÇÃO DA PLANILHA
    async loadWorkbook(filePath) {
        try {
            await this.workbook.xlsx.readFile(filePath);

            // pegando o primeira aba da planilha
            this.worksheet = this.workbook.getWorksheet(1);
            console.log('Planilha De Clientes carregada com sucesso!');
            return this.worksheet;


        } catch (error) {
            console.log('Erro ao carregar planilha: ' + error);
        }
    }

    async saveWorkbook(filePath) {
        try {
            await this.workbook.xlsx.writeFile(filePath);
            console.log('Planilha salva com sucesso!');
        } catch (error) {
            console.log('Erro ao salvar planilha: ' + error);
        }
    }

    hasValues(row) {
        return row.values.some(value => !!value);
    }

    updateWorksheet() {
        this.worksheet.spliceRows(2, this.worksheet.rowCount - 1);
        const rows = this.agendamentos_salvos.map(agendamento => {
            return [agendamento.data_atendimento, agendamento.nome, agendamento.telefone, agendamento.servico, agendamento.categoria_servico, agendamento.preco, agendamento.data_agendada, agendamento.hora_agendada];
        });
        this.worksheet.addRows(rows);
    }

    limparPlanilha() {
        const CAMINHO_PLANILHA_ATUAL = '/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Agendamento de Clientes/Chatbot-JS/Chatbot/Banco de Dados - EXCEL/Base de Dados Clientes/base-clientes.xlsx';

        // Obtém o número de linhas preenchidas na planilha
        const rowCount = this.worksheet.actualRowCount;

        // Percorre todas as linhas da planilha de baixo para cima
        for (let i = rowCount; i >= 1; i--) {
            const row = this.worksheet.getRow(i);

            // Verifica se a linha está vazia
            if (row.values.every(cell => cell === null || cell === '')) {
                // Exclui a linha vazia
                this.worksheet.spliceRows(i, 1);
            }
        }

        // Salva a planilha
        this.saveWorkbook(CAMINHO_PLANILHA_ATUAL);

        // Atualiza o objeto Worksheet
        this.updateWorksheet();
    }



    //! MÉTODOS DE CRUD
    async addAgendamento(agendamento) {

        const CAMINHO_PLANILHA_ATUAL = '/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Agendamento de Clientes/Chatbot-JS/Chatbot/Banco de Dados - EXCEL/Base de Dados Clientes/base-clientes.xlsx'

        // Adiciona o agendamento no array de agendamentos
        this.agendamentos_salvos.push(agendamento);

        console.log('=====================================')
        console.log(agendamento)
        console.log('=====================================')

        // Obtém a última linha preenchida na planilha
        const lastRow = this.worksheet.lastRow;

        // Adiciona uma nova linha na planilha e preenche com as informações do agendamento
        const newRowNumber = lastRow ? lastRow.number + 1 : 1;

        // Colocando uma nova linha na planilha com as informações
        const newRow = this.worksheet.addRow([
            agendamento.data_atendimento,
            agendamento.nome,
            agendamento.telefone,
            agendamento.servico,
            agendamento.categoria_servico,
            agendamento.preco,
            agendamento.data_agendada,
            agendamento.hora_agendada
        ], newRowNumber);

        // Atualiza o número de linha do agendamento no objeto Agendamento para que possa ser usado em operações futuras
        agendamento.numLinha = newRow.number;

        //this.limparPlanilha();

        // Salva a planilha
        await this.saveWorkbook(CAMINHO_PLANILHA_ATUAL);

        console.log('\n\n>>>Agendamento do cliente atualizado com sucesso!')

    }

    removeAgendamento(index) {
        this.agendamentos_salvos.splice(index, 1);
        this.updateWorksheet();
    }

    updateAgendamento(index, agendamento) {
        this.agendamentos_salvos[index] = agendamento;
        this.updateWorksheet();
    }

    readAgendamentos() {
        const rows = this.worksheet.getRows(2, this.worksheet.rowCount - 1);
        this.agendamentos_salvos = rows
            .filter(row => this.hasValues(row))
            .map(row => {
                const data_atendimento = row.getCell('A').value;
                const nome = row.getCell('B').value;
                const telefone = row.getCell('C').value;
                const servico = row.getCell('D').value;
                const categoria_servico = row.getCell('E').value;
                const preco = row.getCell('F').value;
                const data_agendada = row.getCell('G').value;
                const hora_agendada = row.getCell('H').value;

                return new Agendamento(data_atendimento, nome, telefone, servico, categoria_servico, preco, data_agendada, hora_agendada);
            });

        return this.agendamentos_salvos; // adicionando o retorno do array de agendamentos

    }
}


module.exports = BancoDeDadosClientes;

//funcao main
async function main() {

    //Lendo a planilha
    const filePath = '/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Agendamento de Clientes/Chatbot-JS/Chatbot/Banco de Dados - EXCEL/Base de Dados Clientes/base-clientes.xlsx';
    const agendamentoManager = new BancoDeDadosClientes();
    await agendamentoManager.loadWorkbook(filePath);


    //Adicionando um agendamento
    agendamento_cliente = new Agendamento('09/03/2023', 'Pedro Victor', 521999289987, 'Fazer Moicano e Pintar de loiro', 'Cabelo', 200, '2023-12-03', '16:00')
    agendamentoManager.addAgendamento(agendamento_cliente)

    //Lendo os agendamentos
    const agendamentos = await agendamentoManager.readAgendamentos();
    console.log(agendamentos);

    // //Removendo um agendamento pelo nome do cliente e telefone e data de agendamento
    // agendamentoManager.removeAgendamento(0);
    // console.log(agendamentoManager.agendamentos);

    // //Atualizando um agendamento de acordo com o cliente deseja
    //agendamentoManager.updateAgendamento(0, new Agendamento('Pedro', '11999999999', 'Corte', '50', '2021-06-01', '10:00'));
    //console.log(agendamentoManager.agendamentos);

    // //Salvando a planilha
    // await agendamentoManager.saveWorkbook(filePath);
}

//main();


