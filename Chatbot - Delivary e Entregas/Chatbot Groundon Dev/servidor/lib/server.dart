// ignore_for_file: unused_local_variable

import 'package:shelf/shelf.dart';
import 'package:shelf_router/shelf_router.dart';

class Servidor {
  //final _router = Router();

  Handler get handler {
    //final router = Router();

    router.get('/', (Request request) {
      return Response(200, body: 'Primeira rota');
    });

    return router;
  }
}
