const { Markup } = require('venom-bot');
const fs = require('fs');

// TODO ERROR AQUI

class Widgets {
  constructor() {
    this.menuPrincipal = [
      { button: { text: 'Ver Cardápio', hide: true }, type: 'message' },
      { button: { text: 'Fazer Pedido', hide: true }, type: 'message' },
      { button: { text: 'Ver Localização', hide: true }, type: 'message' }
    ];

    //MEnu
    this.menu = this.Menu
    this.menuCardapio = this.MenuCardapio

    // Venom-Menu
    this.categorias = ['Comida', 'Bebida', 'Sobremesa'];
    this.menuCategorias = this.categorias.map((categoria) => ({
      button: { text: categoria, hide: true },
      type: 'message'
    }));

    this.opcoesPagamento = ['Cartão', 'Dinheiro', 'Pix'];
    this.menuPagamento = this.opcoesPagamento.map((opcao) => ({
      button: { text: opcao, hide: true },
      type: 'message'
    }));

    this.menuConfirmacao = [
      { button: { text: 'Sim', hide: true }, type: 'message' },
      { button: { text: 'Não', hide: true }, type: 'message' }
    ];

    // Exemplo de estrutura para Menu e MenuCardapio
    this.menu = [
      { button: { text: 'Opção 1', hide: true }, type: 'message' },
      { button: { text: 'Opção 2', hide: true }, type: 'message' },
      { button: { text: 'Opção 3', hide: true }, type: 'message' }
    ];

    this.menuCardapio = [
      { button: { text: 'Item 1', hide: true }, type: 'message' },
      { button: { text: 'Item 2', hide: true }, type: 'message' },
      { button: { text: 'Item 3', hide: true }, type: 'message' }
    ];
  }
}

module.exports = Widgets;


