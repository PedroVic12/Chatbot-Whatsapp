const ProdutoCardapio = require("../models/Produto");
const Carrinho = require("../models/Carrinho");
const Cliente = require("../models/Cliente");
const produtos_cardapio = require("../repository/cardapio_1.json");
const Chatbot = require("../models/core/Groundon");



function main() {
    // Criação de instâncias dos objetos necessários
    const chatbot = new Chatbot();
    const carrinho = new Carrinho(chatbot, produtos_cardapio);
    const cliente = new Cliente(chatbot, carrinho);
    const caminhoArquivoJSON = 'repository/cardapio_1.json';

    // Chamada do método para ler o arquivo JSON e criar objetos ProdutoCardapio
    const produtosCardapio = ProdutoCardapio.lerArquivoJSON(caminhoArquivoJSON);

    // Exibição dos produtos do cardápio
    console.log('CARDAPIO:');
    for (const produto of produtosCardapio) {
        console.log('Nome:', produto.getNome());
        console.log('Ingredientes:', produto.getIngredientes());
        console.log('Preço:', produto.getPreco());
        console.log('-----');
    }

    //TODO -> Verificar com as listas no wpp Simulação de interação com o chatbot e realização de pedidos
    const pedidos = ["Misto Quente R$ 15", "Bauru R$ 12", "Bauru R$ 12", 'Big Mac R$ 20'];
    for (const pedido of pedidos) {
        cliente.realizaPedido(pedido);
    }

    // Exibição do carrinho
    console.log("\nItens do Pedido:");
    const carrinhoCliente = cliente.verCarrinhoCliente();
    console.log(carrinhoCliente);

    // Simulação de interação para escolher a forma de pagamento
    const formaPagamento = "Cartão de Crédito";
    cliente.setFormaPagamento(formaPagamento);

    // Definição dos dados do cliente
    cliente.setNome("Anakin Skywalker Jedi");
    cliente.setPhoneNumber("123456789");
    cliente.setEndereco("Estrada do Mendanha, 123");

    // Geração da nota fiscal
    const notaFiscal = cliente.gerarNotaFiscal();
    console.log(notaFiscal);
}

main();
