import 'package:delivery_kyogre_getx/app/widgets/CustomText.dart';
import 'package:delivery_kyogre_getx/views/pages/Dashboard/Pedido/CardPedido.dart';
import 'package:delivery_kyogre_getx/views/pages/Dashboard/Pedido/PedidoControler.dart';
import 'package:delivery_kyogre_getx/views/pages/Dashboard/Widgets/AlertaPedido.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:awesome_dialog/awesome_dialog.dart';

class AlertaPedido extends StatelessWidget {
  final String nomeCliente;
  final String enderecoPedido;

  const AlertaPedido({
    required this.nomeCliente,
    required this.enderecoPedido,
  });

  @override
  Widget build(BuildContext context) {
    final FilaDeliveryController filaController =
    Get.find<FilaDeliveryController>();

    return Obx(
          () => filaController.filaPedidos.isEmpty
          ? SizedBox()
          : ElevatedButton(
        onPressed: () {
          final pedido = filaController.removerPedido();

          AwesomeDialog(
            context: context,
            dialogType: DialogType.info,
            animType: AnimType.rightSlide,
            showCloseIcon: true,
            title: 'Pedido de $nomeCliente chegando!',
            desc: 'Endereço Pedido: $enderecoPedido copiar IFOOD',
            btnCancelOnPress: () {},
            btnOkOnPress: () {},
          ).show();
        },
        child: Text('Mostrar Alerta'),
      ),
    );
  }
}

class ColunaPedidosParaAceitar extends StatefulWidget {
  const ColunaPedidosParaAceitar({
    Key? key,
    required this.pedidoController,
  }) : super(key: key);

  final PedidoController pedidoController;

  @override
  _ColunaPedidosParaAceitarState createState() =>
      _ColunaPedidosParaAceitarState();
}

class _ColunaPedidosParaAceitarState extends State<ColunaPedidosParaAceitar> {
  final FilaDeliveryController filaController = Get.put(FilaDeliveryController());

  @override
  void initState() {
    super.initState();
    widget.pedidoController.startFetchingPedidos();
  }

  @override
  Widget build(BuildContext context) {
    return Expanded(
      flex: 1,
      child: Container(
        color: Colors.deepPurple,
        padding: EdgeInsets.all(8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            CustomText(text: 'Pedidos para serem Aceitos'),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.green,
              ),
              onPressed: () {
                widget.pedidoController.fetchPedidos();
              },
              child: Text('Atualizar Pedidos'),
            ),
            SizedBox(height: 8.0),
            Expanded(
              child: Obx(
                    () => ListView.builder(
                  itemCount: widget.pedidoController.pedidos.length,
                  itemBuilder: (context, index) {
                    final pedido = widget.pedidoController.pedidos[index];
                    return Dismissible(
                      key: Key(pedido['id'].toString()),
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
                        setState(() {
                          widget.pedidoController.removePedido(pedido);
                        });
                      },
                      child: GestureDetector(
                        onTap: () {
                          showDialog(
                            context: context,
                            builder: (context) => AlertaPedidoWidget(
                              nomeCliente: pedido['nome'],
                              enderecoPedido: pedido['endereco_cliente'],
                              itensPedido: pedido['itensPedido'],
                            ),
                          );
                        },
                        child: CardPedido(
                          nome: pedido['nome'],
                          telefone: pedido['telefone'],
                          itensPedido: (pedido['carrinho']['itensPedido']
                          as List<dynamic>)
                              .map((item) => item as Map<String, dynamic>)
                              .toList(),
                          totalPrecoPedido:
                          pedido['carrinho']['totalPrecoPedido']
                              .toDouble(),
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
    );
  }
}

