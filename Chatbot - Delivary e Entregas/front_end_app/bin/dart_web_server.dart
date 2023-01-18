import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart' as io;
import 'package:shelf_static/shelf_static.dart';

void main(List<String> arguments) {
  print('Hello world: ${arguments.length} arguments.');

  final pipeline = Pipeline()
  .addMiddleware(logRequests())
  .addHandler(createStaticHandler("../", defaultDocuemnt:"index.html"));

  io.serve(pipeline, "localhost", 8080);
}
