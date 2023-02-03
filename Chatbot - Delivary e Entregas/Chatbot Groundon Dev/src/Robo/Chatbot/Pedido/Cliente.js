const Chatbot = require("../chatbot");
const Carrinho = require("./Carrinho")


class Cliente {
    constructor(Chatbot, Carrinho) {
        //herança
        this.chatbot = Chatbot;
        this.carrinho = Carrinho;


        // Atributos Dinamicos
        this.nome = 'nome';
        this.telefone = 0;
        this.endereco_cliente = '';
        this.forma_pagamento ='';

        this.pedido_cliente = {
            nome: this.getNome(),
            telefone: this.getPhoneNumber(),
            //pedido: this.carrinho.verCarrinho(),
            carrinho: this.verCarrinhoCliente(),
            pagamento: this.forma_pagamento,
            endereco: this.endereco_cliente
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

    getEndereco(){
        return this.endereco_cliente
    }

    //! Getters e Setters
    pegandoFormaPagamentoCliente(message) {
        const formaPagamento = this.chatbot.getLastMessage(message)
        return formaPagamento
    }

    setFormaPagamento(variable_payament){
        this.forma_pagamento = variable_payament
    }

    getPagamento() {
        return this.forma_pagamento
    }


    verCarrinhoCliente() {
        return this.carrinho;
    }





    //! Métodos que o usuario informa
    BotpegarNomeProduto(string) {
        // Método que depende da função realizaPedidoNovo
        const _array = string.split("R$ ");
        return _array[0];
    }
    realizaPedido(message) {
        try {
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
        } catch (err) {
            console.log(err);
        }

    }


    infoCLiente() {
        const info_object = {
            nome: this.getNome(),
            telefone: this.getPhoneNumber(),
            //pedido: this.carrinho.verCarrinho(),
            carrinho: this.verCarrinhoCliente(),
            pagamento: this.forma_pagamento,
        }
        return info_object;
    }
    gerarNotaFiscal() {
        // Formatação Bonita
        return `Resumo do Pedido de : *${this.nome}* \n Telefone = ${this.telefone} \n Itens do Pedido =${this.carrinho.getNomesProdutosPedido()} \n *Valor total do pedido:* R$ ${this.carrinho.getTotalPrecoPedido()} \n Forma de Pagamento = ${this.forma_pagamento} \n Endereço de Entrega = ${this.endereco_cliente}`
    }
    //! Métodos para pegar o endereço pela api do google

    async getAddressFromCoordinates(message) {
        //! Docs --> https://developers.google.com/maps/documentation/urls/get-started?hl=pt-br
        // Necessario fazer requisição
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


}



module.exports = Cliente;