import 'package:flutter/material.dart';
import 'package:get/get.dart';

class ScheduleServicePage extends GetView {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Agendamento de Serviços'),
      ),
      body: Container(
        child: Column(
          children: [
            Text('Selecione o serviço desejado:'),
            // lista de serviços disponíveis
            Text('Selecione a data e hora:'),
            // calendário e horário disponíveis para agendamento
            ElevatedButton(
              onPressed: () => _scheduleService(),
              child: Text('Agendar'),
            ),
          ],
        ),
      ),
    );
  }

  void _scheduleService() {
    // implemente aqui a lógica para agendar o serviço selecionado
  }
}
