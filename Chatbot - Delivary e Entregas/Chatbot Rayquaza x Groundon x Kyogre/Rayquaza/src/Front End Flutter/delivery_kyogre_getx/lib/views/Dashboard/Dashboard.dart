import 'package:delivery_kyogre_getx/views/Dashboard/CardPedido.dart';
import 'package:delivery_kyogre_getx/views/Dashboard/info_card.dart';
import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:get/get.dart';

import '../../Teoria do Caos/animation_page.dart';

class PedidoController extends GetxController {
  final pedidos = <dynamic>[].obs;

  @override
  void onInit() {
    fetchPedidos();
    super.onInit();
  }

  Future<void> fetchPedidos() async {
    try {
      final response = await http.get(Uri.parse('http://localhost:8000/pedidos'));
      if (response.statusCode == 200) {
        final jsonData = json.decode(response.body);
        if (jsonData is List<dynamic>) {
          pedidos.value = jsonData;
        }
      } else {
        throw Exception('Failed to fetch pedidos');
      }
    } catch (e) {
      print('Erro ao fazer a solicitação GET: $e');
      throw Exception('Failed to fetch pedidos');
    }
  }
}

class DashboardPage extends StatelessWidget {
  final PedidoController pedidoController = Get.put(PedidoController());

  bool showPedidoAnimation = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('DashBoard de Pedidos'),
      ),
      body: LayoutBuilder(
        builder: (context, constraints) {
          double _cardWidth = constraints.maxWidth / 4;

          return Obx(
                () => Container(
              child: Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    if (showPedidoAnimation) PedidoChegandoAnimation(),
                    SizedBox(height: _cardWidth / 64),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        for (var pedido in pedidoController.pedidos)
                          Container(
                            width: _cardWidth,
                            child: CardPedido(
                              nome: pedido['nome'],
                              telefone: pedido['telefone'],
                              itensPedido: (pedido['carrinho']['itensPedido'] as List<dynamic>)
                                  .map((item) => item as Map<String, dynamic>)
                                  .toList(),
                              totalPrecoPedido: pedido['carrinho']['totalPrecoPedido'],
                              formaPagamento: pedido['forma_pagamento'],
                              enderecoEntrega: pedido['endereco_cliente'],
                            ),
                          ),
                      ],
                    ),
                    SizedBox(height: _cardWidth / 64),
                    Center(
                      child: InfoCard(
                        title: "Pedidos Recebidos",
                        value: pedidoController.pedidos.length.toString(),
                        onTap: () {},
                        isActive: true,
                      ),
                    ),
                  ],
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
