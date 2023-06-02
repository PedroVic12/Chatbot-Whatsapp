import 'dart:convert';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;

class PedidoController extends GetxController {
  String jsonUrl = 'https://seu_chatbot.com/cliente.json';// Substitua pela URL correta do seu chatbot

  List<String> pedidos = ['Arroz', 'Frango', 'Guaravita'];

  Future<Map<String, dynamic>> buscarInformacoesCliente() async {
    final response = await http.get(Uri.parse(jsonUrl));

    if (response.statusCode == 200) {
      final jsonBody = json.decode(response.body);
      return jsonBody;
    } else {
      throw Exception('Erro ao buscar informações do cliente');
    }
  }
}
