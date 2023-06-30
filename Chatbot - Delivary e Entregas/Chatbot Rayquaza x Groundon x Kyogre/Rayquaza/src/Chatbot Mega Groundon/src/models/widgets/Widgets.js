const { Markup } = require('venom-bot');
const fs = require('fs');



class Widgets {
  constructor() {
    this.menuPrincipal = Markup.keyboard([
      ['Ver Cardápio', 'Fazer Pedido'],
      ['Ver Localização']
    ]).oneTime().resize();

    //Venom-Menu
    this.categorias = ['Comida', 'Bebida', 'Sobremesa'];
    this.menuCategorias = Markup.keyboard(this.categorias).oneTime().resize();

    this.opcoesPagamento = ['Cartão', 'Dinheiro', 'Pix'];
    this.menuPagamento = Markup.keyboard(this.opcoesPagamento).oneTime().resize();

    this.menuConfirmacao = Markup.keyboard([['Sim', 'Não']]).oneTime().resize();


    //MEnu
    this.menu = this.Menu
    this.menuCardapio = this.MenuCardapio
  }




}

module.exports = Widgets;
