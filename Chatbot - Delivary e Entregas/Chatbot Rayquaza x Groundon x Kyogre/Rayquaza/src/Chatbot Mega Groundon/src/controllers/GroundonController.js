const venom = require('venom-bot');
const GroundonView = require('./GroundonController');

class GroundonController {
	constructor(groundon) {
		this.groundon = groundon;
		this.whatsapp = null; // Propriedade para armazenar o cliente WhatsApp
	}

	conectarWpp() {
		return new Promise(async (resolve, reject) => {
			venom.create({
				session: 'CITTA-RJ'
			})
				.then((client) => {
					this.whatsapp = client;
					this.VenomMsgBot();
					console.log('Conectado ao WhatsApp com sucesso!');
					resolve(); // Resolva a promessa aqui
				})
				.catch((error) => {
					console.error('Erro ao conectar ao WhatsApp:', error);
					reject(error); // Rejeite a promessa em caso de erro
				});
		});
	}

}



module.exports = GroundonController;
