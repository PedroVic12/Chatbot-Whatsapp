import 'package:equatable/equatable.dart';
import 'package:flutter/material.dart';
import 'package:match/match.dart';
import 'package:bot_delivery_frontend/app/models/product_model.dart';

import 'home_state.dart';

class HomeState extends Equatable {
  @override
  final HomeStateStatus status;
  final List<ProductModel> products;
  final String errorMessage;
  final bool isLoading;

  const HomeState({
    required this.status,
    required this.products,
    this.errorMessage = '',
    this.isLoading = false,
  });

  const HomeState.initial()
      : status = HomeStateStatus.initial,
        products = const [],
        errorMessage = '',
        isLoading = false;

  const HomeState.loading()
      : status = HomeStateStatus.loading,
        products = const [],
        errorMessage = '',
        isLoading = true;

  const HomeState.success(List<ProductModel> products)
      : status = HomeStateStatus.success,
        products = products,
        errorMessage = '',
        isLoading = false;

  const HomeState.error(String errorMessage)
      : status = HomeStateStatus.error,
        products = const [],
        errorMessage = errorMessage,
        isLoading = false;

  @override
  List<Object?> get props => [status, products, errorMessage, isLoading];
}
