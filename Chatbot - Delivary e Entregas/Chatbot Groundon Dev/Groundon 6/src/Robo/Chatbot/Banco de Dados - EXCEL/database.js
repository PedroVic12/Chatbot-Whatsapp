const ExcelJS = require('exceljs');
const { faker } = require('@faker-js/faker');

const workbook = new ExcelJS.Workbook();

//!Mudar o Nome para o mes Correspondente da Data atual
const sheet = workbook.addWorksheet('Janeiro');

sheet.columns = [
    { header: 'Nome', key: 'name', width: 32 },
    { header: 'Telefone', key: 'phone', width: 32 },
    //{ header: "Data", key: "date", width: 32 },
    { header: "Itens", key: "item", width: 32 },
    { header: "Total", key: "total", width: 32 },
    { header: "Endereço", key: "address", width: 32 },
]

for (let i = 0; i < 5; i++) {
    sheet.addRow({
        name: faker.name.fullName(),
        phone: faker.phone.number(),
    })
}

function adicionarCliente(nome, telefone) {
    sheet.addRow({
        name: nome,
        phone: telefone,
    });
    workbook.xlsx.writeFile('Chatbot/Banco de Dados - EXCEL/Janeiro/base_de_dados_janeiro.xlsx')
}


sheet.getRow(1).font = {
    bold: true,
    size: 14,
    color: { argb: '0000FF' }

}

sheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    bgColor: { argb: 'FF000000' }
}

workbook.xlsx.writeFile('Chatbot/Banco de Dados - EXCEL/Janeiro/base_de_dados_janeiro.xlsx')