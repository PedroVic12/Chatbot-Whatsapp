const venom = require('venom-bot');


class GroundonController {
	constructor(groundon) {
		this.groundon = groundon;
	}

	async conectarWpp() {
		try {
			const whatsapp = await venom.create({ session: 'session-name' });
			this.groundon = new GroundonView(whatsapp);
			this.groundon.start();
			console.log('Bot GROUNDON conectado e pronto para receber mensagens.');
		} catch (error) {
			console.error('Erro ao conectar o bot:', error);
		}
	}

	start(client) {
		client.onMessage((message) => {
			//! ===================== Estágio 1 - Apresentação =====================
			if (this.groundon.numero_estagio === 1) {
				this.groundon.enviarMensagem(message.from, 'OLA MUNDO');
				console.log(this.groundon.verConversa());
			}

			// Outros estágios e lógica de controle aqui
		});
	}

	receberMensagemConsole() {
		if (this.groundon.whatsapp) {
			this.groundon.whatsapp.onMessage((message) => {
				console.log(`Mensagem recebida: ${message.body}`);
				this.groundon.armazenarConversa(message);
			});
		} else {
			console.error('WhatsApp client not connected.');
		}
	}

	//! Outros métodos de interação com o cliente
	// Método auxiliar para adicionar atraso (em milissegundos)
	delay(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async receberMensagem() {
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

	//! Restante do código da classe GroundonController
	async handleMessage(message) {
		// Verifica se o usuário já está online
		if (!this.onlineUsers.has(message.sender.id)) {
			this.onlineUsers.add(message.sender.id);
			console.log(`Novo usuário online: ${message.sender.id}`);
		}

		// Lógica para processar a mensagem recebida
		console.log(`Mensagem recebida de ${message.sender.id}: ${message.body}`);

		// Realize as ações necessárias com base na mensagem

		// Exemplo: Enviar uma resposta
		await this.groundon.sendText(message.sender.id, 'Obrigado por sua mensagem!');

		// Exemplo: Contar o número de usuários online
		const onlineUserCount = this.onlineUsers.size;
		console.log(`Número de usuários online: ${onlineUserCount}`);
	}

	async desconectarWpp() {
		// Realize as ações necessárias antes de desconectar o bot

		// Limpar os usuários online
		this.onlineUsers.clear();

		// Desconectar o bot
		await this.groundon.close();
		console.log('Bot desconectado.');
	}
}



module.exports = GroundonController;
