import 'package:delivery_kyogre_getx/Kyogre/UI/GridView.dart';
import 'package:delivery_kyogre_getx/pikachu/layout.dart';
import 'package:delivery_kyogre_getx/views/pages/Dashboard/DashBoardPage.dart';
import 'package:delivery_kyogre_getx/views/pages/Dashboard/Dashboard.dart';
import 'package:delivery_kyogre_getx/views/pages/Dashboard/Pedido/PedidoControler.dart';
import 'package:delivery_kyogre_getx/views/pages/Screens/DeepLinkPage.dart';
import 'Teoria do Caos/RestAPI/RestApiHttp.dart';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';

//TODO -> Menu controller 1:08

// TODO -> Apresentar pedido na tela quando receber o pedido

void main() {
  Get.put(MenuController());
  Get.put(PedidoController());

  //Get.put(NavigationController());
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      //initialRoute: authenticationPageRoute,
      //unknownRoute: GetPage(name: '/not-found', page: () => PageNotFound(), transition: Transition.fadeIn),


      // TODO Navegação Padrão
      getPages: [
        GetPage(name: '/', page: () => Layout()),
        GetPage(name: '/pedido', page: () => RestApiPage()), //! Change Here
        GetPage(name: '/dash', page: () => DashboardPage()),
        GetPage(name: '/layoutDesign', page: ()=> CartaoGridView()),
        GetPage(name: '/cardapioDigital', page: ()=> DeepLinkPage())
      ],
      
      debugShowCheckedModeBanner: false,
      title: 'Dashboard',
      theme: ThemeData(
        scaffoldBackgroundColor: Colors.blueAccent,
        textTheme: GoogleFonts.mulishTextTheme(Theme.of(context).textTheme).apply(
            bodyColor: Colors.black
        ),
        pageTransitionsTheme: PageTransitionsTheme(
            builders: {
              TargetPlatform.iOS: FadeUpwardsPageTransitionsBuilder(),
              TargetPlatform.android: FadeUpwardsPageTransitionsBuilder(),
            }
        ),
        primarySwatch: Colors.blueGrey,
      ),
      home: Layout(),
    );
  }
}