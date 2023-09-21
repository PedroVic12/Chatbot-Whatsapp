const GroundonController = require('../controllers/GroundonController');
const Groundon = require('../models/Groundon')
const fs = require('fs');
const axios = require('axios');
const pm2 = require('pm2');
const { Console } = require('console');




/*

uma coisa crucial do meu robo é receber varios clientes ao mesmo tempo, ja perccebi que se eu começo a conversa com uma pessoa em um dispositivo se eu falar em outro dispositivo, ele começa de onde veio a conversa do outro dispositivo

É necessário  isolar o estado de cada cliente, e uma maneira comum de fazer isso é usar um identificador único para cada cliente (por exemplo, o número de telefone e o ID com numero aleatorio de 4 digitos) e armazenar o estado associado a esse identificador.

1) Isolar o estado por cliente: Em vez de um único objeto currentStage, você terá um objeto clientStates onde a chave é o identificador do cliente e o valor é o estado desse cliente.

2) Resetar o estágio após inatividade: Para cada cliente, você iniciará um temporizador quando receber uma mensagem. Se outra mensagem desse cliente for recebida antes do temporizador expirar, o temporizador será reiniciado. Se o temporizador expirar, o estado do cliente será redefinido.


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
		this.inactivityTimer = null; // Adicionado aqui

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



	// Rota para recuperar o link do Cardapio Digital
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

	async enviarLinkCardapioDigital(message, _LINK) {

		function calculaTempo(startTime, endTime) {
			const elapsedTime = (endTime - startTime) / 1000;
			return elapsedTime;
		}

		// Variável de controle
		let linkSent = false;
		const _startTime = Date.now();
		let tempo_execucao = 0;

		// Envia a mensagem com o link para o cliente
		this.enviarMensagem(message, `Abra esse link do seu pedido: ---> ${_LINK}`)
			.then(() => {
				linkSent = true; // Marca que o link foi enviado
				tempo_execucao = calculaTempo(_startTime, Date.now());
				console.log(`\nTempo de Resposta: ${tempo_execucao} segundos para enviar o link no WhatsApp!`);
				this.pushStage(4);
			})
			.catch((error) => {
				reject(error);
			});

		const linkPromise = new Promise(async (resolve) => {
			this.enviarMensagem(message, `Processando... Aguarde um instante`);
			tempo_execucao = calculaTempo(_startTime, Date.now());
			console.log(tempo_execucao)

			// Verifica após 15 segundos se o link foi enviado
			setTimeout(() => {
				if (!linkSent) {
					// Tentativa recursiva
					async function enviarLinkWppTentativas(_LINK, tentativa = 1) {
						if (tentativa > 3) {
							// Limite de tentativas atingido, exibe mensagem de erro
							this.enviarMensagem(message, `Desculpe, não foi possível enviar o link. Por favor, tente novamente mais tarde.`);
							return;
						}

						try {
							this.enviarMensagem(message, `Processando... O.O`);
							tempo_execucao = calculaTempo(_startTime, Date.now());
							console.log(tempo_execucao)
							await this.enviarMensagem(message, `Abra esse link do seu pedido: ---> ${_LINK}`);
							linkSent = true; // Marca que o link foi enviado
							resolve();
							console.log(`Tentativa ${tentativa} (${tempo_execucao}): Link enviado com sucesso. ${linkSent}`);
						} catch (error) {
							console.log(`Tentativa ${tentativa}: Erro ao enviar o link.`, error);
							await this.delay(2000);
							await enviarLinkWppTentativas.call(this, tentativa + 1);
						}
					}

					enviarLinkWppTentativas.call(this, _LINK);
				}
			}, 5000); // 7 segundos
		});

		linkPromise
			.then(() => {
				tempo_execucao = calculaTempo(_startTime, Date.now());
				console.log(`\nTempo de Resposta: ${tempo_execucao} segundos para enviar o link no WhatsApp!`);
				this.pushStage(4);
			})
			.catch((error) => {
				console.log('\n\nNão foi possível enviar o link:', error);
			});
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

	handleMessageClientID(message) {
		const clientId = message.from;
		this.setClientStateTimeout(clientId);

		// Now, you can use the pushStage, popStage, and getCurrentStage methods with the clientId
		// For example: this.pushStage(clientId, 'someStage');
		// Note: You'll need to modify your existing code to handle messages accordingly
	}

}


module.exports = GroundonView