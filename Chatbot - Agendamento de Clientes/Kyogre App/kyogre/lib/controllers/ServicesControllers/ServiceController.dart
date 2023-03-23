import 'package:get/get.dart';
import 'package:kyogre/models/Service/Service.dart';

class ServicesController extends GetxController {
  final services = <Service>[
    Service(
      name: 'Corte de Cabelo',
      description: 'Corte de cabelo masculino ou feminino',
      price: 50.0,
    ),
    Service(
      name: 'Manicure',
      description: 'Manicure simples',
      price: 30.0,
    ),
    Service(
      name: 'Pedicure',
      description: 'Pedicure simples',
      price: 40.0,
    ),
    Service(
      name: 'Maquiagem',
      description: 'Maquiagem para festas e eventos',
      price: 80.0,
    ),
  ].obs;
}
