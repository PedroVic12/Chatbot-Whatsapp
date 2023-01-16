import 'package:flutter/material.dart';
import 'dart:io';
import 'package:http_server/http_server.dart';

// COMO FAZER WEB APP COM FLUTTER EM 2023
// ========== > https://www.apptunix.com/blog/flutter-web-app/


Future<void> startServer() async {
  var server = await HttpServer.bind(InternetAddress.loopbackIPv4, 8080);
  print('Ouvindo em http://${server.address.host}:${server.port}');
  await for (var request in server) {
    request.response.write('Olá, mundo!');
    await request.response.close();
  }
}

void main() {

  runApp(startServer());
}




