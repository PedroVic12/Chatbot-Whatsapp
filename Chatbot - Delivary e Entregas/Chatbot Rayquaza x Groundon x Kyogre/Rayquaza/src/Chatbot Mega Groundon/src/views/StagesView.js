const GroundonController = require('../controllers/GroundonController');
const Groundon = require('../models/Groundon');
const fs = require('fs');
const axios = require('axios');
const { addAbortSignal } = require('stream');
const GroundonView = require('./GroundonView');

class StagesView extends GroundonView {
    constructor(whatsapp, groundonController, backendController) {
        super(whatsapp, groundonController, backendController);
    }

    start() {
        this.whatsapp.onMessage(async (message) => {
            const numero_estagio = this.getCurrentStage();

            if (numero_estagio === 1) {
                this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);
                // Resto da lógica do estágio 1
            } else if (numero_estagio === 2) {
                this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);
                // Resto da lógica do estágio 2
            } else if (numero_estagio === 3) {
                this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);
                // Resto da lógica do estágio 3
            } else if (numero_estagio === 4) {
                this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);
                // Resto da lógica do estágio 4
            } else if (numero_estagio === 5) {
                this.enviarMensagem(message, `Número Estágio: ${numero_estagio}`);
                this.popStage(); // Retorna ao estágio anterior
            }
        });
    }
}

module.exports = StagesView;
