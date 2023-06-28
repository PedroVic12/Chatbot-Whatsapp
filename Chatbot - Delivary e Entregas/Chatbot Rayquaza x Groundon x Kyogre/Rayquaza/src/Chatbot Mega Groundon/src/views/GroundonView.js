const GroundonController = require('../controllers/GroundonController');


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
			const numero_estagio = this.getCurrentStage();

			if (numero_estagio === 1) {
				// Lógica para o Estágio 1
				this.enviarMensagem(message, 'Bem vindo ao Venom 🕷, homem aranha!')
				this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);
				console.log('Estágio 1:', message.body);

				const resposta = 'Olá! Recebi sua mensagem.';
				await this.enviarMensagem(message, resposta);

				this.pushStage(2); // Avança para o próximo estágio
			} else if (numero_estagio === 2) {
				console.log('Estágio 2:', message.body);

				// Lógica para o Estágio 2
				// ...

				this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);

				this.pushStage(3); // Avança para o próximo estágio
			} else if (numero_estagio === 3) {
				this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);
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
			console.log('Resultado: ', result);
		} catch (error) {
			console.error('Erro ao enviar mensagem: ', error);
		}
	}


	//! Funções Listas
	async enviarListas(phoneNumber, listas) {
		try {
			for (const lista of listas) {
				const listMessage = {
					buttonText: lista.buttonText,
					sections: [
						{
							title: lista.title,
							rows: lista.items.map((item) => ({
								title: item.title,
								description: item.description,
								price: item.price,
							})),
						},
					],
				};

				await this.groundonController.enviarMensagem(phoneNumber, listMessage);
				await this.delay(1000); // Atraso entre o envio de cada lista (opcional)
			}

			console.log(`Listas enviadas para ${phoneNumber}`);
		} catch (error) {
			console.error(`Erro ao enviar listas para ${phoneNumber}: ${error}`);
			throw error;
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