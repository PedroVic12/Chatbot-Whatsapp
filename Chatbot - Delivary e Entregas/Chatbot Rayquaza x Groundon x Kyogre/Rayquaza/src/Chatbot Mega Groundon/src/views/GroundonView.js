const GroundonController = require('../controllers/GroundonController');
const Groundon = require('../models/Groundon')
const fs = require('fs');
const axios = require('axios');
const pm2 = require('pm2');
const MewTwo = require('../views/GroundonView')




/*

uma coisa crucial do meu robo é receber varios clientes ao mesmo tempo, ja perccebi que se eu começo a conversa com uma pessoa em um dispositivo se eu falar em outro dispositivo, ele começa de onde veio a conversa do outro dispositivo

É necessário  isolar o estado de cada cliente, e uma maneira comum de fazer isso é usar um identificador único para cada cliente (por exemplo, o número de telefone e o ID com numero aleatorio de 4 digitos) e armazenar o estado associado a esse identificador.

1) Isolar o estado por cliente: Em vez de um único objeto currentStage, você terá um objeto clientStates onde a chave é o identificador do cliente e o valor é o estado desse cliente.



*/



//? Tentei fazer uma herança de Groundon
class GroundonView extends Groundon {
	constructor(whatsapp, groundonController, backendController) {
		super()
		this.whatsapp = whatsapp;
		this.groundonController = groundonController;
		this.backendController = backendController;


		this.stack = []; // Pilha de estágios
		this.clientStates = {}; // Store client states
		this.inactivityTimer = null;

	}

	restartChatbot = () => {
		if (this.inactivityTimer) {
			clearTimeout(this.inactivityTimer);
		}

		this.inactivityTimer = setTimeout(() => {
			console.log("\n\nInatividade detectada. Reiniciando o chatbot através do PM2.");
			pm2.connect((err) => {
				if (err) {
					console.error(err);
					return;
				}
				pm2.restart('Chatbot-Groundon', (err, apps) => {
					pm2.disconnect();
					if (err) {
						console.error(err);
					}
				});
			});
		}, 5 * 60 * 1000);  // 5 minutos
	};

	// Getter method for clientStates
	getEstagioAtualDoCliente(phoneNumber) {
		return this.clientStates[phoneNumber] || null;
	}


	//! Função para adicionar um estágio à pilha
	async pushStage(stage) {
		this.stack.push(stage);
	}


	// Método para configurar um estágio específico
	setStage(stage) {
		// Limpar pilha de estágios
		this.clearStages();

		// Configurar o estágio especificado
		this.pushStage(stage);
	}

	// Função para remover o estágio atual da pilha
	popStage() {
		this.stack.pop();
	}

	// Função para obter o estágio atual
	getCurrentStage() {
		return this.stack.length > 0 ? this.stack[this.stack.length - 1] : 1;
	}

	// Função para limpar a pilha
	clearStages() {
		this.stack = [];
	}

	//!Métodos de controle de Estagio por numero do cliente
	setClientStage(phoneNumber, stage) {
		// Initialize the state object for the client if it doesn't exist
		if (!this.clientStates[phoneNumber]) {
			this.clientStates[phoneNumber] = {
				stack: [] // Initialize the stack for the client
			};
		}

		// Clear the stack and set the specified stage
		this.clientStates[phoneNumber].stack = [stage];
	}

	pushClientStage(phoneNumber, stage) {
		// Initialize the state object for the client if it doesn't exist
		if (!this.clientStates[phoneNumber]) {
			this.clientStates[phoneNumber] = {
				stack: [] // Initialize the stack for the client
			};
		}

		// Push the specified stage to the client's stack
		this.clientStates[phoneNumber].stack.push(stage);
	}

	getClientCurrentStage(phoneNumber) {
		// Get the current stage for the client
		const clientState = this.clientStates[phoneNumber];
		if (clientState && clientState.stack.length > 0) {
			return clientState.stack[clientState.stack.length - 1];
		}
		return 1; // Default stage if no state exists for the client
	}


	navigateToStage(targetStage) {
		const currentStage = this.getCurrentStage();

		if (targetStage == currentStage) {
			return; // Nada a fazer, já estamos no estágio de destino.
		}

		// Caso o estágio de destino seja maior que o atual
		if (targetStage > currentStage) {
			// Adicione os estágios intermediários à pilha
			for (let i = currentStage + 1; i <= targetStage; i++) {
				this.pushStage(i);
			}
		}
		// Caso o estágio de destino seja menor que o atual
		else if (targetStage < currentStage) {
			// Retire os estágios da pilha até chegar ao estágio de destino
			while (this.getCurrentStage() != targetStage) {
				this.popStage();
			}
		}
	}

	//! Rota para recuperar o link do Cardapio Digital
	async getLinkCardapio() {
		// Assuma que this.backendController é uma instância válida de BackendController
		const link = await this.backendController.getLink();

		// Agora você pode usar a variável link
		console.log('Link recuperado:', link);
	}


