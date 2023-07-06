const CardapioMenu = require('./Menu_Cardapio');
const DataBaseController = require('./DataBaseController');



function main_struct() {
  
    const cardapio = new CardapioMenu(); 
    const dataController = new DataBaseController();
    
    // Cria a árvore de produtos
    cardapio.criarArvore('Sanduíches Tradicionais', dataController.sanduicheTradicionalFile)
    .then((sanduiche_menu) => {
      let sanduiche_text = cardapio.mostrarProdutoCardapio(sanduiche_menu[0]);
      console.log('\nDebug:', sanduiche_text);
    })
    .catch((error) => {
      console.log(error);
    });
    
    cardapio.criarArvore('Açaí e Pitaya', dataController.acaiFile);
    cardapio.criarArvore('Petiscos', dataController.petiscosFile);
    
    // Buscar um produto pelo tipo e nome
    const produtoEncontrado = cardapio.buscarPorNome('Sanduíches Tradicionais', 'Americano');
    if (produtoEncontrado) {
     console.log('\n\nProduto encontrado!\n\n', produtoEncontrado);
    } else {
     console.log('Produto não encontrado');
    }
    
    
}
main_struct();