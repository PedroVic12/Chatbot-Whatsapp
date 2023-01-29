import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart' as shelf_io;

void void main(List<String> args) {
  
  final server = shelf_io.serve((request) => Response(200) , "localhost", 7000)

  print('Nosso servidor foi iniciado http://localhost:7000');


}