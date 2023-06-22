import 'package:delivery_kyogre_getx/views/pages/Dashboard/InfoCard/info_card.dart';
import 'package:delivery_kyogre_getx/views/pages/Dashboard/Pedido/PedidoControler.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:flutter/cupertino.dart';

class ColunaInfoPedidos extends StatelessWidget {
  const ColunaInfoPedidos({
    Key? key,
    required this.pedidoController,
  }) : super(key: key);

  final PedidoController pedidoController;

  @override
  Widget build(BuildContext context) {
    return Expanded(
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
    );
  }
}
