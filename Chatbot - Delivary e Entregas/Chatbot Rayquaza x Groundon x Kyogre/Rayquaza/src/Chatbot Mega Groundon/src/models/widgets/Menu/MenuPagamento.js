const { Markup } = require('venom-bot');

class MenuWidget {
  constructor() {
    this.opcoesPagamento = ['Cartão', 'Dinheiro', 'Pix'];
    this.menuPagamento = Markup.keyboard(this.opcoesPagamento).oneTime().resize();
  }

  exibirMenuPagamento() {
    const mensagem = 'Escolha uma opção de pagamento:';
    enviarMensagemParaCliente(mensagem, this.menuPagamento);
  }
}

// Uso:
const menu = new MenuWidget();
menu.exibirMenuPagamento();
