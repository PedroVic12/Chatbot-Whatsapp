import 'package:flutter/material.dart';
import 'package:bot_delivery_frontend/app/bot_delivery_app.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'app/core/config/env/env.dart';

void main() {
  Env.instance.load();

  runApp(const DeliveryApp());
}
