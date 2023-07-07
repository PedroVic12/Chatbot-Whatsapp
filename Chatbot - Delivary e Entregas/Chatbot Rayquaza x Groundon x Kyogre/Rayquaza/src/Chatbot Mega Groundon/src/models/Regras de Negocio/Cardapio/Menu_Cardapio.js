const { BinaryTree, Node } = require('./ArvoreBinaria');
const DataBaseController = require('./DataBaseController');
const Produto = require('./Lanches/Produto');

class CardapioMenu {
  constructor() {
    this.arvoreComida = new BinaryTree();
    this.dataController = new DataBaseController();
  }

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

  mostrarProdutoCardapio(produto, index) {
    let cardapio_text = `${index + 1}. ${produto.nome} - R$ ${produto.preco} Reais\n`;
    cardapio_text += `Ingredientes: ${produto.ingredientes}\n\n`;
    return cardapio_text;
  }

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


