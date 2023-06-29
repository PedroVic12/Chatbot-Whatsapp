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
	let isWhatsAppConnected = false;
	try {
		await groundonController.conectarWpp().then(() => {
			isWhatsAppConnected = true;
		});
	} catch (error) {
		console.log('\n\nErro ao tentar conectar', error);
	}

	// Start backend if WhatsApp is connected
	if (isWhatsAppConnected) {
		await backendController.start_backend();
	} else {
		console.log('Não foi possível iniciar o backend, pois o WhatsApp não está conectado.');
	}

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
