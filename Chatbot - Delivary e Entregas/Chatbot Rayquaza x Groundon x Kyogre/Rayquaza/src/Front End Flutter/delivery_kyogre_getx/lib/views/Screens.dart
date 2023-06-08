import 'package:delivery_kyogre_getx/app/widgets/side_menu.dart';
import 'package:delivery_kyogre_getx/views/Dashboard/overview_cards_large.dart';
import 'package:delivery_kyogre_getx/views/Dashboard/overview_cards_small.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class LargeScreen extends StatelessWidget {
  const LargeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [

        //!
        //Expanded(child: SideMenu()),
        //Expanded(flex: 5,child: localNavigator()),

        Expanded(child: Container(
          child: OverViewCardsLarge(),
          color: CupertinoColors.destructiveRed,
        )),


      ],
    );
  }
}

class SmallScreen extends StatelessWidget {
  const SmallScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.green,
      constraints: BoxConstraints.expand(),
      child: OverViewCardsSmallScreen(),
    );
  }
}
