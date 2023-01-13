const ExcelJS = require('exceljs');
const { faker } = require('@faker-js/faker');


const workbook = new ExcelJS.Workbook();
const sheet = workbook.addWorksheet('Primeira Aba');

sheet.columns = [
    { header: 'Nome', key: 'name', width: 32 },
    { header: 'Email', key: 'email', width: 32 },
    { header: 'Telefone', key: 'phone', width: 32 },

]

for (let i = 0; i < 100; i++) {
    sheet.addRow({
        name: faker.name.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
    })
}


sheet.getRow(1).font = {
    bold: true,
    size: 14,
    color: { argb: 'FFFFFF' }

}

sheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    bgColor: { argb: 'FF000000' }
}

workbook.xlsx.writeFile('./assets/planilha.xlsx')