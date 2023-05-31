import 'package:flutter/material.dart';
import 'package:provider/provider.dart';



class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Flutter Navigation Example'),
        actions: <Widget>[
          IconButton(
            icon: Icon(Icons.navigate_before),
            onPressed: () {
              Provider.of<NavigationState>(context, listen: false).currentIndex = 0;
            },
          ),
          IconButton(
            icon: Icon(Icons.navigate_next),
            onPressed: () {
              Provider.of<NavigationState>(context, listen: false).currentIndex = 1;
            },
          ),
          IconButton(
            icon: Icon(Icons.navigate_before),
            onPressed: () {
              Provider.of<NavigationState>(context, listen: false).currentIndex = 2;
            },
          ),
          IconButton(
            icon: Icon(Icons.navigate_next),
            onPressed: () {
              Provider.of<NavigationState>(context, listen: false).currentIndex = 3;
            },
          ),
        ],
      ),
      body: Container(
        child: Column(
          children: <Widget>[
            Expanded(
              child: Container(
                child: Consumer<NavigationState>(
                  builder: (context, navigationState, child) {
                    switch (navigationState.currentIndex) {
                      case 0:
                        return Card(
                          color: Colors.red,
                          child: Center(
                            child: Text(
                              'Card 1',
                              style: TextStyle(color: Colors.white),
                            ),
                          ),
                        );
                      case 1:
                        return Card(
                          color: Colors.blue,
                          child: Center(
                            child: Text(
                              'Card 2',
                              style: TextStyle(color: Colors.white),
                            ),
                          ),
                        );
                      case 2:
                        return Card(
                          color: Colors.green,
                          child: Center(
                            child: Text(
                              'Card 3',
                              style: TextStyle(color: Colors.blue),
                            ),
                             );
                      case 3:
                        return Card(
                          color: Colors.yellow,
                          child: Center(
                            child: Text(
                              'Card 4',
                              style: TextStyle(color: Colors.black),
                            ),
                          ),
                        );
                      default:
                        return Container();
                    }
                  },
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}