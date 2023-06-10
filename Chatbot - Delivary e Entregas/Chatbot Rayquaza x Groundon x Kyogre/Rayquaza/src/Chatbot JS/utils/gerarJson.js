const fs = require('fs');

function gerarPedidoJson(nomeCliente) {
    const pedido = {
        nome: nomeCliente,
        telefone: "21999289987",
        carrinho: {
            itensPedido: [
                {
                    nome: "Big Mac",
                    quantidade: 2
                },
                {
                    nome: "Coca Cola",
                    quantidade: 1
                },
                {
                    nome: "Açaí",
                    quantidade: 1
                }
            ],
            totalPrecoPedido: 100.0
        },
        forma_pagamento: "Dinheiro",
        endereco_cliente: "Niterói"
    };

    const caminho = "src/Server Python/repository";
    const nomeArquivo = `${caminho}/pedido_${nomeCliente.replace(' ', '_').toLowerCase()}.json`;
    const conteudoArquivo = JSON.stringify(pedido, null, 2);

    fs.writeFile(nomeArquivo, conteudoArquivo, (err) => {
        if (err) {
            console.error(`Erro ao criar o arquivo ${nomeArquivo}: ${err}`);
        } else {
            console.log(`Arquivo ${nomeArquivo} criado com sucesso.`);
        }
    });
}

function main() {
    const nomeCliente = "João da Silva";
    gerarPedidoJson(nomeCliente);
}

main();
