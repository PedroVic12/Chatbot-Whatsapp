
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../../Teoria do Caos/menu_lateral.dart';
import '../../../Teoria do Caos/nightWolfAppBar.dart';
import '../Dashboard/OverViewCards/overview_cards_large.dart';
import '../Dashboard/OverViewCards/overview_cards_small.dart';



class LargePage extends StatelessWidget {
  LargePage({Key? key}) : super(key: key);

  final GlobalKey<ScaffoldState> _drawerKey = GlobalKey<ScaffoldState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: NightWolfAppBar(
        drawerKey: _drawerKey,
      ),
      drawer: Drawer(
        key: _drawerKey,
        // Adicione os itens do menu lateral aqui
      ),
      body: Container(
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(child: MenuLateral()),

              Expanded(
                  flex: 4,
                  child: Container(
                    child: OverViewCardsLarge(),
                    constraints: BoxConstraints.expand(),
                    color: CupertinoColors.systemYellow,
                  )),

            ],
      ),
      )
    );
  }
}


class LargeScreen extends StatelessWidget {
  const LargeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(child: MenuLateral()),

          Expanded(
              flex: 4,
              child: Container(
                child: OverViewCardsLarge(),
                constraints: BoxConstraints.expand(),
                color: CupertinoColors.activeOrange,
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
      color: CupertinoColors.activeGreen,
      constraints: BoxConstraints.expand(),
      child: OverViewCardsSmallScreen(),
    );
  }
}
