const GroundonController = require('../controllers/GroundonController');


class GroundonView {
	constructor(whatsapp, groundonController) {
		this.whatsapp = whatsapp;
		this.groundonController = groundonController;
	}

	// 
	startChatbot() {
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


	// Funções de interação com o cliente
	start() {
		this.whatsapp.onMessage((message) => {
			// Verifica o estágio atual
			const numero_estagio = this.getCurrentStage();

			// ===================== Estágio 1 - Apresentação =====================
			if (numero_estagio === 1) {
				// Lógica para o Estágio 1
				console.log('Estágio 1:', message.body);

				// Exemplo de envio de mensagem de resposta
				const resposta = 'Olá! Recebi sua mensagem.';
				this.enviarMensagem(message, resposta);
			}

			// Outros estágios e lógica de controle aqui
			if (numero_estagio === 2) {
				console.log('Estágio 2:', message.body);

				// Lógica para o Estágio 2
				// ...

				// Exemplo de envio de mensagem de resposta
				const resposta = 'Estamos no Estágio 2.';
				this.enviarMensagem(message, resposta);
			}

			// Exemplo: Lidar com o fluxo de estágios
			// if (numero_estagio === 1 && message.body === 'Próximo') {
			//   this.pushStage(2);
			//   this.enviarMensagem(message, 'Estamos no Estágio 2.');
			// } else if (numero_estagio === 2 && message.body === 'Voltar') {
			//   this.popStage();
			//   this.enviarMensagem(message, 'Voltamos ao Estágio 1.');
			// }
		});
	}

	// Funções de Mensagem
	async enviarMensagem(message, texto) {
		try {
			const result = await this.whatsapp.sendText(message.from, texto);
			console.log('Resultado: ', result);
		} catch (error) {
			console.error('Erro ao enviar mensagem: ', error);
		}
	}

	VenomMsgBot() {
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


	// Funções Listas
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



	// ESTRUTURA DE DADOS PILHA PARA FLUXO DOS ESTÁGIOS
	getCurrentStage() {
		// Obtém o estágio atual (topo da pilha) ou retorna 0 se a pilha estiver vazia
		return this.stages.length > 0 ? this.stages[this.stages.length - 1] : 0;
	}

	pushStage(stage) {
		// Adiciona um novo estágio à pilha
		this.stages.push(stage);
	}

	popStage() {
		// Remove o estágio atual (topo da pilha)
		this.stages.pop();
	}
}


module.exports = GroundonView