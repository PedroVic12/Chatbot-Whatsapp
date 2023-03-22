import 'package:flutter/material.dart';

class AppBarDelivery extends StatelessWidget {
  const AppBarDelivery({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 15, horizontal: 15),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          InkWell(
            onTap: () {
              print('teste');
              Scaffold.of(context).openDrawer();
            },
            child: Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.withOpacity(0.5),
                    spreadRadius: 2,
                    blurRadius: 10,
                    offset: const Offset(0, 3), // changes position of shadow
                  ),
                ],
              ),
              child: Icon(Icons.menu),
            ),
          ),

          const Text('Delivery',
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),

          //! Teste de pesquisa
          Icon(Icons.search),
        ],
      ),
    );
  }
}
