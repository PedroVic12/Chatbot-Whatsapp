// ignore_for_file: prefer_const_literals_to_create_immutables

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:kyogre/widgets/AppBarDelivery.dart';
import 'package:kyogre/widgets/CartBottomNavBar.dart';
import 'package:kyogre/widgets/DrawerWidget.dart';
import 'package:kyogre/widgets/HeaderTitle.dart';
import 'package:kyogre/widgets/ProductCard.dart';

class CartPage extends StatelessWidget {
  const CartPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView(
        children: [
          SingleChildScrollView(
            child: Center(
              child: Padding(
                padding: EdgeInsets.symmetric(vertical: 10),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    AppBarDelivery(),

                    HeaderWidget(text: 'Pedidos do Cliente'),

                    //Cards dos produtos selecionados
                    Padding(
                      padding: EdgeInsets.symmetric(vertical: 10),
                      child: Column(
                        children: [
                          const ProductCard(
                            productName: 'Pizza',
                            productImage: "Imagens/pizza.png",
                            productDescription: '8 Fatias',
                            productPrice: 50,
                          ),
                          const ProductCard(
                            productName: 'Refrigerante',
                            productImage: "Imagens/drink.png",
                            productDescription: '8 Fatias',
                            productPrice: 50,
                          ),
                          const ProductCard(
                            productName: 'Hamburguer',
                            productImage: "Imagens/burger.png",
                            productDescription: '8 Fatias',
                            productPrice: 50,
                          ),
                        ],
                      ),
                    ),

                    //Card Mostrando os pedidos
                    Padding(
                      padding:
                          EdgeInsets.symmetric(horizontal: 20, vertical: 30),
                      child: Container(
                        padding: EdgeInsets.all(20),
                        decoration: BoxDecoration(
                            color: Colors.blue,
                            borderRadius: BorderRadius.circular(10),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.grey.withOpacity(0.5),
                                spreadRadius: 3,
                                blurRadius: 10,
                                offset: const Offset(0, 3),
                              ),
                            ]),
                        child: Column(
                          children: [
                            Padding(
                              padding: EdgeInsets.symmetric(vertical: 10),
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    'Itens do Carrinho',
                                    style: TextStyle(
                                      fontSize: 20,
                                      fontWeight: FontWeight.normal,
                                    ),
                                  ),
                                  Text(
                                    '10',
                                    style: TextStyle(
                                      fontSize: 20,
                                      fontWeight: FontWeight.normal,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            Divider(
                              color: Colors.black,
                            ),
                            Padding(
                              padding: EdgeInsets.symmetric(vertical: 10),
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    'Total a compra: ',
                                    style: TextStyle(
                                      fontSize: 20,
                                      fontWeight: FontWeight.normal,
                                    ),
                                  ),
                                  Text(
                                    'R\$ 150,00',
                                    style: TextStyle(
                                      fontSize: 20,
                                      fontWeight: FontWeight.normal,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            Divider(
                              color: Colors.black,
                            ),
                            Padding(
                              padding: EdgeInsets.symmetric(vertical: 10),
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    'Custo de Delivery',
                                    style: TextStyle(
                                      fontSize: 20,
                                      fontWeight: FontWeight.normal,
                                    ),
                                  ),
                                  Text(
                                    'R\$ 20,00',
                                    style: TextStyle(
                                      fontSize: 20,
                                      fontWeight: FontWeight.normal,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            Divider(
                              color: Colors.black,
                            ),
                            Padding(
                              padding: EdgeInsets.symmetric(vertical: 10),
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(
                                    'Total a compra: ',
                                    style: TextStyle(
                                      fontSize: 20,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  Text(
                                    'R\$ 150,00',
                                    style: TextStyle(
                                        fontSize: 20,
                                        fontWeight: FontWeight.bold,
                                        color: Colors.red),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          )
        ],
      ),
      drawer: DrawerWidget(),
      bottomNavigationBar: CartBottomNavBar(),
    );
  }
}
