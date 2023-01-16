const Cliente = require("./cliente");

const Cardapio = require("../cardapio/cardapio__init__")

class Pedido extends Cliente {
    constructor(nome, telefone, local_entrega, num_pedido, forma_pagamento) {

        super(nome, telefone, local_entrega, num_pedido)

        this.forma_pagamento = forma_pagamento
        this.bebida = bebida;
        this.sanduiche = sanduiche;
        this.salgado = salgado;
        this.sobremesa = sobremesa;



        this.observacao = observacao;
        this.status_pedido = status_pedido;
        this.tempo_preparo = tempo_preparo;
        this.tempo_entrega = tempo_entrega;
        this.tempo_total = tempo_total;
        this.valor_total = valor_total;



    }

    processarPedido() {

    }

    calcularTempoPreparo() {

    }

    enviarMensagemCliente() {

    }

    calcularTempoRota() {

    }

    exportarPedidoExcel() {
        //Se o pedido estiver 100% confirmado
    }
}


console.log(Pedido)



module.exports = Pedido;

