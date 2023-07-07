const fs = require('fs');
const Produto = require('./Lanches/Produto');




class DataBaseController {
  constructor() {
    this.sanduicheTradicionalFile = '/workspaces/Chatbot-Whatsapp/Chatbot - Delivary e Entregas/Chatbot Rayquaza x Groundon x Kyogre/Rayquaza/src/Chatbot Mega Groundon/repository/cardapio_1.json';
    this.acaiFile = '/workspaces/Chatbot-Whatsapp/Chatbot - Delivary e Entregas/Chatbot Rayquaza x Groundon x Kyogre/Rayquaza/src/Chatbot Mega Groundon/repository/cardapio_2.json';
    this.petiscosFile = '/workspaces/Chatbot-Whatsapp/Chatbot - Delivary e Entregas/Chatbot Rayquaza x Groundon x Kyogre/Rayquaza/src/Chatbot Mega Groundon/repository/cardapio_3.json'
  }

  //!Comidas
  async get_SanduichesTradicionais(productFile, tipo_produto, callback) {
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

module.exports = DataBaseController;
