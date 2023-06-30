const { Markup } = require('venom-bot');

// Classe Menu
class Menu {
  constructor() {
    this.produtos = [];
  }

  adicionarProduto(produto) {
    this.produtos.push(produto);
  }

  exibirMenu() {
    let menuString = 'Menu:\n';
    this.produtos.forEach((produto, index) => {
      // Adicionando formatação básica ao texto
      menuString += `*${index + 1}. ${produto.nome}* - R$ ${produto.preco}\n`;
    });
    return menuString;
  }

  obterProduto(index) {
    if (index >= 1 && index <= this.produtos.length) {
      return this.produtos[index - 1];
    }
    return null;
  }
}

// Criação dos menus personalizados com a biblioteca venom-bot
const menuPrincipal = Markup.keyboard([
  ['Ver cardápio', 'Fazer pedido'],
  ['Ver localização']
]).oneTime().resize();

const menuProdutos = Markup.keyboard([
  ['Comida', 'Bebida'],
  ['Sobremesa', 'Salgados'],
  ['Pizzas']
]).oneTime().resize();

const menuNavegacao = Markup.keyboard([
  ['Continuar pedido', 'Ver carrinho'],
  ['Refazer pedido', 'Finalizar pedido']
]).oneTime().resize();

// Função para enviar mensagem e teclado personalizado para o cliente
function enviarMensagemParaCliente(mensagem, teclado) {
  // Aqui você usaria a função de envio de mensagem do venom-bot para enviar a mensagem e o teclado personalizado para o cliente
  // Exemplo:
  // venom.sendTextMessageToClient(clientId, mensagem, teclado);
}

// Exemplo de uso dos menus
function exibirMenuPrincipalNoChat() {
  const mensagem = 'Olá, Cliente! O que você gostaria de fazer?';
  enviarMensagemParaCliente(mensagem, menuPrincipal);
}

function exibirMenuProdutosNoChat() {
  const menu = new Menu();
  // Adicionar produtos ao menu
  // ...

  const mensagem = menu.exibirMenu();
  enviarMensagemParaCliente(mensagem, menuProdutos);
}

function exibirMenuNavegacaoNoChat() {
  const mensagem = 'O que você deseja fazer a seguir?';
  enviarMensagemParaCliente(mensagem, menuNavegacao);
}

// Exemplo de uso dos menus
exibirMenuPrincipalNoChat();
exibirMenuProdutosNoChat();
exibirMenuNavegacaoNoChat();
