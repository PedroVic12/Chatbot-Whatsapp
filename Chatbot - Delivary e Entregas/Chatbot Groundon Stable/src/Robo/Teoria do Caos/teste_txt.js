const fs = require('fs');

function atualizarNumeroPedidos() {
    // Lê o conteúdo do arquivo
    const arquivo = fs.readFileSync('arquivo.txt', 'utf8');


    // Usa uma expressão regular para extrair a data e o número de pedidos do texto
    const match = arquivo.match(/Números de Pedido == (\d+) em/);

    // Se não foi encontrado nenhum match, retorna
    if (!match) {
        console.log("Formato de arquivo inválido");
        return;
    }

    // Aumenta o número de pedidos
    const numeroDePedidos = Number(match[1]);
    const numeroDePedidosAtualizado = numeroDePedidos + 1;

    const arquivoAtualizado = arquivo.replace(/Números de Pedido == \d+ em/, `Números de Pedido == ${numeroDePedidosAtualizado} em`);
    fs.writeFileSync('arquivo.txt', arquivoAtualizado);

}