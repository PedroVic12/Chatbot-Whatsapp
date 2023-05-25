import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:kyogre/views/pages/ItemDetailPage.dart';
import 'package:kyogre/widgets/AppBarDelivery.dart';
import 'package:kyogre/widgets/CategoriesWidget.dart';
import 'package:kyogre/widgets/DrawerWidget.dart';
import 'package:kyogre/widgets/HeaderTitle.dart';
import 'package:kyogre/widgets/NewestItensWdiget.dart';
import 'package:kyogre/widgets/PopularItensWidget.dart';

//!Paramos no minuto 28 do tutorial com a homePage

class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView(
        children: [
          const AppBarDelivery(),

          // search bar widget
          Padding(
            padding: EdgeInsets.symmetric(
              vertical: 10,
              horizontal: 15,
            ),
            child: Container(
              width: double.infinity,
              height: 50,
              decoration: BoxDecoration(
                  color: Colors.grey[200],
                  borderRadius: BorderRadius.circular(10),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.grey.withOpacity(0.5),
                      spreadRadius: 2,
                      blurRadius: 10,
                      offset: const Offset(0, 3), // changes position of shadow
                    )
                  ]),
              child: Padding(
                padding: EdgeInsets.symmetric(
                  horizontal: 10,
                ),
                child: Row(
                  children: [
                    Icon(
                      CupertinoIcons.search,
                      color: Colors.red,
                    ),

                    Container(
                        height: 30,
                        width: 500,
                        child: Padding(
                          padding: EdgeInsets.symmetric(
                            horizontal: 15,
                          ),
                          child: TextFormField(
                            decoration: InputDecoration(
                              border: InputBorder.none,
                              hintText: 'Search for restaurants or dishes',
                            ),
                          ),
                        )),

                    Icon(Icons.filter_list),

                    //! Simple Way
                    // const Icon(Icons.search),
                    // const SizedBox(
                    //   width: 10,
                    // ),
                    // const Text('Search for restaurants or dishes'),
                  ],
                ),
              ),
            ),
          ),

          //! Categoria Widget --> H1
          HeaderWidget(text: 'Categories'),

          //  mini Cards dos itens
          Row(
            children: [
              CategoryWidget(imageName: 'burger.png'),
              CategoryWidget(imageName: 'pizza.png'),
              CategoryWidget(imageName: 'burger.png'),
              CategoryWidget(imageName: 'pizza.png'),
              CategoryWidget(imageName: 'burger.png'),
              CategoryWidget(imageName: 'pizza.png'),
              CategoryWidget(imageName: 'burger.png'),
            ],
          ),

          //! Popular widget
          HeaderWidget(text: 'Itens Mais Vendidos'),

          SingleChildScrollView(
            scrollDirection: Axis.horizontal,
            child: Row(
              // ignore: prefer_const_literals_to_create_immutables
              children: [
                const PopularItemWidget(
                    imageName: 'pizza.png',
                    itemName: 'Pizza familia',
                    itemDescription: '8 Fatias',
                    itemPrice: 15),
                const PopularItemWidget(
                    imageName: 'pizza.png',
                    itemName: 'Pizza familia',
                    itemDescription: '8 Fatias',
                    itemPrice: 15),
                const PopularItemWidget(
                    imageName: 'pizza.png',
                    itemName: 'Pizza familia',
                    itemDescription: '8 Fatias',
                    itemPrice: 15),
                const PopularItemWidget(
                    imageName: 'pizza.png',
                    itemName: 'Pizza familia',
                    itemDescription: '8 Fatias',
                    itemPrice: 15),
                const PopularItemWidget(
                    imageName: 'pizza.png',
                    itemName: 'Pizza familia',
                    itemDescription: '8 Fatias',
                    itemPrice: 15),
                const PopularItemWidget(
                    imageName: 'pizza.png',
                    itemName: 'Pizza familia',
                    itemDescription: '8 Fatias',
                    itemPrice: 15),
              ],
            ),
          ),

          //! Promoções da semana
          InkWell(
            onTap: () {
              print('Clicou na promoção');
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => ItemDetailPage(),
                ),
              );
            },
            child: PromoItensWidget(
              productName: 'Pizza',
              description: 'description para pizza com novidades',
              price: 45,
              image_path: "pizza.png",
            ),
          ),

          PromoItensWidget(
            productName: 'Big Mac',
            description: 'description para pizza com novidades',
            price: 45,
            image_path: "burger.png",
          ),

          PromoItensWidget(
            productName: 'Quarteirão',
            description: 'description para pizza com novidades',
            price: 45,
            image_path: "burger.png",
          ),

          PromoItensWidget(
            productName: 'Triplo Cheese Burguer',
            description: 'description para pizza com novidades',
            price: 45,
            image_path: "burger.png",
          )
        ],
      ),
      drawer: DrawerWidget(),
      floatingActionButton: Container(
        decoration:
            BoxDecoration(borderRadius: BorderRadius.circular(20), boxShadow: [
          BoxShadow(
            color: Colors.grey.withOpacity(0.5),
            spreadRadius: 2,
            blurRadius: 10,
            offset: const Offset(0, 3), // changes position of shadow
          )
        ]),
        child: FloatingActionButton(
          onPressed: () {
            //Navegação com o Get
            Navigator.pushNamed(context, 'CartPage');
          },
          child: Icon(
            CupertinoIcons.cart,
            size: 28,
            color: Colors.yellow,
          ),
        ),
      ),
    );
  }
}
