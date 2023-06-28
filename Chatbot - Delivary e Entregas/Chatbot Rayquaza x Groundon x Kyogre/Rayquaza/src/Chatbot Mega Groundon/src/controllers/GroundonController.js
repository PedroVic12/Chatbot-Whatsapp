const venom = require('venom-bot');


class GroundonController {
	constructor() {
		this.whatsapp = null;
	}

	async conectarWpp() {
		try {
			this.whatsapp = await venom.create({
				session: 'CITTA-RioDeJaneiro' // nome da sessão
			});

			console.log('Conectado ao WhatsApp com sucesso!');
		} catch (error) {
			console.error('Erro ao conectar ao WhatsApp:', error);
		}
	}

	receberMensagemConsole() {
		if (this.whatsapp) {
			this.whatsapp.onMessage((message) => {
				console.log(`Mensagem recebida: ${message.body}`);
				this.groundon.armazenarConversa(message);
			});
		} else {
			console.error('WhatsApp client not connected.');
		}
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