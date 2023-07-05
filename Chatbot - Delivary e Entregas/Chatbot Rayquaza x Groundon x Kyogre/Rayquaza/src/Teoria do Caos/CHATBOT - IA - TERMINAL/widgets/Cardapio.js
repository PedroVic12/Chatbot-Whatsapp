const fs = require('fs');
const Widgets = require('./Widgets');

class Menu extends Widgets {
	constructor() {
		super();
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

class CardapioMenu extends Menu {
	constructor() {
		super();
		this.cardapioFile = 'repository/cardapio_1.json'; 
	}

	mostrarComidasLista() {
		try {
			const data = fs.readFileSync(this.cardapioFile, 'utf8');
			const listaComidas = JSON.parse(data);

			let cardapio_text = '🍔 *Cardápio* 🍔\n\n';

			listaComidas.forEach((comida, index) => {
				cardapio_text += `*${index + 1}. ${comida['Sanduíches Tradicionais']}* - R$ ${comida['Preço.4'].toFixed(2)}\n`;
				cardapio_text += `Ingredientes: ${comida['Igredientes']}\n`;
				cardapio_text += `📝 Para escolher este item, envie o número ${index + 1}.\n\n`;
			});

			cardapio_text += '🚫 Para cancelar, envie *cancelar*.\n';
			return cardapio_text;
		} catch (error) {
			console.error('Erro ao ler o arquivo JSON:', error);
			return null;
		}
	}
}

module.exports = {
	Menu,
	CardapioMenu
};

function main_cardapio() {
	const cardapio = new CardapioMenu();
	console.log(cardapio.mostrarComidasLista());
}

//main_cardapio();
