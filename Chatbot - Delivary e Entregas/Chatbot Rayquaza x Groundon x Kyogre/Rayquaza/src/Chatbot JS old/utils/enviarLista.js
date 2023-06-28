const Groundon = require("../models/core/Groundon")
const Estagio2 = require("../views/Estagio2")


class Produto {
    constructor(nome, preco) {
        this.nome = nome;
        this.preco = preco;
    }

    getNome() {
        return this.nome;
    }

    getPreco() {
        return this.preco;
    }
}

class Estagio4 {
    constructor(Groundon, Estagio2) {
        this.chatbot = Groundon;
        this.estagio2 = Estagio2;
    }

    enviarLista(message, listBody, BtnText, itens_list) {
        let _itens = [];
        for (let item of itens_list) {
            _itens.push({ title: item.getNome(), description: `R$ ${item.getPreco()}` });
        }

        let lista_wpp = [{
            title: listBody,
            rows: _itens
        }];

        return this.chatbot.enviarLista(message, listBody, BtnText, lista_wpp);
    }

    enviarListaBebidas(message, array) {
        let bebidas_array = [];
        for (let bebida of array) {
            bebidas_array.push(new Produto(bebida.nome, bebida.preco));
        }

        return this.enviarLista(message, "Escolha os itens do seu pedido", "Escolher Bebidas", bebidas_array);
    }
}

function main() {
    const cardapio_bebidas = [
        { "nome": "Coca-cola", "preco": 4.99 },
        { "nome": "Pepsi", "preco": 3.99 },
        { "nome": "Sprite", "preco": 3.99 },
        { "nome": "Fanta Uva", "preco": 3.99 },
        { "nome": "Guaraná", "preco": 3.99 }
    ];

    const estagio4 = new Estagio4(Groundon, Estagio2);
    estagio4.enviarListaBebidas(message, cardapio_bebidas);
}

main();
