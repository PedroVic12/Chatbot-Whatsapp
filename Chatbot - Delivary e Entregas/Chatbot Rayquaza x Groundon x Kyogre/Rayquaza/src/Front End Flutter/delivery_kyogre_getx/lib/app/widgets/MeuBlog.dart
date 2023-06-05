import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class MeuBlog extends StatefulWidget {
  const MeuBlog({Key? key}) : super(key: key);

  @override
  State<MeuBlog> createState() => _MeuBlogState();
}

class _MeuBlogState extends State<MeuBlog> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Blog'),
      ),
      body: Column(
        children: [
          Text('YOU ONLY NEED 5 HOBBIES', style: TextStyle(fontSize: 40),)
        ],
      ),
    );
  }
}
