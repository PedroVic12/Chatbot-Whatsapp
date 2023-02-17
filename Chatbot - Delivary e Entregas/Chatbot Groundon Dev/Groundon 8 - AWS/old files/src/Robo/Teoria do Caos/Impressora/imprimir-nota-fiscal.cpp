#include <cups/cups.h>
#include <fstream>
#include <iostream>
using namespace std;

//! Para rodar o arquivo é necessário compilar assim: g++ impressora.cpp -lcups -o NomeDoExecutavel

//! e depois executar o arquivo executavel

void lerNotaFiscal() {
    // Escreva o conteúdo do arquivo
    ifstream arquivo("nota_fiscal.txt");
    string linha;

    if (arquivo.is_open()) {
        while (getline(arquivo, linha)) {
            cout << linha << endl;
        }
        arquivo.close();
    }
    else {
        cerr << "Não foi possível abrir o arquivo, tente novamente" <<endl;
    }
}

void escreverNotaFiscal() {
    ofstream arquivo("nota_fiscal.txt");
    if (arquivo.is_open()) {
        arquivo << "coluna 1 | coluna 2 | coluna 3" << endl;
        arquivo << "-------------------------------" << endl;
        arquivo << " valor 1 | valor 2  | valor 3" << endl;
        arquivo.close();
    } else {
        cerr << "Não foi possível abrir o arquivo." <<endl;
    }
}


// conectando com a impressora e pegar o nome da impressora
void conectandoImpressora() {
    // Obtenha a lista de impressoras
    int numPrinters = 0;
    cups_dest_t *printers = NULL;
    numPrinters = cupsGetDests(&printers);
    cout << '' << endl;
    cout << "Numero de impressoras: " << numPrinters << endl;

    if (numPrinters > 0) {
        // Imprima o nome de cada impressora
        for (int i = 0; i < numPrinters; i++)   {
            cout << "Nome da impressora: " << printers[i].name <<endl;
        }
    } else {
        cerr << "Nenhuma impressora encontrada." << endl;
    }
}

// selecionar a impressora imprimir o arquivo txt
void imprimirArquivo() {
    int numPrinters = 0;
    cups_dest_t *printers = NULL;
    numPrinters = cupsGetDests(&printers);
    // Selecione a Segunda impressora disponível
    cups_dest_t *selectedPrinter = &printers[1];

    // Defina as opções de impressão
    cups_option_t *options = NULL;
    int numOptions = 0;

    // Imprima o arquivo "arquivo.txt" na impressora selecionada
    cupsPrintFile(selectedPrinter->name, "nota_fiscal.txt", "Printing with CUPS", numOptions, options);

}
    

int main(){
    lerNotaFiscal();
    //escreverNotaFiscal();
    conectandoImpressora();
    //imprimirArquivo();
    return 0;
}