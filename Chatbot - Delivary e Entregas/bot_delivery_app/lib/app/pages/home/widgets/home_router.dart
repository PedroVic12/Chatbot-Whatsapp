import 'package:bot_delivery_frontend/app/pages/home/pagina_home.dart';
import 'package:bot_delivery_frontend/app/pages/home/widgets/home_controller.dart';
import 'package:bot_delivery_frontend/app/repositories/products/products_repository.dart';
import 'package:bot_delivery_frontend/app/repositories/products/products_repository_impl.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../home_page.dart';

class HomeRouter {
  // Classe criada para facilitar a navegação entre as páginas do app usando o provider

  HomeRouter._();

  static Widget get page => MultiProvider(
        providers: [
          // usa o provider para injetar a dependencia do dio
          Provider<ProductsRepository>(
            create: (context) => ProductsRepositoryImplementacao(
              dio: context.read(),
            ),
          ),

          // Provider para ajudar nos controlers
          Provider(
            create: (context) => HomeController(context.read()),
          ),
        ],
        child: const PaginaHome(),
      );
}
