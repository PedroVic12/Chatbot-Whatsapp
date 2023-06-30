const produtos_cardapio = require("../../../../repository/cardapio_1.json"); // Importe o arquivo JSON do cardápio

class Pedido {
  constructor() {
    this.produtos = [];
    this.produtos_cardapio = produtos_cardapio;


    this.pedido_cliente = {
      nome: this.getNome(),
      telefone: this.getPhoneNumber(),
      //pedido: this.carrinho.verCarrinho(),
      carrinho: this.verCarrinhoCliente(),
      pagamento: this.forma_pagamento,
      endereco: this.endereco_cliente
    };
  }

  adicionarProduto(produto) {
    this.produtos.push(produto);
  }
}


module.exports = Pedido