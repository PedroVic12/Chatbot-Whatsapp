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
}


let BigMac = new Sanduiches("Big Mac", 8)
let quarteirao = new Sanduiches("Quarteirão", 5)
let x_tudo = new Sanduiches("X-TUDO", 10)

var todo_cardapio = []
todo_cardapio.push(BigMac, quarteirao, x_tudo)
//console.log(todo_cardapio)


module.exports = Sanduiches;