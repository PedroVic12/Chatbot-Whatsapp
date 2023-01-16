// O pedido tem que ser intuitivo, o bot tem que ja saber as respostas dos clientes, tem que seguir um padrão

let Bebidas = require("./bebida")

class Lanchonete {
    constructor() {
        this.bebidas = new Bebidas();
    }

    verBebidas() {
        return this.bebidas.getArray();
    }

    fazerPedido() {
        this.whatsapp.on('message', async message => {
            // obtemos a resposta do usuário
            let nome_produto = message.body;
            // criamos uma instância da classe Bebidas
            const bebidas = new Bebidas();
            // adicionamos o produto ao carrinho
            bebidas.adicionarCarrinho(nome_produto);
        });
    }
}


let citta = new Lanchonete();
teste = citta.verBebidas()

console.log(teste)

module.exports = Lanchonete;