import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        body: Center(
          child: FutureBuilder(
            future: http.get('http://localhost:7000/' as Uri),
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return Text('Servidor Docker online!');
              } else if (snapshot.hasError) {
                return Text('Servidor Docker offline');
              }
              return CircularProgressIndicator();
            },
          ),
        ),
      ),
    );
  }
}
