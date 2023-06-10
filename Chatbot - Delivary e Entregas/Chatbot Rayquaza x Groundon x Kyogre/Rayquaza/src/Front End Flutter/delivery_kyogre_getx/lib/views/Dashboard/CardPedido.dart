import 'package:flutter/material.dart';

class CardPedido extends StatelessWidget {
  final String nome;
  final String telefone;
  final List<Map<String, dynamic>> itensPedido; // Alterado para List<Map<String, dynamic>>
  final double totalPrecoPedido;
  final String formaPagamento;
  final String enderecoEntrega;

  const CardPedido({
    required this.nome,
    required this.telefone,
    required this.itensPedido,
    required this.totalPrecoPedido,
    required this.formaPagamento,
    required this.enderecoEntrega,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Resumo do Pedido de: $nome',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 8),
            Text('Telefone: $telefone'),
            SizedBox(height: 8),
            Text('Itens do Pedido: ${getItensPedidoText()}'),
            SizedBox(height: 8),
            Text('Total a pagar: R\$ ${totalPrecoPedido.toStringAsFixed(2)}'),
            SizedBox(height: 8),
            Text('Forma de Pagamento: $formaPagamento'),
            SizedBox(height: 8),
            Text('Endereço de Entrega: $enderecoEntrega'),
          ],
        ),
      ),
    );
  }

  String getItensPedidoText() {
    String itensText = '';
    for (var item in itensPedido) {
      String nomeItem = item['nome'];
      int quantidade = item['quantidade'];
      String itemText = '$nomeItem (Quantidade: $quantidade)';
      itensText += itemText + ', ';
    }
    itensText = itensText.trim().replaceAll(RegExp(r',\s*$'), '');
    return itensText;
  }
}
