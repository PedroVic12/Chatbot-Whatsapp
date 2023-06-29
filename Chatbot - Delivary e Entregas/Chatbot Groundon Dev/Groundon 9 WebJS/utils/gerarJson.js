const fs = require('fs');

const criarDiretorioSeNaoExistir = (caminho) => {
    if (!fs.existsSync(caminho)) {
        fs.mkdirSync(caminho, { recursive: true });
    }
};

const gerarIdPedidoAleatorio = () => {
    const maximo = 9999; // Valor máximo do id_pedido
    return Math.floor(Math.random() * maximo);
};

const gerarPedidoJson = (nomeCliente) => {
    const idPedido = gerarIdPedidoAleatorio();
    const nomeArquivo = `pedido_${idPedido}.json`;

    const pedido = {
        id: idPedido,
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

    const caminho = "/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Delivary e Entregas/Chatbot Rayquaza x Groundon x Kyogre/Rayquaza/src/Server Python/repository";
    const nomeArquivoCompleto = `${caminho}/${nomeArquivo}`;
    const conteudoArquivo = JSON.stringify(pedido, null, 2);

    fs.writeFile(nomeArquivoCompleto, conteudoArquivo, (err) => {
        if (err) {
            console.error(`Erro ao criar o arquivo ${nomeArquivoCompleto}: ${err}`);
        } else {
            console.log(`Arquivo ${nomeArquivoCompleto} criado com sucesso.`);
        }
    });
};

const main = () => {
    const nomeCliente = "Elon Musk";
    criarDiretorioSeNaoExistir("./Server Python/repository");
    gerarPedidoJson(nomeCliente);
};

main();
