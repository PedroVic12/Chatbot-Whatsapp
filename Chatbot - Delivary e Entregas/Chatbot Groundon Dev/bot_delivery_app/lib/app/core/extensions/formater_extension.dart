import 'package:intl/intl.dart';

extension FormatterExtension on double {
  // extensão para formatar os preços com R$

  String get currencyPTBR {
    final currencyFormat = NumberFormat.currency(
      locale: 'pt_BR',
      symbol: r'R$'
    );
    return currencyFormat.format(this);
  }
}
