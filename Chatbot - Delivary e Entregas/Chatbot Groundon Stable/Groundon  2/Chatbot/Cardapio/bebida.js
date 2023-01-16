class Bebidas {
    constructor() {
        this.produtos = [
            { nome: 'Refrigerante', preco: 3.50 },
            { nome: 'Suco', preco: 4.00 },
            { nome: 'Água', preco: 2.50 }
        ];
    }

    getArray() {
        return this.produtos;
    }

    adicionarCarrinho(nome_produto) {
        // procuramos o produto pelo nome
        const produto = this.produtos.find(produto => produto.nome === nome_produto);
        // adicionamos o produto ao carrinho
        this.carrinho.push(produto);
    }
}


module.exports = Bebidas;