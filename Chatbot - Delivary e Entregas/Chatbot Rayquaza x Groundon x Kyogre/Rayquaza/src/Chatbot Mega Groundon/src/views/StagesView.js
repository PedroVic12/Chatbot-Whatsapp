const GroundonController = require('../controllers/GroundonController');
const Groundon = require('../models/Groundon');
const fs = require('fs');
const axios = require('axios');
const { addAbortSignal } = require('stream');
const GroundonView = require('./GroundonView');
const Estagio1 = require('./Stages/Estagio1')
const Estagio2 = require('./Stages/Estagio2')

class StagesView extends GroundonView {
    constructor(whatsapp, groundonController, backendController,Estagio1) {
        super(whatsapp, groundonController, backendController);
        this.estagio1 = Estagio1
        this.Estagio2 = Estagio2
    }

    start_chat_Groundon() {
        this.whatsapp.onMessage(async (message) => {
			//! MensagemLog -> Controller()
			// Verifica se o usuário já está online

			// Lógica para processar a mensagem recebida
			const robo_groundon = new Groundon()
			robo_groundon.armazenarConversa(message)
			const numero_estagio = this.getCurrentStage();


            //! ===================== Estágio 1 - Apresentação =====================
			if (numero_estagio === 1) {
				this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);

                this.enviarMensagem(message , `Bem-vindo a Lanchonete *Citta RJ* Obrigado por escolher a nossos Serviços. \n Eu sou o Robô Groundon e estou aqui para ajudá-lo. `)
                this.enviarMensagem(message,"Antes de começarmos, por favor, *Digite Seu Nome*:")


				this.pushStage(2); // Avança para o próximo estágio


            //!=====================  Estágio 2 - Mostrar Menu Principal =====================
			} else if (numero_estagio === 2) {
				this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);

				//! Lógica para o Estágio 2
				console.log('\nEstágio 2:', message.body);



				this.pushStage(3);

            //!=====================  Estágio 3 - Responde as funcionalidades do Botão =====================
			} else if (numero_estagio === 3) {
				this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);


				this.pushStage(4);

            //!=====================  Estagio 4 - Cliente Escolhe os Produtos da Loja =====================
			} else if (numero_estagio === 4) {
				this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);

	
				this.pushStage(5);
			}


            //!=====================  Estagio 5 - Pega o pedido e adiciona no carrinho =====================
			else if (numero_estagio === 5) {
				this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);
				this.popStage(); // Retorna ao estágio anterior
			}
        });
    }
}

module.exports = StagesView;




/*
1 - boas vindas 
2- Pega o nome com cliente com o metodo do Groundon.getLastMessage() e salva no Cliente.nome
3- Aparece o menu principal onde a pessoa escolhe (Ver cardapio, Fazer Pedido, Ver localização)
4- O cliente faz a escolha e recebe a resposta
5- Ao fazer Pedido, aparece o Menu de Produtos onde o cliente escolhe qual Produto ele quer (comida, bebida, sobremesa, salgados, pizzas)
6 - O cliente escolhe o tipo de produto e recebe seu Cardapio
7 - O cliente faz o pedido e o Pedido é adicionado ao carrinho
8 - Aparece o MenuNavegacao onde o cliente escolhe se ele quer, [Continuar pedido, Ver Carrinho, Refazer Pedido, Finalizar Pedido]
9 - O cliente faz a sua escolha e recebe a resposta apropriada
10 - Se o cliente finaliza o pedido, ele vai para o Menu Pagamento onde ele escolhe [Cartao, Dinheiro, Pix)
11 - Menu de confirmacao Voce confirma? __forma_pagamento -> [Sim, Nao]
12 - O bot groundon pergunta o endereço de entrega
13 - O cliente responde o endereço
14 - O bot salva o endereço  no Cliente.endereco_entrega
15 - Aparece o MenuResumoPedido do Pedido e diz que o pedido foi enviado para o atendente e cospe o pedido em formato .json

*/