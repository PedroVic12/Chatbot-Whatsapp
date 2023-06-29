// Importações
const venom = require('venom-bot');
const Groundon = require('./src/models/Groundon');
const GroundonController = require('./src/controllers/GroundonController');
const GroundonView = require('./src/views/GroundonView');

// Chatbot Groundon With Venom-Bot APIs
async function main() {
	const groundonController = new GroundonController();


	try {
		await groundonController.conectarWpp();
	} catch (error) {
		console.log('\n\nErro ao tentar conectar', error)
	}

	const groundonView = new GroundonView(groundonController.whatsapp, groundonController);
	groundonView.start();










































}

main().catch((error) => {
	console.error('Ocorreu um erro:', error);
});
