const ExcelJS = require('exceljs');
const { faker } = require('@faker-js/faker');
const Chatbot = require("../../chatbot");

xlsx_path = "Robo/Chatbot/Banco de Dados/Janeiro/base_de_dados_janeiro.xlsx"


//!Criando um objeto do tipo Workbook
const workbook = new ExcelJS.Workbook();

//!Mudar o Nome para o mes Correspondente da Data atual
const sheet = workbook.addWorksheet('Janeiro');

// Access the first worksheet in the Excel file
let worksheet = workbook.getWorksheet(1);

// Set the header row
sheet.columns = [
    { header: 'Nome', key: 'name', width: 32 },
    { header: 'Telefone', key: 'phone', width: 32 },
]


//!Meu Banco de Dados
class BancoDeDados {
    constructor(Chatbot) {
        this.chatbot = Chatbot;

        this.cliente = {};
        this.nome_cliente = '';
        this.carrinho = [];
        this.total = 0;
        this.numero_whatsapp = 0

    }
    set(key, value) {
        this.cliente[key] = value;
    }
    get(key) {
        return this.cliente[key];
    }
    delete(key) {
        delete this.cliente[key];
    }


    lerDadosExcel(path) {
        // Read the Excel file
        workbook.xlsx.readFile(path);

        // Iterate over the rows in the worksheet
        sheet.eachRow(function (row, rowNumber) {
            return "Row " + rowNumber + " = " + JSON.stringify(row.values);
        });

    }

    getCliente() {
        //faz o getCliente para ver se o cliente esta na base de dados

    }

    setCliente(nome, carrinho, total, numero_whatsapp) {
        // se não tiver, faz o setCliente na base

        this.nome_cliente = nome;
        this.carrinho = carrinho;
        this.total = total;
        this.numero_whatsapp = numero_whatsapp;
    }


    delCliente()

    adicionarCliente(nome, telefone) {
        sheet.addRow({
            name: nome,
            phone: telefone,
        });
        workbook.xlsx.writeFile(xlsx)
    }

}

module.exports = BancoDeDados;