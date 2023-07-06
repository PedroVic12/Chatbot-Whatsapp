const fs = require('fs');

class Produto {
  constructor(tipo_produto) {
    this.tipo_produto = tipo_produto;
    this.produtos = [];
  }

  adicionarProduto(nome, preco, ingredientes) {
    this.produtos.push({
      nome: nome,
      preco: preco,
      ingredientes: ingredientes
    });
  }
}

class DataBaseController {
  constructor() {
    this.sanduicheTradicionalFile = '/workspaces/Chatbot-Whatsapp/Chatbot - Delivary e Entregas/Chatbot Rayquaza x Groundon x Kyogre/Rayquaza/src/Chatbot Mega Groundon/repository/cardapio_1.json';
    this.acaiFile = '/workspaces/Chatbot-Whatsapp/Chatbot - Delivary e Entregas/Chatbot Rayquaza x Groundon x Kyogre/Rayquaza/src/Chatbot Mega Groundon/repository/cardapio_2.json';
  }

  get_Sanduiches(productFile, tipo_produto, callback) {
    const produto = new Produto(tipo_produto);
    this.lerProdutosJSON(productFile, tipo_produto, (produtos) => {
      produtos.forEach((produtoJson) => {
        produto.adicionarProduto(produtoJson.nome, produtoJson.preco, produtoJson.ingredientes);
      });

      callback(produto);
    });
  }

  lerProdutosJSON(productFile, tipo_produto, callback) {
    fs.readFile(productFile, 'utf8', (err, data) => {
      if (err) {
        console.error('Erro ao ler o arquivo:', err);
        return;
      }

      const listaProdutos = JSON.parse(data);
      const produtos = listaProdutos.map((produto) => {
        const { [tipo_produto]: nome, preco, ingredientes } = produto;
        return { nome, preco, ingredientes };
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
    this.dataController.get_Sanduiches(productFile, tipo_produto, (produtos) => {
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
  const cardapio = new CardapioMenu();
  const dataController = new DataBaseController();

  cardapio.criarArvoreComida('Sanduíches Tradicionais', dataController.sanduicheTradicionalFile);
  cardapio.criarArvoreComida('Açaí e Pitaya', dataController.acaiFile);
}

main();
