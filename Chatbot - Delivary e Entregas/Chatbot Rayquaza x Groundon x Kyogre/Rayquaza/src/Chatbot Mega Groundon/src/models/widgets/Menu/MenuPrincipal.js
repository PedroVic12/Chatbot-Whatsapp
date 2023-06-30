const { Markup } = require('venom-bot');

class MenuPrincipal {
  constructor() {
    this.menuPrincipal = Markup.keyboard([
      ['Ver Cardápio', 'Fazer Pedido'],
      ['Ver Localização']
    ]).oneTime().resize();
  }

  exibirMenuPrincipal() {
    const mensagem = 'Olá! O que você gostaria de fazer?';
    enviarMensagemParaCliente(mensagem, this.menuPrincipal);
  }
}

// Uso:
const menu = new MenuPrincipal();
menu.exibirMenuPrincipal();
