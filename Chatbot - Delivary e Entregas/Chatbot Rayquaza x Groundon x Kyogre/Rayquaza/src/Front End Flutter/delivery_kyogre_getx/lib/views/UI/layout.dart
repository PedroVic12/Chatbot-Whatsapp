import 'package:delivery_kyogre_getx/views/Screens.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class Layout extends StatefulWidget {
  const Layout({Key? key}) : super(key: key);

  @override
  State<Layout> createState() => _LayoutState();
}

class _LayoutState extends State<Layout> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 5,
        backgroundColor: Colors.white12,
      ),
      body: LargeScreen()
    );
  }
}
