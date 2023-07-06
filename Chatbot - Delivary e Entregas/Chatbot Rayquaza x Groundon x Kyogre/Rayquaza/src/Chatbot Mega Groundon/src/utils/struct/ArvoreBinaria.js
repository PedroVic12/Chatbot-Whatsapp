const fs = require('fs');

class Produto {
    constructor(nome, preco, ingredientes, tipo_produto) {
      this.nome = nome;
      this.preco = preco;
      this.ingredientes = ingredientes;
      this.tipo_produto = tipo_produto;
    }

    toString() {
        return `Tipo de Produto: ${this.tipo_produto}\nNome: ${this.nome}\nPreço: ${this.preco}\nIngredientes: ${this.ingredientes}`;
      }
  }
  
  class DataBaseController {
    constructor() {
      this.sanduicheTradicionalFile = '/workspaces/Chatbot-Whatsapp/Chatbot - Delivary e Entregas/Chatbot Rayquaza x Groundon x Kyogre/Rayquaza/src/Chatbot Mega Groundon/repository/cardapio_1.json';
      this.acaiFile = '/workspaces/Chatbot-Whatsapp/Chatbot - Delivary e Entregas/Chatbot Rayquaza x Groundon x Kyogre/Rayquaza/src/Chatbot Mega Groundon/repository/cardapio_2.json';
      this.petiscosFile = '/workspaces/Chatbot-Whatsapp/Chatbot - Delivary e Entregas/Chatbot Rayquaza x Groundon x Kyogre/Rayquaza/src/Chatbot Mega Groundon/repository/cardapio_3.json'
    }
  
    get_SanduichesTradicionais(productFile, tipo_produto, callback) {
      fs.readFile(productFile, 'utf8', (err, data) => {
        if (err) {
          console.error('Erro ao ler o arquivo:', err);
          return;
        }
  
        const listaProdutos = JSON.parse(data);
        const produtos = listaProdutos.map((produtoJson) => {
          const { [tipo_produto]: nome, 'Igredientes': ingredientes, 'Preço.4': preco } = produtoJson;
          return new Produto(nome, preco, ingredientes, tipo_produto);
        });
  
        callback(produtos);
      });
    }
  
    get_acai(productFile, tipo_produto, callback) {
      fs.readFile(productFile, 'utf8', (err, data) => {
        if (err) {
          console.error('Erro ao ler o arquivo:', err);
          return;
        }
  
        const listaProdutos = JSON.parse(data);
        const produtos = listaProdutos.map((produtoJson) => {
          const { [tipo_produto]: nome, 'Igredientes': ingredientes, 'Preço.4': preco } = produtoJson;
          return new Produto(nome, preco, ingredientes, tipo_produto);
        });
  
        callback(produtos);
      });
    }
  }
  
  class CardapioMenu {
    constructor() {
      this.arvoreComida = new BinaryTree();
      this.dataController = new DataBaseController();
    }
  
    criarArvoreComida(tipo_produto, productFile) {
      this.dataController.get_SanduichesTradicionais(productFile, tipo_produto, (produtos) => {
        console.log(`Produtos do tipo ${tipo_produto}:`);
        console.log(produtos);
      });
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
// Exemplo de uso
const cardapio = new CardapioMenu();
const dataController = new DataBaseController();

cardapio.criarArvoreComida('Sanduíches Tradicionais', dataController.sanduicheTradicionalFile);
    cardapio.criarArvoreComida('Açaí e Pitaya', dataController.acaiFile);




}
  
main();
