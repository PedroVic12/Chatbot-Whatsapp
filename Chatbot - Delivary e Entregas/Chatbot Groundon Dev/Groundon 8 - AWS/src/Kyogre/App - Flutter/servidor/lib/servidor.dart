import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;

class Servidor with ChangeNotifier {
  HttpServer? _server;
  bool _iniciado = false;

  bool get iniciado => _iniciado;

  Future<void> iniciar() async {
    final server = await HttpServer.bind('localhost', 3000);
    _server = server;

    print('Server running at http://${server.address.host}:${server.port}/');

    _iniciado = true;
    notifyListeners();

    await for (var request in server) {
      request.response
        ..headers.contentType = ContentType.text
        ..write('CHATBOT WHATSAPP GROUNDON')
        ..close();
    }
  }

  Future<void> parar() async {
    await _server?.close(force: true);
    _server = null;

    _iniciado = false;
    notifyListeners();
  }
}
