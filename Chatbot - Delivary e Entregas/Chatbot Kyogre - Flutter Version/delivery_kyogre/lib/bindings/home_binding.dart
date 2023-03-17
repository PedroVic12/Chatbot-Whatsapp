//SummerClass

import 'package:delivery_kyogre/controllers/HomeController.dart';
import 'package:get/get.dart';

class HomeBinding extends Bindings {
  @override
  void dependencies() {
    Get.put(HomeController(), permanent: true);

    //Get.lazyPut(() => HomeController());
  }
}
