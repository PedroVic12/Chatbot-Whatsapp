
import 'package:delivery_kyogre_getx/Teoria%20do%20Caos/nightWolfAppBar.dart';
import 'package:delivery_kyogre_getx/views/pages/Dashboard/ColunaInfoPedidos.dart';
import 'package:delivery_kyogre_getx/views/pages/Dashboard/ColunaPedidosCozinha.dart';
import 'package:delivery_kyogre_getx/views/pages/Dashboard/ColunaPedidosProcessados.dart';
import 'package:delivery_kyogre_getx/views/pages/Dashboard/Pedido/PedidoControler.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class DashboardPage extends StatelessWidget {
  final PedidoController pedidoController = Get.put(PedidoController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: NightWolfAppBar(),
      body: Row(
        children: [
          ColunaPedidosParaAceitar(pedidoController: pedidoController),
          ColunaPedidosProcessados(),
          ColunaInfoPedidos(pedidoController: pedidoController),
        ],
      ),
    );
  }
}





