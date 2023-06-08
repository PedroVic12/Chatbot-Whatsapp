import 'package:delivery_kyogre_getx/views/Dashboard/info_card.dart';
import 'package:flutter/material.dart';
import 'dart:io';
import 'dart:convert';

Future<dynamic> readJsonFile(String filePath) async {
  File file = File(filePath);
  if (await file.exists()) {
    String contents = await file.readAsString();
    return json.decode(contents);
  } else {
    throw Exception('File not found: $filePath');
  }
}

class OverViewCardsLarge extends StatelessWidget {
  const OverViewCardsLarge({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        double _cardWidth = constraints.maxWidth / 4;

        return FutureBuilder<dynamic>(
          future: readJsonFile('lib/pikachu/rayquaza_db/pedido_data.json'), // Corrija o caminho do arquivo JSON aqui
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              // Dados do arquivo JSON
              dynamic jsonData = snapshot.data;

              // Criação do primeiro InfoCard com os dados do JSON
              String title = jsonData['title'].toString();
              String value = jsonData['value'].toString();
              InfoCard infoCard = InfoCard(
                title: title,
                value: value,
                onTap: () {},
                isActive: true,
              );

              return Row(
                children: [
                  infoCard,
                  SizedBox(
                    width: _cardWidth / 64,
                  ),
                  InfoCard(
                    title: "Packages delivered",
                    value: "17",
                    onTap: () {},
                    isActive: true,
                  ),
                  InfoCard(
                    title: "Cancelled delivery",
                    value: "3",
                    onTap: () {},
                    isActive: true,
                  ),
                  SizedBox(
                    width: _cardWidth / 64,
                  ),
                  InfoCard(
                    title: "Scheduled deliveries",
                    value: "32",
                    onTap: () {},
                    isActive: true,
                  ),
                ],
              );
            } else if (snapshot.hasError) {
              return Text('Error: ${snapshot.error}');
            } else {
              return CircularProgressIndicator();
            }
          },
        );
      },
    );
  }
}
