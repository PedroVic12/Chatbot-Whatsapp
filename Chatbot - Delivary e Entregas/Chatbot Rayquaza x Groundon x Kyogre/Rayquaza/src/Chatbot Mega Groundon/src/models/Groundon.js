class Groundon {
	constructor() {
		this.numero_estagio = 1;
		this.conversas = [[], [], [], [], [], [], [], [], [], []];
		this.numero_pedido_dia = 1;
		this.whatsapp = null;
	}

	armazenarConversa(message) {
		if (message.body.length < 1000) {
			this.conversas[this.numero_estagio - 1].push(message.body);
		}
	}

	// Método auxiliar para adicionar atraso (em milissegundos)
	delay(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}


	

	getStage() {
		const currentStage = this.conversas[this.numero_estagio - 1];
		if (currentStage.length > 0) {
			return currentStage[currentStage.length - 1];
		}
		return null;
	}

	avancarEstagio() {
		this.numero_estagio++;
	}


	// Funções de interação com o cliente

	coutText(){
		console.log('===================')
	}

	// Outros métodos relacionados à lógica de negócios do Groundon
}
module.exports = Groundon;