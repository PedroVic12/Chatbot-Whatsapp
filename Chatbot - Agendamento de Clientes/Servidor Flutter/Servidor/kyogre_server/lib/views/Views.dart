import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:salao_beauty_barber/controllers/agendamentos_controller.dart';
import 'package:salao_beauty_barber/models/agendamento.dart';

class ListaAgendamentosView extends StatelessWidget {
  final controller = Get.put(AgendamentosController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Agendamentos'),
      ),
      body: Obx(() => ListView.builder(
            itemCount: controller.agendamentos.length,
            itemBuilder: (context, index) {
              final agendamento = controller.agendamentos[index];
              return ListTile(
                title: Text(agendamento.cliente),
                subtitle: Text(
                  '${DateFormat('dd/MM/yyyy HH:mm').format(agendamento.dataHora)} - ${agendamento.servico}',
                ),
                trailing: Text(agendamento.status),
                onTap: () {
                  Get.to(EditaAgendamentoView(index: index));
                },
              );
            },
          )),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Get.to(AdicionaAgendamentoView());
        },
        child: Icon(Icons.add),
      ),
    );
  }
}
