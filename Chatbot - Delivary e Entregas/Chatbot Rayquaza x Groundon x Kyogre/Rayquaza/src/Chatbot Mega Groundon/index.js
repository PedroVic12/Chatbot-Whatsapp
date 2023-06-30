// Importações
const venom = require('venom-bot');
const Groundon = require('./src/models/Groundon');
const GroundonController = require('./src/controllers/GroundonController');
const GroundonView = require('./src/views/GroundonView');
const BackendController = require('./src/controllers/BackendController');
const StagesView = require('./StagesView');

//! TEMPO DE CONEXÃO COM O WPP = 20 SEGUNDOS, depois disso rodar o servidor Rayquaza

// Chatbot Groundon With Venom-Bot APIs
async function main() {
  // Initialize controllers
  const groundonController = new GroundonController();
  const backendController = new BackendController();

  //! Connect to WhatsApp
  let isWhatsAppConnected = false;
  let isGroundonBotOnline = false;
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
    console.log('\n\nNão foi possível iniciar o backend, pois o WhatsApp não está conectado.');
  }

  // Initialize view
  const groundonView = new GroundonView(
    groundonController.whatsapp,
    groundonController,
    backendController
  );

  const stagesView = new StagesView(
    groundonController.whatsapp,
    groundonController,
    backendController
  );

  //! Bot esta Online!
  groundonView.start();
  isGroundonBotOnline = true;

  // Start chat for Groundon stages
  stagesView.start_chat_Groundon();
}

main().catch((error) => {
  console.error('\n\nOcorreu um erro:', error);
});
