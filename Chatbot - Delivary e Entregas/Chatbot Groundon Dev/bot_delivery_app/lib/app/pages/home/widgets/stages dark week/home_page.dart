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

//!O QUE ESTUDAR
//!1 - BlocConsumer
//!2 - Preparar nosso estaddo e os status da tela
// - Preparar o BaseState
//!3 - Criar o nosso controller
//!4 - Link entre o controller e o repository
//!5 - Link entre o controller e o frontend

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> with Loader, Messages {
  //!Backend para carregar os produtos

  //TODO PEGAR OS PRODUTOS
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
      // context.read<HomeController>().loadProducts();
    });
  }

//!Frontend para exibir os produtos
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

        //!Codigo para compilação de todo o meu codigo
        body: BlocConsumer<HomeController, HomeState>(
          listener: (context, state) {
            state.status.matchAny(
              loading: () => showLoader(),
              any: () => hideLoader(),
            );
          },

          //buildWhen: (previous, current) => current.status.matchAny(any()=> false, initial: () => true),),

          builder: (context, state) {
            return Column(
              children: [
                Expanded(
                  child: ListView.builder(
                    itemCount: state.products.length,
                    itemBuilder: (context, index) {
                      final product = state.products[index];

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
            );
          },
        ));
  }
}
