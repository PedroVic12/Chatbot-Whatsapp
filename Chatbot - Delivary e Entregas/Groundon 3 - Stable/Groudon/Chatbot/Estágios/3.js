const { Client, LocalAuth, Buttons, List, MessageMedia, MessageAck } = require('whatsapp-web.js');
const Estagio1 = require("./1")
const Estagio2 = require("./2")
const Lanchonete = require("../Cardapio/Lanchonete")

class Estagio3 {

    constructor(whatsapp) {
        this.whatsapp = whatsapp;

        this.cliente_escolheu_pedido = false

    }


    //!Métodos

    getHoras() {
        let data_atual = new Date();
        let hora = data_atual.getHours();
        let minuto = data_atual.getMinutes();
        return hora + ":" + minuto
    }



    respostaMenu(message) {
        if (message.body === 'Ver Cardápio') {
            this.whatsapp.sendMessage(message.from, "Aqui esta o cardápio, pode fazer seu pedido com calma")

            let media = MessageMedia.fromFilePath('/home/pedrov/Documentos/GitHub/Jedi_Cyberpunk/The Witcher Mode/Freelancer/Chatbots/Delivary e Entregas/Groudon/assets/cardapio1.png');
            this.whatsapp.sendMessage(message.from, media);

        }

        if (message.body === 'Ver nossa Localização') {
            this.botafogo = {
                nome: 'Botafogo',
                rua1: 'Rua Praia de botafogo, 340',
                rua2: 'Rua Voluntários da Pátria, 156',
                rua3: 'Rua Voluntários da Pátria, 350'
            }

            this.catete = {
                nome: 'Catete',
                rua1: 'Rua do Catete, 202',
                rua2: 'Rua Largo do Machado, 90',
            }
            this.centro = {
                nome: 'Centro',
                rua1: 'Rua da Assembleia, 76',
                rua2: 'Rua Buenos Aires, 271',
            }

            this.Copacabana = {
                nome: 'Copacabana',
                rua1: 'Rua Figueiredo Magalhães, 226',
                rua2: 'Rua Tonelero, 223',
            }

            this.Ipanema = {
                nome: 'Ipanema',
                rua1: 'Rua Teixeira de Melo, 53'
            }

            this.whatsapp.sendMessage(message.from, `Escolha uma das nossas unidades:\n\n ${this.botafogo.nome}:\n- ${this.botafogo.rua1}\n- ${this.botafogo.rua2}\n- ${this.botafogo.rua3}`);

        }

        if (message.body === 'Fazer Pedido') {
            this.whatsapp.sendMessage(message.from, "Qual o seu pedido?")

            this.cliente_escolheu_pedido = true

            //this.whatsapp.sendMessage(message.from, `${this.cliente_escolheu_pedido}`)
            
            //!Talvez aqui seja um outro estágio
            let button = new Buttons("Escolha qual produto voce deseja", [
                { body: 'Sanduiche' },
                { body: 'Bebidas' },
                { body: 'Salgados' }
            ], 'Chatbot Groundon', 'Horário de Atendimento = ');

            this.whatsapp.sendMessage(message.from, button)

        }
    }
}

module.exports = Estagio3;
