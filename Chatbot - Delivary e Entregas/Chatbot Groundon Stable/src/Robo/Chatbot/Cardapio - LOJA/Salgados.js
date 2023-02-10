class Salgados {
    constructor(nome_salgado, preco_salgado) {

        this.nome = nome_salgado;
        this.preco = preco_salgado;
    }

    getNome() {
        return this.nome;
    }

    getPreco() {
        return this.preco;
    }

    static getAllSalgados() {
        return [
            new Salgados("Coxinha", 4.99),
            new Salgados("Salgados Diversos", 3.99),
            new Salgados("Pão de Queijo", 3.99),
            new Salgados("Fatia de Pizza", 3.99),
            new Salgados("Pastel", 3.99)
        ]
    }
}


module.exports = Salgados;