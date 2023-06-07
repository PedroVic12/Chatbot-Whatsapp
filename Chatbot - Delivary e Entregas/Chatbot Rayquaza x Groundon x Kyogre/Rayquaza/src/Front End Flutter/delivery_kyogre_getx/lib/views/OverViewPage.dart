import 'package:delivery_kyogre_getx/app/widgets/CustomText.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';


// TODO -> 1:51


class OverViewPage extends StatelessWidget {
  const OverViewPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Obx(() => Row(
          children: [
            Container(
              margin: EdgeInsets.all(10),
              child: CustomText(
                text: 'Menu controler',
                size: 24,
                weight: FontWeight.bold,
              ),

            )
          ],
        ))
      ],
    );
  }
}
