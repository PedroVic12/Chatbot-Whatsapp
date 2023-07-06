const { BinaryTree, Node } = require('./ArvoreBinaria');
const DataBaseController = require('./DataBaseController');
const Produto = require('./Produto');

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

  mostrarProdutoCardapio(product_object) {
    try {
      let cardapio_text = `🍔 *Cardápio de ${product_object.tipo_produto}* 🍔\n\n`;

      cardapio_text += `${product_object.nome}\n`;
      cardapio_text += `Tipo: ${product_object.tipo_produto}\n`;
      cardapio_text += `Ingredientes: ${product_object.ingredientes}\n\n`;

      for (const tamanho in product_object.tamanhos) {
        const valor = product_object.tamanhos[tamanho];
        cardapio_text += `*${tamanho}*: R$ ${valor.toFixed(2)}\n`;
      }

      cardapio_text += '\n📝 Para escolher este item, envie o número ou o nome\n';
      cardapio_text += '🚫 Para cancelar, envie *cancelar*.\n';

      return cardapio_text;
    } catch (error) {
      return null;
    }
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


