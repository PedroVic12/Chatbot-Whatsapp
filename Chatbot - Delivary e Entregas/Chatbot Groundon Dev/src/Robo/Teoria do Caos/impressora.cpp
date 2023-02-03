#include <cups/cups.h>
#include <fstream>
#include <iostream>


// ler o arquivo txt

// escrever no arquivo txt a nota fiscal

// conectando com a impressora e pegar o nome da impressora

// selecionar a impressora imprimir o arquivo txt


int main() {
    // Escreva o conteúdo do arquivo
    std::ofstream file("arquivo.txt");
    if (file.is_open()) {
        file << "coluna 1 | coluna 2 | coluna 3" << std::endl;
        file << "-------------------------------" << std::endl;
        file << " valor 1 | valor 2  | valor 3" << std::endl;
        file.close();
    } else {
        std::cerr << "Não foi possível abrir o arquivo." << std::endl;
        return 1;
    }

    // Obtenha a lista de impressoras
    int numPrinters = 0;
    cups_dest_t *printers = NULL;
    numPrinters = cupsGetDests(&printers);
    std::cout << "Numero de impressoras: " << numPrinters << std::endl;

    if (numPrinters > 0) {
        // Imprima o nome de cada impressora
        for (int i = 0; i < numPrinters; i++)   {
            std::cout << "Nome da impressora: " << printers[i].name << std::endl;
        }


        // Selecione a Segunda impressora disponível
        cups_dest_t *selectedPrinter = &printers[1];

        // Defina as opções de impressão
        cups_option_t *options = NULL;
        int numOptions = 0;

        // Imprima o arquivo "arquivo.txt" na impressora selecionada
        cupsPrintFile(selectedPrinter->name, "arquivo.txt", "Printing with CUPS", numOptions, options);
    } else {
        std::cerr << "Nenhuma impressora encontrada." << std::endl;
        return 1;
    }

    return 0;
}
