import 'package:dio/dio.dart';
import 'package:dio/native_imp.dart';
import '../config/env/env.dart';

//TODO: Estudar Dio e como funciona as requisições

class CustomDio extends DioForNative {
  CustomDio()
      : super(BaseOptions(
          // pegando a url do arquivo .env --> local onde esta o ip do backend
          baseUrl: Env.instance['backend_base_url'],
          connectTimeout: 5000,
          receiveTimeout: 60000,
        )) {
    interceptors.add(LogInterceptor(
      requestBody: true,
      responseBody: true,
      requestHeader: true,
    ));
  }

  CustomDio unauth() {
    return CustomDio();
  }
}
