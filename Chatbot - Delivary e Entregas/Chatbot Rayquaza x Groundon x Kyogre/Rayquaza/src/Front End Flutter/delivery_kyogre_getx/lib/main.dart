import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'controllers/PedidoController.dart';
import 'views/PedidoPage.dart';

void main() {
  Get.put(PedidoController());
  runApp(MeuApp());
}

class MeuApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'Meu App',
      initialRoute: '/',
      getPages: [
        GetPage(name: '/', page: () => PedidoPage()),
        // Defina mais rotas aqui, se necessário
      ],
    );
  }
}
