const Excel = require('exceljs');

const caminhoPlanilha = '/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Agendamento de Clientes/Chatbot-JS/Chatbot/Banco de Dados - EXCEL/Base de Dados Produtos/servicos-salao.xlsx';

const workbook = new Excel.Workbook();

async function lerPlanilha() {
    await workbook.xlsx.readFile(caminhoPlanilha);

    const sheet = workbook.getWorksheet(1);

    const produtos = [];

    sheet.eachRow((row, rowNumber) => {
        const produto = {
            nome: row.getCell(1).value,
            categoria: row.getCell(2).value,
            preco: row.getCell(3).value
        };

        produtos.push(produto);

        console.log(`Linha ${rowNumber}: ${JSON.stringify(produto)}`);
    });

    return produtos;
}

(async function () {
    const produtos = await lerPlanilha();
    console.log(produtos);
})();
