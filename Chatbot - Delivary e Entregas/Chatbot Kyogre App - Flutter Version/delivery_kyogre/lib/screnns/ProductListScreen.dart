import 'package:flutter/material.dart';

class ProductListScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Lista de Produtos'),
      ),
      body: ListView(
        children: [
          ProductCard(
            name: 'Cerveja Pilsen',
            price: 4.99,
            image: AssetImage('assets/beer.jpg'),
          ),
          ProductCard(
            name: 'Vinho Tinto',
            price: 24.99,
            image: AssetImage('assets/wine.jpg'),
          ),
          // Adicione mais cartões de produtos aqui
        ],
      ),
    );
  }
}

class ProductCard extends StatelessWidget {
  final String name;
  final double price;
  final AssetImage image;

  ProductCard({required this.name, required this.price, required this.image});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        children: [
          Image(
            image: image,
            fit: BoxFit.cover,
          ),
          SizedBox(height: 8.0),
          Text(name),
          SizedBox(height: 8.0),
          Text('\$${price.toStringAsFixed(2)}'),
          SizedBox(height: 8.0),
          ElevatedButton(
            onPressed: () {
              // Lógica para adicionar produto ao carrinho
            },
            child: Text('Adicionar ao Carrinho'),
          ),
        ],
      ),
    );
  }
}
