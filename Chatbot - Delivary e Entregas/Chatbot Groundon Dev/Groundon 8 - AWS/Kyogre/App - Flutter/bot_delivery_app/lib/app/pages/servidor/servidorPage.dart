import 'package:flutter/material.dart';
import 'dart:async';
import 'package:http/http.dart' as http;

class SevidorPage extends StatefulWidget {
  SevidorPage({required this.title});
  final String title;

  @override
  _SevidorPageState createState() => _SevidorPageState();
}

class _SevidorPageState extends State<SevidorPage> {
  late String _data;

  Future<http.Response> fetchData() {
    return http.get(Uri.parse("http://localhost:7000/"));
  }

  @override
  void initState() {
    super.initState();
    fetchData().then((value) {
      setState(() {
        _data = value.body;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          children: [
            Text('Servidor Rodando na porta 7000'),
            FutureBuilder<http.Response>(
              future: fetchData(),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return CircularProgressIndicator();
                } else if (snapshot.hasError) {
                  return Text('Erro ao obter dados do servidor');
                } else {
                  _data = snapshot.data!.body;
                  return Text(_data);
                }
              },
            ),
          ],
        ),
      ),
    );
  }
}
