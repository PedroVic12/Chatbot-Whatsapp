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




}



let salgados_diversos = new Bebidas("Ousadia", 6)
let pao_de_queijo = new Bebidas("Corote", 5)
let fatia_pizza = new Bebidas("Vodka da Fenix", 10)

let todo_cardapio_bebidas = []
todo_cardapio_bebidas.push(salgados_diversos, pao_de_queijo, fatia_pizza)
//console.log(todo_cardapio_bebidas)


module.exports = Bebidas;