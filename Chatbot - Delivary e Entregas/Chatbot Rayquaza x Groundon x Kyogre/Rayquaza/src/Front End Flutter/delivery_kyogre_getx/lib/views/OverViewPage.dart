import 'package:delivery_kyogre_getx/app/widgets/CustomText.dart';
import 'package:delivery_kyogre_getx/controllers/Menu/MenuController.dart';
import 'package:delivery_kyogre_getx/pikachu/ResponsiveWidget.dart';
import 'package:delivery_kyogre_getx/views/Dashboard/overview_cards_large.dart';
import 'package:delivery_kyogre_getx/views/Dashboard/overview_cards_medium.dart';
import 'package:delivery_kyogre_getx/views/Dashboard/overview_cards_small.dart';
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
                text: MenuControler.instance.activeItem.value,
                size: 20,
                weight: FontWeight.bold,
              ),

            )
          ],
        )),

        Expanded(child: ListView(
          children: [

            if(ResponsiveWidget.isLargeScreen(context) || ResponsiveWidget.isMediumScreen(context))
              if (ResponsiveWidget.isCustomSize(context))
                OverviewCardsMediumScreen()
              else
                OverViewCardsLarge()
              else
                OverViewCardsSmallScreen()
          ],
        ))
      ],
    );
  }
}
