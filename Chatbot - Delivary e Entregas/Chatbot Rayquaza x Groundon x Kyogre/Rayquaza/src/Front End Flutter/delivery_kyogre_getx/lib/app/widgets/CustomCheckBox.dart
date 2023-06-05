import 'package:flutter/material.dart';

class CustomCheckBox extends StatelessWidget {
  final List<String> tasks;

  const CustomCheckBox({Key? key, required this.tasks}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: ListView.builder(
        itemCount: tasks.length,
        itemBuilder: (BuildContext context, int index) {
          return ListTile(
            leading: Checkbox(
              value: false,
              onChanged: (bool? value) {},
            ),
            title: Text(tasks[index]),
          );
        },
      ),
    );
  }
}
