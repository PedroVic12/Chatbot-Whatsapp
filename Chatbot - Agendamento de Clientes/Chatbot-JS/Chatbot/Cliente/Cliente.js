const Chatbot = require("../chatbot");


class Cliente {
    constructor(Chatbot) {
        //herança
        this.chatbot = Chatbot;

        //atributos Estáticos
        this.nome = 'nomeCliente';
        this.telefone = 21;

        // Atributos Dinamicos
        this.servico_escolhido = 'servico_escolhido';
        this.pedido_cliente = {
            nome: this.getNome(),
            telefone: this.getPhoneNumber(),
            servico: this.getServicoEscolhido(),
        };
    }


    //! Getters e Setters
    setNome(name) {
        this.nome = name;
    }
    getNome() {
        return this.nome;
    }

    //! Getters e Setters
    setPhoneNumber(phone_number) {
        this.telefone = phone_number;

    }
    getPhoneNumber() {
        return this.telefone;
    }
    //! Getters e Setters

    setServicoEscolhido(_service) {
        this.servico_escolhido = _service
    }

    getServicoEscolhido() {
        return this.servico_escolhido
    }

    //! Getters e Setters
    pegandoFormaPagamentoCliente(message) {
        const formaPagamento = this.chatbot.getLastMessage(message)
        return formaPagamento
    }

    setFormaPagamento(variable_payament) {
        this.forma_pagamento = variable_payament
    }


    capitalizeString(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    realizaPedido(message) {

        const texto = this.chatbot.getLastMessage(message)
        const servico_cliente = texto.substring(0, texto.indexOf("\n"));
        this.setServicoEscolhido(servico_cliente)

        const cliente_service = this.capitalizeString(this.getServicoEscolhido())

        this.chatbot.enviarMensagem(message, `Você escolheu o serviço de *${cliente_service}*!`)

        return cliente_service
    }



}



module.exports = Cliente;