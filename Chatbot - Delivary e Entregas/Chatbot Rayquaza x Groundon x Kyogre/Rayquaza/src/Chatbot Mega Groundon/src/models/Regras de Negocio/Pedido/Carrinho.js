const Pedido = require("./Pedido");


class CarrinhoPedido {
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



class Carrinho extends Pedido {
    constructor() {
        super();

        this.pedido = null;
        this.carrinho_loja = {
            nomeProdutos: [],
            total: 0
        };
    }
    adicionarPedido(pedido) {
        this.pedido = pedido;
    }

    limparCarrinho() {
        this.pedido = null;
    }
    //Getters e Setters
    getNomesProdutosPedido() {
        return this.carrinho_loja.nomeProdutos;
    }

    getTotalPrecoPedido() {
        return this.carrinho_loja.total;
    }

    getQuantidadeProduto(produtoNome) {
        return this.carrinho_loja.quantidade[produtoNome] || 0;
    }

    //CRUD
    adicionarProdutos(produto) {
        this.carrinho_loja.nomeProdutos.push(produto);
    }

    removerProduto(produto) {
        const index = this.carrinho_loja.nomeProdutos.indexOf(produto);
        if (index !== -1) {
            this.carrinho_loja.nomeProdutos.splice(index, 1);
            this.calcularTotal();
        }
    }

    calcularTotal() {
        let total = 0;
        const quantidade = {};
        for (const produtoNome of this.carrinho_loja.nomeProdutos) {
            //const produto = this.produtos_cardapio.find((p) => p.nome === produtoNome);
            if (produto) {
                total += produto.preco;
                if (quantidade[produtoNome]) {
                    quantidade[produtoNome]++;
                } else {
                    quantidade[produtoNome] = 1;
                }
            }
        }
        this.carrinho_loja.total = total;
        this.carrinho_loja.quantidade = quantidade;
        return total;
    }



    verCarrinho() {
        let carrinho = "Carrinho:\n";
        for (const produto of this.carrinho_loja.nomeProdutos) {
            const quantidade = this.getQuantidadeProduto(produto);
            carrinho += `- ${produto} (Quantidade: ${quantidade})\n`;
        }
        carrinho += `Total: R$ ${this.carrinho_loja.total}`;
        return carrinho;
    }
}



module.exports = Carrinho;
module.exports = CarrinhoPedido;