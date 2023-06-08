import 'package:delivery_kyogre_getx/app/widgets/side_menu.dart';
import 'package:delivery_kyogre_getx/pikachu/ResponsiveWidget.dart';
import 'package:delivery_kyogre_getx/views/Screens.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../controllers/navigation/top_navigation/navigation/top_navigation.dart';


class Layout extends StatelessWidget {
  final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
        key: scaffoldKey,
        appBar: topNavigationBar(context,scaffoldKey),

        //Menu Lateral de Navega~ao
        drawer: Drawer(
          child: SideMenu(),
        ),

        // Responsividade
        body: ResponsiveWidget(
        largeScreen: LargeScreen(),

        // tela Default
        smallScreen:
        //child: localNavigator(),
        SmallScreen()
        )
    );
  }
}


