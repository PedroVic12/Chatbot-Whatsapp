import 'package:flutter/material.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';

//TODO estudar o que é um mixin

mixin Loader<T extends StatefulWidget> on State<T> {
  //Todo Orientação a objetos?

  var isOpen = false;

  void showLoader() {
    if (!isOpen) {
      isOpen = true;
      showDialog(
          context: context,
          //barrierDismissible: false,
          builder: (context) {
            return LoadingAnimationWidget.threeArchedCircle(
                color: Colors.white, size: 60);
          });
    }
  }

  void hideLoader() {
    if (isOpen) {
      isOpen = false;
      Navigator.of(context).pop();
    }
  }
}
