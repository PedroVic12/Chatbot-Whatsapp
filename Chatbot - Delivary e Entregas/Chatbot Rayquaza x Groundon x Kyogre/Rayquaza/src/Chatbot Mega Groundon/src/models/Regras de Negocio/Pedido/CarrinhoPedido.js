
const Cliente = require('../Cliente/Cliente')

class PedidoCliente {
    constructor(cliente) {
        this.cliente = cliente;

    }

    adicionarProdutoAoCarrinho(produto, preco) {
        this.carrinho.adicionarProduto(produto, preco);
    }

    listarProdutosDoCarrinho() {
        return this.carrinho.listarProdutos();
    }

    getTotalDoCarrinho() {
        return this.carrinho.getTotal();
    }
}




class Carrinho extends PedidoCliente {
    constructor() {
        super()
        this.produtos = [];
        this.total = 0;
    }

    adicionarProduto(produto, preco) {
        this.produtos.push({ produto, preco });
        this.total += preco;
    }

    listarProdutos() {
        return this.produtos;
    }

    getTotal() {
        return this.total;
    }
}


module.exports = {
    PedidoCliente,
    Carrinho,
};

function main_carrinho_pedido() {
    const cliente = new Cliente();
    const carrinho = new Carrinho(cliente); // Create an instance of Carrinho directly

    console.log(cliente);

    carrinho.adicionarProdutoAoCarrinho('Coca-Cola', 5.00);
    carrinho.adicionarProdutoAoCarrinho('Coca-Cola', 5.00);
    const produtos = carrinho.listarProdutosDoCarrinho();
    console.log(produtos);
}

//main_carrinho_pedido();
