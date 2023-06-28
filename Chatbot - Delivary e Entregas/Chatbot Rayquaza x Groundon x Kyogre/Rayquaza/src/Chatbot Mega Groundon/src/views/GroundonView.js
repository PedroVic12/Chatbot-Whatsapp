class GroundonView {
	constructor(whatsapp, groundonController) {
		this.whatsapp = whatsapp;
		this.groundonController = groundonController;
		this.stages = []; // Pilha de estágios
	}

	async iniciar() {
		try {
			await this.groundonController.conectarWpp();
			console.log('✅ Conectado com sucesso!\n\n');
			await this.groundonController.receberMensagem();

			// Outras interações e fluxo de visualização aqui
		} catch (error) {
			console.error('Ops! Deu problema ao conectar! :(');
			console.error(error);
		}
	}

	async enviarListas(phoneNumber, listas) {
		try {
			for (const lista of listas) {
				const listMessage = {
					buttonText: lista.buttonText,
					sections: [
						{
							title: lista.title,
							rows: lista.items.map((item) => ({
								title: item.title,
								description: item.description,
								price: item.price,
							})),
						},
					],
				};

				await this.groundonController.enviarMensagem(phoneNumber, listMessage);
				await this.delay(1000); // Atraso entre o envio de cada lista (opcional)
			}

			console.log(`Listas enviadas para ${phoneNumber}`);
		} catch (error) {
			console.error(`Erro ao enviar listas para ${phoneNumber}: ${error}`);
			throw error;
		}
	}

	start() {
		this.whatsapp.onMessage((message) => {
			// Verifica o estágio atual
			const numero_estagio = this.getCurrentStage();

			// Lógica para processar a mensagem com base no estágio atual
			if (numero_estagio === 1) {
				// Lógica para o Estágio 1
				console.log(`Estágio ${numero_estagio}`, message.body);
			}
		});
	}

	getCurrentStage() {
		// Obtém o estágio atual (topo da pilha) ou retorna 0 se a pilha estiver vazia
		return this.stages.length > 0 ? this.stages[this.stages.length - 1] : 0;
	}

	pushStage(stage) {
		// Adiciona um novo estágio à pilha
		this.stages.push(stage);
	}

	popStage() {
		// Remove o estágio atual (topo da pilha)
		this.stages.pop();
	}
}


module.exports = GroundonView