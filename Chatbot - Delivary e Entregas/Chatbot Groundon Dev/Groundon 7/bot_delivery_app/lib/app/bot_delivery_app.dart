import 'package:bot_delivery_frontend/app/core/provider/application_binding.dart';
import 'package:bot_delivery_frontend/app/core/ui/theme/theme_config.dart';
import 'package:bot_delivery_frontend/app/pages/home/product_detail/product_detail_router.dart';
import 'package:bot_delivery_frontend/app/pages/home/widgets/home_router.dart';
import 'package:flutter/material.dart';
import 'package:bot_delivery_frontend/app/pages/splash/splash_page.dart';

class DeliveryApp extends StatelessWidget {
  const DeliveryApp({super.key});

  @override
  Widget build(BuildContext context) {
    return ApplicationBinding(
      child: MaterialApp(
        title: 'Delivery App',
        theme: ThemeConfig.tema_simples,
        // initialRoute: '/', //todo TALVEZ NÂO SEJA NECESSARIO, PEGUEI DO BLOC
        routes: {
          '/': (context) => const SplashPage(),
          '/home': (context) => HomeRouter.page,
          '/productDetail': (context) => HomeRouter.page,
        },
      ),
    );
  }
}
