import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class ItemBottomNavBar extends StatelessWidget {
  const ItemBottomNavBar({super.key});

  @override
  Widget build(BuildContext context) {
    return BottomAppBar(
        child: Container(
      height: 70,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            'Total a pagar',
            style: TextStyle(fontSize: 19, fontWeight: FontWeight.bold),
          ),
          SizedBox(
            width: 15,
          ),
          Text(
            '\$80',
            style: TextStyle(
                fontSize: 19, fontWeight: FontWeight.bold, color: Colors.red),
          ),
          ElevatedButton.icon(
            onPressed: () {},
            style: ButtonStyle(
                backgroundColor: MaterialStateProperty.all(Colors.red[400]),
                padding: MaterialStateProperty.all(
                    EdgeInsets.symmetric(vertical: 13, horizontal: 20)),
                shape: MaterialStateProperty.all(
                  RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                )),
            icon: Icon(CupertinoIcons.cart),
            label: const Text(
              'Adicionar ao Carrinho',
              style: TextStyle(
                fontSize: 19,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ],
      ),
    ));
  }
}
