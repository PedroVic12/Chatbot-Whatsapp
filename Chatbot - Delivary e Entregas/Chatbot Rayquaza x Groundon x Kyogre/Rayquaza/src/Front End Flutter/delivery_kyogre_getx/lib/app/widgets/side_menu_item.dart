import 'package:delivery_kyogre_getx/app/widgets/horizontal_menu_item.dart';
import 'package:delivery_kyogre_getx/app/widgets/vertical_menu_item.dart';
import 'package:delivery_kyogre_getx/pikachu/ResponsiveWidget.dart';
import 'package:flutter/material.dart';

class SideMenuItem extends StatelessWidget {
  
  final String itemName;
  final Function onTap;
  
  
  const SideMenuItem({Key? key, required this.itemName, required this.onTap}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    if(ResponsiveWidget.isCustomSize(context))
      return VerticalMenuItem(itemName: itemName, onTap: onTap);

      return HorizontalMenuItem(itemName: itemName, onTap: onTap);
  }
}
