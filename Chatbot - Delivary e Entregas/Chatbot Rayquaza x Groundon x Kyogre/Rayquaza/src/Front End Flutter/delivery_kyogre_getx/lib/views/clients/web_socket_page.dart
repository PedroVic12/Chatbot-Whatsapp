import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../controllers/nuvem/web_socket_controller.dart';

class WebSocketPage extends GetView<WebSocketController> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('WebSocket Example'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: controller.connectToServer,
              child: Text('Connect to Server'),
            ),
            ElevatedButton(
              onPressed: controller.disconnectFromServer,
              child: Text('Disconnect from Server'),
            ),
          ],
        ),
      ),
    );
  }
}
