const { Markup } = require('venom-bot');

// Classe Menu
class Menu {
  constructor() {
    this.produtos = [];
  }

  adicionarProduto(produto) {
    this.produtos.push(produto);
  }

  exibirMenu() {
    let menuString = 'Menu:\n';
    this.produtos.forEach((produto, index) => {
      // Adicionando formatação básica ao texto
      menuString += `*${index + 1}. ${produto.nome}* - R$ ${produto.preco}\n`;
    });
    return menuString;
  }

  obterProduto(index) {
    if (index >= 1 && index <= this.produtos.length) {
      return this.produtos[index - 1];
    }
    return null;
  }
}

const { Markup } = require('venom-bot');

class Widgets {
  constructor() {
    this.menuPrincipal = Markup.keyboard([
      ['Ver Cardápio', 'Fazer Pedido'],
      ['Ver Localização']
    ]).oneTime().resize();

    this.categorias = ['Comida', 'Bebida', 'Sobremesa'];
    this.menuCategorias = Markup.keyboard(this.categorias).oneTime().resize();

    this.opcoesPagamento = ['Cartão', 'Dinheiro', 'Pix'];
    this.menuPagamento = Markup.keyboard(this.opcoesPagamento).oneTime().resize();

    this.menuConfirmacao = Markup.keyboard([['Sim', 'Não']]).oneTime().resize();
  }
}

module.exports = Widgets;
