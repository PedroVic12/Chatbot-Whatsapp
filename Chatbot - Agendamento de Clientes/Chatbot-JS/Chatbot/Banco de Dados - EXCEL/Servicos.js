// Definir a classe Servico
class Servico {
    constructor(nome, categoria, preco) {
        this.nome = nome;
        this.categoria = categoria;
        this.preco = preco;
    }
}

// Iterar pelo JSON e criar objetos Servico
const categorias = {};
for (const categoria in json) {
    if (Object.hasOwnProperty.call(json, categoria)) {
        const servicos = json[categoria];
        categorias[categoria] = servicos.map(servico => new Servico(servico.nome, servico.categoria, servico.preco));
    }
}
