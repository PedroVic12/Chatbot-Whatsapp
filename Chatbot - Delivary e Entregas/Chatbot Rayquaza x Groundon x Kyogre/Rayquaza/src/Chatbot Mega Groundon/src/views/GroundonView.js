const GroundonController = require('../controllers/GroundonController');
const Groundon = require('../models/Groundon')
const fs = require('fs');
const axios = require('axios');

//? Tentei fazer uma herança de Groundon
class GroundonView extends Groundon {
	constructor(whatsapp, groundonController, backendController) {
		super()
		this.whatsapp = whatsapp;
		this.groundonController = groundonController;
		this.backendController = backendController;


		this.stack = []; // Pilha de estágios
		this.clientStates = {}; // Store client states

	}

	// Rota para recuperar o link do Cardapio Digital
	async getLinkCardapio() {
		// Assuma que this.backendController é uma instância válida de BackendController
		const link = await this.backendController.getLink();

		// Agora você pode usar a variável link
		console.log('Link recuperado:', link);
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

	// Função para limpar a pilha
	clearStages() {
		this.stack = [];
	}

	//! Metodos de cliente e ID
	getClientState(clientId) {
		if (!this.clientStates[clientId]) {
			this.clientStates[clientId] = {
				stack: [],
				timer: null
			};
		}
		return this.clientStates[clientId];
	}

	pushEstagio(clientId, stage) {
		this.getClientState(clientId).stack.push(stage);
	}

	popEstagio(clientId) {
		const stack = this.getClientState(clientId).stack;
		if (stack.length > 0) {
			stack.pop();
		}
	}

	getEstagioAtual(clientId) {
		const stack = this.getClientState(clientId).stack;
		return stack.length > 0 ? stack[stack.length - 1] : 'stage1';
	}

	limparPilhaEstagio(clientId) {
		this.getClientState(clientId).stack = [];
	}

	setClientStateTimeout(clientId) {
		const clientState = this.getClientState(clientId);

		// Cancel the existing timer if there is one
		if (clientState.timer) {
			clearTimeout(clientState.timer);
		}

		// Start a new timer to reset the state after 15 minutes
		clientState.timer = setTimeout(() => {
			this.clearStages(clientId);
			console.log(`Resetting stage for client ${clientId}`);
		}, 15 * 60 * 1000);
	}

	handleMessageClientID(message) {
		const clientId = message.from;
		this.setClientStateTimeout(clientId);

		// Now, you can use the pushStage, popStage, and getCurrentStage methods with the clientId
		// For example: this.pushStage(clientId, 'someStage');
		// Note: You'll need to modify your existing code to handle messages accordingly
	}

}


module.exports = GroundonView