class Banco {
    constructor() {
        this.cliente = {};

        this.nome_cliente = '';
        this.carrinho = [];
        this.total = 0;
        this.numero_whatsapp = 0
    }
    set(key, value) {
        this.cliente[key] = value;
    }
    get(key) {
        return this.cliente[key];
    }
    delete(key) {
        delete this.cliente[key];
    }

    getCliente() {
        //faz o getCliente para ver se o cliente esta na base de dados

    }

    setCliente(nome, carrinho, total, numero_whatsapp) {
        // se não tiver, faz o setCliente na base

        this.nome_cliente = nome;
        this.carrinho = carrinho;
        this.total = total;
        this.numero_whatsapp = numero_whatsapp;
    }


    delCliente()



}

module.exports = Banco;