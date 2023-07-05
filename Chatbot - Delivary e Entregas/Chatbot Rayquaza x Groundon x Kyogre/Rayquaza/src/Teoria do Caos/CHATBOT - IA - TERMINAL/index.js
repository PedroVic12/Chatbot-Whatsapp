const readline = require('readline-sync');
const Widgets = require('./widgets/Widgets');
const { MenuCategorias, MenuCardapio } = require('./widgets/Widgets');
const { Comida, Sanduiche, LancheModel } = require('./Models/SanduicheModel');

class Usuario {
  constructor() {
    this.numero_estagio = 1;
    this.cliente = {};
    this.menuCategorias = new MenuCategorias();
    this.menuCardapio = new MenuCardapio();
    this.widgets = new Widgets();
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
        const menuPrincipal = this.widgets.menuPrincipal;
        const menuPrincipalText = this.widgets.getMenuText('Menu Principal', menuPrincipal);
        console.log(menuPrincipalText);
        let escolha = readline.question('Digite o número da opção desejada: ');
        if (escolha === 'cancelar') {
          console.log('Pedido cancelado.');
          break;
        } else if (parseInt(escolha) >= 1 && parseInt(escolha) <= menuPrincipal.length) {
          const opcaoEscolhida = menuPrincipal[parseInt(escolha) - 1];
          console.log(`Opção escolhida: ${opcaoEscolhida.button.text}`);
          // Adicione a lógica para o próximo estágio ou ação
          break; // Saída do loop para finalizar o exemplo
        } else {
          console.log('Opção inválida. Por favor, tente novamente.');
        }
      }
      // Adicione lógica para os outros estágios do chatbot

      // Exemplo de saída do loop após um estágio
      if (this.numero_estagio === 5) {
        console.log('\nEstágio 5: Pedido adicionado ao carrinho');
        break;
      }
    }

    console.log('Chat finalizado. Obrigado por utilizar o Bot Groundon!');
  }
}

function main() {
  const usuario = new Usuario();
  usuario.iniciarChat();
}

main();
