// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:match/match.dart';
import 'package:bot_delivery_frontend/app/models/product_model.dart';

//! Rodar o codigo para ver a compilação do nosso projeto
part 'home_state.g.dart';

@match
enum HomeStateStatus {
  initial,
  loading,
  success,
  error,
}
//!flutter pub run build_runner watch -d

class HomeState extends Equatable {
  @override
  final HomeStateStatus status;
  final List<ProductModel> products;

// Construtor
  const HomeState({
    required this.status,
    required this.products,
  });

  const HomeState.initial()
      : status = HomeStateStatus.initial,
        products = const [];

  //!O QUE ESTUDAR
  @override
  // TODO: implement props
  List<Object?> get props => throw UnimplementedError();

//TODO IMPLEMETAR O QUE É EQUATABLE E O QUE É PROPS
  // List<Object> get props => [status, products];

  // HomeState copyWith({
  //   HomeState? status,
  //   List<ProductModel>? products,
  // }) {
  //   return HomeState(
  //     status: status ?? this.status,
  //     products: products ?? this.products,
  //   );
  // }
}
