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

	//!Funções dos Menus Personalizados
	// Função para mostrar o menu principal
	async enviarMenu(message, menu_text) {
		try {
			await this.delay(2000);
			await this.enviarMensagem(message, menu_text);
		} catch (error) {
			console.log(error);
		}

		await this.delay(3000);
		await this.enviarMensagem(message, 'O que deseja fazer?');
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


}


module.exports = GroundonView