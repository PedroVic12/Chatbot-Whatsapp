import 'package:delivery_kyogre_getx/views/Dashboard/CardPedido.dart';
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

                  return Container(
                    child: Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          if (showPedidoAnimation) PedidoChegandoAnimation(),
                          SizedBox(height: _cardWidth / 64),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Container(
                                width: _cardWidth , // Defina a largura desejada para o CardPedido
                                //child: infoCards[0],
                              ),
                              InfoCard(
                                title: "Pedidos Recebidos",
                                value: "7",
                                onTap: () {},
                                isActive: true,
                              ),
                              SizedBox(width: _cardWidth / 64),
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
                              SizedBox(width: _cardWidth / 64),
                              Expanded(
                                child: Wrap(
                                  spacing: _cardWidth / 64,
                                  runSpacing: _cardWidth / 64,
                                  children: infoCards.sublist(1), // Restante dos InfoCards
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  );


                } else {
                  return Text('No data available');
                }
              } else if (snapshot.hasError) {
                if (snapshot.error is FileSystemException) {
                  return Text('No data available');
                } else {
                  return Text('Error: ${snapshot.error}');
                }
              } else {
                return Center(
                  child: CircularProgressIndicator(),
                );
              }
            },
          );
        },
      ),
    );
  }

  List<Widget> processJsonData(dynamic jsonData) {
    List<Widget> infoCards = [];

    if (jsonData != null && jsonData is Map<String, dynamic>) {
      String nome = jsonData['nome'];
      String telefone = jsonData['telefone'];
      dynamic carrinho = jsonData['carrinho'];
      double totalPrecoPedido = carrinho['totalPrecoPedido'];
      List<dynamic> itensPedido = carrinho['itensPedido'];
      String formaPagamento = jsonData['forma_pagamento'];
      String enderecoEntrega = jsonData['endereco_cliente'];

      // Cria a lista de mapas para os itens do pedido
      List<Map<String, dynamic>> itensPedidoData = [];

      for (var item in itensPedido) {
        String nomeItem = item['nome'];
        int quantidade = item['quantidade'];

        // Cria o mapa para cada item do pedido
        Map<String, dynamic> itemPedidoData = {
          'nome': nomeItem,
          'quantidade': quantidade,
        };

        itensPedidoData.add(itemPedidoData);
      }

      // Cria o PedidoCard com todas as informações do pedido
      CardPedido pedidoCard = CardPedido(
        nome: nome,
        telefone: telefone,
        itensPedido: itensPedidoData,
        totalPrecoPedido: totalPrecoPedido,
        formaPagamento: formaPagamento,
        enderecoEntrega: enderecoEntrega,
      );
      infoCards.add(pedidoCard);
    }

    return infoCards;
  }





}
