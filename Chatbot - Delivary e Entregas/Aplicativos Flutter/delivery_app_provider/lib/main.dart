import 'package:delivery_app_provider/src/widgets/customAppBar.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

//!=============================================================
// ESSE CODIGO ABAIXO ENSIMA COMO FAZER UM MENU LATERAL PARA NAVEGAÇÃO ENTRE PAGINAS
//!=============================================================

class NavigationState with ChangeNotifier {
  int _currentIndex = 0;

  int get currentIndex => _currentIndex;

  set currentIndex(int index) {
    _currentIndex = index;
    notifyListeners();
  }
}

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider(
      create: (context) => NavigationState(),
      child: MaterialApp(
        title: 'Flutter Demo',
        theme: ThemeData(
          primarySwatch: Colors.blue,
        ),
        home: MyHomePage(),
      ),
    );
  }
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      //!Customizando a APP BAR
      appBar: AppBar(
        title: const Text('🐺 Navegação com o Provider🐺'),
        backgroundColor: Colors.black,
        elevation: 50.0,

        //!COdigo que preciso entender melhor
        // leading: Builder(
        //   builder: (BuildContext context) {
        //     return IconButton(
        //       icon: const Icon(Icons.menu),
        //       onPressed: () => Scaffold.of(context).openDrawer(),
        //     );
        //   },
        // ),
      ),

      //!Meu Menu Lateral
      drawer: Drawer(
        child: ListView(
          padding: EdgeInsets.zero,
          children: <Widget>[
            DrawerHeader(
              decoration: BoxDecoration(
                color: Colors.blue,
              ),
              child: Text(
                'Flutter Navigation Example',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                ),
              ),
            ),
            ListTile(
              title: Text('Card 1'),
              onTap: () {
                Provider.of<NavigationState>(context, listen: false)
                    .currentIndex = 0;
                Navigator.pop(context);
              },
            ),
            ListTile(
              title: Text('Card 2'),
              onTap: () {
                Provider.of<NavigationState>(context, listen: false)
                    .currentIndex = 1;
                Navigator.pop(context);
              },
            ),
            ListTile(
              title: Text('Card 3'),
              onTap: () {
                Provider.of<NavigationState>(context, listen: false)
                    .currentIndex = 2;
                Navigator.pop(context);
              },
            ),
            ListTile(
              title: Text('Card 4'),
              onTap: () {
                Provider.of<NavigationState>(context, listen: false)
                    .currentIndex = 3;
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
      body: _getCard(
        context,
        Provider.of<NavigationState>(context).currentIndex,
      ),
    );
  }
}

Widget _getCard(BuildContext context, int index) {
  switch (index) {
    case 0:
      return Container(
        color: Colors.red,
        child: Center(
          child: Text(
            'O Provider é um pacote de código aberto que ajuda a gerenciar o estado de sua aplicação no Flutter. Ele fornece um mecanismo para acessar e atualizar informações compartilhadas por toda a aplicação, como informações de usuário e informações de produto. \n\nPara usar o Provider, você precisa criar uma classe de "provedor de estado" que herda da classe "ChangeNotifier" e contém os dados e as ações que você deseja compartilhar com a aplicação.',
            style: TextStyle(color: Colors.white),
          ),
        ),
      );
      break;
    case 1:
      return Container(
        color: Colors.green,
        child: Center(
          child: Text(
            'Em seguida, você pode adicionar esse provedor de estado à árvore de widget de sua aplicação usando o método "ChangeNotifierProvider". Quando você faz isso, o provedor de estado fica disponível para todos os widgets filhos na árvore de widget, e eles podem acessá-lo usando o método "Provider.of".',
            style: TextStyle(color: Colors.white),
          ),
        ),
      );
      break;
    case 2:
      return Container(
        color: Colors.yellow,
        child: Center(
          child: Text(
            'Da mesma forma, você pode criar um provedor de informações de produto, chamado "ProductProvider", para armazenar informações sobre seus produtos, como nome, descrição, preço, etc.\n\nCom o Provider, você pode garantir que as informações compartilhadas em sua aplicação sejam atualizadas de maneira consistente e que todos os widgets tenham acesso às informações mais atualizadas.',
            style: TextStyle(color: Colors.black),
          ),
        ),
      );
      break;
    case 3:
      return Container(
        color: Colors.blue,
        child: Center(
          child: Text(
            'Provider: É uma biblioteca simples e fácil de usar que fornece gerenciamento de estado e injeção de dependências. É uma opção popular para aplicativos pequenos e de baixa complexidade. Vantagens: simples, fácil de usar, suporta a injeção de dependências. Desvantagens: pode se tornar complexo em aplicativos maiores ou mais complexos.\n\nBLoC (Business Logic Component): É uma arquitetura baseada em streams que permite separar o estado e a lógica de negócios da apresentação. É uma boa opção para aplicativos maiores ou mais complexos que exigem escalabilidade. Vantagens: escalável, fácil de testar, separação clara de preocupações. Desvantagens: pode ser um pouco mais complexo que o Provider.\n\nMobX: É uma biblioteca de gerenciamento de estado baseada em observáveis. É uma boa opção para aplicativos mais complexos que exigem performance elevada. Vantagens: performance, facilidade de uso, facilidade de debug. Desvantagens: não é nativo do Flutter, pode ser difícil de compreender para novos desenvolvedores.',
            style: TextStyle(color: Colors.black),
          ),
        ),
      );
      break;
    default:
      return Container();
  }
}
