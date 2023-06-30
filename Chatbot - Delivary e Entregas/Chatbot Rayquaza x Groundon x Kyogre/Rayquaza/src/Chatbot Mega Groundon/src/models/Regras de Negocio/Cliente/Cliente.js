const Carrinho = require("../Pedido/Carrinho");
const fs = require('fs');
const Pedido = require('../Pedido/Pedido')

class Cliente extends Pedido {
    constructor() {
        super()

        // Atributos Dinamicos
        this.nome = '';
        this.telefone = 0;
        this.endereco_cliente = '';
        this.forma_pagamento = '';
    }


    //! Getters e Setters
    set_nome(name) {
        this.nome = name;
    }
    get_nome() {
        return this.nome;
    }

    setPhoneNumber(phone_number) {
        this.telefone = phone_number;

    }
    getPhoneNumber() {
        return this.telefone;
    }

    setEndereco(address) {
        this.endereco_cliente = address
    }

    getEndereco() {
        return this.endereco_cliente
    }


    setFormaPagamento(variable_payament) {
        this.forma_pagamento = variable_payament
    }

    getPagamento() {
        return this.forma_pagamento
    }



    //! Métodos que o usuario informa
    BotpegarNomeProduto(string) {
        const _array = string.split("R$ ");
        return _array[0];
    }

    realizaPedido(message) {
        try {

            //TODO ta pegando apenas o nome e nao o preco, ver como vai ficar vindo a informacao da lista do wpp

            const nome_produto = this.BotpegarNomeProduto(message);
            this.carrinho.adicionarProdutos(nome_produto);
            //this.carrinho.setItens([nome_produto]);
            //?this.chatbot.enviarMensagem(message, `${nome_produto} adicionado ao carrinho!`);
            console.log(`\n${nome_produto} adicionado ao carrinho!!`)

        } catch (err) {
            console.log(err);
        }
    }

    gerarNotaFiscal() {

        try {
            const pedidoJson = this.gerarPedidoJson();
            //console.log(pedidoJson);
        } catch (err) {
            console.log('Não foi possivel gerar json', err);
        }


        const totalPagar = this.carrinho.getTotalPrecoPedido();
        // Formatação Bonita
        console.log('\n\n');
        return `Resumo do Pedido de : *${this.nome}* \nTelefone = ${this.telefone} \nItens do Pedido = ${this.carrinho.getNomesProdutosPedido()} \n*Total a pagar =* R$ ${totalPagar} \nForma de Pagamento = ${this.forma_pagamento} \nEndereço de Entrega = ${this.endereco_cliente}`;
    }




    gerarPedidoJson() {
        const id = Math.floor(Math.random() * 9000) + 1000; // Gera um número aleatório de 4 dígitos

        const itensPedido = this.carrinho.getNomesProdutosPedido().reduce((accumulator, nome) => {
            const existingItem = accumulator.find(item => item.nome === nome);
            const produto = produtos_cardapio.find(p => p.nome === nome);
            const preco = produto ? produto.preco : 0;
            if (existingItem) {
                existingItem.quantidade++;
                existingItem.preco += preco;
            } else {
                accumulator.push({ nome, quantidade: 1, preco });
            }
            return accumulator;
        }, []);

        const totalPrecoPedido = itensPedido.reduce((total, item) => total + item.preco, 0);

        const pedidoJson = {
            id,
            nome: this.nome,
            telefone: this.telefone,
            carrinho: {
                itensPedido,
                totalPrecoPedido
            },
            forma_pagamento: this.forma_pagamento,
            endereco_cliente: this.endereco_cliente
        };

        const pedidoJsonString = JSON.stringify(pedidoJson, null, 2);
        const nomeArquivo = `../output/pedido_${id}.json`;

        fs.writeFile(nomeArquivo, pedidoJsonString, 'utf8', (err) => {
            if (err) {
                console.error(`Erro ao salvar o arquivo ${nomeArquivo}:`, err);
            } else {
                console.log(`Arquivo ${nomeArquivo} salvo com sucesso!`);
            }
        });

        return pedidoJsonString;
    }



}



module.exports = Cliente;