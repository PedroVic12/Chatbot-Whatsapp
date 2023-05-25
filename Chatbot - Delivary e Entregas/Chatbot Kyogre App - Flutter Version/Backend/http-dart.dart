import 'package:http/http.dart' as http;

Future<List<Produto>> listarProdutos() async {
  final response = await http.get(Uri.parse('http://localhost:8000/produtos'));
  if (response.statusCode == 200) {
    Iterable produtosJson = json.decode(response.body);
    List<Produto> produtos =
        produtosJson.map((produto) => Produto.fromJson(produto)).toList();
    return produtos;
  } else {
    throw Exception('Falha ao listar os produtos');
  }
}
