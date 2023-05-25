//SummerClass

import 'package:delivery_kyogre/controllers/DetailsController.dart';
import 'package:get/get.dart';

class DetailsBinding implements Bindings {
  @override
  void dependencies() {
    Get.put(() => DetailsController());
  }
}
