import 'package:bot_delivery_frontend/app/core/extensions/formater_extension.dart';
import 'package:bot_delivery_frontend/app/core/ui/styles/colors_app.dart';
import 'package:bot_delivery_frontend/app/models/product_model.dart';
import 'package:flutter/material.dart';
import '../../../core/ui/widgets/delivery_appbar.dart';

class DeliveryProductTitle extends StatelessWidget {
  final ProductModel product;

  const DeliveryProductTitle({super.key, required this.product});

  @override
  Widget build(BuildContext context) {
    //!Navegação de telas
    return InkWell(
      onTap: () async {
        await Navigator.of(context).pushNamed('/productDetail', arguments: {
          'product': product,
        });
      },

      //!================================================
      //! CODIGO QUE FUNCIONA COM O BACKEND USANDO UMA API
      //!================================================
      child: Padding(
        padding: const EdgeInsets.all(10.0),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Text(
                      product.name,
                      style: const TextStyle(
                          fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Text(
                      product.description,
                      style: const TextStyle(
                          fontSize: 14, fontWeight: FontWeight.normal),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    // String de preço do produto formatada com a nossa extensão!
                    child: Text(
                      product.price.currencyPTBR,
                      style: const TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w500,
                          color: Colors.red),
                    ),
                  )
                ],
              ),
            ),
            FadeInImage.assetNetwork(
              //!CUIDADO! O placeholder não funciona com o backend
              placeholder: 'assets/images/loading.gif',
              image: product.image,
              width: 100,
              height: 100,
              fit: BoxFit.contain,
            )
          ],
        ),
      ),
    );
  }
}
