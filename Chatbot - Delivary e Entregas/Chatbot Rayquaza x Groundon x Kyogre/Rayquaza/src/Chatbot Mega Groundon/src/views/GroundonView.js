const GroundonController = require('../controllers/GroundonController');
const Groundon = require('../models/Groundon')
const fs = require('fs');
const axios = require('axios');
const { addAbortSignal } = require('stream');


class GroundonView {
	constructor(whatsapp, groundonController, backendController) {
		this.whatsapp = whatsapp;
		this.groundonController = groundonController;
		this.backendController = backendController;
		this.stack = []; // Pilha de estágios

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
				this.mostrarComidasLista(message)


				async function testeSendList() {
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

				}


				this.pushStage(3);
			} else if (numero_estagio === 3) {
				this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);

				// Lógica para o Estágio 3

				// Parâmetros da lista que você deseja enviar
				const to = message.from; // Número de telefone do destinatário
				const title = 'Título da lista';
				const subTitle = 'Subtítulo da lista';
				const description = 'Descrição da lista';
				const menu = 'Menu da lista';
				const option1 = 'Opção 1';
				const titulo1 = 'Título 1';
				const descricao1 = 'Descrição 1';
				const option2 = 'Opção 2';
				const titulo2 = 'Título 2';
				const descricao2 = 'Descrição 2';

				// Montar o objeto com os parâmetros da lista
				const listParams = {
					to,
					title,
					subTitle,
					description,
					menu,
					option1,
					titulo1,
					descricao1,
					option2,
					titulo2,
					descricao2
				};

				// Fazer a requisição ao servidor backend
				axios.post('http://localhost:4000/send-lists', listParams)
					.then(response => {
						console.log(response.data);
					})
					.catch(error => {
						console.error('\n\nErro ao enviar a lista no evento Listener:', error);
					});




				this.pushStage(4);
			} else if (numero_estagio === 4) {
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



				this.pushStage(5);
			}

			else if (numero_estagio === 5) {
				this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);
				this.popStage(); // Retorna ao estágio anterior
			}
		});
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


	//! Funções de Mensagem
	async enviarMensagem(message, texto) {
		try {
			const result = await this.whatsapp.sendText(message.from, texto);
			//console.log('\n\nResultado da Mensagem: ', result);
		} catch (error) {
			console.error('\n\nErro ao enviar mensagem: ', error);
		}
	}


	//! Funções Listas
	mostrarComidasLista(message) {

		let cardapio_sanduiche = '/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Delivary e Entregas/Chatbot Rayquaza x Groundon x Kyogre/Rayquaza/src/Chatbot Mega Groundon/repository/cardapio_1.json'
		fs.readFile(cardapio_sanduiche, 'utf8', (err, data) => {
			if (err) {
				console.error('Erro ao ler o arquivo JSON:', err);
				return;
			}

			try {
				const listaComidas = JSON.parse(data);

				let cardapio_text = '🍔 *Cardápio* 🍔\n\n';

				listaComidas.forEach((comida, index) => {
					cardapio_text += `*${index + 1}. ${comida['Sanduíches Tradicionais']}* - R$ ${comida['Preço.4'].toFixed(2)}\n`;
					cardapio_text += `Ingredientes: ${comida['Igredientes']}\n`;
					cardapio_text += `📝 Para escolher este item, envie o número ${index + 1}.\n\n`;
				});

				cardapio_text += '🚫 Para cancelar, envie *cancelar*.\n';

				this.enviarMensagem(message, cardapio_text);
			} catch (error) {
				console.error('Erro ao analisar o arquivo JSON:', error);
			}
		});

	}
	async enviarLista(to, title, subTitle, description, menu, list_object) {
		try {
			await this.whatsapp.sendListMenu(to, title, subTitle, description, menu, list_object)
				.then((result) => {
					console.log('\n\nLISTA ENVIADA: ', result);
				})


		} catch (error) {
			console.error('\n\nError when sending LIST: ', error);
		}
	}

	async sendListRequest(to, title, subTitle, description, menu, list_object) {
		try {
			await this.backendController.enviarListaRequest(to, title, subTitle, description, menu, list_object);
		} catch (error) {
			console.error('Erro ao enviar a lista:', error);
			throw new Error('Erro ao enviar a lista');
		}
	}

	//! Botoes
	async enviarBotoes(to, title, buttons, description) {
		try {
			await this.whatsapp.sendButtons(to, title, buttons, description)
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