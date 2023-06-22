import 'package:delivery_kyogre_getx/app/widgets/CustomText.dart';
import 'package:delivery_kyogre_getx/views/pages/Dashboard/Pedido/PedidoControler.dart';
import 'package:flutter/material.dart';

class ColunaPedidosProcessados extends StatelessWidget {
  late final PedidoController pedidoController;

  @override
  Widget build(BuildContext context) {
    return Expanded(
      flex: 1,
      child: Container(
        padding: EdgeInsets.all(8.0),
        child: Column(
          children: [
            CustomText(text: 'Pedidos sendo processados'),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.green,
              ),
              onPressed: () {
                pedidoController.fetchPedidos();
              },
              child: Text('Atualizar Pedidos'),
            ),
            SizedBox(height: 10.0),
            // Implemente a lista de pedidos em processamento aqui
          ],
        ),
      ),
    );
  }
}