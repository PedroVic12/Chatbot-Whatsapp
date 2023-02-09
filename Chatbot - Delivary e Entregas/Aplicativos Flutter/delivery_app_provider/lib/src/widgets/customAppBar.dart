import 'package:flutter/material.dart';

//! CODIGO DO CHATGPT O MENU FICA DO LADO DIREITO

class MyCustomAppBar extends StatelessWidget implements PreferredSizeWidget {
  final Widget child;
  final Drawer drawer;

  const MyCustomAppBar({
    Key? key,
    required this.child,
    required this.drawer,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: AppBar(
        title: child,
        actions: [
          IconButton(
            icon: Icon(Icons.menu),
            onPressed: () => Scaffold.of(context).openDrawer(),
          ),
        ],
      ),
    );
  }

  @override
  Size get preferredSize => Size.fromHeight(kToolbarHeight);
}
