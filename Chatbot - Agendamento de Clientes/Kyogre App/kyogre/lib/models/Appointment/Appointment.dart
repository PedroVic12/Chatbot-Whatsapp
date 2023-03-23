import 'package:get/get.dart';
import 'package:kyogre/models/Service/Service.dart';

class Appointment {
  final services = <Service>[].obs;

  void addService(Service service) {
    services.add(service);
  }

  void removeService(Service service) {
    services.remove(service);
  }
}
