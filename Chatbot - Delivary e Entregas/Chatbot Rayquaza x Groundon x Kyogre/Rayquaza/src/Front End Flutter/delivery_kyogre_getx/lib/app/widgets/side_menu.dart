import 'package:delivery_kyogre_getx/app/widgets/CustomText.dart';
import 'package:delivery_kyogre_getx/app/widgets/side_menu_item.dart';
import 'package:delivery_kyogre_getx/pikachu/ResponsiveWidget.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class SideMenu extends StatelessWidget {
  const SideMenu({Key? key}) : super(key: key);

  @override

  Widget build(BuildContext context) {

    double _width = MediaQuery.of(context).size.width;

    return Container(
      color: Colors.lightBlueAccent,
      child: ListView(
        children: [
          if(ResponsiveWidget.isSmallScreen(context))
            Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                SizedBox(height: 40,),
                Row(

                  children: [
                    Text('Print'),

                    SizedBox(
                      width: _width /48,

                    ),
                    
                    Padding(padding: EdgeInsets.all(12),
                    //child: Image.asset('citta_logo.png'),),
                      child: Text('-> Logo da citta'),
                    ),

                    Flexible(child: CustomText(
                      text: 'DashBoard',
                      size: 20,
                      weight: FontWeight.bold,
                      color: CupertinoColors.activeOrange,
                    )),

                    SizedBox(
                      width: _width /48,
                    ),

                    Divider(
                      color: CupertinoColors.systemGrey.withOpacity(.1),
                    ),

                    Column(
                      children: [
                        Text('SUA NAVEGAÇÃO AQUI CAPITAO JACKSPARROW')
                      ],
                    )
                  ],
                )

              ],
            )
        ],
      )
    );
  }
}
