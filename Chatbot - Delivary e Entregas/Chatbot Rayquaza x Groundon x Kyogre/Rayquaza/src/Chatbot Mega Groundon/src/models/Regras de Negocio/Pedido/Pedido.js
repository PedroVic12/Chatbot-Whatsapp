  
  class Pedido {
    constructor() {
      this.produtos = [];

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