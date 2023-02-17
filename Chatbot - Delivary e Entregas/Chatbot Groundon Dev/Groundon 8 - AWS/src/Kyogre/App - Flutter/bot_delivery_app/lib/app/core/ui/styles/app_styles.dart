import 'package:bot_delivery_frontend/app/core/ui/styles/colors_app.dart';
import 'package:flutter/material.dart';

//Classe criada para facilitar a criação de cores

class AppStyles {
  static AppStyles? _instance;

// COdigo em dart para criar uma classe singleton
  AppStyles._();
  static AppStyles get instance {
    _instance ??= AppStyles._();
    return _instance!;
  }

  ButtonStyle get primaryButton => ElevatedButton.styleFrom(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(10),
        ),
        backgroundColor: Color.fromARGB(255, 29, 87, 187),
        textStyle: TextStyle(
            fontWeight: FontWeight.bold, fontSize: 20, fontFamily: 'roboto'),
      );
}

extension AppStylesExtension on BuildContext {
  AppStyles get estiloAplicativo => AppStyles.instance;
}
