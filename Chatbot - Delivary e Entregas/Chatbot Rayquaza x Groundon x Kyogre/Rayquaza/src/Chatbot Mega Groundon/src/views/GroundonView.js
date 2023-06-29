const GroundonController = require('../controllers/GroundonController');
const Groundon = require('../models/Groundon')

class GroundonView {
	constructor(whatsapp, groundonController) {
		this.whatsapp = whatsapp;
		this.groundonController = groundonController;
		this.stack = []; // Pilha de estágios

	}

	StartVenomBot() {
		this.whatsapp.onMessage((message) => {
			if (message.body === 'Hi' && message.isGroupMsg === false) {
				this.whatsapp
					.sendText(message.from, 'Bem vindo ao Venom 🕷, homem aranha!')
					.then((result) => {
						console.log('Result: ', result); //return object success
					})
					.catch((erro) => {
						console.error('Error when sending: ', erro); //return object error
					});
			}
		});
	}


	//! Funções de interação com o cliente
	start() {
		this.whatsapp.onMessage(async (message) => {

			//! MensagemLog -> Controller()
			// Verifica se o usuário já está online


			// Lógica para processar a mensagem recebida
			const robo_groundon = new Groundon()
			robo_groundon.armazenarConversa(message)


			//! Stages
			const numero_estagio = this.getCurrentStage();

			if (numero_estagio === 1) {
				this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);

				this.enviarMensagem(message, 'Bem vindo ao Venom 🕷, homem aranha!')
				console.log('\nEstágio 1:', message.body);



				this.pushStage(2); // Avança para o próximo estágio
			} else if (numero_estagio === 2) {
				this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);

				// Lógica para o Estágio 2
				console.log('\nEstágio 2:', message.body);



				try {
					const minha_lista = [
						{
							title: "Pasta",
							rows: [
								{
									title: "Ravioli Lasagna",
									description: "Made with layers of frozen cheese",
								}
							]
						},
						{
							title: "Dessert",
							rows: [
								{
									title: "Baked Ricotta Cake",
									description: "Sweets pecan baklava rolls",
								},
								{
									title: "Lemon Meringue Pie",
									description: "Pastry filled with lemonand meringue.",
								}
							]
						}
					];

					await this.enviarLista(
						message.from,
						'menuTitle',
						'menuSubTitle',
						'menuDescription',
						'menuId',
						minha_lista
					);

				} catch (error) {
					this.enviarMensagem(message, 'Nao foi possível enviar a lista')
				}



				this.pushStage(3);
			} else if (numero_estagio === 3) {
				this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);


				const buttons = [
					{
						buttonText: {
							displayText: 'Texto do Botão 1'
						}
					},
					{
						buttonText: {
							displayText: 'Texto do Botão 2'
						}
					}
				];

				await this.enviarBotoes(message.from, 'title', buttons, 'Selecione uma opção:');


				this.pushStage(4); // Avança para o próximo estágio
			} else if (numero_estagio === 4) {
				this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);
				this.popStage(); // Retorna ao estágio anterior
			}
		});
	}
	//! Funções de Mensagem
	async enviarMensagem(message, texto) {
		try {
			const result = await this.whatsapp.sendText(message.from, texto);
			console.log('\n\nResultado da Mensagem: ', result);
		} catch (error) {
			console.error('\n\nErro ao enviar mensagem: ', error);
		}
	}


	//! Funções Listas
	async enviarLista(to, title, subTitle, description, menu, list_object) {
		try {
			await this.whatsapp.sendListMenu(to, title, subTitle, description, menu, list_object)
				.then((result) => {
					console.log('\n\nLISTA ENVIADA: ', result);
				})


		} catch (error) {
			console.error('\nError when sending: ', error);
		}
	}

	//! Botoes
	async enviarBotoes(to, title, buttons, description) {
		try {
			await this.whatsapp.sendButtons(to, title, buttons, description)
				.then((result) => {
					console.log('Result: ', result); //return object success
				})

		} catch (error) {
			console.error('\nError when sending: ', error);
		}
	}


	//! Função para adicionar um estágio à pilha
	pushStage(stage) {
		this.stack.push(stage);
	}

	// Função para remover o estágio atual da pilha
	popStage() {
		this.stack.pop();
	}

	// Função para obter o estágio atual
	getCurrentStage() {
		return this.stack.length > 0 ? this.stack[this.stack.length - 1] : 1;
	}

	//!TESTE
	async IniciarStagesMessages() {
		this.groundon.whatsapp.onMessage((message) => {
			this.groundon.armazenarConversa(message);

			const currentStage = this.groundon.numeroEstagio;

			switch (currentStage) {
				case 1:
					this.estagio1(message);
					break;
				case 2:
					this.estagio2(message);
					break;
				case 3:
					this.estagio3(message);
					break;
				default:
					console.log('Estágio desconhecido');
			}
		});
	}

	estagio1(message) {
		console.log('Estágio 1:', message.body);
		// Lógica específica do Estágio 1
	}

	estagio2(message) {
		console.log('Estágio 2:', message.body);
		// Lógica específica do Estágio 2
	}

	estagio3(message) {
		console.log('Estágio 3:', message.body);
		// Lógica específica do Estágio 3
	}
}


module.exports = GroundonView