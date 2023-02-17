let c1 = new Carrinho(Chatbot)

let _cardapio = c1.todosItensCardapio()
c1.adicionarProdutoCarrinho("Guaraná")
c1.adicionarProdutoCarrinho('Pepsi')
c1.adicionarProdutoCarrinho('Fanta Uva')
console.log(c1.getMyCarrinho())


c1.addCarrinho("Guarana", 'Caipirinha de Fenix')
console.log(c1.getMarket())