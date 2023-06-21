import 'package:http/http.dart' as http;
import 'dart:async';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'dart:convert';

class PedidoController extends GetxController {
  final pedidos = <dynamic>[].obs;

  final pedidosAceitos = <dynamic>[].obs;
  Timer? timer;

  @override
  void onInit() {
    startFetchingPedidos();
    super.onInit();
  }

  void startFetchingPedidos() {

    // Requisição Get a cada 5 segundos (loop)
    timer = Timer.periodic(Duration(seconds: 5), (Timer timer) {
      fetchPedidos();
    });
  }

  @override
  void onClose() {
    timer?.cancel();
    super.onClose();
  }

  Future<void> fetchPedidos() async {
    try {
      final response = await http.get(Uri.parse('http://localhost:5000/pedidos'));
      if (response.statusCode == 200) {
        final jsonData = json.decode(response.body);
        //print(jsonData);
        if (jsonData['results'] is List<dynamic>) {
          final int previousLength = pedidos.length;
          pedidos.assignAll(jsonData['results']);
          final int newLength = pedidos.length;

          if (newLength > previousLength) {
            final novoPedido = pedidos[newLength - 1];
            showNovoPedidoAlertDialog(novoPedido);
          }
        }
      } else {
        throw Exception('Failed to fetch pedidos');
      }
    } catch (e) {
      print('Erro ao fazer a solicitação GET: $e');
      throw Exception('Failed to fetch pedidos');
    }
  }



  void removePedido(dynamic pedido) async {
    final pedidoId = pedido['id'];

    // Faça a solicitação DELETE para excluir o pedido do servidor
    final response = await http.delete(Uri.parse('http://localhost:5000/deletarPedido/$pedidoId'));

    if (response.statusCode == 200) {

      // Agora você pode remover o pedido localmente
      pedidos.remove(pedido);

      // Exiba uma Snackbar informando que o pedido foi removido com sucesso
      Get.snackbar(
        'Sucesso',
        'Pedido removido com sucesso.',
        snackPosition: SnackPosition.TOP,
        duration: Duration(seconds: 3),
      );
    } else {
      // Exiba uma Snackbar informando o erro
      Get.snackbar(
        'Erro',
        'Falha ao remover o pedido.',
        snackPosition: SnackPosition.TOP,
        duration: const Duration(seconds: 3),
      );
    }
  }




  void aceitarPedido(dynamic pedido) {
    pedidosAceitos.add(pedido);
  }

  void showNovoPedidoAlertDialog(dynamic pedido) {
    Future.delayed(Duration.zero, () {
      final context = Get.context;
      if (context != null) {
        showDialog(
          context: context,
          builder: (context) {
            return AlertDialog(
              title: Text('Novo Pedido Recebido'),
              content: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Nome: ${pedido['nome'] ?? ''}'),
                  Text('Endereço de Entrega: ${pedido['endereco_cliente'] ?? ''}'),
                ],
              ),
              actions: [
                ElevatedButton(
                  onPressed: () {
                    aceitarPedido(pedido);
                    Navigator.pop(context);
                  },
                  child: Text('Aceitar Pedido'),
                ),
                TextButton(
                  onPressed: () {
                    Navigator.pop(context);
                  },
                  child: Text('Fechar'),
                ),
              ],
            );
          },
        );
      }
    });
  }

}
