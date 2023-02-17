import 'dart:math';

import 'package:bot_delivery_frontend/app/core/rest_client/custom_dio.dart';
import '../../models/product_model.dart';
import './products_repository.dart';

class ProductsRepositoryImplementacao implements ProductsRepository {
  final CustomDio dio;
  ProductsRepositoryImplementacao({required this.dio});

  @override
  Future<List<ProductModel>> findAllProducts() async {
    // Pegandos a lista de produtos em formato json pela requisição
    final result = await dio.unauth().get('/products');
    return result.data
        .map<ProductModel>((e) => ProductModel.fromJson(e))
        .toList();
  }

  //  todo criar uma execeção para o erro com try catch
}
