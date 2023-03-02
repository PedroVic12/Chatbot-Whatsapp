const fs = require('fs');

// Ler o arquivo JSON
const data = fs.readFileSync('/home/pedrov/Documentos/GitHub/Chatbot-Whatsapp/Chatbot - Agendamento de Clientes/Chatbot-JS/Chatbot/Banco de Dados - EXCEL/Base de Dados Produtos/serviços.json', 'utf8');

// Converter os dados para um objeto JavaScript
const produtos = JSON.parse(data);

// Formatar os dados conforme sua necessidade
produtos.forEach((produto) => {
    console.log(`Nome: ${produto.nome}, Categoria: ${produto.categoria}, Preço: ${produto.preco}`);
});
