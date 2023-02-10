import 'package:flutter/material.dart';

class DeliveryButton extends StatelessWidget {
  //TODO funções de callback
  final VoidCallback? btn_onPressed;

  final double? width;
  final double? height;
  final String label_text;

  const DeliveryButton(
      {super.key,
      required this.label_text,
      required this.btn_onPressed,
      this.width,
      this.height});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: btn_onPressed,
      child: Text(label_text),
    );
  }
}
