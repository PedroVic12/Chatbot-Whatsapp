const readline = require('readline-sync');
const Widgets = require('./widgets/Widgets');
const MenuCategorias = require('./widgets/MenuCategorias');
const MenuCardapio = require('./widgets/MenuCardapio');

class Usuario {
  constructor() {
    this.numero_estagio = 1;
    this.cliente = {};
    this.menuCategorias = new MenuCategorias();
    this.menuCardapio = new MenuCardapio();
    this.widgets = new Widgets();
    this.carrinho = [];
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
          this.numero_estagio = 3;
        } else {
          console.log('Opção inválida. Por favor, tente novamente.');
        }
      } else if (this.numero_estagio === 3) {
        console.log('\nEstágio 3: Escolhendo a categoria');
        const menuCategorias = this.menuCategorias.mostrarCategorias();
        console.log(menuCategorias);

        let escolha = readline.question('Digite o número da categoria desejada: ');

        if (escolha === 'cancelar') {
          console.log('Pedido cancelado.');
          break;
        } else if (parseInt(escolha) >= 1 && parseInt(escolha) <= this.menuCategorias.categorias.length) {
          const categoriaEscolhida = this.menuCategorias.obterCategoria(parseInt(escolha));
          console.log(`Categoria escolhida: ${categoriaEscolhida.nome}`);
          // Adicione a lógica para o próximo estágio ou ação
          this.numero_estagio = 4;
        } else {
          console.log('Opção inválida. Por favor, tente novamente.');
        }
      } else if (this.numero_estagio === 4) {
        console.log('\nEstágio 4: Escolhendo o produto');
        const menuProdutos = this.menuCardapio.exibirMenu();
        console.log(menuProdutos);

        let escolha = readline.question('Digite o número do produto desejado: ');

        if (escolha === 'cancelar') {
          console.log('Pedido cancelado.');
          break;
        } else if (parseInt(escolha) >= 1 && parseInt(escolha) <= this.menuCardapio.produtos.length) {
          const produtoEscolhido = this.menuCardapio.obterProduto(parseInt(escolha));
          console.log(`Produto escolhido: ${produtoEscolhido.nome}`);
          this.carrinho.push(produtoEscolhido);
          console.log('Produto adicionado ao carrinho.');
          // Adicione a lógica para o próximo estágio ou ação
          this.numero_estagio = 5;
        } else {
          console.log('Opção inválida. Por favor, tente novamente.');
        }
      } else if (this.numero_estagio === 5) {
        console.log('\nEstágio 5: Pedido adicionado ao carrinho');
        console.log('Carrinho:');
        this.carrinho.forEach((produto, index) => {
          console.log(`${index + 1}. ${produto.nome} - R$ ${produto.preco}`);
        });
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