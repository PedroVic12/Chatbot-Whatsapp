const fs = require('fs');

const criarDiretorioSeNaoExistir = (caminho) => {
    if (!fs.existsSync(caminho)) {
        fs.mkdirSync(caminho, { recursive: true });
    }
};

const gerarPedidoJson = (nomeCliente) => {
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
                    nome: "Acai",
                    quantidade: 1
                }
            ],
            totalPrecoPedido: 100.0
        },
        forma_pagamento: "Dinheiro",
        endereco_cliente: "Niteroi"
    };

    const caminho = "/home/pedrov/Documentos/Chatbot-Whatsapp/Chatbot - Delivary e Entregas/Chatbot Rayquaza x Groundon x Kyogre/Rayquaza/src/Server Python/repository";
    const nomeArquivo = `${caminho}/pedido_${nomeCliente.replace(' ', '_').toLowerCase()}.json`;
    const conteudoArquivo = JSON.stringify(pedido, null, 2);

    fs.writeFile(nomeArquivo, conteudoArquivo, (err) => {
        if (err) {
            console.error(`Erro ao criar o arquivo ${nomeArquivo}: ${err}`);
        } else {
            console.log(`Arquivo ${nomeArquivo} criado com sucesso.`);
        }
    });
};

const main = () => {
    const nomeCliente = "Elon Musk";
    criarDiretorioSeNaoExistir("src/Server Python/repository");
    gerarPedidoJson(nomeCliente);
};

main();
