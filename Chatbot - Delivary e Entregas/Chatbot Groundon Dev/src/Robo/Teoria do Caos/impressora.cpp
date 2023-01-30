#include <cups/cups.h>
#include <iostream>

int main() {
    int numPrinters = 0;
    cups_dest_t *printers = NULL;
    numPrinters = cupsGetDests(&printers);

    if (numPrinters > 0) {
        for (int i = 0; i < numPrinters; i++) {
            std::cout << printers[i].name << std::endl;
        }

        // Selecione a primeira impressora disponível
         cups_dest_t *selectedPrinter = &printers[0];

        // Defina as opções de impressão
        cups_option_t *options = NULL;
         int numOptions = 0;

        // Imprima o arquivo "arquivo.txt" na impressora selecionada
        cupsPrintFile(selectedPrinter->name, "arquivo.txt", "Printing with CUPS", numOptions, options);
    }

    return 0;
}
