import pyprinter

printer = pyprinter.get_printer()

print(printer)

# Write a simple line.
printer.write_line(printer.YELLOW + "Hello World!")

# Or use the color functions (nested coloring is also supported).
printer.write_line(printer.yellow("Hello World!"))

# Use indentations.
with printer.group(indent=4):
    printer.write_line(printer.GREEN + "Hello Again!")
