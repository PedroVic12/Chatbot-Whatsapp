import 'package:flutter/material.dart';

//Classe criada para facilitar a criação de cores

class ColorsApp {
  static ColorsApp? _instance;

// COdigo em dart para criar uma classe singleton
  ColorsApp._();
  static ColorsApp get instance {
    _instance ??= ColorsApp._();
    return _instance!;
  }

//Colocando as cores do projeto
  Color get primary => const Color(0xFF007D21);
  Color get secundary => const Color(0xFFF88B0C);
}

//Extendendo
extension ColorsAppExtension on BuildContext {
  ColorsApp get coresAplicativo => ColorsApp.instance;
}
