import pandas as pd

deposito = pd.read_excel('Banco de Dados/Planilha1.xlsx')
print(deposito)

drinksToJSON = deposito.to_json('Banco de Dados/Planilha1.json')
