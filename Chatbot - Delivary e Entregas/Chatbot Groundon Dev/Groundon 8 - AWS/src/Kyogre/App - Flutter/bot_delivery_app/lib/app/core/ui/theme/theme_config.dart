import 'package:flutter/material.dart';
import '../styles/app_styles.dart';
import '../styles/colors_app.dart';



class ThemeConfig {
  ThemeConfig._();

// Bordas padrõa para os inputs
  static final _defaultInputBorder = OutlineInputBorder(
      borderRadius: BorderRadius.circular(10),
      borderSide: BorderSide(color: Colors.grey));

// Tema padrão da aplicação
  static final tema_simples = ThemeData(
    scaffoldBackgroundColor: Colors.white,
    appBarTheme: AppBarTheme(
        backgroundColor: Colors.blue,
        elevation: 0,
        centerTitle: true,
        iconTheme: IconThemeData(color: Colors.black)),
    primaryColor: ColorsApp.instance.primary, //context.coresAplicativo.primary,
    accentColor: ColorsApp.instance.secundary,
    colorScheme: ColorScheme.fromSeed(
      seedColor: ColorsApp.instance.primary,
      primary: ColorsApp.instance.primary,
      secondary: ColorsApp.instance.secundary,
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: AppStyles.instance.primaryButton,
    ),
    inputDecorationTheme: InputDecorationTheme(
      fillColor: Colors.white,
      filled: true,
      isDense: true,
      contentPadding: EdgeInsets.all(13),
      border: _defaultInputBorder,
      enabledBorder: _defaultInputBorder,
      focusedBorder: _defaultInputBorder,
      errorStyle: TextStyle(
        color: Colors.red,
        fontSize: 16,
        fontWeight: FontWeight.w500,
      ),
    ),
  );
}
