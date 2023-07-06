const readline = require('readline');

const GroundonView = require('./GroundonView');
const { BinaryTree, Comida, DataBaseController } = require('../utils/struct/ArvoreBinaria');

const Cliente = require('../models/Regras de Negocio/Cliente/Cliente');
const CarrinhoPedido = require("../models/Regras de Negocio/Pedido/Carrinho");
const Pedido = require('../models/Regras de Negocio/Pedido/Pedido');

const Widgets = require('../models/widgets/Widgets');
const Menu = require('../models/widgets/Menu/Menu');

const Estagio1 = require('./Stages/Estagio1');
const Estagio2 = require('./Stages/Estagio2');
const Estagio3 = require('./Stages/Estagio3');

const cliente = new Cliente();
const pedido = new Pedido();

class ChatbotTerminal extends GroundonView {
  constructor() {
    super();
    this.estagio1 = new Estagio1();
    this.estagio2 = new Estagio2();
    this.estagio3 = new Estagio3();

    this.Widgets = new Widgets();
    this.Menu = new Menu.CardapioMenu();

    this.carrinho = new CarrinhoPedido();

    this.comidaTree = new BinaryTree();
    this.sanduicheTree = new BinaryTree();

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  async start_chat_Groundon() {
    this.rl.question('Bem-vindo a Lanchonete *Citta RJ* Obrigado por escolher a nossos Serviços. Eu sou o Robô Groundon e estou aqui para ajudá-lo. Antes de começarmos, por favor, digite seu nome: ', (nome) => {
      cliente.set_nome(nome);
      console.log(`Prazer em te conhecer, ${cliente.nome}!\n`);
      this.showMenuPrincipal();
    });
  }

}

function main(){
  

}