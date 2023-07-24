const DataBaseController = require('../Cardapio/DataBaseController');
const Cliente = require('../Cliente/Cliente')

class Pedido {
  constructor(cliente) {
    this.cliente = cliente;
    this.produtos = [];
    this.dataController = new DataBaseController();
  }


  async adicionarProduto(tipo_produto, nome_produto, tamanho = null) {
    const produtos = await this.getProdutosDatabase(tipo_produto);
    const produtoEncontrado = this.encontrarProdutoPorNome(produtos, nome_produto);

    if (produtoEncontrado) {
      const { nome, preco } = produtoEncontrado;

      this.produtos.push({
        nome: nome,
        preco: preco
      });

      console.log(`Produto adicionado ao carrinho: ${nome} - Preço: R$ ${preco}`);
    } else {
      console.log('Produto não encontrado no cardápio!');
    }
  }

  encontrarProdutoPorNome(produtos, nome_produto) {
    let produtoEncontrado = null;

    produtos.forEach((produto) => {
      if (produto.nome.toLowerCase() === nome_produto.toLowerCase()) {
        produtoEncontrado = {
          nome: produto.nome,
          preco: produto.preco
        };
      }
    });

    return produtoEncontrado;
  }

  async getProdutosDatabase(tipo_produto) {
    return new Promise((resolve, reject) => {
      switch (tipo_produto) {
        case 'Sanduíches Tradicionais':
          this.dataController.get_SanduichesTradicionais(this.dataController.sanduicheTradicionalFile, 'Sanduíches Tradicionais', (produtos) => {
            resolve(produtos);
          });
          break;
        case 'Açaí e Pitaya':
          this.dataController.get_acai(this.dataController.acaiFile, 'Açaí e Pitaya', (produtos) => {
            resolve(produtos);
          });
          break;
        case 'Petiscos':
          this.dataController.get_petisco(this.dataController.petiscosFile, 'Petiscos', (produtos) => {
            resolve(produtos);
          });
          break;
        // Adicione outros casos para os tipos de produtos desejados
        default:
          resolve([]);
      }
    });
  }


  exibirCarrinho() {
    console.log('\nCarrinho:');
    this.produtos.forEach((produto, index) => {
      console.log(`${index + 1}. ${produto.nome}, Tipo: ${produto.tipo}, Tamanho: ${produto.tamanho || 'Sem tamanho'}, Preço: R$ ${produto.preco}`);
    });
  }
}

module.exports = Pedido;


async function main_pedido() {
  const cliente = new Cliente();
  const pedido = new Pedido(cliente);

  // listando produtos
  const produtos = await pedido.getProdutosDatabase('Sanduíches Tradicionais');
  console.log(produtos);

  // Encontrando o produto pelo nome
  const produtoEncontrado = pedido.encontrarProdutoPorNome(produtos, 'Americano');
  console.log('Produto encontrado!', produtoEncontrado);

  // Adicione os produtos que o cliente deseja ao carrinho
  pedido.adicionarProduto('Sanduíches Tradicionais', 'Americano');
  pedido.adicionarProduto('Sanduíches Tradicionais', 'Queijo Quente');


  // Exiba o carrinho com os produtos adicionados
  pedido.exibirCarrinho();
}

main_pedido();