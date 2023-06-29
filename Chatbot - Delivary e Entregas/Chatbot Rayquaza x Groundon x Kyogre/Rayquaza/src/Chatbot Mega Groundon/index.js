// Importações
const venom = require('venom-bot');
const Groundon = require('./src/models/Groundon');
const GroundonController = require('./src/controllers/GroundonController');
const GroundonView = require('./src/views/GroundonView');
const BackendController = require('./src/controllers/BackendController')


// Chatbot Groundon With Venom-Bot APIs
async function main() {
	// Iniciando o COntroller
	const groundonController = new GroundonController();
	const backend = new BackendController();
	backend.start();

	// Conectando
	try {
		await groundonController.conectarWpp();
	} catch (error) {
		console.log('\n\nErro ao tentar conectar', error)
	}

	//Iniciando a View
	const groundonView = new GroundonView(groundonController.whatsapp, groundonController);
	groundonView.start();










































}

main().catch((error) => {
	console.error('Ocorreu um erro:', error);
});
