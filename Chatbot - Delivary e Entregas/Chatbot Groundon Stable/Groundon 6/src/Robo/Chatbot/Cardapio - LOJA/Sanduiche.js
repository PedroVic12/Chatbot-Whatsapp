class Sanduiches {
    constructor(nome_sanduiche, preco_sanduiche) {

        this.nome = nome_sanduiche;
        this.preco = preco_sanduiche;

        //descrição do produto
    }

    getNome() {
        return this.nome;
    }

    getPreco() {
        return `Preço = ${this.preco}`;
    }

    static getAllSanduiches() {
        return [
            new Sanduiches("Big Mac", 7.99),
            new Sanduiches("Quarteirão", 3.99),
            new Sanduiches("X-TUDO", 5.99),
            new Sanduiches("Cheese Burguer", 13.99),
            new Sanduiches("Cheese Bacon", 10.99)
        ]
    }
}



module.exports = Sanduiches;