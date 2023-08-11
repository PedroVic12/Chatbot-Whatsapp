const fs = require('fs');

class Widgets {
  constructor() {


    //! WIDGETS 
    // Menu Principal
    this.menuPrincipal = [
      { button: { text: '📍 Ver nossa Localização', hide: true }, type: 'message' },
      { button: { text: '🛒 Fazer Pedido', hide: true }, type: 'message' },
      { button: { text: '🤖  Reiniciar Atendimento', hide: true }, type: 'message' },
      { button: { text: '👨‍🍳 Falar com um atendente', hide: true }, type: 'message' },
      { button: { text: '❌ Sair', hide: true }, type: 'message' }


    ];

    // Menu de Categorias
    this.menuCategorias = [
      { button: { text: '🍕 Comida', hide: true }, type: 'message' },
      { button: { text: '🍹 Bebida', hide: true }, type: 'message' },
      { button: { text: '🍨 Sobremesa', hide: true }, type: 'message' }
    ];

    this.menuLanchesSalgados = [
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
      { button: { text: '* Pizzas', hide: true }, type: 'message' }
    ];


    this.menuBebidas = [
      { button: { text: '🍹 Sucos Naturais', hide: true }, type: 'message' },
      { button: { text: '🍹 Refrigerante', hide: true }, type: 'message' },
      { button: { text: '🍹 Cervejas', hide: true }, type: 'message' },

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

  // Método que pega a escolha do cliente dentro do menu
  getSelectedOption(menu, input) {
    const selectedOptionByNumber = menu[Number(input) - 1];
    if (selectedOptionByNumber) {
      return selectedOptionByNumber;
    }

    const selectedOptionByText = menu.find(item =>
      item.button.text.toLowerCase().includes(input.toLowerCase())
    );
    if (selectedOptionByText) {
      return selectedOptionByText;
    }

    return null;
  }





  // Menus com textos descritivos
  getMenuProdutos(title, produtos) {
    let menuText = `🔸 ${title} 🔸\n\n`;
    produtos.forEach((produto, index) => {
      menuText += `${index + 1}. *${produto.nome}* - R$ *${produto.preco}* Reais\n`;
      menuText += `   Ingredientes: ${produto.ingredientes}\n\n`;
    });

    menuText += `\n📝 Digite o *Número* para escolher o item desejado.\n`;
    return menuText;
  }
  getMenuTextWithDescriptions(title, menu) {
    let menuText = `🔸 ${title} 🔸\n\n`;
    menu.forEach((item, index) => {
      menuText += `${index + 1}. ${item.button.text}\n`;
      menuText += `   Descrição: ${item.description}\n`;
    });

    menuText += `\n📝 Digite o *Número* para escolher o item desejado.\n\n`;

    return menuText;
  }

  getMenuText(title, menu) {
    let menuText = `⚡️  ${title} ⚡️ \n\n`;
    menu.forEach((item, index) => {
      menuText += `${index + 1}) ${item.button.text}\n`;
    });

    menuText += `\n📝 Digite o *Número* ou *Escreva a opção*  para escolher o item desejado.\n\n`;

    return menuText;
  }


  //Tentativa de menus formatados

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
      formattedMenu += `⭐️ ${index + 1}. *${item.button.text}*\n`;
      formattedMenu += `   - Preço: ${item.price}\n`;
    });

    return formattedMenu;
  }
}

module.exports = Widgets;

function main_widgets() {
  const widgets = new Widgets();

  //! Menu principal
  const menuPrincipal = widgets.menuPrincipal;
  const menuPrincipalText = widgets.getMenuText('Menu Principal', menuPrincipal);
  console.log(menuPrincipalText);


  //! Menu de categorias
  const menuCategorias = widgets.menuCategorias;
  const categoriasText = widgets.getMenuText('Categorias de Lanches', menuCategorias);
  console.log(categoriasText);

  //! Exemplo de uso da função getSelectedOption
  const userInput = '2'; // Opção selecionada pelo usuário (número ou texto)

  const selectedOption = widgets.getSelectedOption(menuCategorias, userInput);
  if (selectedOption) {
    console.log('Opção selecionada:', selectedOption.button.text.slice(3));
    // Faça o que for necessário para a opção selecionada
  } else {
    console.log('Opção inválida');
    // Trate a opção inválida conforme necessário
  }
}

//main_widgets();