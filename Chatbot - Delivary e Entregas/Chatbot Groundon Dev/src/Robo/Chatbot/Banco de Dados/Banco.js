const ExcelJS = require('exceljs');
const { faker } = require('@faker-js/faker');

//!Usando a Biblioteca
const workbook = new ExcelJS.Workbook();

//!Mudar o Nome para o mes Correspondente da Data atual
const sheet = workbook.addWorksheet('Janeiro');

sheet.columns = [
    { header: 'Nome', key: 'name', width: 32 },
    { header: 'Telefone', key: 'phone', width: 32 },
]


//!Meu Banco de Dados
class Banco {
    constructor() {
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
        workbook.xlsx.writeFile('Robo/Chatbot/Banco de Dados/Janeiro/base_de_dados_janeiro.xlsx')
    }

}

module.exports = Banco;