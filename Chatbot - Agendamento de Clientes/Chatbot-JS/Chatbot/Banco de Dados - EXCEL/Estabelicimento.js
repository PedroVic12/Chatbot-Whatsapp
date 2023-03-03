const Excel = require('exceljs');

class Servico {
    constructor(categoria, nome, preco) {
        this.categoria = categoria;
        this.nome = nome;
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
            const worksheet = workbook.getWorksheet(1);
            console.log('Planilha carregada com sucesso!');
            return worksheet;
        } catch (error) {
            console.log('Erro ao carregar planilha: ' + error);
        }
    }

    async carregarServicos(path) {
        const sheet = await this.lerDadosExcel(path);

        // Iterate over the rows in the worksheet
        sheet.eachRow({ from: 1 }, (row, rowNumber) => {
            // Primeira linha é o cabeçalho
            // If it's the first row, do nothing and skip to the next row
            if (rowNumber === 1) {
                return;
            }

            // Get the values from the row
            const categoria = row.getCell(1).value;
            if (!categoria) {
                // Ignora a linha caso a primeira célula esteja vazia
                return;
            }
            const servico = row.getCell(2).value;
            const preco = row.getCell(3).value;

            // If the category does not exist in the object, create it
            if (!this.servicosPorCategoria[categoria]) {
                this.servicosPorCategoria[categoria] = [];
            }

            // Add the service to the category
            this.servicosPorCategoria[categoria].push(new Servico(categoria, servico, preco));
        });
    }

}
async function main() {
    const caminhoPlanilha = '/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Agendamento de Clientes/Chatbot-JS/Chatbot/Banco de Dados - EXCEL/Base de Dados Produtos/servicos-salao.xlsx';
    const salaoDeBeleza = new Estabelicimento();
    await salaoDeBeleza.carregarServicos(caminhoPlanilha);


    // Itera sobre as categorias de serviços
    for (const categoria in salaoDeBeleza.servicosPorCategoria) {
        console.log(`\nCategoria: ${categoria}`);

        // Itera sobre os serviços associados a cada categoria
        const servicos = salaoDeBeleza.servicosPorCategoria[categoria];
        for (const servico of servicos) {
            console.log(`- ${servico.nome} (R$ ${servico.preco} reais)`);
        }
    }
}

//main();


module.exports = Estabelicimento;