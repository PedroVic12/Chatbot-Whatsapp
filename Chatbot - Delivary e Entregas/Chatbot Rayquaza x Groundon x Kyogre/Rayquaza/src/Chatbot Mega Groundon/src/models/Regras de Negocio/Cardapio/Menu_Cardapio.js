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
      case 2:
        return 'Sanduíches Tradicionais';
      // Adicione outros casos para cada tipo de produto
  
      default:
        return null;
    }
  }
  
  getArquivoProduto(tipo_produto) {
    switch (tipo_produto) {
      case 'Sanduíches Tradicionais':
        return this.dataController.sanduicheTradicionalFile;
      // Adicione outros casos para cada arquivo correspondente a cada tipo de produto
  
      default:
        return null;
    }
  }

  // Algortimo para criar a árvore de produtos
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


function main_cardapio(){

  const cardapio = new CardapioMenu();

  cardapio
    .criarArvore('Sanduíches Tradicionais', cardapio.dataController.sanduicheTradicionalFile)
    .then((sanduiche_menu) => {
      let cardapio_text = `🍔 *Cardápio de Sanduíches Tradicionais* 🍔\n\n`;
      sanduiche_menu.forEach((produto, index) => {
        cardapio_text += cardapio.mostrarProdutoCardapio(produto, index);
      });
      cardapio_text += `📝 Para escolher seu item, envie o número ou o nome\n`;
      cardapio_text += '🚫 Para cancelar, envie *cancelar*.\n';
      console.log('\nDebug:', cardapio_text);

    })
    .catch((error) => {
      console.log(error);
    });


}

main_cardapio();