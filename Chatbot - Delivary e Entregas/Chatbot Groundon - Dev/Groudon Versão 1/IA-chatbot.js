class Lanchonete {
  constructor(nome, cardapio) {
    this.nome = nome;
    this.cardapio = cardapio;
  }

  realizarPedido(item, quantidade) {
    // Verifique se o item está no cardápio e se há estoque suficiente
    // Caso positivo, atualize o estoque e retorne a mensagem de confirmação do pedido
    // Caso negativo, retorne uma mensagem de erro
  }

  consultarCardapio() {
    // Retorne a lista de itens do cardápio da lanchonete
  }
}

const minhaLanchonete = new Lanchonete('Lanchonete do Zé', [
  { nome: 'X-Bacon', preco: 10.0, estoque: 10 },
  { nome: 'X-Salada', preco: 8.0, estoque: 5 },
  { nome: 'X-Egg', preco: 7.0, estoque: 3 }
]);

//!========================================

const { Client } = require('whatsapp-web.js');

const client = new Client();

client.on('ready', () => {
  console.log('Conectado ao WhatsApp Web');
});

client.on('message', message => {
  // Trate a mensagem recebida e execute a ação correspondente
});

client.on('disconnected', () => {
  console.log('Desconectado do WhatsApp Web');
});

client.initialize();
//!========================================

client.on('message', message => {
  if (message.body === '/cardapio') {
    const cardapio = minhaLanchonete.consultarCardapio();
    client.sendMessage(message.from, cardapio);
  } else if (message.body.startsWith('/pedido')) {
    const [_, item, quantidade] = message.body.split(' ');
    const pedido = minha
  }
})

