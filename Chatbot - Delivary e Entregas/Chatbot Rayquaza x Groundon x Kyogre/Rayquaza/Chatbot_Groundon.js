const readline = require('readline');

const Widgets = require('./src/Chatbot Mega Groundon/src/models/widgets/Widgets')
const Menu = require('./src/Chatbot Mega Groundon/src/models/widgets/Menu/Menu')
const CarrinhoPedido = require('./src/Chatbot Mega Groundon/src/models/Regras de Negocio/Pedido/Carrinho')
const BinaryTree = require('./src/Chatbot Mega Groundon/src/utils/struct/ArvoreBinaria')
const Cliente = require('./src/Chatbot Mega Groundon/src/models/Regras de Negocio/Cliente/Cliente')
const CardapioMenu = require('./src/Chatbot Mega Groundon/src/models/widgets/Menu/Menu')

const cliente = new Cliente()
//const cardapio = new CardapioMenu()

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
    console.log('Bem-vindo ao Chatbot Groundon!');

    this.rl.question('Digite seu nome: ', (name) => {

      cliente.set_nome(name)

      console.log(`Olá, ${cliente.nome}! Como posso ajudar?`);
      this.processNextStage();
    });
  }

  processNextStage() {


    switch (this.currentStage) {
      case 1:
        console.log(`\nNúmero Estágio: ${this.currentStage}`)
        this.stage1();
        break;
      case 2:
        console.log(`\nNúmero Estágio: ${this.currentStage}`)
        this.stage2();
        break;

      case 3:
        console.log(`\nNúmero Estágio: ${this.currentStage}`)
          this.stage3();
        break;

      case 4:
        console.log(`\nNúmero Estágio: ${this.currentStage}`)
        this.stage2();
        break;

      case 5:
        console.log(`\nNúmero Estágio: ${this.currentStage}`)
        this.stage2();
        break;
      // Adicione os demais estágios aqui

      default:
        console.log('Chatbot encerrado.');
        this.rl.close();
    }
  }



  
                    //!=====================  Estágio 2 - Mostrar Menu Principal =====================
  stage1() {

    const menuPrincipal = this.Widgets.menuPrincipal
    const menuPrincipalText = this.Widgets.getMenuText('Menu Principal', menuPrincipal);
    console.log(menuPrincipalText);


    this.rl.question('\nEscolha uma opção: ', (choice) => {
      switch (choice) {
        case '1':
          console.log('Mostrando o cardápio em PDF!...');
          break;
        case '2':
          console.log('Fazendo um pedido...');
          this.currentStage = 2;
          break;
        case '3':
          console.log('Mostrando a localização FACIL...');
          // Implemente a lógica para mostrar a localização
          break;
        default:
          console.log('\nOpção inválida. Tente novamente. Voce quis dizer [1 - Cardapio, 2 - ...]');
      }

      this.processNextStage();
    });
  }


  
  //!=====================  Estágio 3 - Responde as funcionalidades do Botão =====================
  stage2() {

    
    const menuCategorias = this.Widgets.menuCategorias
    const categoriasText = this.Widgets.getMenuText('Categorias de Lanches', menuCategorias)
    console.log(categoriasText)


    this.rl.question('\nEscolha uma opção: ', (choice) => {
      switch (choice) {
        case '1':



          //console.log(`Voce escolheu ${menuCategorias[0].title}!`);
          let menu_sanduiche = this.Menu.mostrarComidasLista()
          console.log(menu_sanduiche);

          this.currentStage = 3;
          break;
  
        default:
          console.log('Opção inválida. Tente novamente.');
      }
    });


    
  }


  //!=====================  Estagio 4 - Cliente Escolhe os Produtos da Loja =====================
  stage3(){
    console.log(' Escolha dos Produtos')
  }
}

function main_chatbot(){
  const chatbot = new Chatbot();
  chatbot.start();

}

main_chatbot()