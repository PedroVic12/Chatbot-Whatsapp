import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:kyogre/models/Appointment/Appointment.dart';

class AppointmentConfirmationPage extends StatelessWidget {
  final Appointment appointment;

  const AppointmentConfirmationPage({required this.appointment});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Confirmação de agendamento'),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Serviços selecionados:',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          SizedBox(height: 10),
          Obx(() => ListView.builder(
                shrinkWrap: true,
                itemCount: appointment.services.length,
                itemBuilder: (context, index) {
                  final service = appointment.services[index];
                  return ListTile(
                    title: Text(service.name),
                    subtitle: Text(service.description),
                    trailing: Text('\$${service.price.toStringAsFixed(2)}'),
                  );
                },
              )),
        ],
      ),
    );
  }
}
