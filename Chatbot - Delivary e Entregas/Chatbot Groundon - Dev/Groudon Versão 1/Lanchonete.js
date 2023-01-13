class Lanchonete {
  constructor(nome, endereco) {
    this.nome = nome;
    this.endereco = endereco;
    this.lanches = [];
  }

  adicionarLanche(lanche) {
    this.lanches.push(lanche);
  }

  exibirLanches() {
    console.log('Lanches disponíveis na lanchonete:');
    this.lanches.forEach(lanche => console.log(lanche.nome));
  }

  calcularVendas() {
    let total = 0;
    this.lanches.forEach(lanche => total += lanche.preco);
    console.log(`Valor total das vendas: R$${total}`);
  }
}



