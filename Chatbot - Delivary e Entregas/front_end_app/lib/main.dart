import 'package:flutter/material.dart';


List <String> = [
  "Arrumar o Curriculo",]
  "Gravar Aula MIT",
  "Terminar Fluxo do Chatbot"

];


void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: MyHomePage(),
    );
  }
}
