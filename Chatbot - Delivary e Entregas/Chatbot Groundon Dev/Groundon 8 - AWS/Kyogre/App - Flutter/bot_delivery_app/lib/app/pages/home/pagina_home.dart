//import 'package:bot_delivery_app/app/bot_delivery_app.dart';
import 'package:bot_delivery_frontend/app/models/product_model.dart';
import 'package:bot_delivery_frontend/app/pages/home/widgets/delivery_product_title.dart';
import 'package:bot_delivery_frontend/app/pages/home/widgets/home_controller.dart';
import 'package:bot_delivery_frontend/app/pages/home/widgets/home_state.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:provider/provider.dart';
import '../../core/ui/helpers/loader.dart';
import '../../core/ui/helpers/messages.dart';
import '../../core/ui/widgets/delivery_appbar.dart';

class PaginaHome extends StatefulWidget {
  const PaginaHome({super.key});

  @override
  State<PaginaHome> createState() => _HomePageState();
}

class _HomePageState extends State<PaginaHome> with Loader, Messages {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: DeliveryAppBar(),
      //!BOTÃO QUE A GENTE CRIOU COM O FLOATING ACTION BUTTON
      floatingActionButton: FloatingActionButton(
          onPressed: () async {
            showLoader();
            Future.delayed(Duration(seconds: 3), () {
              hideLoader();
            });

            showSucess('Dinheiro enviado na sua conta com sucesso!');
          },
          child: Icon(Icons.add)),

      body: Column(
        children: [
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
