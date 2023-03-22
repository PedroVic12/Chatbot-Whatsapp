import 'package:clippy_flutter/arc.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:kyogre/widgets/AppBarDelivery.dart';
import 'package:kyogre/widgets/ItemBottomNavBar.dart';

class ItemDetailPage extends StatelessWidget {
  const ItemDetailPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('ItemDetailPage'),
      ),
      body: Padding(
        padding: EdgeInsets.only(top: 5),
        child: ListView(
          children: [
            AppBarDelivery(),
            Padding(
              padding: EdgeInsets.all(16),
              child: Image.asset(
                'Imagens/pizza.png',
                height: 100,
                width: 100,
              ),
            ),
            Arc(
                height: 30,
                edge: Edge.TOP,
                arcType: ArcType.CONVEY,
                child: Container(
                    width: double.infinity,
                    color: Colors.purple,
                    child: Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 20),
                      child: Column(
                        children: [
                          Padding(
                              padding: EdgeInsets.only(top: 60, bottom: 10),
                              child: Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  RatingBar.builder(
                                      initialRating: 4,
                                      minRating: 1,
                                      direction: Axis.horizontal,
                                      itemCount: 5,
                                      itemSize: 18,
                                      itemPadding:
                                          EdgeInsets.symmetric(horizontal: 4),
                                      itemBuilder: (context, _) => Icon(
                                            Icons.star,
                                            color: Colors.red,
                                          ),
                                      onRatingUpdate: (index) {}),
                                  Text(
                                    'R\$ 50 Reais',
                                    style: TextStyle(
                                        fontSize: 19,
                                        fontWeight: FontWeight.bold),
                                  ),
                                ],
                              )),
                          Padding(
                            padding: EdgeInsets.only(top: 10, bottom: 20),
                            child: Row(
                              children: [
                                Text(
                                  'Pizza Hot',
                                  style: TextStyle(
                                      fontSize: 28,
                                      fontWeight: FontWeight.bold),
                                ),

                                //!Botão aqui com gambiarra
                                Padding(
                                  padding: const EdgeInsets.symmetric(
                                      horizontal: 120),
                                  child: Container(
                                    width: 90,
                                    padding: EdgeInsets.all(5),
                                    decoration: BoxDecoration(
                                      color: Colors.red,
                                      borderRadius: BorderRadius.circular(10),
                                    ),
                                    child: Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        Icon(
                                          CupertinoIcons.add,
                                          color: Colors.white,
                                          size: 20,
                                        ),
                                        Text(
                                          '1',
                                          style: TextStyle(
                                              fontSize: 16,
                                              color: Colors.white,
                                              fontWeight: FontWeight.bold),
                                        ),
                                        Icon(
                                          CupertinoIcons.add,
                                          color: Colors.white,
                                          size: 20,
                                        ),
                                      ],
                                    ),
                                  ),
                                )
                              ],
                            ),
                          ),
                          Padding(
                            padding: EdgeInsets.symmetric(vertical: 10),
                            child: Text(
                              'Prove nossa pizza com os igredientes e bla bla bal',
                              style: TextStyle(fontSize: 16),
                              textAlign: TextAlign.justify,
                            ),
                          ),
                          Padding(
                            padding: EdgeInsets.symmetric(vertical: 15),
                          ),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                'Delivery Time: ',
                                style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold,
                                    fontStyle: FontStyle.italic),
                                textAlign: TextAlign.justify,
                              ),
                              Row(
                                children: [
                                  Padding(
                                    padding:
                                        EdgeInsets.symmetric(horizontal: 5),
                                    child: Icon(
                                      CupertinoIcons.clock,
                                      color: Colors.red,
                                    ),
                                  ),
                                  Text(
                                    '30 Minutos de preparo',
                                    style: TextStyle(
                                        fontSize: 16,
                                        fontWeight: FontWeight.bold,
                                        fontStyle: FontStyle.italic),
                                  )
                                ],
                              )
                            ],
                          ),
                        ],
                      ),
                    )))
          ],
        ),
      ),
      bottomNavigationBar: ItemBottomNavBar(),
    );
  }
}
