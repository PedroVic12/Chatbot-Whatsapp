const CardapioMenu = require('../Cardapio/Menu_Cardapio');
const DataBaseController = require('../Cardapio/DataBaseController');




//  TODO FIX BUG NESSA CLASSE E USAR OS DADOS DO DB CONTROLLER


class Pedido {
  constructor(nome, telefone) {
    this.produtos = [];
    this.Cardapio = new CardapioMenu();
    this.dataController = new DataBaseController();
    this.pedido_cliente = {
      nome: nome,
      telefone: telefone,
      pagamento: this.forma_pagamento,
      endereco: this.endereco_cliente,
    };
  }

  async getItensCardapio(tipo_produto, db_file) {
    try {
      const itens = await this.getProdutosDatabase(db_file, tipo_produto);
      return Array.isArray(itens) ? itens.flat() : [];
    } catch (error) {
      console.log('Não foi possível pegar o cardápio do produto buscado:', error);
      return [];
    }
  }

  async getProdutosDatabase(tipo_produto) {
    const db = new DataBaseController();

    switch (tipo_produto) {
      case 'Sanduíches Tradicionais':
        return await db.get_SanduichesTradicionais(db.sanduicheTradicionalFile, tipo_produto);
      case 'Açaí e Pitaya':
        return await db.get_acai(db.acaiFile, tipo_produto);
      case 'Petiscos':
        return await db.get_petisco(db.petiscosFile, tipo_produto);
      // Aqui você pode adicionar outros tipos de produto caso necessário
      default:
        return [];
    }
  }

  adicionarProduto(produto, tamanho) {
    const produtoEncontrado = this.buscarPorNome(produto, itensPedido)[0]; // <-- Correção aqui
    const preco = this.getPrecoItemPedido(produto.toLowerCase(), itensPedido); // <-- E aqui

    if (produtoEncontrado) {
      if (tamanho) {
        produtoEncontrado.tamanho = tamanho;
      }
      this.produtos.push({ produto: produtoEncontrado, tamanho: tamanho, preco: preco }); // <-- E aqui também
    } else {
      console.log('Produto não encontrado');
    }
  }


  getPrecoItemPedido(nome_produto, product_object) {
    let name_product = nome_produto.toLowerCase();

    const produtoEncontrado = product_object.find(
      (produto) => produto.nome.toLowerCase() === name_product
    );

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
    const produtosEncontrados = this.Cardapio.filter(
      (produto) => produto.tipo_produto === tipo_produto
    );
    return produtosEncontrados;
  }

  exibirCarrinho() {
    console.log('\n\nCarrinho:');
    this.produtos.forEach((item) => {
      console.log(`Produto: ${item.produto.nome}, Tamanho: ${item.tamanho}, Preço: R$ ${item.preco}`);
    });
  }
}

module.exports = Pedido;


async function main_pedido() {
  const pedido = new Pedido('Nome do Cliente', 'Telefone do Cliente');

  const sanduicheFile = '/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Delivary e Entregas/Chatbot Rayquaza x Groundon x Kyogre/Rayquaza/src/Chatbot Mega Groundon/repository/cardapio_1.json';

  const tipo_produto = 'Sanduíches Tradicionais';
  const itensPedido = await pedido.getItensCardapio(tipo_produto, sanduicheFile);

  function encontrarProduto() {
    const produtosEncontrados = pedido.buscarPorNome('Americano', itensPedido); // <-- Passando o array itensPedido

    if (produtosEncontrados.length > 0) {
      // Busca o nome do produto
      const nome_produto = produtosEncontrados[0].nome.toLowerCase();
      console.log('\n\n--------------------------------------------------');
      console.log(`Produto de nome: ${nome_produto} encontrado!`);
      console.log(produtosEncontrados);
      console.log('--------------------------------------------------');

      // Busca o preço do produto
      const preco = pedido.getPrecoItemPedido(nome_produto, produtosEncontrados);
      console.log(`Preço do ${nome_produto}: R$ ${preco}`);

      // Busca o tamanho do produto
      const tamanho = pedido.getTamanhoItemPedido(nome_produto, produtosEncontrados);
      console.log(`Tamanho do ${nome_produto}: ${tamanho}`);

      // Adiciona o produto ao carrinho
      pedido.adicionarProduto(nome_produto, tamanho);

      // Exibe o carrinho com os produtos adicionados
      pedido.exibirCarrinho();
    } else {
      console.log('Produto não encontrado');
    }
  }

  encontrarProduto();
}

main_pedido();