// Importações
const venom = require('venom-bot');
const Groundon = require('./src/models/Groundon');
const GroundonController = require('./src/controllers/GroundonController');
const GroundonView = require('./src/views/GroundonView');
const BackendController = require('./src/controllers/BackendController')


// Chatbot Groundon With Venom-Bot APIs
async function main() {
	// Initialize controllers
	const groundonController = new GroundonController();
	const backendController = new BackendController();

	// Connect to WhatsApp
	try {
		await groundonController.conectarWpp();
	} catch (error) {
		console.log('\n\nErro ao tentar conectar', error);
	}
	await backendController.start_backend();

	// Initialize view
	const groundonView = new GroundonView(
		groundonController.whatsapp,
		groundonController,
		backendController
	);
	groundonView.start();







































}

main().catch((error) => {
	console.error('Ocorreu um erro:', error);
});
