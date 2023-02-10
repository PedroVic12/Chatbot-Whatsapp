import 'package:flutter/material.dart';
import 'package:top_snackbar_flutter/custom_snack_bar.dart';
import 'package:top_snackbar_flutter/top_snack_bar.dart';

mixin Messages<T extends StatefulWidget> on State<T> {
  void showInfo(String message) {
    showTopSnackBar(Overlay.of(context),
        CustomSnackBar.success(message: message, backgroundColor: Colors.blue));
  }

  void showSucess(String message) {
    showTopSnackBar(
        Overlay.of(context),
        CustomSnackBar.success(
            message: message, backgroundColor: Colors.green));
  }

  void showError(String message) {
    showTopSnackBar(Overlay.of(context),
        CustomSnackBar.error(message: message, backgroundColor: Colors.red));
  }

  void showMessage(String message) {
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
      content: Text(message),
      duration: const Duration(seconds: 2),
    ));
  }
}
