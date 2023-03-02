const Excel = require('exceljs');

class Servico {
    constructor(nome, categoria, preco) {
        this.nome = nome;
        this.categoria = categoria;
        this.preco = preco;
    }
}

class Estabelicimento {
    constructor() {
        this.servicosPorCategoria = {};
    }

    async lerDadosExcel(path) {
        const workbook = new Excel.Workbook();

        // Read the Excel file
        try {
            await workbook.xlsx.readFile(path);
            const sheet = workbook.getWorksheet(1);
            console.log('Planilha carregada com sucesso!');
            return sheet;
        } catch (error) {
            console.log('Erro ao carregar planilha: ' + error);
        }
    }

    async carregarServicos(path) {
        const sheet = await this.lerDadosExcel(path);

        // Iterate over the rows in the worksheet
        sheet.eachRow((row, rowNumber) => {
            const nome = row.values[1];
            const categoria = row.values[2];
            const preco = row.values[3];

            // If the category does not exist in the object, create it
            if (!this.servicosPorCategoria[categoria]) {
                this.servicosPorCategoria[categoria] = [];
            }

            // Add the service to the category
            this.servicosPorCategoria[categoria].push(new Servico(nome, categoria, preco));
        });
    }
}
async function main() {
    const caminhoPlanilha = '/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Agendamento de Clientes/Chatbot-JS/Chatbot/Banco de Dados - EXCEL/Base de Dados Produtos/servicos-salao.xlsx';
    const salaoDeBeleza = new SalaoDeBeleza();
    await salaoDeBeleza.carregarServicos(caminhoPlanilha);
    console.log(salaoDeBeleza.servicosPorCategoria);
}

//main();