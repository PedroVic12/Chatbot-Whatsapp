class CardapioMenu extends Menu {
  constructor() {
    super();
    this.cardapioFile = 'repository/cardapio_1.json'; 
  }

  mostrarComidasLista() {
    try {
      const data = fs.readFileSync(this.cardapioFile, 'utf8');
      const listaComidas = JSON.parse(data);

      let cardapioText = '🍔 *Cardápio* 🍔\n\n';

      listaComidas.forEach((comida, index) => {
        cardapioText += `*${index + 1}. ${comida['Sanduíches Tradicionais']}* - R$ ${comida['Preço.4'].toFixed(2)}\n`;
        cardapioText += `Ingredientes: ${comida['Ingredientes']}\n`;
        cardapioText += `📝 Para escolher este item, envie o número ${index + 1}.\n\n`;
      });

      cardapioText += '🚫 Para cancelar, envie *cancelar*.\n';
      return cardapioText;
    } catch (error) {
      console.error('Erro ao ler o arquivo JSON:', error);
      return null;
    }
  }

  mostrarBebidasLista() {
    // Aqui você pode adicionar a lógica para mostrar a lista de bebidas
    // Retorne uma string formatada com as informações das bebidas
    return 'Lista de Bebidas';
  }
}


