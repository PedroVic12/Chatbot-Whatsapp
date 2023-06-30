const { Markup } = require('venom-bot');

class MenuWidget {
  constructor() {
    this.menuConfirmacao = Markup.keyboard([['Sim', 'Não']]).oneTime().resize();
  }

  exibirMenuConfirmacao() {
    const mensagem = 'Deseja confirmar essa ação?';
    enviarMensagemParaCliente(mensagem, this.menuConfirmacao);
  }
}

// Uso:
const menu = new MenuWidget();
menu.exibirMenuConfirmacao();
