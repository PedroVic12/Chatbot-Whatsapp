import 'dart:convert';
import 'dart:io';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:process_run/shell_run.dart';

class Servidor with ChangeNotifier {
  HttpServer _server;
  bool _iniciado = false;

  Future<void> iniciar() async {
    if (_iniciado) {
      return;
    }

    final server = await HttpServer.bind('localhost', 3000, shared: true);
    _server = server;

    print('Server running at http://${server.address.host}:${server.port}/');

    _iniciado = true;
    notifyListeners();

    await for (var request in server) {
      if (request.method == 'GET' && request.uri.path == '/executar-nodejs') {
        await _executarNodeJs(request);
      } else {
        request.response
          ..statusCode = HttpStatus.notFound
          ..close();
      }
    }
  }

  Future<void> _executarNodeJs(HttpRequest request) async {
    final code = await utf8.decoder.bind(request).join();
    final result = await _executarProcessoNodeJs(code);
    request.response
      ..headers.contentType = ContentType.text
      ..write(result)
      ..close();
  }

  Future<String> _executarProcessoNodeJs(String code) async {
    final processo = await runExecutable('node', arguments: ['-e', code]);
    final output = await processo.stdout.transform(utf8.decoder).join();
    return output;
  }

  Future<void> parar() async {
    await _server?.close();
    _iniciado = false;
    notifyListeners();
  }
}


// Nesse exemplo, adicionamos um novo endpoint /executar-nodejs que recebe um código Node.js por meio de uma solicitação HTTP POST e retorna a saída do código.

// O código Node.js é executado em segundo plano por meio do método _executarProcessoNodeJs, que usa a biblioteca process_run para executar o comando node -e [code].

// Para testar o endpoint, você pode usar uma ferramenta como curl ou Postman para enviar uma solicitação HTTP POST com o código Node.js:

// bash
// curl -X POST http://localhost:3000/executar-nodejs -d "console.log('Hello Node.js!');"
// Esse comando enviará um código Node.js que imprime a mensagem "Hello Node.js!" na saída padrão. A resposta do servidor deve ser a saída do código Node.js:

// bash
// Hello Node.js!



