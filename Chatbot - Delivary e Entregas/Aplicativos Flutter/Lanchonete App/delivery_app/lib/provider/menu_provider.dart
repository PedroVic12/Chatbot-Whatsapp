import 'package:flutter/widgets.dart';

class Menu with ChangeNotifier {
  List<String> _menuItems = [];

  List<String> get menuItems => _menuItems;

  void addItem(String item) {
    _menuItems.add(item);
    notifyListeners();
  }

  void removeItem(String item) {
    _menuItems.remove(item);
    notifyListeners();
  }

  void clear() {
    _menuItems = [];
    notifyListeners();
  }
}
