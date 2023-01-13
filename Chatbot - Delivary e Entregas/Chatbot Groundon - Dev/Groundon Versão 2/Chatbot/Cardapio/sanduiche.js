const Cardapio = require("./Cardapio");

class Sanduiches extends Cardapio {
    constructor(id, nome, preco, ingredientes) {
        super(id, nome, preco);
        this.ingredientes = ingredientes;
    }
}


sanduiches_list = []

let americano = new Sanduiches(1, "Americano", 8,
    ["Pão de Forma",
        "Presunto",
        "Queijo",
        "Tomate",
        "Alface",
        "Ovo"
    ],
)


let bauru = new Sanduiches(2, "Bauru", 10,
    ["Pão de forma",
        "Queijo",
        "Filé (Carne Ou Frango)",
        "Ovo",
        "Tomate",
        "Alface",
    ])


let queijo_quente = new Sanduiches(3, "Queijo Quente", 7, [
    "Pão de forma",
    "Queijo",
])

sanduiches_list.push(americano, bauru, queijo_quente)


module.exports = Sanduiches
