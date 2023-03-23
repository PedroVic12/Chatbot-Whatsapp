import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../../controllers/ServicesControllers/ServiceController.dart';

class ServicesPage extends StatelessWidget {
  final controller = Get.put(ServicesController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Selecione os serviços'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: ListView.builder(
          itemCount: controller.services.length,
          itemBuilder: (context, index) {
            final service = controller.services[index];
            return CheckboxListTile(
              title: Text(service.name),
              subtitle: Text(service.description),
              value: false,
              onChanged: (value) {
                // Aqui você pode adicionar o serviço selecionado à lista de serviços do agendamento
              },
            );
          },
        ),
      ),
    );
  }
}
