import 'package:delivery_app/pages/home_page.dart';
import 'package:delivery_app/provider/menu_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';




void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => Menu(),
      child: MaterialApp(
        home: HomePage(),
      ),
    );
  }
}
