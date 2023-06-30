const { Markup } = require('venom-bot');
const Widgets = require('../Widgets');

// Classe Menu
class Menu extends Widgets{
  constructor() {
    super()
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


class CardapioMenu extends Menu{
  constructor() {
    super()
    this.cardapioFile = '/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Delivary e Entregas/Chatbot Rayquaza x Groundon x Kyogre/Rayquaza/src/Chatbot Mega Groundon/repository/cardapio_1.json';
  }

  mostrarComidasLista() {
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



module.exports = Menu;
module.exports = CardapioMenu;

