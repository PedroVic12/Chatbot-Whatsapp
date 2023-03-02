const Chatbot = require("../chatbot");


class Cliente {
    constructor(Chatbot) {
        //herança
        this.chatbot = Chatbot;

        //atributos Estáticos
        this.nome = 'nomeCliente';
        this.telefone = 21;

        // Atributos Dinamicos
        this.servico_escolhido = ''
        this.pedido_cliente = {
            nome: this.getNome(),
            telefone: this.getPhoneNumber(),
            servico: this.servico_escolhido
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

    setEndereco(address) {
        this.endereco_cliente = address
    }

    getEndereco() {
        return this.endereco_cliente
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


    }



}



module.exports = Cliente;