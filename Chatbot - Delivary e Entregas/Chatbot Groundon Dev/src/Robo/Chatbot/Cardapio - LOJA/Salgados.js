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
}


let salgados_diversos = new Salgados("Salgados Diversos", 6)
let pao_de_queijo = new Salgados("Pão de Queijo", 5)
let fatia_pizza = new Salgados("Fatia de Pizza", 10)

let todo_cardapio = []
todo_cardapio.push(salgados_diversos, pao_de_queijo, fatia_pizza)
//console.log(todo_cardapio)


module.exports = Salgados;