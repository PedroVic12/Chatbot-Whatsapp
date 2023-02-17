#include <cups/cups.h>
#include <fstream>
#include <iostream>
using namespace std;

//! Para rodar o arquivo é necessário compilar assim: g++ impressora.cpp -lcups -o NomeDoExecutavel

//! e depois executar o arquivo executavel


int main() {

    // Escreva o conteúdo do arquivo
    ifstream arquivo("nota_fiscal.txt");
    string linha;

    if (arquivo.is_open()) {
        while (getline(arquivo, linha)) {
            cout << linha << endl;
        }
        arquivo.close();
    } else {
        cerr << "Não foi possível abrir o arquivo, tente novamente" <<endl;
        return 1;
    }

    // Obtenha a lista de impressoras
    int numPrinters = 0;
    cups_dest_t *printers = NULL;
    numPrinters = cupsGetDests(&printers);
    cout << "Numero de impressoras: " << numPrinters << endl;

    if (numPrinters > 0) {
        // Imprima o nome de cada impressora
        for (int i = 0; i < numPrinters; i++)   {
            cout << "Nome da impressora: " << printers[i].name <<endl;
        }

        // Selecione a Segunda impressora disponível
        cups_dest_t *selectedPrinter = &printers[1];

        // Defina as opções de impressão
        cups_option_t *options = NULL;
        int numOptions = 0;

        // Imprima o arquivo "arquivo.txt" na impressora selecionada
        cupsPrintFile(selectedPrinter->name, "nota_fiscal.txt", "Printing with CUPS", numOptions, options);
    } else {
        cerr << "Nenhuma impressora encontrada." << endl;
        return 1;
    }

    return 0;
}
