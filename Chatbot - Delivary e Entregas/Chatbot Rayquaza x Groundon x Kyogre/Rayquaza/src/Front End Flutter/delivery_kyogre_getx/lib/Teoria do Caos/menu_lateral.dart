import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ItemMenuLateral {
  final String title;
  final IconData icon;
  final String route;

  ItemMenuLateral({
    required this.title,
    required this.icon,
    required this.route,
  });
}

class MenuLateralController extends GetxController {
  var selectedIndex = 0.obs;

  void selectMenu(int index) {
    selectedIndex.value = index;
  }
}

class MenuLateral extends StatelessWidget {
  final MenuLateralController _controller = Get.put(MenuLateralController());

  final List<ItemMenuLateral> _menuItems = [
    ItemMenuLateral(title: 'Página 1', icon: Icons.home, route: '/'),
    ItemMenuLateral(title: 'Pedido Page Server', icon: Icons.pageview, route: '/pedido'),
    // Adicione mais itens de menu conforme necessário
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.purple,
      child: ListView.builder(
        itemCount: _menuItems.length,
        itemBuilder: (context, index) {
          final menuItem = _menuItems[index];

          return ListTile(
            leading: Icon(
              menuItem.icon,
              color: _controller.selectedIndex.value == index ? Colors.white : Colors.grey,
            ),
            title: Text(
              menuItem.title,
              style: TextStyle(
                color: _controller.selectedIndex.value == index ? Colors.white : Colors.grey,
              ),
            ),
            onTap: () {
              _controller.selectMenu(index);
              Get.toNamed(menuItem.route);
            },
          );
        },
      ),
    );
  }
}
