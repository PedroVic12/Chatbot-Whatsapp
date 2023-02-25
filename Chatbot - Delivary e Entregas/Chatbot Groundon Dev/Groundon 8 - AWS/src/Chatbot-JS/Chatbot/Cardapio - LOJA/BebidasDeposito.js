const fs = require('fs');


class BebidasDeposito {
    constructor(tipo_bebida, nome, preco) {
        this.nome = [nome];
        this.preco = preco;
        this.tipo_bebida = tipo_bebida;
        //this.produtos = [nome, preco]
    }

    //TODO PEGAR AS BEBIDAS DE UMA BASE DE DADOS DO EXCEL
    getBebidasJson() {
        // Ler o conteúdo do arquivo 'Planilha1.json'
        fs.readFile('Banco de Dados/Planilha1.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            // Converter o conteúdo em um objeto JavaScript
            const bebidas = JSON.parse(data);
            // Trabalhar com o objeto JavaScript
            console.log(bebidas);
        });
    }


    getNome() {
        return this.nome;
    }

    getPreco() {
        return this.preco;
    }


    static getAllBebidas() {
        return [
            // new Bebidas("Coca-cola", 4.99),
            // new Bebidas("Pepsi", 3.99),
            // new Bebidas("Sprite", 3.99),
            // new Bebidas("Fanta Uva", 3.99),
            // new Bebidas("Guaraná", 3.99)
            new BebidasDeposito("Refrigerante", ['Guarana', 'Coca Cola', 'Sprite'], 4.99),
        ]
    }

}



// Crie uma instância da classe BebidasDeposito
const deposito = new BebidasDeposito();

// Chame o método getBebidasJson() na instância
deposito.getBebidasJson();



module.exports = BebidasDeposito;