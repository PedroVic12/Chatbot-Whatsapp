const { BinaryTree, Node } = require('./ArvoreBinaria');
const DataBaseController = require('./DataBaseController');
const Produto = require('./Lanches/Produto');

class CardapioMenu {
  constructor() {
    this.arvoreComida = new BinaryTree();
    this.dataController = new DataBaseController();
  }

  // Getters
  getTipoProduto(currentStage) {
    switch (currentStage) {
      case 1:
        return 'Sanduíches Tradicionais';

      case 2:
        return 'Açaí e Pitaya';

      case 3:
        return 'Petiscos';

      default:
        return null;
    }
  }

  getArquivoProduto(tipo_produto) {
    switch (tipo_produto) {
      case 'Sanduíches Tradicionais':
        return this.dataController.sanduicheTradicionalFile;
      // Adicione outros casos para cada arquivo correspondente a cada tipo de produto

      case 'Açaí e Pitaya':
        return this.dataController.acaiFile;
        
      case 'Petiscos':
        return this.dataController.petiscoFile;

      default:
        return null;
    }
  }

  // Função para obter o tipo de produto e arquivo correspondente
  getTipoEArquivoProduto(currentStage) {
    const tipo_produto = this.getTipoProduto(currentStage);
    const arquivo_produto = this.getArquivoProduto(tipo_produto);
    return { tipo_produto, arquivo_produto };
  }

  // Algoritmo para criar a árvore de produtos
  criarArvore(tipo_produto, productFile) {
    return new Promise((resolve, reject) => {
      let getProdutos;

      if (tipo_produto === 'Sanduíches Tradicionais') {
        getProdutos = this.dataController.get_SanduichesTradicionais;
      } else if (tipo_produto === 'Açaí e Pitaya') {
        getProdutos = this.dataController.get_acai;
      } else if (tipo_produto === 'Petiscos') {
        getProdutos = this.dataController.get_petisco;
      }

      if (getProdutos) {
        getProdutos(productFile, tipo_produto, (produtos) => {
          produtos.forEach((produto) => {
            this.arvoreComida.addNode(produto);
          });

          resolve(produtos);
        });
      } else {
        reject(`Tipo de produto inválido: ${tipo_produto}`);
      }
    });
  }

  // Mostra o produto no cardápio
  mostrarProdutoCardapio(produto, index) {
    let cardapio_text = `${index + 1}. ${produto.nome} - R$ ${produto.preco} Reais\n`;
    cardapio_text += `Ingredientes: ${produto.ingredientes}\n\n`;
    return cardapio_text;
  }

  // Busca, inserção e remoção de produtos
  buscarPorNome(tipo_produto, nome_produto) {
    let produtoEncontrado = null;

    switch (tipo_produto) {
      case 'Sanduíches Tradicionais':
        produtoEncontrado = this.arvoreComida.search(nome_produto);
        break;
      // Adicione os casos para os outros tipos de produtos
    }

    return produtoEncontrado;
  }
}

module.exports = CardapioMenu;


function main_cardapio() {
  const cardapio = new CardapioMenu();
  const { tipo_produto, arquivo_produto } = cardapio.getTipoEArquivoProduto(2);

  
  let produtoEscolhido = cardapio.criarArvore(tipo_produto, arquivo_produto)
  .then((produtoEscolhido) => {
    console.log(produtoEscolhido);
  })
}

//main_cardapio();
