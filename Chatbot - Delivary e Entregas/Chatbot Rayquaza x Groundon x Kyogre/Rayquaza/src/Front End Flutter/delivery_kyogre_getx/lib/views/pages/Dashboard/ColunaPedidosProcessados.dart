import 'package:delivery_kyogre_getx/app/widgets/CustomText.dart';
import 'package:flutter/material.dart';

class ColunaPedidosProcessados extends StatelessWidget {
  const ColunaPedidosProcessados({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Expanded(
      flex: 1,
      child: Container(
        padding: EdgeInsets.all(8.0),
        child: Column(
          children: [
            CustomText(text: 'Pedidos sendo processados'),
            // Implemente a lista de pedidos em processamento aqui
          ],
        ),
      ),
    );
  }
}