import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'servidor.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (_) => Servidor(),
      child: MaterialApp(
        home: HomePage(),
      ),
    );
  }
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final servidor = Provider.of<Servidor>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text('Servidor HTTP'),
      ),
      body: Center(
        child: Text(
          servidor.iniciado ? 'Servidor iniciado' : 'Servidor parado',
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          if (servidor.iniciado) {
            await servidor.parar();
          } else {
            await servidor.iniciar();
          }
        },
        child: Icon(servidor.iniciado ? Icons.stop : Icons.play_arrow),
      ),
    );
  }
}
