import 'package:servidor/server.dart';
import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart' as shelf_io;
import 'package:servidor/server.dart';

void main() async {
  Servidor _server = Servidor();

  final server = shelf_io.serve(
      (request) => Response(200,
          body:
              '<h1> Chatbot-Whatsapp Delivery <h1> <br> STATUS: Online <br> <br> PORTA RODANDO = 0.0.0.0:7000'),
      "localhost",
      7000);

  print("Nosso servidor esta rodando...");

  print(server);
}
