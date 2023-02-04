import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

// Classe para carregar as variáveis de ambiente
// vai no arquivo .env --> serve para esconder dados sensiveis
// esse método não é recomendando para projetos grandes e sim para pequenos

class Env {
  static Env? _instance;

// COdigo em dart para criar uma classe singleton
  Env._();
  static Env get instance {
    _instance ??= Env._();
    return _instance!;
  }

// função para carregar as variáveis de ambiente --> vai no main.dart
  Future<void> load() async {
    dotenv.load();
  }

  String operator [](String key) => dotenv.env[key] ?? '';
}