	getPedidoCardapio(pedidoString) {
		// Encontrar o nome do cliente usando regex
		const nomeClienteMatch = pedidoString.match(/Cliente: ([\w\s]+?)\n/);
		const nomeCliente = nomeClienteMatch ? nomeClienteMatch[1].trim() : null;

		// Encontrar o número do pedido usando regex
		const numeroPedidoMatch = pedidoString.match(/Pedido #(\d+)/);
		const numeroPedido = numeroPedidoMatch ? parseInt(numeroPedidoMatch[1], 10) : null;

		// Encontrar os itens do pedido usando regex
		const itemPattern = /(\d+)x ([^\(]+) \(R\$ ([\d\.]+)\)/g;
		const itensList = [];
		let itemMatch;
		while (itemMatch = itemPattern.exec(pedidoString)) {
			itensList.push({
				quantidade: parseInt(itemMatch[1], 10),
				nome: itemMatch[2].trim(),
				preco: parseFloat(itemMatch[3])
			});
		}

		// Encontrar o total usando regex
		const totalMatch = pedidoString.match(/TOTAL: R\$([\d\.]+)/);
		const total = totalMatch ? parseFloat(totalMatch[1]) : null;

		return {
			nome: nomeCliente,
			pedido: numeroPedido,
			itens: itensList,
			total: total
		};
	}

	async enviarLinkCardapioDigital(message, _LINK, phoneNumber) {
		const MAX_ATTEMPTS = 3;
		const ATTEMPT_INTERVAL = 7000; // 7 seconds

		let linkSent = false;
		const calculaTempo = (startTime) => (Date.now() - startTime) / 1000;
		const _startTime = Date.now();

		const sendLink = async (attempt = 1) => {
			if (linkSent) return;

			try {
				if (attempt > 1) await this.enviarMensagem(message, `Tentando novamente...`);
				await this.enviarMensagem(message, `Abra esse link do seu pedido: ---> ${_LINK}`);
				linkSent = true;
				const tempo_execucao = calculaTempo(_startTime);
				console.log(`Tentativa ${attempt} (${tempo_execucao}): Link enviado com sucesso.`);

				let estadoCliente = this.getEstagioAtualDoCliente(phoneNumber)
				if (estadoCliente) {
					console.log('Client has been initialized:', estadoCliente);
				} else {
					console.log('Client has not been initialized.');
				}
				console.log(this.clearStages[phoneNumber]);

				this.pushClientStage(phoneNumber, 4)

				if (!this.clientStates[phoneNumber]) {
					console.error(`this.clientStates[${phoneNumber}] é undefined!`);
					return;
				}

			} catch (error) {
				console.log(`Tentativa ${attempt}: Erro ao enviar o link.`, error);
				if (attempt < MAX_ATTEMPTS) {
					await this.delay(ATTEMPT_INTERVAL);
					await sendLink(attempt + 1);
				} else {
					this.enviarMensagem(message, `Desculpe, não foi possível enviar o link. Por favor, tente novamente mais tarde.`);
					console.error('Não foi possível enviar o link após', MAX_ATTEMPTS, 'tentativas:', error);
				}
			}
		};

		await sendLink();
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

	getLastMessage(message) {
		try {
			const lastMessage = message.body
			return lastMessage

		} catch (err) {
			console.log(err);
		}
	}

	enviarFoto(message_from, path_image_jpg) {
		// Send image (you can also upload an image using a valid HTTP protocol)
		try {
			this.whatsapp
				.sendImage(
					message_from,
					path_image_jpg,
					'image-name',
					'Caption text'
				)
				.then((result) => {
					console.log('Result: ', result); //return object success
				})
				.catch((erro) => {
					console.error('Error when sending: ', erro); //return object error
				});
		} catch (error) {
			console.log('Não foi possivel enviar a imagem')
		}
	}

	enviarPdf(message_from, path_pdf) {

		try {
			this.whatsapp
				.sendFile(
					message_from,
					path_pdf,
					'file_name',
					'See my file in pdf'
				)
				.then((result) => {
					console.log('Result: ', result); //return object success
				})
				.catch((erro) => {
					console.error('Error when sending: ', erro); //return object error
				});
		} catch (error) {
			console.log('\nNao foi possivel enviar a imagem')
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
	async enviarBotoes(to, title, buttons_array, description) {
		try {
			await this.whatsapp.sendButtons(to, title, buttons_array, description)
		} catch (error) {
			console.error('\nError when sending: ', error);
		}
	}





	setClientStateTimeout(clientId) {
		const clientState = this.getClientState(clientId);

		const tempoConversa = 1 * 60 * 1000; //! mudar apenas a primeira unidade

		// Cancel the existing timer if there is one
		if (clientState.timer) {
			clearTimeout(clientState.timer);
		}

		// Start a new timer to reset the state after 15 minutes
		clientState.timer = setTimeout(() => {
			this.clearStages(clientId);
			console.log(`Resetting stage for client ${clientId}`);
		}, tempoConversa);
	}



}


module.exports = GroundonView