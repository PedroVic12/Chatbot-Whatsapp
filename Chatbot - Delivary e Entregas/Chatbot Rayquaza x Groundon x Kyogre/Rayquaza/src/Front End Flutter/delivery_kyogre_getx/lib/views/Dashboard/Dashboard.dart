import 'package:delivery_kyogre_getx/Teoria%20do%20Caos/nightWolfAppBar.dart';
import 'package:delivery_kyogre_getx/views/Dashboard/CardPedido.dart';
import 'package:delivery_kyogre_getx/views/Dashboard/info_card.dart';
import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:get/get.dart';
import 'dart:async';

import '../../Teoria do Caos/animation_page.dart';

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
        if (jsonData is List<dynamic>) {
          final int previousLength = pedidos.length;
          pedidos.assignAll(jsonData);
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


  
  void removePedido(dynamic pedido) {

    //TODO remover arquivo json

    // Todo salvar todos os pedidos numa tabela do dia

    pedidos.remove(pedido);
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




class DashboardPage extends StatelessWidget {
  final PedidoController pedidoController = Get.put(PedidoController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: NightWolfAppBar(),
      body: Row(
        children: [
          Expanded(
            flex: 1,
            child: Container(
              padding: EdgeInsets.all(8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.green,
                    ),
                    onPressed: () {
                      pedidoController.fetchPedidos();
                    },
                    child: Text('Atualizar Pedidos'),
                  ),
                  SizedBox(height: 8.0),
                  Expanded(
                    child: Obx(
                          () => ListView.builder(
                        itemCount: pedidoController.pedidos.length,
                        itemBuilder: (context, index) {
                          final pedido = pedidoController.pedidos[index];

                          return Dismissible(
                            key: UniqueKey(),
                            background: Container(
                              color: Colors.red,
                              child: Align(
                                alignment: Alignment.centerRight,
                                child: Padding(
                                  padding: EdgeInsets.only(right: 16.0),
                                  child: Icon(
                                    Icons.delete,
                                    color: Colors.white,
                                  ),
                                ),
                              ),
                            ),
                            direction: DismissDirection.endToStart,
                            onDismissed: (direction) {
                              pedidoController.removePedido(pedido);
                            },
                            child: GestureDetector(
                              onTap: () {
                                showDialog(
                                  context: context,
                                  builder: (context) => AlertDialog(
                                    title: Text('Detalhes do Pedido'),
                                    content: Column(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        Text('Itens do Pedido:'),
                                        ListView.builder(
                                          shrinkWrap: true,
                                          itemCount: pedido['itensPedido'].length,
                                          itemBuilder: (context, index) {
                                            final item = pedido['itensPedido'][index];
                                            return ListTile(
                                              title: Text(item['nome']),
                                              subtitle: Text(item['descricao']),
                                              trailing: Text('R\$ ${item['preco']}'),
                                            );
                                          },
                                        ),
                                      ],
                                    ),
                                    actions: [
                                      ElevatedButton(
                                        onPressed: () {
                                          pedidoController.aceitarPedido(pedido);
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
                                  ),
                                );
                              },
                              child: CardPedido(
                                nome: pedido['nome'],
                                telefone: pedido['telefone'],
                                itensPedido: (pedido['carrinho']['itensPedido'] as List<dynamic>)
                                    .map((item) => item as Map<String, dynamic>)
                                    .toList(),
                                totalPrecoPedido: pedido['carrinho']['totalPrecoPedido'].toDouble(),
                                formaPagamento: pedido['forma_pagamento'],
                                enderecoEntrega: pedido['endereco_cliente'],
                              ),
                            ),
                          );
                        },
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          Expanded(
            flex: 1,
            child: Container(
              width: 200.0,
              padding: EdgeInsets.all(8.0),
              child: Obx(
                    () => InfoCard(
                  title: "Pedidos Recebidos",
                  value: pedidoController.pedidos.length.toString(),
                  onTap: () {
                    pedidoController.fetchPedidos();
                  },
                  isActive: true,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
