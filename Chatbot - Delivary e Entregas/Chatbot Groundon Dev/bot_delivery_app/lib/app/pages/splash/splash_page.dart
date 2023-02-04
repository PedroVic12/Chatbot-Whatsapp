import 'package:bot_delivery_frontend/app/core/ui/helpers/size_extensions.dart';
import 'package:bot_delivery_frontend/app/core/ui/styles/app_styles.dart';
import 'package:bot_delivery_frontend/app/core/ui/styles/colors_app.dart';
import 'package:bot_delivery_frontend/app/core/ui/widgets/delivery_button.dart';
import 'package:flutter/material.dart';

class SplashPage extends StatelessWidget {
  const SplashPage({super.key});

  @override
  Widget build(BuildContext context) {
    //Classe craida para facilitar a criação de cores
    context.coresAplicativo.primary;

    return Scaffold(
        appBar: AppBar(
          title: const Text('Splash Page'),
        ),
        body: ColoredBox(
            color: Colors.black,
            child: Stack(
              children: [
                Center(
                  child: Column(
                    children: [
                      SizedBox(
                        height: context.percent_height(.10),
                      ),
                      Image.asset('assets/images/logo.png'),
                      const SizedBox(
                        height: 80,
                      ),
                    ],
                  ),
                ),
                Align(
                  alignment: Alignment.bottomCenter,
                  child: SizedBox(
                    width: context.screen_width,
                    child: Image.asset(
                      'assets/images/lanche.png',
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
                Align(
                  alignment: Alignment.center,
                  

                    //como posso colocar mais um botão aqui
                    //como posso colocar mais um botão aqui
                    //como posso colocar mais um botão aqui
                    //como posso colocar mais um botão aqui
                    //como posso colocar mais um botão aqui



                    

                  child: DeliveryButton(
                    width: context.percent_width(.10),
                    height: 35,
                    label_text: 'ACESSAR O APLICATIVO - GET STARTED...',
                    btn_onPressed: () {
                      //IMPORTANCIA DO PROVIDER PARA NAVEGAÇÃO
                      Navigator.pushNamed(context, '/home');
                      Navigator.of(context).pushNamed('/productDetail');
                    },
                    //onPressed: btn_onPressed,
                  ),
                ),
              ],
            )));
  }
}
