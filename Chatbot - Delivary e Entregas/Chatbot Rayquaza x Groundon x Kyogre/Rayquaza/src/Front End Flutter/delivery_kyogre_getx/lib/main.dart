import 'package:delivery_kyogre_getx/views/HomePage.dart';
import 'package:delivery_kyogre_getx/pikachu/layout.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'controllers/PedidoController.dart';
import 'views/PedidoPage.dart';
import 'package:google_fonts/google_fonts.dart';

//TODO -> Menu controller 1:08

// TODO -> Ler Json do pedido

// TODO -> receber informações do backend em python

// TODO -> Apresentar pedido na tela quando receber o pedido

void main() {
  Get.put(MenuController());
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
      getPages: [
        GetPage(name: '/', page: () {
          return Layout();
        }),
        //GetPage(name: authenticationPageRoute, page: () => AuthenticationPage()),
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
        primarySwatch: Colors.blue,
      ),
      home: Layout(),
    );
  }
}