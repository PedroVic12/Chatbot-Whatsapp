// npm install --global node-gyp ---> procurar versão linux
// npm install printer
// npm install printer --build-from-source


const printer = require('printer')
const fs = require('fs')

//Mostra as impressoras disponiveis
console.log(printer.getPrinters())

const info = fs.readFileSync('arquivo.txt')

function mandarImprimir() {

    printer.printDirect({

        //Objeto a ser imprimido
        data: info,

        //Impressora que vai imprimir
        printer: 'nome-impressora-disponivel',
        type: 'RAW',


        //Trocar por um bloco Try Catch
        sucesss: function (jobID) {
            console.log('ID = ', jobID)
        },

        error: function (error) {
            console.log('Printer module Error', error);
            throw error
        }
    })

}

//mandarImprimir()