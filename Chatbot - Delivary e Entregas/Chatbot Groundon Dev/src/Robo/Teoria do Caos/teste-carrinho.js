let carrinho_dict = {
    nome: [],
    total: 0
}

let produtos_array = [
    { "nome": "pizza", "preco": 10 },
    { "nome": "x-salada", "preco": 12 },
    { "nome": "refrigerante", "preco": 5 }
];

function addCarrinho(...argumentos) {
    argumentos.forEach(arg => {
        let item = produtos_array.find(produto => produto.nome === arg);
        if (item) {
            carrinho_dict.nome.push(item.nome)
            carrinho_dict.total += item.preco
        }
    });
    console.log(`Itens do pedido: ${carrinho_dict.nome} \n Total do pedido = R$ ${carrinho_dict.total} reais`)
}

addCarrinho("pizza", "x-salada", "refrigerante");
