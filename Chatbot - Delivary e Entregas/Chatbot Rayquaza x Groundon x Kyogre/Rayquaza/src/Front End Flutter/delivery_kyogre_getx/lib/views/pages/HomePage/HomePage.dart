
import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {

  final String nomeCliente;
  final String endereco;
  final String horarioPedido;

  HomePage({ required this.nomeCliente, required this.endereco, required this.horarioPedido});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Gestao de Pedidos'),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('UI Desejada',style: TextStyle(
                fontSize: 20, fontWeight: FontWeight.bold
            )),
            Image.asset('lib/imagens/UI-Citta-Kyogre.png'),
            SizedBox(height: 8.0),
            Image.asset('lib/imagens/front end citta.png'),
            Text(
              //'Cliente: $nomeCliente',
              "Cliente: Pedro Victor",
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 16.0),
            Text(
              'Endereço de Entrega:',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),

            SizedBox(height: 16.0),
            Text(
              'Horário do Pedido: 13:37',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: () {
                // Lógica para aceitar o pedido
              },
              child: Text('Aceitar Pedido'),
            ),

          ],
        ),
      )
    );
  }
}