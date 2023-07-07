const produtos_cardapio = require("../../../../repository/cardapio_1.json"); // Importe o arquivo JSON do cardápio
const CardapioMenu = require('../Cardapio/Menu_Cardapio');
const DataBaseController = require('../Cardapio/DataBaseController');

class Pedido {
  constructor() {
    this.produtos = [];
    this.produtos_cardapio = new CardapioMenu();
    this.dataController = new DataBaseController();
    this.pedido_cliente = {
      nome: this.getNome(),
      telefone: this.getPhoneNumber(),
      pagamento: this.forma_pagamento,
      endereco: this.endereco_cliente
    };
  }

  // Busca os itens do cardápio em json
  async getItensCardapio(tipo_produto, db_file) {
    const itens = await this.produtos_cardapio.criarArvore(tipo_produto, db_file);
    return Array.isArray(itens) ? itens.flat() : [];
  }

  // Getters e Setters
  getNome() {
    return this.nome;
  }

  getPhoneNumber() {
    return this.telefone;
  }

  setFormaPagamento(forma_pagamento) {
    this.forma_pagamento = forma_pagamento;
  }

  adicionarProduto(produto) {
    this.produtos.push(produto);
  }


  // Métodos de Busca, Remoção e Atualização
  buscarPorNome(nome_produto, itensPedido) {
    if (!nome_produto) {
      return [];
    }
  
    const produtosEncontrados = itensPedido.filter((produto) =>
      produto.nome.toLowerCase() === nome_produto.toLowerCase()
    );
  
    return produtosEncontrados;
  }
  

  buscarPorTipo(tipo_produto) {
    const produtosEncontrados = produtos_cardapio.filter(
      (produto) => produto.tipo_produto === tipo_produto
    );
    return produtosEncontrados;
  }
  

  getPrecoItemPedido(nome_produto, product_object) {
    let name_product = nome_produto.toLowerCase();
  
    const produtoEncontrado = product_object.find(
      (produto) => produto.nome.toLowerCase() === name_product
    );
  
    //console.log('\n\n\nProduto encontrado:', produtoEncontrado);
  
    if (produtoEncontrado) {
      return produtoEncontrado.preco;
    } else {
      return null;
    }
  }


  getTamanhoItemPedido(nome_produto, product_object) {
    let name_product = nome_produto.toLowerCase();
  
    const produtoEncontrado = product_object.find(
      (produto) => produto.nome.toLowerCase() === name_product
    );
    
    if (produtoEncontrado) {
      const tamanhos = Object.keys(produtoEncontrado.tamanhos);
      return tamanhos;
    } else {
      return null;
    }
  }
  
  
  
}


module.exports = Pedido;

async function main_pedido() {
  const pedido = new Pedido();
  const itensPedido = await pedido.getItensCardapio('Açaí e Pitaya', pedido.dataController.acaiFile);

  function encontrarProduto() {
    const produtosEncontrados = pedido.buscarPorNome('Açai Tradicional', itensPedido);
  
    if (produtosEncontrados.length > 0) {

      // Busca o nome do produto
      const nome_produto = produtosEncontrados[0].nome.toLowerCase(); // Definir nome_produto dentro do escopo
      console.log('\n\n--------------------------------------------------')
      console.log(`Produto de nome: ${nome_produto} encontrado!`);
      console.log(produtosEncontrados)
      console.log('--------------------------------------------------');
  
      // Busca o preço do produto
      const preco = pedido.getPrecoItemPedido(nome_produto, produtosEncontrados); 
      console.log(`Preço do ${nome_produto}: R$ ${preco}`);

      // Busca o tamanho do produto
      const tamanho = pedido.getTamanhoItemPedido(nome_produto, produtosEncontrados); 
      console.log(`Tamanho do ${nome_produto}: ${tamanho}`);

    } else {
      console.log('Produto não encontrado');
    }
  }
  

  encontrarProduto();
}

//main_pedido();
