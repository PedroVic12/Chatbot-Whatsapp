import 'package:flutter/material.dart';

// Muitas vezes, precisamos de um valor de tamanho de tela, como altura ou largura, para definir o tamanho de um widget.
// Em vez de usar MediaQuery.of(context).size.height, podemos usar context.screen_height.
// Isso torna o código mais limpo e mais fácil de ler.
extension SizeExtension on BuildContext {
  double get scren_height => MediaQuery.of(this).size.height;
  double get screen_width => MediaQuery.of(this).size.width;

  double percent_height(double percent) => scren_height * percent;
  double percent_width(double percent) => screen_width * percent;
}
