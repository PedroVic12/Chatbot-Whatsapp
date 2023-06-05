import 'package:delivery_kyogre_getx/pikachu/ResponsiveWidget.dart';
import 'package:delivery_kyogre_getx/views/Screens.dart';
import 'package:delivery_kyogre_getx/pikachu/local_navigator.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../controllers/navigation/top_navigation/navigation/top_navigation.dart';


class Layout extends StatelessWidget {
  final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        key: scaffoldKey,
        appBar: topNavigationBar(context,scaffoldKey),
        drawer: Drawer(),
        body: ResponsiveWidget(
        largeScreen: LargeScreen(),
        smallScreen: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        child: localNavigator(),
    ),)
    );
  }
}


