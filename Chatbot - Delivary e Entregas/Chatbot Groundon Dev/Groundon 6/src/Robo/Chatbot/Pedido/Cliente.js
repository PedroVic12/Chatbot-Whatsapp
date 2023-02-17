const Chatbot = require("../../Chatbot/chatbot");
const Carrinho = require("./Carrinho")
const Estagio5 = require("../stages/Estagio5")
const estagio5 = new Estagio5()
//const fetch = require("node-fetch");
const fetch = require('node-fetch-commonjs')


class Cliente {
    constructor(Chatbot, Carrinho) {
        //herança
        this.chatbot = Chatbot;
        this.carrinho = Carrinho;

        //atributos
        // this.nome = nome
        // this.telefone = telefone
    }

    //! Métodos do Carrinho
    BotpegarNomeProduto(string) {
        const _array = string.split("R$ ");
        return _array[0];
    }

    realizaPedido(message) {

        // Pega o item escolhido
        const produtoEscolhidoComPreco = this.chatbot.getLastMessage(message)
        let nome_produto = this.BotpegarNomeProduto(produtoEscolhidoComPreco)

        //Coloca o Produto no carrinho
        let array_teste = []

        nome_produto = nome_produto.replace('\n', '')
        array_teste.push(nome_produto)

        let produto_cliente = this.carrinho.getNameProductsMarket()
        array_teste.push(produto_cliente)

        //BUG NESSAS 2 LINHAS --> Ta esperando receber um array
        this.carrinho.adicionarProdutoCarrinho(produto_cliente);
        this.carrinho.setItens(nome_produto)
        this.carrinho.adicionarProdutoCarrinho(nome_produto)
        this.carrinho.adicionarProdutoCarrinho(array_teste)


        //Ver carrinho
        this.chatbot.enviarMensagem(message, ` adicionado ao carrinho!`)
    }

    verCarrinho() {
        return this.carrinho
    }

    //! Getters e Setters do Cliente
    getNome() {
        //return this.nome
    }

    getTelefone() {

    }



    getAdressByUser(message) {
        const enderecoCliente = this.chatbot.getLastMessage(message)

        this.chatbot.enviarMensagem(message, `Voce confirma seu endereço como ${enderecoCliente}?`)

        //this.chatbot.enviarBotao(message,`Voce confirma seu endereço como ${enderecoCliente}?`,['Sim', 'Não'])
    }


    //! Localização e Pagamento do Pedido
    async getAddressFromCoordinates(message) {
        //! Docs --> https://developers.google.com/maps/documentation/urls/get-started?hl=pt-br
        try {
            // Pegando dados da localização atual do WhatsApp
            const latitude = message.location.latitude;
            const longitude = message.location.longitude;

            // Obtendo o endereço
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY`);
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                const address = data.results[0].formatted_address;
                this.chatbot.enviarMensagem(message, `Endereço de entrega = ${address}`);
            } else {
                this.chatbot.enviarMensagem(message, `Não foi possível obter o endereço`);
            }
        } catch (error) {
            console.error(error);
        }
        // TODO armazena no banco de dados
    }




    getAdressClient() {

    }


    getLocation() {
        return this.chatbot.enviarMensagem(message, `Seu endereço de entrega = ${localizacaoCliente}`)
    }

    getLocationGoogleMaps() {

    }


    setPagamento(message) {
        const formaPagamento = this.chatbot.getLastMessage(message)
        return formaPagamento
    }

    getPagamento(message) {
        return this.chatbot.enviarMensagem(message, `Forma de Pagamento escolhida = ${this.setPagamento(message)}`)
    }


}



module.exports = Cliente;