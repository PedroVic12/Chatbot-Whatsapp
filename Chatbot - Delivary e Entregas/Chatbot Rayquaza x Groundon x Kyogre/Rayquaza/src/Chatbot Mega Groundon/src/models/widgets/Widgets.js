const fs = require('fs');

class Widgets {
  constructor() {
    // Menu Principal
    this.menuPrincipal = [
      { button: { text: '🍔 Ver Cardápio', hide: true }, type: 'message' },
      { button: { text: '🛒 Fazer Pedido', hide: true }, type: 'message' },
      { button: { text: '📍 Ver Localização', hide: true }, type: 'message' }
    ];

    // Menu de Categorias
    this.menuCategorias = [
      { button: { text: '🍕 Comida', hide: true }, type: 'message' },
      { button: { text: '🍹 Bebida', hide: true }, type: 'message' },
      { button: { text: '🍨 Sobremesa', hide: true }, type: 'message' }
    ];

    this.menuComidas = [
      { button: { text: '🍔 Sanduíches Tradicionais', hide: true }, type: 'message' },
      { button: { text: '🍔 Sanduíches Naturais', hide: true }, type: 'message' },
      { button: { text: '* Tapioca ', hide: true }, type: 'message' },
      { button: { text: '* Crepe ', hide: true }, type: 'message' },
      { button: { text: '* Omelete ', hide: true }, type: 'message' },
      { button: { text: '🍔 Hamburguers ', hide: true }, type: 'message' },
      { button: { text: '* Salgados ', hide: true }, type: 'message' },
      { button: { text: '* Pratos Tradicionais ', hide: true }, type: 'message' },
      { button: { text: '* Pratos a la carte', hide: true }, type: 'message' },
      { button: { text: '* Petiscos', hide: true }, type: 'message' },
      { button: { text: '* Pizzas', hide: true }, type: 'message' },

    ]
    // Menu de Opções de Pagamento
    this.menuPagamento = [
      { button: { text: '💳 Cartão', hide: true }, type: 'message' },
      { button: { text: '💵 Dinheiro', hide: true }, type: 'message' },
      { button: { text: '📱 Pix', hide: true }, type: 'message' }
    ];

    // Menu de Confirmação
    this.menuConfirmacao = [
      { button: { text: '✅ Sim', hide: true }, type: 'message' },
      { button: { text: '❌ Não', hide: true }, type: 'message' }
    ];

    // Exemplo de estrutura para outros menus
    this.menuExemplo = [
      { button: { text: '🌟 Opção 1', hide: true }, type: 'message' },
      { button: { text: '🔥 Opção 2', hide: true }, type: 'message' },
      { button: { text: '🎉 Opção 3', hide: true }, type: 'message' }
    ];
  }

  getMenuTextWithDescriptions(title, menu) {
    let menuText = `🔸 ${title} 🔸\n\n`;
    menu.forEach((item, index) => {
      menuText += `${index + 1}. ${item.button.text}\n`;
      menuText += `   Descrição: ${item.description}\n`; // Adicione a descrição do item
    });

    menuText += `\n📝 Digite o *Número* para escolher o item desejado.\n\n`;

    return menuText;
  }

  getMenuText(title, menu) {
    let menuText = `🔸 ${title} 🔸\n\n`;
    menu.forEach((item, index) => {
      menuText += `${index + 1}. ${item.button.text}\n`;

    });

    menuText += `\n📝 Digite o *Número* para escolher o item desejado.\n\n`;

    return menuText;
  }

  formatMenu(title, menu) {
    let formattedMenu = `🔸 ${title} 🔸\n\n`;
    menu.forEach((item, index) => {
      formattedMenu += `⚡️ ${index + 1}. ${item.button.text}\n`;
    });
    formattedMenu += '\n🚚 Opções de Delivery:\n1. Retirada no Local\n2. Entrega em Domicílio\n3. Delivery Expresso';
    return formattedMenu;
  }

  formatMenuWithTable(title, menu) {
    let formattedMenu = `${title}:\n\n`;
    formattedMenu += '| Opção | Descrição | Preço |\n|---|---|---|\n';
    menu.forEach((item, index) => {
      formattedMenu += `| ${index + 1} | ${item.button.text} | ${item.description} | ${item.price} |\n`;
    });
    return formattedMenu;
  }

  formatMenuWithFormatting(title, menu) {
    let formattedMenu = `🔸 ${title} 🔸\n\n`;
    menu.forEach((item, index) => {
      formattedMenu += `⭐️ ${index + 1}. *${item.button.text}*\n`; // Adicionamos negrito e um emoji de estrela
      formattedMenu += `   - Preço: ${item.price}\n`; // Adicionamos informações adicionais
    });

    return formattedMenu;
  }
}

module.exports = Widgets;

function main() {
  const widgets = new Widgets();

  // Exemplo de uso dos menus personalizados
  const menuPrincipal = widgets.menuPrincipal;

  console.log(menuPrincipal);

  // Exemplo de como enviar o menu principal como uma mensagem
  const menuPrincipalText = widgets.getMenuText('Menu Principal', menuPrincipal);
  console.log(menuPrincipalText);
}
//main();
