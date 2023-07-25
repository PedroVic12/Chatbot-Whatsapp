import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

class DeepLinkPage extends StatelessWidget {
  final String deepLink = 'https://citta-lanchonete-cardapio-digital.com';





  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Deep Link Test'),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () => openDeepLink(),
          child: Text('Abrir Deep Link2 '),
        ),
      ),
    );
  }

  void openDeepLink() async {
    // Verifique se o aplicativo alvo está instalado no dispositivo
    if (await canLaunch(deepLink)) {
      await launch(deepLink);
    } else {
      // Caso não esteja instalado, você pode fazer algo aqui (ex: mostrar uma mensagem de erro)
      print('Aplicativo alvo não está instalado.');
    }
  }
}
