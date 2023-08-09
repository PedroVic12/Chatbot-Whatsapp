const fs = require('fs');

class Cliente {
    constructor() {
        this.id = ''
        this.nome = "";
        this.telefone = "";
        this.endereco_cliente = {
            endereco: "",
            complemento: ""
        };
        this.forma_pagamento = ''
    }

    // Getter e Setter para o ID
    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }

    // Getter e Setter para Nome
    getNome() {
        return this.nome;
    }
    setNome(nome) {
        this.nome = nome;
    }

    // Getter e Setter para Telefone
    getTelefone() {
        return this.telefone;
    }
    setTelefone(telefone) {
        this.telefone = telefone;
    }

    // Getter e Setter para Endereço
    getEndereco() {
        return this.endereco_cliente.endereco;
    }
    setEndereco(endereco) {
        this.endereco_cliente.endereco = endereco;
    }

    // Getter e Setter para Complemento
    getComplemento() {
        return this.endereco_cliente.complemento;
    }
    setComplemento(complemento) {
        this.endereco_cliente.complemento = complemento;
    }

    // Getter e Setter para Forma de Pagamento
    getFormaPagamento() {
        return this.forma_pagamento;
    }

    setFormaPagamento(forma_pagamento) {
        this.forma_pagamento = forma_pagamento;
    }

    // Método para retornar os dados completos do cliente
    getDadosCompletos() {
        return {
            nome: this.nome,
            telefone: this.telefone,
            endereco: this.endereco_cliente.endereco,
            complemento: this.endereco_cliente.complemento
        };
    }
}

module.exports = Cliente;