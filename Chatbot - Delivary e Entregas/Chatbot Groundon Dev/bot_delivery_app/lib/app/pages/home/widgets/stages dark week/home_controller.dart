// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:bloc/bloc.dart';
import 'package:bot_delivery_frontend/app/models/product_model.dart';
import 'package:bot_delivery_frontend/app/pages/home/widgets/home_state.dart';
import 'package:bot_delivery_frontend/app/repositories/products/products_repository.dart';

// Estuda ro que é um BLOC

class HomeController extends Cubit<HomeState> {
  final ProductsRepository _productsRepository;

  HomeController(this._productsRepository) : super(HomeState.initial());

  Future<void> loadProducts() async {
    emit(state.copyWith(status: HomeStateStatus.loading));

    try {
      final products = await _productsRepository.findAllProducts();
      emit(state.copyWith(status: HomeStateStatus.success, products: products));
    } catch (e) {}
  }
}



//!Codigo Dart Week

// class HomeController extends Cubit<HomeState> {
//   HomeController(super.initialState);
//   final ProductsRepository _productsRepository;

// //home_controller.dart:11: Expected to find ')'.
//   HomeController(this._productsRepository, {required _productsRepository})
//       : super(HomeState.initial());

//   //metodos
//   Future<void> loadProducts() async {
//     emit(state.copyWith(status: HomeStateStatus.loading));

//     try {
//       final products = await _productsRepository.findAllProducts();
//       emit(state.copyWith(status: HomeStateStatus.success, products: products));
//     } catch (e) {}
//   }
// }
