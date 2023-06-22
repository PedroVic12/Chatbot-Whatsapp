const fs = require('fs');

class Produto {
    constructor(nome, preco) {
        this.nome = nome;
        this.preco = preco;
    }

    getNome() {
        return this.nome;
    }

    getPreco() {
        return this.preco;
    }

    static lerArquivoJSON(caminhoArquivo) {
        try {
            const conteudoArquivo = fs.readFileSync(caminhoArquivo, 'utf8');
            const jsonData = JSON.parse(conteudoArquivo);
            const produtos = [];

            for (let item of jsonData) {
                const nome = item.Omelete;
                const preco = item['Preço.2'];
                produtos.push(new Produto(nome, preco));
            }

            return produtos;
        } catch (error) {
            console.error('Erro ao ler o arquivo JSON:', error);
            return [];
        }
    }
}



module.exports = Produto;



// Caminho do arquivo JSON local
const caminhoArquivoJSON = '/caminho/do/arquivo.json';

// Chamada do método para ler o arquivo JSON e criar objetos Produto
const produtos = Produto.lerArquivoJSON(caminhoArquivoJSON);

console.log(produtos);
