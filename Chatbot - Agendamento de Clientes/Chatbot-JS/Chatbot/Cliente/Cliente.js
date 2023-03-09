const Chatbot = require("../chatbot");
const ServicosCliente = require('../Banco de Dados - EXCEL/Servicos_Cliente');

class Cliente {
    constructor(Chatbot) {
        //herança
        this.chatbot = Chatbot;

        //atributos Estáticos
        this.nome = 'nomeCliente';
        this.telefone = 21;

        // Atributos Dinamicos
        this.categoria_escolhida = 'categoria de serviço';

        this.pedido_cliente = {
            nome: this.getNome(),
            telefone: this.getPhoneNumber(),
            servico: [],
            total: 0
        };

    }


    //! Getters e Setters

    getPrecoTotal(){
        return this.pedido_cliente.total
    }

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
        this.pedido_cliente.servico.push(_service)
    }

    getPedidoCliente() {
        return this.pedido_cliente.servico
    }

    setCategoriaEscolhida(_categoria) {
        this.categoria_escolhida = _categoria
    }

    getCategoriaEscolhida() {
        return this.categoria_escolhida
    }



    //! Métodos realizados pelo cliente
    realizaPedidoCategoria(message) {

        //Pegando resposta do cliente
        const categoria_cliente = this.chatbot.getLastMessage(message)
        const categoriaEscolhida = this.chatbot.getFirstItemString(categoria_cliente)

        //Adicionando ao objeto Cliente
        this.setCategoriaEscolhida(categoriaEscolhida)
        this.chatbot.enviarMensagem(message, `Você escolheu a Categoria de Serviço de *${categoriaEscolhida}*!`)

        return categoriaEscolhida
    }

    realizaPedidoServico(message) {

        //Pegando resposta do cliente
        const pedido_cliente = this.chatbot.getLastMessage(message)
        const servico_cliente = this.chatbot.getFirstItemString(pedido_cliente)

        //Adicionando ao objeto Cliente
        this.setServicoEscolhido(servico_cliente)
        this.chatbot.enviarMensagem(message, `Você escolheu o Serviço de *${servico_cliente}*!`)

        return servico_cliente
    }



    async adicionarPedidoCarrinho(_nomeDoServico) {

        // Carregando a planilha de serviços
        let baseDeDadosProdutos = new ServicosCliente()
        let objectCategory = await baseDeDadosProdutos.carregarPlanilhaServicos(this.categoria_escolhida)
        console.log(objectCategory)


        // Pegando o nome do serviço e o preço da Categoria Escolhida
        const produto_cliente = baseDeDadosProdutos.getPedidoServiceByName(_nomeDoServico, objectCategory)

        // Atualizando no carrinho
        this.pedido_cliente.total = this.pedido_cliente.total + produto_cliente.preco
    }



}

async function main() {
    let pedro = new Cliente(Chatbot)

    // user informa o que deseja
    let category_user = 'Cabelo'
    pedro.setCategoriaEscolhida(category_user)
    console.log(`Categoria escolhida = ${pedro.getCategoriaEscolhida()}`)

    //User informa o tipo de serviço que ele deseja
    let service_user = 'Corte de Cabelo'
    pedro.setServicoEscolhido(service_user)
    console.log(`Serviço Escolhido = ${pedro.getPedidoCliente()}\n\n`)

    // Adicionando no carrinho
    await pedro.adicionarPedidoCarrinho(service_user)
    console.log(`\n\nSeu Pedido Atual é: ${pedro.getPedidoCliente()} com o Preço Total de ${pedro.getPrecoTotal()} reais`)
}


//main()
module.exports = Cliente;