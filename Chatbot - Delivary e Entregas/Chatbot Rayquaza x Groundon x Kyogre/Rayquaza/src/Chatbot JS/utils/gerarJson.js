const fs = require('fs');

// Dados do cliente (exemplo)
const cliente = {
    nome: 'John Doe',
    email: 'johndoe@example.com',
    telefone: '123456789'
};

// Convertendo os dados do cliente para JSON
const jsonData = JSON.stringify(cliente);

// Escrevendo o JSON em um arquivo
fs.writeFile('cliente.json', jsonData, 'utf8', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Arquivo JSON gerado com sucesso.');
});
