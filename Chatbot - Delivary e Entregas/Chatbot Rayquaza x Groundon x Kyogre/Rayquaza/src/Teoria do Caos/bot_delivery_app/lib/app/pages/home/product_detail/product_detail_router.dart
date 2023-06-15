import 'package:flutter/material.dart';
import '../../../core/ui/widgets/delivery_appbar.dart';
import '../../../models/product_model.dart';
import '../widgets/delivery_product_title.dart';

class ProductDetailPage extends StatelessWidget {
  const ProductDetailPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: DeliveryAppBar(),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 500,
            height: 500 * 0.3,
            decoration: BoxDecoration(
              image: DecorationImage(
                  image: NetworkImage(
                      'https://upload.wikimedia.org/wikipedia/commons/9/9a/Big_Mac_hamburger.jpg'),
                  fit: BoxFit.cover),
            ),
          ),

          const SizedBox(height: 20),
          Text(
            'Lanche X',
            style: Theme.of(context).textTheme.headline6,
          ),

          //codigo do professor
          Expanded(
            child: ListView.builder(
              itemBuilder: (context, index) {
                return DeliveryProductTitle(
                  // return product.name; --> Funciona no backend atraves do json de uma requisição com postman

                  product: ProductModel(
                      id: 0,
                      name: 'Lanche X',
                      description: 'Descrição do produto',
                      image:
                          'https://upload.wikimedia.org/wikipedia/commons/9/9a/Big_Mac_hamburger.jpg',
                      price: 15.0),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
