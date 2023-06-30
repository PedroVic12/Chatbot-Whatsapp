const fs = require('fs');


 

// TODO -> Testar em diveretes produtos pela KEYWORDS

class ProdutoCardapio {
    constructor(nome, preco, ingredientes = '') {
        this.nome = nome;
        this.preco = preco;
        this.ingredientes = ingredientes;
    }

    // Getters e Setters
    getNome() {
        return this.nome;
    }

    getPreco() {
        return this.preco;
    }

    getIngredientes() {
        return this.ingredientes;
    }

    // Manipulando dados do DataBase do cardapio
    static lerArquivoJSON(caminhoArquivo) {

        //TODO colocar os parametros aqui
        const KEYWORDS = ['Sanduíches Tradicionais'];

        try {
            const conteudoArquivo = fs.readFileSync(caminhoArquivo, 'utf8');
            const jsonData = JSON.parse(conteudoArquivo);
            const produtos = [];

            for (let item of jsonData) {
                const produto = item['Sanduíches Tradicionais'];
                const preco = item['Preço.4'];
                const ingredientes_produto = item['Igredientes'];
                produtos.push(new ProdutoCardapio(produto, preco, ingredientes_produto));
            }

            return produtos;
        } catch (error) {
            console.error('Erro ao ler o arquivo JSON:', error);
            return [];
        }
    }
}


module.exports = ProdutoCardapio;


