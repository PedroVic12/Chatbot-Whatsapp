class Bebidas {
    constructor(nome, preco) {
        this.nome = nome;
        this.preco = preco;
        //this.produtos = [nome, preco]
    }

    getNome() {
        return this.nome;
    }

    getPreco() {
        return this.preco;
    }


    static getAllBebidas() {
        return [
            new Bebidas("Coca-cola", 4.99),
            new Bebidas("Pepsi", 3.99),
            new Bebidas("Sprite", 3.99),
            new Bebidas("Fanta Uva", 3.99),
            new Bebidas("Guaraná", 3.99)
        ]
    }

}


module.exports = Bebidas;