//Importações
const venom = require('venom-bot');
const Groundon = require('./src/models/Groundon')
const GroundonController = require('./src/controllers/GroundonController')
const GroundonView = require('./src/views/GroundonView')





//Chatbot Groundon With Venom-Bot APIs
async function main() {
	console.log('teste')

	const bot_groundon = new Groundon();
	const GroundonController = new GroundonController(bot_groundon);
	const whatsapp = await venom.create({ session: 'session-name' });
	const GroundonView = new GroundonView(whatsapp, GroundonController);

	GroundonView.iniciar();
}

main().catch((error) => {
	console.error('\nOcorreu um erro no MAIN:', error);
});













































