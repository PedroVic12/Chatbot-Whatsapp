import 'package:delivery_kyogre_getx/app/widgets/CustomText.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class Task {
  final String name;
  final List<String> description;
  final RxBool isCompleted;

  Task(this.name, {List<String>? description, bool isCompleted = false})
      : description = description ?? [],
        isCompleted = isCompleted.obs;
}

class TaskController extends GetxController {
  final List<Task> tasks = [
    Task('1) One to make Money',
        description: ['Description 1', 'Description 2']),

    Task('2) One to build Knowledge', description: ['Description 3']),
    Task('3) One to keep you in Shape', description: ['Description 4', 'Description 5']),
    Task('4) One to grow your Mindset', description: ['Description 4', 'Description 5']),
    Task('5) One to stay Creactive', description: ['Description 4', 'Description 5']),

  ];
}

class MeuBlog extends StatelessWidget {
  final TaskController taskController = Get.put(TaskController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Blog'),
      ),
      body: ListView.builder(
        itemCount: taskController.tasks.length,
        itemBuilder: (BuildContext context, int index) {
          Task task = taskController.tasks[index];
          return Column(
            children: [

              Text('Entender -> Aprender -> Praticar -> Aplicar'),
              CustomText(text: '${index + 1}) ${task.name}'),
              for (String desc in task.description)
                CustomText(text: desc),
              Obx(() {
                return Checkbox(
                  value: task.isCompleted.value,
                  onChanged: (bool? value) {
                    task.isCompleted.value = value ?? false;
                  },
                );
              }),
            ],
          );
        },
      ),

    );
  }
}
