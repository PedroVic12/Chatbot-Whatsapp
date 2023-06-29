const fs = require('fs');

class Comida {
    constructor(nome, price, ingredients, tipo) {
        this.nome = nome;
        this.price = price;
        this.ingredients = ingredients;
        this.tipo = tipo; // Adicionando a propriedade tipo
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    add(comida) {
        const node = {
            value: comida,
            left: null,
            right: null
        };

        if (this.root === null) {
            this.root = node;
        } else {
            this.addNode(this.root, node);
        }
    }

    addNode(currentNode, newNode) {
        if (newNode.value.nome < currentNode.value.nome) {
            if (currentNode.left === null) {
                currentNode.left = newNode;
            } else {
                this.addNode(currentNode.left, newNode);
            }
        } else {
            if (currentNode.right === null) {
                currentNode.right = newNode;
            } else {
                this.addNode(currentNode.right, newNode);
            }
        }
    }

    inorderTraversalByType(tipo, node = this.root) {
        if (node !== null) {
            if (node.value.tipo === tipo) {
                console.log(node.value);
            }
            this.inorderTraversalByType(tipo, node.left);
            this.inorderTraversalByType(tipo, node.right);
        }
    }
}

class DataBaseController {
    static criarSanduichesNaturaisFromJSON(json) {
        const sanduichesNaturais = JSON.parse(json);
        const listaSanduichesNaturais = [];

        for (const sanduicheNatural of sanduichesNaturais) {
            const { "Sanduíche Natural": nome, "Preço.3": price, "Preco 2": ingredients } = sanduicheNatural;
            const sanduicheNaturalObj = new Comida(nome, price, ingredients, 'natural');
            listaSanduichesNaturais.push(sanduicheNaturalObj);
        }

        return listaSanduichesNaturais;
    }

    static lerSanduichesNaturaisJSON(sanduicheTree, callback) {
        fs.readFile('./cardapio_2.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Erro ao ler o arquivo:', err);
                return;
            }

            const sanduichesNaturais = DataBaseController.criarSanduichesNaturaisFromJSON(data);
            for (const sanduiche of sanduichesNaturais) {
                sanduicheTree.add(sanduiche);
            }
            callback(sanduichesNaturais);
        });
    }

    static criarComidasFromJSON(json) {
        const comidas = JSON.parse(json);
        const listaComidas = [];

        for (const comida of comidas) {
            const { "Sanduíches Tradicionais": nome, "Preço.4": price, "Ingredientes": ingredients } = comida;
            const comidaObj = new Comida(nome, price, ingredients, 'tradicional');
            listaComidas.push(comidaObj);
        }

        return listaComidas;
    }

    static lerComidasJSON(comidaTree, callback) {
        fs.readFile('src/Chatbot Mega Groundon/repository/cardapio_1.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Erro ao ler o arquivo:', err);
                return;
            }

            const comidas = DataBaseController.criarComidasFromJSON(data);
            for (const comida of comidas) {
                comidaTree.add(comida);
            }
            callback(comidas);
        });
    }
}

const comidaTree = new BinaryTree();
const sanduicheTree = new BinaryTree();

// Ler o arquivo JSON de Comidas
DataBaseController.lerComidasJSON(comidaTree, (comidas) => {
    console.log('Árvore de Comidas Tradicionais:');
    comidaTree.inorderTraversalByType('tradicional');

    // Ler o arquivo JSON de Sanduíches Naturais
    DataBaseController.lerSanduichesNaturaisJSON(sanduicheTree, (sanduichesNaturais) => {
        console.log('\n\nÁrvore de Sanduíches Naturais:');
        sanduicheTree.inorderTraversalByType('natural');
    });
});
