const { Markup } = require('venom-bot');
const fs = require('fs');

class CardapioMenu {
  constructor() {
    this.cardapioFile = '/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Delivary e Entregas/Chatbot Rayquaza x Groundon x Kyogre/Rayquaza/src/Chatbot Mega Groundon/repository/cardapio_1.json';
  }

  mostrarComidasLista(message) {
    fs.readFile(this.cardapioFile, 'utf8', (err, data) => {
      if (err) {
        console.error('Erro ao ler o arquivo JSON:', err);
        return;
      }

      try {
        const listaComidas = JSON.parse(data);

        let cardapio_text = '🍔 *Cardápio* 🍔\n\n';

        listaComidas.forEach((comida, index) => {
          cardapio_text += `*${index + 1}. ${comida['Sanduíches Tradicionais']}* - R$ ${comida['Preço.4'].toFixed(2)}\n`;
          cardapio_text += `Ingredientes: ${comida['Igredientes']}\n`;
          cardapio_text += `📝 Para escolher este item, envie o número ${index + 1}.\n\n`;
        });

        cardapio_text += '🚫 Para cancelar, envie *cancelar*.\n';

        //! CHANGE HERE this.enviarMensagem(message, cardapio_text);
      } catch (error) {
        console.error('Erro ao analisar o arquivo JSON:', error);
      }
    });
  }

 
}

module.exports = CardapioMenu;



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
