import 'package:flutter/material.dart';

import 'package:flutter/material.dart';

class CategoryWidget extends StatelessWidget {
  final String imageName;

  const CategoryWidget({Key? key, required this.imageName}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 10.0),
      child: Container(
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(10),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.5),
              spreadRadius: 3,
              blurRadius: 10,
              offset: const Offset(0, 3),
            ),
          ],
        ),
        child: Image.asset(
          'Imagens/$imageName',
          width: 50,
          height: 50,
        ),
      ),
    );
  }
}
