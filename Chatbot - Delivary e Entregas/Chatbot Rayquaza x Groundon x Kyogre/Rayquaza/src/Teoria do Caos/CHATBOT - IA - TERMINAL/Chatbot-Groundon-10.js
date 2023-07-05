const readline = require('readline-sync');

class Usuario {
  constructor() {
    this.numero_estagio = 1;
    this.cliente = {};
    // Adicione outras propriedades necessárias para o funcionamento do chatbot
  }

  iniciarChat() {
    while (true) {
      if (this.numero_estagio === 1) {
        console.log('\nEstágio 1: Bem-vindo à Lanchonete Citta RJ!');
        console.log('Eu sou o Robô Groundon e estou aqui para ajudá-lo.');
        let nome = readline.question('Antes de começarmos, por favor, digite seu nome: ');
        this.cliente.nome = nome;
        console.log(`Prazer em te conhecer, ${this.cliente.nome}!\n`);
        this.numero_estagio = 2;
      } else if (this.numero_estagio === 2) {
        console.log('\nEstágio 2: Mostrando o Menu Principal');
        console.log('1. Ver cardápio em PDF');
        console.log('2. Fazer um pedido');
        console.log('3. Ver localização');
        let escolha = readline.question('Digite o número da opção desejada: ');
        if (escolha === '1') {
          console.log('Mostrando o cardápio em PDF...');
        } else if (escolha === '2') {
          console.log('Fazendo um pedido...');
          this.numero_estagio = 4;
        } else if (escolha === '3') {
          console.log('Mostrando a localização...');
        } else {
          console.log('Opção inválida. Por favor, tente novamente.');
        }
      } else if (this.numero_estagio === 4) {
        console.log('\nEstágio 4: Escolhendo o tipo de produto');
        console.log('1. Comida');
        console.log('2. Bebida');
        let escolha = readline.question('Digite o número da opção desejada: ');
        if (escolha === '1') {
          console.log('Mostrando o cardápio de comidas...');
        } else if (escolha === '2') {
          console.log('Mostrando o cardápio de bebidas...');
        } else {
          console.log('Opção inválida. Por favor, tente novamente.');
        }
      }

      // Adicione os outros estágios e suas respectivas lógicas aqui

      // Exemplo de saída do loop após um estágio
      if (this.numero_estagio === 5) {
        console.log('\nEstágio 5: Pedido adicionado ao carrinho');
        break;
      }
    }

    console.log('Chat finalizado. Obrigado por utilizar o Robô Groundon!');
  }
}


async function main(){
  const usuario = new Usuario();
  usuario.iniciarChat();
  
}

