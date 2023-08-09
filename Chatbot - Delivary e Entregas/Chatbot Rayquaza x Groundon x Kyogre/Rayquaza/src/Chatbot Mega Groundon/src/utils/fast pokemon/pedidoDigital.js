function getPedidoCardapio(pedidoString) {
    const lines = pedidoString.split('\n').map(line => line.trim());

    // Encontrar o nome do cliente
    const nomeClienteLine = lines.find(line => line.startsWith('Cliente:'));
    const nomeCliente = nomeClienteLine ? nomeClienteLine.split(': ')[1] : null;

    // Encontrar o número do pedido
    const numeroPedidoLine = lines.find(line => line.startsWith('Pedido #'));
    const numeroPedido = numeroPedidoLine ? parseInt(numeroPedidoLine.split('#')[1], 10) : null;

    // Encontrar os itens do pedido
    const startItensIndex = lines.indexOf('� Itens do Pedido:');
    const endItensIndex = lines.findIndex(line => line.startsWith('---'));
    const itensLines = lines.slice(startItensIndex + 1, endItensIndex);
    const itensList = itensLines.map(itemLine => {
        const parts = itemLine.split(' ');
        const quantidade = parseInt(parts[0], 10);
        const precoStr = itemLine.match(/\(R\$ (.+)\)/)[1].trim(); // Extração usando regex
        const preco = parseFloat(precoStr);
        const nome = parts.slice(1, parts.length - 3).join(' '); // Pegando todas as palavras até o preço
        return {
            quantidade: quantidade,
            nome: nome,
            preco: preco
        };
    });

    // Encontrar o total
    const totalLine = lines.find(line => line.startsWith('� TOTAL:'));
    const total = totalLine ? parseFloat(totalLine.split('R$')[1]) : null;

    return {
        nome: nomeCliente,
        pedido: numeroPedido,
        itens: itensList,
        total: total
    };
}

// Testando a função
const pedidoString = `
� RESUMO DO PEDIDO 
   Cliente: anakin

 Pedido #5395

  � Itens do Pedido:
   
1x Açai Tradicional (R$ 14)

2x Bauru (R$ 30)
   -------------------------------------
           � TOTAL: R$74.00
   -------------------------------------
   � Tempo de Entrega: aprox. 09:20 a 09:55
`;

console.log(getPedidoCardapio(pedidoString));
