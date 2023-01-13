const { Client } = require('whatsapp-web.js');
const client = new Client();
client.on('ready', () => {
  console.log('Conectado ao WhatsApp Web');
});

client.on('message', message => {
  if (message.body === '/cardapio') {
    const cardapio = minhaLanchonete.consultarCardapio();
    client.sendMessage(message.from, cardapio);
  } else if (message.body.startsWith('/pedido')) {
    const [_, item, quantidade] = message.body.split(' ');
  }

client.on('disconnected', () => {
  console.log('Desconectado do WhatsApp Web');
});

client.initialize();

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





