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

      const produtoNoCarrinho = this.produtos.find((produto) => produto.nome.toLowerCase() === nome.toLowerCase());

      if (produtoNoCarrinho) {
        produtoNoCarrinho.quantidade += 1;
        console.log(`Produto já estava no carrinho. Quantidade atual: ${produtoNoCarrinho.quantidade}`);
      } else {
        this.produtos.push({
          nome: nome,
          preco: preco,
          quantidade: 1
        });

        console.log(`Produto adicionado ao carrinho: ${nome} - Preço: R$ ${preco}`);
      }
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
      console.log('teste')
      console.log(`${index + 1}. ${produto.nome}, Tipo: ${produto.tipo}, Tamanho: ${produto.tamanho || 'Sem tamanho'}, Preço: R$ ${produto.preco}, Quantidade: ${produto.quantidade}`);
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
  pedido.adicionarProduto('Sanduíches Tradicionais', 'Americano');



  // Exiba o carrinho com os produtos adicionados
  console.log(pedido.exibirCarrinho())

}

//main_pedido();