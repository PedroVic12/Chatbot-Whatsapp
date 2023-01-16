

const minhaLanchonete = new Lanchonete('Lanchonete do Zé', 'Rua das Lanchonetes, 123');

const xSalada = new Lanche('X-Salada', 15);
const xBacon = new Lanche('X-Bacon', 18);
const xEgg = new Lanche('X-Egg', 12);

minhaLanchonete.adicionarLanche(xSalada);
minhaLanchonete.adicionarLanche(xBacon);
minhaLanchonete.adicionarLanche(xEgg);

minhaLanchonete.exibirLanches();
minhaLanchonete.calcularVendas();