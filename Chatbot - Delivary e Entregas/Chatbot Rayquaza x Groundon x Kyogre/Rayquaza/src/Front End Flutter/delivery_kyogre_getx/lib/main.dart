import 'package:delivery_kyogre_getx/views/HomePage.dart';
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
        GetPage(name: '/', page: () => HomePage(nomeCliente: 'Pedro Victor',endereco: 'Niteroi',horarioPedido: '13:40')),
        // Defina mais rotas aqui, se necessário
      ],
    );
  }
}
