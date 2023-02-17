const Lanchonete = (function () {
    const PRODUTOS = [
        { nome: 'Hambúrguer', preco: 10.0 },
        { nome: 'Pizza', preco: 20.0 },
        { nome: 'Refrigerante', preco: 5.0 }
    ];

    function getProdutos() {
        return PRODUTOS;
    }

    function adicionarProdutoAoCarrinho(produto) {
        return function (carrinho) {
            return carrinho.concat([produto]);
        }
    }

    function removerProdutoDoCarrinho(produto) {
        return function (carrinho) {
            return carrinho.filter(p => p.nome !== produto.nome);
        }
    }

    function verCarrinho(carrinho) {
        return carrinho.map(p => `${p.nome} - R$ ${p.preco}`).join('\n');
    }

    function calcularTotal(carrinho) {
        return carrinho.reduce((total, p) => total + p.preco, 0);
    }

    return {
        getProdutos,
        adicionarProdutoAoCarrinho,
        removerProdutoDoCarrinho,
        verCarrinho,
        calcularTotal
    };
})();

// Exemplo de uso:

const carrinho = [];

const produtos = Lanchonete.getProdutos();
console.log('Produtos disponíveis:', produtos);

const carrinhoAtualizado = Lanchonete.adicionarProdutoAoCarrinho(produtos[0])(carrinho);
console.log('Carrinho atualizado:', carrinhoAtualizado);

const carrinhoFinal = Lanchonete.removerProdutoDoCarrinho(produtos[0])(carrinhoAtualizado);
console.log('Carrinho final:', carrinhoFinal);

console.log('Conteúdo do carrinho:');
console.log(Lanchonete.verCarrinho(carrinhoFinal));

console.log(`Total: R$ ${Lanchonete.calcularTotal(carrinhoFinal)}`);
