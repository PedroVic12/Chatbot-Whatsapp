import 'package:flutter/material.dart';
import 'package:web_socket_channel/io.dart';

class PedidoPage extends StatelessWidget {
  final WebSocketChannel channel =
      IOWebSocketChannel.connect('ws://localhost:8000/pedido');

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Realizar Pedido'),
      ),
      body: StreamBuilder(
        stream: channel.stream,
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            return Center(
              child: Text('Resposta do servidor: ${snapshot.data}'),
            );
          } else {
            return Center(
              child: Text('Aguardando resposta do servidor...'),
            );
          }
        },
      ),
    );
  }

  @override
  void dispose() {
    channel.sink.close();
    super.dispose();
  }
}
