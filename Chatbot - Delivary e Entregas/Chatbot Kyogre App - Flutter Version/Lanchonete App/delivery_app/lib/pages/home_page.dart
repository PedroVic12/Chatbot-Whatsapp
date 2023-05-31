import 'package:delivery_app/provider/menu_provider.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

//! projeto incial de lanchonete, FAIL total!

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('🐺 My TODO LIST Flutter  🐺'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.comment),
            tooltip: 'Comment Icon',
            onPressed: () {},
          ), //IconButton
          IconButton(
            icon: Icon(Icons.settings),
            tooltip: 'Setting Icon',
            onPressed: () {},
          ), //IconButton
        ], //<Widget>[]
        backgroundColor: Colors.black,
        elevation: 50.0,
        leading: IconButton(
          icon: Icon(Icons.menu),
          tooltip: 'Menu Icon',
          onPressed: () {
            //coloque aqui a função que você quer que seja executada ao clicar no botão
            // coloque aqui uma messageBox verde
          },
        ), //IconButton
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Text('data'),
          Expanded(
            child: Center(
              child: Consumer<Menu>(
                builder: (context, menu, child) {
                  return ListView.builder(
                    itemCount: menu.menuItems.length,
                    itemBuilder: (context, index) {
                      return ListTile(
                        title: Text(menu.menuItems[index]),
                      );
                    },
                  );
                },
              ),
            ),
          ),
          Padding(
            //!GAMBIARRA AQUI!

            padding: const EdgeInsets.only(bottom: 200),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                //!GAMBIARRA AQUI!

                ElevatedButton(
                  onPressed: () {
                    Provider.of<Menu>(context, listen: false)
                        .addItem('Sanduíche');
                  },
                  child: Text('ADICIONAR ITEM!'),
                ),
                SizedBox(width: 10),
                TextButton(
                  onPressed: () {
                    Provider.of<Menu>(context, listen: false).addItem('Bebida');
                  },
                  child: Text('Adicionar Bebida e drogas'),
                ),
                SizedBox(width: 10),
                OutlinedButton(
                  onPressed: () {
                    Provider.of<Menu>(context, listen: false).clear();
                  },
                  child: Text('Limpar'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
