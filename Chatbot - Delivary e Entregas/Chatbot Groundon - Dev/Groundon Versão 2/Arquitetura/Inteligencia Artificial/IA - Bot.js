const { Client, LocalAuth, Buttons, List, MessageMedia } = require('whatsapp-web.js');

class DeliveryBot {
  // Inicialize as propriedades da classe
  constructor(clientAddress) {
    this.clientAddress = clientAddress;
    this.orderItems = [];
    this.orderTotal = 0;

    //Instanciando um novo Objeto de Chatbot
    this.whatsapp = new Client({
      authStrategy: new LocalAuth({ clientId: "client-one" })
    });
    this.qrcode = require('qrcode-terminal');

    //hora atual
    let data_atual = new Date();
    let hora = data_atual.getHours();
    let minuto = data_atual.getMinutes();

    this.pedido_iniciado = false

  }

  conectandoWpp() {
    console.log("Gerando QR Code...\n")
    this.whatsapp.on('qr', qr => {
      this.qrcode.generate(qr, { small: true });
    });

    this.whatsapp.on('ready', () => {
      console.log('Client is ready! Pronto para usar agora :) ');
    });

    console.log("Inicializando o BOT...\n")

    this.whatsapp.initialize();
  }


  // Adicione um método para adicionar itens ao pedido do cliente
  addItem(item, price) {
    this.orderItems.push(item);
    this.orderTotal += price;
  }

  // Adicione um método para enviar o pedido para a lanchonete
  sendOrder() {

    // Envie a mensagem com os detalhes do pedido para a lanchonete
    this.whatsapp.on('message', message => {

      this.whatsapp.sendMessageE(message.from, `Novo pedido de entrega:
    Endereço do cliente: ${this.clientAddress}
    Itens do pedido: ${this.orderItems.join(', ')}
    Total do pedido: ${this.orderTotal}`);
    })

    console.log(`Novo pedido de entrega:
    Endereço do cliente: ${this.clientAddress}
    Itens do pedido: ${this.orderItems.join(', ')}
    Total do pedido: ${this.orderTotal}`)

  }


}


//!==========MAIN=====================

// Crie uma instância da classe do seu bot de delivery
const deliveryBot = new DeliveryBot('123 Main St.');

//Iniciando
deliveryBot.conectandoWpp();

// Adicione alguns itens ao pedido do cliente
deliveryBot.addItem('Hambúrguer', 10.99);
deliveryBot.addItem('Batata frita', 5.99);

// Envie o pedido para a lanchonete
deliveryBot.sendOrder();
