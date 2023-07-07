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

  async getItensCardapio(tipo_produto, db_file) {
    const itens = await this.produtos_cardapio.criarArvore(tipo_produto, db_file);
    return Array.isArray(itens) ? itens.flat() : [];
  }

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

  buscarPorNome(nome_produto, itensPedido) {
    if (!nome_produto) {
      return [];
    }

    const produtosEncontrados = itensPedido.filter((produto) =>
      produto.nome.toLowerCase().includes(nome_produto.toLowerCase())
    );

    return produtosEncontrados;
  }

  buscarPorTipo(tipo_produto) {
    const produtosEncontrados = produtos_cardapio.filter(
      (produto) => produto.tipo_produto === tipo_produto
    );
    return produtosEncontrados;
  }

  getPrecoItemPedido(nome_produto) {

    console.log('Nome do produto:', nome_produto.toLowerCase());

    
    const produtoEncontrado = produtos_cardapio.find(
      (produto) => produto.nome.toLowerCase() === nome_produto.toLowerCase()
    );

    if (produtoEncontrado) {
      return produtoEncontrado.preco;
    } else {
      return null;
    }
  }
}

async function main_pedido() {
  const pedido = new Pedido();
  const itensPedido = await pedido.getItensCardapio('Sanduíches Tradicionais', pedido.dataController.sanduicheTradicionalFile);

  function encontrarProduto() {
    const produtosEncontrados = pedido.buscarPorNome('Bauru', itensPedido);

    if (produtosEncontrados.length > 0) {
      let nome_produto = produtosEncontrados[0].nome.toLowerCase();
      console.log('\n\n--------------------------------------------------')
      console.log(`Item de nome: ${nome_produto} encontrado!`);
      console.log('Produtos encontrados:', produtosEncontrados);
      console.log('--------------------------------------------------');

      const preco = pedido.getPrecoItemPedido('Bauru');
      if (preco !== null) {
        console.log(`Preço do ${nome_produto}: R$ ${preco}`);
      } else {
        console.log(`Preço do ${nome_produto} não encontrado`);
      }
    } else {
      console.log('Produto não encontrado');
    }
  }

  encontrarProduto();
}

main_pedido();
