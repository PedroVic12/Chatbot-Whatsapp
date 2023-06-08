import 'package:delivery_kyogre_getx/views/Dashboard/info_card.dart';
import 'package:flutter/material.dart';

class OverViewCardsLarge extends StatelessWidget {
  const OverViewCardsLarge({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {

    double _width = MediaQuery.of(context).size.width;

    return  Row(
      children: [
        InfoCard(
          title: "Rides in progress",
          value: "7",
          onTap: (){},
          isActive: true,
        ),
        SizedBox(
          width: _width / 64,
        ),
        InfoCard(
          title: "Packages delivered",
          value: "17",
          onTap: (){},
          isActive: true,
        ),

        InfoCard(
          title: "Cancelled delivery",
          value: "3",
          onTap: (){},
          isActive: true,

        ),
        SizedBox(
          width: _width / 64,
        ),
        InfoCard(
          title: "Scheduled deliveries",
          value: "32",
          onTap: (){},
          isActive: true,
        ),

      ],
    );
  }
}
