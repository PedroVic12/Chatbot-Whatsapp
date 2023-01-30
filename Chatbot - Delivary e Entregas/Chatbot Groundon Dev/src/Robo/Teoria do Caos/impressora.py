import cups

test = cups.Connection().getPrinters()
print(test)
conn = cups.Connection()

printers = conn.getPrinters()
printer_name = list(printers.keys())[0]
with open("file.txt", "rb") as f:
    conn.printFile(printer_name, "arquivo.txt", "Test print job", {})
