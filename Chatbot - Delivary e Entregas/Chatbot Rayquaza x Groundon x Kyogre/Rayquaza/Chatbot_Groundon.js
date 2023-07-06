const readline = require('readline');

const Widgets = require('../../Chatbot Mega Groundon/src/models/widgets/Widgets')
const Menu = require('../../Chatbot Mega Groundon/src/models/widgets/Menu/Menu')
const CarrinhoPedido = require('../../Chatbot Mega Groundon/src/models/Regras de Negocio/Pedido/Carrinho')
const BinaryTree = require('../../Chatbot Mega Groundon/src/utils/struct/ArvoreBinaria')


//const cliente = new Cliente()
//const pedido = new Pedido()

class Chatbot {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    this.currentStage = 1;

    this.Widgets = new Widgets()
    this.Menu = new Menu.CardapioMenu()

    this.carrinho = new CarrinhoPedido()

    this.comidaTree = new BinaryTree();
    this.sanduicheTree = new BinaryTree();
  }

  start() {
    console.log('Bem-vindo ao Chatbot!');

    this.rl.question('Digite seu nome: ', (name) => {
      console.log(`Olá, ${name}! Como posso ajudar?`);
      this.processNextStage();
    });
  }

  processNextStage() {
    switch (this.currentStage) {
      case 1:
        this.stage1();
        break;
      case 2:
        this.stage2();
        break;
      // Adicione os demais estágios aqui

      default:
        console.log('Chatbot encerrado.');
        this.rl.close();
    }
  }



  

  stage1() {
    console.log('Estágio 1: Menu Principal');
    console.log('1. Ver cardápio');
    console.log('2. Fazer pedido');
    console.log('3. Ver localização');

    this.rl.question('Escolha uma opção: ', (choice) => {
      switch (choice) {
        case '1':
          console.log('Mostrando o cardápio...');
          this.currentStage = 2;
          break;
        case '2':
          console.log('Fazendo um pedido...');
          // Implemente a lógica para fazer um pedido
          break;
        case '3':
          console.log('Mostrando a localização...');
          // Implemente a lógica para mostrar a localização
          break;
        default:
          console.log('Opção inválida. Tente novamente.');
      }

      this.processNextStage();
    });
  }


  

  stage2() {
    console.log('Estágio 2: Cardápio');
    // Mostre o cardápio aqui

    // Implemente a lógica para processar a escolha do usuário no cardápio

    this.currentStage = 1;
    this.processNextStage();
  }
}

function main_chatbot(){
  const chatbot = new Chatbot();
  chatbot.start();

}

main_chatbot()