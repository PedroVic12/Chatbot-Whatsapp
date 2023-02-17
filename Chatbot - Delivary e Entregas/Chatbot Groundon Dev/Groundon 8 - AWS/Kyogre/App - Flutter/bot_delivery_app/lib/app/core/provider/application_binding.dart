import 'package:bot_delivery_frontend/app/core/rest_client/custom_dio.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

//Gerenciamento de estado PRovider

// Compare this snippet from lib/app/core/provider/application_binding.dart:

class ApplicationBinding extends StatelessWidget {
  final Widget child;

  const ApplicationBinding({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(providers: [
      Provider(
        create: (context) => CustomDio(),
      )
    ], child: child);
  }
}
