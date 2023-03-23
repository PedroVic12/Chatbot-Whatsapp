import 'package:get/state_manager.dart';
import 'package:kyogre/models/Item/Item.dart';

class CartController extends GetxController {
  final cartItems = <Item>[].obs;

  void addToCart(Item item) {
    cartItems.add(item);
  }

  void removeFromCart(Item item) {
    cartItems.remove(item);
  }
}
