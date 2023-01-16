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
}

module.exports = Banco;