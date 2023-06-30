const { Markup } = require('venom-bot');

class MenuWidget {
  constructor() {
    this.categorias = ['Comida', 'Bebida', 'Sobremesa'];
    this.menuCategorias = Markup.keyboard(this.categorias).oneTime().resize();
  }

  exibirMenuCategorias() {
    const mensagem = 'Escolha uma categoria:';
    enviarMensagemParaCliente(mensagem, this.menuCategorias);
  }
}

// Uso:
const menu = new MenuWidget();
menu.exibirMenuCategorias();
