const Cardapio = require("./Cardapio");

class Salgado extends Cardapio {
    constructor(id, nome, preco) {
        super(id, nome, preco)
    }

    getID() {
        return this.id;
    }

    getNome() {
        return this.nome;
    }
}

let salgados_list = []

let salgados_diversos = new Salgado(1, "Salgados Diversos", 6)

let pao_de_queijo = new Salgado(2, "Pão de Queijo", 5)

let fatia_pizza = new Salgado(3, "Fatia de Pizza", 10)

salgados_list.push(salgados_diversos, pao_de_queijo, fatia_pizza)

module.exports = Salgado;