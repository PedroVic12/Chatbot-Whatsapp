class Bebidas {
    constructor() {
        this.produtos = [
            { nome: 'Água Mineral', preco: 2.50 },
            { nome: 'Refrigerante', preco: 3.50 },
            { nome: 'Suco', preco: 4.00 },
        ]


    }

    getArray() {
        let resultado = [];
        this.produtos.forEach(produto => {
            resultado.push(produto);

            resultado.push(produto.nome);
        });
        return resultado;
    }
    adicionarCarrinho(nome_produto) {
        // procuramos o produto pelo nome
        const produto = this.produtos.find(produto => produto.nome === nome_produto);
        // adicionamos o produto ao carrinho
        this.carrinho.push(produto);
    }
}


module.exports = Bebidas;