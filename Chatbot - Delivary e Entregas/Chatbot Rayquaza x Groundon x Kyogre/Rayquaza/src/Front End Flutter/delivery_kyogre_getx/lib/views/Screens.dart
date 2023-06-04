import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class LargeScreen extends StatelessWidget {
  const LargeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Expanded(child: Container(
          child: Text('Ola mundo'),
          color: CupertinoColors.destructiveRed,
        )),

        Expanded(
            flex: 5, child: Container(
          child: Text('Ola mundo'),
          color: Colors.blue,
        ))
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
      child: Text('Ola mundo'),
    );
  }
}
