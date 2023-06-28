class DataBaseController {
  static criarSanduichesFromJSON(json) {
    const lanches = JSON.parse(json);
    const sanduiches = [];

    for (const lanche of lanches) {
      const { "Sanduíches Tradicionais": description, "Preço.4": price, Igredientes: ingredientes } = lanche;
      const sanduiche = new Sanduiche(description, price, ingredientes);
      sanduiches.push(sanduiche);
    }

    return sanduiches;
  }

  static lerSanduichesJSON(callback) {
    fs.readFile('sanduiches.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Erro ao ler o arquivo:', err);
        return;
      }

      const sanduiches = DataBaseController.criarSanduichesFromJSON(data);
      callback(sanduiches);
    });
  }
}

// Exemplo de uso
DataBaseController.lerSanduichesJSON((sanduiches) => {
  console.log(sanduiches);
});
