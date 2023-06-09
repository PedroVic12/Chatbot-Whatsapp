import 'package:delivery_kyogre_getx/views/Dashboard/info_card.dart';
import 'package:flutter/material.dart';
import 'dart:io';
import 'dart:convert';

import '../../Teoria do Caos/animation_page.dart';

Future<dynamic> readJsonFile(String filePath) async {
  File file = File(filePath);
  if (await file.exists()) {
    String contents = await file.readAsString();
    dynamic jsonData = json.decode(contents);
    return jsonData;
  } else {
    throw Exception('File not found: $filePath');
  }
}


class OverViewCardsLarge extends StatefulWidget {
  const OverViewCardsLarge({Key? key}) : super(key: key);

  @override
  State<OverViewCardsLarge> createState() => _OverViewCardsLargeState();
}

class _OverViewCardsLargeState extends State<OverViewCardsLarge> {
  bool showPedidoAnimation = false;

  @override
  void initState() {
    super.initState();
    // Aqui você pode iniciar a escuta de um evento ou aguardar um evento para mostrar a animação do pedido
    // Quando o evento ocorrer, chame setState() para atualizar o estado da tela e mostrar a animação
    // Exemplo:
    // meuEvento.addListener(() {
    //   setState(() {
    //     showPedidoAnimation = true;
    //   });
    // });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: LayoutBuilder(
        builder: (context, constraints) {
          double _cardWidth = constraints.maxWidth / 4;

          return FutureBuilder<dynamic>(
            future: readJsonFile('lib/pikachu/rayquaza_db/pedido_data.json'),
            builder: (context, snapshot) {
              if (snapshot.connectionState == ConnectionState.done) {
                if (snapshot.hasData) {
                  // Dados do arquivo JSON
                  dynamic jsonData = snapshot.data;

                  // Processar e exibir os dados do JSON no terminal
                  processJsonData(jsonData);

                  // Processar os dados do JSON
                  List<Widget> infoCards = processJsonData(jsonData);

                  // Exibir apenas o primeiro InfoCard com os dados do JSON
                  Widget firstCard = infoCards.isNotEmpty ? infoCards[0] : SizedBox();

                  return Row(
                    children: [
                      if (showPedidoAnimation) PedidoChegandoAnimation(),

                      firstCard,
                      SizedBox(width: _cardWidth / 64),
                      InfoCard(
                        title: "Pedidos Recebidos",
                        value: "7",
                        onTap: () {},
                        isActive: true,
                      ),
                      InfoCard(
                        title: "Cancelled delivery",
                        value: "3",
                        onTap: () {},
                        isActive: true,
                      ),
                      SizedBox(width: _cardWidth / 64),
                      InfoCard(
                        title: "Scheduled deliveries",
                        value: "32",
                        onTap: () {},
                        isActive: true,
                      ),
                    ],
                  );
                } else {
                  return Text('No data available');
                }
              } else if (snapshot.hasError) {
                return Text('Error: ${snapshot.error}');
              } else {
                return CircularProgressIndicator();
              }
            },
          );
        },
      ),
    );
}

  List<Widget> processJsonData(dynamic jsonData) {
    List<Widget> infoCards = [];

    if (jsonData is List) {
      for (var data in jsonData) {
        String title = data['title'];
        String value = data['value'];

        InfoCard infoCard = InfoCard(
          title: title,
          value: value,
          onTap: () {},
          isActive: true,
        );

        infoCards.add(infoCard);
      }
    }

    return infoCards;
  }
}
