import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:kyogre/views/pages/CartPage.dart';
import 'package:kyogre/views/pages/HomePage.dart';
import 'package:kyogre/views/pages/ItemDetailPage.dart';
import 'package:kyogre/views/pages/UI/AgendamentoPage.dart';
import 'package:kyogre/views/pages/UI/TelaConfirmacao.dart';

import 'views/pages/UI/ServicesPage.dart';

void main() {
  runApp(const MyApp());
}

/* TODO
* - Verificar com o Backend com Python e MongoDB
* - Arrumar a navegação do app com Getx
* - Arrumar imagens e textos do aplicativo
* - Estudar paleta de cores correta
* - Implementar Funcionalidades no Botão
* - Gerar comprovante de Agendamento de Consulta
* - Fazer animações
* - SplashScreen
* - Integração com Calendario
* */

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          primarySwatch: Colors.red,
        ),
        //! Mudar aqui para uma navegação com o Get
        home: ItemDetailPage());
  }
}
