const venom = require('venom-bot');


class GroundonController {
	constructor() {
		this.whatsapp = null;
		this.timeoutDuration = 45000; // Tempo limite em milissegundos (45000 ms = 45 s)
		this.timeoutID = null; // Armazena o ID do tempo limite para que possamos cancelá-lo posteriormente
	}

	async conectarWpp() {
		try {
			this.whatsapp = await venom.create({
				session: 'CITTA-RioDeJaneiro2' // nome da sessão
			});

			if (this.whatsapp) {
				console.log('Conectado ao WhatsApp com sucesso!');
			}
			else {
				console.log(`Debug ${this.whatsapp}`);
			}
		} catch (error) {
			console.error('\n\nErro ao conectar ao WhatsApp:', error);
		}
	}

	receberMensagemConsole() {
		if (this.whatsapp) {
			this.whatsapp.onMessage((message) => {
				console.log(`Mensagem recebida: ${message.body}`);
				this.groundon.armazenarConversa(message);

				this.resetTimeout(); // Reinicie o tempo limite cada vez que recebermos uma mensagem
			});
		} else {
			console.error('WhatsApp client not connected.');
		}
	}


	async restartChatbot() {

		await this.whatsapp.restartService()
		await this.conectarWpp()
	}

	startTimeout() {
		this.timeoutID = setTimeout(() => this.restartChatbot(), this.timeoutDuration);
	}

	// Reinicia o tempo limite
	resetTimeout() {
		clearTimeout(this.timeoutID);
		this.startTimeout();
	}


	// Método auxiliar para adicionar atraso (em milissegundos)
	delay(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
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


		// Exemplo: Contar o número de usuários online
		const onlineUserCount = this.onlineUsers.size;
		console.log(`Número de usuários online: ${onlineUserCount}`);
	}

	async desconectarWpp() {
		// Realize as ações necessárias antes de desconectar o bot


		// Desconectar o bot
		await this.groundon.close();
		console.log('Bot desconectado.');
	}
}


module.exports = GroundonController;

function groundon_controller_main() {
	const groundonController = new GroundonController();
	groundonController.conectarWpp();
	groundonController.receberMensagemConsole();
}

//groundon_controller_main();