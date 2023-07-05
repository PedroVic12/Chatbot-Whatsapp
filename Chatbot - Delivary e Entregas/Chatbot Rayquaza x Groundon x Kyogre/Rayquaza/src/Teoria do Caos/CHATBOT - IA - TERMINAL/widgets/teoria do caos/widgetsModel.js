
class Widgets {
  constructor() {

  menuCategorias = [
    {
      button: { text: '1. Sanduíches' },
      data: { categoria: 'sanduiches' }
    },
    {
      button: { text: '2. Bebidas' },
      data: { categoria: 'bebidas' }
    },
    // Adicione outras opções de categorias conforme necessário
  ];
	
	
	}

  getMenuText(title, menu) {
    let menuText = `-- ${title} --\n`;
    menu.forEach((item, index) => {
      menuText += `${index + 1}. ${item.button.text}\n`;
    });
    return menuText;
  }
}

class MenuCategorias {
  constructor() {
    this.categorias = [];
  }

  adicionarCategoria(categoria) {
    this.categorias.push(categoria);
  }

  obterCategorias() {
    return this.categorias;
  }
}

class MenuCardapio {
  constructor() {
    this.produtos = [];
  }

  adicionarProduto(produto) {
    this.produtos.push(produto);
  }

  exibirMenu() {
    let menuString = 'Menu:\n';
    this.produtos.forEach((produto, index) => {
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

module.exports = {
  Widgets,
  MenuCategorias,
  MenuCardapio,
};

