const Pedido = require("./Pedido");


class Carrinho {
    constructor() {
        this.produtos = [];
        this.total = 0;
    }

    adicionarProduto(produto) {
        this.produtos.push(produto);
        this.total += produto.preco;
    }

    calcularTotal() {
        return this.total;
    }
}


module.exports = Carrinho;