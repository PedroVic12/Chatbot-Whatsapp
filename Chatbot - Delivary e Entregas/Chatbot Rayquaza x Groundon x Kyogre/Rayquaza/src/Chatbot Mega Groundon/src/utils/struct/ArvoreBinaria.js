const fs = require('fs');

class Produto {
    constructor(nome, tipo_produto, ingredientes) {
      this.nome = nome;
      this.tipo_produto = tipo_produto;
      this.ingredientes = ingredientes;
      this.tamanhos = {};
      this.preco = 0;
    }
  
    adicionarTamanho(tamanho, valor) {
      this.tamanhos[tamanho] = valor;
    }
  
    formatado() {
      let produtoInfo = `Tipo de Produto: ${this.tipo_produto}\nNome: ${this.nome}\nIngredientes: ${this.ingredientes}\n`;

      for (const tamanho in this.tamanhos) {
        const valor = this.tamanhos[tamanho];
        produtoInfo += `${tamanho}: ${valor}\n`;
      }
  
      return produtoInfo;
    }
  }
  
  class DataBaseController {
    constructor() {
      this.sanduicheTradicionalFile = '/workspaces/Chatbot-Whatsapp/Chatbot - Delivary e Entregas/Chatbot Rayquaza x Groundon x Kyogre/Rayquaza/src/Chatbot Mega Groundon/repository/cardapio_1.json';
      this.acaiFile = '/workspaces/Chatbot-Whatsapp/Chatbot - Delivary e Entregas/Chatbot Rayquaza x Groundon x Kyogre/Rayquaza/src/Chatbot Mega Groundon/repository/cardapio_2.json';
      this.petiscosFile = '/workspaces/Chatbot-Whatsapp/Chatbot - Delivary e Entregas/Chatbot Rayquaza x Groundon x Kyogre/Rayquaza/src/Chatbot Mega Groundon/repository/cardapio_3.json'
    }
  
    //!Comidas
    get_SanduichesTradicionais(productFile, tipo_produto,callback) {
      try {
        //Busca o arquivo JSON e converte para objeto
        const data = fs.readFileSync(productFile, 'utf8');
        const listaProdutos = JSON.parse(data);
    

        //Cria um array de produtos
        const produtos = listaProdutos.map((produtoJson) => {

          //Desestrutura o objeto e cria um novo produto
          const { [tipo_produto]: nome, 'Igredientes': ingredientes, 'Preço.4': preco } = produtoJson;
          
          //Cria um novo produto
          const produto = new Produto(nome, tipo_produto, ingredientes);
          produto.preco = preco;
          return produto;
        });
    
        callback(produtos);
      } catch (error) {
        console.error('Erro ao ler o arquivo JSON:', error);
        return null;
      }
    }
  
    get_acai(productFile, tipo_produto, callback) {
      try {
        // Busca o arquivo JSON e converte para objeto
        const data = fs.readFileSync(productFile, 'utf8');
        const listaProdutos = JSON.parse(data);
    
        const produtos = listaProdutos.map((produtoJson) => {
          // Desestrutura o objeto e cria um novo produto
          const { [tipo_produto]: nome, '300ml': preco300ml, '500ml': preco500ml } = produtoJson;
    
          // Cria um novo produto
          const produto = new Produto(nome, tipo_produto);

          // Verifica se há tamanho e adiciona ao produto
          if (preco300ml) {
            produto.adicionarTamanho('300ml', preco300ml);
          }
          if (preco500ml) {
            produto.adicionarTamanho('500ml', preco500ml);
          }

          return produto;

        });
    
        callback(produtos);
      } catch (error) {
        console.error('Erro ao ler o arquivo JSON:', error);
        return null;
      }
    }
    

    get_petisco(productFile, tipo_produto, callback) {
      try {
        // Busca o arquivo JSON e converte para objeto
        const data = fs.readFileSync(productFile, 'utf8');
        const listaProdutos = JSON.parse(data);
    
        const produtos = listaProdutos.map((produtoJson) => {
          // Desestrutura o objeto e cria um novo produto
          const { [tipo_produto]: nome, 'Meia': preco_meia, 'Inteira': preco_inteira } = produtoJson;
    
          // Cria um novo produto
          const produto = new Produto(nome, tipo_produto);
    
          // Verifica se há tamanho e adiciona ao produto
          if (preco_meia) {
            produto.adicionarTamanho('Meia', preco_meia);
          }
          if (preco_inteira) {
            produto.adicionarTamanho('Inteira', preco_inteira);
          }
    
          return produto;
        });
    
        callback(produtos);
      } catch (error) {
        console.error('Erro ao ler o arquivo JSON:', error);
        return null;
      }
    }
    

    //!Bebidas

    //!Sobremesas

    //!Pizzas

    //!Hambugueres
      
  }
  
  class CardapioMenu {
    constructor() {
      this.arvoreComida = new BinaryTree();
      this.dataController = new DataBaseController();
    }
  
    criarArvore(tipo_produto, productFile) {
      return new Promise((resolve, reject) => {
        let getProdutos;
  
        if (tipo_produto === 'Sanduíches Tradicionais') {
          getProdutos = this.dataController.get_SanduichesTradicionais;
        } else if (tipo_produto === 'Açaí e Pitaya') {
          getProdutos = this.dataController.get_acai;
        } else if (tipo_produto === 'Petiscos') {
          getProdutos = this.dataController.get_petisco;
        }
  
        if (getProdutos) {
          getProdutos(productFile, tipo_produto, (produtos) => {
            produtos.forEach((produto) => {
              this.arvoreComida.addNode(produto);
            });
  
            resolve(produtos);
          });
        } else {
          reject(`Tipo de produto inválido: ${tipo_produto}`);
        }
      });
    }
  
    mostrarProdutoCardapio(product_object) {
      try {
        let cardapio_text = `🍔 *Cardápio de ${product_object.tipo_produto}* 🍔\n\n`;
  
        cardapio_text += `${product_object.nome}\n`;
        cardapio_text += `Tipo: ${product_object.tipo_produto}\n`;
        cardapio_text += `Ingredientes: ${product_object.ingredientes}\n\n`;
  
        for (const tamanho in product_object.tamanhos) {
          const valor = product_object.tamanhos[tamanho];
          cardapio_text += `*${tamanho}*: R$ ${valor.toFixed(2)}\n`;
        }
  
        cardapio_text += '\n📝 Para escolher este item, envie o número ou o nome\n';
        cardapio_text += '🚫 Para cancelar, envie *cancelar*.\n';
  
        return cardapio_text;
      } catch (error) {
        return null;
      }
    }
  
    buscarPorNome(tipo_produto, nome_produto) {
      let produtoEncontrado = null;
  
      switch (tipo_produto) {
        case 'Sanduíches Tradicionais':
          produtoEncontrado = this.arvoreComida.search(nome_produto);
          break;
        // Adicione os casos para os outros tipos de produtos
      }
  
      return produtoEncontrado;
    }
  }
  
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  addNode(value) {
    const newNode = new Node(value);

    if (this.root === null) {
      this.root = newNode;
    } else {
      this.addNodeRecursive(this.root, newNode);
    }
  }

  addNodeRecursive(node, newNode) {
    if (newNode.value.nome < node.value.nome) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.addNodeRecursive(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.addNodeRecursive(node.right, newNode);
      }
    }
  }

  searchNode(node, value) {
    if (node === null || node.value.nome === value) {
      return node;
    }

    if (value < node.value.nome) {
      return this.searchNode(node.left, value);
    }

    return this.searchNode(node.right, value);
  }

  search(value) {
    return this.searchNode(this.root, value);
  }
}

module.exports = BinaryTree;
module.exports = Node
module.exports = CardapioMenu;
module.exports = DataBaseController;
module.exports = Produto;

function main() {
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
  
//main();
