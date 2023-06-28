const fs = require('fs');


class LancheModel {
  constructor(description, price) {
    this.description = description;
    this.price = price;
  }
}

class Sanduiche extends LancheModel {
  constructor(description, price, ingredientes) {
    super(description, price);
    this.ingredientes = ingredientes;
  }
}


